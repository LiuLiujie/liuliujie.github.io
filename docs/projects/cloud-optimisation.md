---
tag:
- Cloud Native
category: Computer Science
---

# Cloud Cost Optimisation (Ideas)
Create a tool to detect the features of the cloud components that are used by an application.
Functionalities:
- Determine 'the features' by analyzing the application code or runtime
- These features should be compared to the features provided by the available components.
- Give advice on whether a different component could provide feature-parity at a lower cost, potentially with some trade-offs.

## Research questions
We need to figure out three main things in this research:
- [Cloud] What are the components that cloud service providers offer? What's the different features and prices of these components? 
- [Application] What kind of components are the application using? How the application use these components?
- [Analysis & Advice] Based on the features offered and the features needed, design an algorithm to give advice

## Draft Approach

### 1.Define and limit the scope: 

- Which cloud service providers we need to consider?  AWS? GCP? Azure?... 
- Which products we are going to research? Cloud Server? Database? ...

### 2. Analyze cloud products

- Benchmark the applications
  - We need to figure out a set of indicators to measure the products. Common ones Like performance, availability, price. Also, the domain-specific indicators.
- Distinguish common features and specific features between similar products (within/across providers). 

### 3.Analyze a set of typical applications at different granularity.

#### Components analysis

What kind of components are the application using?

E.g. Database, Redis, Elastic Search....

- Dependencies analysis (static)
  - Inspect the dependencies to see that if there are any popular ones used to connect corresponding cloud components.
- Network traffic analysis (runtime)
  - Cooperate with some tools to analysis the protocols used by the application.

#### Feature analysis

What exactly the features are the application using?

1. Keyword/pattern recognition in code (static)
   - Eg: Database: SQL/NoSQL? Transactions? UTF-8mb4 charset? Or some features more specific that are used in the application. All these features may show some fixed patterns/keywords in the code.

### 4. Design model and algorithm for giving advice

#### We need to consider

- Customer's concerns: some features the application used are 'must have'; but the others might be 'good to have'
- The features the application using.
- The features the cloud provides.
- The proposed indicators of these products.

