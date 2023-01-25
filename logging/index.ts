import Logging from "./src/Logging";

interface Event {
    message: string;
}

export const handler = async(event: Event) => {
    const log = new Logging(event.message);
    return log.output();
};
