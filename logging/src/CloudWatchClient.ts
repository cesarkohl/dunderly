import LoggingClient from "./contracts/LoggingClient.interface";
import {AWSError} from "aws-sdk";
import {
    CloudWatchLogsClient,
    CreateLogStreamCommand,
    DescribeLogStreamsCommand,
    PutLogEventsCommand, PutLogEventsCommandOutput,
} from "@aws-sdk/client-cloudwatch-logs";
import {InputLogEvent, LogStream} from "aws-sdk/clients/cloudwatchlogs";
import ErrorReportingClient from "../../error-reporting/src/contracts/ErrorReportingClient.interface";

class CloudWatchClient implements LoggingClient {
    private readonly AWS;
    private readonly client: CloudWatchLogsClient;
    private readonly GROUP_NAME = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
    private readonly STREAM_NAME = process.env.AWS_LAMBDA_LOG_STREAM_NAME;
    private readonly errorReportingClient: ErrorReportingClient;

    constructor(errorReportingClient: ErrorReportingClient) {
        this.AWS = require('aws-sdk');
        this.client = new CloudWatchLogsClient({
            region: process.env.AWS_REGION
        });
        this.setCredentials();

        this.errorReportingClient = errorReportingClient;
    }

    public async send(events: InputLogEvent[]): Promise<boolean> {
        if (events.length === 0) {
            return Promise.resolve(false);
        }

        await this.setLogStream();
        await this.putLogEvents(events);

        return Promise.resolve(true);
    }

    private setCredentials(): void {
        this.AWS.config.getCredentials((error: AWSError) => {
            if (error) {
                this.errorReportingClient.send(error.stack);
            }
        });
    }

    private async describeLogStreams(): Promise<LogStream[] | void> {
        try {
            const response = await this.client.send(
                new DescribeLogStreamsCommand({
                    logGroupName: this.GROUP_NAME,
                }),
            );

            return response.logStreams;
        } catch (error: unknown) {
            this.errorReportingClient.send(error);
        }
    }

    private async createLogStream(): Promise<boolean | void> {
        try {
            await this.client.send(
                new CreateLogStreamCommand({
                    logGroupName: this.GROUP_NAME,
                    logStreamName: this.STREAM_NAME,
                }),
            );

            return;
        } catch (error: unknown) {
            this.errorReportingClient.send(error);
        }
    }

    private async setLogStream(): Promise<boolean | void> {
        const logStreams = await this.describeLogStreams();

        const theLogStream = !!logStreams?.filter(
            logStream => logStream.logStreamName === this.STREAM_NAME
        ).length;

        return theLogStream ? Promise.resolve(true) : await this.createLogStream();
    }

    private async putLogEvents(events: InputLogEvent[]): Promise<PutLogEventsCommandOutput | void> {
        try {
            return await this.client.send(
                new PutLogEventsCommand({
                    logGroupName: this.GROUP_NAME,
                    logStreamName: this.STREAM_NAME,
                    logEvents: events,
                }),
            );
        } catch (error: unknown) {
            this.errorReportingClient.send(error);
        }
    }
}

export default CloudWatchClient;