/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var max = 0;
    var res = '';
    for (var i = 0, len = s.length; i < len; i++) {
        var index = res.indexOf(s[i]);
        res += s[i];
        if (index !== -1) {
            max = Math.max(max, res.length - 1);
            res = res.slice(index + 1, i + 1);
            start = index + 1;
        }
    }
    return Math.max(max, res.length);
};
// @lc code=end
console.log(lengthOfLongestSubstring('ggububgvfk'))
