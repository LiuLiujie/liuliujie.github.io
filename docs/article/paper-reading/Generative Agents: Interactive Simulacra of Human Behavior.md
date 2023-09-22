---
title: "[Paper reading] Generative Agents: Interactive Simulacra of Human Behavior"
category:
- Paper Reading Notes
tag: 
- ChatGPT
- Large Language Model
---
## Summary

They introduce a concept called generative agents. They describe an architecture that extends a large language model to store a complete record of the agent's experiences using natural language, synthesize those memories over time into higher-level reflections, and retrieve them dynamically to plan behavior.

1. Language Model: ChatGPT large language model. (GPT-3.5-turbo)
2. Improvement: Reduce the work from multiple scripts to several words
3. Evaluation: 1) believable behaviours individually 2) open-ended gave 3) interview the agent 



## What is generative agents?

Agents that draw on generative models to simulate believable human behavior and demonstrate that they produce believable simulacra of both individual and emergent group behavior.

## Architecture

1. Memory stream: records agent's experiences in natural language
2. Reflection: synthesises memories and draw conclusions.
3. Planning: translate conclusions into action plans and detailed behaviours for action and reaction; fed the actions and reactions back to the memory stream.



# Current Status (related work)

### Believable proxies of human behavior

1. **What is believable agents?**

    Believable agents are designed to provide an illusion of life and present a facade of realism in the way they appear to make decisions and act on their own volition, similar to the characters in Disney movies.

2. **Goal of believable agents?**

   - Populate and perceive the open-world environment
   - React with user or other agents
   - Trend: more realistic

3. **（NPCs）Development process**

   - Rule-based approach 
     - E.g. Finite-state machines and behavior trees
     - Brute force approach of human-authoring the agent’s behavior
     - Dominate approach today
     - May not fully represent the consequence of interactions and cannot perform new procedures that are not hard-coded.

   - Learning-based approaches
     - Letting the agents learn their behavior
     - Only in adversarial games with optimised algorithm.
     - Not yet addressed the challenge in an open world

   - Cognitive architectures
     - They maintained short-term and long-term memories, filled these memories with symbolic structures, and operated in perceive-plan-act cycles, dynamically perceiving the environment and matching it with one of the manually crafted action procedures
     - their space of action was limited to manually crafted procedural knowledge, and they did not offer a mechanism through which the agents could be inspired to seek new behavior.

### Large Language Models and Human behavior

Fundamental basis: If prompted with a narrowly defined context, the models can be used to generate believable behavior. 

However, believable agents require conditioning not only on their current environment but also on a vast amount of past experience.



# Generative Agent Behavior and Interaction

## Agent Avatar and Communication

One paragraph of natural language description to depict each agent’s identity, 

- Occupation
- Relationship with other agents

```
John Lin is a pharmacy shopkeeper at the Willow Market and Pharmacy who loves to help people. He is always looking for ways to make the process of getting medication easier for his customers; John Lin is living with his wife, Mei Lin, who is a college professor, and son, Eddy Lin, who is a student studying music theory; John Lin loves his family very much; John Lin has known the old couple next-door, Sam Moore and Jennifer Moore, for a few years; John Lin thinks Sam Moore is a kind and nice man; John Lin knows his neighbor, Yuriko Yamamoto, well; John Lin knows of his neighbors, Tamara Taylor and Carmen Ortiz, but has not met them before; John Lin and Tom Moreno are colleagues at The Willows Market and Pharmacy; John Lin and Tom Moreno are friends and like to discuss local politics together; John Lin knows the Moreno family somewhat well — the husband Tom Moreno and the wife Jane Moreno.
```

### Inter-Agent Communication

- Method: natural language
- Representation: emojis translated from text by language model

### User Controls

**2 ways**

- Communicating with the agent through conversation (即将 user 设定一个游戏内的一个角色, 然后与 agent 进行交流) `E.g. The user specifies that they are a news “reporter” and asks the agent about the upcoming election`

- Or by issuing a directive to an agent in the form of an ‘inner voice’. (或者以"心理暗示"的方式) `Told the agent: "You are going to run against Sam in the upcoming election"`

## Environment Interaction

