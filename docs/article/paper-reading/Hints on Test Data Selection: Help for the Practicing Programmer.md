---
category: Paper Reading Notes
tag: 
- Testing
- Mutation Testing
- Coupling Effect
---
# [Paper Reading] Hints on Test Data Selection: Help for the Practicing Programmer

Richard A. DeMillo, Richard J. Lipton, and Frederick G. Sayward



Error classifications:

- failure to satisfy specifications due to implementation error
- failure to write specifications that correctly represent a design
- failure to understand a requirement
- failure to satisfy a requirement.

Error are always reflected in programs as:

- missing control paths
- inappropriate path selection
- inappropriate or missing actions.



**Assumption**

The coupling effect: Test data that distinguishes all programs differing from a correct one by only simple errors is so sensitive that it also implicitly distinguishes more complex errors.

It's an empirical principle. No hope of proving the coupling effect.

Which also means: search for simple errors that will also uncover deeper errors via the coupling effect.



A mutant may be live for two reasons:

- The test cases is not sensitive enough to distinguish the error that gave rise to the mutant.
- The mutant and the original program are actually equivalent and no test data will distinguish them (The error that gave rise to the mutant was not an error at all)



Impressive Result:

More than 22,000 higher-order mutatns selected are all killed.



## My conclusion

This article proposed an assumption call the coupling effect, which assume that test cases that detect simple errors are also effective in distinguishing more complex errors. This hypothesis can only be proved by empirical examples and no theoretical proving. The authors use some Fortran programs to show that the adequate test cases can kill most of the higher order mutants.

Questions:

- Higher order mutation testing. Why it is proposed if testcases for low level mutants can kill them all.




   

