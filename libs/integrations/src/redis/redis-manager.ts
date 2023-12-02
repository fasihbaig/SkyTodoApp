import { RedisClientType, createClient } from 'redis';
import { promisify } from 'util';

export class RedisManager {
  private static logger:any = console;
  private static instance: RedisManager | null = null;
  private client: RedisClientType;

  private constructor(url?: string) {
    this.client = createClient(url? { url }: {});

    this.client.on('error', (error: Error) => {
      RedisManager.logger.log(`Redis Error: ${error}`);
    }).connect().then(async () => {
      RedisManager.logger.log("Global redis client successfully instantiated.")
    }).catch((err:Error) => RedisManager.logger.error(err));
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
   * @param { string } duration 
   * @param { RedisTimeMode } mode // option and default value is EX 
   */
  async addData(
    key: string,
    value: any,
    duration?: number | string, // Optional parameter for the expiration time (either in seconds or with a suffix like 'ms' for milliseconds)
    mode:RedisTimeMode = RedisTimeMode.EX  // Optional parameter for Redis SET command mode (e.g., 'EX' for seconds, 'PX' for milliseconds) default value is EX
  ): Promise<void> {
    const serializedValue = typeof value !== "string"? JSON.stringify(value): value;
    if (mode && duration) {
      await this.client.set(key, serializedValue, { [mode]: duration });
    } else {
      await this.client.set(key, serializedValue);
    }
  }

  /**
   * 
   * @param { string } key 
   * @returns { Promise<T | null> }
   */
  async getData<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * 
   * @param { string } key 
   */
  async deleteData(key: string): Promise<void> {
    await this.client.del(key);
  }

  /**
   * 
   * @param { string } key 
   * @param { string } value 
   * @param { string } duration 
   * @param { RedisTimeMode } mode // option and default value is EX 
   */
  async replaceData(
    key: string, 
    value: any,
    duration?: number | string, // Optional parameter for the expiration time (either in seconds or with a suffix like 'ms' for milliseconds)
    mode: RedisTimeMode = RedisTimeMode.EX  // Optional parameter for Redis SET command mode (e.g., 'EX' for seconds, 'PX' for milliseconds) default value is EX
  ): Promise<void> {
    await this.deleteData(key);
    await this.addData(key, value, duration, mode);
  }
}

export enum RedisTimeMode {
  EX = "EX",
  PX = "PX"
}
