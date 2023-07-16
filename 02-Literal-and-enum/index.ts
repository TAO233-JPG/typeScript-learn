// 字面量类型（Literal Types)
// 字面量类型要求的是值级别的字面量一致。
const str: "linbudu" = "linbudu";
const num: 599 = 599;
const bool: true = true;

// 联合类型
interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

// declare var tmp: Tmp;

// if (tmp.user.vip) {
//   console.log(tmp.user.expires);
// }

type Code = 10000 | 10001 | 50000;

type Status = "success" | "failure";

// 对象字面量类型
// 实现一个对象字面量类型，意味着完全的实现这个类型每一个属性的每一个值
interface Tmp {
  obj: {
    name: "linbudu";
    age: 18;
  };
}

const t2: Tmp = {
  obj: {
    name: "linbudu",
    age: 18,
  },
  user: {
    vip: false,
    promotion: "232",
  },
};

/*
  枚举
 */

// 如果你没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增：
enum Items {
  Foo,
  Bar,
  Baz,
}
// 如果你只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增
enum Items2 {
  // 0
  Foo,
  Bar = 599,
  // 600
  Baz,
}

const returnNum = () => 100 + 499;
// 如果你使用了延迟求值，
// 那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者放在第一位：
enum Items3 {
  Foo = returnNum(),
  Bar = 599,
  Baz,
}

enum Items4 {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}

// 枚举和对象的重要差异在于，
// 对象是单向映射的，我们只能从键映射到键值。
// 而枚举是双向映射的，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：
enum Items5 {
  Foo,
  Bar,
  Baz,
  str = "sssss",
}

const fooValue = Items5.Foo; // 0
const fooKey = Items5[0]; // "Foo"
console.log(fooKey, fooValue);
console.log(Items5.str);

/* 
 常量枚举
*/

// 对于常量枚举，你只能通过枚举成员访问枚举值（而不能通过值访问成员）。
// 同时，在编译产物中并不会存在一个额外的辅助对象（如上面的 Items 对象），
// 对枚举成员的访问会被直接内联替换为枚举的值。
const enum Items6 {
  Foo,
  Bar,
  Baz,
}

const item6Foo = Items6.Foo;
const item6Bar = Items6.Bar;
const item6Baz = Items6.Baz;

// 在ts中
const a = "232424"; //类型是字面量类型
let b = '233424' //类型为string