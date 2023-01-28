import Logging from "../../src/Logging";
import CloudWatchClient from "../../src/CloudWatchClient";
import BugsnagClient from "../../../error-reporting/src/BugsnagClient";
import {mockCloudWatchLogsClientSend} from "../mocks";

jest.mock("@aws-sdk/client-cloudwatch-logs");
jest.mock("@bugsnag/js");

describe('Logging', () => {
    beforeEach(() => {
        mockCloudWatchLogsClientSend();
    })

    it('sends', async () => {
        const log = new Logging(
            new CloudWatchClient(
                new BugsnagClient()
            )
        );
        const response = await log.send("My Message");

        expect(response).toStrictEqual({
            statusCode: 200,
            body: 'Message logged successfully.',
        });
    })
});