import { createClient } from 'redis';

export class RedisClient {
    static initGlobalClient(): void {
        const client = createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));    
    }
}