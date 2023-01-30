import {CloudWatchLogsClient} from "@aws-sdk/client-cloudwatch-logs";

export function mockCloudWatchLogsClientSend() {
    jest.spyOn(CloudWatchLogsClient.prototype, 'send')
        .mockImplementation(() => {
            return {
                logStreams: [],
            }
        });
}