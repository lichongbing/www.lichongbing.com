---
title: tcp协议详解-滑动窗口
abbrlink: 59181
date: 2019-12-11 20:12:19
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
TCP协议作为基本的传输控制协议，提供了面向连接的、可靠的通信机制。由于其优越的特性，被广泛应用于网络通信中，成为了今天互联网的基石。其为了屏蔽网络底层种种复杂的因素做出了巨大的努力,同时也导致了TCP内部各种机制之间的相互作用,让初接触它的人们很难理清头绪。本文就从TCP的传输窗口这个点切入，带领大家一睹TCP实现机制的风采。
2. TCP窗口

TCP发送窗口由slide_window（滑动窗口）、congestion_window（拥塞窗口）两者决定，代码如下（4.4BSD-Lite2）：

      #已发送未确认的字节数=下一个发送序号-最早的未确认序号
      off = tp->snd_nxt - tp->snd_una;
     
      #发送窗口为min(当前发送窗口,拥塞窗口)
        win = min(tp->snd_wnd, tp->snd_cwnd);
      
        ...
      #发送长度=发送窗口-已发送未确认字节数
    
      len = min(so->so_snd.sb_cc, win) - off;

2.1 滑动窗口

上面的snd_wnd、snd_una、snd_nxt三个字段组成了滑动窗口。 如下图所示：
![140518_Jgf4_990211.png.jpeg](https://image.lichongbing.com/static/26649e5da9909107782cb15cc3bab96b.jpeg)

2.2 发送端滑动窗口

发送端窗口随时间滑动图（不考虑重传）例如下所示：
![140708_XDkc_990211.png](https://image.lichongbing.com/static/9ba38aca6ff33aa21f54a86172904598.png)


(1）我们一共需要发送900字节数据。可发送数据为1-500字节，尚未发送数据。假设首先发送400字节的数据。

（2）发送了400字节后，对端返回一个ack表示收到200序号之内的数据且窗口通告为500。于是如图示，窗口向前滑动了200字节。当前已发送未确认字节序号为200-400,可发送字节序号为401-700,假设在此尚未发送数据。

（3）对端返回一个ack表示收到400序号内的数据且窗口通告为400。于是如图示，窗口向前滑动了200字节。已确认数据序号为1-400，可发送数据为401-800。
2.3 接收端窗口通告

snd_wnd此字段主要由接收端的窗口通告决定，接收端窗口通告由当前接收端剩余多少空闲的剩余缓存决定。如下图所示：
![140751_xWZF_990211.png](https://image.lichongbing.com/static/1dac3526be629241def321289f06530b.png)
（1）发送端：写入2KB的数据[seq=0]。
（2）接收端：收到数据,初始化接收端缓冲区4K,写入后还剩2K,于是通告ack[seq=2048,win=2048]。
（3）发送端：接收到窗口通告为2048,于是最多只能写入2K的数据，将2K数据写入[seq=2048]。
（4）接收端：应用层尚未消费缓冲区。接收到2K数据后，缓冲区满。于是通告窗口为0,返回ack[seq=4096,win=0]。
（5）发送端：由于发送窗口为0，不能发送任何数据。此时发送端就需要定时的发送1字节的数据去探测接收端窗口。所需的定时器即为持续定时器（TCPT_PERSIST）。
（6）发送端：发送0字节的探测数据。
（7）接收端：缓冲区满,窗口通告为0,ack[seq=4096,win=0]。
（8）发送端：继续发送0字节的探测数据。
（9）接收端：缓冲区被应用层消费了2K,缓冲区可用字节为2K,通告窗口为2048,ack[seq=4096,win=2048]。
（10）发送端：继续写入1K的数据。

2.4 拥塞窗口
TCP用拥塞窗口（cwnd）来进行拥塞控制，主要利用了慢启动、拥塞避免、快速重传和快速恢复这四个算法。

2.4.1 慢启动和拥塞避免

拥塞避免算法和慢启动算法是两个目的不同、独立的算法。慢启动的目的是:防止一开始速率过快，导致耗尽中间路由器存储空间，从而严重降低TCP连接的吞吐量。拥塞避免的目的是:当拥塞发生时，降低网络的传输速率。这可以通过调用慢启动的动作来降低网络的传输速率。所以在实际中这两个算法通常在一起实现。
下述代码描述的是慢启动的过程（4.4BSD-Lite2）。

         {
         u_int win = min(tp->snd_wnd, tp->snd_cwnd) / 2 / tp->t_maxseg;
          if (win < 2)
         win = 2;
         tp->snd_cwnd = tp->t_maxseg;
         tp->snd_ssthresh = win * tp->t_maxseg;
         tp->t_dupacks = 0;
         }

其将win置为现有窗口的大小,同时慢启动门限tp->snd_ssthresh设置为现有窗口大小的一半。snd_cwnd（拥塞窗口）被设定为只能容纳一个报文t_maxseg)，这样就强迫TCP执行慢启动。之后拥塞窗口会先以指数形式增长，达到慢启动门限snd_ssthressh之后,再线性增长。
线性增长的过程即是拥塞避免算法。
此过程如以下代码注释所示（4.4BSD-Lite2）：


        /*
        * When new data is acked, open the congestion window.
        * If the window gives us less than ssthresh packets
        * in flight, open exponentially (maxseg per packet).
        * Otherwise open linearly: maxseg per window
        * (maxseg * (maxseg / cwnd) per packet).
        */
        {
         register u_int cw = tp->snd_cwnd;
         register u_int incr = tp->t_maxseg;
         if (cw > tp->snd_ssthresh)
          incr = incr * incr / cw;
          tp->snd_cwnd = min(cw + incr, TCP_MAXWIN<<tp->snd_scale);
        }
慢启动图例

![140900_h1Ea_990211.png](https://image.lichongbing.com/static/0c868f962bfca16830631f55f4087462.png)
图中Cwnd指数增长的阶段,即从1到ssthresh时间段是过程是慢启动。
图中Cwnd线性增长的阶段,即从ssthresh到max的时间段是拥塞避免的过程。
值得注意的是，TCP连接刚建立时刻也会有慢启动的过程。如果用的是短连接(即发送一个请求之后即抛弃此连接)且发送数据较少的话，大部分时间都耗在了慢启动上面，并没有充分的利用带宽。再加上建立连接所需要三次握手的消耗,导致短连接的效率要远低于长连接。

2.4.2 快速重传和快速恢复

快速重传和快速恢复算法各自独立，但一般都在一起实现。

快速重传：在接收到相同ACK后，推断出丢失报文段起始序号，然后立即重传此报文
快速恢复：在快速重传的基础上，如果发生了快速重传，则执行拥塞避免算法而非慢启动。
快速重传和快速恢复图例：

![140929_VRch_990211.png.jpeg](https://image.lichongbing.com/static/b9958c4a3b1495a3134fb9c649f5b2f6.jpeg)
从上图中我们可以看到，快速恢复的时候tcp窗口仅仅降低到ssthresh而后线性增加，即只进行了拥塞避免算法。

2.5 TCP粘包
经过上述讨论，可知TCP窗口的大小取决于当前的网络状况、对端的缓冲大小等等因素，TCP将这些都从底层屏蔽。开发者无法从应用层获取这些信息。这就意味着，当你在接收TCP数据流的时候无法知道当前接收了有多少数据流，数据可能在任意一个比特位（seq）上。这就是所谓的"粘包"问题。开发者必须小心的组织帧格式来解决"粘包"。

