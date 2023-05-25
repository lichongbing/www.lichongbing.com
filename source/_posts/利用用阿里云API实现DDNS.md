---
title: 利用用阿里云API实现DDNS
abbrlink: 58337
date: 2019-12-16 10:01:55
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
## 前言
之前动态域名解析是用的是腾达路由器上集成的第三方动态解析服务花生壳，解析费用一年40元。后来觉得域名前缀不好，想换掉，花生壳需要重新购买新的域名解析费用，增加1条或者2条动态解析无所谓，万一以后增多了，那就不划算了。于是我决定用阿里云的动态解析api。
### 条件
1.有公网IP

2.主域名备案

### 如何使用DDNS

1.登录阿里云，获取 `AccessKeyId` 与`AccessKeySecret`；确定解析的域名例如我的域名是`cloud.lichongbing.com`

2.为了节省时间和精力，直接把阿里云ddns的代码实例拷贝首先用IDEA编译器快速搭建springboot项目，把代码放到主程序里就行。确保您已经安装了Alibaba Cloud SDK for Java，准确的SDK版本号，请参见阿里云开发工具包（SDK）。
在pom.xml 如下

     <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.lichongbing</groupId>
    <artifactId>ddns</artifactId>
    <version>0.0.1</version>
    <name>ddns</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.aliyun/aliyun-java-sdk-core -->
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-core</artifactId>
            <version>4.4.3</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.aliyun/aliyun-java-sdk-alidns -->
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-alidns</artifactId>
            <version>2.0.10</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

    </project>


构建springboot工程目录结构如下

    ├── HELP.md
    ├── dnns.iml
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    ├── src
    │   ├── main
    │   │   ├── java
    │   │   │   └── com
    │   │   │       └── lichongbing
    │   │   │           └── dnns
    │   │   │               └── DnnsApplication.java
    │   │   └── resources
    │   │       └── application.properties
    │   └── test
    │       └── java
    │           └── com
    │               └── lichongbing
    │                   └── dnns
    │                       └── DnnsApplicationTests.java
    └── target
        ├── classes
        │   ├── application.properties
        │   └── com
        │       └── lichongbing
        │           └── dnns
        │               └── DnnsApplication.class
        ├── ddns-0.0.1.jar
        ├── ddns-0.0.1.jar.original
        ├── generated-sources
        │   └── annotations
        ├── generated-test-sources
        │   └── test-annotations
        ├── maven-archiver
        │   └── pom.properties
        ├── maven-status
        │   └── maven-compiler-plugin
        │       ├── compile
        │       │   └── default-compile
        │       │       ├── createdFiles.lst
        │       │       └── inputFiles.lst
        │       └── testCompile
        │           └── default-testCompile
        │               ├── createdFiles.lst
        │               └── inputFiles.lst
        ├── surefire-reports
        │   ├── TEST-com.lichongbing.dnns.DnnsApplicationTests.xml
        │   └── com.lichongbing.dnns.DnnsApplicationTests.txt
        └── test-classes
            └── com
                └── lichongbing
                    └── dnns
                        └── DnnsApplicationTests.class

