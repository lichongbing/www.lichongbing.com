---
title: Tomcat多域名配置(多个项目共用80端口)
date: 2019-12-03 15:45:43
tags:
---
#Tomcat多域名配置(多个项目共用80端口)

准备四个已经备案的域名
首先保证三个项目正常部署在同一个tomcat里，默认端口号是都是80，这时候访问的url均为http://IP地址/各自项目名/XXX，项目全部位于webapps下面。
然后修改tomcat配置，将原本的host配置注释掉，新增四个host，
``<Host name="域名"  appBase="webapps"  unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
         <Context path="" docBase="项目名" debug="0" reloadable="true"/> 
      </Host>``

配置如下：      
`    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
prefix="localhost_access_log" suffix=".txt"
pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
<Host name="www.mfskjyx.com"  appBase="webapps"
unpackWARs="true" autoDeploy="true" debug="0" reloadable="true">
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
prefix="localhost_access_log." suffix=".txt"
pattern="%h %l %u %t &quot;%r&quot; %s %b" />
<Context path="" docBase="jingrong" />
</Host>
<Host name="www.cdmfskj.com"  appBase="webapps"
unpackWARs="true" autoDeploy="true" debug="0" reloadable="true">
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
prefix="localhost_access_log." suffix=".txt"
pattern="%h %l %u %t &quot;%r&quot; %s %b" />
<Context path="" docBase="mofa" />
</Host>
<Host name="www.cdqbsw.com"  appBase="webapps"
unpackWARs="true" autoDeploy="true" debug="0" reloadable="true">
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
prefix="localhost_access_log." suffix=".txt"
pattern="%h %l %u %t &quot;%r&quot; %s %b" />
<Context path="" docBase="qibugongshi" />
</Host>
<Host name="www.cdnxzh.com"  appBase="webapps"
unpackWARs="true" autoDeploy="true" debug="0" reloadable="true">
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
prefix="localhost_access_log." suffix=".txt"
pattern="%h %l %u %t &quot;%r&quot; %s %b" />
<Context path="" docBase="zhuangxiu" />
</Host>
`

三个host配置的name对应三个域名，下面的context节点的docBase分别对应三个项目路径，lilux下直接对应项目名即可。
最后重启tomcat。
