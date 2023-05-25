---
title: Java基础语法
abbrlink: 34708
date: 2016-10-09 18:23:18
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
**Java 概述及版本**

Java 是由 Sun Microsystems 公司于 1995 年 5 月推出的 Java 程序设计语言（以下简称 Java 语言）和 Java 平台的总称。Java 语言是一种面向对象的编程语言。虽然 Java 仅仅只产生了短短 20 年，但是它的发展是非常迅速的。在 2009 年 4 月 20 号，ORACLE 收购了 Sun 公司，也就是说 Java 这门语言现在归属于 ORACLE 这家公司门下。
![wm.jpeg](http://lcbupayun.test.upcdn.net/static/24e087e1b83a4b4ac205a21c54fc535a.jpeg)
在 Java 这门语言体系当中，最基础的部分就是 Java SE 部分，Java 的标准版本。它包括 Java 最基础的一些结构，包括面向对象的一些特性等等，同时它也是 Java 技术基础和核心。在 Java SE 的基础之上，又分为了 Java EE（Java 的企业版），应用于大型企业级应用的开发。Java ME 主要用于嵌入式开发。初学的时候我们都是从 Java SE 开始的。
![wm.png](http://lcbupayun.test.upcdn.net/static/22892b8f2d3e7b0ef0a05899bad594d7.png)
JVM 叫 Java 虚拟机，它也是整个 Java 技术的核心。Java 语言的跨平台就多亏了 JVM。

JDK 叫 Java 开发工具包，没有 JDK 就没有办法进行 Java 程序的开发。

JRE 叫 Java 运行环境，如果我们需要运行一个 Java 程序，就得安装 JRE。

JDK、JRE 和 JVM 之间的关系：

![wm-2.png](http://lcbupayun.test.upcdn.net/static/045446ff4c0d5114dae9976d03e51b2a.png)

**学习方法**
推荐同学们在学习的同时可以边看文档边动手写代码，在遇到不懂得问题时可以查看实验楼其他课程或者查看官方文档解决。

**HelloWorld**

每门语言学习前，都会有一个 HelloWorld 的示例，Java 当然也不例外。
在/home/project/下新建一个文件*HelloWorld.java*

    public class HelloWorld{

    public static void  main(String[] args){`
    
       ` System.out.println("HelloWorld!");`
        }
    }

上面的例子虽然简单，但是包含了很多的知识点，Java 中所有的代码都必须包含在 class 中，main 方法是程序的入口，并且 Java 是区分大小写的，如果写成 Main，那么程序将不能运行。使用 public 修饰的 class 必须和源代码文件名相同。

编译源代码：打开命令行，切换到源代码目录这里是/home/project，输入javac HelloWorld.java，如果程序没有任何提示，并且在同级目录下生成了一个.class 扩展名的文件，那么说明编译成功，反之编译失败。
运行程序：输入java HelloWorld，这个时候不需要再添加扩展名了。

    $ javac HelloWorld.java
   
    $ java HelloWorld  
   
      HelloWorld!`

**变量**


变量可以指在计算机存储器里存在值的被命名的存储空间。

变量通常是可被修改的，即可以用来表示可变的状态。这是 Java 的基本概念之一。

程序通过改变变量的值来改变整个程序的状态。为了方便使用变量，所以变量都需要命名，叫做变量名。

在 Java 中，变量需要先声明(declare)才能使用。在声明中，说明变量的类型，赋予变量以特别名字，以便在后面的程序中调用它。你可以在程序中的任意位置声明变量，语法格式如下：

数据类型 变量名称；

例如：

    int a = 1;

在该语法格式中，数据类型可以是 Java 语言中任意的类型，如int。变量名称是该变量的标识符，需要符合标识符的命名规则，数据类型和变量名称之间使用空格进行间隔，使用;作为结束。

在/home/project/新建一个VarTest.java文件:

    public class VarTest
    {
        public static void main(String[] args)
        {
            System.out.println("Define a variable a is ");
            int a; //声明变量a
            a = 5;
            System.out.println(a);  // 打印一个整数a
        }
    }

编译运行

    $ javac VarTest.java
    $ java VarTest
    Define a variable a is
    5

**常量**

常量代表程序运行过程中不能改变的值。我们也可以把它们理解为特殊的变量，只是它们在程序的运行过程中是不允许改变的。常量的值是不能被修改的。

Java 中的final关键字可以用于声明属性（常量），方法和类。当final修饰属性时，代表该属性一旦被分配内存空间就必须初始化, 它的含义是“这是无法改变的”或者“终态的”。在变量前面添加关键字final即可声明一个常量。在 Java 编码规范中，要求常量名必须大写。

语法格式：

final 数据类型 常量名 = 值;
例如：

    final double PI = 3.14;
常量也可以先声明，再进行赋值，但只能赋值一次，比如： ​
​ final int FINAL_VARIABLE; ​ FINAL_VARIABLE = 100;

在/home/project/下新建一个FinalVar.java

    public class FinalVar{
    public static void main(String[] args){
        final String FINAL_STRING="shiyanlou";
        System.out.println(FINAL_STRING);
    }
    }

编译运行

    $ javac FinalVar.java
    $ java FinalVar
    shiyanlou
**数据类型**
数据类型

Java 中一共八种基本数据类型，下表列出了基本数据类型的数据范围、存储格式、默认值、包装类型等。

    数据类型 默认值	          存储格式	            数据范围	                                    包装类型
    short	  0	          2 个字节	         -32,768 到 32767	                               Short
    int	    0	          4 个字节	        -2,147,483,648 到 2,147,483,647	                 Integer
    byte	   0	          1 个字节	        -128 到 127	                                     Byte
    char	   空	          2 个字节	Unicode 的字符范围：’\u0000’（即为 0）到’\uffff’（即为 65,535） Character
    long	   0L 或 0l	    8 个字节	-9,223,372,036,854,775,808 到 9,223,372,036, 854,775,807   Long
    float      0.0F 或 0.0f	4 个字节	       32 位 IEEEE-754 单精度范围	                        Float
    double	 0.0 或 0.0D(d)  8 个字节	       64 位 IEEE-754 双精度范围	                         Double
    boolean	false	       1 位	                true 或 false                                 Boolean
整数

byte、short、int、long 四种基本数据类型表示整数，需要注意的是 long 类型，使用 long 修饰的变量需要在数值后面加上 L 或者 l，比如long num=1L;，一般使用大写 L，为了避免小写 l 与数值 1 混淆。

浮点数

float 和 double 类型表示浮点数，即可以表示小数部分。需要注意的是 float 类型的数值后面需要加上 F 或者 f，否则会被当成 double 类型处理。double 类型的数值可以加上 D 或 d，也可以不加。

char 类型

char 类型用于表示单个字符。需要将字符用单引号括起来char a='a'，char 可以和整数互相转换，如果字符a也可以写成char a=97。也可以用十六进制表示char a = '\u0061'。

boolean 类型

boolean 类型（布尔类型）用于表示真值true或者假值false，Java 中布尔值不能和整数类型或者其它类型互相转换。

**String**

Java 中使用 String 类来定义一个字符串，字符串是常量，它们的值在创建之后不能更改。字符串缓冲区支持可变的字符串。

String 对象的初始化格式有如下两种：

String s0 = "abc";

String s1 = new String("abd");
copy
String 类具有丰富的方法，比如计算字符串的长度、连接字符串、比较字符串、提取字符串等等。

计算字符串长度

length()方法

//方法原型
public int length(){
}
copy
调用方法：字符串标识符.length();
返回一个 int 类型的整数（字符串中字符数，中文字符也是一个字符）。例如：

String s1 = "abc";
String s2 = "Java语言";
int len1 = s1.length();
int len2 = s2.length();
copy
则变量 len1 的值是 3，变量 len2 的值是 6。

字符串比较

equals() 方法,该方法的作用是判断两个字符串对象的内容是否相同。如果相同则返回 true，否则返回 false。

equals() 方法比较是从第一字符开始，一个字符一个字符依次比较。

![wm-3.png](http://lcbupayun.test.upcdn.net/static/11088919cc152bb4ed2446e8b9b1d9eb.png)

如果想忽略掉大小写关系，比如：java 和 Java 是一样的，那怎么办呢？可以调用equalsIgnoreCase()方法，其用法与 equals 一致，不过它会忽视大小写。

比如：

    public class StringTest {
    public static void main(String[] args){
        String s = new String("Java");
        String m = "java";
        System.out.println("用equals()比较，java和Java结果为"+s.equals(m));
        System.out.println("用equalsIgnoreCase()比较，java和Java结果为"+s.equalsIgnoreCase(m));
    }
    }

编译运行：

    $ javac StringTest.java
    $ java StringTest
用equals()比较，java和Java结果为false
用equalsIgnoreCase()比较，java和Java结果为true
copy
而使用"=="比较的是两个对象在内存中存储的地址是否一样。例如:

     String s1 = "abc";
     String s2 = new String("abc");
     boolean b = (s1 == s2);

则变量 b 的值是 false，因为 s1 对象对应的地址是"abc"的地址，而 s2 使用 new 关键字申请新的内存，所以内存地址和 s1 的"abc"的地址不一样，所以获得的值是 false。

字符串连接

字符串连接有两种方法：

使用+，比如String s = "Hello " + "World!"
使用 String 类的 concat() 方法
代码示例：

    String s0 = new String("Hello ");
    String s1 = "World" + "!";   //+号连接
    String s2 = s0.concat(s1); //concat()方法连接
    System.out.println(s2);

而且使用+进行连接，不仅可以连接字符串，也可以连接其他类型。但是要求进行连接时至少有一个参与连接的内容是字符串类型。

charAt()方法

charAt()方法的作用是按照索引值(规定字符串中第一个字符的索引值是 0，第二个字符的索引值是 1，依次类推)，获得字符串中的指定字符。例如：

     String s = "abc";
     char c = s.charAt(1);

则变量 c 的值是'b'。

字符串常用提取方法

    方法	                                  返回值	   功能描述
    indexOf(int ch)	                        int	   搜索字符 ch 第一次出现的索引
    indexOf(String value)	                  int	   搜索字符串 value 第一次出现的索引
    lastIndexOf(int ch)	                    int 	  搜索字符 ch 最后一次出现的索引
    lastIndexOf(String value)	              int	   搜索字符串 value 最后一次出现的索引
    substring(int index)	                   String	提取从位置索引开始到结束的字符串
    substring(int beginindex, int endindex)	String	提取 beginindex 和 endindex 之间的字符串部分
    trim()	                                 String	返回一个前后不含任何空格的调用字符串的副本
说明：在字符串中，第一个字符的索引为 0，子字符串包含 beginindex 的字符，但不包含 endindex 的字符。

来写一些代码，验证一下上面的方法吧

    public class StringTest {
         public static void main(String[] args) {
            String s = "abcdefabc";
            System.out.println("字符a第一次出现的位置为"+s.indexOf('a'));
            System.out.println("字符串bc第一次出现的位置为"+s.indexOf("bc"));
            System.out.println("字符a最后一次出现的位置为"+s.lastIndexOf('a'));
            System.out.println("从位置3开始到结束的字符串"+s.substring(3));
            System.out.println("从位置3开始到6之间的字符串"+s.substring(3,6));
         }
    }

编译运行：

    $ javac StringTest.java
    $ java StringTest
    字符a第一次出现的位置为0
    字符串bc第一次出现的位置为1
    字符a最后一次出现的位置为6
    从位置3开始到结束的字符串defabc
    从位置3开始到6之间的字符串def
**运算符**
运算符顾名思义是一种符号，它是连接一个以上的操作符，实现某种功能的运算。

**算术运算符**

算术运算符用在数学表达式中，主要实现的是算术运算，如常见的加法、减法、乘法、除法等。

表格中的例子中，变量a的值为 5，变量b的值为 3，变量i的值为 1：

    算术运算符	名称	描述	类型	举例
    +	加法	相加运算符两侧的值	双目运算符	a + b 等于 8
    -	减法	左操作数减去右操作数	双目运算符	a - b 等于 2
    *	乘法	相乘操作符两侧的值	双目运算符	a * b 等于 15
    /	除法	左操作数除以右操作数	双目运算符	a / b 等于 1
    %	取余	左操作数除右操作数的余数	双目运算符	a % b 等于 2
    ++	自增	操作数的值增加 1	单目运算符	++i（或 i++） 等于 2
    --	自减	操作数的值减少 1	单目运算符	--i（或 i--） 等于 0
其中，自增(++)和自减(--)运算符有两种写法：前缀（++i,--i）和后缀（i++,i--）。

前缀自增自减法(++i,--i): 先进行自增或者自减运算，再进行表达式运算。
后缀自增自减法(i++,i--): 先进行表达式运算，再进行自增或者自减运算
新建一个源代码文件ArithmeticOperation.java。

    public class ArithmeticOperation {
        public static void main(String args[]) {
           int a = 5;
           int b = 3;
        i  nt c = 3;
           int d = 3;
           System.out.println("a + b = " + (a + b));
           System.out.println("a - b = " + (a - b));
           System.out.println("a * b = " + (a * b));
           System.out.println("a / b = " + (a / b));
           System.out.println("a % b = " + (a % b));
           System.out.println("a++ = " + (a++));
           System.out.println("++a = " + (++a));
           System.out.println("b-- = " + (b--));
           System.out.println("--b = " + (--b));
           System.out.println("c++ = " + (c++));
           System.out.println("++d = " + (++d));
       }
    }

编译运行：

    $ javac ArithmeticOperation.java
    $ java ArithmeticOperation
    a + b = 8
    a - b = 2
    a * b = 15
    a / b = 1
    a % b = 2
    a++ = 5
    ++a = 7
    b-- = 3
    --b = 1
    c++ = 3
    ++d = 4
**位运算符**
Java 定义了位运算符，应用于整数类型(int)，长整型(long)，短整型(short)，字符型(char)，和字节型(byte)等类型。位运算时先转换为二进制，再按位运算。

表格中的例子中，变量a的值为 60，变量b的值为 13：

    位运算符	名称	描述	举例
    &	按位与	如果相对应位都是 1，则结果为 1，否则为 0	（a＆b），得到 12，即 0000 1100
    丨	按位或	如果相对应位都是 0，则结果为 0，否则为 1	（ a 丨 b ）得到 61，即 0011 1101
    ^	按位异或	如果相对应位值相同，则结果为 0，否则为 1	（a^b）得到 49，即 0011 0001
    ~	按位补	翻转操作数的每一位，即 0 变成 1，1 变成 0	（〜a）得到-61，即 1100 0011
    <<	按位左移	左操作数按位左移右操作数指定的位数	a<<2 得到 240，即 1111 0000
    >>	按位右移	左操作数按位右移右操作数指定的位数	a>>2 得到 15 即 1111
    >>>	按位右移补零	左操作数的值按右操作数指定的位数右移，移动得到的空位以零填充	a>>>2 得到 15 即 0000 1111
在/home/project目录下新建一个源代码文件BitOperation.java

    public class BitOperation {
        public static void main(String args[]) {
             int a = 60;
             int b = 13;
             System.out.println("a & b = " + (a & b));
             System.out.println("a | b = " + (a | b));
             System.out.println("a ^ b = " + (a ^ b));
             System.out.println("~a = " + (~a));
             System.out.println("a << 2 = " + (a << 2));
             System.out.println("a >> 2 = " + (a >> 2));
             System.out.println("a >>> 2 = " + (a >>> 2));
        }
     }

编译运行：

    $ javac BitOperation.java
    $ java BitOperation
    a & b = 12
    a | b = 61
    a ^ b = 49
    ~a = -61
    a << 2 = 240
    a >> 2 = 15
    a >>> 2 = 15

**逻辑运算符**

逻辑运算符是通过运算符将操作数或等式进行逻辑判断的语句。

表格中的例子中，假设布尔变量 a 为真，变量 b 为假：

    逻辑运算符	名称	描述	                                                  类型	举例
    &&	       与	当且仅当两个操作数都为真，条件才为真	                       双目运算符	（a && b）为假
    ｜｜	      或	两个操作数任何一个为真，条件为真	                          双目运算符	（a ｜｜ b）为真
    ！	       非	用来反转操作数的逻辑状态。如果条件为真，则逻辑非运算符将得到假	  单目运算符	（!a）为假
    ^	       异或	如果两个操作数逻辑相同，则结果为假，否则为真	                双目运算符	（a ^ b）为真
当使用&&(与)逻辑运算符时，在两个操作数都为 true 时，结果才为 true，但是当得到第一个操作为 false 时，其结果就必定是 false，这时候就不会再判断第二个操作了。 在/home/project目录下新建一个LogicOperation.java。

    public class LogicOperation {
       public static void main(String args[]) {
        boolean a = true;
        boolean b = false;
        System.out.println("a && b = " + (a && b));
        System.out.println("a || b = " + (a || b));
        System.out.println("!a = " + (!a));
        System.out.println("a ^ b = " + (a ^ b));
      }
    }

编译运行：

    $ javac LogicOperation.java
    $ java LogicOperation
    a && b = false
    a || b = true
    !a = false
    a ^ b = true
**关系运算符**

关系运算符生成的是一个 boolean（布尔）结果，它们计算的是操作数的值之间的关系。如果关系是真实的，结果为 true（真），否则，结果为 false（假）。

表格中的例子中，假设变量 a 为 3，变量 b 为 5：

    比较运算符	 名称	                         描述	                              举例
    ==	       等于	    判断两个操作数的值是否相等，如果相等则条件为真	             （a == b）为 false
    ！=	      不等于	   判断两个操作数的值是否相等，如果值不相等则条件为真	         (a != b) 为 true
    >	        大于	    判断左操作数的值是否大于右操作数的值，如果是那么条件为真	    （a > b）为 false
    <	        小于	    判断左操作数的值是否小于右操作数的值，如果是那么条件为真	    （ a < b）为 true
    >=	       大于等于	 判断左操作数的值是否大于或等于右操作数的值，如果是那么条件为真	（a >= b）为 false
    <=	       小于等于	 判断左操作数的值是否小于或等于右操作数的值，如果是那么条件为真	（a <= b）为 true
除了上表列出的二元运算符，Java 还有唯一的一个三目运算符 ?: 。

语法格式： 布尔表达式？表达式 1 : 表达式 2

运算过程：如果布尔表达式的值为true ，则返回 表达式1 的值，否则返回 表达式2 的值。

在/home/project目录下新建一个源代码文件RelationalOperation.java。

    public class RelationalOperation {
       public static void main(String args[]) {
        int a = 3;
        int b = 5;
        System.out.println("a == b = " + (a == b));
        System.out.println("a != b = " + (a != b));
        System.out.println("a > b = " + (a > b));
        System.out.println("a < b = " + (a < b));
        System.out.println("a >= b = " + (a >= b));
        System.out.println("a <= b = " + (a <= b));
        System.out.println("a > b ? a : b = " + (a > b ? a : b));
       }
    }

编译运行：

    $ javac RelationalOperation.java
    $ java RelationalOperation
    a == b = false
    a != b = true
    a > b = false
    a < b = true
    a >= b = false
    a <= b = true
    a > b ? a : b = 5

强调：

==和!=适用于所有的基本数据类型，其他关系运算符不适用于boolean，因为 boolean 值只有true和false，比较没有任何意义。
==和!=也适用于所有对象，可以比较对象的引用是否相同。
引用：Java 中一切都是对象，但操作的标识符实际是对象的一个引用。
**运算符优先级**
运算符的优先级是帮助我们在一个表达式中如何对于不同的运算符和相同的运算符，进行正确的运算顺序。

运算符的优先级不需要特别地去记忆它，比较复杂的表达式一般使用圆括号()分开，提高可读性。

![wm-4.png](http://lcbupayun.test.upcdn.net/static/48fc9ba2d85e74d2b35805ead21c7499.png)
![wm-5.png](http://lcbupayun.test.upcdn.net/static/6d7020feda8f66aa56c54c7bd6276609.png)
**练习：计算数字和**
在/home/project/目录下新建文件Sum.java，你需要实现以下需求：

*  获取控制台输入的两个整型参数
*  输出两个整型参数和
   比如输入 3 和 4 对应输出 7

示例：

    输入：
        3
        4
    输出：
        7

提示：java.util.Scanner可以获取控制台输入。

    Scanner in =new Scanner(System.in);
    //获取int值
    int x1=in.nextInt();
    int x2=in.nextInt();
**参考答案**

注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Scanner;

       public class Sum {
       public static void main(String[] args) {
           Scanner in = new Scanner(System.in);
           int a = in.nextInt();
           int b = in.nextInt();
           System.out.println(a + b);
       }
       }

**关键字和语句**

Java 的关键字对 java 的编译器有特殊的意义，他们用来表示一种数据类型，或者表示程序的结构等，关键字不能用作变量名、方法名、类名、包名。

Java 关键字有如下表所列，目前共有 50 个 Java 关键字，其中，"const"和"goto"这两个关键字在 Java 语言中并没有具体含义。

![wm-6.png](http://lcbupayun.test.upcdn.net/static/af57bbfecb1eb4f096d07b500148f7ab.png)

**方法**
Java 中的方法，可以将其看成一个功能的集合，它们是为了解决特定问题的代码组合。

方法的定义语法：

      访问修饰符 返回值类型 方法名(参数列表){
            方法体
       }

比如：

     public void functionName(Object arg){

    }


在上面的语法说明中：

1.访问修饰符：代表方法允许被访问的权限范围， 可以是 public、protected、private 或者省略（default） ，其中 public 表示该方法可以被其他任何代码调用。

2.返回值类型：方法返回值的类型，如果方法不返回任何值，则返回值类型指定为 void (代表无类型)；如果方法具有返回值，则需要指定返回值的类型，并且在方法体中使用 return 语句返回值。

3.方法名：是方法的名字，必须使用合法的标识符。

4.参数列表：是传递给方法的参数列表，参数可以有多个，多个参数间以逗号隔开，每个参数由参数类型和参数名组成，以空格隔开。当方法被调用时，传递值给参数。这个值被称为实参或变量。参数列表是指方法的参数类型、顺序和参数的个数。参数是可选的，方法可以不包含任何参数。

5.方法体：方法体包含具体的语句，定义该方法的功能。
根据方法是否带参、是否带返回值，可将方法分为四类：
* 无参无返回值方法
* 无参带返回值方法
* 带参无返回值方法
* 带参带返回值方法
  当方法定义好之后，需要调用才可以生效，我们可以通过 main 方法（main 方法是 Java 程序的入口，所以需要用它来调用）来调用它，比如：

在/home/project下建立MethodDemo.java

      public class MethodDemo{
       public static void main(String[] args){
        method();
       }
        //这里要加上static关键字 应为静态方法只能调用静态方法
       public static void method(){
        System.out.println("方法被调用");
          }
     }
编译运行：

      javac MethodDemo.java
      java MethodDemo
      方法被调用
**练习题：方法使用**

在/home/project/目录下新建文件MethodTest.java，在其中新建一个方法methodDemo，运行该方法，在控制台输出Hello Shiyanlou。
**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

        public class MethodTest {
              private static void methodDemo() {
                  System.out.println("Hello Shiyanlou");
              }

              public static void main(String[] args) {
             methodDemo();
        }
       }
**IDE**
Java 常见的 IDE 有 IDEA，Eclipse 等，同学们可以任选一种安装在本地学习，在实验楼环境中并不会使用这两种 IDE，而是使用 WEB IDE 进行开发，同学们需要将这两种 IDE 之一装在本地进行学习。


**流程控制**

流程控制对任何一门编程语言都是至关重要的，它为我们提供了控制程序步骤的基本手段。常见对主要分为，条件语句、循环语句、跳转语句。

**if 语句**
if 语句是一种判断语句。

语法：

    if(条件){
    条件成立时执行的代码
    }
![wm-7.png](http://lcbupayun.test.upcdn.net/static/60a62d740f72fdf04f35dd06c82d8db2.png)
if...else 语句当条件成立时，则执行 if 部分的代码块； 条件不成立时，则进入 else 部分。例如，如果一个月天数大于 30 天，则为大月，否则为小月。

语法：

     if(条件){
     代码块1
     }
     else{
     代码块2
     }
![wm-8.png](http://lcbupayun.test.upcdn.net/static/fd684b1ac10dddf0aad77cf4b2372bcb.png)
多重 if 语句，在条件 1 不满足的情况下，才会进行条件 2 的判断，以此向下；当前面的条件均不成立时，最终执行 else 块内的代码。

语法：

      if(条件1){
     代码块1
     }
     else if(条件2){
     代码块2
     }
     ...
     else {
     代码块n
    }
![wm-9.png](http://lcbupayun.test.upcdn.net/static/c7074ea6610aa7ed470f0fb89125be9d.png)
注意：如果 if(或 else if，或 else)条件成立时的执行语句只有一条，是可以省略大括号的！但如果执行语句有多条，那么大括号就是不可或缺的。

比如：

      int days = 31;
      if(days > 30)
      System.out.println("本月是大月");
      else
      System.out.println("本月是小月");
if 语句是可以在内层进行嵌套的。嵌套 if 语句，只有当外层 if 的条件成立时，才会判断内层 if 的条件。

语法：

       if(条件1){
      if(条件2){
        代码块1
       }
      else{
        代码块2
      }
      }
      else{
      代码块3
     }
![wm-10.png](http://lcbupayun.test.upcdn.net/static/5e1871dfccfd8c06d54ec2e1286c4984.png)  
f 语句练习：小明考了 78 分，60 分以上及格，80 分以上为良好，90 分以上为优秀，60 分以下要重考，编写源代码ScoreJudge.java，输出小明的情况。
参考代码如下：


      public class ScoreJudge {
      public static void main(String[] args){
        int score = 78;
        if(score >= 60){
            if(score >= 80){
                if(score >= 90){
                    System.out.println("成绩优秀");
                }
                else{
                    System.out.println("成绩良好");
                }
            }
            else{
                System.out.println("成绩及格");
            }
        }
        else{
            System.out.println("需要补考");
        }
     }
    }
注：所有的条件语句都是利用条件表达式的真或假来决定执行路径，Java 里不允许将一个数字作为布尔值使用，虽然这在C和C++是允许的，如果要在布尔测试里使用一个非布尔值，需要先用一个条件表达式将其转换成布尔值，其他控制语句同理。
编译执行:

    $ javac ScoreJudge.java
    $ Java ScoreJude
    成绩及格

**switch 语句**

当需要对选项进行等值判断时，使用 switch 语句更加简洁明了。比如：摇号摇到 1 的得一等奖，摇到 2 的得二等奖，摇到 3 的等三等奖，摇到其他的没有奖。

语法：

    switch(表达式){
    case 值1:
        代码块1
        break;
    case 值2:
        代码块2
        break;
    ...
    default:
        默认执行的代码块
    }

当 switch 后表达式的值和 case 语句后的值相同时，从该位置开始向下执行，直到遇到 break 语句或者 switch 语句块结束；如果没有匹配的 case 语句则执行 default 块的代码。

新建一个源代码文件Draw.java。

     public class Draw {
      public static void main(String[] args){
        int num = 2;
        switch(num){
        case 1:
            System.out.println("恭喜你，获得了一等奖");
            break;
        case 2:
            System.out.println("恭喜你，获得了二等奖");
            break;
        case 3:
            System.out.println("恭喜你，获得了三等奖");
            break;
        default:
            System.out.println("很遗憾，下次再来");
        }
    }
    }

编译运行：

    $ javac Draw.java
    $ java Draw
    恭喜你，获得了二等奖

**while 和 do-while 语句**
while语法：

    while(条件){
    代码块
    }

while 的执行过程是先判断，再执行。

* 判断 while 后面的条件是否成立( true or false )
* 当条件成立时，执行循环内的代码，然后重复执行1.、2.， 直到循环条件不成立为止
  ![wm-11.png](http://lcbupayun.test.upcdn.net/static/13b4d199185c3d976c318367a3fde38b.png)
  do-while语法：

       do{
         代码块
         }while(条件);

![wm-12.png](http://lcbupayun.test.upcdn.net/static/2f7b2137c8db4d96cc4fc492c40fefd2.png)   
如：

    int i = 0;
    while(i < 100){
    System.out.println("I love ShiYanlou!");
    i++;
    }

    int i = 0;
    do {
    System.out.println("I love ShiYanlou!");
    i++;
    } while(i < 100);

练习：分别用 while 和 do-while 两种方法，编写源代码文件SumOfEven.java，实现 1-1000 中所有偶数的和，并输出。验证一下两种方法你输出的结果是一致吗？

参考代码如下：

    public class SumOfEven {
    public static void main(String[] args){
        int i1 = 1, i2 = 1;
        int sum1 = 0, sum2 = 0;

        while (i1 <= 1000){     //循环1000次
            if(0 == i1 % 2){   //判断是否为偶数
                sum1 += i1;    //将偶数加入到总数里
            }
            i1++;              //i自增1
        }
        System.out.println("用while，1到1000中，所有偶数的和为："+sum1);

        do {
            if (0 == i2 % 2){   //在条件语句中，将数值写在前面是为了防止将==写成了=
                sum2 += i2;
            }
            i2++;
        } while(i2 <= 1000);
        System.out.println("用do-while，1到1000中，所有偶数的和为："+sum2);
    }
    }

编译运行：

    $ javac SumOfEven.java
    $ java SumOfEven
    用while，1到1000中，所有偶数的和为：250500
    用do-while，1到1000中，所有偶数的和为：250500
**for 语句**
for语法：

    for(循环变量初始化; 循环条件; 循环变量变化){
       循环操作
    }

for 相比 while 和 do-while 语句结构更加简洁易读，它的执行顺序：

* 执行循环变量初始化部分，设置循环的初始状态，此部分在整个循环中只执行一次
* 进行循环条件的判断，如果条件为 true，则执行循环体内代码；如果为 false ，则直接退出循环
* 执行循环变量变化部分，改变循环变量的值，以便进行下一次条件判断
* 依次重新执行2.、3.、4.，直到退出循环
  ![wm-13.png](http://lcbupayun.test.upcdn.net/static/13b4d199185c3d976c318367a3fde38b.png)
  例如，计算 100 以内不能被 3 整除的数之和：

  int sum = 0; // 保存不能被3整除的数之和
  // 循环变量 i 初始值为 1 ,每执行一次对变量加 1，只要小于等于 100 就重复执行循环
  for (int i = 1;i<=100;i++) {
  // 变量 i 与 3 进行求模（取余），如果不等于 0 ，则表示不能被 3 整除
  if (i % 3 != 0) {
  sum = sum + i; // 累加求和
  }
  }
  System.out.println("1到100之间不能被3整除的数之和为：" + sum);

练习：编写源代码文件SumOfEven.java，实现 1-1000 中所有偶数的和，并输出。

参考代码如下：

    public class SumOfEven {
    public static void main(String[] args){
        int sum = 0;
        for(int i = 1; i <= 1000; i++){
            if(0 == i % 2){
                sum += i;
            }
        }
        System.out.println("用for，1到1000中，所有偶数和为："+sum);
    }
    }

编译运行：

    $ javac SumOfEven.java
    $ java SumOfEven
    用for，1到1000中，所有偶数和为：250500
**练习题：字符串处理**

在/home/project/目录下新建StringUtil.java，你需要实现以下需求：

* 从控制台输入一行字符串
* 去除字符串中的所有空格
* 打印去除空格后的字符串
  示例：

      输入：
        shi ya n  lou
      输出：
        shiyanlou

提示：java.util.Scanner可以获取控制台输入。

    Scanner in =new Scanner(System.in);
    //获取String值
    String a=in.nextLine();
**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Scanner;
    public class StringUtil {
         public static void main(String[] args) {
        Scanner in =new Scanner(System.in);
        //获取String值
        String a=in.nextLine();
        StringBuilder stringBuilder = new StringBuilder(a);
        for (int i = 0; i < stringBuilder.length(); i++) {
            if (stringBuilder.charAt(i)==' ') {
                System.out.println(i);
                stringBuilder.deleteCharAt(i);
                i--;
            }else {
                stringBuilder.charAt(i);
            }
        }
        System.out.println(stringBuilder.toString());
        }
    }
**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Scanner;
    public class ContrastString {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        //获取String值
        String a = in.nextLine();
        String b = in.nextLine();
        if (a.length() != b.length()) {
            System.out.println("不同");
            return;
        }
        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) != b.charAt(i)) {
                System.out.println("不同");
                return;
            }
        }
        System.out.println("相同");
    }
    }

**跳转语句**

break关键字经常用在条件和循环语句中，用来跳出循环语句。

continue关键字的作用是跳过循环体中剩余的语句执行下一次循环。 新建一个源代码文件Jump.java。

    public class Jump{
    public static void main(String[] args){
        //break 练习
        for(int i = 1; i <= 10; i++){
            System.out.println("循环第"+i+"次");
            if(0 == i % 3){
                break;
            }
            if(0 == i % 5){
                System.out.println("我进来了！");
            }
        }
        //continue练习 打印10以内的所有奇数
        for(int i = 1; i <= 10; i++){
            if(0 == i % 2) //判断i是否为偶数
                continue;  //通过continue结束本次循环
            System.out.println(i);
        }
    }
    }

编译运行：

    $ javac Jump.java
    $ java Jump 
    循环第1次
    循环第2次
    循环第3次
    1
    3
    5
    7
    9
**练习题：打印星期**
在/home/project/目录下新建一个源代码文件PrintWeek.java。

你需要在实现以下需求：

* 从控制台获取一个整型参数
* 当输入数字 1 时输出今天是星期一
* 当输入数字 2 时输出今天是星期二
* ......
* 当输入数字 7 时输出今天是星期天

示例：

    输入：
    1
    输出：
    今天是星期一

提示：java.util.Scanner可以获取控制台输入。

    Scanner in =new Scanner(System.in);
    //获取int值
    int x=in.nextInt();

**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

     import java.util.Scanner;
     public class PrintWeek {
     public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        //获取int值
        int x = in.nextInt();
        switch (x) {
            case 1:
                System.out.println("今天是星期一");
                break;
            case 2:
                System.out.println("今天是星期二");
                break;
            case 3:
                System.out.println("今天是星期三");
                break;
            case 4:
                System.out.println("今天是星期四");
                break;
            case 5:
                System.out.println("今天是星期五");
                break;
            case 6:
                System.out.println("今天是星期六");
                break;
            case 7:
                System.out.println("今天是星期天");
                break;
        }
     }
    }
**数组**
所谓数组，是有序的元素序列。若将有限个类型相同的变量的集合命名，那么这个名称为数组名。组成数组的各个变量称为数组的分量，也称为数组的元素，有时也称为下标变量。用于区分数组的各个元素的数字编号称为下标。数组是在程序设计中，为了处理方便，把具有相同类型的若干元素按无序的形式组织起来的一种形式。这些无序排列的同类数据元素的集合称为数组。数组是用于储存多个相同类型数据的集合。--来自百度百科
**数组**
数组就是相同数据类型的元素按一定顺序排列的集合。可以把它看成一个大的盒子，里面按顺序存放了多个数据类型相同的数据。
![wm-14.png](http://lcbupayun.test.upcdn.net/static/4631e9ce8c8c88d3c2181dff61654432.png)
数组中的元素都可以通过下标来访问，下标从 0 开始，到数组长度-1 结束。例如，可以通过 ages[0] 获取数组中的第一个元素 18 ，ages[3] 就可以取到第四个元素 10。

使用数组前要声明数组。

语法：

    数据类型[ ] 数组名;   //或者: 数据类型 数组名[ ];

数组名为任意合法的变量名，如：

    int ages[];      //存放年龄的数组，类型为整型
    char symbol[];   //存放符号的数组，类型为字符型
    String [] name;  //存放名称的数组，类型为字符串型

声明数组后，需要为数组分配空间，也就是定义多大的数组。

语法：

    数组名 = new  数据类型 [ 数组长度 ];

数组长度就是数组最多可存放元素的个数。可以在数组声明的时候初始化数组，或者在声明时就为它分配好空间，这样就不用再为数组分配空间。

语法：

    int [] ages = {12,18,9,33,45,60}; //声明并初始化了一个整型数组，它有6个元素
    char [] symbol = new char[10] //声明并分配了一个长度为10的char型数组

分配空间后就可以向数组中放数据了，数组中元素都是通过下标来访问的。 如：

    ages[0]=12;

Java 中可以将一个数组赋值给另一个数组，如：

    int [] a1 = {1,2,3};
    int [] a2;
    a2 = a1;

这里只是复制了一个引用，即 a2 和 a1 是相同数组的不同名称。

在/home/project/下新建一个Test.java测试一下。

    public class Test {
    public static void main(String[] args) {
        int [] a1 = {1,2,3};
        int [] a2;
        a2 = a1;
        for(int i = 0; i < a2.length; i++){
            a2[i]++;
        }
        for(int i = 0; i < a1.length; i++){
            System.out.println(a1[i]);
        }
    }
    }

编译输出：

    $ javac Test.java
    $ java Test
    2
    3
    4

可以看到，修改 a2 的值，a1 的值也跟着变化。

数组遍历：

    int [] ages = {12, 18, 9, 33, 45, 60};
    for(int i = 0; i < ages.length; i++){ //ages.length是获取数组的长度
    System.out.println("数组中第"+(i+1)+"个元素是 "+ages[i]); //数组下标是从零开始，一定要注意
    }

注意：

数组下标从 0 开始。所以数组的下标范围是 0 至 数组长度 -1。
数组不能越界访问，否则会报错。
for 语句在数组内可以使用特殊简化版本，在遍历数组、集合时，foreach 更简单便捷。从英文字面意思理解 foreach 也就是“ for 每一个”的意思。

语法：

for(元素类型 元素变量:遍历对象){
执行的代码
}

在/home/project/下新建JudgePrime.java

    public class JudgePrime {
    public static void main(String[] args){
        int [] ages = {12, 18, 9, 33, 45, 60};
        int i = 1;
        for(int age:ages){
            System.out.println("数组中第"+i+"个元素是"+age);
            i++;
        }
    }
    }

编译运行：

    $ javac JudgePrime.java
    $ java JudgePrime
    数组中第1个元素是12
    数组中第2个元素是18
    数组中第3个元素是9
    数组中第4个元素是33
    数组中第5个元素是45
    数组中第6个元素是60

**二维数组**

二维数组可以看成是一间有座位的教室，座位一般用第几排的第几个进行定位，每一个座位都有一个行和一个列的属性，一排的座位相当于一个一维数组，所以可以将二维数组简单的理解为是一种“特殊”的一维数组，它的每个数组空间中保存的是一个一维数组。

二维数组也需要声明和分配空间。

语法：

    数据类型 [][] 数组名 = new 数据类型[行的个数][列的个数];

//或者

     数据类型 [][] 数组名;
     数组名 = new 数据类型[行的个数][列的个数];

//也可以

      数据类型 [][] 数组名 = {
     {第一行值1,第一行值2,...}
     {第二行值1,第二行值2,...}
     ...
     }

//二维数组的赋值和访问，跟一维数组类似，可以通过下标来逐个赋值和访问，注意索引从 0 开始

    数组名[行的索引][列的索引] = 值;

在/home/project/下新建ArrayTest.java

    public class ArrayTest {
    public static void main(String[] args) {
        String[][] name = {{"ZhaoYi", "QianEr", "SunSan"},
                {"LiSi", "ZhouWu", "WuLiu"}};
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.println(name[i][j]);
            }
        }
    }
    }

编译运行：

    $ javac ArrayTest.java
    $ java ArrayTest
     ZhaoYi
     QianEr
     SunSan
     LiSi
     ZhouWu
     WuLiu
     copy
**练习题：数组应用**

有一份成绩单，上面有 10 位学生的成绩（61，57，95，85，75，65，44，66，90，32），请求出平均成绩并输出。

在/home/project/目录下新建文件AverageScore.java，并在其中编写正确的代码。

提示：

* 将 10 位同学的成绩保存在数组中

**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    public class AverageScore {
    public static void main(String[] args) {
        int[] data = {61, 57, 95, 85, 75, 65, 44, 66, 90, 32};
        int sum = 0;
        for (int i = 0; i < data.length; i++) {
            sum += data[i];
        }
        System.out.println("平均成绩：" + sum / data.length);
    }
    }

**用户输入操作**
Java 可以使用java.util包下的Scanner类来获取用户的输入。使用import java.util.Scanner;即可导入 Scanner，使用方法示例：

在/home/project目录下新建ScannerDemo.java类

    import java.util.Scanner;

    public class ScannerDemo {
    public static void main(String[] args) {
        Scanner in=new Scanner(System.in);
        //获取用户输入的一行数据  返回为字符串
        String s = in.nextLine();
        System.out.println(s);
        //返回用户输入的int值
        int i = in.nextInt();
        System.out.println(i);
        //循环读取String数据，当输入exit时退出循环
        while (!in.hasNext("exit")) {
            System.out.println(in.nextLine());
        }
        //关闭输入
        in.close();
      }
     }

编译运行：

    javac ScannerDemo.java
    java ScannerDemo

运行结果示例：

    shiyanlou
    shiyanlou
    aa
    aa
    bbb
    bbb
    cc
    cc
    exit

除去以上列举的方法，其他方法可以在 api 中查询[https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html)
**练习题：用户输入**
在/home/project/目录下新建文件InputTest.java，你需要完成以下需求：

获取用户的输入信息（字符串）
当用户输入 end 时，结束输入并打印用户之前输入的所有信息（输入的信息数量不超过 100 个）
示例：

    输入：
     shi
     yan
     lou
     end
    输出：
     shi
     yan
     lou

提示：

* 使用数组保存元素

**参考答案**
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.util.Scanner;

    public class InputTest {
    public static void main(String[] args) {
        String[] data = new String[100];
        Scanner in = new Scanner(System.in);
        for (int i = 0; i < 100; i++) {
            if ((data[i] = in.nextLine()).equals("end")) {
                break;
            }
        }
        for (String a : data) {
            if (a.equals("end")) {
                break;
            }
            System.out.println(a);
        }
    }
    }
**练习题：最大最小值**

现给出一串数据（313, 89, 123, 323, 313, 15, 90, 56, 39）求出最大值和最小值并输出。

在/home/project/目录下新建文件MaxAndMin.java，在其中编写正确的代码。

**参考答案**

注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大


    import java.util.Arrays;

    public class MaxAndMin {
    public static void main(String[] args) {
        int[] data = {313, 89, 123, 323, 313, 15, 90, 56, 39};
        //    方法1
        int max = data[0];
        int min = data[0];
        for (int i = 0; i < data.length; i++) {
            if (data[i] > max) {
                max = data[i];
            }
            if (data[i] < min) {
                min = data[i];
            }
        }
        System.out.println(min);
        System.out.println(max);
        //方法二
        //Arrays.sort(data);
        //System.out.println(data[0]);
        //System.out.println(data[data.length - 1]);
        //方法三
        //System.out.println(Arrays.stream(data).min().getAsInt());
        //System.out.println(Arrays.stream(data).max().getAsInt());
    }
    }
**总结**

* 变量
* 常量
* 数据类型
* String
* 运算符
* 关键字和语句
* 方法
* 流程控制
* 数组
* 用户输入操作

到目前为止，已经完成了所有 Java 基础语法的学习，希望大家能够多根据文档中的例子进行练习，理解并掌握各个基础知识。

