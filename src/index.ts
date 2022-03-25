function* generator() {
  let i = 0;
  try {
    while (true) {
      yield ++i;
    }
  } catch (e) {
    console.log('end');
    // yield 'end'
  }
}

const it = generator()
console.log(it.next());
console.log(it.next());
console.log(it.next());
// console.log(it.return(100 as any));
// console.log(it.return(200 as any));
// console.log(it.next());
console.log(it.throw('error'));
console.log(it.next());
