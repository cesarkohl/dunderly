import Output from "../../shared/Output.interface";
import LoggingClient from "./contracts/LoggingClient.interface";

class Logging {
    private readonly client: LoggingClient;
    private readonly message: string;

    constructor(client: LoggingClient, message: string) {
        this.client = client;
        this.message = message;
    }

    private output(): Output {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Message logged successfully.',
            }),
        }
    }

    public async send(): Promise<Output> {
        await this.client.send([
            {
                timestamp: Date.now(),
                message: this.message,
            }
        ]);

        return this.output();
    }
}

export default Logging;