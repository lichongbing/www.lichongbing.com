---
title: solr参考指南（使用Solr管理用户界面）
abbrlink: 33880
date: 2019-12-25 21:47:31
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
# 使用Solr管理用户界面
本章节讨论 Solr 管理用户界面（“管理 UI”）。

Solr 的管理用户界面的概述解释了用户界面的基本特征，什么是初始管理 UI 页面，以及如何在接口上配置。另外，还有一些页面描述了管理界面的每个界面：

*   获取帮助：向您展示如何获取有关 UI 的更多信息。
*   记录：显示由此 Solr 节点记录的最新消息，并提供了一种更改特定类的日志记录级别的方法。
*   Cloud 屏幕：以 SolrCloud 模式运行时，Cloud 屏幕显示有关节点的信息。
*   集合/核心管理员解释如何获取有关每个核心的管理信息。
*   Java Properties：显示有关每个核心的 Java 信息。
*   线程转储：让您可以查看有关每个线程的详细信息以及状态信息。
*   特定于集合的工具：是解释每个集合可用的其他屏幕的部分。
    *   分析（Analysis）- 让您分析在特定字段中找到的数据。
    *   导入（Dataimport）- 显示有关数据导入处理程序的当前状态的信息。
    *   文档（Documents）- 提供了一个简单的表单，允许您直接从浏览器执行各种 Solr 索引命令。
    *   文件（Files）- 显示当前的核心配置文件，如 solrconfig.xml。
    *   查询（Query ）- 让您提交关于核心的各种元素的结构化查询。
    *   流（Stream）- 允许您提交流表达式并查看结果和解析解释。
    *   架构浏览器（Schema Browser）- 在浏览器窗口中显示架构数据。
*   特定于核心的工具：是说明每个指定核心可用的额外屏幕的部分。
    *   Ping - 让你 ping 一个已命名的核心，并确定核心是否处于活动状态。
    *   插件/统计（Plugins/Stats）- 显示插件和其他已安装的组件的统计信息。
    *   复制（Replication）- 显示核心的当前复制状态，并允许您启用/禁用复制。
    *   段信息（Segments Info）- 提供底层 Lucene 索引段的可视化。

# Solr管理界面概述
Solr 具有一个 Web 界面，它使 Solr 管理员和程序员可以轻松查看 Solr 配置的详细信息、运行查询和分析文档字段，以便微调（ fine-tune）Solr 配置并访问联机文档和其他帮助。

