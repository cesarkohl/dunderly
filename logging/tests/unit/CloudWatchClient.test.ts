import CloudWatchClient from "../../src/CloudWatchClient";

jest.mock('@aws-sdk/client-cloudwatch-logs');

describe('CloudWatchClient', () => {
    it('sends', async () => {
        const client = new CloudWatchClient();
        await client.send([{
            timestamp: Date.now(),
            message: "Message",
        }]);
    });
});