---
category: Computer Science
tag:
- Algorithms
- Leetcode
- Backtracking
---

# Backtracking Algorithm 回溯算法

## In a netshell 解题思路

**In abraction, solving a backtracking problem is acutally iterating a decision tree. Every node of a tree has a valid answer and we traversing the tree to collect all the valid answers.  抽象地说，解决一个回溯问题，实际上就是遍历一棵决策树的过程，树的每个叶子节点存放着一个合法答案。你把整棵树遍历一遍，把叶子节点上的答案都收集起来，就能得到所有的合法答案**。

To solve these problems, we need to consider:

1. **Path**：The decisions we have made.
2. **Possible choices**: The choices we can make now. 
3. **Ending conditio**n: The bottom of the decision tree. 

The framework of the backtracking algorithm: 

- **Make a choice before backtrack function and undo the choice after it.**
- **When reaching the ending condition, save the current path as the result.**

```python
results = []
def backtrack(path, choices):
    if ending_condition:
        results.add(path)
        return
    
    for choice in choices:
        # Make a choice
        backtrack(path, choice)
        # Undo the choice

```

Note: Typically backtracking algorithm does not have a way to pruning the decision tree, so the complexity is relative higher.



## Two Examples 举个栗子

### T46. [Permutations](https://leetcode.cn/problems/permutations/) 全排列

Given an array `nums` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.

**Example 1:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**

```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All the integers of `nums` are **unique**.



#### My solution

We can easily image the backtracking tree of this question. And the only thing need to do is traversing it to get the answer.

- Path：The number we have selected, saved in parameter `track`.

- Possible choices: The unused numbers, we use parameter `used` to save the used numbers and ignore them.

- Ending condition: The length of the path is the same as the number of numbers.

```java
class Solution {

    List<List<Integer>> results = new LinkedList<>();

    public List<List<Integer>> permute(int[] nums) {
        boolean[] used = new boolean[nums.length]; //choices
        LinkedList<Integer> track = new LinkedList<>(); //path
        backtrack(nums, track, used);
        return results;
    }

    private void backtrack(int[] nums, LinkedList<Integer> track, boolean[] used) {
        int len = nums.length;
        
        //Ending conditions
        if (track.size() == len){
            results.add(new LinkedList(track));
        }
        
        for (int i=0; i<len; i++){
            if (used[i]){
                continue;
            }

            //Make a choice
            track.add(nums[i]);
            used[i] = true;

            backtrack(nums, track, used);

            //Undo a choice
            track.removeLast();
            used[i] = false;
        }
    }
}
```



### T51. [N-Queens](https://leetcode.cn/problems/n-queens/) N 皇后问题

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return *all distinct solutions to the **n-queens puzzle***. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

```
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
```

**Example 2:**

```
Input: n = 1
Output: [["Q"]]
```

**Constraints:**

- `1 <= n <= 9`

#### My Solution

- Path：The position we have selected saved in `board`.

- Possible choices: The position follows the requirement, which is checked by function `isValid()`

- Ending condition: We reach the bottom row of the board

```java
class Solution {
    List<List<String>> results = new LinkedList<>();

    public List<List<String>> solveNQueens(int n) {
        boolean[][] board = new boolean[n][n]; // Path
        backtrack(board, 0, n);
        return results;
    }

    private void backtrack(boolean[][] board, int row, int n) {

        //Ending condition
        if (row == n){
            List<String> result = new LinkedList<>();
            for (int i=0; i<n; i++){
                StringBuilder line = new StringBuilder();
                for (int j=0; j<n;j++){
                    line.append(board[i][j] ? "Q" : ".");
                }
                result.add(line.toString());
            }
            results.add(result);
        }

        for (int i=0; i<n; i++){
            if (!isValid(board, row, i, n)){
                continue;
            }
            //Make a choice
            board[row][i] = true;

            backtrack(board, row+1, n);

            //Undo a choice
            board[row][i] = false;
        }
    }

    private boolean isValid(boolean[][] board, int row, int column, int n){
        //Same column
        for (int i=0; i<row; i++){
            if (board[i][column]){
                return false;
            }
        }
        //left diagonal
        for (int i=row-1, j=column-1; i>=0 && j>=0; i--, j--){
            if (board[i][j]){
                return false;
            }
        }

        //right diagonal
        for (int i=row-1, j=column+1; i>=0 && j<n; i--, j++){
            if (board[i][j]){
                return false;
            }
        }
        return true;
    }
}
```

