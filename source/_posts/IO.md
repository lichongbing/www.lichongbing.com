---
title: IO
abbrlink: 25718
date: 2017-05-10 11:08:34
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
整个 Java.io 包中最重要的就是 5 个类。指的是 File、OutputStream、InputStream、Writer、Reader；本节将重点讲解 Java.io 的相关内容。
Java 使用 File 类来直接处理文件和文件系统。File 类没有指定信息怎样从文件读取或向文件存储；它描述了文件本身的属性。File 对象用来获取或处理与磁盘文件相关的信息，例如权限，时间，日期和目录路径。此外，File 还浏览子目录层次结构。Java 中的目录当成 File 对待，它具有附加的属性——一个可以被 list( )方法检测的文件名列表。

构造方法

File 类提供了以下构造方法：

    //根据 parent 抽象路径名和 child 路径名字符串创建一个新 File 实例。 
    File(File parent, String child) 
  
    //通过将给定路径名字符串转换为抽象路径名来创建一个新 File 实例       
    File(String pathname) 

    // 根据 parent 路径名字符串和 child 路径名字符串创建一个新 File 实例
    File(String parent, String child) 

    //通过将给定的 file: URI 转换为一个抽象路径名来创建一个新的 File 实例
    File(URI uri) 

使用示例

    //一个目录路径参数
    File f1 = new File("/home/project/");

    //对象有两个参数——路径和文件名
    File f2 = new File("/home/project/","a.bat");

    //指向f1文件的路径及文件名
    File f3 = new File(f1,"a.bat");

常用方法

