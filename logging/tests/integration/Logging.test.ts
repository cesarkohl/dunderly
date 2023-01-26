import Logging from "../../src/Logging";
import CloudWatchClient from "../../src/CloudWatchClient";

describe('Logging', () => {
    it('sanity', () => {
        expect(1 + 2).toBe(3);
    });

    it('positive', async () => {
        const log = new Logging(new CloudWatchClient(), "Message");
        console.log(1, await log.send());
    })
});