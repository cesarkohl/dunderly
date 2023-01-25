import LoggingClient from "./LoggingClient.interface";
import {AWSError} from "aws-sdk";
import {PutEventsResponse} from "aws-sdk/clients/cloudwatchevents";

class CloudWatchClient implements LoggingClient {
    private readonly AWS: any;

    constructor() {
        this.AWS = require('aws-sdk');
        this.setCredentials();
    }

    public setCredentials(): void {
        this.AWS.config.getCredentials((err: AWSError) => {
            if (err) {
                console.log(err.stack);
                return;
            }

            // console.log('Access key:', this.AWS.config.credentials.accessKeyId);
            // console.log('Region:', this.AWS.config.region);
        });
    }

    public send() {
        const cwEvents = new this.AWS.CloudWatchEvents({
            apiVersion: "2015-10-07",
        });

        const params = {
            Entries: [
                {
                    Detail: '{ \"key1\": \"value1\", \"key2\": \"value2\" }',
                    DetailType: 'appRequestSubmitted',
                    Resources: [
                        'RESOURCE_ARN',
                    ],
                    Source: 'com.company.app'
                },
            ],
        };

        cwEvents.putEvents(params, (err: AWSError, data: PutEventsResponse) => {
            if (err) {
                console.log("Error", err);
                return;
            }

            console.log("Success", data.Entries);
        });
    }
}

export default CloudWatchClient;