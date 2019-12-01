// export function hooks<T = any, C = Context> (middleware: Array<Middleware<C>>): MethodDecorator<T>;
// export function hooks<T = any, C = Context> (fn: AsyncFunction<T>, middleware: Array<Middleware<C>>): AsyncFunction<T|Context>;
// export const hooks = (...args: any[]) => {
//   const [ target ] = args;

//   if (Array.isArray(target)) {
//     return hookDecorator(...args);
//   } else if (typeof target === 'object') {
//     return hookObject(...args);
//   }

//   return hookFunction(...args);
// };
