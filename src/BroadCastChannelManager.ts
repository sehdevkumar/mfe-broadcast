// src/BroadcastChannelInstanceManager.ts

import BroadcastService from "./BroadCastService";


class BroadcastChannelInstanceManager {
    private instanceCollection: BroadcastService[] = [];

    getAllInstance(): BroadcastService[] {
        return this.instanceCollection;
    }

    createChannels(...channels: string[]): void {
        channels?.forEach((channelName) => {
            const existingInstance = this.instanceCollection?.find(
                (instance) => instance?.channelName === channelName
            );

            if (existingInstance) {
                console.error(channelName, 'Channel already exists.');
            } else {
                const instance = new BroadcastService(channelName);
                console.log(instance,"created successfully")
                this.instanceCollection.push(instance);
            }
        });
    }

    dropChannels(): void {
        this.instanceCollection.forEach((instance) => {
            instance.close();
        });
        this.instanceCollection = [];
    }

    dropByName(channelName: string): void {
        const instanceIndex = this.instanceCollection.findIndex(
            (instance) => instance.channelName === channelName
        );

        if (instanceIndex !== -1) {
            this.instanceCollection[instanceIndex].close();
            this.instanceCollection.splice(instanceIndex, 1);
        } else {
            console.error(channelName, 'Channel not found.');
        }
    }

    getChannelByName(channelName: string): BroadcastService | null {
        const instance = this.instanceCollection.find(
            (instance) => instance.channelName === channelName
        );

        if (instance) {
            return instance;
        } else {
            console.error(channelName, 'Channel not found.');
            return null;
        }
    }
}

export default BroadcastChannelInstanceManager;
