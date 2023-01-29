import ErrorReportingClient from "./contracts/ErrorReportingClient.interface";
import Bugsnag from '@bugsnag/js'

class BugsnagClient implements ErrorReportingClient {
    constructor() {
        Bugsnag.start({ apiKey: process.env.BUGSNAG_API_KEY! });
    }

    public send(error: unknown) {
        Bugsnag.notify(JSON.stringify(error));
        throw error;
    }
}

export default BugsnagClient;