import { RedisClientType, createClient, SetOptions } from 'redis';
import { promisify } from 'util';

export class RedisManager {
  private static instance: RedisManager | null = null;
  private client: RedisClientType;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (
    key: string,
    value: string,
    mode?: string,
    duration?: number | string,
  ) => Promise<'OK'>;
  private delAsync: (key: string) => Promise<number>;

  constructor() {
    this.client = createClient();
    this.client.on('error', (error: Error) => {
      console.error(`Redis Error: ${error}`);
    });

    // Promisify some Redis functions for better async handling
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.client.set("df", "ddd", { })
  }

  /**
   * 
   * @returns { RedisManager }
   */
  public static getInstance(): RedisManager {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  /**
   * 
   * @param { string } key 
   * @param { string } value 
   * @param { RedisTimeMode } mode 
   * @param duration 
   */
  async addData(
    key: string,
    value: any,
    mode?: RedisTimeMode, // Optional parameter for Redis SET command mode (e.g., 'EX' for seconds, 'PX' for milliseconds)
    duration?: number | string, // Optional parameter for the expiration time (either in seconds or with a suffix like 'ms' for milliseconds)
  ): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (mode && duration) {
      await this.setAsync(key, serializedValue, mode, duration);
    } else {
      await this.setAsync(key, serializedValue);
    }
  }

  /**
   * 
   * @param { string } key 
   * @returns { Promise<T | null> }
   */
  async getData<T>(key: string): Promise<T | null> {
    const data = await this.getAsync(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * 
   * @param { string } key 
   */
  async deleteData(key: string): Promise<void> {
    await this.delAsync(key);
  }

  /**
   * 
   * @param { string } key 
   * @param { string } value 
   */
  async replaceData(key: string, value: any): Promise<void> {
    await this.deleteData(key);
    await this.addData(key, value);
  }
}

export enum RedisTimeMode {
  EX = "EX",
  PX = "PX"
}
