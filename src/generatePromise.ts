{
  const call = () => new Promise((resolve, reject) => {
    resolve(1);
  });

  const main = function* () {
    try {
      let res = yield call();
      let res2 = yield call();

      console.log('res=>', res + res2);
    } catch (e) {
      console.error('err=>', e);
    }
  };

  function run(gen: (...args: any[]) => Generator<unknown, unknown, unknown>) {
    const args = [].slice.call(arguments, 1);
    const it = gen.apply(this, args);
    return Promise.resolve().then(function handleNext(value: any) {
      const next = it.next(value);
      return (function handleResult(next) {
        if (next.done) return next.value;
        return Promise.resolve(next.value).then(handleNext, function handleError(err) {
          return Promise.resolve(it.throw(err)).then(handleResult);
        });
      })(next);
    });
  }

  run(main);
}
