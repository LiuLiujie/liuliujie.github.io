---
tag:
- Semantic Web
- Linked Data
category: Computer Science
---

# Help Rich Info Get Richer: Enriching a semi-structured dataset using a Semantic Web approach
This project presented a data integration approach to enrich a semi-structured dataset called ProVerB. ProVerB is a project to explain and classify program verification tools. It offers some URLs linking to external supporting resources for each tool. However, these URLs contain little information, and a user needs to explore them manually to find what they need. Therefore, a data integration project is conducted to supply these tools with additional information by fetching original data from these URLs. The solution is implemented using a Semantic Web approach to preserve the structure of ProVerB and explore possible relationships among incoming data. The new data and their potential relationships are inserted back into ProVerB to help this dataset become richer.

The ([Paper](https://essay.utwente.nl/91716/))

## Presentation
@slidestart

## Help Rich Info Get Richer
Enriching a semi-structured dataset using a Semantic Web approach

Yujie Liu

---

We are going to enrich a dataset called ProVerB

![ProVerB](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201255880.png)

---

### A running example

A tool with external links to supporting materials

![Running Example](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201258224.png)

---

### Problem

**Can we get more data from these links...**
<img src="https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201258224.png" alt="Running Example" style="zoom:50%;" />

- Repositories: GitHub, GitLab
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->
- Papers: Springer, CrossRef
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->

---

### Problem
Can we get more data from these links...

**explore the relationships in the incoming data...**

- Can an author of the paper also be the code contributor of the tool?
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->

---

### Problem
Can we get more data from these links...

explore the relationships in the incoming data...

**insert these data and matches into ProVerB...**

**and explore the relationships in the incoming data...**

- New data + New Relationships in the data
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->
- Preserve the semi-structural nature of ProVerB
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->

---

### Problem
Can we get more data from these links...

explore the relationships in the incoming data...

insert these data and matches into ProVerB...

and explore the relationships in the incoming data...

**in automated way regularly on schedule?**

- 415 tools, 269 repository links, 525 paper links...
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->
- Keep the additional data and matches up-to-date
<!-- .element: class="fragment fade-in" data-fragment-index="1"-->

---

What is Semantic Web?

![Semantic Web](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201348570.png)

---

Why Semantic Web?

![Semi-Structure](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201351991.png)
**1. Transform the semi-structure dataset into a linked dataset conforming to an ontology.**

--

Why Semantic Web?

![Enrichment](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201357524.png)

**2. Enrich the linked dataset through open APIs and explore new relationships using SPARQL query.**

--

Why Semantic Web?

![Automate](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201353741.png)

**3. Automatically execute the enrichment process on GitHub Action.**

---

### Enrichment process

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

1. [Ontology] Design a ProVerB ontology.

--

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

2. [Transformation] Semi-structural data to linked data

--

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

3. [Enrichment] An application to enrich the dataset.

--

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

4. [Evaluation] Explore the possible relationships.

--

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

5. [Enriched linked dataset] Insert new data with links.

--

![process](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201400693.png)

6. [Reserve Transformation] Transform the linked data back to the original ProVerB dataset.

---

### Results

![Result1](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201405526.png)

--

### Results

![Result2](https://raw.githubusercontent.com/LiuLiujie/pic-bed-1/main/images/202309201406560.png)

---

### Conclusion
1. We used a Semantic Web approach to enrich a dataset called ProVerB.
    - ProVerB Ontology, Bi-direction transformation, Enrichment and evaluation.
    - 400 tools, 256 repos, 518 papers, 273 contributors and authors.

--

### Conclusion
2. The ontology and the linked data are not fully utilized and will be used for future works (e.g. input-output relationship).
3. The enrichment goal of this research is achieved.

@slideend
