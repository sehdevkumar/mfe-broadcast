import BroadcastService from "./BroadCastService";
declare class BroadcastChannelInstanceManager {
    private instanceCollection;
    getAllInstance(): BroadcastService[];
    createChannels(...channels: string[]): void;
    dropChannels(): void;
    dropByName(channelName: string): void;
    getChannelByName(channelName: string): BroadcastService | null;
}
export default BroadcastChannelInstanceManager;