- Agent movements:  directed by the generative agent architecture and the sandbox game engine.
- Users and agents can influence the state of the objects in this world, much like in sandbox games such as The Sims. E.g. `<Isabella’s apartment: kitchen: stove> is burning.`

## Emergent Social Behaviors

### Information Diffusion

As agents notice each other, they may engage in dialogue—as they do so, information can spread from agent to agent.

**QUESTION**: the social behaviour will be spread automatically, but why this will happens

### Relationship memory

Auto form relationship between stranger agents by neutral interactions

### Coordination

Generative agents coordinate with each other. 

The user only need to set the initial intent like throwing a party and Maria’s crush on Klaus: 

The following social behaviors of spreading the word, decorating, asking each other out, arriving at the party, and interacting with each other at the party, were initiated by the agent architecture.

# Generative Agent Architecture

IO: Take their current environment and past experience as input and generate behavior as output

Techs: Combines a large language model with mechanisms for synthesizing and retrieving relevant information to condition the language model’s output on.

Goal and challenge: Ensure that the most relevant pieces of the agent’s memory are retrieved and synthesized when needed.

**Memory Stream (Core in architecture)**

- Retrieve records as relevant
- Synthesized records into higher level observations to guide behaviour

## Memory and Retrieval

The *memory stream* maintains is list of *observation* representing the agent's experience

**Observation**

1. Data structure

   - A natural language description

   - A creation timestamp 

   - A most recent access timestamp

2. Includes

   - Behaviors performed by the agent themselves.

     - ```
       Maria Lopez is studying for a Chemistry test while drinking coffee
       ```

   - Behaviors that agents perceive being performed by other agents or non-agent objects.

     - ```
       The refrigerator is empty
       ```

**Approach: a retrieval function**

- Takes the agent’s current situation as input and returns a subset of the memory stream to pass on to the language model.
- Parameters
  - Recency
  - Importance
  - Relevance

- Recency

  - Assigns a higher score to memory objects that were recently accessed.
  - Implementation: an exponential decay function over the number of sandbox game hours since the memory was last retrieved. Our decay factor is 0.99.

- Importance

  - distinguishes core memories

  - Implementation: directly asking the language model to output an integer score is effective.

    ```
    On the scale of 1 to 10, where 1 is purely mundane (e.g., brushing teeth, making bed) and 10 is extremely poignant (e.g., a break up, college acceptance), rate the likely poignancy of the following piece of memory.
    Memory: buying groceries at The Willows Market and Pharmacy
    Rating: <fill in>
    ```

  - Generate when the memory object is created.

- Relevance

  - Higher score to memory objects that are related to the current situation.
  - Depends on the answer to, “Relevant to what?
  - Implementation: use the language model to generate an embedding vector of the text description of each memory. Then, we calculate relevance as the cosine similarity be- tween the memory’s embedding vector and the query memory’s embedding vector.

- Formula

  - 𝑠𝑐𝑜𝑟𝑒 = 𝛼𝑟𝑒𝑐𝑒𝑛𝑐𝑦 · 𝑟𝑒𝑐𝑒𝑛𝑐𝑦 + 𝛼𝑖𝑚𝑝𝑜𝑟𝑡𝑎𝑛𝑐𝑒 ·𝑖𝑚𝑝𝑜𝑟𝑡𝑎𝑛𝑐𝑒 +𝛼𝑟𝑒𝑙𝑒𝑣𝑎𝑛𝑐𝑒 ·𝑟𝑒𝑙𝑒𝑣𝑎𝑛𝑐𝑒
  - All 𝛼 set to 1
  - Normalize result to 1

## Reflection

A second type of memory generated by the agent periodically.

Generate it when the perceived importance reach a threshold.

**Steps**: Agent determines what to  reflect

- Print 100 most recent records

- Generate questions: `Given only the information above, what are 3 most salient high-level questions we can answer about the subjects in the statements?`

- Use these questions as queries for retrieval and gather relevant memories.

- Prompt the model to extract insights and cite corresponding records as evidence.

  ```
  Statements about Klaus Mueller
  1. Klaus Mueller is writing a research paper
  2. Klaus Mueller enjoys reading a book
  on gentrification
  3. Klaus Mueller is conversing with Ayesha Khan about exercising [...]
  What 5 high-level insights can you infer from the above statements? (example format: insight (because of 1, 5, 3))
  ```

