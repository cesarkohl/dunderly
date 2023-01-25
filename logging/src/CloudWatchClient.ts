import LoggingClient from "./LoggingClient.interface";
import {AWSError} from "aws-sdk";

class CloudWatchClient implements LoggingClient {
    private readonly AWS: any;

    constructor() {
        this.AWS = require('aws-sdk');
    }

    public send() {
        this.AWS.config.getCredentials((err: AWSError) => {
            if (err) {
                console.log(err.stack);
                return;
            }

            console.log('Access key:', this.AWS.config.credentials.accessKeyId);
        })
    }
}

export default CloudWatchClient;