import LoggingClient from "./contracts/LoggingClient.interface";
import {AWSError} from "aws-sdk";
import {
    CloudWatchLogsClient,
    CreateLogStreamCommand,
    DescribeLogStreamsCommand, DescribeLogStreamsCommandOutput,
    PutLogEventsCommand, PutLogEventsCommandOutput,
} from "@aws-sdk/client-cloudwatch-logs";
import {InputLogEvent} from "aws-sdk/clients/cloudwatchlogs";

class CloudWatchClient implements LoggingClient {
    private readonly AWS: any;
    private readonly client: CloudWatchLogsClient;
    private readonly GROUP_NAME = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
    private readonly STREAM_NAME = process.env.AWS_LAMBDA_LOG_STREAM_NAME;

    constructor() {
        this.AWS = require('aws-sdk');
        this.client = new CloudWatchLogsClient({
            region: process.env.AWS_REGION,
        });
        this.setCredentials();
    }

    private setCredentials(): void {
        this.AWS.config.getCredentials((error: AWSError) => {
            if (error) {
                throw error.stack;
            }
        });
    }

    private async describeLogStreams(): Promise<DescribeLogStreamsCommandOutput|void> {
        try {
            return await this.client.send(
                new DescribeLogStreamsCommand({
                    logGroupName: this.GROUP_NAME,
                }),
            );
        } catch (error: unknown) {
            throw error;
        }
    }

    private async createLogStream(): Promise<boolean|void> {
        try {
            await this.client.send(
                new CreateLogStreamCommand({
                    logGroupName: this.GROUP_NAME,
                    logStreamName: this.STREAM_NAME,
                }),
            );

            return;
        } catch (error: unknown) {
            throw error;
        }
    }

    private async setLogStream(): Promise<boolean|void> {
        const currentLogStreams = await this.describeLogStreams();
        const defaultLogStreamExists = currentLogStreams?.logStreams?.filter(
                logStream => logStream.logStreamName === this.STREAM_NAME
            ).length;

        return !defaultLogStreamExists
            ? await this.createLogStream()
            : Promise.resolve(true);
    }

    private async putLogEvents(events: InputLogEvent[]): Promise<PutLogEventsCommandOutput|void> {
        try {
            return await this.client.send(
                new PutLogEventsCommand({
                    logGroupName: this.GROUP_NAME,
                    logStreamName: this.STREAM_NAME,
                    logEvents: events,
                }),
            );
        } catch (error: unknown) {
            throw error;
        }
    }

    public async send(events: InputLogEvent[]): Promise<boolean> {
        if (events.length === 0) {
            return Promise.resolve(false);
        }

        await this.setLogStream();
        await this.putLogEvents(events);

        return Promise.resolve(true);
    }
}

export default CloudWatchClient;