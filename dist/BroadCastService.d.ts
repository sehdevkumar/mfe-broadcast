declare class BroadcastService {
    private static instance;
    channelName: string;
    private uuid;
    private channel;
    constructor(channelName: string);
    getUUID(): string;
    static getInstance(channelName?: string): BroadcastService;
    initChannel(channelName: string): void;
    sendMessage(message: any): void;
    onMessage(callback: (arg: any) => void): void;
    close(): void;
}
export default BroadcastService;
