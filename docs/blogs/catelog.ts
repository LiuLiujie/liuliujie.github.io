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
        children:[

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