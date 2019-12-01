export type MethodDecorator<T> = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>|void;

const hookDecorator = (hooks, getContext = defaultGetContext) => {
  return (target, method, descriptor) => {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`Can not apply hooks. '${method}' is not a function`);
    }

    descriptor.value = hookFunction(fn, hooks, getContext({ method }));

    return descriptor;
  };
};