本文操作示例主要以代码形式体现，具体代码如下其中四处提示你修改：

     import com.aliyuncs.DefaultAcsClient;
     import com.aliyuncs.IAcsClient;
     import com.aliyuncs.alidns.model.v20150109.DescribeDomainRecordsRequest;
     import com.aliyuncs.alidns.model.v20150109.DescribeDomainRecordsResponse;
     import com.aliyuncs.alidns.model.v20150109.UpdateDomainRecordRequest;
     import com.aliyuncs.alidns.model.v20150109.UpdateDomainRecordResponse;
     import com.aliyuncs.exceptions.ClientException;
     import com.aliyuncs.profile.DefaultProfile;
     import com.google.gson.Gson;

     import java.io.BufferedReader;
     import java.io.InputStreamReader;
     import java.net.HttpURLConnection;
     import java.net.URL;
     import java.util.List;
     import java.util.regex.Matcher;
     import java.util.regex.Pattern;

     /**
      * 动态域名解析
      */
     public class DnnsApplication {

    /**
     * 获取主域名的所有解析记录列表
     */
    private DescribeDomainRecordsResponse describeDomainRecords(DescribeDomainRecordsRequest           request, IAcsClient client){
             try {
                 // 调用SDK发送请求
                 return client.getAcsResponse(request);
             } catch (ClientException e) {
                 e.printStackTrace();
                 // 发生调用错误，抛出运行时异常
                 throw new RuntimeException();
             }
         }

         /**
          * 获取当前主机公网IP
          */
         private String getCurrentHostIP(){
             // 这里使用jsonip.com第三方接口获取本地IP
             String jsonip = "https://jsonip.com/";
             // 接口返回结果
             String result = "";
             BufferedReader in = null;
             try {
                 // 使用HttpURLConnection网络请求第三方接口
                 URL url = new URL(jsonip);
                 HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                 urlConnection.setRequestMethod("GET");
                 urlConnection.connect();
                 in = new BufferedReader(new InputStreamReader(
                    urlConnection.getInputStream()));
                      String line;
                 while ((line = in.readLine()) != null) {
                result += line;
                 }
             } catch (Exception e) {
                 e.printStackTrace();
             }
             // 使用finally块来关闭输入流
             finally {
                 try {
                     if (in != null) {
                         in.close();
                     }
                 } catch (Exception e2) {
                     e2.printStackTrace();
                 }

             }
             // 正则表达式，提取xxx.xxx.xxx.xxx，将IP地址从接口返回结果中提取出来
             String rexp = "(\\d{1,3}\\.){3}\\d{1,3}";
             Pattern pat = Pattern.compile(rexp);
             Matcher mat = pat.matcher(result);
             String res="";
             while (mat.find()) {
                 res=mat.group();
                 break;
             }
             return res;
         }

         /**
          * 修改解析记录
          */
         private UpdateDomainRecordResponse updateDomainRecord(UpdateDomainRecordRequest request, IAcsClient client){
             try {
            // 调用SDK发送请求
                 return client.getAcsResponse(request);
             } catch (ClientException e) {
                 e.printStackTrace();
                 // 发生调用错误，抛出运行时异常
                 throw new RuntimeException();
             }
         }

         private static void log_print(String functionName, Object result) {
             Gson gson = new Gson();
             System.out.println("-------------------------------" + functionName + "-------------------------------");
             System.out.println(gson.toJson(result));
         }

         public static void main(String[] args) {
             // 设置鉴权参数，初始化客户端
             DefaultProfile profile = DefaultProfile.getProfile(
                     "cn-chengdu",// 地域ID
                "LTAI4Fq6g9sCiESU7y8h9fy3",// 修改成您的AccessKey ID
                     "2Ap5cT4jucTub95HEw666eDWOSunh4");// 修改成您的AccessKey Secret
             IAcsClient client = new DefaultAcsClient(profile);

             DnnsApplication ddns = new DnnsApplication();

             // 查询指定二级域名的最新解析记录
             DescribeDomainRecordsRequest describeDomainRecordsRequest = new      DescribeDomainRecordsRequest();
             // 主域名
             describeDomainRecordsRequest.setDomainName("lichongbing.com");// 修改成您的主域名
             // 主机记录
             describeDomainRecordsRequest.setRRKeyWord("cloud");// 修改成您的域名前缀，没有就写@
             // 解析记录类型
             describeDomainRecordsRequest.setType("A");
             DescribeDomainRecordsResponse describeDomainRecordsResponse =      ddns.describeDomainRecords(describeDomainRecordsRequest, client);
             log_print("describeDomainRecords",describeDomainRecordsResponse);

             List<DescribeDomainRecordsResponse.Record> domainRecords = describeDomainRecordsResponse.getDomainRecords();
             // 最新的一条解析记录
             if(domainRecords.size() != 0 ){
                 DescribeDomainRecordsResponse.Record record = domainRecords.get(0);
                 // 记录ID
                 String recordId = record.getRecordId();
                 // 记录值
                 String recordsValue = record.getValue();
                 // 当前主机公网IP
                      String currentHostIP = ddns.getCurrentHostIP();
                 System.out.println("-------------------------------当前主机公网IP为："+currentHostIP+"-------------------------------");
                 if(!currentHostIP.equals(recordsValue)){
                     // 修改解析记录
                     UpdateDomainRecordRequest updateDomainRecordRequest = new UpdateDomainRecordRequest();
                     // 主机记录
                     updateDomainRecordRequest.setRR("cloud");
                     // 记录ID
                     updateDomainRecordRequest.setRecordId(recordId);
                     // 将主机记录值改为当前主机IP
                     updateDomainRecordRequest.setValue(currentHostIP);
                     // 解析记录类型
                     updateDomainRecordRequest.setType("A");
                     UpdateDomainRecordResponse updateDomainRecordResponse = ddns.updateDomainRecord(updateDomainRecordRequest, client);
                     log_print("updateDomainRecord",updateDomainRecordResponse);
                 }
             }
         }
     }
运行结果

正确运行结果类似如下：


     -------------------------------describeDomainRecords-------------------------------
     {
         "requestId": "6AE588B9-FAFA-45FE-8FBE-CACB196D3539",
         "totalCount": 1,
         "pageNumber": 1,
         "pageSize": 20,
         "domainRecords": [
             {
                 "domainName": "lichongbing.com",
                 "recordId": "1846657850481xxxx",
                 "rR": "cloud",
                 "type": "A",
                 "value": "1.1.1.1",
                 "tTL": 600,
                 "line": "default",
                 "status": "ENABLE",
                 "locked": false,
                 "weight": 1
             }
         ]
     }
     -------------------------------当前主机公网IP为：123.123.123.123-------------------------------
如果ip不一样就会动态解析

     -------------------------------updateDomainRecord-------------------------------
     {
         "requestId": "08DC052F-7DF7-4451-8214-8489EC15D96A",
         "recordId": "1846657850481xxxx"
     }

最后打包发布到本地服务器上，编写启动脚本和定时命令。



