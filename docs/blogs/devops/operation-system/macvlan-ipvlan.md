---
category: Computer Science, Network
tag: 
- Ubuntu
---



# Macvlan和IPvlan

- Macvlan：在同一个物理网卡上配置多个 MAC 地址，即多个 sub interface，物理网卡称为parent interface。每个 interface 可以配置自己的 IP。**macvlan 本质上是一种网卡虚拟化技术(最大优点是性能极好)**
-  IPVlan 和 macvlan 类似，都是从一个主机接口虚拟出多个虚拟网络接口。一个重要的区别就是所有的虚拟接口都有相同的 macv 地址，而拥有不同的 ip 地址。因为所有的虚拟接口要共享 mac 地址，因此在HDCP协议分配ip的时候需要配置唯一的 ClientID 来区分设备而不是仅仅使用 mac 地址



## macvlan的工作模式

### bridge

同一个parent接口的macvlan接口之间挂到同一个bridge上，macvlan之间通，但无法与eth0通信。

等于是在macvlan之间创建了一个arp表，但对外部透明。

<img src="https://pics.yujieliu.com/blog/2023/12/a7324c612d49e0a9ff8ac32ebab21944." alt="img" style="zoom:50%;" />

### VPEA（Virtual Ethernet Port Aggregator）

所有接口的流量都需要到外部switch才能够到达其他接口。等于是需要一个外部的路由器创建arp表来进行路由。

<img src="https://pics.yujieliu.com/blog/2023/12/1fa8ae31969eabfd0975b1f03fbaeeb7." alt="img" style="zoom:50%;" />

### Private

接口只接受发送给自己MAC地址的报文。

<img src="https://pics.yujieliu.com/blog/2023/12/d035f1772ce795331781140e83c699a4." alt="img" style="zoom:50%;" />



## Docker容器与macvlan问题

当Docker使用macvlan作为docker network时，它在parent interface是一个物理接口(eth0)或者bond (bine0) 时没有问题，但在是一个 bridge (br0) 时工作不佳。

而对于Unraid这样的系统来说，它通过br0来连接外部网络，因此有些cumbersome。



## IPvlan的工作模式

### L2二层工作模式

和 macvlan bridge 模式工作原理很相似，父接口作为**交换机**来转发子接口的数据。同一个网络的子接口可以通过父接口来转发数据，而如果想发送到其他网络，报文则会通过父接口的路由转发出去。

### L3 三层工作模式

ipvlan 有点像**路由器**的功能，它在各个虚拟网络和主机网络之间进行不同网络报文的路由转发工作。只要父接口相同，即使虚拟机/容器不在同一个网络，也可以互相 ping 通对方，因为 ipvlan 会在中间做报文的转发工作。

<img src="https://pics.yujieliu.com/blog/2023/12/f47fbea8d24bb494f920779c2bca3e7c.png" alt="image" style="zoom: 67%;" />



