# MPI Tutorial

Refer and conclude from the [MPI Tutorial](https://mpitutorial.com)

MPI: Message Passing Interface

- 程序通过在进程间传递消息（消息可以理解成带有一些信息和数据的一个数据结构）来完成某些任务
- E.g.: 主进程（manager process）可以通过对从进程（worker process）发送一个描述工作的消息来把这个工作分配给它。另一个例子就是一个并发的排序程序可以在当前进程中对当前进程可见的（我们称作本地的，locally）数据进行排序，然后把排好序的数据发送的邻居进程上面来进行合并的操作。

MPI 只是定义了一种数据传输接口，因此有多种实现方式，比如OpenMPI和MPICH，本文使用MPICH进行演示。



## [MPI Helloworld](https://mpitutorial.com/tutorials/mpi-hello-world/zh_cn/)

```c
// 1.引入MPI头文件
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv) {
    // 2.初始化 MPI 环境
    MPI_Init(NULL, NULL);

    // 3.通过调用以下方法来得到所有可以工作的进程数量
    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    // 4.得到当前进程的秩rank
    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

    // 5.得到当前进程的名字
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    int name_len;
    MPI_Get_processor_name(processor_name, &name_len);

    // 打印一条带有当前进程名字，秩以及
    // 整个 communicator 的大小的 hello world 消息。
    printf("Hello world from processor %s, rank %d out of %d processors\n",
           processor_name, world_rank, world_size);

    // 6.释放 MPI 的一些资源
    MPI_Finalize();
}
```

1. 引入MPI头文件
2. 在 `MPI_Init` 的过程中，所有 MPI 的全局变量或者内部变量都会被创建。举例来说，一个通讯器 communicator 会根据所有可用的进程被创建出来（进程是我们通过 mpi 运行时的参数指定的），然后每个进程会被分配独一无二的秩 rank。当前来说，`MPI_Init` 接受的两个参数是没有用处的，不过参数的位置保留着，可能以后的实现会需要用到。

3. `MPI_Comm_size` 会返回 communicator 的大小，也就是 communicator 中可用的进程数量。在我们的例子中，`MPI_COMM_WORLD`（这个 communicator 是 MPI 帮我们生成的）这个变量包含了当前 MPI 任务中所有的进程，因此在我们的代码里的这个调用会返回所有的可用的进程数目。

4. `MPI_Comm_rank` 这个函数会返回 communicator 中当前进程的 rank 秩。 communicator 中每个进程会以此得到一个从0开始递增的数字作为 rank 值。rank 值主要是用来指定发送或者接受信息时对应的进程。

5. `MPI_Get_processor_name` 会得到当前进程实际跑的时候所在的处理器名字，实际中比较少用
6. `MPI_Finalize` 是用来清理 MPI 环境的。这个调用之后就没有 MPI 函数可以被调用了。

运行结果

```
ubuntu@oracle3:~/mpitutorial/tutorials$ python3 run.py mpi_hello_world
mpirun -n 4  ./mpi-hello-world/code/mpi_hello_world
Hello world from processor oracle3, rank 3 out of 4 processors
Hello world from processor oracle3, rank 1 out of 4 processors
Hello world from processor oracle3, rank 0 out of 4 processors
Hello world from processor oracle3, rank 2 out of 4 processors
```



## [MPI Send an Receive](https://mpitutorial.com/tutorials/mpi-send-and-receive/zh_cn/)

MPI 的发送和接收方法是按以下方式进行的：开始的时候，*A* 进程决定要发送一些消息给 *B* 进程。A进程就会把需要发送给B进程的所有数据打包好，放到一个缓存里面。因为所有数据会被打包到一个大的信息里面，因此缓存常常会被比作*信封*（就像我们把好多信纸打包到一个信封里面然后再寄去邮局）。数据打包进缓存之后，通信设备（通常是网络）就需要负责把信息传递到正确的地方。这个正确的地方也就是根据特定秩确定的那个进程。

尽管数据已经被送达到 B 了，但是进程 B 依然需要确认它想要接收 A 的数据。一旦它确定了这点，数据就被传输成功了。进程 A 会接收到数据传递成功的信息，然后去干其他事情。

有时候 A 需要传递很多不同的消息给 B。为了让 B 能比较方便地区分不同的消息，MPI 运行发送者和接受者额外地指定一些信息 ID (正式名称是*标签*, *tags*)。当 B 只要求接收某种特定标签的信息的时候，其他的不是这个标签的信息会先被缓存起来，等到 B 需要的时候才会给 B。

```c
MPI_Send(
    void* data,//data cache
    int count,//num of data
    MPI_Datatype datatype,//type of data
    int destination, //rank of destination
    int tag, // distinguish different types of msg
    MPI_Comm communicator) // use which communicator
    
MPI_Recv(
    void* data,
    int count,
    MPI_Datatype datatype,
    int source,
    int tag,
    MPI_Comm communicator,
    MPI_Status* status)// Status of received information
```



### Data Type

| MPI datatype           | C equivalent           |
| ---------------------- | ---------------------- |
| MPI_SHORT              | short int              |
| MPI_INT                | int                    |
| MPI_LONG               | long int               |
| MPI_LONG_LONG          | long long int          |
| MPI_UNSIGNED_CHAR      | unsigned char          |
| MPI_UNSIGNED_SHORT     | unsigned short int     |
| MPI_UNSIGNED           | unsigned int           |
| MPI_UNSIGNED_LONG      | unsigned long int      |
| MPI_UNSIGNED_LONG_LONG | unsigned long long int |
| MPI_FLOAT              | float                  |
| MPI_DOUBLE             | double                 |
| MPI_LONG_DOUBLE        | long double            |
| MPI_BYTE               | char                   |



### Send / Receive Program

```c
/*senc_recv.c*/

// 得到当前进程的 rank 以及整个 communicator 的大小
int world_rank;
MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
int world_size;
MPI_Comm_size(MPI_COMM_WORLD, &world_size);

int number;
if (world_rank == 0) {
  	//Rank 0: Send number -1 to rank 1 with tag 0
    number = -1;
  	//params: data, count, type, rank, tag, communicator
    MPI_Send(&number, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
} else if (world_rank == 1) {
  	//Rank 1: Receive an integer from rank 0 with tag 0
    MPI_Recv(&number, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    printf("Process 1 received number %d from process 0\n",
           number);
}
```

`MPI_Comm_rank` 和 `MPI_Comm_size` 一开始是用来得到整个 communicator 空间的大小（也就是所有进程的数量）以及当前进程的秩。然后如果当前进程是 0 进程，那么我们就初始化一个数字 -1 然后把它发送给 1 进程。然后你可以看到 `else if` 条件语句里的话题，进程 1 会调用 `MPI_Recv` 去接受这个数字。然后会将接收到的数字打印出来。由于我们明确地发送接收了一个整数，因此 `MPI_INT` 数据类型被使用了。每个进程还使用了 0 作为消息标签来指定消息。由于我们这里只有一种类型的信息被传递了，因此进程也可以使用预先定义好的常量 `MPI_ANY_TAG` 来作为标签数字。



### Ping-Pong Program

```c
int ping_pong_count = 0;
int partner_rank = (world_rank + 1) % 2; // Rank 0 will get 1, rank 1 will get 0

while (ping_pong_count < PING_PONG_LIMIT) {
    if (world_rank == ping_pong_count % 2) {
      	//Rank 0: Sent the count to another rank with tag 0
        // Increment the ping pong count before you send it
        ping_pong_count++;
        MPI_Send(&ping_pong_count, 1, MPI_INT, partner_rank, 0, MPI_COMM_WORLD);
        printf("%d sent and incremented ping_pong_count %d to %d\n",
               world_rank, ping_pong_count, partner_rank);
    } else {
      	//Rank 1: Receive an integer from another rank with tag 0
        MPI_Recv(&ping_pong_count, 1, MPI_INT, partner_rank, 0, MPI_COMM_WORLD,
                 MPI_STATUS_IGNORE);
        printf("%d received ping_pong_count %d from %d\n",
               world_rank, ping_pong_count, partner_rank);
    }
}
```

The sequence of results may differ. The last `ping_pong_count` is equal to `PING_PONG_LIMIT`.



### Ring program

```c
int token;
if (world_rank != 0) {
  	//Other ranks will be blocked here to receive the data
    MPI_Recv(&token, 1, MPI_INT, world_rank - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    printf("Process %d received token %d from process %d\n",
           world_rank, token, world_rank - 1);
} else {
    // Set the token's value if you are process 0 (rank 0)
    token = -1;
}

//Send the token to the next rank with tag 0 in a ring (modular)
MPI_Send(&token, 1, MPI_INT, (world_rank + 1) % world_size, 0, MPI_COMM_WORLD);

// Now process 0 can receive from the last process after a ring
if (world_rank == 0) {
    MPI_Recv(&token, 1, MPI_INT, world_size - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    printf("Process %d received token %d from process %d\n",
           world_rank, token, world_size - 1);
}
```

这个环程序在进程0上面初始化了一个值-1，赋值给 token。然后这个值会依次传递给每个进程。程序会在进程0从最后一个进程接收到值之后结束。如你所见，我们的逻辑避免了死锁的发生。具体来说，进程0保证了在想要接受数据之前发送了 token。所有其他的进程只是简单的调用 `MPI_Recv` (从他们的邻居进程接收数据)，然后调用 `MPI_Send` (发送数据到他们的邻居进程)把数据从环上传递下去。`MPI_Send` 和 `MPI_Recv` 会阻塞直到数据传递完成。因为这个特性，打印出来的数据是跟数据传递的次序一样的。用5个进程的话，输出应该是这样的：

```
ubuntu@oracle3:~/mpitutorial/tutorials$ python3 ./run.py ring
mpirun -n 5  ./mpi-send-and-receive/code/ring
Process 1 received token -1 from process 0
Process 2 received token -1 from process 1
Process 3 received token -1 from process 2
Process 4 received token -1 from process 3
```



## Dynamic Receiving with MPI Probe (and MPI Status)

上一节中讨论了接受者事先知道消息的长度时的消息发送与接收，当接收者不知道消息长度时，MPI本身也可以通过额外的几个函数调用来支持这类*动态消息*的发送与接收。

### MPI_Status Struct

`MPI_Recv` 将 `MPI_Status` 结构体的地址作为参数（可以使用 `MPI_STATUS_IGNORE` 忽略）。 如果我们将 `MPI_Status` 结构体传递给 `MPI_Recv` 函数，则操作完成后将在该结构体中填充有关接收操作的其他信息。 三个主要的信息包括：

1. **发送端秩**. 发送端的秩存储在结构体的 `MPI_SOURCE` 元素中。也就是说，如果我们声明一个 `MPI_Status stat` 变量，则可以通过 `stat.MPI_SOURCE`访问秩。
2. **消息的标签**. 消息的标签可以通过结构体的 `MPI_TAG` 元素访问（类似于 `MPI_SOURCE`）。
3. **消息的长度**. 消息的长度在结构体中没有预定义的元素。相反，我们必须使用 `MPI_Get_count` 找出消息的长度。

```c
MPI_Get_count(
    MPI_Status* status,
    MPI_Datatype datatype,
    int* count)
```

在 `MPI_Get_count` 函数中，使用者需要传递 `MPI_Status` 结构体，消息的 `datatype`（数据类型），并返回 `count`。 变量 `count` 是已接收的 `datatype` 元素的数目。

为什么需要这些信息？ 事实证明，`MPI_Recv` 可以将 `MPI_ANY_SOURCE` 用作发送端的秩，将 `MPI_ANY_TAG` 用作消息的标签。 在这种情况下，`MPI_Status` 结构体是找出消息的实际发送端和标签的唯一方法。 此外，并不能保证 `MPI_Recv`能够接收函数调用参数的全部元素。 相反，它只接收已发送给它的元素数量（如果发送的元素多于所需的接收数量，则返回错误。） `MPI_Get_count` 函数用于确定实际的接收量。

以下示例将随机数量的数字发送给接收端，然后接收端找出发送了多少个数字。

```c
const int MAX_NUMBERS = 100;
int numbers[MAX_NUMBERS];
int number_amount;
if (world_rank == 0) {
    // Pick a random amount of integers to send to process one
    srand(time(NULL));
    number_amount = (rand() / (float)RAND_MAX) * MAX_NUMBERS;

    // Send the amount of integers to process one
    MPI_Send(numbers, number_amount, MPI_INT, 1, 0, MPI_COMM_WORLD);
    printf("0 sent %d numbers to 1\n", number_amount);
} else if (world_rank == 1) {
    MPI_Status status;
    // Receive at most MAX_NUMBERS from process zero
    MPI_Recv(numbers, MAX_NUMBERS, MPI_INT, 0, 0, MPI_COMM_WORLD,
             &status);

    // After receiving the message, check the status to determine
    // how many numbers were actually received
    MPI_Get_count(&status, MPI_INT, &number_amount);

    // Print off the amount of numbers, and also print additional
    // information in the status object
    printf("1 received %d numbers from 0. Message source = %d, "
           "tag = %d\n",
           number_amount, status.MPI_SOURCE, status.MPI_TAG);
}
```

进程 0 将最多 `MAX_NUMBERS` 个整数以随机数量发送到进程 1。 进程 1 然后调用 `MPI_Recv` 以获取总计 `MAX_NUMBERS` 个整数。 尽管进程 1 以 `MAX_NUMBERS` 作为 `MPI_Recv` 函数参数，但进程 1 将最多接收到此数量的数字。 在代码中，进程 1 使用 `MPI_INT` 作为数据类型的参数，调用 `MPI_Get_count`，以找出实际接收了多少个整数。 除了打印出接收到的消息的大小外，进程 1 还通过访问 status 结构体的 `MPI_SOURCE` 和 `MPI_TAG` 元素来打印消息的来源和标签。

为了澄清起见，`MPI_Get_count` 的返回值是相对于传递的数据类型而言的。 如果用户使用 `MPI_CHAR` 作为数据类型，则返回的数量将是原来的四倍（假设整数是四个字节，而 char 是一个字节）。

### Use `MPI_Probe` to query the size of incoming data

使用 `MPI_Probe`在实际接收消息之前查询消息大小。 `MPI_Probe` 除了不接收消息外，它们执行与`MPI_Recv`相同的功能。当消息可用时，它将填充 status 结构体。 然后，用户可以使用 `MPI_Recv` 接收实际的消息。

```c
MPI_Probe(
    int source,
    int tag,
    MPI_Comm comm,
    MPI_Status* status)
```

```c
int number_amount;
if (world_rank == 0) {
    const int MAX_NUMBERS = 100;
    int numbers[MAX_NUMBERS];
    // Pick a random amount of integers to send to process one
    srand(time(NULL));
    number_amount = (rand() / (float)RAND_MAX) * MAX_NUMBERS;

    // Send the random amount of integers to process one
    MPI_Send(numbers, number_amount, MPI_INT, 1, 0, MPI_COMM_WORLD);
    printf("0 sent %d numbers to 1\n", number_amount);
} else if (world_rank == 1) {
    MPI_Status status;
    // Probe for an incoming message from process zero
  	// 
    MPI_Probe(0, 0, MPI_COMM_WORLD, &status);

    // When probe returns, the status object has the size and other
    // attributes of the incoming message. Get the message size
    MPI_Get_count(&status, MPI_INT, &number_amount);

    // Allocate a buffer to hold the incoming numbers
    int* number_buf = (int*)malloc(sizeof(int) * number_amount);

    // Now receive the message with the allocated buffer
    MPI_Recv(number_buf, number_amount, MPI_INT, 0, 0,
             MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    printf("1 dynamically received %d numbers from 0.\n",
           number_amount);
    free(number_buf);
}
```

进程 0 选择随机数量的数字发送给进程 1。 进程 1 调用 `MPI_Probe`，以找出进程 0 试图发送多少个元素（利用 `MPI_Get_count`）。 然后，进程 1 分配适当大小的缓冲区并接收数字。

## Point-to-Point Communication Application - Random Walk

随机游走的基本问题定义如下： 给定 *Min*，*Max* 和随机游走器 *W*，让游走器 *W* 向右以任意长度的 *S* 随机移动。 如果该过程越过边界，它就会绕回。 *W* 一次只能左右移动一个单位。

![随机游走图](https://pics.yujieliu.com/blog/2023/11/63ba7c46f02ba219ce87175a8131449f.png)

### 随机游走问题的并行化

在许多并行程序的应用中，首要任务是在各个进程之间划分域。 随机行走问题的一维域大小为 *Max - Min + 1*（因为游走器包含 *Max* 和 *Min*）。 假设游走器只能采取整数大小的步长，我们可以轻松地将域在每个进程中划分为大小近乎相等的块。 例如，如果 *Min* 为 0，*Max* 为 20，并且我们有四个进程，则将像这样拆分域。

![Domain decomposition example](https://pics.yujieliu.com/blog/2023/11/75ac190f4a01265564d272a0736e1994.png)

前三个进程拥有域的五个单元，而最后一个进程则拥有最后五个单元并且再加上一个剩余的单元。 一旦对域进行了分区，应用程序将初始化游走器。 如前所述，游走器将以步长 *S* 进行总步数随机的游走。 例如，如果游走器在进程 0（使用先前的分解域）上进行了移动总数为 6 的游走，则游走器的执行将如下所示：

1. 游走器的步行长度开始增加。但是，当它的值达到 4 时，它已到达进程 0 的边界。因此，进程 0 必须与进程 1 交流游走器的信息。
2. 进程 1 接收游走器，并继续移动，直到达到移动总数 6。然后，游走器可以继续进行新的随机移动。

![Random walk, step one](https://pics.yujieliu.com/blog/2023/11/876c8496f69729953a1eda3e57211792.png)

在此示例中，*W* 仅需从进程 0 到进程 1 进行一次通信。 但是，如果 *W* 必须移动更长的距离，则可能需要沿其通过域的路径将其传递给更多的进程。

### 使用 `MPI_Send` 和 `MPI_Recv` 组织代码

可以使用 `MPI_Send` 和 `MPI_Recv` 对组织代码。 在开始查看代码之前，让我们建立程序的一些初步特征和功能：

- 明确每个进程在域中的部分。
- 每个进程初始化 *N* 个 walker，所有这些 walker 都从其局部域的第一个值开始。
- 每个 walker 都有两个相关的整数值：当前位置和剩余步数。
- Walkers 开始遍历该域，并传递到其他进程，直到完成所有移动。
- 当所有 walker 完成时，该进程终止。

让我们从编写用于分解域的代码开始。 该函数将考虑域的总大小，并为 MPI 进程找到合适的子域。 它还会将域的其余部分交给最终的进程。 为了简单起见，我会调用 `MPI_Abort` 处理发现的任何错误。 名为 `decompose_domain` 的函数如下所示：

```c
void decompose_domain(int domain_size, int world_rank,
                      int world_size, int* subdomain_start,
                      int* subdomain_size) {
    if (world_size > domain_size) {
        // Don't worry about this special case. Assume the domain
        // size is greater than the world size.
        MPI_Abort(MPI_COMM_WORLD, 1);
    }
  	//每个进程的开始的但愿：总大小 / 每个域的大小 * 进程id
    *subdomain_start = domain_size / world_size * world_rank;
  	//子域大小：总数量 / 每个进程的大小 * 进程id
    *subdomain_size = domain_size / world_size;
    if (world_rank == world_size - 1) {
        // Give remainder to last process
      	//最后一个进程处理多出来无法整除的
        *subdomain_size += domain_size % world_size;
    }
  }

```

接下来，我们需要创建一个初始化 walkers 的函数。 我们首先定义一个如下所示的 walker 结构：

```c
typedef struct {
    int location;
    int num_steps_left_in_walk;
} Walker;
```

我们的初始化函数为 `initialize_walkers`，它采用子域边界，并将 walker 添加到 `incoming_walkers` 中

```c
void initialize_walkers(int num_walkers_per_proc, int max_walk_size,
                        int subdomain_start, int subdomain_size,
                        vector<Walker>* incoming_walkers) {
    Walker walker;
    for (int i = 0; i < num_walkers_per_proc; i++) {
        // Initialize walkers in the middle of the subdomain
        walker.location = subdomain_start;
      	//随机一个数让walker往下走
        walker.num_steps_left_in_walk =
            (rand() / (float)RAND_MAX) * max_walk_size;
        incoming_walkers->push_back(walker);
    }
}
```

初始化之后，就该使 walkers 前进了。 让我们从一个移动功能开始。 此功能负责使 walkers 前进，直到完成移动为止。 如果超出局部域范围，则将其添加到 `outgoing_walkers` `vector` 中。

```c
void walk(Walker* walker, int subdomain_start, int subdomain_size,
          int domain_size, vector<Walker>* outgoing_walkers) {
    while (walker->num_steps_left_in_walk > 0) {//依旧要走
        if (walker->location == subdomain_start + subdomain_size) {
          	//超出子域大小
            // Take care of the case when the walker is at the end
            // of the domain by wrapping it around to the beginning
            if (walker->location == domain_size) {
                walker->location = 0;
            }
          	//记录到要走出的walker队列中
            outgoing_walkers->push_back(*walker);
            break;
        } else {
          	//走一步
            walker->num_steps_left_in_walk--;
            walker->location++;
        }
    }
}
```

我们已经建立了初始化函数（用于填充传入的 walker 列表）和移动函数（用于填充传出的 walker 列表），我们仅再需要两个函数：发送待传出的 walker 的函数和接收待传入的 walker 的函数。 发送功能如下所示：

```c
void send_outgoing_walkers(vector<Walker>* outgoing_walkers, 
                           int world_rank, int world_size) {
    // Send the data as an array of MPI_BYTEs to the next process.
    // The last process sends to process zero.
  	// 这里data()是vector的内置函数返回一个指针指向数据列表的第一个元素
    MPI_Send((void*)outgoing_walkers->data(), 
             outgoing_walkers->size() * sizeof(Walker), MPI_BYTE,
             (world_rank + 1) % world_size, 0, MPI_COMM_WORLD);

    // Clear the outgoing walkers
    outgoing_walkers->clear();
}
```

接收传入的 walkers 的函数应该使用 `MPI_Probe`，因为它事先不知道将接收多少 walkers。

```c
void receive_incoming_walkers(vector<Walker>* incoming_walkers,
                              int world_rank, int world_size) {
    MPI_Status status;

    // Receive from the process before you. If you are process zero,
    // receive from the last process
    int incoming_rank =
        (world_rank == 0) ? world_size - 1 : world_rank - 1;
    MPI_Probe(incoming_rank, 0, MPI_COMM_WORLD, &status);

    // Resize your incoming walker buffer based on how much data is
    // being received
    int incoming_walkers_size;
    MPI_Get_count(&status, MPI_BYTE, &incoming_walkers_size);
    incoming_walkers->resize(
        incoming_walkers_size / sizeof(Walker));
    MPI_Recv((void*)incoming_walkers->data(), incoming_walkers_size,
             MPI_BYTE, incoming_rank, 0, MPI_COMM_WORLD,
             MPI_STATUS_IGNORE); 
}
```

现在我们已经建立了程序的主要功能。 我们必须将所有这些功能集成在一起，如下所示：

1. 初始化 walkers.
2. 使用 `walk` 函数使 walkers 前进。
3. 发出 `outgoing_walkers` 向量中的所有的 walkers。
4. 将新接收的 walkers 放入 `incoming_walkers` 向量中。
5. 重复步骤 2 到 4，直到所有 walkers 完成。

下面是完成此程序的第一次尝试。 此刻，我们不必担心如何确定所有 walkers 完成的时间。 但在查看代码之前，我必须警告您-该代码不正确！ 知晓这个问题以后，让我们看一下代码，希望您能发现它可能有什么问题。

```c
// Find your part of the domain
decompose_domain(domain_size, world_rank, world_size,
                 &subdomain_start, &subdomain_size);

// Initialize walkers in your subdomain
initialize_walkers(num_walkers_per_proc, max_walk_size,
                   subdomain_start, subdomain_size,
                   &incoming_walkers);

while (!all_walkers_finished) { // Determine walker completion later
    // Process all incoming walkers
    for (int i = 0; i < incoming_walkers.size(); i++) {
        walk(&incoming_walkers[i], subdomain_start, subdomain_size,
             domain_size, &outgoing_walkers); 
    }

    // Send all outgoing walkers to the next process.
    send_outgoing_walkers(&outgoing_walkers, world_rank,
                          world_size);

    // Receive all the new incoming walkers
    receive_incoming_walkers(&incoming_walkers, world_rank,
                             world_size);
}
```

一切看起来都很正常，但是函数调用的顺序引入了一种非常可能的情形 - **死锁**。

### 死锁及预防

死锁 *是指两个或多个进程各自在等待另一个进程释放资源，或者两个或多个进程在循环链中等待资源的特定条件*

上面的代码在大多数情况下实际上不会“死锁”。 尽管 `MPI_Send`是一个阻塞调用，但是 [MPI 规范](http://www.amazon.com/gp/product/0262692163/ref=as_li_tf_tl?ie=UTF8&tag=softengiintet-20&linkCode=as2&camp=217145&creative=399377&creativeASIN=0262692163) 表明 `MPI_Send` 会一直阻塞，直到可以**回收发送缓冲区为止**。 这意味着当网络可以缓冲消息时，`MPI_Send` 将返回。 如果发送最终无法被网络缓冲，它们将一直阻塞直到发布匹配的接收。 在我们的例子中，有足够多的小发送和频繁匹配的接收而不必担心死锁，但是，永远不该假定有足够大的网络缓冲区。

避免可能发生的发送和接收死锁的最佳方法是对消息进行排序，以使发送将具有匹配的接收，反之亦然。 一种简单的方法是更改循环，以使偶数编号的进程在接收 walkers 之前发送传出的 walkers，而奇数编号的进程则相反。

 ![Deadlock prevention](https://pics.yujieliu.com/blog/2023/11/209fbc23d2961baa8fdbf94971199045.png)

这种方法也适用于奇数个线程的情况

![Deadlock solution](https://pics.yujieliu.com/blog/2023/11/9809a1bc4ed8a95a848e08513cb17657.png)

### Determining completion of all walkers

程序的最后一步是确定每个 walker 何时结束。 由于 walkers 可以随机行走，因此它们可以在任何一个进程中结束它们的旅程。 因此，如果没有某种额外的通信，所有进程都很难知道 walkers 何时全部结束。 一种可能的解决方案是让进程零跟踪所有已完成的 walker，然后告诉其他所有进程何时终止。 但是，这样的解决方案非常麻烦，因为每个进程都必须向进程 0 报告所有完成的 walker，然后还要处理不同类型的传入消息。

在本文中，我们让这件事情稍微简单一点。 由于我们知道任意一个 walker 可以行进的最大距离和每对发送和接收对它可以行进的最小总大小（子域大小），因此我们可以计算出终止之前每个进程应该执行的发送和接收量。 在我们避免死锁的策略中考虑这一特征，该程序的最后主要部分如下所示：

```c
// Find your part of the domain
decompose_domain(domain_size, world_rank, world_size,
                 &subdomain_start, &subdomain_size);

// Initialize walkers in your subdomain
initialize_walkers(num_walkers_per_proc, max_walk_size,
                  subdomain_start, subdomain_size,
                  &incoming_walkers);

// Determine the maximum amount of sends and receives needed to 
// complete all walkers
int maximum_sends_recvs =
    max_walk_size / (domain_size / world_size) + 1;
for (int m = 0; m < maximum_sends_recvs; m++) {
    // Process all incoming walkers
    for (int i = 0; i < incoming_walkers.size(); i++) {
        walk(&incoming_walkers[i], subdomain_start, subdomain_size,
             domain_size, &outgoing_walkers); 
    }

    // Send and receive if you are even and vice versa for odd
    if (world_rank % 2 == 0) {
        send_outgoing_walkers(&outgoing_walkers, world_rank,
                              world_size);
        receive_incoming_walkers(&incoming_walkers, world_rank,
                                 world_size);
    } else {
        receive_incoming_walkers(&incoming_walkers, world_rank,
                                 world_size);
        send_outgoing_walkers(&outgoing_walkers, world_rank,
                              world_size);
    }
}
```

