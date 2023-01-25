import Output from "../../shared/Output.interface";

class Logging {
    private readonly message: string;

    constructor(message: string) {
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

    public sendToCloudWatch() {

    }
}

export default Logging;