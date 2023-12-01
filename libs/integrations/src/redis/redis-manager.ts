import { RedisClientType, createClient } from 'redis';
import { promisify } from 'util';

export class RedisManager {
  private static logger:any = console;
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

  private constructor(url?: string) {
    this.client = createClient(url? { url }: {});

    this.client.on('error', (error: Error) => {
      RedisManager.logger.log(`Redis Error: ${error}`);
    }).connect().then(async () => {
      RedisManager.logger.log("Global redis client successfully instantiated.")
    }).catch((err:Error) => RedisManager.logger.error(err));
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * 
   * @returns { RedisManager }
   */
  public static getGlobalRedisInstance(): RedisManager {
    if(!RedisManager.instance) {
        throw new Error("Please initialize global redis client using RedisManager class.");
    }
    return RedisManager.instance;
  }

  /**
   * 
   * @param { string } url optional
   */
  public static initializeGlobalRedisInstance(url?: string, logger?: any) {
    if(logger) {
      RedisManager.logger = logger;
    }
    this.instance = new RedisManager(url);
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
