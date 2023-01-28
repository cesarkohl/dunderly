import CloudWatchClient from "../../src/CloudWatchClient";
import BugsnagClient from "../../../error-reporting/src/BugsnagClient";
import {mockCloudWatchLogsClientSend} from "../mocks";

jest.mock("@aws-sdk/client-cloudwatch-logs");
jest.mock("@bugsnag/js");

describe('CloudWatchClient', () => {
    beforeEach(() => {
        mockCloudWatchLogsClientSend();
    })

    it('sends', async () => {
        const client = new CloudWatchClient(
            new BugsnagClient()
        );
        const response = await client.send([{
            timestamp: Date.now(),
            message: "Message",
        }]);

        expect(response).toBe(true);
    });

    it('does not send given no events', async () => {
        const client = new CloudWatchClient(
            new BugsnagClient()
        );
        const response = await client.send([]);

        expect(response).toBe(false);
    });
});
