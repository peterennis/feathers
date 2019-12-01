import { strict as assert } from 'assert';

describe('objectHooks', () => {
  const symbol = Symbol('test');
  const obj = {
    test: 'me',

    [symbol]: true,

    async sayHi (name) {
      return `Hi ${name}`;
    },

    async addOne (number) {
      return number + 1;
    }
  };

  it('returns a new object with hook methods, sets method name', async () => {
    const hookedObj = hooks(obj, {
      sayHi: [async (ctx, next) => {
        assert.deepStrictEqual(ctx, {
          method: 'sayHi',
          arguments: [ 'David' ]
        });

        await next();

        ctx.result += '?';
      }],
      addOne: [async (ctx, next) => {
        ctx.arguments[0] += 1;

        await next();
      }]
    });

    assert.ok(hookedObj[symbol]);
    assert.notStrictEqual(obj, hookedObj);
    assert.strictEqual(await hookedObj.sayHi('David'), 'Hi David?');
    assert.strictEqual(await hookedObj.addOne(1), 3);
  });

  it('hooking multiple times combines hooks for methods', async () => {
    const first = hooks(obj, {
      sayHi: [async (ctx, next) => {
        await next();

        ctx.result += '?';
      }]
    });
    const hookedObj = hooks(first, {
      sayHi: [async (ctx, next) => {
        await next();

        ctx.result += '!';
      }]
    });

    assert.strictEqual(await hookedObj.sayHi('David'), 'Hi David!?');
  });

  it('throws an error when hooking invalid method', async () => {
    try {
      hooks(obj, {
        test: [async (ctx, next) => {
          await next();
        }]
      });
      assert.fail('Should never get here');
    } catch (error) {
      assert.strictEqual(error.message, `Can not apply hooks. 'test' is not a function`);
    }
  });
});