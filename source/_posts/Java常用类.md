---
title: Java常用类
abbrlink: 34875
date: 2016-12-09 21:15:08
tags:
img: 'http://image.lichongbing.com/IMG_4624.jpg'
---
## 简介
Java 类库提供了不少常用类，可以在编程中直接调用使用。本节讲重点讲解 Arrays、StringBuilder、Calendar、Date、Math、System、Random 类以及类的常用方法。

知识点

* Arrays
* StringBuilder
* Calendar
* Date
* Math
* System
* Random
## Arrays
Arrays 类包含用于操作数组的各种方法（例如排序和搜索）。还包含一个静态工厂，允许将数组转为 List。
### Arrays 常用方法

    方法                         描述
     
     <T> List<T> asList(T... a)	返回由指定数组构造的List
     
    void sort(Object[] a)	对数组进行排序
    
    void fill(Object[] a, Object val)	为数组的所有元素都赋上相同的值
    
    boolean equals(Object[] a, Object[] a2)	检查两个数组是否相等
    
    int binarySearch(Object[] a, Object key)	对排序后的数组使用二分法查找数据


### Arrays 编程实例
在/home/project/下新建一个ArraysDemo.java

    import java.util.Arrays;
    import java.util.Random;

    public class ArraysDemo {
    public static void main(String[] args) {
        int[] arr = new int[10];
        //将数组元素都设为9
        Arrays.fill(arr, 9);
        System.out.println("fill:" + Arrays.toString(arr));
        Random random = new Random();
        for (int i = 0; i < arr.length; i++) {
            //使用100以内的随机数赋值数组
            arr[i] = random.nextInt(101);
        }
        //重新赋值后的数组
        System.out.println("重新赋值：" + Arrays.toString(arr));
        //将索引为5的元素设为50
        arr[5] = 50;
        //排序
        Arrays.sort(arr);
        //排序后的数组
        System.out.println("sort排序后：" + Arrays.toString(arr));
        //查找50的位置
        int i = Arrays.binarySearch(arr, 50);
        System.out.println("值为50的元素索引："+i);
        //复制一份新数组
        int[] newArr = Arrays.copyOf(arr, arr.length);
        //比较
        System.out.println("equals:"+Arrays.equals(arr, newArr));
    }
    }

