//例： 求一串由数字组成的字符串的最大值
var numStr = '1 4 2 99 5 2 0 44';
// 将字符串转为数组
/**
 * 将字符串转为数组
 * 输入输出 str => []
 * @param str
 */
var strToArr = function (str) { return str.splite(' '); };
/**
 * 将字符串转为int类型
 * 输入输出str => int
 * @param str
 */
var strToNum = function (str) { return Number(str); };
/**
 * 将字符串数组 转换为数字数组
 * [str] => [int]
 * @param strs
 */
var strsToNum = function (strs) { return strs.map(strToNum); };
/**
 * 求最大值
 * 输入输出 [int] => int
 * @param arr
 */
var getMax = function (arr) { return Math.max.apply(Math, arr); };
/**
 * 命令式方式
 */
var getMaxByStr1 = function (strs) {
    /**
     * 各个输入输出
     * str => [str]
     * [str] => [int]
     * [int] => int
     */
    var strsArr = strToArr(strs);
    var numStrs = strsToNum(strsArr);
    var max = getMax(numStrs);
    return max;
};
getMaxByStr1(numStr);
/**
 * point-free风格
 * 将函数组合 不关心参数之间的转换
 */
var getMaxByStr2 = R.pipe(strToArr, strsToNum, getMax);
getMaxByStr2(numStr);
