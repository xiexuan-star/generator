{
  function asyncFunc(cb) {
    setTimeout(() => {
      cb(null, 'hello');
    }, 1000);
  }

  const call = () => {
    asyncFunc((err, res) => {
      if (err) {
        it.throw(err);
      } else {
        it.next(res);
      }
    });
  };

  const main = function* (){
    try {
      const res = yield call();
      console.log('res=>', res);
    } catch (e) {
      console.error('err=>', e);
    }
  };

  const it = main();
  it.next();
}
