---
title: solr参考指南（入门）
abbrlink: 20340
date: 2019-12-25 17:20:29
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
关于本指南
-----

本指南介绍了 Apache Solr 的所有重要特性和功能。

您可以从 [http://lucene.apache.org/solr/](http://lucene.apache.org/solr/) 免费下载 Solr。

本指南旨在让您更了解 Solr。该指南的结构是满足广泛学习用户的需求，从新的开发人员开始到经验丰富的开发人员扩展他们的应用程序或故障排除。它将在应用程序生命周期的任何时候使用，只要您需要有关 Solr 的任何信息。

本教程中所提供的材料假设您熟悉一些基本的搜索概念，并且您可以阅读 XML，您不需要是一名专业的 Java 程序员，尽管 Java 的知识在直接使用 lucene 或在开发 lucene/Solr 安装的自定义扩展时很有用。

主机和端口示例[](http://lucene.apache.org/solr/guide/7_0/about-this-guide.html#hosts-and-port-examples)
------------------------------------------------------------------------------------------------

运行 Solr 时的默认端口为 8983。本指南中的示例、URL 和屏幕截图可能会显示在不同的端口，因为 Solr 使用的端口号是可配置的。

如果您尚未自定义 Solr 的安装，请确保在执行以下示例时使用端口 8983，或配置您自己的安装以使用示例中显示的端口号。有关配置端口号的信息，请您参阅 “管理Solr” 一节。

类似地，URL 示例始终使用本地主机 localhost；如果您要从远程访问 solr 的服务器所在的位置进行存取，请将 localhost 替换为 solr 正在运行的适当域或 IP。

例如，我们可以提供一个示例查询，如：

    http://localhost:8983/solr/gettingstarted/select?q=brown+cow

您可能需要在本地更改此 URL 中的几个项目。首先，如果您的服务器运行在 “www.example.com” 上，您将用适当的域替换 “localhost”。如果您没有使用端口8983，那么您也可以替换它。最后，您将希望将“gettingstarted”(集合或核心名称)替换为在实现中使用的适当名称。URL 将会变成：

    http://www.example.com/solr/mycollection/select?q=brown+cow

路径[](http://lucene.apache.org/solr/guide/7_0/about-this-guide.html#paths)
-------------------------------------------------------------------------

路径信息是相对于 solr.home 给出的，它是 solr 的主要安装位置，solr 的集合及其 conf 和 data 目录都存储在这里。

当运行本教程中提到的各种示例（即，bin/solr -e techproducts），solr.home 将是为您自动创建的 example/ 创建的子目录。
# Solr入门
Solr 使程序员能够轻松地开发具有高级功能的复杂、高性能的搜索应用程序。它是一个独立的企业级搜索应用服务器，它对外提供 API 接口。用户可以通过 HTTP 请求或者使用 Http Get 提出查找请求。

本部分将介绍基本的 Solr 体系结构和功能，以帮助您快速启动和运行 Solr。它将涵盖以下主题：

*   [快速概述](https://www.w3cschool.cn/solr_doc/solr_doc-xcdq2fly.html)：关于 Solr 工作方式的高级概述。

*   [安装 Solr](https://www.w3cschool.cn/solr_doc/solr_doc-ltzn2fm4.html)：Solr 安装过程的演练。

*   Solr 配置文件：安装布局和主要配置文件概述。

*   Solr 升级说明：有关 Solr 发行版中所做更改的信息。

*   采用 Solr 进行生产：帮助您将 Solr 安装为服务并将应用程序应用于生产的详细步骤。

*   升级 Solr 集群：用于升级生产 SolrCloud 集群的信息。

```
    Tip：Solr 包括一个快速入门教程，如果您刚刚开始使用 Solr，这将对您有所帮助。您可以在本指南中的 Solr 快速教程中找到它。
```
# Solr快速概述
Solr 是一个基于 Apache Lucene 之上的搜索服务器，它是一个开源的、基于 Java 的信息检索库。它旨在驱动功能强大的文档检索应用程序 - 无论您需要根据用户的查询将数据服务到何处，Solr 都可以为您服务。

下面是一个如何将 Solr 集成到应用程序中的示例：

![Solr与应用程序的集成](https://atts.w3cschool.cn/attachments/image/20171103/1509691910631328.png)

在上述情况下，Solr 与其他服务器应用程序并行运行。例如，在线商店应用程序将提供用户界面、购物车以及为最终用户购买的方式；而库存管理应用程序将允许商店员工编辑产品信息。产品元数据将保存在某种数据库以及 Solr 中。

Solr 可以通过以下步骤轻松地添加在在线商店搜索的功能：

1.  定义一个模式。该模式告诉 Solr 关于它将被索引的文档的内容。在在线商店的示例中，模式将定义产品名称、描述、价格、制造商等定义的字段。Solr 的模式是强大而灵活的，可以让您根据自己的应用程序定制 Solr 的行为。有关详细信息，请参阅文档、字段和模式设计。
2.  您的用户将搜索的 Feed Solr 文档。

3.  在您的应用程序中公开搜索功能。

因为 Solr 是基于开放标准的，所以它是高度可扩展的。Solr 查询是简单的 HTTP 请求 URL，响应是一个结构化文档：主要是 JSON，但也可以是 XML、CSV 或其他格式。这意味着各种各样的客户端将能够使用 Solr，从其他 Web 应用程序到浏览器客户端、丰富的客户端应用程序和移动设备。任何能够使用 HTTP 的平台都可以与 Solr 对话。有关客户端 API 的详细信息，请参阅客户端 API。

Solr 提供了对多个字段和多面搜索结果的复杂查询的最简单关键字搜索支持。搜索具有更多关于搜索和查询的详细信息。

如果 Solr 的功能还不够令人印象深刻，那么它处理非常高容量应用程序的能力就应该发挥出来。

一个相对常见的情况是，您有太多数据或者有许多查询，以至于单个 Solr 服务器无法处理您的整个工作负载。在这种情况下，您可以使用 SolrCloud 扩展应用程序的功能，以便在多个服务器之间更好地分发数据和处理请求。可以根据您需要的可扩展性的类型，混合和匹配多个选项。

例如：“Sharding” 是一种缩放技术，其中集合被拆分成多个称为“碎片（shards）”的逻辑片段，以便将集合中的文档数量扩展到超过单个服务器上的物理数量。收集的查询将分发到集合中的每个碎片，并通过合并结果进行响应。另一种可用的方法是增加集合的“复制因子”，这使您可以通过将请求扩展到多台计算机，来添加具有集合的额外副本的服务器，以处理更高的并发查询负载。切分和复制不是相互排斥的， 它共同使 Solr 成为一个非常强大和可伸缩的平台。

最重要的是，这个关于大容量应用程序的讨论不仅是假设性的：一些使用 Solr 的著名互联网网站是：Macy's、EBay 和 Zappo。

有关更多示例，请查看：https://wiki.apache.org/solr/PublicServers。
# Solr系统要求
您可以在任何系统中安装 Solr，但是这些系统中必须有适用的 Java 运行时环境（JRE），具体介绍如下文所述。

目前，这包括 Linux，MacOS / OS X 和 Microsoft Windows。

Solr 安装要求[](http://lucene.apache.org/solr/guide/7_0/solr-system-requirements.html#installation-requirements)
------------------------------------------------------------------------------------------------------------

### Java 要求[](http://lucene.apache.org/solr/guide/7_0/solr-system-requirements.html#java-requirements)

您将需要 1.8 或更高版本的 Java 运行时环境（JRE）。在命令行中，检查您的 Java 版本，如下所示：

    $ java -version
    java version "1.8.0_60"
    Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
    Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)

确切的输出将会有所不同，但您需要确保符合最低版本要求。我们还建议您从供应商那里选择一种可以使用的版本。Oracle 或 OpenJDK 是经过最多测试的 JRE，建议您可以使用它们。我们还建议您尽可能使用最新的官方版本。

某些版本的 Java VM 有可能影响您的实现的错误。为确保，请查看 Lucene JavaBugs 页面。

如果您没有所需的版本，或者未找到 java 命令，请从 Oracle 的 [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html) 下载并安装最新版本。

### 支持的操作系统[](http://lucene.apache.org/solr/guide/7_0/solr-system-requirements.html#supported-operating-systems)

Solr 在 Linux、MacOS 和 Windows 的几个版本上进行了测试，您可以使用它们。
# 安装Solr
您如果要在 Unix 兼容或 Windows 服务器上安装 Solr，通常只需简单地提取（或解压缩）下载包。

请您务必在启动 Solr 之前查看[Solr系统要求](https://www.w3cschool.cn/solr_doc/solr_doc-qpc52fm3.html)一节。

可用 Solr 软件包[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#available-solr-packages)
---------------------------------------------------------------------------------------------------

Solr 可从 Solr 网站获取。您可以在此下载最新版本的 Solr：[https://lucene.apache.org/solr/mirrors-solr-latest-redir.html](https://lucene.apache.org/solr/mirrors-solr-latest-redir.html)。

Solr 有三个独立的软件包：

*   solr-7.0.0.tgz：适用于 Linux / Unix / OSX 系统
*   solr-7.0.0.zip：适用于 Microsoft Windows 系统
*   solr-7.0.0-src.tgz：Solr 源代码包。如果您想在 Solr 上开发而不使用官方的 Git 存储库，这将非常有用。

准备安装 Solr[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#preparing-for-installation)
----------------------------------------------------------------------------------------------------

当您开始使用 Solr 时，您需要做的就是将 Solr 发行档案解压到您选择的目录中。这将足以作为一个最初的开发环境，但在设置真正的开发和生产环境之前，请注意不要太过关注 "toy" 安装。

当您已经完成了对 Solr 的初始评估后，您需要注意计划您的实施。您可能需要在另一台服务器上重新安装 Solr 或制作集群化的 SolrCloud 环境。

当您准备好为生产环境安装 Solr 时，请参阅 “使用 Solr 到生产” 页面上提供的说明。

> Tip：我需要什么大小的服务器？  
> 如何确定 Solr 安装的大小是一个复杂的问题, 它依赖于许多因素, 包括文档的数量和结构、您打算存储的字段数量、用户数等。
>
> 强烈建议您花点时间考虑一下影响您的 Solr 实现的硬件大小的因素。一个非常好的博客文章, 讨论该考虑的问题的一个博客文章是：在抽象中调整硬件: [为什么我们没有一个明确的答案](https://lucidworks.com/2012/07/23/sizing-hardware-in-the-abstract-why-we-dont-have-a-definitive-answer/)。

软件包安装[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#package-installation)
------------------------------------------------------------------------------------------

为了保持现在的简单的方式，请将 Solr 分发存档解压缩到您的本地主目录，例如在 Linux 上，请执行以下操作：

    cd ~/
    tar zxf solr-7.0.0.tgz

一旦解压缩，您现在就可以使用下面的 “启动 Solr” 部分提供的说明运行 Solr 了。

目录布局
----

安装 Solr 之后，您将会看到以下的目录和文件：

*   bin

    此目录中包含几个重要的脚本，这些脚本将使使用 Solr 更容易。

    *   solr 和 solr.cmd

        这是Solr 的控制脚本，也称为`bin/solr`（对于 \* nix）或者`bin/solr.cmd`（对于 Windows）。这个脚本是启动和停止 Solr 的首选工具。您也可以在运行 SolrCloud 模式时创建集合或内核、配置身份验证以及配置文件。

    *   post

        Post Tool，它提供了用于发布内容到 Solr 的一个简单的命令行界面。

    *   solr.in.sh 和 solr.in.cmd

        这些分别是为 \* nix 和 Windows 系统提供的属性文件。在这里配置了 Java、Jetty 和 Solr 的系统级属性。许多这些设置可以在使用`bin/solr`或者`bin/solr.cmd`时被覆盖，但这允许您在一个地方设置所有的属性。

    *   install\_solr\_services.sh

        该脚本用于 \* nix 系统以安装 Solr 作为服务。在 “将Solr用于生产 ” 一节中有更详细的描述。

*   contrib

    Solr 的`contrib`目录包含 Solr 专用功能的附加插件。

*   dist

    该`dist`目录包含主要的 Solr .jar 文件。

*   docs

    该`docs`目录包括一个链接到在线 Javadocs 的 Solr。

*   example

    该`example`目录包括演示各种 Solr 功能的几种类型的示例。有关此目录中的内容的详细信息，请参阅下面的 Solr 示例。

*   licenses

    该`licenses`目录包括 Solr 使用的第三方库的所有许可证。

*   server

    此目录是 Solr 应用程序的核心所在。此目录中的 README 提供了详细的概述，但以下是一些特点：

    *   Solr 的 Admin UI（`server/solr-webapp`）

    *   Jetty 库（`server/lib`）

    *   日志文件（`server/logs`）和日志配置（`server/resources`）。有关如何自定义 Solr 的默认日志记录的详细信息，请参阅配置日志记录一节。

    *   示例配置（`server/solr/configsets`）



Solr 示例
-------

Solr 包括许多在开始时使用的示例文档和配置。如果您运行了 Solr 教程，您已经与这些文件中的某些文件进行了互动。

以下是 Solr 包含的示例：

*   exampledocs

    这是一系列简单的 CSV、XML 和 JSON 文件，可以在首次使用 Solr 时使用`bin/post`。有关和这些文件一起使用`bin/post`的更多信息，请参阅 Post 工具。

*   example-DIH

    此目录包含一些 DataImport Handler（DIH）示例，可帮助您开始在数据库、电子邮件服务器甚至 Atom 提要中导入结构化内容。每个示例将索引不同的数据集；有关这些示例的更多详细信息，请参阅 README。

*   files

    该`files`目录为您提供了一个基本的搜索 UI，可以用于文档（例如 Word 或 PDF），您可能已经存储在本地。有关如何使用此示例的详细信息，请参阅README。

*   films

    该`films`目录包含一组关于电影的强大数据，包括三种格式：CSV、XML 和 JSON。有关如何使用此数据集的详细信息，请参阅 README。


启动 Solr[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#starting-solr)
-------------------------------------------------------------------------------------

Solr 包括一个名为 bin/solr（对于Linux / MacOS系统）或者 bin\\solr.cmd（对于 Windows 系统）的命令行界面工具。此工具允许您启动和停止 Solr、创建核心和集合、配置身份验证和检查系统的状态。

要使用它来启动 Solr，您只需输入：

    bin/solr start

如果您正在运行 Windows，则可以通过运行 bin \ solr 来启动 Solr。

    bin\solr.cmd start

这将在后台启动 Solr，监听端口 8983。

当您在后台启动 Solr 时，脚本将等待确认 Solr 在正确启动后再返回到命令行提示符。

    Tip：Solr CLI 的所有选项都在 "Solr 控制脚本参考" 部分中介绍。

### 使用特定捆绑示例启动 Solr[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#start-solr-with-a-specific-bundled-example)

Solr 还提供了一些有用的例子来帮助您了解主要功能。您可以使用该 -e 标志启动这些示例。例如，要启动 "techproducts" 示例，您可以执行以下操作：

    bin/solr -e techproducts

目前，您可以运行的可用示例是：techproducts、dih、schemaless 和 cloud。有关每个示例的详细信息，请参阅运行示例配置一节。

    Note：SolrCloud 入门：运行 cloud 示例以 SolrCloud 模式启动 Solr。有关在 cloud 模式下启动 Solr 的更多信息，请参阅“SolrCloud入门”部分。

### 检查 Solr 是否正在运行

如果您不确定 Solr 是否在本地运行，则可以使用 status 命令：

    bin/solr status

这将搜索在您的计算机上运行的 Solr 实例，然后收集有关它们的基本信息，如版本和内存使用情况。

Solr 正在运行。如果您需要有说服力的证明，请使用 Web 浏览器查看管理控制台：http://localhost:8983/solr/

![Solr管理界面](https://atts.w3cschool.cn/attachments/image/20171103/1509697683443398.png)

如果 Solr 未运行，您的浏览器将提示无法连接到服务器。请检查您的端口号，然后进行重试。

### 创建核心[](http://lucene.apache.org/solr/guide/7_0/installing-solr.html#create-a-core)

如果您没有使用示例配置启动 Solr，则需要创建一个核心才能进行索引和搜索。您可以运行以下操作：

    bin/solr create -c <name>

这将创建一个使用数据驱动模式的核心，当您将文档添加到索引时，该模式会尝试猜测正确的字段类型。

要查看创建新核心的所有可用选项，请执行以下操作：

    bin/solr create -help

# Solr配置文件
在 Solr 中有几个配置文件，您将在执行过程中与之交互。

这些文件中的很多都是 XML 格式的，尽管与配置设置交互的 API 在需要时往往接受 JSON 以进行编程访问。

Solr Home[](http://lucene.apache.org/solr/guide/7_0/solr-configuration-files.html#solr-home)
--------------------------------------------------------------------------------------------

在运行 Solr 时，您需要访问主目录。

当您第一次安装 Solr 时，您的主目录是：server/solr。但是，一些示例可能会更改此位置（例如，如果您运行：bin/solr start -e cloud，您的主目录将会是：example/cloud）。

Solr 主目录包含重要的配置信息，并且是 Solr 将存储其索引的地方。当您在独立模式下与在 SolrCloud 模式下运行 Solr 时，主目录的布局看起来会有所不同。

以下示例显示了 Solr 主目录中的关键部分：

### 示例-独立模式

    <solr-home-directory>/
       solr.xml
       core_name1/
          core.properties
          conf/
             solrconfig.xml
             managed-schema
          data/
       core_name2/
          core.properties
          conf/
             solrconfig.xml
             managed-schema
          data/

### 示例-SolrCloud 模式

    <solr-home-directory>/
       solr.xml
       core_name1/
          core.properties
          data/
       core_name2/
          core.properties
          data/

您可能会看到其他文件，但您需要了解的主要部分将在下一节中讨论。

Solr 配置文件
---------

在 Solr 的主页中，你会发现这些文件：

*   solr.xml：为您的 Solr 服务器实例指定配置选项。有关 solr.xml 的更多信息，请参阅：Solr Cores 和 solr.xml。
*   每个 Solr 核心：
    *   core.properties：为每个核心定义特定的属性，例如其名称、核心所属的集合、模式的位置以及其他参数。有关 core.properties 的更多详细信息，请参阅定义 core.properties 一节。
    *   solrconfig.xml：控制高级行为。例如，您可以为数据目录指定一个备用位置。有关 solrconfig.xml 的更多信息，请参阅 配置 solrconfig.xml。
    *   managed-schema（或用 schema.xml 替代）描述您将要求 Solr 索引的文档。模式将文档定义为字段集合。您可以同时定义字段类型和字段本身。字段类型定义功能强大，包含有关 Solr 如何处理传入字段值和查询值的信息。有关 Solr 架构的更多信息，请参阅文档、字段和模式设计以及模式 API。
    *   data/：包含低级索引文件的目录。

请注意，SolrCloud 示例不包括每个 Solr Core 的 conf 目录（所以没有 solrconfig.xml 或 Schema 文件）。这是因为通常在 conf 目录中找到的配置文件存储在ZooKeeper 中，所以它们可以在群集中传播。

如果您正在使用 SolrCloud 与嵌入式 ZooKeeper 的情况下，您还可以看到 zoo.cfg 和 zoo.data，它们是 ZooKeeper 的配置和数据文件。但是，如果您正在运行自己的 ZooKeeper 集成，则您在启动 ZooKeeper 配置文件时，将会提供您自己的 ZooKeeper 配置文件，而 Solr 中的副本将不会被使用。有关 SolrCloud 的更多信息，请参阅 SolrCloud 部分。
# Solr版本升级说明
以下的说明描述了在升级之前您应该了解的 Solr 在最近版本中所做的更改。

这些说明旨在强调可能影响最大数量的实现的最大变化。它不是任何版本中 Solr 的所有更改的完整列表。

在计划您的 Solr 升级时，请考虑您对系统进行的自定义设置，并查看在您的 Solr 软件包中找到的  CHANGES.txt 文件。该文件包含可能影响您现有实现的所有更改和更新。

升级 Solr 集群的详细步骤可以在“升级 Solr 集群 ”部分找到。

从任何 6.x 版本升级
------------

从 Solr 6.x 升级到 Solr 7 介绍了在升级之前应注意的几个主要更改。请在开始升级之前对 Solr 7 中的部分主要更改进行彻底的检查。

从较旧版本的 Solr 升级
--------------

强烈建议从较旧版本升级的用户参考 CHANGES.txt，了解自升级版本以来的所有更改的详细信息。

Solr 5.x 和 Solr 6.0 之间的重大变化摘要可以在从 Solr 5 到 Solr 6 章节的主要变化中找到。
# Solr7的主要变化
Solr 7 是 Solr 的一个主要的新版本，它引入了新的功能和其他一些可能影响您现有安装的其他更改。

开始升级
----

在开始迁移您的配置和索引之前，需要考虑 Solr 7 中的主要更改。此页面旨在突出显示最大的变化 - 您可能需要了解的新功能，还包括默认行为和已删除的已否决功能的更改。

然而，Solr 7 中有许多变化，因此，对 Solr 升级说明以及 Solr 实例中的 [CHANGES.txt](https://lucene.apache.org/solr/7_0_0//changes/Changes.html) 文件进行彻底的审查将有助于您计划向 Solr 7 迁移。本节将重点介绍 Solr 7中的一些你应该知道的重大变化。

您还应该考虑在尚未升级到的任何版本中对 Solr 所做的所有更改。例如，如果您当前正在使用 Solr 6.2，则除了 7.0 的更改之外，还应该查看所有后续 6.x 版本中所做的更改。

将数据重新编入索引被认为是最佳做法，如果可能的话，您应该尝试这样做。但是，如果重新索引不可行，请记住，您只能一次升级一个主要版本。因此，Solr 6.x 索引将与 Solr 7 兼容，但 Solr 5.x 索引不会。

如果您现在不重新编制索引，请记住，您将需要重新索引数据或升级索引，然后才能在将来发布 Solr 8 时转移到 Solr 8。有关如何升级索引的更多详细信息，请参阅IndexUpgrader 工具一节。

有关如何升级 SolrCloud 群集的详细信息，另请参阅升级 Solr 群集一节。

新增功能和功能增强
---------

### 复制模式

直到 Solr 7 ，SolrCloud 模型的复制副本允许任何复制副本在领导者丢失时成为领导者。这对大多数用户来说非常有效，在集群出现问题的情况下提供可靠的故障切换。但是，由于所有副本必须在任何时候都同步，因此在大型群集中需要付出代价。

为了提供更多的灵活性，已经添加了两种新类型的副本，名为 TLOG＆PULL。这些新类型提供了一些选项，以便仅通过从前导项复制索引段与引线同步的副本。TLOG 类型还有一个额外的好处，就是维护一个事务日志（它的名字为 “tlog”），如果需要的话，它可以恢复并成为领导者；PULL 类型不维护事务日志，因此不能成为领导者。

作为这种改变的一部分，传统的副本现在被命名为 NRT。如果您没有明确定义一些 TLOG 或 PULL 副本，则 Solr 默认创建 NRT 副本。如果这个模型适合您的工作，您不需要改变任何东西。

有关新副本模式的更多详细信息，以及如何在群集中定义副本类型，请参见副本类型一节。

### 自动缩放

Solr 自动缩放是 Solr 中的一个新功能套件，用于管理 SolrCloud 群集更加简单和自动化。

Solr 自动缩放的核心是为用户提供一个规则语法来定义如何在集群中分发节点和碎片的首选项和策略，目的是在集群中保持平衡。从 Solr 7 开始，Solr 将在确定将创建或移动各种 Collections API 命令的新碎片和副本放置到何处时，将考虑任何策略或首选项规则。

有关 Solr 7.0 中可用选项的详细信息，请参见 SolrCloud 自动缩放部分。预计在该领域的后续 7.x 版本中将会发布更多功能。

### 其他功能和增强

*   Analytics 组件已被重构。该组件的文档正在进行中；在可用之前，请参阅 SOLR-11144 了解更多详情。
*   在早期的 6.x 版本中发布了其他几个新功能，您可能会错过这些功能：学习排名（Learning to Rank）。统一的高亮（Unified Highlighter）。度量 API（Metrics API）。另请参阅下面的 “JMX 支持” 和 “MBean”一节中有关弃用的信息。有效负载查询（Payload queries）。流媒体评估器（Streaming Evaluators）。 / v2 API。 图流表达式（Graph streaming expressions）。

配置和默认更改
-------

### 新的默认配置集

对与 Solr 有关的配置进行了若干修改；不仅他们的内容，还有 Solr 在这些方面的行为：

*   data\_driven\_configset 与 basic\_configset 已被删除，取而代之的是 \_defaultconfigset。sample\_techproducts\_configset 还保留，专门与example/exampledocs 目录中的 Solr 附带的示例文档一起使用。
*   当创建一个新的集合时，如果您不指定一个 configSet，\_default 将被使用。如果你使用 SolrCloud，\_defaultconfigSet 会自动上传到 ZooKeeper。如果使用独立模式，instanceDir 将自动创建，使用 _defaultconfigSet 作为基础。

### 无模式的改进

为了改进无模式的功能，当检测到传入字段中的数据应该具有基于文本的字段类型时，Solr 现在的行为会有所不同。

*   默认情况下，传入的字段将被索引为 text_general（可以更改）。该字段的名称将与文档中定义的字段名称相同。
*   复制字段规则将被插入到您的模式中，以将新的 text\_general 字段复制到具有名称的新字段 <name>\_str。这个字段的类型将是一个 strings 字段（允许多个值）。文本字段的前 256 个字符将被插入到新的字符串字段中。

如果您希望删除复制字段规则，或者更改插入到字符串字段的字符数或所使用的字段类型，则可以自定义此行为。有关详细信息，请参阅 “无模式”部分。

    Tip：由于复制字段规则可以降低索引的速度并增加索引大小, 所以建议您在需要时只使用复制字段。如果您不需要对字段进行排序或分面，则应该删除自动生成的复制字段规则。

可以使用 update.autoCreateFields 属性禁用自动字段创建。要做到这一点，您可以通过如下命令使用 Config API 例如：

    curl http://host:8983/solr/mycollection/config -d '{"set-user-property": {"update.autoCreateFields":"false"}}'

### 对默认行为的更改

*   JSON 现在是默认的响应格式。如果您依赖于 XML 响应，您现在必须在请求中定义：wt=xml。另外，行缩进是默认启用的（indent=on）。
*   sow 参数（“Split on Whitespace”的缩写）现在默认为 false，允许支持多字同义词。该参数与 eDismax 和 standard/“lucene” 查询解析器一起使用。如果此参数没有明确指定为：true，查询文本将不会在空白上拆分。
*   legacyCloud 参数现在默认为 false。如果副本的项不存在 state.json，则该副本将不会被注册。这可能会影响到复制副本的用户，并自动将其注册为分片的一部分。通过使用以下命令在群集属性中设置属性 legacyCloud=true，可以退回到旧的行为：

        ./server/scripts/cloud-scripts/zkcli.sh -zkhost 127.0.0.1:2181 -cmd clusterprop -name legacyCloud -val true

*   如果 solrconfig 中的 luceneMatchVersion 是 7.0.0 或以上版本，则 eDismax 查询分析器参数 lowercaseOperators 现在默认为 false。luceneMatchVersion 低于7.0.0 的行为是不变的（因此，为 true）。这意味着客户端必须以大写的方式发送布尔运算符（如 AND、OR 和 NOT）才能被识别，或者您必须明确地设置该参数为 true。
*   如果 luceneMatchVersion 是7.0.0 或以上，则 solrconfig 中的 handleSelect 参数现在默认为 false。这会导致 Solr 忽略 qt 参数，如果它存在于请求中。如果您的请求处理程序没有前导 '/'，则可以设置 handleSelect="true" 或考虑迁移您的配置。该 qt 参数仍用作指定要使用的请求处理程序（尾部 URL 路径）的 SolrJ特殊参数。
*   lucenePlusSort 查询解析器（又名 “旧 Lucene 查询解析器”）已被弃用，不再隐式定义。如果你想继续使用这个解析器直到 Solr 8（当它将被删除），你必须将它注册到您的 solrconfig. xml 中，如：

        <queryParser name="lucenePlusSort" class="solr.OldLuceneQParserPlugin"/>

*   TemplateUpdateRequestProcessorFactory 名称从 Template更改为 template，AtomicUpdateProcessorFactory 的名称从 Atomic 改为atomic，此外，TemplateUpdateRequestProcessorFactory 现在使用 {} 而不是 $ {} 作为模板。

弃用和删除的功能
--------

### 点字段是默认的数值类型

Solr 全面实现了 * PointField 类型，取代了基于 Trie * 的数字字段。现在所有的 Trie * 字段都被认为是不赞成使用的，并将在 Solr 8 中删除。

如果您在您的模式使用 Trie * 字段，则您应该考虑尽快迁移到 PointFields。更改为新的 PointField 类型将要求您重新索引数据。

### 空间领域

以下与空间相关的字段已被弃用：

*   LatLonType
*   GeoHashField
*   SpatialVectorFieldType
*   SpatialTermQueryPrefixTreeFieldType

改为选择下列字段类型之一：

*   LatLonPointSpatialField
*   SpatialRecursivePrefixTreeField
*   RptWithGeometrySpatialField

有关更多信息，请参阅空间搜索部分。

### JMX 支持和 MBeans

*   solrconfig.xml 中的 <jmx> 元素已被删除， 以支持在 solr 中定义的 <metrics> <reporter> 元素。如果缺少 SolrJmxReporter，并且在找到本地 MBean 服务器时自动添加默认的实例，则会提供有限的向后兼容性。本地 MBean 服务器可以通过 solr.in.sh 中的 ENABLE\_REMOTE\_JMX_OPTS 或者经由系统的性能（例如：Dcom.sun.management.jmxremote）被激活。此默认实例将所有注册表中的所有 Solr 度量标准导出为分层 MBean。还可以通过指定SolrJmxReporter 配置来禁用该行为，该配置使用的布尔型 init 参数设置为 false。对于更加 fine-grained 的控制，用户应明确指定至少一个 SolrJmxReporter配置。另请参阅 <metrics> <reporter> 元素部分，其中介绍了如何设置 Metrics Reporter solr.xml。请注意，后向兼容性支持可能会在 Solr 8 中删除。

*   MBean 名称和属性现在遵循度量中使用的分层名称。这也反映在：/admin/mbeans和/admin/plugins 输出中，并且可以在 UI Plugins 选项卡中观察到，因为现在所有这些 API 都从度量 API 获取其数据。旧的（大部分是平坦的）JMX 视图已被删除。

### SolrJ

SolrJ 进行了以下更改。

*   HttpClientInterceptorPlugin：现在是 HttpClientBuilderPlugin，必须与一个 SolrHttpClientBuilder 一起工作，而不是一个 HttpClientConfigurer。
*   HttpClientUtil：现在允许通过 SolrHttpClientBuilder 配置 HttpClient 实例，而不是通过一个 HttpClientConfigurer。使用 env 变量SOLR\_AUTHENTICATION\_CLIENT\_CONFIGURER 不再有效，请使用 SOLR\_AUTHENTICATION\_CLIENT\_BUILDER。
*   SolrClient：实现现在使用自己的内部配置套接字超时、连接超时并允许重定向，而不是在生成 HttpClient 实例时设置为默认值。在 SolrClient 实例上使用适当的设置器。
*   HttpSolrClient#setAllowCompression 已被移除，必须将压缩作为构造函数参数启用。
*   HttpSolrClient#setDefaultMaxConnectionsPerHost 和 HttpSolrClient#setMaxTotalConnections 已被删除。现在这些默认值非常高，只能在创建HttpClient 实例时通过参数进行更改。

### 其他的弃用和删除

*   模式中的 defaultOperator 参数不再被支持，改用 q.op 参数。这个选项已经被弃用了几个版本。有关更多信息，请参见标准查询解析器参数部分。
*   模式中的 defaultSearchField 参数不再被支持，改用 df 参数。这个选项已经被弃用了几个版本。有关更多信息，请参见标准查询解析器参数部分。
*   mergePolicy、mergeFactor 和 maxMergeDocs 参数已被删除并不再支持。你应该定义一个 mergePolicyFactory。有关更多信息，请参见mergePolicyFactory 部分。
*   PostingsSolrHighlighter 已被弃用。建议您改为使用 UnifiedHighlighter。有关更多信息，请参阅 Unified Highlighter 部分。
*   索引时间提升已经从 Lucene 中删除，并且不再可以从 Solr 获得。如果提供了任何提升，它们将被索引链忽略。作为替代，索引时间评分因子应该在单独的字段中编入索引，并使用函数查询与查询评分相结合。有关更多信息，请参阅函数查询一节。
*   StandardRequestHandler 已被弃用，改为使用 SearchHandler。
*   为了提高集合 API 参数的一致性，MOVEREPLICA 命令和源的参数名称为 fromNode，REPLACENODE 命令中的 target 已被弃用，取而代之的是 sourceNode和 targetNode。旧名称将继续为后向兼容工作，但他们将在 Solr 8 中被删除。
*   未使用的 valType 选项已从 ExternalFileField 中删除，如果在模式中有这个选项，则可以安全地删除它。

早期的 6.x 版本的主要变化
---------------

以下对早期 Solr 6.x 版本中的更改的摘要突出显示了在本指南的早期版本中列出的 Solr 6.0 和 6.6 之间发布的重大更改。如上述各节所述，在 Solr 7 中提到弃用可能会被取消。

请再次注意，这并不是可能影响您的安装的所有更改的完整列表，因此如果从早于 6.6 的任何版本升级，强烈建议您查看 CHANGES.txt。

*   Solr 的贡献：map-reduce、morphlines-core 和 morphlines-cell 已被删除。
*   JSON Facet API 现在使用超级日志记录进行 numBuckets 基数计算，并在将存储区过滤之前计算 mincount 大于1的基数。
*   如果您使用历史日期，特别是 1582 年或之前的日期，则应该重新编制索引，以便更好地处理日期。
*   如果您使用 method=stream 的 JSON Facet API（json.facet），您现在必须设置 sort='index asc' 以获取流式传输行为；否则不会流出。提醒：method 是一个提示，不会改变其他参数的默认值。
*   如果您使用 JSON Facet API（json.facet）来面向数字字段，并且如果您使用 mincount=0 或者如果您设置了前缀，那么现在将出现错误，因为这些选项与数字分面不兼容。
*   Solr 在 INFO 级别的日志记录详细程度已大大降低，您可能需要更新日志配置以使用 DEBUG 级别来查看以前在 INFO 级别上查看的所有日志记录消息。
*   我们不再支持 solr.log 和 solr\_gc.log 文件在日期戳的副本。如果您依赖于 "日志" 文件夹中的 solr\_log_<date> 或 solr\_gc\_log_<date>，将不再是这种情况。有关如何在 Solr 6.3 中进行日志轮换的详细信息，请参阅配置日志记录一节。
*   MiniSolrCloudCluster 中的 create / deleteCollection 方法已被弃用。用户应该使用 CollectionAdminRequest API。此外，MiniSolrCloudCluster#uploadConfigDir(File, String)已被弃用，以支持 #uploadConfigSet(Path, String)。
*   现在，默认情况下，bin/solr.in.sh（Windows 上为 bin/solr.in.cmd）已完全注释。以前，情况并非如此，它具有掩盖现有环境变量的作用。
*   \_version\_ 字段不再被编入索引，现在 indexed=false 默认定义，因为该字段已启用 DocValues。
*   /export 处理程序已被更改，因此它不再返回原始文档中不存在的数值字段的零 (0)。这种改变的一个后果是，你必须知道，如果原始文档中没有任何元组，那么一些元组将没有值。
*   org.apache.solr.util.stats 中与度量相关的类已被删除，转而支持 Dropwizard 度量库。任何使用这些类的自定义插件都应该更改为使用度量库中的等效类。作为其中的一部分，对监督状态 API 的输出进行了以下更改：
    *   “totalTime” 指标已被删除，因为它不再受支持。
    *   监督状态 API 中的度量标准：“75thPctlRequestTime”、“95thPctlRequestTime”、“99thPctlRequestTime” 和 “999thPctlRequestTime” 已被重命名为：“75thPcRequestTime”、“95thPcRequestTime” 等，以与 Solr 的其他部分输出的统计信息保持一致。
    *   “avgRequestsPerMinute”、“5minRateRequestsPerMinute” 和 “15minRateRequestsPerMinute” 的度量标准被相应的每秒速率 viz 替代，“avgRequestsPerSecond”、“5minRateRequestsPerSecond” 和 “15minRateRequestsPerSecond” 与 Solr其他部分输出的统计信息保持一致。
*   新增了 UnifiedHighlighter。建议您通过设置 hl.method=unified 和报告反馈来尝试 UnifiedHighlighter。这将很有效率并且更快。hl.useFastVectorHighlighter现在被认为是代替 hl.method=fastVector。
*   maxWarmingSearchers 参数现在默认为1，而更重要的是，如果超出此限制而不是引发异常 ，现在就会阻止它的提交。因此，在重叠提交中不再存在风险。尽管如此，用户应该继续避免过多的提交。建议用户从其 solrconfig. xml 文件中删除任何预先存在的 maxWarmingSearchers 条目。
*   复杂的短语查询分析器现在支持领先的通配符。注意其可能的沉重程度，鼓励用户在索引时间分析中使用 ReversedWildcardFilter。
*   JMX 度量标准 “avgTimePerRequest”（以及每个处理程序的度量 API 中的相应度量）过去是基于总累计时间和请求数的简单 non-decaying 平均值。Codahale度量标准的实现对这个值应用了指数衰减，这个值在最后5分钟内严重偏离了平均值。
*   并行 SQL 现在使用 Apache Calcite 作为其 SQL 框架。作为此更改的一部分，默认聚合模式已更改为 facet 而不是 map_reduce。对 SQL 聚合响应和一些 SQL语法更改也进行了更改。有关完整的细节，请参阅并行 SQL 接口文档。

# 从Solr5到Solr6的主要变化
在开始迁移您的配置和索引之前，Solr6 中有一些重大的改变需要考虑。

有很多的更改，因此，对 Solr 升级注释部分以及 Solr 实例中的 CHANGES.txt 文件进行彻底的检查将有助于您计划向 Solr6 的迁移。本节将重点介绍您应该注意的一些主要更改。

Solr6 中新特性的亮点
-------------

### Streaming 表达式

在 Solr5 中引入的 Streaming 表达式允许查询 Solr 并将结果作为数据流进行排序和聚合。

Solr6 中添加了几种新的表达式类型：

*   使用类似 MapReduce 的并行表达式来加快 high-cardinality 字段的吞吐量。
*   守护程序表达式以支持持续推送或拉取流。
*   高级并行关系代数，如分布式连接、交集、联合和补充。
*   发布/订阅消息。
*   用于从其他系统中提取数据并与 Solr 索引中的文档联接的 JDBC 连接。

### 并行 SQL 接口

构建在 Streaming 表达式的基础上，Solr6 中的新增功能是一个并行 SQL 接口，可以将 SQL 查询发送到 Solr。SQL 语句被即时编译为 Streaming 表达式，提供可用于 Streaming 表达式请求的全部聚合。包含一个 JDBC 驱动程序，它允许使用 SQL 客户端和数据库可视化工具查询您的 Solr 索引并将数据导入到其他系统。

### 跨数据中心复制

跨数据中心复制现在可以跨数据中心进行复制。使用主动 \- 被动模型，SolrCloud 集群可以被复制到另一个数据中心，并用一个新的 API 进行监控。

### QueryParser 图

一个新的图形查询解析器可以使用 Solr 文档建模的定向（循环）图的遍历查询成为可能。

### DocValues

在 Solr 示例配置集中的大多数非文本字段类型现在默认为使用 DocValues。

需要使用 Java8
----------

Solr6（和 SolrJ 客户端库）的 Java 最低支持版本现在是 Java8。

索引格式更改
------

Solr6 不支持读取 Lucene / Solr 4.x 和更早版本的索引。如果您的索引中仍然有旧的 4x 格式的段，请务必运行 Solr 5.5 附带的 Lucene IndexUpgrader。另外：使用 Solr 5.5 充分优化您的索引，以确保它只包含一个最新的索引段。

托管模式现在是默认的
----------

当 solrconfig.xml 没有明确定义 <schemaFactory/> 的时候，Solr 的默认行为现在依赖于 solrconfig.xml 定义的 luceneMatchVersion。当 luceneMatchVersion < 6.0 时，ClassicIndexSchemaFactory 将继续用于后向兼容，否则将使用 ManagedIndexSchemaFactory 的实例。

这种变化最显著的影响是：

*   现有的 solrconfig.xml 文件被修改为使用 luceneMatchVersion >= 6.0，但没有明确配置 ClassicIndexSchemaFactory，将其 schema.xml 文件自动升级到managed-schema 文件。
*   现在将默认启用通过 Schema API 进行的模式修改。

默认的相似性改变
--------

当 Schema 没有明确地定义全局 <similarity/> 时，Solr 的默认行为将依赖于 solrconfig. xml 中指定的 luceneMatchVersion。当 luceneMatchVersion < 6.0 时，将使用 ClassicSimilarityFactory 的实例，否则将使用 SchemaSimilarityFactory 的实例。最值得注意的是，这种改变意味着用户可以利用每个字段类型的相似性声明，并且需要明确声明 SchemaSimilarityFactory 的全局用法。

无论是明确声明还是作为隐式全局默认值使用，当字段类型不声明明确 <similarity/> 时，SchemaSimilarityFactory 的隐式行为也被更改为依赖于 luceneMatchVersion。当 luceneMatchVersion < 6.0 时，将使用 ClassicSimilarity 的实例，否则将使用 BM25Similarity 的实例。可以在 SchemaSimilarityFactory 声明中指定 defaultSimFromFieldType init 选项来更改此行为。请查看 SchemaSimilarityFactoryjavadocs 了解更多详情

副本和碎片删除命令更改
-----------

DELETESHARD 和 DELETEREPLICA 现在默认为删除任何复制副本的实例目录、数据目录和索引目录。如果希望在使用这些命令时保留磁盘上的所有数据，请查看Collection API 文档以获取有关新请求参数的详细信息。

facet.date.* 参数已删除
------------------

在 Solr3.x 中被弃用的 facet.date 参数（和相关 facet.date.* 参数）已被完全删除。如果您尚未切换到使用等效的 facet.range 功能，则必须在升级之前立即执行此操作。
# 将Solr应用到生产
本节提供有关如何设置 Solr 以在 * nix 平台（如 Ubuntu）的生产中运行的指南。具体来说，我们将介绍在 Linux 主机上运行单个 Solr 实例的过程，然后提供有关如何支持在同一主机上运行的多个 Solr 节点的提示。

服务安装脚本[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#service-installation-script)
------------------------------------------------------------------------------------------------------------

Solr 包含一个服务安装脚本（bin/install\_solr\_service.sh），它可以帮助您在 Linux 上将 Solr 作为服务安装。目前，该脚本仅支持 CentOS、Debian、Red Hat、SUSE 和 Ubuntu Linux 发行版。在运行脚本之前，您需要确定一些关于您的设置的参数。具体而言，您需要决定 Solr 的安装位置以及哪些系统用户应该是 Solr 文件和进程的所有者。

### 规划目录结构[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#planning-your-directory-structure)

我们建议从 Solr 发行包中包含的文件中分离出实时的 Solr 文件，如日志和索引文件，因为这样可以更容易地升级 Solr，系统管理员认为这是一种很好的做法。

#### Solr 安装目录[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#solr-installation-directory)

默认情况下，服务安装脚本将提取分发档案到：/opt。当您运行安装脚本时，可以使用 -i 选项更改此位置。该脚本还会创建一个指向 Solr 的版本化目录的符号链接。例如，如果您为 Solr 7.0.0 运行安装脚本，则将使用以下目录结构：

    /opt/solr-7.0.0
    /opt/solr -> /opt/solr-7.0.0

使用符号链接可以使任何脚本不依赖于特定的 Solr 版本。如果您需要升级到更高版本的 Solr，则可以更新符号链接以指向升级版本的 Solr。我们将使用 /opt/solr 在本页的其余部分中引用 Solr 安装目录。

#### 可写文件的独立目录[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#separate-directory-for-writable-files)

您还应该将可写的 Solr 文件分隔到不同的目录中；默认情况下，安装脚本使用：/var/solr，但您可以使用 -d 选项覆盖此位置。采用这种方法，在 /opt/solr 中的文件将保持不变，并且所有在 Solr 运行时更改的文件都将处于 /var/solr 下面。

### 创建 Solr 用户

出于安全考虑，建议不要以 root 身份运行 Solr，并且 "控制脚本启动" 命令将拒绝这样做。因此，您应该确定将拥有所有 Solr 文件和正在运行的 Solr 进程的系统用户的用户名。默认情况下，安装脚本将创建 solr 用户，但您可以使用 -u 选项覆盖此设置。如果您的组织对创建新的用户帐户有特定的要求，那么您应该在运行脚本之前创建用户。安装脚本将使 Solr 用户成为 /opt/solr和/var/solr 目录的所有者。

现在，您可以运行安装脚本了。

### 运行 Solr 安装脚本[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#run-the-solr-installation-script)

要运行该脚本，您需要下载最新的 Solr 分发归档文件，然后执行以下操作：

    tar xzf solr-7.0.0.tgz solr-7.0.0/bin/install_solr_service.sh --strip-components=2

前面的命令 install\_solr\_service.sh 将档案中的脚本提取到当前目录中。如果在 Red Hat 上安装，请确保在运行 Solr 安装脚本之前安装了 lsof（sudo yum install lsof）。安装脚本必须以 root 身份运行：

    sudo bash ./install_solr_service.sh solr-7.0.0.tgz

默认情况下，该脚本将分发归档文件提取到 /opt，配置 Solr 将文件写入 /var/solr，并以 solr 用户身份运行 Solr 。因此，下面的命令产生与上一个命令相同的结果：

    sudo bash ./install_solr_service.sh solr-7.0.0.tgz -i /opt -d /var/solr -u solr -s solr -p 8983

您可以使用传递给安装脚本的选项自定义服务名称、安装目录、端口和所有者。要查看可用选项，请执行以下操作：

    sudo bash ./install_solr_service.sh -help

脚本完成后，Solr 将作为服务安装并在服务器的后台运行（在端口 8983 上）。为了验证，您可以这样做：

    sudo service solr status

如果您不想立即启动服务，请传递 -n 选项。然后，您可以稍后手动启动服务，例如在完成配置设置之后。

我们将介绍一些您可以进行的其他配置设置，以便稍后微调您的 Solr 设置。在继续之前，让我们仔细看一下安装脚本执行的步骤。这样可以帮助您更好地了解并阅读本指南中的其他页面，帮助您了解有关 Solr 安装的重要细节：例如当一个页面提到 Solr 主页时，您就会知道系统中的具体位置。

#### Solr 主目录

Solr 主目录（不要与 Solr 安装目录混淆）是 Solr 使用索引文件管理核心目录的地方。默认情况下，安装脚本使用：/var/solr/data。如果在安装脚本中使用 -d 选项，则这将更改为给定 -d 选项的位置中的 data 子目录。请花些时间检查系统上的 Solr 主目录的内容。如果您没有在 ZooKeeper 中存储 solr.xml，则主目录必须包含一个 solr.xml 文件。当 Solr 启动时，Solr 控制脚本将使用`-Dsolr.solr.home=…​`系统属性传递主目录的位置。

#### 环境重写包含文件[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#environment-overrides-include-file)

服务安装脚本将创建一个特定于环境的包含文件，该文件将重写 bin/solr 脚本所使用的默认值。使用包含文件的主要优点是它提供了一个单一的位置，在这个位置上定义了所有特定于环境的重写。请花点时间检查 /etc/default/solr.in.sh 文件的内容，这是安装脚本设置的默认路径。如果您在安装脚本中使用 -s 选项更改服务的名称，则文件名的第一部分将会不同。对于名为 solr-demo 的服务，该文件将被命名为 /etc/default/solr-demo.in.sh。有很多设置可以用这个文件重写。但是，这个脚本至少需要定义 SOLR\_PID\_DIR 和 SOLR_HOME 变量，比如：

    SOLR_PID_DIR=/var/solr
    SOLR_HOME=/var/solr/data

该 SOLR\_PID\_DIR 变量设置控制脚本将写入包含 Solr 服务器进程 ID 的文件的目录。

#### 日志设置[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#log-settings)

Solr 使用 Apache Log4J 进行日志记录。安装脚本复制 /opt/solr/server/resources/log4j.properties 到 /var/solr/log4j.properties。请花一点时间通过在 /etc/default/solr.in.sh 中检查以下设置以验证 Solr 包含文件是否配置为将日志发送到正确的位置：

    LOG4J_PROPS=/var/solr/log4j.properties
    SOLR_LOGS_DIR=/var/solr/logs

有关 Log4J 配置的详细信息，请参阅: 配置日志记录。

#### init.d 脚本[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#init-d-script)

在 Linux 上运行 Solr 等服务时，通常需要设置 init.d 脚本，以便系统管理员可以使用服务工具来控制 Solr，例如：service solr start。安装脚本创建一个非常基本的init.d 脚本来帮助您入门。请花点时间检查 /etc/init.d/solr 文件，这是安装脚本设置的默认脚本名称。如果在安装脚本中使用 -s 选项更改服务的名称，则文件名将会不同。请注意，根据传递给安装脚本的参数为您的环境设置了以下变量：

    SOLR_INSTALL_DIR=/opt/solr
    SOLR_ENV=/etc/default/solr.in.sh
    RUNAS=solr

SOLR\_INSTALL\_DIR 和 SOLR_ENV 变量应该是不言而喻的。该 RUNAS 变量设置 Solr 进程的所有者，例如 solr；如果不设置此值，脚本将以 root 身份运行 Solr ，这是不建议用于生产的。您可以以 root 身份使用 /etc/init.d/solr 脚本来启动 Solr，执行以下操作：

    service solr start

该 /etc/init.d/solr 脚本还支持停止、重新启动和状态命令。请记住，Solr 附带的初始化脚本非常基本，旨在向您展示如何将 Solr 设置为服务。但是，使用更高级的工具（如 supervisord 或 upstart）来控制 Solr 作为 Linux 上的服务也很常见。在展示如何将 Solr 与 supervisord 等工具整合在一起超出本指南的范围时，init.d/solr脚本应该提供足够的指导来帮助您入门。而且，安装脚本将 Solr 服务设置为在主机初始化时自动启动。

### 进度检查[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#progress-check)

在下一节中，我们将介绍一些其他的环境设置，以帮助您微调您的生产设置。但是，在我们继续之前，让我们回顾一下迄今为止取得的成就。具体来说，你应该能够使用 /etc/init.d/solr 控制 Solr。请验证以下命令是否与您的安装程序一起使用：

    sudo service solr restart
    sudo service solr status

status 命令应该提供一些关于正在运行的 Solr 节点的基本信息，如：

    Solr process PID running on port 8983
    {
      "version":"5.0.0 - ubuntu - 2014-12-17 19:36:58",
      "startTime":"2014-12-19T19:25:46.853Z",
      "uptime":"0 days, 0 hours, 0 minutes, 8 seconds",
      "memory":"85.4 MB (%17.4) of 490.7 MB"}

如果该 status 命令不成功，请在 /var/solr/logs/solr.log 中查找错误消息。

微调您的生产设置[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#fine-tune-your-production-setup)
------------------------------------------------------------------------------------------------------------------

### 内存和 GC 设置

默认情况下，bin/solr 脚本将最大 Java 堆大小设置为 512M（-Xmx512m），这对于 Solr 入门是很好的。对于生产，您将希望根据您的搜索应用程序的内存需求增加最大堆大小；对于生产服务器，10 到 20 千兆字节的值并不少见。当您需要更改 Solr 服务器的内存设置时，请使用 SOLR\_JAVA\_MEM 包含文件中的变量，例如：

    SOLR_JAVA_MEM="-Xms10g -Xmx10g"

此外，Solr 控制脚本还附带一组预先配置的 Java 垃圾收集设置，这些设置对于许多不同的工作负载都显示出与 Solr 的良好配合。但是，这些设置可能不适用于您对Solr 的具体使用。因此，您可能需要更改 GC 设置，这也应该使用 /etc/default/solr.in.sh 包含文件中的 GC_TUNE 变量来完成。有关调整内存和垃圾收集设置的更多信息，请参阅：JVM 设置。

#### 内存关闭挂钩[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#out-of-memory-shutdown-hook)

bin/solr 脚本注册的 bin/oom\_solr.sh 脚本将被 JVM 调用，如果出现一个 OutOfMemoryError。该 oom\_solr.sh 脚本将向 kill -9Solr 进程发出一个经验OutOfMemoryError。在 SolrCloud 模式下运行时建议使用此行为，以便立即通知 ZooKeeper 某个节点遇到不可恢复的错误。请花点时间检查 /opt/solr/bin/oom_solr.sh 脚本的内容，以便熟悉脚本如果由 JVM 调用时将执行的操作。

### 使用 SolrCloud 进行生产[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#going-to-production-with-solrcloud)

要以 SolrCloud 模式运行 Solr，您需要在包含文件中设置 ZK_HOST 变量，以指向您的 ZooKeeper 集合。在生产环境中不支持运行嵌入式 ZooKeeper。例如，如果您在默认客户端端口 2181（zk1，zk2 和 zk3）上的以下三台主机上托管 ZooKeeper 集成，则可以设置：

    ZK_HOST=zk1,zk2,zk3

当 ZK_HOST 变量被设置时，Solr 将以“cloud”模式启动。

#### ZooKeeper chroot

如果您使用的是其他系统共享的 ZooKeeper 实例，建议使用 ZooKeeper 的 chroot 支持来隔离 SolrCloud znode 树。例如，要确保 SolrCloud 创建的所有 znode都存储在 /solr 下面，您可以在 ZK_HOST 连接字符串的末尾放置 /solr，例如：

    ZK_HOST=zk1,zk2,zk3/solr

首次使用 chroot 之前，您需要使用 Solr 控制脚本在 ZooKeeper 中创建根路径（znode）。我们可以使用 mkroot命令：

    bin/solr zk mkroot /solr -z <ZK_node>:<ZK_PORT>

     Tip：你还想用现有的 solr_home 引导 ZooKeeper，你可以改为使用 zkcli.sh 或zkcli.bat bootstrap命令，如果它不存在，也会创建 chroot 路径。有关更多信息，请参阅命令行实用程序。

### Solr 主机名[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#solr-hostname)

使用 SOLR_HOST 包含文件中的变量来设置 Solr 服务器的主机名。

    SOLR_HOST=solr1.example.com

建议设置 Solr 服务器的主机名，尤其是在 SolrCloud 模式下运行时，因为这决定了在向 ZooKeeper 注册时节点的地址。

### 重写 solrconfig.xml 中的设置

Solr 允许使用 -Dproperty=value 语法在启动时传递的 Java 系统属性重写配置属性。例如，在 solrconfig.xml 中，默认的 "自动软提交" 设置被设置为：

    <autoSoftCommit>
      <maxTime>${solr.autoSoftCommit.maxTime:-1}</maxTime>
    </autoSoftCommit>

一般来说，无论何时在使用 ${solr.PROPERTY:DEFAULT_VALUE} 语法的 Solr 配置文件中看到一个属性，都可以使用 Java 系统属性重写它。例如，要将 soft-commits 的 maxTime 设置为10秒，则可以使用以下命令启动 Solr -Dsolr.autoSoftCommit.maxTime=10000，例如：

    bin/solr start -Dsolr.autoSoftCommit.maxTime=10000

该 bin/solr 脚本只是在启动时将以 -D 开头的选项传递给 JVM。为了在生产环境中运行，我们建议在 include 文件中定义 SOLR_OPTS 的变量中设置这些属性。按照我们的 soft-commit 例子，在 /etc/default/solr.in.sh 中，你可以这样做：

    SOLR_OPTS="$SOLR_OPTS -Dsolr.autoSoftCommit.maxTime=10000"

每个主机运行多个Solr节点[](http://lucene.apache.org/solr/guide/7_0/taking-solr-to-production.html#running-multiple-solr-nodes-per-host)
-----------------------------------------------------------------------------------------------------------------------------

该 bin/solr 脚本能够在一台机器上运行多个实例，但对于典型的安装，这不是推荐的设置。每个额外的实例都需要额外的 CPU 和内存资源。单个实例可以很容易地处理多个索引。

    Tip：何时忽略该建议？
    对于每个建议，都有例外。对于上面的建议，该异常在讨论极限可伸缩性时主要适用。在一台主机上运行多个 Solr 节点的最佳原因是减少了对非常大的堆的需求。
    当 Java 堆变得非常大时，即使启动脚本默认提供了 GC 调整，也可能导致非常长的垃圾回收暂停。堆被认为是“非常大”的确切点将取决于如何使用 Solr。这意味着没有可作为阈值的硬数字，但是如果你的堆达到了16到32千兆字节的邻域，那么可能是考虑拆分节点的时候了。理想情况下，这将意味着更多的机器，但预算的限制可能会使这一切不可能。
    一旦堆达到32GB，还有另外一个问题。在32GB以下，Java 能够使用压缩的指针，但是在那之上，需要更大的指针，它使用更多的内存并且减慢了 JVM 的速度。
    由于潜在的垃圾收集问题以及在32GB时发生的特定问题，如果单个实例需要64GB的堆，那么如果机器设置了两个节点，每个节点的堆大小为31GB，则性能可能会大大提高。

如果您的用例需要多个实例，则至少您需要为要运行的每个节点分配独特的 Solr 主目录；理想情况下，每个主页都应位于不同的物理磁盘上，以便多个 Solr 节点在访问磁盘上的文件时不必相互竞争。拥有不同的 Solr 主目录意味着每个节点都需要一个不同的包含文件。而且，如果使用`/etc/init.d/solr`脚本来控制 Solr 作为服务，那么每个节点都需要单独的脚本。最简单的方法是使用服务安装脚本在同一主机上添加多个服务，例如：

    sudo bash ./install_solr_service.sh solr-7.0.0.tgz -s solr2 -p 8984

上面显示的命令将 solr2 在端口 8984 上添加一个名为 running 的服务，使用 /var/solr2 可写（即“live”）文件；第二台服务器将仍然由 solr 用户拥有并运行，并将使用 /opt 其中的 Solr 分发文件。安装 solr2 服务之后，通过执行以下操作验证它是否正常工作：

    sudo service solr2 restart
    sudo service solr2 status
# 升级Solr集群
本页介绍如何升级使用服务安装脚本安装的现有 Solr 集群。

    Tip：该页面上列出的步骤假定您使用默认的服务名称 solr。如果您使用备用服务名称或 Solr 安装目录，则下面提到的一些路径和命令将必须相应地进行修改。

规划升级
----

以下是在开始升级过程之前需要准备的事项清单：

1.  检查 [Solr 版本升级说明](https://www.w3cschool.cn/solr_doc/solr_doc-us1r2fp5.html)以确定 Solr 新版本中是否有任何行为改变会影响您的安装。
2.  如果不使用复制（即 replicationFactor 小于1的集合），则应对每个集合进行备份。如果您的所有集合都使用复制，则在技术上不需要进行备份，因为您将逐个升级和验证每个节点。
3.  确定哪个 Solr 节点当前在 SolrCloud 中托管 Overseer leader 进程，因为您应该最后升级该节点。要确定监督，使用监督状态 API，请参阅：集合 API。
4.  如果可能，计划在系统维护时段内执行升级。您将会对集群（每个节点，一个接一个）执行滚动重新启动，但是我们仍然建议在系统使用率最小的时候进行升级。
5.  验证集群当前是否正常并且所有副本都处于活动状态，因为您不应该在降级的群集上执行升级。
6.  根据新的 Solr JAR 文件重新生成并测试所有自定义的服务器端组件。
7.  确定 Solr 控制脚本使用的以下变量的值：
    *   ZK_HOST：您当前的 SolrCloud 节点用于连接到 ZooKeeper 的 ZooKeeper 连接字符串；该值对于集群中的所有节点将是相同的。
    *   SOLR_HOST：每个 Solr 节点在加入 SolrCloud 集群时用于注册 ZooKeeper 的主机名；此值将用于在启动新的 Solr 进程时设置主机 Java系统属性。
    *   SOLR_PORT：每个 Solr 节点正在监听的端口，如 8983。
    *   SOLR_HOME：每个 Solr 节点的 Solr 主目录的绝对路径；这个目录必须包含一个 solr.xml 文件。该值将使用 solr.solr.home 系统属性传递给新的 Solr 进程。如果您是从 Solr 5.x 或更高版本的安装中进行升级，则这些值通常可以在任何 /var/solr/solr.in.sh 或 /etc/default/solr.in.sh 中发现。

您现在应该准备升级您的集群。在进行生产之前，请在测试或暂存集群中验证此过程。

升级过程[](http://lucene.apache.org/solr/guide/7_0/upgrading-a-solr-cluster.html#upgrade-process)
---------------------------------------------------------------------------------------------

我们建议的方法是逐个升级每个 Solr 节点。换句话说，您需要停止节点，将其升级到新版本的 Solr，并在移动到下一个节点之前重新启动它。这意味着在很短的时间内，将在您的集群中运行“旧 Solr”和“新 Solr”节点。我们还假设您将把新的 Solr 节点指向您现有的 Solr 主目录，在这个目录下为节点上的每个集合管理 Lucene 索引文件。这意味着你将不需要移动任何索引文件来执行升级。

### 步骤1：停止 Solr[](http://lucene.apache.org/solr/guide/7_0/upgrading-a-solr-cluster.html#step-1-stop-solr)

从停止要升级的 Solr 节点开始。在停止节点之后，如果使用复制（即，具有 replicationFactor 小于1的集合），则验证在关闭节点上托管的所有领导者是否已经成功迁移到其他副本；您可以通过访问 Solr 管理界面中的云面板来完成此操作。如果不使用复制，那么在关闭的节点上承载的碎片的任何集合将暂时脱机。

### 步骤2：将 Solr 作为服务安装

请按照说明将 Solr 作为服务安装在 Linux 上，记录在 Taking Solr to Production。使用该 -n 参数可避免安装程序脚本自动启动 Solr。您需要更新 /etc/default/solr.in.sh，它包含在下一步中完成升级过程的文件。

    Tip：如果您有一个/var/solr/solr.in.sh用于现有 Solr 安装的文件，则运行该install_solr_service.sh脚本会将该文件移动到新的位置：/etc/default/solr.in.sh。                     

### 步骤3：设置环境变量覆盖

用文本编辑器打开 /etc/default/solr.in.sh，并验证以下变量设置是否正确，或根据需要将它们添加到包含文件的底部：

    ZK_HOST=SOLR_HOST=SOLR_PORT=SOLR_HOME=

确保您计划拥有 Solr 进程的用户是该 SOLR\_HOME 目录的所有者。举例来说，如果您计划将 Solr 作为 “Solr” 用户并且 SOLR\_HOME 作为 /var/solr/data，那么您需要：

    sudo chown -R solr: /var/solr/data

### 步骤4：启动 Solr[](http://lucene.apache.org/solr/guide/7_0/upgrading-a-solr-cluster.html#step-4-start-solr)

您现在准备通过执行以下操作来启动升级后的 Solr 节点：sudo service solr start。升级后的实例将加入现有集群，因为你使用的 SOLR\_HOME、SOLR\_PORT 以及SOLR_HOST 是由旧的 Solr 节点使用的设置；因此，新的服务器将看起来像旧节点到正在运行的集群。确保查看 /var/solr/logs/solr.log 在启动过程中记录的错误。

### 步骤5：运行 Healthcheck[](http://lucene.apache.org/solr/guide/7_0/upgrading-a-solr-cluster.html#step-5-run-healthcheck)

在继续升级群集中的下一个节点之前，应该对已升级的节点上承载的所有集合运行 Solr healthcheck 命令。例如，如果新升级的节点承载 MyDocuments 集合的副本，则可以运行以下命令（将 ZK_HOST 替换为 ZooKeeper 连接字符串）：

    /opt/solr/bin/solr healthcheck -c MyDocuments -z ZK_HOST

查找有关该集合的任何副本的任何报告问题。

最后，对集群中的所有节点重复步骤1-5。
# IndexUpgrader工具
Lucene 发行版包含一个 IndexUpgrader 工具，它可以将以前 Lucene 版本的索引升级到当前的文件格式。

该工具可以从命令行使用，也可以在 Java 中实例化和执行。

在 Solr 发行版中，Lucene 文件位于 ./server/solr-webapp/webapp/WEB-INF/lib。运行该工具时，需要在类路径中包含 lucene-core-<version>.jar 和 lucene-backwards-codecs-<version>.jar。

    java -cp lucene-core-6.0.0.jar:lucene-backward-codecs-6.0.0.jar org.apache.lucene.index.IndexUpgrader [-delete-prior-commits] [-verbose] /path/to/index

这个工具只保留索引中的最后一个 commit。由于这个原因，如果传入的索引有多个提交，工具默认拒绝运行。指定 -delete-prior-commits 以重写此操作，允许该工具删除除了最后一个提交之外的所有操作。

升级大型索引可能需要很长时间。作为一个经验法则，升级过程大约是每分钟1GB。

    注意：如果索引在执行之前部分升级（例如添加了文档），则该工具可能会对文档重新排序。如果您的应用程序依赖于文档 ID 的单调性(这意味着文档将被添加到索引中的顺序被保留)，那么请改为使用完整的 forceMerge。

    
