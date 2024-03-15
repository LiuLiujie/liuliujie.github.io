import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,d as a}from"./app-9e8a13db.js";const o={},l=a('<h1 id="paper-reading-investigations-of-the-software-testing-coupling-effect" tabindex="-1"><a class="header-anchor" href="#paper-reading-investigations-of-the-software-testing-coupling-effect" aria-hidden="true">#</a> [Paper Reading] Investigations of the Software Testing Coupling Effect</h1><p>Two principles/hypothesis:</p><ul><li>Competent Programmer Hypothesis <ul><li>Since examples of complex faults that are not coupled to simple faults can be constructed, the coupling effect is probabilistic rather than absolute.</li></ul></li><li>Coupling Effect</li></ul><p>Definition:</p><p>A simple fault is a fault that can be fixed by making a single change to a source statement. A complex fault is a fault that cannot be fixed by making a single change to a source statement.</p><p>Strict hypothesis:</p><ul><li>Mutation Coupling Effect: Complex mutants are coupled to simple mutants in such a way that a test data set that detects all simple mutants in a program will detect a large percentage of the complex mutants. <ul><li>What is changed: from fault to mutant</li><li>If valid, the flollowing two will also be valid: <ul><li>For case one, if the number of complex mutimts is large in relation to the number of complex faults, then by detecting complex mutants we at least detect most complex faults. <ul><li>Some nagetive evidence</li></ul></li><li>For case two, it must be determined whether complex faults are easier to detect than complex mutants.</li></ul></li></ul></li></ul><p>The author suspect the impressive result of the [previous paper](#[Paper] Hints on Test Data Selection: Help for the Practicing Programmer).</p><p>Hint for us:</p><ul><li><p>The intro of mutation testing is written relatively good in this paper.</p></li><li><p>In practice, data sets that score above 95 percent on a mutation system tend to be difficult to create, but are effective at finding faults.</p><ul><li>We can also try to find this pratical score in GPU.</li></ul></li><li><p>Some mutation operators are derived by typical programming errors. Like Mothra&#39;s 22 mutation operators.</p></li></ul>',10),n=[l];function s(r,c){return e(),i("div",null,n)}const f=t(o,[["render",s],["__file","Investigations of the Software Testing Coupling Effect.html.vue"]]);export{f as default};
