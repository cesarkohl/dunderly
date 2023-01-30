import Output from "../../shared/Output.interface";
import LoggingClient from "./contracts/LoggingClient.interface";

class Logging {
    private readonly client: LoggingClient;

    constructor(client: LoggingClient) {
        this.client = client;
    }

    public async send(message: string): Promise<Output> {
        await this.client.send([{
            timestamp: Date.now(),
            message: message,
        }]);

        return this.output();
    }

    private output(): Output {
        return {
            statusCode: 200,
            body: 'Message logged successfully.',
        }
    }
}

export default Logging;