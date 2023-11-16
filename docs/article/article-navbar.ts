export const devopsNavbar = [
  { text: "Data Storage", link: "data-storage/", prefix: "data-storage/", children:[
    { text: "SQL Basic", link: "sql"},
    { text: "MySQL", link: "mysql"},
    { text: "Redis", link: "redis"},
    { text: "MongoDB", link: "mongedb"},
    { text: "Minio", link: "minio"},
    { text: "Elastic Search", link: "elastic"}
  ]},
  { text: "Containerlization", link: "containerlization/", prefix: "containerlization/", children:[
    { text: "Docker", link: "docker"}
  ]},
  { text: "Operation System", link: "operation-system/", prefix: "operation-system/", children:[
    {text: "Ubuntu", link:"ubuntu"}
  ]}
]

export const articleNavbar = [
    { text: "All articles", link: "" },
    { text: "Computer Science", children:[
      { text: "Data Structure & Algorothms", link: "algorithm/"},
      //{ text: "Computer Network", link: ""},
      //{ text: "Operation System", link: ""}
    ]},
    { text: "Lnaguage", children: [
      { text: "Java", link: "java/"},
    ]},
    { text: "Frmaework", children:[
      { text: "Spring framework", link: "spring/"},
    ]},
    { text: "DevOps", prefix: "devops/", children: devopsNavbar},
    { text: "GPGPU", prefix: "gpgpu/", children: [
      { text: "CUDA Tutorial", link: "cuda-tutorial-chinese/"}
    ]},
]

