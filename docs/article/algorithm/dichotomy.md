# Dichotomy 二分法

### T2300. [咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/)

给你两个正整数数组 `spells` 和 `potions` ，长度分别为 `n` 和 `m` ，其中 `spells[i]` 表示第 `i` 个咒语的能量强度，`potions[j]` 表示第 `j` 瓶药水的能量强度。

同时给你一个整数 `success` 。一个咒语和药水的能量强度 **相乘** 如果 **大于等于** `success` ，那么它们视为一对 **成功** 的组合。

请你返回一个长度为 `n` 的整数数组 `pairs`，其中 `pairs[i]` 是能跟第 `i` 个咒语成功组合的 **药水** 数目。

**示例 1：**

```
输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
输出：[4,0,3]
解释：
- 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
- 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
- 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
所以返回 [4,0,3] 。
```

**示例 2：**

```
输入：spells = [3,1,2], potions = [8,5,8], success = 16
输出：[2,0,2]
解释：
- 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。总共 2 个成功组合。
- 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
- 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。总共 2 个成功组合。
所以返回 [2,0,2] 。
```

**提示：**

- `n == spells.length`
- `m == potions.length`
- `1 <= n, m <= 105`
- `1 <= spells[i], potions[i] <= 105`
- `1 <= success <= 1010`



#### 我的答案

看题目规模乘出来是超过int的大小的，因此得用long。

也可以用除法，先把药水排序，然后根据`success`和咒语相除找出一个满足药水的最小值，然后用二分法从药水中找到位置。

这题也可以用[双指针](two-pointers.md)的方法来解。

```java
class Solution {
    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int n = spells.length;
        int m = potions.length;
        
        Arrays.sort(potions);
        int[] results = new int[n];
        for (int i=0; i<n; i++){
            long threadshold = (success + spells[i] - 1) / spells[i] - 1;
            results[i] = m - binarySearch(potions, 0, m-1, threadshold);
        }
        return results;
    }

    //Find the number that is larger than the threadshold
    private int binarySearch(int[] potions, int low, int high, long threadshold){
        int res = high + 1;
        while (low <= high){
            int mid = low + (high-low)/2;
            if (potions[mid] > threadshold){
                res = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return res;
    }
}
```

