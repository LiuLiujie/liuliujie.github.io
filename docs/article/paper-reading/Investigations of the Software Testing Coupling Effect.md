---
category: Paper Reading Notes
tag: 
- Testing
- Mutation Testing
- Coupling Effect
---
# [Paper Reading] Investigations of the Software Testing Coupling Effect

Two principles/hypothesis:

- Competent Programmer Hypothesis
  - Since examples of complex faults that are not coupled to simple faults can be constructed, the coupling effect is probabilistic rather than absolute. 
- Coupling Effect



Definition:

A simple fault is a fault that can be fixed by making a single change to a source statement. A complex fault is a fault that cannot be fixed by making a single change to a source statement.



Strict hypothesis:

- Mutation Coupling Effect: Complex mutants are coupled to simple mutants in such a way that a test data set that detects all simple mutants in a program will detect a large percentage of the complex mutants.
  - What is changed: from fault to mutant
  - If valid, the flollowing two will also be valid:
    - For case one, if the number of complex mutimts is large in relation to the number of complex faults, then by detecting complex mutants we at least detect most complex faults.
      - Some nagetive evidence
    - For case two, it must be determined whether complex faults are easier to detect than complex mutants.  

The author suspect the impressive result of the [previous paper](#[Paper] Hints on Test Data Selection: Help for the Practicing Programmer).

Hint for us:

- The intro of mutation testing is written relatively good in this paper.

- In practice, data sets that score above 95 percent on a mutation system tend to be difficult to create, but are effective at finding faults. 

  - We can also try to find this pratical score in GPU.

- Some mutation operators are derived by typical programming errors. Like Mothra's 22 mutation operators.

  
