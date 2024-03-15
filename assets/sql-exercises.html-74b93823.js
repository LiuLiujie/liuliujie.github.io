import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as r,a as n,b as e,e as s,w as c,d as a}from"./app-9e8a13db.js";const u={},p=n("h1",{id:"sql-exercises",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#sql-exercises","aria-hidden":"true"},"#"),e(" SQL Exercises")],-1),v={id:"t177-nth-highest-salary",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#t177-nth-highest-salary","aria-hidden":"true"},"#",-1),b={href:"https://leetcode.cn/problems/nth-highest-salary/",target:"_blank",rel:"noopener noreferrer"},k=a(`<p>Table: <code>Employee</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
Each row of this table contains information about the salary of an employee.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Write a solution to find the <code>nth</code> highest salary from the <code>Employee</code> table. If there is no <code>nth</code> highest salary, return <code>null</code>.</p><p>The result format is in the following example.</p><p><strong>Example 1:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example 2:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
Output: 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h3><ul><li>DISTINCT is necessary to make sure that if there is the same salary</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> getNthHighestSalary<span class="token punctuation">(</span>N <span class="token keyword">INT</span><span class="token punctuation">)</span> <span class="token keyword">RETURNS</span> <span class="token keyword">INT</span>
<span class="token keyword">BEGIN</span>
<span class="token keyword">DECLARE</span> M <span class="token keyword">INT</span><span class="token punctuation">;</span> 
    <span class="token keyword">SET</span> M <span class="token operator">=</span> N<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">RETURN</span> <span class="token punctuation">(</span>
      <span class="token comment"># Write your MySQL query statement below.</span>
        <span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> salary
        <span class="token keyword">FROM</span> Employee
        <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> salary <span class="token keyword">DESC</span>
        <span class="token keyword">LIMIT</span> <span class="token number">1</span>
        <span class="token keyword">OFFSET</span> M
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">END</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),h={id:"t178-rank-scores",tabindex:"-1"},y=n("a",{class:"header-anchor",href:"#t178-rank-scores","aria-hidden":"true"},"#",-1),g={href:"https://leetcode.cn/problems/rank-scores/",target:"_blank",rel:"noopener noreferrer"},w=a(`<p>Table: <code>Scores</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains the score of a game. Score is a floating point value with two decimal places.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:</p><ul><li>The scores should be ranked from the highest to the lowest.</li><li>If there is a tie between two scores, both should have the same ranking.</li><li>After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.</li></ul><p>Return the result table ordered by <code>score</code> in descending order.</p><p>The result format is in the following example.</p><p><strong>Example 1:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input: 
Scores table:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
Output: 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution-1" tabindex="-1"><a class="header-anchor" href="#solution-1" aria-hidden="true">#</a> Solution</h3><p>Using <code>COUNT(DISTINCT s2.score)</code> to calculate how many records are there bigger than <code>s1.score</code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> s1<span class="token punctuation">.</span>score<span class="token punctuation">,</span>
<span class="token punctuation">(</span>
        <span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token keyword">DISTINCT</span> s2<span class="token punctuation">.</span>score<span class="token punctuation">)</span>
        <span class="token keyword">FROM</span> Scores s2
        <span class="token keyword">WHERE</span> s2<span class="token punctuation">.</span>score <span class="token operator">&gt;=</span> s1<span class="token punctuation">.</span>score
<span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token string">&#39;rank&#39;</span>
<span class="token keyword">FROM</span> Scores s1
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> s1<span class="token punctuation">.</span>score <span class="token keyword">DESC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),E=a(`<p><code>DENSE_RANK()</code>返回当前行在其分区中的排名，没有间隙。对等项被视为并列并获得相同的排名。此函数为对等组分配连续的排名；结果是大于一的组不产生不连续的排名号码。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
  S<span class="token punctuation">.</span>score<span class="token punctuation">,</span>
  DENSE_RANK<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">OVER</span> <span class="token punctuation">(</span>
    <span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
      S<span class="token punctuation">.</span>score <span class="token keyword">DESC</span>
  <span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token string">&#39;rank&#39;</span>
<span class="token keyword">FROM</span>
  Scores S<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function x(f,_){const i=l("ExternalLinkIcon"),d=l("RouterLink");return o(),r("div",null,[p,n("h2",v,[m,e(" T177 "),n("a",b,[e("Nth Highest Salary"),s(i)])]),k,n("h2",h,[y,e(" T178. "),n("a",g,[e("Rank Scores"),s(i)])]),w,n("p",null,[e("Another way is to use "),s(d,{to:"/blogs/devops/mysql/mysql-functions.html#Window-functions-%E7%AA%97%E5%8F%A3%E5%87%BD%E6%95%B0"},{default:c(()=>[e("window functions")]),_:1})]),E])}const N=t(u,[["render",x],["__file","sql-exercises.html.vue"]]);export{N as default};
