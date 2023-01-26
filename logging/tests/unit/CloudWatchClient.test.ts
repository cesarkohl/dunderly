import CloudWatchClient from "../../src/CloudWatchClient";

jest.mock("@aws-sdk/client-cloudwatch-logs");

describe('CloudWatchClient', () => {
    // +
    it('sends', async () => {
        const client = new CloudWatchClient();
        const response = await client.send([{
            timestamp: Date.now(),
            message: "Message",
        }]);

        expect(response).toBe(true);
    });

    // -
    it('does not send given no events', async () => {
        const client = new CloudWatchClient();
        const response = await client.send([]);

        expect(response).toBe(false);
    });
});