来看看 File 的一些常用方法
![截屏2019-12-1010.47.04.png](http://lcbupayun.test.upcdn.net/static/30f56435bf8bb8fc694b5f95bb17d481.png)
![截屏2019-12-1010.48.03.png](http://lcbupayun.test.upcdn.net/static/233f8f3d0f1f799781fd0301e6139655.png)
![截屏2019-12-1010.48.40.png](http://lcbupayun.test.upcdn.net/static/487f409b3467a5a9192ef4979bd1d5a0.png)
编程实例

在/home/porject/目录下创建源代码文件FileDemo.java

    import java.io.File;
    import java.io.IOException;

    public class  FileDemo {
    public static void main(String[] args){
        //同学们可以根据自己的路径进行更改
        File f1 =new
        File("/home/project/1.txt");
        //File(String parent,String child)
        File f2 =new File("/home/project","2.txt");
        //separator 跨平台分隔符
        File f3 =new File("/home"+File.separator+"project");
        File f4 =new File(f3,"3.txt");

        try {
             System.out.println(f1);
                //当文件存在时返回 false；不存在时返回 true
                System.out.println(f2.createNewFile());
                //当文件不存在时返回 false
                System.out.println(f3.delete());
        }catch(IOException e) {
                e.printStackTrace();
        }

        //列出磁盘下的文件和文件夹
        File[] files =File.listRoots();
        for(File file:files){
            System.out.println(file);
            if(file.length()>0){
                String[] filenames =file.list();
                for(String filename:filenames){
                    System.out.println(filename);
                }
            }
        }
    }

    }

编译运行：

    $ javac FileDemo.java
    $ java FileDemo
## 文件流
java.io 包中提供了文件操作类：

用于读写本地文件系统中的文件：FileInputStream 和 FileOutputStream
描述本地文件系统中的文件或目录：File、FileDescriptor 和 FilenameFilter
提供对本地文件系统中文件的随机访问支持：RandomAccessFile
接下来将学习文件流的 FileInputStream 和 FileOutputStream 。

FileInputStream 类用于打开一个输入文件，若要打开的文件不存在，则会产生异常 FileNotFoundException，这是一个非运行时异常，必须捕获或声明抛弃；

FileOutputStream 类用来打开一个输出文件，若要打开的文件不存在，则会创建一个新的文件，否则原文件的内容会被新写入的内容所覆盖；

在进行文件的读/写操作时，会产生非运行时异常 IOException，必须捕获或声明抛弃（其他的输入/输出流处理时也同样需要进行输入/输出异常处理）。

文件流的构造方法

    //打开一个以 f 描述的文件作为输入
    FileInputStream(File f)

    //打开一个文件路径名为 name 的文件作为输入
    FileInputStream(String name)

    //创建一个以 f 描述的文件作为输出
    //如果文件存在，则其内容被清空
    FileOutputStream(File f)

    //创建一个文件路径名为 name 的文件作为输出
    //文件如果已经存在，则其内容被清空
    FileOutputStream(String name)

    //创建一个文件路径名为 name 的文件作为输出
    //文件如果已经存在，则在该输出上输出的内容被接到原有内容之后
    FileOutputStream(String name, boolean append)

代码示例

    File f1 = new File("file1.txt");
    File f2 = new File("file2.txt");
    FileInputStream in = new FileInputStream(f1);
    FileOutputStream out = new FileOutputStream(f2);

输入流的参数是用于指定输入的文件名，输出流的参数则是用于指定输出的文件名。

编程实战

使用输入流和输出将 file1.txt 的内容复制到 file2.txt。
在/home/project/目录下新建Txt文件file1.txt。填入内容比如shiyanlou。 在/home/project/目录下新建源代码文件Test.java

     import java.io.File;
     import java.io.FileInputStream;
     import java.io.FileNotFoundException;
     import java.io.FileOutputStream;
     import java.io.IOException;

     public class Test {

     public static void main(String[] args) {
        try {
            //inFile 作为输入流的数据文件必须存在，否则抛出异常
            File inFile = new File("/home/project/file1.txt");

            //file2.txt没有，系统可以创建
            File outFile = new File("file2.txt");
            FileInputStream fis = new FileInputStream(inFile);
            FileOutputStream fos = new FileOutputStream(outFile);
            int c;
            while((c = fis.read()) != -1){
                fos.write(c);
            }
            //打开了文件一定要记着关，释放系统资源
            fis.close();
            fos.close();
        }catch(FileNotFoundException e) {
            System.out.println("FileStreamsTest:" + e);
        }catch(IOException e){
            System.err.println("FileStreamTest:" + e);
        }
    }
    }

编译运行：

    $ javac Test.java
    $ java Test

运行完成后，打开 file2.txt，可以看到 file2 和 file1 有相同的内容。

## FileReader

如果文件内容保存的是字符信息，如 txt 文件等，还可以使用 FileReader 来读取文件内容。

代码示例：

    FileReader file = new FileReader("/home/project/shiyanlou.txt");
    //声明一个文件输入流file，并指明该文件在系统中的路径以方便定位

    int data = 0;
    //声明一个整型变量用于存放读取的数据

    while((data=file.read())!=-1){
    //在while循环中使用read()方法持续读取file，数据赋到data中
    //如果读取失败或者结束，则将返回-1，这个特殊的返回值可以作为读取结束的标识

    System.out.print((char)data);
    //输出读取到数据
    }

    file.close();
    //一定要记得读取结束后要关闭文件
## 随机读写

对于 FileInputStream/FileOutputStream、FileReader/FileWriter 来说，它们的实例都是顺序访问流，即只能进行顺序读/写。而类 RandomAccessFile 则允许文件内容同时完成读和写操作，它直接继承 object，并且同时实现了接口 DataInput 和 DataOutput。

随机访问文件的行为类似存储在文件系统中的一个大型 byte 数组。存在指向该隐含数组的光标或索引，称为文件指针；输入操作从文件指针开始读取字节，并随着对字节的读取而前移此文件指针。如果随机访问文件以读取/写入模式创建，则输出操作也可用；输出操作从文件指针开始写入字节，并随着对字节的写入而前移此文件指针。

RandomAccessFile 提供了支持随机文件操作的方法：

* readXXX()或者 writeXXX():如 ReadInt(),ReadLine(),WriteChar(),WriteDouble()等
* int skipBytes(int n):将指针向下移动若干字节
* length():返回文件长度
* long getFilePointer():返回指针当前位置
* void seek(long pos):将指针调用所需位置
  在生成一个随机文件对象时，除了要指明文件对象和文件名之外，还需要指明访问文件的模式。

来看看 RandomAccessFile 的构造方法：

    RandomAccessFile(File file,String mode)
    RandomAccessFile(String name,String mode)

mode 的取值：

* r:只读，任何写操作都讲抛出 IOException
* rw:读写，文件不存在时会创建该文件，文件存在是，原文件内容不变，通过写操作改变文件内容。
* rws:打开以便读取和写入，对于 "rw"，还要求对文件的内容或元数据的每个更新都同步写入到底层存储设备。
* rwd:打开以便读取和写入，对于 "rw"，还要求对文件内容的每个更新都同步写入到底层存储设备。
## 练习题：随机访问文件
在/home/project/目录下新建源代码文件RandomFile.java，你需要完成以下需求：

* 下载文件 randomAccess.file
* 从偏移量为 10 的位置开始读取文件 randomAccess.file 的内容
* 输出文件内容（以字符串形式，不能直接输出字节内容）

文件下载：


    wget http://labfile.oss.aliyuncs.com/courses/1230/randomAccess.file

## 参考答案

注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

     import java.io.File;
     import java.io.IOException;
     import java.io.RandomAccessFile;
     import java.util.Arrays;

    public class RandomFile {
    public static void main(String[] args) {
        RandomAccessFile file;
        try {
            File d = new File("/home/project/randomAccess.file");
            file = new RandomAccessFile(d, "rw");
            file.seek(10);
            byte[] b = new byte[(int) file.length()-10];
            file.read(b);
            System.out.println(new String(b));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    }
## 练习
在/home/project/目录下新建FileDemo.java

     // FileDemo.java
    import java.io.IOException;
    import java.io.RandomAccessFile;

    public class  FileDemo {
    public static void main(String[] args){

            int data_arr[] = {12, 32, 43, 45, 1, 5};
            try {
                RandomAccessFile randf=new RandomAccessFile("temp.dat","rw");
                for(int i = 0; i < data_arr.length; i++){
                    randf.writeInt(data_arr[i]);
                }
                for(int i = data_arr.length-1 ; i >= 0; i--){
                    //int 数据占4个字节
                    randf.seek(i * 4L);
                    System.out.println(randf.readInt());
                }
                randf.close();
            }catch(IOException e){
                System.out.println("File access error" + e);
            }
    }
    }

编译运行：

     $ javac FileDemo.java
     $ java FileDemo
      5
      1
      45
      43
      32
      12
## 文件操作

在平时编写程序的时候，经常会对文件进行操作，比如文件的赋值，重命名，删除等。接下来学习使用 Java 操作文件。
可以使用 Files 工具类的 copy(Path source,Path target,CopyOption... options)拷贝文件或者目录。如果目标文件存在，那么赋值将失败，除非我们在 options 中指定了REPLACE_EXISTING属性。当该命令复制目录时，如果目录中已经有了文件，目录中的文件将不会被复制。CopyOption 参数支持以下 StandardCopyOption 和 LinkOption 枚举：

REPLACE_EXISTING - 即使目标文件已存在，也执行复制。如果目标是符号链接，则复制链接本身（而不是链接的目标）。如果目标是非空目录，则复制将失败并显示 FileAlreadyExistsException 异常。
COPY_ATTRIBUTES - 将与文件关联的文件属性复制到目标文件。支持的确切- 文件属性是文件系统和平台相关的，但 last-modified-time 跨平台支持并复制到目标文件。 NOFOLLOW_LINKS - 表示不应遵循符号链接。如果要复制的文件是符号链接，则复制链接（而不是链接的目标）。
编程实例
## 拷贝
在/home/project/目录下新建文件1.txt 在/home/project/目录下新建源代码文件CopyDemo.java

    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.nio.file.StandardCopyOption;

    public class CopyDemo {
    public static void main(String[] args) {
        try {
            //被拷贝的文件一定要存在 否则会抛出异常  这里的1.txt一定要存在
            Files.copy(Paths.get("/home/project/1.txt"), Paths.get("/home/project/2.txt"), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    }

编译运行：

    $ javac CopyDemo.java
    $ java CopyDemo

查看目录，如果没有报错，那么可以看到 1.txt 已经被复制了一份，叫做 2.txt。
## 移动和重命名
Files 类的 move(Path, Path, CopyOption... options)方法移动文件或者目录，同样目标目录存在，那么比如使用REPLACE_EXISTING。 options 参数支持 StandardCopyOption 的以下枚举：

REPLACE_EXISTING - 即使目标文件已存在，也执行移动。如果目标是符号链接，则替换符号链接，但它指向的内容不受影响。
ATOMIC_MOVE - 将移动作为原子文件操作执行。如果文件系统不支持原子移动，则抛出异常。使用，ATOMIC_MOVE 您可以将文件移动到目录中，并保证观察目录的任何进程都可以访问完整的文件。
move 方法除了可以移动之外，也可以用与重命名。

编程实例： 在/home/project/目录下新建源代码文件MoveDemo.java

    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.nio.file.StandardCopyOption;

    public class MoveDemo {
    public static void main(String[] args) {
        try {
            //将1.txt 重命名为3.txt 如果只需要移动到不同的目录，文件名不变即可
            Files.move(Paths.get("/home/project/1.txt"), Paths.get("/home/project/3.txt"), StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    }

编译运行：

    $ javac MoveDemo.java
    $ java MoveDemo
    renameTo移动结果：true

查看目录结构，可以看到之前的 1.txt 已经变成了 3.txt，2.txt变成了4.txt。
## 删除
可以通过 Files 的 delete(Path path)方法或者 deleteIfExists(Path path)方法删除文件。

编程实例： 在/home/project/目录下新建源代码文件DeleteDemo.java

    import java.io.File;
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;

    public class DeleteDemo {
    public static void main(String[] args) {
        try {
            //删除文件，文件必须存在，否则抛出异常
            Files.delete(Paths.get("/home/project/3.txt"));
            //删除文件，返回是否删除成功 即使文件不存在，也不会保存，直接返回false
            System.out.println(Files.deleteIfExists(Paths.get("/home/project/3.txt")));
            //或者使用File类的delete方法
            File file = new File("/home/project/4.txt");
            System.out.println(file.delete());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    }

    $ javac DeleteDemo.java
    $ java DeleteDemo
    false
    true

再次查看文件目录，3.txt 、4.txt 已经不存在了。

## 文件属性
Java 使用 File 类表示文件或者目录，可以通过 File 类获取文件或者目录的相关属性。

编程实例： 在/home/project/目录下新建源代码文件FileInfo.java

    import java.io.File;
    import java.util.Arrays;

    public class FileInfo {
    public static void main(String[] args) {
        File file = new File("/home/project");
        System.out.println("文件或者目录名：" + file.getName());
        System.out.println("绝对路径：" + file.getAbsolutePath());
        System.out.println("父目录：" + file.getParent());
        System.out.println("文件路径：" + file.getPath());
        //判断文件是否是目录
        if (file.isDirectory()) {
            //打印目录中的文件
            Arrays.stream(file.list()).forEach(System.out::println);
        }
        System.out.println("是否隐藏：" + file.isHidden());
        System.out.println("是否存在：" + file.exists());
    }
    }

    $ javac FileInfo.java
    $ java FileInfo
    文件或者目录名：project
    绝对路径：/home/project
    父目录：/home
    文件路径：/home/project
    FileInfo.class
    FileInfo.java
    是否隐藏：false
    是否存在：true
## 目录读取
Java 中读取目录中的文件可以直接使用 listFiles()方法读取，但是也只能读取当前目录中的文件，如果当前目录中还有二级目录如何解决呢？三级目录呢？接下来将使用 Java 读取当前目录和子目录中的所有文件。

编程实战

在/home/project/目录下新建源代码文件ReadDir.java

    import java.io.File;
    public class ReadDir {
    public static void main(String[] args) {
        readDir(new File("/home"));
    }

    static void readDir(File file) {
        if (file == null) {
            return;
        }
        //如果当前file是目录
        if (file.isDirectory()) {
            File[] files;
            //如果目录不为空
            if ((files = file.listFiles()) != null) {
                for (File file1 : files) {
                    //递归读取目录内容
                    readDir(file1);
                }
            }
        } else {
            //如果不是目录 直接输出文件名
            System.out.println(file.getName());
        }
    }
    }

编译运行：

    $ javac ReadDir.java
    $ java ReadDir
## 练习题：目录树
在/home/project/目录下新建源代码文件PrintDirTree.java，你需要完成以下需求：

任意建立一个至少三层的目录
打印该目录以目录树的形式，就像这样

    src
       main
           java
               a.java
               b.java
               c.java
           resources
       test
          java
              d.java
              e.java

提示：

* 使用递归
## 参考答案
注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大

    import java.io.File;
    import java.io.IOException;

    public class PrintDirTree {

    public static void main(String[] args) {
        printDirTree(new File("/home/"), "");
    }

    public static void printDirTree(File file, String s) {
        if (file.isDirectory()) {
            File[] files;
            System.out.println(s + file.getName());
            if ((files = file.listFiles()) != null) {
                s = s + "   ";
                for (File file1 : files) {
                    printDirTree(file1, s);
                }
            }
        } else {
            System.out.println(s + file.getName());
        }
    }
    }
## IO 流
在大多数程序中，都需要对输入输出进行处理。例如我们中需要获取用户从键盘上的输入，需要在控制台输出结果等等。除此之外还有从文件中读取数据，向文件中写入数据等等。在 Java 中，我们把这些不同类型的输入输出源抽象地称为流，也就是Stream；在里面输入输出的数据则称为数据流（Data Stream），它们通常具有统一的接口。

于是我们得到了数据流的定义：

* 一个 Java I/O 对象叫做数据流。读取数据到内存的对象叫做输入流，内存写出数据的对象叫做输出流。
  针对其面向的不同角度，我们大致可以将流分为下面几种类型：

* 按照数据流的方向不同分为输入流和输出流。这种分类不是绝对的，例如在向一个文件写入数据时，它就是输出流；而在读取数据时，它就是输入流。
* 按照处理数据的单位不同分为字节流和字符流。
  按照功能的不同分为节点流和处理流。
  需要特别说明，节点流是从特定的数据节点（文件、数据库、内存等）读写数据；处理流是连接在已有的流上，通过对数据的处理为程序提供更多功能。

在 Java 环境中，java.io包提供了大多数的类和接口来实现输入输出管理。一些标准的输入输出则来自java.lang包中的类，但它们都是继承自java.io中的类。我们可以将输入流理解为数据的提供者，而把输出流理解为数据的接收者。在最初的时候，这些派生自抽象类InputStream和OutputStream的输入输出类是面向 8 位的字节流的。但为了支持国际化，又引入了派生自抽象类Reader和Writer的类层次，用于读写一些双字节的Unicode字符。

因此，在学习 java 的输入输出上，我们希望你以字节流和字符流作为区分来学习。

如果需要概括一下，则可以得到下面的定义：

* 字节流：表示以字节为单位从 stream 中读取或往 stream 中写入信息。通常用来读取二进制数据。
* 字符流：以 Unicode 字符为单位从 stream 中读取或往stream 中写入信息。
  按照这样的定义，Java 中流的层级结构可以通过下图来表示：
  ![wm-3.jpeg](http://lcbupayun.test.upcdn.net/static/712c8eb327ac29f4569783c0dc001783.jpeg)
  图中蓝色的部分均为抽象类，而绿色的部分则为派生类，是可以直接使用的。

而下图简要说明了字节流和字符流的区别，你也可以进一步了解字节流与字符流的区别。
![wm-4.jpeg](http://lcbupayun.test.upcdn.net/static/2d17abf7c30891197e52dea54b6d0038.jpeg)
我们知道 Java 是一门面向对象的语言，所以为了能够永久地保存对象的状态，java.io包还以字节流为基础，通过实现ObjectInput和ObjectOutput接口提供了对象流。在此仅作引入，你可以通过查阅 API 手册来详细了解它们。
## 字节流
字节流主要操作 byte 类型数据，以 byte 数组为准，java 中每一种字节流的基本功能依赖于基本类 InputStream 和 Outputstream，他们是抽象类，不能直接使用。字节流能处理所有类型的数据（如图片、avi等）。

InputStream

InputStream 是所有表示字节输入流的父类，继承它的子类要重新定义其中所定义的抽象方法。InputStream 是从装置来源地读取数据的抽象表示，例如 System 中的标准输入流 in 对象就是一个 InputStream 类型的实例。

InputStream 类方法
![截屏2019-12-1011.39.13.png](http://lcbupayun.test.upcdn.net/static/9447655d6123ed5c48ced088bb66a98d.png)
![截屏2019-12-1011.39.55.png](http://lcbupayun.test.upcdn.net/static/81ebf0917493a6ce31562813be65770d.png)
编程实例：

在/home/project/目录下新建源代码文件Test.java

    import java.io.IOException;
    import java.io.InputStream;
    import java.io.OutputStream;

    public class Test {

    /**
     * 把输入流中的所有内容赋值到输出流中
     * @param in
     * @param out
     * @throws IOException
     */
    public void copy(InputStream in, OutputStream out) throws IOException {
        byte[] buf = new  byte[4096];
        int len = in.read(buf);
        //read 是一个字节一个字节地读，字节流的结尾标志是-1
        while (len != -1){
            out.write(buf, 0, len);
            len = in.read(buf);
        }
    }
    public static void main(String[] args) throws IOException {
        // TODO Auto-generated method stub
        Test t = new Test();
        System.out.println("输入字符：");
        t.copy(System.in, System.out);
    }

    }

编译运行：

    $ javac Test.java
    $ java Test
    输入字符：
    abc
    abc

一般来说，很少直接实现 InputStream 或 OutputStream 上的方法，因为这些方法比较低级，通常会实现它们的子类。
## 练习题：文件分割
在/home/project/目录下新建FileCut.java，你需要实现以下需求：

* 从控制台读取一个数值 n。
* 在/home/project目录下新建一个文本文件 cut.txt，填入任意内容，尽量多输入一些字符。
* 将 cut.txt 文件平均分割，每份文件大小为 n 字节。
* 分割后的文件分别命名为 cut1.txt、cut2.txt ... cutn.txt 保存在/home/project目录下。
  提示：

* 获取文件所占字节大小，根据字节平均分割文件

## 参考答案
`注意：请务必先独立思考获得 PASS 之后再查看参考代码，直接拷贝代码收获不大`

     import java.io.File;
     import java.io.FileInputStream;
     import java.io.FileOutputStream;
     import java.io.IOException;
     import java.util.Scanner;

     public class FileCut {
     public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        File file = new File("/home/project/file.txt");
        //需要分隔的文件份数
        int num;
        //如果不能整除，那么需要多加一个文件 用于保存剩余的数据
        if (file.length() % n == 0) {
            num = (int) (file.length() / n);
        } else {
            num = (int) (file.length() / n) + 1;
        }
        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            byte[] bytes = new byte[(int) file.length()];
            //读取文件到bytes
            fileInputStream.read(bytes);
            fileInputStream.close();
            for (int i = 1; i <= num; i++) {
                //文件名
                String fileName = "/home/project/cut" + i + ".txt";
                FileOutputStream fileOutputStream = new FileOutputStream(fileName);
                //最后一份文件需要特殊处理 因为他的大小不是n
                if (i == num) {
     //   (file.length()-n*(i-1)) 文件的总字节数 再减去前面已经读取的字节数 就是剩余的字节数
                    fileOutputStream.write(bytes, n * (i - 1), (int) (file.length() - n * (i - 1)));
                } else {

                    fileOutputStream.write(bytes, n * (i - 1), n);
                }
                fileOutputStream.flush();
                fileOutputStream.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    }
## 字符流
`字符流以字符为单位，根据码表映射字符，一次可能读多个字节，只能处理字符类型的数据。`

java.io 包中专门用于字符流处理的类，是以 Reader 和 Writer 为基础派生的一系列类。

同类 InputStream 和 OutputStream 一样，Reader 和 Writer 也是抽象类，只提供了一系列用于字符流处理的接口。它们的方法与类 InputStream 和 OutputStream 类似，只不过其中的参数换成字符或字符数组。

Reader 是所有的输入字符流的父类，它是一个抽象类。

我们先来看一看基类 Reader 的方法，其用法与作用都与 InputStream 和 OutputStream 类似，就不做过多的说明了。
![截屏2019-12-1011.46.30.png](http://lcbupayun.test.upcdn.net/static/014ee0f3e5e2e3aeecbff4bed275d0d7.png)
在这里我们就列举一下有哪些类。

* 对字符数组进行处理： CharArrayReader、CharArrayWrite
* 对文本文件进行处理：FileReader、FileWriter
* 对字符串进行处理：StringReader、StringWriter
* 过滤字符流：FilterReader、FileterWriter
* 管道字符流：PipedReader、PipedWriter
* 行处理字符流：LineNumberReader
* 打印字符流：PrintWriter
  类有千万，方法更是不计其数，所以没有必要去掌握所有的方法和类，只需要知道常见常用的就行了，而大多数的类和方法，希望大家有一个印象，当我们在实际开发的时间，能够想到，并且借助其他工具去查询我们需要的方法的应用方式就可以了。
## 转换流
InputStreamReader 和 OutputStreamWriter 是 java.io 包中用于处理字符流的最基本的类，用来在字节流和字符流之间作为中介：从字节输入流读入字节，并按编码规范转换为字符；往字节输出流写字符时先将字符按编码规范转换为字节。使用这两者进行字符处理时，在构造方法中应指定一定的平台规范，以便把以字节方式表示的流转换为特定平台上的字符表示。


    InputStreamReader(InputStream in); //缺省规范说明

    //指定规范 enc
    InputStreamReader(InputStream in, String enc);

    OutputStreamWriter(OutputStream out); //缺省规范说明

    //指定规范 enc
    OutputStreamWriter(OutputStream out, String enc);

如果读取的字符流不是来自本地时（比如网上某处与本地编码方式不同的机器），那么在构造字符输入流时就不能简单地使用缺省编码规范，而应该指定一种统一的编码规范“ISO 8859_1”，这是一种映射到 ASCCII 码的编码方式，能够在不同平台之间正确转换字符。

    InputStreamReader ir = new InputStreamReader(is,"8859_1");


## 缓冲流
类 BufferedInputStream 和 BufferedOutputStream 实现了带缓冲的过滤流，它提供了缓冲机制，把任意的 I/O 流“捆绑”到缓冲流上，可以提高 I/O 流的读取效率。

在初始化时，除了要指定所连接的 I/O 流之外，还可以指定缓冲区的大小。缺省时是用32字节大小的缓冲区；最优的缓冲区大小常依赖于主机操作系统、可使用的内存空间以及机器的配置等；一般缓冲区的大小为内存页或磁盘块等的整数倍。

BufferedInputStream 的数据成员 buf 是一个位数组，默认为 2048 字节。当读取数据来源时例如文件，BufferedInputStream 会尽量将 buf 填满。当使用 read ()方法时，实际上是先读取 buf 中的数据，而不是直接对数据来源作读取。当 buf 中的数据不足时，BufferedInputStream 才会再实现给定的 InputStream 对象的 read() 方法，从指定的装置中提取数据。

BufferedOutputStream 的数据成员 buf 是一个位数组，默认为 512 字节。当使用 write() 方法写入数据时，实际上会先将数据写至 buf 中，当 buf 已满时才会实现给定的 OutputStream 对象的 write() 方法，将 buf 数据写至目的地，而不是每次都对目的地作
![wm-23.png](http://lcbupayun.test.upcdn.net/static/0c8d73070ac59eebe9b5cc60a8e20c98.png)
构造方法：

    //[ ]里的内容代表选填
    BufferedInputStream(InputStream in [, int size])
    BufferedOutputStream(OutputStream out [, int size])

举个例子，将缓冲流与文件流相接：

    FileInputStream in = new FileInputStream("file.txt");
    FileOutputStream out = new FileOutputStream("file2.txt");
    //设置输入缓冲区大小为256字节
    BufferedInputStream bin = new BufferedInputStream(in,256)
    BufferedOutputStream bout = new BufferedOutputStream(out,256)
    int len;
    byte bArray[] = new byte[256];
    len = bin.read(bArray); //len 中得到的是实际读取的长度，bArray 中得到的是数据
![wm-24.png](http://lcbupayun.test.upcdn.net/static/801e864dc1b88d99518f578eebb9a350.png)
对于 BufferedOutputStream，只有缓冲区满时，才会将数据真正送到输出流，但可以使用 flush() 方法人为地将尚未填满的缓冲区中的数据送出。

例如方法 copy():

    public void copy(InputStream in, OutputStream out) throws IOException {
    out = new BufferedOutputStream(out, 4096);
    byte[] buf = new byte[4096];
    int len = in.read(buf);
    while (len != -1) {
    out.write(buf, 0, len);
    len = in.read(buf);
    }
    //最后一次读取得数据可能不到4096字节
    out.flush();
    }

## BufferedReader 和 BufferedWrite
同样的，为了提高字符流处理的效率，java.io 中也提供了缓冲流 BufferedReader 和 BufferedWrite。其构造方法与 BufferedInputStream 和 BufferedOutPutStream 相类似。另外，除了 read() 和 write() 方法外，它还提供了整行字符处理方法：

public String readLine()：BufferedReader 的方法，从输入流中读取一行字符，行结束标志\n、\r或者两者一起（这是根据系统而定的）
public void newLine()：BufferedWriter 的方法，向输出流中写入一个行结束标志，它不是简单地换行符\n或\r，而是系统定义的行隔离标志（line separator）。
看一看例子吧：

     // FileToUnicode.java
     import java.io.BufferedReader;
     import java.io.FileInputStream;
     import java.io.IOException;
     import java.io.InputStreamReader;

     public class FileToUnicode {
     public static void main(String args[]) {
        try {
            FileInputStream fis = new FileInputStream("file1.txt");
            InputStreamReader dis = new InputStreamReader(fis);
            BufferedReader reader = new BufferedReader(dis);
            String s;
            //每次读取一行，当改行为空时结束
            while((s = reader.readLine()) != null){
                System.out.println("read:" + s);
            }
            dis.close();
        }
        catch(IOException e) {
            System.out.println(e);
        }
    }
    }

如 file1.txt 的内容如下：

     abc
     efg
     hij

编译运行：

    $ javac FileToUnicode.java
    $ java FileToUnicode
    read:abc
    read:efg
    read:hij
## 数据流
接口 DataInput 和 DataOutput，设计了一种较为高级的数据输入输出方式：除了可处理字节和字节数组外，还可以处理 int、float、boolean 等基本数据类型，这些数据在文件中的表示方式和它们在内存中的一样，无须转换，如 read(), readInt(), readByte()...; write(), writeChar(), writeBoolean()...此外，还可以用 readLine()方法读取一行信息。

常用方法
![截屏2019-12-1011.57.19.png](http://lcbupayun.test.upcdn.net/static/492063c8faf368c2e474d6e590c7965f.png)
![截屏2019-12-1011.58.06.png](http://lcbupayun.test.upcdn.net/static/a63498582a5069b3ae617ce89a1d7b6c.png)
数据流类 DataInputStream 和 DataOutputStream 的处理对象除了是字节或字节数组外，还可以实现对文件的不同数据类型的读写：

分别实现了 DataInput 和 DataOutput 接口
* 在提供字节流的读写手段同时，以统一的形式向输入流中写入 boolean，int，long，double 等基本数据类型，并可以再次把基本数据类型的值读取回来。
* 提供了字符串读写的手段
* 数据流可以连接一个已经建立好的数据对象，例如网络连接、文件等。数据流可以通过如下方式建立：

      FileInputStream fis = new FileInputStream("file1.txt");
      FileOutputStream fos = new FileOutputStream("file2.txt");
      DataInputStream dis = new DataInputStream(fis);
      DataOutputStream dos = new DataOutputStream(fos);

编程实战

在/home/project/目录下新建源代码文件DataStream.java

     import java.io.DataInputStream;
     import java.io.DataOutputStream;
     import java.io.FileInputStream;
     import java.io.FileOutputStream;
     import java.io.IOException;

     public class DataStream {

     public static void main(String[] args) throws IOException{
        //向文件 a.txt 写入
        FileOutputStream fos = new FileOutputStream("a.txt");
        DataOutputStream dos = new DataOutputStream(fos);
        try {
            dos.writeBoolean(true);
            dos.writeByte((byte)123);
            dos.writeChar('J');
            dos.writeDouble(3.1415926);
            dos.writeFloat(2.122f);
            dos.writeInt(123);
        }
        finally {
            dos.close();
        }
        //从文件 a.txt 读出
        FileInputStream fis = new FileInputStream("a.txt");
        DataInputStream dis = new DataInputStream(fis);
        try {
            System.out.println("\t" + dis.readBoolean());
            System.out.println("\t" + dis.readByte());
            System.out.println("\t" + dis.readChar());
            System.out.println("\t" + dis.readDouble());
            System.out.println("\t" + dis.readFloat());
            System.out.println("\t" + dis.readInt());
        }
        finally {
            dis.close();
        }
    }

    }

编译运行：

    $ javac DataStream.java
    $ java DataStream
        true
        123
        J
        3.1415926
        2.122
        123
## 读写对象
我们知道实例化的对象存在于内存中，如果我们想传输实例化的对象怎么办呢？可以通过 ObjectOutputStream 和 ObjectInputStream 将对象输入输出。 将对象的状态信息转换为可以存储或者传输的形式的过程又叫序列化。
### 编程实例
在/home/project目录下新建一个源代码文件ReadWriteObject.java。

    import java.io.*;

    public class ReadWriteObject {
    public static void main(String[] args) {
        File file = new File("/home/project/user.file");
        try (ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(file))) {
            //将匿名对象 写入到file中，注意：被写入的对象必须实现了Serializable接口
            objectOutputStream.writeObject(new User("shiyanlou", "password"));
            objectOutputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //读取文件 打开输入流
        try (ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(file))) {
    //            将信息还原为user实例
            User user = (User) objectInputStream.readObject();
            //打印user信息  和上面创建的匿名对象的信息一致
            System.out.println(user.toString());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

    }

    //静态内部类 必须实现Serializable
    static class User implements Serializable {
        private String username;
        private String password;

        public User(String username, String password) {
            this.username = username;
            this.password = password;
        }

        @Override
        public String toString() {
            return "User{" +
                    "username='" + username + '\'' +
                    ", password='" + password + '\'' +
                    '}';
        }
    }
     }

编译运行：

    $ javac ReadWriteObject.java
    $ java ReadWriteObject
      User{username='shiyanlou', password='password'}
## NIO
Java NIO(New IO)发布于 JDK1.4，用于代替 Java 标准 IO 。Java NIO是面向缓存的、非阻塞的IO，而标准IO是面向流的，阻塞的IO。

首先理解 NIO 的重要概念-Buffer（缓冲区）

* NIO 读取或者写入数据都要通过 Buffer
* 通过 allocate()方法分配 Buffer，Buffer 不可实例化，Buffer 是抽象类，需要使用具体的子类，比如 ByteBuffer。
* Buffer 的参数
* - capacity ：缓冲区的容量
* - position ：当前指针位置，没读取一次缓冲区数据或者写入缓冲区一个数据那么指针将会后移一位
* - limit ：限制指针的移动，指针不能读取 limit 之后的位置 ​ - mark ：如果设置该值，那么指针将移动到 0~position 的位置
* - 最后可以这几个参数的关系如下：mark <= position <= limit <= capacity
##编程实例
学习编程的最好方式当然是通过代码来学习，接下来将使用 NIO 来完成的文件的读取和写入操作，同学们可以对比标准 IO 的基本操作理解其不同。

在/home/project/目录下新建源代码文件NioDemo.java

     import java.io.File;
     import java.io.IOException;
     import java.io.RandomAccessFile;
     import java.nio.ByteBuffer;
     import java.nio.channels.FileChannel;
     import java.nio.charset.Charset;
     import java.nio.charset.CharsetDecoder;
     import java.util.Scanner;

     public class NioDemo {
     public static void main(String[] args) {
        try {
            File file = new File("/home/project/nio.txt");
            if (!file.exists()) {
                file.createNewFile();
            }
            //创建channel  nio通过channel来连接文件 相当于桥梁
            FileChannel writeChannel = new RandomAccessFile(file, "rw").getChannel();
            //创建一个ByteBuffer 容量为100
            ByteBuffer byteBuffer = ByteBuffer.allocate(100);
            System.out.println("请输入字符串");
            Scanner in = new Scanner(System.in);
            String s = in.nextLine();
            //将字符串写入到缓冲区
            byteBuffer.put(s.getBytes());
            System.out.println("写入数据后指针变化-position:" + byteBuffer.position() + " limit：" + byteBuffer.limit() + " capacity :" + byteBuffer.capacity());
            //为输出数据做准备 将limit移动到position位置，position置0
            byteBuffer.flip();
            System.out.println("flip后指针变化-position:" + byteBuffer.position() + " limit：" + byteBuffer.limit() + " capacity :" + byteBuffer.capacity());
            //将缓冲区写入channel
            writeChannel.write(byteBuffer);
            //清除缓冲区 为下次写入或者读取数据做准备 恢复到初始状态 position=0 limit=capacity=100  因为我们这里分配的容量大小为100
            byteBuffer.clear();
            System.out.println("clear后指针变化-position:" + byteBuffer.position() + " limit：" + byteBuffer.limit() + " capacity :" + byteBuffer.capacity());
            //关闭channel
            writeChannel.close();
            FileChannel readChannel = new RandomAccessFile(file, "r").getChannel();
            //从channel中将数据读取到缓冲区
            while (readChannel.read(byteBuffer) != -1) {
                //为读取数据做准备
                byteBuffer.flip();
                //输出数据 设置解码器
                Charset charset = Charset.forName("UTF-8");
                CharsetDecoder decoder = charset.newDecoder();
                System.out.println("读取结果：" + decoder.decode(byteBuffer));
                //清除缓冲区
                byteBuffer.clear();
            }
            readChannel.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    }
编译运行

    $ javac NioDemo.java
    $ java NioDemo
    请输入字符串
    shiyanlou
    写入数据后指针变化-position:9 limit：100 capacity :100
    flip后指针变化-position:0 limit：9 capacity :100
    clear后指针变化-position:0 limit：100 capacity :100
    shiyanlou
## 总结
本节内容主要讲解 Java.io 的内容，主要包含以下知识点：

* 文件
* 随机读写
* 文件操作
* 文件拷贝
* 文件属性
* 目录读取
* IO 流
* 字节流
* 字符流
  请大家务必手动完成代码并运行对比结果，才能更好的理解掌握 IO。




