export const catelog = [
    { text: "Catelog", link:""},
    {
        text: "Computer Basic",
        children:[
            {text: "Data Scructure and Algotithm", link: "algorithm/"},
            //{text: "计算机操作系统", link: "os/"}
        ]
    },
    {
        text: "Frontend",
        prefix: "front-end/",
        children:[
            //{text: "Framework", link: "framework/"},
            {text: "Network", link: "network/"},
            //{text: "Browser" ,link: "browser/"}
        ]
    },
    {
        text: "Backend",
        children: [
            {text: "OOP & Java", link: "java/"},
            {text: "Springboot Fromework", link: "springboot/"}
        ]
    },
    {
        text: "DevOps & MidWare",
        prefix:"devops/",
        children: [
            {text: "MySQL", link: "mysql/"},
            {text: "Redis", link: "redis/"}
        ]
    },
    {
        text: "HPC",
        prefix: "hpc/",
        children:[
            {text: "CUDA Tutorial", link: "cuda-tutorial-chinese/"},
            {text: "OpenMPI", link: "MPI.md"}
        ]
    }
]