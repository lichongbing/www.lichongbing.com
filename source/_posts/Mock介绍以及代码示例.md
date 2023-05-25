---
title: Mock介绍以及代码示例
abbrlink: 56567
date: 2020-01-01 21:21:03
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
* * *

1\. Mock测试介绍
------------

*   **定义**  
    在单元测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟对象来创建以便测试的方法。
*   **为什么使用mock测试**
    *   避免模块开发之间的耦合；
    *   轻量、简便、灵活；

2\. MockMVC介绍
-------------

基于RESTful风格的SpringMVC单元测试，可以测试完整的SpringMVC流程，即从URL请求到控制处理器，带到视图渲染都可以测试。

### 2.1 MockMvc

*   服务器端SpringMVC测试的主入口点。
*   通过MockMVCBuilders建造者的静态方法去建造MockMVCBuilder，MockMvc由MockMVCBuilder构造。
*   核心方法：**perform**(RequestBuilder rb)，执行一个RequestBuilder请，会自动执行SpringMVC的流程并映射到相应的控制器执行处理，该方法的返回值是一个ResultActions。

### 2.2 MockMVCBuilder

*   MockMVCBuilder是使用构造者模式来构造MockMvc的构造器。
*   主要有两个实现：**StandaloneMockMvcBuilder**和**DefaultMockMvcBuilder**。
*   可以直接使用**静态工厂MockMvcBuilders创建**即可，不需要直接使用上面两个实现类。

### 2.3 MockMVCBuilders

*   负责创建MockMVCBuilder对象。
*   有两种创建方式
    *   standaloneSetup(Object... controllers): 通过参数指定一组控制器，这样就不需要从上下文获取了。
    *   **webAppContextSetup**(WebApplicationContext wac)：指定WebApplicationContext，将会从该上下文获取相应的控制器并得到相应的MockMvc

### 2.4 MockMvcRequestBuilders

*   用来构建Request请求的。
*   其主要有两个子类**MockHttpServletRequestBuilder**和**MockMultipartHttpServletRequestBuilder**（如文件上传使用），即用来Mock客户端请求需要的所有数据。

### 2.5 ResultActions

*   **andExpect**：添加ResultMatcher验证规则，验证控制器执行完成后结果是否正确。
*   **andDo**：添加ResultHandler结果处理器，比如调试时打印结果到控制台。
*   **andReturn**：最后返回相应的**MvcResult**；然后进行自定义验证/进行下一步的异步处理。
*   **MockMvcResultMatchers**
    *   用来匹配执行完请求后的**结果验证。
    *   果匹配失败将抛出相应的异常。
    *   包含了很多验证API方法。
*   **MockMvcResultHandlers**
    *   结果处理器，表示要对结果做点什么事情。
    *   比如此处使用MockMvcResultHandlers.print()输出整个响应结果信息。

### 2.6 MvcResult

单元测试执行结果，可以针对执行结果进行**自定义验证逻辑**。

3.MockMVC使用
-----------

*   添加依赖

    <!-- spring 单元测试组件包 -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>5.0.7.RELEASE</version>
            </dependency>

            <!-- 单元测试Junit -->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
            </dependency>

            <!-- Mock测试使用的json-path依赖 -->
            <dependency>
                <groupId>com.jayway.jsonpath</groupId>
                <artifactId>json-path</artifactId>
                <version>2.2.0</version>
            </dependency>


*   对用户对象操作接口

```
    @RequestMapping("rest")
    @RestController
    public class RestfulController {
        
        // springmvc通过路径模板变量{变量名}这种方式，对URL带有参数的情况进行支持
        @RequestMapping("user/{id}/{name}/{sex}")
        public User findUserById(@PathVariable Integer id,@PathVariable String name,@PathVariable String sex) {
            User user = new User();
            user.setId(id);
            user.setUsername(name);
            user.setSex(sex);
            
            return user;
        }
        
    }
```   

*   测试类

```

    import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
    import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
    
    import org.junit.Before;
    import org.junit.Test;
    import org.junit.runner.RunWith;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.MediaType;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
    import org.springframework.test.context.web.WebAppConfiguration;
    import org.springframework.test.web.servlet.MockMvc;
    import org.springframework.test.web.servlet.MvcResult;
    import org.springframework.test.web.servlet.setup.MockMvcBuilders;
    import org.springframework.web.context.WebApplicationContext;
    
    //@WebAppConfiguration:可以在单元测试的时候，不用启动Servlet容器，就可以获取一个Web应用上下文
    //以前的思路：tomcat启动之后，创建Servlet对象、创建ServletContext对象--->创建spring容器(WebApplicationContext)--->spring容器存储到ServletContext对象中
    @RunWith(SpringJUnit4ClassRunner.class)
    @ContextConfiguration(locations = "classpath:springmvc.xml")
    @WebAppConfiguration
    public class TestMockMVC {
        // 自动获取由@WebAppConfiguration产生的web应用上下文
        @Autowired
        private WebApplicationContext wac;
    
        private MockMvc mockMvc;
    
        @Before
        public void setup() {
            // MockMvcBuilders -- MockMvcBuilder -- > MockMvc
            mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
        }
    
        // 测试测试请求：http://localhost:8080/springmvc-demo/rest/user/1/lisi/女
        @Test
        public void test() throws Exception {
            MvcResult result = mockMvc.perform(get("/rest/user/1/lisi/女"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))//使用json path表达式
                    .andDo(print())
                    .andReturn();
            
            Object handler = result.getHandler();
            System.out.println(handler);
        }
        }
    
```

*   结果显示，说明成功


```

    ...initBinder...
    ...initBinder...
    ...initBinder...
    
    MockHttpServletRequest:
          HTTP Method = GET
          Request URI = /rest/user/1/lisi/%E5%A5%B3
           Parameters = {}
              Headers = {}
                 Body = <no character encoding set>
        Session Attrs = {}
    
    Handler:
                 Type = com.kkb.springmvc.controller.RestfulController
               Method = public com.kkb.springmvc.po.User com.kkb.springmvc.controller.RestfulController.findUserById(java.lang.Integer,java.lang.String,java.lang.String)
    
    Async:
        Async started = false
         Async result = null
    
    Resolved Exception:
                 Type = null
    
    ModelAndView:
            View name = null
                 View = null
                Model = null
    
    FlashMap:
           Attributes = null
    
    MockHttpServletResponse:
               Status = 200
        Error message = null
              Headers = {Content-Type=[application/json;charset=UTF-8]}
         Content type = application/json;charset=UTF-8
                 Body = {"id":1,"username":"lisi","birthday":null,"sex":"å¥³","address":null,"uid":[],"itemList":[],"itemMap":{}}
        Forwarded URL = null
       Redirected URL = null
              Cookies = []
    public com.kkb.springmvc.po.User com.kkb.springmvc.controller.RestfulController.findUserById(java.lang.Integer,java.lang.String,java.lang.String)
    
```

**关联文章**  
[Spring Boot构建RESTful API与单元测试](http://blog.didispace.com/springbootrestfulapi/)
