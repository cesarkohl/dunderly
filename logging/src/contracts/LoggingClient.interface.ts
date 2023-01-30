interface LogEvent {
    timestamp: number;
    message: string;
}

export default interface LoggingClient {
    send(events: LogEvent[]): Promise<boolean>;
}