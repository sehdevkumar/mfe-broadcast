// src/BroadcastService.ts
class BroadcastService {
    static instance = null;
    channelName = '';
    uuid = '';
    channel;
    constructor(channelName) {
        if (channelName) {
            this.close();
            this.initChannel(channelName);
        }
    }
    getUUID() {
        return this.uuid;
    }
    static getInstance(channelName = '') {
        if (!BroadcastService.instance) {
            BroadcastService.instance = new BroadcastService(channelName);
        }
        return BroadcastService.instance;
    }
    initChannel(channelName) {
        this.channelName = channelName;
        this.channel = new BroadcastChannel(channelName);
        this.uuid = channelName;
    }
    sendMessage(message) {
        if (!this.channel) {
            console.error('Channel is not initialized.');
            return;
        }
        this.channel.postMessage(message);
    }
    onMessage(callback) {
        if (!this.channel) {
            console.error('Channel is not initialized.');
            return;
        }
        this.channel.onmessage = (event) => {
            callback(event.data);
        };
    }
    close() {
        if (this.channel) {
            this.channel.close();
            console.info(this.channelName, 'closed');
        }
    }
}
export default BroadcastService;
