import Logging from "./src/Logging";
import CloudWatchClient from "./src/CloudWatchClient";
import Output from "../shared/Output.interface";
import BugsnagClient from "../error-reporting/src/BugsnagClient";

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
