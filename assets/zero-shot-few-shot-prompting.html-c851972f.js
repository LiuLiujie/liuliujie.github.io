import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c as a,a as e,b as t,e as r,d}from"./app-9e8a13db.js";const l={},c=d(`<h1 id="zero-shot-v-s-few-shot-prompting" tabindex="-1"><a class="header-anchor" href="#zero-shot-v-s-few-shot-prompting" aria-hidden="true">#</a> Zero-Shot V.S. Few-Shot Prompting</h1><p>If you can describe what you want to the model, you can use zero-shot prompting for example</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Classify the text into positive, neutral or negative:
Text: That shot selection was awesome.
Classification:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The model response: <code>Positive</code>, this is because the model can understand “awesome” is a positive sensation.</p><p>If you can&#39;t describe, then you can use few-shot prompting by showing some examples to the model to let it learn and response, for example</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Text: Today the weather is fantastic
Classification: Pos
Text: The furniture is small.
Classification: Neu
Text: I don&#39;t like your attitude
Classification: Neg
Text: That shot selection was awful
Classification:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then the model response: <code>Neg</code>. The model response this instead of <code>Negative</code> since it is what is provided in the examples.</p>`,7),h={href:"https://machinelearningmastery.com/what-are-zero-shot-prompting-and-few-shot-prompting/",target:"_blank",rel:"noopener noreferrer"};function m(p,u){const s=i("ExternalLinkIcon");return o(),a("div",null,[c,e("p",null,[t("Reference: "),e("a",h,[t("here"),r(s)])])])}const x=n(l,[["render",m],["__file","zero-shot-few-shot-prompting.html.vue"]]);export{x as default};
