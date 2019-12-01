import { Middleware } from './compose';
import { ContextCreator, functionHooks } from './function';

export interface MiddlewareMap {
  [key: string]: Middleware[];
}

export interface ContextCreatorMap {
  [key: string]: ContextCreator;
}

export const objectHooks = (obj: any, hookMap: MiddlewareMap, contextMap: ContextCreatorMap) => {
  const keys = Object.keys(hookMap);

  return keys.reduce((result, name) => {
    const value = obj[name];
    const hooks = hookMap[name];
    const initContext = contextMap[name];

    const fn = functionHooks(value, hooks, initContext);

    result[name] = fn;

    return result;
  }, obj);
};
