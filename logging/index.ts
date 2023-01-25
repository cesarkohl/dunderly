import Logging from "./src/Logging";
import CloudWatchClient from "./src/CloudWatchClient";

interface Event {
    message: string;
}

export const handler = async(event: Event) => {
    const log = new Logging(new CloudWatchClient(), event.message);
    log.send();
    return log.output();
};
