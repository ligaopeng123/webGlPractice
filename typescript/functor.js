// 创建一个容器
var Functor = function (val) {
    this.value = val;
};
// 添加of接口，省略new去创建
Functor.of = function (val) {
    // @ts-ignore
    return new Functor(val);
};
// 实现map接口
Functor.prototype.map = function (fn) {
    return Functor.of(fn(this.value));
};
var v = Functor.of(2);
var t = Functor.of({ a: 1 });
var r = Functor.of([1, 2]);
console.log(v, t, r);
// Functor { value: 2 } Functor { value: { a: 1 } } Functor { value: [ 1, 2 ] }
console.log(v.map(function (x) {
    return x * x;
}).map(function (x) {
    return x + x;
}));
// Functor { value: 8 }
/**
 * 创建一个MayBe容器
 * @param val
 * @constructor
 */
var MayBe = function (val) {
    this.value = val;
};
// 添加of接口，省略new去创建
MayBe.of = function (val) {
    // @ts-ignore
    return new MayBe(val);
};
/**
 * 定义isNothing函数 判断数据是否为空
 */
MayBe.prototype.isNothing = function () {
    return this.value !== undefined && this.value !== null;
};
/**
 * 重写map函数
 * @param fn
 */
MayBe.prototype.map = function (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};
// 测试代码
var n = MayBe.of(null).map(function (v) {
    return v * 1;
}).map(function (v) {
    return v;
});
console.log(n); // MayBe { value: null }
/**
 * Either函子
 */
// 创建一个Either容器
var Either = function (val) {
    this.value = val;
};
// 添加of接口，省略new去创建
Either.of = function (val) {
    // @ts-ignore
    return new Either(val);
};
// 创建一个Nothing容器 包裹错误信息
var Nothing = function (val) {
    this.value = val;
};
// 添加of接口，省略new去创建
Nothing.of = function (val) {
    // @ts-ignore
    return new Nothing(val);
};
// 定义map接口
Nothing.prototype.map = function (fn) {
    return this;
};
Either.Nothing = Nothing;
/**
 * 定义map接口
 * @param fn
 */
Either.prototype.map = function (fn) {
    try {
        return Either.of(fn(this.value));
    }
    catch (e) {
        return Either.Nothing.of(e);
    }
};
// 测试代码
var e = Either.of(undefined).map(function (v) {
    return v.length / 0;
}).map(function (v) {
    return v;
});
console.log(e); // Nothing {
// value: TypeError: Cannot read property 'length' of undefined
// at ...
// 以下代码 会打印出来 不会中断程序执行
console.log(4444); // 4444
console.log(6666); // 6666
