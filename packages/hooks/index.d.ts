type Middleware<T> = (context: T, next: () => Promise<any>) => Promise<any>;

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export interface Context {
  arguments: any[];
  [key: string]: any;
}

export interface MiddlewareMap<C> {
  [key: string]: Array<Middleware<C>>;
}

export type MethodDecorator<T> = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>|void;

export const RETURN: symbol;
export const HOOKS: symbol;
export const ORIGINAL: symbol;

declare function hooks<T = any, C = Context> (middleware: Array<Middleware<C>>): MethodDecorator<T>;
declare function hooks<T = any, C = Context> (fn: AsyncFunction<T>, middleware: Array<Middleware<C>>): AsyncFunction<T|Context>;

export default hooks;
