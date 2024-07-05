// src/BroadcastService.ts

class BroadcastService {
    private static instance: BroadcastService | null = null;
    channelName: string = '';
    private uuid: string = '';
    private channel!: BroadcastChannel;

     constructor(channelName: string) {
        if (channelName) {
            this.close()
            this.initChannel(channelName);
        }
    }


    getUUID(): string {
         return this.uuid
    }

    static getInstance(channelName: string = ''): BroadcastService {
        if (!BroadcastService.instance) {
            BroadcastService.instance = new BroadcastService(channelName);
        }
        return BroadcastService.instance;
    }

    initChannel(channelName: string) {
        this.channelName = channelName;
        this.channel = new BroadcastChannel(channelName);
        this.uuid = channelName;
    }

    sendMessage(message: any) {
        if (!this.channel) {
            console.error('Channel is not initialized.');
            return;
        }
        this.channel.postMessage(message);
    }

    onMessage(callback: (arg: any) => void) {
        if (!this.channel) {
            console.error('Channel is not initialized.');
            return;
        }
        this.channel.onmessage = (event: MessageEvent<any>) => {
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
