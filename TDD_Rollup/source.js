const fn1 = () => "fn1";
var a1 = [],
  b1 = {},
  c1 = "c1";
function fn2() {
  const a2 = "2";
  function fn3() {
    const a3 = "a3";
  }
  fn3();
}
fn1();
