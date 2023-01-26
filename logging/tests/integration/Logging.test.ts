import Logging from "../../src/Logging";
import CloudWatchClient from "../../src/CloudWatchClient";

jest.mock("@aws-sdk/client-cloudwatch-logs");

describe('Logging', () => {
    it('sends', async () => {
        const log = new Logging(new CloudWatchClient());
        const response = await log.send("My Message");

        expect(response).toStrictEqual({
            statusCode: 200,
            body: JSON.stringify({
                message: 'Message logged successfully.',
            }),
        });
    })
});