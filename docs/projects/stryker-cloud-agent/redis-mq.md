# Use Redis As MQ 使用Redis做消息队列

[Redis Stream 做消息队列详解](../../blogs/devops/redis/stream-message-queue.md)



项目中使用 Redis Stream 作为消息队列。建立了三个消费者组，分别是`mutants`, `results` 和 `logs`

runner会将运行结果发回到orchestrator后存入各自的的消息队列中，而前端用户则会从消费者组中消费对某个项目的全部的结果。