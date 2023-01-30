export default interface ErrorReportingClient {
    send(message: unknown): void;
}