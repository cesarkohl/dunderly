import Logging from "./src/Logging";
import CloudWatchClient from "./src/CloudWatchClient";
import Output from "../shared/Output.interface";
import Bugsnag from '@bugsnag/js';
import BugsnagClient from "../error-reporting/src/BugsnagClient";

// Bugsnag.start({ apiKey: '6b1e0dac71f299d84e0b0a3fd429c9ce' });
Bugsnag.start({ apiKey: process.env.BUGSNAG_API_KEY ?? '' });
Bugsnag.notify("This is an error - 2");

interface Event {
    message: string;
}

export const handler = async (event: Event): Promise<Output> => {
    const log = new Logging(
        new CloudWatchClient(
            new BugsnagClient()
        )
    );
    return log.send(event.message);
};