- Store the returned statement as a reflection including pointers to the cited records.

## Planning and Reacting

- Agents need to plan over a longer time horizon to ensure that their sequence of actions is coherent and believable. 需要通过计划的方式使得上下文连贯合理，比如不能中午吃两顿。

- A plan includes a location, a starting time, and a duration.
- Plans are stored in the memory stream and are included in the retrieval process. This allows the agent to consider observations, reflections, and plans all together when deciding how to behave. 计划也存于memory中并在retrieval过程中。因此agent在行动时可以进行观察，反思和计划。

- Agents may change their plans midstream if needed. Agent可以在需要的时候改变计划。

**Approach**: top-down

- Create a plan outline today's agenda

  - Prompt the language model with the agent’s summary description (e.g., name, traits, and summary of their recent experiences) and a summary of their previous day.

    ```
    Name: Eddy Lin (age: 19)
    Innate traits: friendly, outgoing, hospitable
    Eddy Lin is a student at Oak Hill College studying music theory and composition. He loves to explore different musical styles and is always looking for ways to expand his knowledge. Eddy Lin is working on a composition project for his college class. He is also taking classes to learn more about music
    theory. Eddy Lin is excited about the new composition he is working on but he wants to dedicate more hours in the day to work on it in the coming days On Tuesday February 12, Eddy 1) woke up and completed the morning routine at 7:00 am, [. . . ]
    6) got ready to sleep around 10 pm.
    Today is Wednesday February 13. Here is Eddy’s plan today in broad strokes: 1)
    ```

  - This will generate a sketch of the plan, for example

    ```
    1) wake up and complete the morning routine at 8:00 am, 2) go to Oak Hill College to take classes starting 10:00 am, [. . . ] 5) work on his new music composition from 1:00 pm to 5:00 pm, 6) have dinner at 5:30 pm, 7) finish school assignments and go to bed by 11:00 pm.”
    ```

- Recursively decomposes the sketch plan to  finer-grained actions, first into hour-long chunks of actions, then into 5–15 minute chunks, depending on the granularity desired.

### Reacting and Updating Plans

- They prompt the language model with observations the agent preceived to decide whether the agent should continue with their existing plan, or react. 

- Some fixed prompts is used to generate the overall goals and disposition of the agents.

  ```
  [Agent’s Summary Description]
  ....
  Should John react to the observation, and if so, what would be an appropriate reaction?
  ```

- If the agent choose to react, then regenerate the existing plan starting from this reaction time. 

- If trigger interaction, then generate the dialogue.

### Dialogue 

- They generate agents’ dialogue by conditioning their utterances on their memories about each other.

  Ask: 

  ```
  [Agent’s Summary Description]
  It is February 13, 2023, 4:56 pm.
  John Lin’s status: John is back home early from work.
  Observation: John saw Eddy taking a short walk around his workplace.
  Summary of relevant context from John’s memory: Eddy Lin is John’s Lin’s son. Eddy Lin has been working on a music composition for his class. Eddy Lin likes to walk around the garden when he is thinking about or listening to music.
  John is asking Eddy about his music composition project. What would he say to Eddy?
  ```

  Response: 

  ```
  [Agent’s Summary Description]
  It is February 13, 2023, 4:56 pm.
  Eddy Lin’s status: Eddy is taking a short walk around his workplace.
  Observation: John is initiating a conversation with Eddy.
  Summary of relevant context from Eddy’s memory: Jonn Lin is Eddy Lin’s father. John Lin is caring and is interested to learn more about Eddy Lin’s school work. John Lin knows that Eddy Lin is working on a music composition.
  Here is the dialogue history:
  John: Hey Eddy, how’s the music composition project for your class coming along?
  How would Eddy respond to John?
  ```

- The continuation of this dialogue is generated using the same mechanism until one of the two agents decides to end the dialogue.

# Sandbox Environment Implementation

**Jobs of sandbox**

- A JSON data structure
  - Location, interaction object of agents
- Parse the generated text to any agent actions (positions, status of objects)
- Send agents and objects to agents' memory within a preset range.