![Solr管理界面](https://atts.w3cschool.cn/attachments/image/20171108/1510129363520877.png)

访问 URL http://hostname:8983/solr/ 将显示 Solr 主仪表板，它分为两部分。

屏幕的左侧是 Solr 徽标下的菜单，它通过 UI 的屏幕提供导航。第一组链接用于系统级别的信息和配置，并提供对 日志记录、集合/核心管理和 Java 属性等的访问。在这个信息的末尾至少有一个下拉列表为这个实例配置了 Solr 核心。在 SolrCloud 节点上，附加的下拉列表显示了此群集中的所有集合。单击集合或核心名称将显示指定集合或核心的二级信息菜单，如模式浏览器、配置文件、插件和统计信息以及对索引数据执行查询的功能。

屏幕的中心显示所选选项的详细信息。这可能包括选项的子导航或所请求的数据的文本或图形表示。有关更多详细信息，请参阅本指南中有关每个屏幕的部分。

在封面之下，Solr 管理用户界面重新使用相同的 HTTP APIs，它可供所有客户访问与 Solr 相关的数据来驱动一个外部接口。

    Tip：上面给出的 Solr 管理用户界面的路径是：http://hostname:port/solr，它重定向到当前版本中的路径：http://hostname:port/solr/#/。还支持方便的重定向，因此只需访问管理界面：http://hostname:port/ 也将重定向到：http://hostname:port/solr/#/。
# 从Solr管理界面获取帮助
在 Solr 的用户管理界面（Admin UI）中每个屏幕的底部是都一组链接，您可以通过使用这些链接来获取有关配置和使用 Solr 获得更多的帮助。

![Solr管理界面帮助图标](https://atts.w3cschool.cn/attachments/image/20171109/1510198861759066.png)


Solr 用户管理界面的帮助图标包含以下链接：


| 链接 | 描述 |
| ---| ---|
| 文档 | 该链接能够导航到在 [https://lucene.apache.org/solr/](https://lucene.apache.org/solr/) 上托管的 Apache Solr 文档。 |
| 问题跟踪器 | 该链接能够导航到 Apache Solr 项目的 JIRA 问题跟踪服务器。该服务器位于：[https://issues.apache.org/jira/browse/SOLR](https://issues.apache.org/jira/browse/SOLR)。 |
| IRC 频道 | 该链接能够导航到 Solr 的 [IRC](http://en.wikipedia.org/wiki/Internet_Relay_Chat) 实时聊天室：http://webchat.freenode.net/?channels=#solr。 |
| 社区论坛 | 该链接能够导航到 Apache Wiki 页面，该页面提供了有关如何参与 Solr 用户社区邮件列表的更多信息：https://wiki.apache.org/solr/UsingMailingLists。 |
| Solr 查询语法 | 该链接能够导航到本“参考指南”中的查询语法和分析部分。 |

这些链接不能在不编辑 server/solr/solr-webapp 目录中（包含在管理界面）的 index.html 的情况下进行修改。

# Solr日志记录
在日志记录页面显示此 Solr 节点记录的最近消息。

当您单击 "日志记录" 的链接时，将显示一个类似于下面的页面：

![Solr日志记录页面](https://atts.w3cschool.cn/attachments/image/20171109/1510199647643943.png)

在上述的 Solr 日志记录界面中，包含了由客户端发送的错误文档导致的错误示例。

虽然本示例仅显示一个核心的记录消息，但如果您在单个实例中有多个核心，则它们将分别列出每个核心的级别。

Solr 选择记录级别[](http://lucene.apache.org/solr/guide/7_0/logging.html#selecting-a-logging-level)
---------------------------------------------------------------------------------------------

当您选择左侧的 "级别" 链接时，您会看到您的实例的类路径和类名的层次结构。以黄色突出显示的行表示该类具有日志记录功能。点击突出显示的行，将出现一个菜单，允许您更改该类的日志级别。粗体中的字符表示该类不会受根级别更改的影响。

![Solr日志记录级别选择](https://atts.w3cschool.cn/attachments/image/20171109/1510199852203024.png)

有关各种日志记录级别的说明，请参阅配置日志记录。
# Cloud界面
在 SolrCloud 模式下运行时，“Cloud” 选项将会出现在 Logging 和 Collections / Core Admin之间的管理界面。

此 “Cloud” 界面提供了有关集群中每个集合和节点的状态信息，以及对存储在 ZooKeeper 中的低级别数据的访问。

    Tip：Cloud 界面只有在使用 SolrCloud 时才是可见的： “Cloud” 菜单选项仅在以 SolrCloud 模式运行的 Solr 实例上可用。Solr 的单节点或主/从复制实例不会显示此选项

点击左侧导航栏中的 Cloud 选项，会出现一个小的子菜单，其中有 “Tree”、“Graph”、“Graph（Radial）” 和 “Dump” 选项。默认视图（“Graph”）显示每个集合的图形、组成这些集合的分片以及每个分片的每个副本的地址。

此示例显示使用 bin/solr -e cloud -noprompt 示例命令创建的非常简单的双节点群集。除了2个碎片、2个副本 “gettingstarted” 集合之外，还有一个额外的 “films” 集合，由单个碎片/副本组成：

![Cloud界面](https://atts.w3cschool.cn/attachments/image/20171109/1510207216932368.png)

“Graph（Radial）” 选项为每个节点提供了不同的可视视图。使用相同的示例集群，径向图形视图如下所示：

![Cloud界面](https://atts.w3cschool.cn/attachments/image/20171109/1510207242386832.png)

“Tree” 选项显示了 ZooKeeper 中数据的目录结构，包括关于 live_nodes 和 overseer 状态的集群信息，以及 state.json、当前分片前导集和所使用的配置文件等的集合特定信息。在这个例子中，我们看到为 “films” 集合定义的 state.json 文件：

![Cloud界面](https://atts.w3cschool.cn/attachments/image/20171109/1510207268447263.png)

最后的选项是 “Dump”，它返回一个包含所有节点、它们的内容和子节点（递归）的 JSON 文档。这可以用来导出 Solr 保存在 ZooKeeper 中的所有数据的快照，并且可以帮助调试 SolrCloud 问题。
# Java属性界面
“Java 属性”屏幕可以轻松访问最高性能的 Solr 系统中最重要的组件之一。使用 Java 属性屏幕，您可以看到运行 Solr 的 JVM 的所有属性，包括类路径、文件编码、JVM内存设置、操作系统等等。

![Java属性界面](https://atts.w3cschool.cn/attachments/image/20171109/1510209150240927.png)
# Solr线程转储
Solr 的线程转储界面允许您检查服务器上当前活动的线程。

它将列出每个线程，并在适用的情况下访问堆栈跟踪（stacktraces）。在该线程界面中，左边的图标表示线程的状态：例如，绿色圆圈中带有绿色复选标记的线程处于 “RUNNABLE（可运行）” 状态。在线程名称的右侧，向下箭头表示您可以展开以查看该线程的堆栈跟踪。

![Solr线程列表](https://atts.w3cschool.cn/attachments/image/20171109/1510209648816880.png)

当您将光标移到线程名称上时，一个框将浮动在该线程的状态名称上。线程状态可以是：



状态

含义

NEW

尚未开始的线程

RUNNABLE

在 Java 虚拟机中执行的线程

BLOCKED

被阻塞的线程正在等待显示器锁定

WAITING

无限期等待另一个线程执行特定操作的线程

TIMED_WAITING

正在等待另一个线程执行一个由指定的等待时间完成的操作的线程

TERMINATED

已退出的线程

当你点击一个可以扩展的线程时，你会看到堆栈跟踪，如下面的示例所示：

![Solr检查线程](https://atts.w3cschool.cn/attachments/image/20171109/1510210006390799.png)

您还可以选中 "显示所有 Stacktraces（Show all Stacktraces）" 按钮以自动启用所有线程的扩展。
# Solr特定于集合的工具
在 Solr 的左侧导航栏中，您将看到一个名为“集合选择器”的下拉菜单，可用于访问集合特定的管理界面。

只有使用 SolrCloud 时才可见：“集合选择器”（Collection Selector）下拉菜单仅适用于以 SolrCloud 模式运行的 Solr 实例。Solr 的单节点或主/从复制实例将不会显示此菜单，而是在 Core Selector（核心选择器）下拉菜单中提供本节中介绍的 Collection 专用 UI 页面。

单击“集合选择器”下拉菜单将显示 Solr 集群中的集合列表，其中包含可用于按名称查找特定集合的搜索框。当您从下拉列表中选择一个集合时，该页面的主要显示将显示关于该集合的一些基本元数据，而在左侧导航栏中将显示一个二级菜单项，其中包含指向其他集合特定管理屏幕的链接。

![Solr集合界面](https://atts.w3cschool.cn/attachments/image/20171109/1510210833916471.png)

下面列出了特定于集合的 UI 界面，并链接到该指南的部分以了解更多信息：

*   [分析界面](https://www.w3cschool.cn/solr_doc/solr_doc-tc482fwu.html) \- 让您分析在特定字段中发现的数据。
*   Dataimport - 向您显示有关数据导入处理程序当前状态的信息。
*   [文档界面](https://www.w3cschool.cn/solr_doc/solr_doc-mco12fwz.html) \- 提供了一个简单的表单，允许您直接从浏览器执行各种 Solr 索引命令。
*   文件 \- 显示当前的核心配置文件，如 solrconfig.xml。
*   [查询界面](https://www.w3cschool.cn/solr_doc/solr_doc-kcas2fx9.html) \- 让您提交关于核心的各种元素的结构化查询。
*   流 \- 允许您提交流表达式并查看结果和解析解释。
*   模式浏览器 \- 在浏览器窗口中显示模式数据。
# Solr分析界面
通过 Solr 的“分析”界面，您可以根据模式中的字段、字段类型和动态字段配置来检查数据的处理方式。您可以分析在索引期间或在查询处理过程中如何处理内容，以及如何单独或同时查看结果。理想情况下，您需要一致地处理内容，并且此屏幕允许您验证字段类型或字段分析链中的设置。

在屏幕顶部的一个或两个框中输入内容，然后选择用于分析的字段或字段类型定义。

![analysis_normal](https://atts.w3cschool.cn/attachments/image/20171109/1510211496986072.png)

如果单击 “详细输出” 复选框，则您会看到更多信息，其中包括有关输入转换的更多详细信息（例如：转换为小写字母，带额外字符等），其中包括每个阶段的原始字节、类型和详细的位置信息。显示的信息将根据字段或字段类型的设置而变化。该过程的每个步骤都显示在一个单独的部分中，包含了应用在步骤中的标记器或过滤器的缩写。悬停或单击缩写，您将看到标记器或过滤器的名称和路径。

![analysis_verbose](https://atts.w3cschool.cn/attachments/image/20171109/1510211793153083.png)

在上面的示例截图中，将几个转换应用于输入“Running is a sport”。“is” 和 “a” 这两个词已经被删除，“running” 这个词已更改为其基本形式 "run"。这是因为我们在这个场景中使用了字段类型 text_en，它被配置为删除停止单词（通常不提供大量上下文的小单词）和 "stem" 条件（如果可能的话）以找到更多可能的匹配（这是特别的有助于复数形式的单词）。如果单击“分析字段名称/字段类型（Analyze Fieldname/Field Type）”下拉菜单旁边的问号，将会打开 "模式浏览器" 窗口，显示指定字段的设置。

“理解分析器（ Understanding Analyzers）”，“标记器（Tokenizers）” 和 “过滤器（Filters）”章节详细描述了每个选项的内容以及它如何转换您的数据以及“运行您的分析程序（ Running Your Analyzer ）”部分有特定的示例来使用分析界面。
# Solr文档界面
文档界面提供了一个简单的表单，允许您直接从浏览器以各种格式执行各种 Solr 索引命令。

![Solr文档界面](https://atts.w3cschool.cn/attachments/image/20171109/1510212466883330.png)

Solr 文档界面允许您：

*   以 JSON、CSV 或 XML 格式复制文档并将其提交给索引；
*   上传文件（使用 JSON、CSV 或 XML 格式）
*   通过选择字段和字段值来构建文档

还有一些其他的方法来加载数据，您可以参考下列章节：

*   使用索引处理程序上传数据

*   使用 Apache Tika 上传 Solr Cell 数据


第一步是定义 RequestHandler 以使用（aka，qt）。默认情况下 /update 会被定义。例如，要使用 Solr Cell，请将请求处理程序更改为 /update/extract。

然后选择“文档类型”来定义要加载的文档的类型。其余参数将根据所选的文件类型而改变。

JSON 文档[](http://lucene.apache.org/solr/guide/7_0/documents-screen.html#json-documents)
---------------------------------------------------------------------------------------

使用 JSON 文档类型时，其功能与在命令行上使用 requestHandler 类似。不是将文档放在 curl 命令中，而是将其输入到 “文档” 输入框中。文档结构仍应采用适当的 JSON 格式。

然后，您可以选择何时将文档添加到索引（Commit Within）中，以及是否应该用具有相同 ID 的传入文档覆盖现有文档（如果不是 true，则传入文档将被丢弃）。

这个选项只会添加或覆盖文件到索引中，对于其他更新任务，请参阅 Solr 命令选项。

CSV 文档
------

使用 CSV 文档类型时，其功能与在命令行上使用 requestHandler 类似。不是将文档放在 curl 命令中，而是将其输入到 “文档” 输入框中。文档结构仍然应该是正确的 CSV 格式：带有列分隔符和一行文档。

然后，您可以选择何时将文档添加到索引（Commit Within）中，以及是否应该用具有相同 ID 的传入文档覆盖现有文档（如果不是 true，则传入文档将被丢弃）。

文档生成器[](http://lucene.apache.org/solr/guide/7_0/documents-screen.html#document-builder)
---------------------------------------------------------------------------------------

文档生成器提供了一个类似于向导的界面，用于输入文档的字段。

上传文件
----

文件上传选项允许选择一个准备好的文件并将其上传。如果仅将 /update 选项用于请求处理程序，则您将被限制为 XML、CSV 和 JSON。

但是，要使用 ExtractingRequestHandler（又名 Solr Cell），您可以将 Request-Handler 修改为 /update/extract。您必须在您的 solrconfig.xml 文件中定义您所需的默认值。您还应该添加 &literal.id，是其显示在“提取需求处理程序参数（Extracting Req. Handler Params）”字段中，以便选择的文件具有唯一的 ID。

然后，您可以选择何时将文档添加到索引（Commit Within）中，以及是否应该用具有相同 ID 的传入文档覆盖现有文档（如果不是 true，则传入文档将被丢弃）。

Solr 命令[](http://lucene.apache.org/solr/guide/7_0/documents-screen.html#solr-command)
-------------------------------------------------------------------------------------

Solr 命令选项允许您使用 XML 或 JSON 对文档执行特定的操作，例如定义要添加或删除的文档，只更新文档的某些字段，或提交和优化索引上的命令。

这些文档的结构应该像 /update 在命令行中使用一样。

XML 文档[](http://lucene.apache.org/solr/guide/7_0/documents-screen.html#xml-documents)
-------------------------------------------------------------------------------------

使用 XML 文档类型时，其功能与在命令行上使用 requestHandler 类似。不是将文档放在 curl 命令中，而是将其输入到 “文档” 输入框中。文档结构仍应采用适当的 Solr XML 格式，每个文档由 <doc> 标签分隔，并且每个字段被定义。

然后，您可以选择何时将文档添加到索引（Commit Within）中，以及是否应该用具有相同 ID 的传入文档覆盖现有文档（如果不是 true，则传入文档将被丢弃）。

这个选项只会添加或覆盖文件到索引；对于其他更新任务，请参阅 Solr 命令选项。
# Solr查询界面
您可以使用查询界面将搜索查询提交给 Solr 集合并分析结果。

在下面截图中的例子中，查询已经被提交，并且界面显示了作为 JSON 形式发送到浏览器的查询结果。

![Solr查询的JSON结果](https://atts.w3cschool.cn/attachments/image/20171109/1510214747366399.png)

在这个例子中，genre:Fantasy 的查询被发送到 “films” 集合。表单中的所有其他选项都使用了默认值，下表中对此进行了简要介绍，本指南的后面部分将对此进行详细介绍。

该响应显示在窗体的右侧。对 Solr 的请求只是简单的 HTTP 请求，而提交的查询在结果的上方以浅色显示；如果您点击它，它将打开一个新的浏览器窗口，只有这个请求和响应（没有 Solr 管理界面的其余部分）。其余的响应以 JSON 格式显示，这是默认的输出格式。

响应至少有两个部分，但可能还有其他几个部分，具体取决于所选的选项。它的两个部分始终是 responseHeader 和 response。responseHeader 包括搜索状态（status），处理时间（QTime）和参数（params 即用于处理查询）。

response（响应）与查询匹配的文档，在 doc 小节中。字段返回取决于查询的参数（以及所使用的请求处理程序的默认值）。结果的数量也包括在本节中。

此屏幕允许您尝试使用不同的查询选项，并检查文档的索引方式。表单上可用的查询参数是大多数用户想要获得的一些基本选项，但是还有几十个可用的参数可以简单地添加到基本请求中（如果在浏览器中打开的话）。以下参数可用：

Request-handler（qt）：指定请求的查询处理程序。如果未指定查询处理程序，则 Solr 会使用标准查询处理程序处理响应。

q：查询事件。请参阅搜索此参数的说明。

FQ：筛选器查询。有关此参数的更多信息，请参阅常见查询参数。

sort：根据响应的分数或其他指定的特性，按升序或降序对查询进行响应排序。

start，rows：`start`是从哪个文档返回的查询结果的偏移量。默认值是 0，这意味着查询应返回从第一个匹配的文档开始的结果。该字段接受与搜索中描述的开始查询参数相同的语法。`rows`是要返回的行数。

FL：定义要为每个文档返回的字段。您可以通过用逗号或空格分隔列出您想要返回的存储字段、函数和 doc 转换器。

wt：指定用于格式化查询响应的响应书写器。如果未指定，则默认为 JSON。

indent：单击此按钮以请求响应编写器使用缩进使响应更具可读性。

debugQuery：点击这个按钮来增加带有调试信息的查询响应，包括返回的每个文档的“解释信息”。这个调试信息旨在让管理员或程序员理解。

dismax：单击此按钮启用 Dismax 查询解析器。有关更多信息，请参阅 DisMax Query Parser。

edismax：单击此按钮可启用扩展查询解析器。有关更多信息，请参阅扩展 DisMax 查询解析器。

HL：点击此按钮可以在查询响应中启用突出显示。请参阅突出显示了解更多信息。

facet：启用 facet，将搜索结果的排列方式设置为基于索引项的类别。有关详细信息，请参阅 facet。

spatial：点击以启用在空间或地理空间搜索中使用的位置数据。请参阅空间搜索以获取更多信息。

spellcheck：点击此按钮启用拼写检查程序，它根据其他类似的术语提供了内联查询建议。请参阅拼写检查以获取更多信息。
# Solr管理界面：架构浏览器
使用 Solr 架构浏览器界面，您可以在浏览器窗口中查看架构数据。

如果您从分析界面访问了此窗口，则它将打开到特定字段、动态字段规则或字段类型。如果未选择任何选项，请使用下拉菜单选择字段或字段类型。

![Solr架构浏览器界面](https://atts.w3cschool.cn/attachments/image/20171110/1510292678810840.png)

架构浏览器界面提供了有关 Schema 中每个特定字段和字段类型的大量有用信息，并提供了使用 Schema API（如果已启用）添加字段或字段类型的快速 UI 。在上面的例子中，我们选择了这个 cat 字段。在主视图窗口的左侧，我们看到字段名称，它被复制到\_text\_（由于copyField规则），并使用 strings 字段类型。单击这些字段或字段类型名称之一，您可以看到相应的定义。

在主视图的右侧部分，我们看到 cat 字段定义的具体属性- 通过字段类型显式或隐式地定义，以及填充此字段的文档数量。然后我们看到用于索引和查询处理的分析器。点击其中任何一个的左侧的图标，您将看到所使用的标记化器和/或过滤器的定义。这些过程的输出是在[分析界面](https://www.w3cschool.cn/solr_doc/solr_doc-tc482fwu.html)上测试特定字段的内容处理方式时所看到的信息。

在分析器信息下是一个按钮，您可以使用它来加载术语信息。单击该按钮将显示该字段的示例分片中的前 N 个项，以及显示具有各种频率的项的数量的直方图。点击一个术语，你将被带到[查询界面](https://www.w3cschool.cn/solr_doc/solr_doc-kcas2fx9.html)查看该字段中该术语的查询结果。如果要始终查看某个字段的术语信息，请选择“ 自动加载”，并且在字段有术语时将始终显示。直方图显示了字段中具有给定频率的项的数量。
# Solr界面管理：流界面
Solr 流界面允许您输入流式表达式并查看结果。它与查询屏幕非常相似，不同的是输入框位于顶部，所有选项必须在表达式中声明。

该界面会将所有内容插入到流式表达式本身，因此您不需要输入带有主机名、端口、集合等的完整 URI。只需在`expr=` part 之后输入表达式，URL 就会根据需要动态构建。

在输入框下，执行按钮将运行表达式。“with explanation” 选项将显示已执行的流式表达的各个部分。在此之下，将显示流式结果。也可以在浏览器中查看输出的 URL。

![Solr管理界面](https://atts.w3cschool.cn/attachments/image/20171111/1510381514593380.png)
# Solr核心专用工具
Solr 特定于核心的工具是一组 UI 界面，允许您查看核心级别的信息。

在左侧的导航栏中，您将看到一个名为“核心选择器（Core Selector）”的下拉菜单。单击该菜单将显示此 Solr 节点上托管的 Solr 核心列表，其中包含可用于按名称查找特定核心的搜索框。

当您从下拉列表中选择一个核心时，页面的主要显示将显示关于核心的一些基本元数据，而在左侧导航栏中将出现一个二级菜单，其中包含指向其他核心特定管理屏幕的链接。

您还可以定义一个名为 admin-extra.html 的配置文件，其中包含您希望在此主界面的 “Admin Extra” 部分中显示的链接或其他信息。

![Solr核心界面概览](https://atts.w3cschool.cn/attachments/image/20171109/1510216957612427.png)

下面列出了特定于核心的 UI 界面，并提供了指向本指南部分的链接以了解更多内容：

*   [Ping](https://www.w3cschool.cn/solr_doc/solr_doc-l6u92fxe.html) \- 让您 ping 一个已命名的核心，并确定核心是否处于活动状态。
*   插件/统计（Plugins/Stats） - 显示插件和其他已安装组件的统计信息。

*   复制（Replication） - 显示核心的当前复制状态，并允许您启用/禁用复制。
*   段信息（Segments Info） - 提供底层 Lucene 索引段的可视化。

如果您正在运行 Solr 的单个节点实例，则通常在每个集合基础上显示的其他 UI 界面也将被列出：

*   分析（Analysis） - 让您分析在特定字段中找到的数据。

*   导入（Dataimport） - 显示有关数据导入处理程序的当前状态的信息。

*   文档（Documents） - 提供了一个简单的表单，允许您直接从浏览器执行各种 Solr 索引命令。

*   文件（Files） - 显示当前的核心配置文件，如：solrconfig.xml。

*   查询（Query） - 让您提交关于核心的各种元素的结构化查询。

*   流（Stream） - 允许您提交流表达式并查看结果和解析解释。

*   模式浏览器（Schema Browser） - 在浏览器窗口中显示架构数据。
# 使用Ping请求
在核心名称下选择 Ping 会发出一个 ping 请求来检查核心是否启动并响应请求。

![Solr核心下拉菜单中的Ping选项](https://atts.w3cschool.cn/attachments/image/20171109/1510217589638867.png)

由 Ping 执行的搜索是使用请求参数 API 进行配置的。请参阅 Implicit RequestHandlers，以了解用于 /admin/ping 端点的参数集。

Ping 选项不打开页面，但是在点击集合名称时显示的核心概览页面上可以看到请求的状态。请求的时间长度显示在 Ping 选项旁边，以毫秒为单位。

API 示例[](http://lucene.apache.org/solr/guide/7_0/ping.html#api-examples)
------------------------------------------------------------------------

虽然在 UI 界面上可以很容易地看到 ping 响应时间，但是当由远程监视工具执行时，底层 ping 命令会更加有用：

输入如下：

    http://localhost:8983/solr/<core-name>/admin/ping

这个命令将 ping 一个响应的核心名称。

输入如下：

    http://localhost:8983/solr/<collection-name>/admin/ping?distrib=true

此命令将为响应 ping 给定集合名称的所有副本。

示例输出：

    <response>
       <lst name="responseHeader">
          <int name="status">0</int>
          <int name="QTime">13</int>
          <lst name="params">
             <str name="q">{!lucene}*:*</str>
             <str name="distrib">false</str>
             <str name="df">_text_</str>
             <str name="rows">10</str>
             <str name="echoParams">all</str>
          </lst>
       </lst>
       <str name="status">OK</str>
    </response>

这两个 API 调用都有相同的输出。status=OK 表示节点正在响应。

SolrJ 示例：

    SolrPing ping = new SolrPing();
    ping.getParams().add("distrib", "true"); //To make it a distributed request against a collection
    rsp = ping.process(solrClient, collectionName);
    int status = rsp.getStatus();
# Solr管理界面：插件和统计
Solr 插件界面显示有关每个 Solr 内核中运行的各种插件的状态和性能的信息和统计信息。您可以找到有关 Solr 高速缓存的性能，Solr 搜索者的状态以及请求处理程序和搜索组件配置的信息。

在右侧选择一个感兴趣的区域，然后通过单击窗口中央部分出现的名称来深入了解更多细节。在这个例子中，我们选择了从核心区域查看搜索数据：

![Solr管理界面](https://atts.w3cschool.cn/attachments/image/20171110/1510293579311950.png)

该显示是在页面加载时拍摄的快照。您可以通过选择 “观察更改” 或 “刷新值” 来获取更新的状态。观察这些更改将突出显示已更改的区域，而刷新值将使用更新的信息重新加载页面。
