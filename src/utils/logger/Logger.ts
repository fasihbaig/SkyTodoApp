export abstract class Logger<T> {

    protected abstract initialize(): T;

    public abstract info(message: string, data: {[index: string]: any}): void;

    public abstract error(message: string, data: {[index: string]: any}): void;
}