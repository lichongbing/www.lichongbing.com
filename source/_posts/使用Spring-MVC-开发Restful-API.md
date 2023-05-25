---
title: 使用Spring MVC 开发Restful API
abbrlink: 11998
date: 2019-12-31 22:43:27
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
# 使用Spring MVC 开发Restful API
![timg.gif](http://image.lichongbing.com/static/a62324410188d8a88c1a2a513da23fd3.gif)

## 编写针对RestfulAPI测试用例

imooc-security-demo项目结构

```
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── imooc
    │   └── resources
    │       ├── mock
    │       │   └── response
    │       └── resources
    │           └── error
    └── test
        └── java
            └── com
                └── imooc
```                


* 在pom.xml添加测试框架

```
<dependencies>
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
</dependency>
</dependencies>
```
在/test/java/com/imooc/web/controller创建UserControllerTest.java

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
		
	}



}
````

## 使用注解声明RestfulAPI
在/main/java/com/imooc/web/controller创建UserController类

* @RestController 标明此Controller提供RestAPI
* @PageableDefault 指定分页参数默认值
* @RequestMapping 映射http请求url到java方法
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(){
    List<User> users = new ArrayList<>();
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;

}


}



````

/src/main/java/com/imooc/dto创建User类


```java

public class User{
    private String usernamme;
    private String password;
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}


```

## RestfullAPI中传递参数

* @RequestParam 映射请求参数到java方法的参数
  在/main/java/com/imooc/web/controller创建UserController类修改添加参数
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(@RequestParam String username){

        System.out.println(username);
        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}


}



````


继续在/test/java/com/imooc/web/controller创建UserControllerTest.java修改

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
		
	}

}
````

如果涉及参数查询不指定时, 需要条件查询
在/src/main/java/com/imooc/dto创建UserQueryCondition类

```java
public class UserQueryCondition  {
    private String username;
    private int age;
    private int ageTo;
    private String xxx;
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getAgeTo() {
		return ageTo;
	}

	public void setAgeTo(int ageTo) {
		this.ageTo = ageTo;
	}

	public String getXxx() {
		return xxx;
	}

	public void setXxx(String xxx) {
		this.xxx = xxx;
	}
}
```

继续在/test/java/com/imooc/web/controller创建UserControllerTest.java修改

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
                                 .param("age" "18")
                                 .param("ageTo" "60")
                                 .param("xxx" "yyy")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
	
	}

}
````


在/main/java/com/imooc/web/controller创建UserController类修改添加参数
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(UserQueryCondition condition){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}


}

````


* @PageableDefault 指定分页参数默认值

在/main/java/com/imooc/web/controller创建UserController类修改添加参数
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(UserQueryCondition condition Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}


}

````



继续在/test/java/com/imooc/web/controller创建UserControllerTest.java修改，添加分页查询参数

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
                                 .param("age" "18")
                                 .param("ageTo" "60")
                                 .param("xxx" "yyy")
                                 .param("size" "15")
                                 .param("page" "3")
                                 .param("sort" "age,desc")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
		System.out.println(result);
	}

}
````


在/main/java/com/imooc/web/controller创建UserController类修改,分页信息后台打印查看
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(UserQueryCondition condition Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}


}

````

@PageableDefault 指定分页参数默认值
如果前台没有指定

/test/java/com/imooc/web/controller创建UserControllerTest.java

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
                                 .param("age" "18")
                                 .param("ageTo" "60")
                                 .param("xxx" "yyy")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
		System.out.println(result);
	}

}
````







在/main/java/com/imooc/web/controller创建UserController类修改,默认
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(UserQueryCondition condition @PageableDefault(page = 2,size = 17 sort = "username,asc") Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}


}

````
* jsonPath

## 编写用户详情服务
@PathVariable 映射url片段到java方法的参数
在url声明中使用正则表达式
@JsonView控制json输出内容


继续在/test/java/com/imooc/web/controller创建UserControllerTest.java继续添加新方法

````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
                                 .param("age" "18")
                                 .param("ageTo" "60")
                                 .param("xxx" "yyy")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
				
		System.out.println(result);
	}

  @Test
  public void whenGenInfoSuccess()throws Exception {
     
     mockMvc.perform(MockMvcRequestBuilders.get("/user/1")
             .contentType(MediaType.APPLICATION_JSON_UTF8))
             .andExpect(MockMvcResultMatchers.status().isOk())
             .andExpect(MockMvcResultMatchers.jsonPath("$.username").value"tom");



  }
  @Test
  public void whenGetInfoFail()throws Exception {
     mockMvc.perform(MockMvcRequestBuilders.get("/user/a")//如果传入参数没有正则表达式，会出现错误。
                 .contentType(MediaType.APPLICATION_JSON_UTF8))
                 .andExpect(MockMvcResultMatchers.status().is4xxClientError());

  
  }


}
````


