import Output from "../../shared/Output.interface";
import LoggingClient from "./contracts/LoggingClient.interface";

class Logging {
    private readonly client: LoggingClient;

    constructor(client: LoggingClient) {
        this.client = client;
    }

    private output(): Output {
        return {
            statusCode: 200,
            body: 'Message logged successfully.',
        }
    }

    public async send(message: string): Promise<Output> {
        await this.client.send([{
            timestamp: Date.now(),
            message: message,
        }]);

        return this.output();
    }
}

export default Logging;