import CloudWatchClient, {mockSend} from "../__mocks__/CloudWatchClient";

beforeEach(() => {
    CloudWatchClient.mockClear();
});

describe('CloudWatchClient', () => {
    it('sends', async () => {
        const client = new CloudWatchClient();
        await client.send([{
            timestamp: Date.now(),
            message: "Message",
        }]);
    });
});