# Cloud Cost Optimisation (Ideas)
Create a tool to detect the features of the cloud components that are used by an application.
Functionalities:
- Determine 'the features' by analyzing the application code or runtime
- These features should be compared to the features provided by the available components.
- Give advice on whether a different component could provide feature-parity at a lower cost, potentially with some trade-offs.

## What I think about this topic
What we need to figure out in this proposal are:
1. [Cloud] What are the components that cloud service providers offer? What's the different features and prices of these components? 
2. [Application] What kind of components are the application using? How the application use these components?
3. [Advice] Based on the features offered and the features needed, design an algorithm to give advice

I can see that this project is super huge, and I am happy that if Microsoft or Google or Amazon want to do this to sell their product. But I really 

## Possible directions
### What kind of components are the application using?
1. Dependencies analysis (code)
   - Inspect the dependencies to see that if there are any popular ones used to connect cloud components.
2. Network traffic analysis (runtime)
   - Cooperate with some tools to analysis the protocols used by the application.

### What exactly the features are the application using?
1. keyword/ pattern recognition (code)
   - Eg: Database: Transactions? UTF-8mb4 charset? Or some features more specfic that are used in the application. All these features may show some fix patterns/keywords in the code.
   
     