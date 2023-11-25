---
category: Computer Science
tag:
- Large Language Model
---
# Zero-Shot V.S. Few-Shot Prompting

If you can describe what you want to the model, you can use zero-shot prompting for example

```
Classify the text into positive, neutral or negative:
Text: That shot selection was awesome.
Classification:
```

The model response: `Positive`, this is because the model can understand “awesome” is a positive sensation.

If you can't describe, then you can use few-shot prompting by showing some examples to the model to let it learn and response, for example

```
Text: Today the weather is fantastic
Classification: Pos
Text: The furniture is small.
Classification: Neu
Text: I don't like your attitude
Classification: Neg
Text: That shot selection was awful
Classification:
```

Then the model response: `Neg`. The model response this instead of `Negative` since it is what is provided in the examples.

Reference: [here](https://machinelearningmastery.com/what-are-zero-shot-prompting-and-few-shot-prompting/)