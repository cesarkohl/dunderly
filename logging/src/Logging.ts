import Output from "../../shared/Output.interface";
import LoggingClient from "./LoggingClient.interface";

class Logging {
    private readonly client: LoggingClient;
    private readonly message: string;

    constructor(client: LoggingClient, message: string) {
        this.client = client;
        this.message = message;
    }

    public output(): Output {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: this.message,
            }),
        }
    }

    public send() {
        this.client.send();
    }
}

export default Logging;