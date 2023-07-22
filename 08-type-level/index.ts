type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2

type Result26 = any extends "linbudu" ? 1 : 2; // 1 | 2
type Result27 = any extends string ? 1 : 2; // 1 | 2
type Result28 = any extends {} ? 1 : 2; // 1 | 2
type Result29 = any extends never ? 1 : 2; // 1 | 2

// any来者不拒，而 unknown 则只允许赋值给 unknown 类型和 any 类型，
// 这也是由于“系统设定”的原因，即 any 可以表达为任何类型。

/* never 类型，
  因为它代表了“虚无”的类型，一个根本不存在的类型。
  对于这样的类型，它会是任何类型的子类型，当然也包括字面量类型：
 */

type TypeChain = never extends "linbudu"
  ? "linbudu" extends "linbudu" | "599"
    ? "linbudu" | "599" extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