在/main/java/com/imooc/web/controller创建UserController类修改,默认
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
public List<User> query(UserQueryCondition condition @PageableDefault(page = 2,size = 17 sort = "username,asc") Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}
@RequestMapping(value="/user/{id://d+}",method=RequestMethod.GET)
public User getInfo(@PathVariable String id) {

		User user = new User();
		user.setUsername("tom");
		return user;
	}


}

````

@JsonView的使用步骤
使用接口来声明多个视图
在值对象的get方法指定视图



/src/main/java/com/imooc/dto创建User类添加


```java

public class User{

    public interface UserSimpleView {};//使用接口来声明多个视图
	public interface UserDetailView extends UserSimpleView {};//使用接口来声明多个视图


    private String usernamme;
    private String password;

    @JsonView(UserSimpleView.class)//在值对象的get方法指定视图
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
    @JsonView(UserDetailView.class)//在值对象的get方法指定视图
    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}


```

在/main/java/com/imooc/web/controller创建UserController类修改,默认
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@RequestMapping(value="/user",method=RequestMethod.GET)
@JsonView(User.UserSimpleView.class)//在contrller方法上指定视图
public List<User> query(UserQueryCondition condition @PageableDefault(page = 2,size = 17 sort = "username,asc") Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}
@RequestMapping(value="/user/{id://d+}",method=RequestMethod.GET)
@JsonView(User.UserDetailView.class)//在contrller方法上指定视图
public User getInfo(@PathVariable String id) {

		User user = new User();
		user.setUsername("tom");
		return user;
	}


}

````


````java

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    @Autowired
	private WebApplicationContext wac;
    //伪造mvc环境
	private MockMvc mockMvc;
    @Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

    //用户查询测试用例
   @Test
	public void whenQuerySuccess() throws Exception {

		String result = mockMvc.perform(MockMvcRequestBuilders.get("/user")
                                 .param("username" "jojo")
                                 .param("age" "18")
                                 .param("ageTo" "60")
                                 .param("xxx" "yyy")
						         .contentType(MediaType.APPLICATION_JSON_UTF8))
				                 .andExpect(MockMvcResultMatchers.status().isOk())
                                 .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
                                 .andReturn().getResponse().getContentAsString();
				
		System.out.println(result);
	}

  @Test
  public void whenGenInfoSuccess()throws Exception {
     
     String result = mockMvc.perform(MockMvcRequestBuilders.get("/user/1")
             .contentType(MediaType.APPLICATION_JSON_UTF8))
             .andExpect(MockMvcResultMatchers.status().isOk())
             .andExpect(MockMvcResultMatchers.jsonPath("$.username").value"tom");

      System.out.println(result);

  }
  @Test
  public void whenGetInfoFail()throws Exception {
     mockMvc.perform(MockMvcRequestBuilders.get("/user/a")//如果传入参数没有正则表达式，会出现错误。
                 .contentType(MediaType.APPLICATION_JSON_UTF8))
                 .andExpect(MockMvcResultMatchers.status().is4xxClientError());

  
  }


}
````


代码重构

在/main/java/com/imooc/web/controller创建UserController类修改,默认
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
public class UserController {
@GetMapping("/user")
@JsonView(User.UserSimpleView.class)//在contrller方法上指定视图
public List<User> query(UserQueryCondition condition @PageableDefault(page = 2,size = 17 sort = "username,asc") Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}
@GetMapping("/user/{id://d+}")
@JsonView(User.UserDetailView.class)//在contrller方法上指定视图
public User getInfo(@PathVariable String id) {

		User user = new User();
		user.setUsername("tom");
		return user;
	}


}

````

继续重构

在/main/java/com/imooc/web/controller创建UserController类修改,默认
````java

import java.util.ArrayList;
import java.util.List;
@RestController 
@RequestMapping
public class UserController {
@GetMapping("/user")
@JsonView(User.UserSimpleView.class)//在contrller方法上指定视图
public List<User> query(UserQueryCondition condition @PageableDefault(page = 2,size = 17 sort = "username,asc") Pageable pageable){

        System.out.println(ReflectionToStringBuilder.toString(condition, ToStringStyle.MULTI_LINE_STYLE));
        System.out.println(pageable.getPageSize());
		System.out.println(pageable.getPageNumber());
		System.out.println(pageable.getSort());


        List<User> users = new ArrayList<>(); 
		users.add(new User());
		users.add(new User());
		users.add(new User());
		return users;



}
@GetMapping("{id://d+}")
@JsonView(User.UserDetailView.class)//在contrller方法上指定视图
public User getInfo(@PathVariable String id) {

		User user = new User();
		user.setUsername("tom");
		return user;
	}


}

````
