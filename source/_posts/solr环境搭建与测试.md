---
title: solr环境搭建与测试
abbrlink: 52434
date: 2019-12-26 17:27:37
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
## 配置环境
> jdk1.8
solr-4.10.4


## 准备工作：


* 1、适合solr-4.10.4版本的ik分词器 IK Analyzer 2012FF_hf1.zip
* 2、准备三个文件IKAnalyzer.cfg.xml，stopword.dic,sougou.dic


## 操作步骤：
* 1、解压IK Analyzer 2012FF_hf1.zip，上传iIK Analyzer 2012FF_hf1.jar至solr中example下conllection1下的solr项目中的webapps/solr/WEB-INF/lib目录
* 2、将扩展词典(sougou.dic和stopword.dic)、配置文件(IKAnalyzer.cfg.xml)放至solr中example下conllection1下的solr项目中的webapps/solr/WEB-INF/classes目录
* 3、在需要增加分词器的core中增加配置，修改managed-schema(schema.xml)文件，增加fieldType:

```
<fieldType name="text_ik" class="solr.TextField" >
       <!-- 索引时的分词器 -->
      <analyzer type="index" isMaxWorldLength="folse" class="org.wltea.analyzer.lucene.IKAnalyzer" /> 
      <analyzer type="query" isMaxWordLength="true" class="org.wltea.analyzer.lucene.IKAnalyzer"/>  
      
</fieldType>
```

* 4、为需要使用分词器的字段增加配置：

```
<field name="producttitle" type="text_ik" indexed="true" stored="true" omitNorms="true"/>
<field name="productdescription" type="text_ik" indexed="true" stored="true"/>
```
* 5、在example目录下运行

```
java -jar start.jar
```
通过管控台的analysis功能选择‘text_ik’的fieldType进行测试，结果如下：


![截屏2019-12-2617.39.33.png](http://lcbupayun.test.upcdn.net/static/7dbf064e9342d9f053f9605db8333307.png)

* 6、搭建maven项目，编写测试
  pom.xml 配置参考

```
<dependencies>
        <dependency>
            <groupId>org.apache.solr</groupId>
            <artifactId>solr-solrj</artifactId>
            <version>4.10.4</version>
        </dependency>
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.1.1</version>
        </dependency>
        <!-- slf4j -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.10</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.10</version>
        </dependency>
    </dependencies>
```
创建一个实体product，有三个字段
```
import org.apache.solr.client.solrj.beans.Field;
public class product {

	@Field
	private String id;

	@Field
	private String producttitle;

	@Field
	private String productdescription;
	

}
```
创建SolrUtil，
```
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;

/**
 * solr工具类
 *
 */
public class SolrUtil {

	static final Logger logger = LoggerFactory.getLogger(SolrUtil.class);
	private static final String SOLR_URL = "http://192.168.0.194:8983/solr/collection1"; // 服务器地址
	private static HttpSolrServer server = null;

	static {
		try {
			server = new HttpSolrServer(SOLR_URL);
			server.setAllowCompression(true);
			server.setConnectionTimeout(10000);
			server.setDefaultMaxConnectionsPerHost(100);
			server.setMaxTotalConnections(100);
		} catch (Exception e) {
			logger.error("请检查tomcat服务器或端口是否开启!{}", e);
			e.printStackTrace();
		}
	}

	/**
	 * 建立索引
	 *
	 * @throws Exception
	 */
	public static void addIndex(product product) {
		try {
			server.addBean(product);
			server.commit();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SolrServerException e) {
			e.printStackTrace();
		}

	}


	/**
	 * 批量增加索引2
	 *
	 * @throws Exception
	 */
	public static void addIndex2(Map<String, Object> mapValue) throws Exception {

		//必须先添加id
		SolrInputDocument document = new SolrInputDocument();
		Object idvalue = mapValue.get("id");
		document.addField("id", idvalue);

		if (mapValue != null) {
			Set<Map.Entry<String, Object>> entrySet = mapValue.entrySet();
			for (Map.Entry<String, Object> entry : entrySet) {

				String field = entry.getKey();
				Object value = entry.getValue();
				if ("id".equals(field)) {
					continue;
				}
				Map<String, Object> operation = new HashMap<String, Object>();
				operation.put("set", value);
				document.addField(field, operation);
			}
		}
		UpdateResponse response = server.add(document);
		server.commit();

	}

	private static List<String> searchqyinfofromsolr(String searchname)
			throws SolrServerException, IOException {
		SolrQuery query = new SolrQuery();
		query.setQuery("producttitle:" + "*" + searchname + "* OR productdescription:" + "*" + searchname + "*");

		QueryResponse response = server.query(query);
		SolrDocumentList docs = response.getResults();
		long count = docs.size();
		List<String> getliststring = new ArrayList<String>();
		//遍历数据
		for (int i = 0; i < count; i++) {
			SolrDocument sd = docs.get(i);
			String rowkeyString = (String) sd.getFieldValue("id");
			getliststring.add(rowkeyString);
		}
		return getliststring;
	}

	public static void main(String[] args) throws Exception {
		Map<String, Object> mapValue = new HashMap<String,Object>();
		mapValue.put("id","8");
		mapValue.put("producttitle","牛肉呵呵");
		mapValue.put("productdescription","羊肉的大哈哈");
		addIndex2(mapValue);
		List<String> list = searchqyinfofromsolr("肉");
		for (String temp : list) {
			System.out.println(temp);
		}
	}
}

```
![截屏2019-12-2618.17.45.png](http://lcbupayun.test.upcdn.net/static/9e8c369bbd9354df1d8d3d9adb161b47.png)
搜索“肉”关键词后台检索出来编号id
![截屏2019-12-2618.23.54.png](http://lcbupayun.test.upcdn.net/static/c7d098861e6fb1df2e03f44c7a5ee221.png)
至此搭建测试完毕。


