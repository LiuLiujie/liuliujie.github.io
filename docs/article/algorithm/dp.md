---
category: Computer Science
tag:
- Algorithms
- Leetcode
- Dynamic Programming
---
# Dynamic Programming

This blog records the solutions I made for the Dynamic Programming questions from Leetcode.

## Fibonacci related problems

Firstly, find out the **transformation function** for the problem.

Then, from the starting point to calculate the results by iterating the array. 

Finally, reach and output the final result.

Typically, we don't have to persist all the intermediate results and only three or four states is needed.

### T70. [Climbing Stairs](https://leetcode.cn/problems/climbing-stairs/)

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Example 1:**

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step 
```

**Constraints:**

- `1 <= n <= 45`

#### My Solution

We find that the ways we used to reach `n` only depends on the ways to `n-1` and `n-2`.  So we can conclude that `f(n) = f(n-1) + f(n-2)`. We use `p` to represent `n-2` steps and `q` for `n-1` steps. So we can get:

```c++
class Solution {
public:
    int climbStairs(int n) {
        int p = 0, q = 1;
        int next;
        for (int i = 0; i < n; i++){
            next = p + q;
            p = q;
            q = next;
        }
        return next;
    }
};
```



### T509. [Fibonacci Number](https://leetcode.cn/problems/fibonacci-number/)

The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,

```
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
```

Given `n`, calculate `F(n)`.

**Example 1:**

```
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
```

**Example 2:**

```
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
```

**Example 3:**

```
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
```

**Constraints:**

- `0 <= n <= 30`

#### My Solution

The same logic as the above question.

```c++
class Solution {
public:
    int fib(int n) {
        int p = 0; int q = 1;
        if (n == 0) {return p;}
        if (n == 1) {return q;}
        int next;
        for (int i=1; i<n; i++ ){
            next = p + q;
            p = q;
            q = next;
        }
        return next;
    }
};
```



### 1137. [N-th Tribonacci Number](https://leetcode.cn/problems/n-th-tribonacci-number/)

The Tribonacci sequence Tn is defined as follows: 

$T_0 = 0$, $T_1 = 1$, $T_2 = 1$, and $T_{n+3} = T_n + T_{n+1} + T_{n+2}$ for n >= 0.

Given `n`, return the value of $T_n$.

**Example 1:**

```
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
```

**Example 2:**

```
Input: n = 25
Output: 1389537
```

**Constraints:**

- `0 <= n <= 37`
- The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.

#### My Solution

The same logic as the first question.

```c++
class Solution {
public:
    int tribonacci(int n) {
        if (n < 2) {
            return n;
        }
        if (n == 2) {
            return 1;
        }
        int p = 0, q = 1, r = 1;
        int next;
        for (int i=2; i<n; i++){
            next = p + q + r;
            p = q;
            q = r;
            r = next;
        }
        return next;
    }
};
```



### T746. [Min Cost Climbing Stairs](https://leetcode.cn/problems/min-cost-climbing-stairs/)

You are given an integer array `cost` where `cost[i]` is the cost of $I^{th}$ step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return *the minimum cost to reach the top of the floor*.

**Example 1:**

```
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2:**

```
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

**Constraints:**

- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

#### My Solution

f(n) =  min(f(n-1), f(n-2)) + cost[n]

```c++
class Solution {
public:
    int min (int p, int q){
        return p <= q ? p : q;
    }

