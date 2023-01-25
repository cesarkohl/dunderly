import LoggingClient from "./LoggingClient.interface";
import {AWSError} from "aws-sdk";
import {
    CloudWatchLogsClient,
    CreateLogStreamCommand, CreateLogStreamCommandOutput,
    DescribeLogStreamsCommand, DescribeLogStreamsCommandOutput,
    PutLogEventsCommand, PutLogEventsCommandOutput
} from "@aws-sdk/client-cloudwatch-logs";
import {InputLogEvent} from "aws-sdk/clients/cloudwatchlogs";

class CloudWatchClient implements LoggingClient {
    private readonly AWS: any;
    private readonly client: CloudWatchLogsClient;
    private readonly GROUP_NAME = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
    private readonly STREAM_NAME = 'log-3';

    constructor() {
        this.AWS = require('aws-sdk');
        this.client = new CloudWatchLogsClient({
            region: process.env.AWS_REGION,
        });
        this.setCredentials();
    }

    private setCredentials(): void {
        this.AWS.config.getCredentials((err: AWSError) => {
            if (err) {
                console.log(err.stack);
                return;
            }
        });
    }

    private async describeLogStreams(): Promise<DescribeLogStreamsCommandOutput> {
        return await this.client.send(
            new DescribeLogStreamsCommand({
                logGroupName: this.GROUP_NAME,
            }),
        );
    }

    private async createLogStream(): Promise<CreateLogStreamCommandOutput> {
        return await this.client.send(
            new CreateLogStreamCommand({
                logGroupName: this.GROUP_NAME,
                logStreamName: this.STREAM_NAME,
            }),
        );
    }

    private async setLogStream(): Promise<CreateLogStreamCommandOutput|void> {
        const currentLogStreams = await this.describeLogStreams();
        const defaultLogStreamExists = currentLogStreams.logStreams?.filter(
                logStream => logStream.logStreamName === this.STREAM_NAME
            ).length;

        return !defaultLogStreamExists
            ? await this.createLogStream()
            : Promise.resolve();
    }

    private async putLogEvents(events: InputLogEvent[]): Promise<PutLogEventsCommandOutput> {
        return await this.client.send(
            new PutLogEventsCommand({
                logGroupName: this.GROUP_NAME,
                logStreamName: this.STREAM_NAME,
                logEvents: events,
            })
        );
    }

    public async send(events: InputLogEvent[]): Promise<void> {
        await this.setLogStream();
        await this.putLogEvents(events);
        return Promise.resolve();
    }
}

export default CloudWatchClient;