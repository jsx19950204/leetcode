/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    var hLen = haystack.length;
    var nLen = needle.length;
    if (nLen === 0) return 0;
    if (nLen > hLen) return -1;
    // 构造dp数组
    var dp = new Array(nLen);
    for (var i = 0; i < nLen; i++) {
        dp[i] = [];
        for (var j = 0; j < 256; j++) {
            dp[i][String.fromCodePoint(j)] = 0;
        }
    }
    dp[0][needle[0]] = 1;
    var x = 0;
    for (var i = 1; i < nLen; i++) {
        for (var j = 0; j < 256; j++) {
            var curr = String.fromCodePoint(j);
            // 状态推进
            if (curr === needle[i]) {
                dp[i][curr] = i + 1;
            } else {
                dp[i][curr] = dp[x][curr];
            }
        }
        x = dp[x][needle[i]];
    }
    // 匹配
    var j = 0;
    for (var i = 0; i < hLen; i++) {
        j = dp[j][haystack[i]];
        if (j === nLen) {
            return i - nLen + 1;
        }
    }
    return -1;
};
// @lc code=end

console.log(strStr('aaaaaaaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaab'));