## Bi-directional transformation between language and structured environment

**A tree data structure**

- A node indicates an object. An edge indicates a containment relationship. 

  ```
  “stove” being a child of
  “kitchen” <-> “there is a stove in the kitchen.”
  ```

- Agents build and own a subgraph of the environment tree during navigation

- Init: an environment tree capturing the spaces and objects that the agent should be aware of: the rooms and objects in their living quarters, their workplace, and commonly visited stores and shops.

- Use the environment to generate the location for each action. Do it recursively until reach a leaf node of the agent's environment tree.

  ```
  [Agent’s Summary Description]
  Eddy Lin is currently in The Lin family’s house:
  Eddy Lin’s bedroom: desk) that has Mei and John Lin’s
  bedroom, Eddy Lin’s bedroom, common room, kitchen, bathroom, and garden.
  Eddy Lin knows of the following areas: The Lin family’s house, Johnson Park, Harvey Oak Supply Store, The Willows Market and Pharmacy, Hobbs Cafe, The Rose and Crown Pub.
  * Prefer to stay in the current area if the activity can be done there.
  Eddy Lin is planning to take a short walk around his workspace. Which area should Eddy Lin go to?
  ```

# Controlled Evaluation

**Five key areas**

- Self-knowledge: We ask questions such as “Give an introduction of yourself” or “Describe your typical weekday schedule in broad strokes” that require the agent to maintain an understanding of their core characteristics.
- Memory: We ask questions that prompt the agent to retrieve particular events or dialogues from their memory to answer properly, such as “Who is [name]?” or “Who is running for mayor?”
- Plans: We ask questions that require the agent to retrieve their long-term plans, such as “What will you be doing at 10 am tomorrow?”
- Reactions: As a baseline of believable behavior, we present hypothetical situations for which the agent needs to respond believably: “Your breakfast is burning! What would you do?”
- Reflections: We ask questions that require the agents to leverage their deeper understanding of others and themselves gained through higher-level inferences, such as “If you were to spend time with one person you met recently, who would it be and why?”

**Results**

- Generative agents remember, but with embellishments.
  - May fail to retrieve some correct memory records
  - May embellish their knowledge: Rare for complete fabrication, But may add some extra words which not happened.
- Reflection is required for synthesis.

# End-to-endEvaluation

...



# 个人评价 My review

1. 一句话概括论文在讲什么（In a nutshell）？

   论文作者设计了一套架构，使用大模型如ChatGPT去驱动沙盒游戏内NPC的行为，包括NPC自身的行动和与其他NPC以及环境的互动，使其能够进行自治。

2. 实现的功能有哪些（Functionality）？

   - Agent自身的独立行动

   - Agent和agent进行交互

   - Agent和环境物品进行交互

3. 架构是什么（Architecture）？

   论文中提供的架构图如下图：![Architectu](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202307120955652.png)

   - 每个Agent都会维护一套以上架构组成的上下文，Agent会通过自身的方式去**感知**（Perceive）环境中的Agent和物品。

   - 架构的核心叫**记忆流**（Memory Stream），这是一个存储了Agent所有**观察**（Observations）的列表。包括：
     - Agent的自身**行为**（Behavior）的观察
     - Agent对自身和其他Agent或环境物品的交互的观察

   - 在Agent进行任何**行动**（Act）之前，它需要从记忆流中获取一个最相关的观察子集，并用这个子集以某种方式输入大模型去生成行动方案。因此，这就牵扯到三个问题：1）如何获取（Retrieve）这个观察子集；2）这个观察子集是琐碎和庞大的，不可能全部输入大模型，需要对其进行精炼，这个过程叫做**反思**（Reflect）；3）如果Agent需要自治，它需要一个行动日程表来指导其在时间线上的活动，也需要一个行动细则来指导具体行动，这个过程叫做Plan。

   - Reflect和Plan所生成的也是一种特殊的观察，同样会被存储于Memory Stream中。

4. 具体功能实现（Implementation）：
   1. 感知（Perceive）
   2. 获取（Retrieve）
   3. 反思（Reflect）
   4. 计划（Plan）
   5. 行动（Act）
5. 个人评价
