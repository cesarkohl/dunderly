import Logging from "./src/Logging";
import CloudWatchClient from "./src/CloudWatchClient";
import Output from "../shared/Output.interface";

interface Event {
    message: string;
}

export const handler = async (event: Event): Promise<Output> => {
    const log = new Logging(new CloudWatchClient());
    return log.send(event.message);
};