编译运行：

    $ javac ArraysDemo.java
    $ java ArraysDemo
    fill:[9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
    重新赋值：[69, 83, 40, 58, 94, 42, 2, 53, 43, 83]
    sort排序后：[2, 40, 43, 50, 53, 58, 69, 83, 83, 94]
    值为50的元素索引：3
    equals:true

### 练习题

在/home/project/下新建一个ArraysTest.java

你需要完成以下需求：

* 使用 Arrays 将数组[6, 17, 92, 32, 58, 22, 84, 66, 36, 33]进行排序
* 找出排序后 33 所在的位置
* 测试一下如果不排序能否找到值 33？
### 参考答案
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

      import java.util.Arrays;

      public class ArraysTest {
      public static void main(String[] args) {
        int[] arr = {6, 17, 92, 32, 58, 22, 84, 66, 36, 33};
        Arrays.sort(arr);
        System.out.println(Arrays.binarySearch(arr, 33));
      }
      }
## StringBuilder

StringBuilder 类是可变的。它是 String 的对等类，它可以增加和编写字符的可变序列，并且能够将字符插入到字符串中间或附加到字符串末尾（当然是不用创建其他对象的）

StringBuilder 的构造方法
![截屏2019-12-0923.51.19.png](http://image.lichongbing.com/static/a064d763ecb0d6a781da3448c490abe7.png)
上面的方法中我们选择几个，来写写代码吧：

在/home/project/目录下新建StringBuilderTest.java

    public class StringBuilderTest {

    public static void main(String[] args){
        //定义和初始化一个StringBuilder类的字串s
        StringBuilder s = new StringBuilder("I");
        //在s后面添加字串" java"
        s.append(" java");
        //在s[1]的位置插入字串
        s.insert(1, " love");
        String t = s.toString(); //转为字符串
        System.out.println(t);
    }
    }

输出结果为： I love java

其他的方法，请同学们一定要自己亲自一一验证一下！

在这里只介绍了 StringBuilder 类常用的方法，其他方法可参照 JDK 文档。
## Calendar

![截屏2019-12-0923.53.42.png](http://image.lichongbing.com/static/9bc74626252c78991fa25b042421121d.png)

    //太平洋时区的 ID 为 PST
    TimeZone tz0 = TimeZone.getTimeZone("PST")
    //getDefault()可以获取主机所处时区的对象
    TimeZone tz1 = TimeZone.getDefault()
Locale 只是一种机制，它用来标识一个特定的地理、政治或文化区域获取一个 Locale 对象的构造方法：

    //调用Locale类的构造方法
    Locale l0 = new Locale(String language)
    Locale l1 = new Locale(String language, String country)
    Locale l2 = new Locale(String languge, String country, String variant)

    //调用Locale类中定义的常量
    Locale  l1 = Locale.CHINA

## Calendar 编程实例
在/home/project/目录下新建源代码文件CalendarDemo.java。

    import java.text.DateFormat;
    import java.text.SimpleDateFormat;
    import java.util.Calendar;
    import java.util.Date;

    public class CalendarDemo {
    public static void main(String[] args) {
        System.out.println("完整显示日期时间：");
        // 字符串转换日期格式
        DateFormat fdate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String str = fdate.format(new Date());
        System.out.println(str);

        // 创建 Calendar 对象
        Calendar calendar = Calendar.getInstance();
        // 初始化 Calendar 对象，但并不必要，除非需要重置时间
        calendar.setTime(new Date());

        // 显示年份
        System.out.println("年： " + calendar.get(Calendar.YEAR));

        // 显示月份 (从0开始, 实际显示要加一)
        System.out.println("月： " + calendar.get(Calendar.MONTH));


        // 当前分钟数
        System.out.println("分钟： " + calendar.get(Calendar.MINUTE));

        // 今年的第 N 天
        System.out.println("今年的第 " + calendar.get(Calendar.DAY_OF_YEAR) + "天");

        // 本月第 N 天
        System.out.println("本月的第 " + calendar.get(Calendar.DAY_OF_MONTH) + "天");

        // 3小时以后
        calendar.add(Calendar.HOUR_OF_DAY, 3);
        System.out.println("三小时以后的时间： " + calendar.getTime());
        // 格式化显示
        str = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendar.getTime());
        System.out.println(str);

        // 重置 Calendar 显示当前时间
        calendar.setTime(new Date());
        str = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendar.getTime());
        System.out.println(str);

        // 创建一个 Calendar 用于比较时间
        Calendar calendarNew = Calendar.getInstance();

        // 设定为 5 小时以前，后者大，显示 -1
        calendarNew.add(Calendar.HOUR, -5);
        System.out.println("时间比较：" + calendarNew.compareTo(calendar));

        // 设定7小时以后，前者大，显示 1
        calendarNew.add(Calendar.HOUR, +7);
        System.out.println("时间比较：" + calendarNew.compareTo(calendar));

        // 退回 2 小时，时间相同，显示0
        calendarNew.add(Calendar.HOUR, -2);
        System.out.println("时间比较：" + calendarNew.compareTo(calendar));

        // calendarNew创建时间点
        System.out.println((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendarNew.getTime()));
        // calendar创建时间点
        System.out.println((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS")).format(calendar.getTime()));
        System.out.println("时间比较：" + calendarNew.compareTo(calendar));
    }
    }

编译运行：

    $ javac CalendarDemo.java
    $ java CalendarDemo
    完整显示日期时间：
    2018-12-12 15:50:49
    年： 2018
    月： 11
    分钟： 50
    今年的第 346天
    本月的第 12天
    三小时以后的时间： Wed Dec 12 18:50:49 CST 2018
    2018-12-12 18:50:49:449
    2018-12-12 15:50:49:455
    时间比较：-1
    时间比较：1
    时间比较：1
    2018-12-12 15:50:49:456
    2018-12-12 15:50:49:455
    时间比较：1

大家运行上面的代码后，看见控制台上的输出结果会不会有所疑问呢？

其实 month 的含义与 Date 类相同，0 代表 1 月，11 代表 12 月。

有的同学可能不明白最后一个的输出为什么有时是 0 ，有时是 1，在这里会涉及到 calendarNew 与 calendar 的创建时间点， calendarNew 经过增加和减少时间后恢复到原来的时间点，也就是最终比较的是谁先创建好，时间点靠后的大一些，而 calendarNew 创建的时间点只有可能是大于等于 calendar 的，需要根据实际的创建时间点进行比较。
## Date
![截屏2019-12-0923.58.28.png](http://image.lichongbing.com/static/42f9a0b95304da79906272ff0f75d1ca.png)
## Date 编程实例
在/home/project/目录下新建一个源代码文件DateDemo.java

    import java.text.SimpleDateFormat;
    import java.util.Date;

    public class DateDemo {
    public static void main(String[] args) {
        String strDate, strTime;
        Date objDate = new Date();
        System.out.println("今天的日期是：" + objDate);
        long time = objDate.getTime();
        System.out.println("自1970年1月1日起以毫秒为单位的时间（GMT）：" + time);
        strDate = objDate.toString();
        //提取 GMT 时间
        strTime = strDate.substring(11, (strDate.length() - 4));
        //按小时、分钟和秒提取时间
        strTime = "时间：" + strTime.substring(0, 8);
        System.out.println(strTime);
        //格式化时间
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(formatter.format(objDate));
      }
    }

编译运行:

    $ javac DateDemo.java
    $ java DateDemo
    今天的日期是：Wed Dec 12 14:43:15 CST 2018
    自1970年1月1日起以毫秒为单位的时间（GMT）：1544596995669
    时间：14:43:15
    2018-12-12 14:43:15

Date 类的很多方法自 JDK 1.1 开始就已经过时了。

## Math
![截屏2019-12-1000.00.55.png](http://image.lichongbing.com/static/58ef5f1b5f78fb8e8a5fb81d058a966b.png)
## Math 编程实例
在/home/project/下新建一个MathDemo.java

    public class MathDemo {
    public static void main(String[] args) {
        System.out.println(Math.abs(-12.7));
        System.out.println(Math.ceil(12.7));
        System.out.println(Math.rint(12.4));
        System.out.println(Math.random());
        System.out.println("sin30 = " + Math.sin(Math.PI / 6));
        // 计算30°的正弦值，参数是用弧度表示的角，即π的六分之一
        System.out.println("cos30 = " + Math.cos(Math.PI / 6));
        // 计算30°的余弦值，这些计算三角函数的方法，其参数和返回值的类型都为double
        System.out.println("tan30 = " + Math.tan(Math.PI / 6));
        // 计算30°的正切值
     }
     }

编译运行：

    $ javac MathDemo.java
    $ java MathDemo
     12.7
     13.0
     12.0
     0.8011998172263968
     sin30 = 0.49999999999999994
     cos30 = 0.8660254037844387
     tan30 = 0.5773502691896257

## 练习题
在/home/project/下新建一个MathTest.java

你需要完成以下需求：

* 使用 Math.random()生成两个随机数 a 和 b
* 求出两个随机数中的较大值
* 只能使用 Math 类中的方法
### 参考答案
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    public class MathTest {
    public static void main(String[] args) {
        double a = Math.random();
        double b = Math.random();
        System.out.println(a);
        System.out.println(b);
        System.out.println(Math.max(a, b));
    }

    }

## System

System 类提供了以下功能：

* 标准输入，标准输出和错误输出流;
* 访问外部定义的属性和环境变量;
* 加载文件和库的方法;
* 以及用于快速复制数组的实用方法。

System 不可以被实例化，只可以使用其静态方法。

    //从指定的源数组中复制一个数组，从源数组指定的位置开始，到目标数组指定的位置
    public static void arraycopy(Object src,int srcPos, Object dest,int desPos,int length) 
    //返回以毫秒为单位的当前时间(从1970年到现在的毫秒数)
    public static long currentTimeMillis()  
    //终止当前正在运行的Java虚拟机，status为 0时退出
    public static void exit(int status)  
    //  运行垃圾收集器
    public static void gc() 
    // 取得当前系统的全部属性
    public static Properties getProperties()
    //获取指定键的系统属性
    public static String  getProperty(String key) 
## System 使用示例
在/home/project/目录下新建一个源代码文件SystemDemo.java

    import java.util.Arrays;

    public class SystemDemo {
    public static void main(String[] args) {
        int[] a = {7, 8, 9, 10, 11};
        int[] b = {1, 2, 3, 4, 5, 6};
        //从数组a的第二个元素开始，复制到b数组的第三个位置 复制的元素长度为3
        System.arraycopy(a, 1, b, 2, 3);
        //输出结果
        System.out.println(Arrays.toString(b));
        System.out.println("当前时间：" + System.currentTimeMillis());
        System.out.println("java版本信息：" + System.getProperty("java.version"));
        //运行垃圾收集器
        System.gc();
        //退出
        System.exit(0);
        }
     }

编译运行：

     $ javac SystemDemo.java
     $ java SystemDemo
     [1, 2, 8, 9, 10, 6]
     当前时间：1544670501472
     java版本信息：11
## 练习题
在/home/project/目录下新建一个源代码文件SystemTest.java

你需要完成以下需求：

* 获取 Java 的安装目录(java.home)
* 练习 System.arraycopy 方法（自己随便复制两个数组）

## 参考答案
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Arrays;

    public class SystemTest {
    public static void main(String[] args) {
        int[] a = {7, 8, 9, 10, 11};
        int[] b = {1, 2, 3, 4, 5, 6};
        //从数组a的第二个元素开始，复制到b数组的第三个位置 复制的元素长度为3
        System.arraycopy(a, 1, b, 2, 3);
        //输出结果
        System.out.println(Arrays.toString(b));
        System.out.println("java版本信息：" + System.getProperty("java.home"));
    }
    }
## Random
Random 类用于生成伪随机数流，在java.util包下。
## Random 编程实例
在/home/project/目录下新建一个源代码文件RandomDemo.java

    import java.util.Random;

    public class RandomDemo {
    public static void main(String[] args) {
        Random random = new Random();
        //随机生成一个整数 int范围
        System.out.println(random.nextInt());
        //生成 [0,n] 范围的整数  设n=100
        System.out.println(random.nextInt(100 + 1));
        //生成 [0,n) 范围的整数  设n=100
        System.out.println(random.nextInt(100));
        //生成 [m,n] 范围的整数  设n=100 m=40
        System.out.println((random.nextInt(100 - 40 + 1) + 40));
        //随机生成一个整数 long范围
        System.out.print(random.nextLong());
        //生成[0,1.0)范围的float型小数
        System.out.println(random.nextFloat());
        //生成[0,1.0)范围的double型小数
        System.out.println(random.nextDouble());
      }
    }
、
编译运行：

    $ javac RandomDemo.java
    $ java RandomDemo
     272128541
     67
     93
     66
    -23177167376469717070.93104035
    0.20044632645967309
## 练习题：输出随机数
在/home/project/目录下新建一个源代码文件RandomTest.java，你需要完成以下需求：

* 从控制台中获取 Int 数据 m，n (m < n)，先输入 m，后输入 n
* 输出一个[m,n]之间的随机数
  示例：


    输入：
     30
       40
    输出：
       32
## 参考答案
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Random;
    import java.util.Scanner;

    public class RandomTest {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int m = in.nextInt();
        int n = in.nextInt();
        Random random = new Random();
        System.out.println(random.nextInt(n - m + 1) + m);
    }
    }
## 总结
Java 类库还拥有很多类，本节仅对常用的几种类进行讲解。主要内容包含以下知识点：

* Arrays
* StringBuilder
* Calendar
* Date
* Math
* System
* Random
  请大家务必手动完成代码并运行对比结果，这样才能更好的理解并熟练使用常用类。