    int minCostClimbingStairs(vector<int>& cost) {
        int p =0, q = cost[0];
        int len = cost.size();
        int nextCost;
        for (int i=1; i<len; i++){
            nextCost = min(p, q) + cost[i];
            p = q;
            q = nextCost;
        }
        return min(p, q);
    }
};
```



### T198. [House Robber](https://leetcode.cn/problems/house-robber/)

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***. 

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 2:**

```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12. 
```

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

#### My Solution

The robber must rob the house that either is separated by one, or separated by two

```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1){
            return nums[0];
        }
        if (nums.length == 2){
            return nums[0] > nums[1] ? nums[0] : nums[1];
        }
        int p = 0;
        int q = nums[0];
        int r = nums[1];
        int next;
        for (int i=2; i<nums.length; i++){
            next = nums[i] + (p > q ? p : q);
            p = q;
            q = r;
            r = next;
        }
        return r > q ? r : q;
    }
}
```

### T740. [Delete and Earn](https://leetcode.cn/problems/delete-and-earn/)

You are given an integer array `nums`. You want to maximize the number of points you get by performing the following operation any number of times:

- Pick any `nums[i]` and delete it to earn `nums[i]` points. Afterwards, you must delete **every** element equal to `nums[i] - 1` and **every** element equal to `nums[i] + 1`.

Return *the **maximum number of points** you can earn by applying the above operation some number of times*.

**Example 1:**

```
Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
```

**Example 2:**

```
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.
```

**Constraints:**

- `1 <= nums.length <= 2 * 104`
- `1 <= nums[i] <= 104`

#### My Solution

Firstly, we need to sort the `nums`

Then, we can conclude that $f(n) = (sum\ of\ the\ num[i]) +  (num[i] == nums[i] - 1)\ ?\ max( f(n-2), f (n-3)) : max(f(n-1), f(n-2))$

```java
class Solution {
    public int deleteAndEarn(int[] nums) {
        Arrays.sort(nums);
        int idx = 0;
        int length = nums.length;
        int lastNum = nums[0];
        int curNum = nums[0];
        int p=0;
        int q=0;
        int r=0;
        for (;idx<length;idx++){
            if (nums[idx] == curNum){
                r+=nums[idx];
            }else{
                lastNum = nums[idx-1];
                curNum = nums[idx];
                break;
            }
        }
        if (idx == length){
            return r;
        }
        int temp;
        int next;
        while(idx<length){
            temp = 0;
            for (;idx<length;idx++){
                if (nums[idx] == curNum){
                    temp += nums[idx];
                }else {
                    break;
                }
            }
            if (lastNum == curNum - 1){
                next = temp + (p > q ? p : q);
                p = q;
                q = r;
                r = next;
            } else {
                next = temp + (q > r ? q : r);
                p = q;
                q = r;
                r = next;
            }
            lastNum = curNum;
            if (idx < length){
                curNum = nums[idx];
            }
        }
        return r > q? r : q;
    }
}
```

## Matrix related problems

### T62. [Unique Paths](https://leetcode.cn/problems/unique-paths/)

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The test cases are generated so that the answer will be less than or equal to $2 * 10^9$.

**Example1:**

![Example1](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

```
Input: m = 3, n = 7
Output: 28
```

**Example 2:**

```
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

#### My Solution

The elements from firstly line and the first column are always 1 because there is only one path.

The state transformation function is $f(x,y) = f(x-1,y) + f(x,y-1)$.

The following solution records all the intermediate results, but the memory can still be optimised since only the upper row and left column are necessary for the calculation.

```java
class Solution {
    public int uniquePaths(int m, int n) {
        if (m==1 || n==1){
            return 1;
        }
        int[][] results = new int[m][n];
        results[0][0] = 0;
        for (int y=0; y<m; y++){
            results[y][0] = 1;
        }
        for (int x=0; x<n; x++){
            results[0][x] = 1;
        }
        for (int y=1; y<m; y++){
            for (int x=1; x<n; x++){
                results[y][x] = results[y-1][x] + results[y][x-1];
            }
        }
        return results[m-1][n-1];
    }
}
```



### T64. [Minimum Path Sum](https://leetcode.cn/problems/minimum-path-sum/)

Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

**Example 1:**

![Example1](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

**Example 2:**

```
Input: grid = [[1,2,3],[4,5,6]]
Output: 12 
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`

#### My Solution

The same logic as the question above, but with a little changes in initialization and state transformation function.

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length; // columns
        int n = grid[0].length; // lines
        int[][] results = new int[m][n];
        
        //Init the starting point
        results[0][0] = grid[0][0];
        
        //Init the results with the first line and the first column
        for (int i=1; i<m; i++){
            results[i][0] = grid[i][0] + results[i-1][0];
        }
        for (int j=1; j<n; j++){
            results[0][j] = grid[0][j] + results[0][j-1];
        }

        // State transformation funciton: 
        // results[y][x] = min (results[y-1][x], results[y][x-1]) + grid[y][x]
        for (int y =1; y<m; y++){
            for(int x=1; x<n; x++){
                results[y][x] = Math.min(results[y-1][x], results[y][x-1]) + grid[y][x];
            }
        }

        return results[m-1][n-1];
    }
}
```

