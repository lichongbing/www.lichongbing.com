---
title: 自建邮件服务器域名解析设置(A与MX记录)
abbrlink: 33963
date: 2019-12-19 11:16:47
tags:
img: 'http://lcbupayun.test.upcdn.net/IMG_4624.jpg'
---
# 自建邮件服务器域名解析设置(A与MX记录)
## 前言
如果域名没有做解析，只能用于内网收发邮件。要想实现与外网邮箱的收发，需要做域名解析。是在“域名解析后台”进行设置（域名提供商提供“域名解析后台"）。

1. 域名的申请
   目前在国内提供域名申请的服务商很多，下面列表常见的服务商以供考。万网，新网 ，商务中国
   有关域名的申请可以请见各网站的相关说明，在此就不作详细说明。域名一般是每年是要缴一定的服务费的。
2. 域名的设置
   下面我们以万网 为例来讲述设置的全过程，其他的域名服务商的所提供域名设置与此类似。
   万网的域名设置

## A. 域名与固定 IP 地址的设置


1）登录万网账户进入【控制台】
![wKioL1kaqZyioiEYAAN9LmC_KW4068.png](http://lcbupayun.test.upcdn.net/static/6476d42875fb8b3838c54f3db06dfded.png)
2） 在管理后台找到【域名】菜单
![wKiom1kaqZ3CCxHdAACYsWOAfCA642.png](http://lcbupayun.test.upcdn.net/static/fed524b51b5f011224924728b5890b82.png)
3） 在“增加新记录”下增加 MX 记录，类型选择 MX记录，值可以填写主机名，也可以填写你的固定的 IP 地址。我们这里填写主机名：mail.chinaumail.com, 优先级设置为5
![wKioL1kaqZ3CDLnlAABlH0Ss4yI499.png](http://lcbupayun.test.upcdn.net/static/66b361dd8606bfe72014493f68115a1e.png)
说明：值的最后有一个点，代表主机名结束。在有些域名服务商网站设置的时候不会自动帮您加上，如果漏掉的话 DNS 服务器在解析的时候，会自动并上你的域名，这样会引起解析错误。
4） 如果 MX 记录设置的值为主机名或是域名，则需要增加对应的 A 记录。例如我们MX记录的值设置的是 mail.chinaumail.com 则需要增加一条相应的 A 记录。
![wKiom1kaqZ2w4vUfAABQPw7os0o166.png](http://lcbupayun.test.upcdn.net/static/885d85fa5bd8b131632b5e9772137c38.png)
5） 对于某些客户需要用客户端来收发邮件，建议增加pop,smtp,imap记录。增加完毕，可以在记录列表中看到设置的MX记录和A记录。
![wKioL1kaqZ3TePfBAACHPmjJgM4958.png](http://lcbupayun.test.upcdn.net/static/0bd5b6ae89f43471e15f2c269d8c335b.png)
## B. 域名与动态域名的配合
1） 登录万网账户进入【控制台】
![wKiom1kaqZ_xBUHSAAN9LmC_KW4547.png](http://lcbupayun.test.upcdn.net/static/6476d42875fb8b3838c54f3db06dfded.png)
2）在管理后台找到【域名】菜单
![wKioL1kaqZ_Q0ZEYAACYsWOAfCA037.png](http://lcbupayun.test.upcdn.net/static/fed524b51b5f011224924728b5890b82.png)
3） 在“增加新记录”下增加 MX 记录，类型选择MX记录,值可以填写动态域名 umailtest.vicp.net，优先级一般设置为5。
![wKiom1kaqaDw6le-AABo15MG_xs120.png](http://lcbupayun.test.upcdn.net/static/ca804bffd9c76d7bd0d0c9557dd5994d.png)
**说明**：值的最后有一个点，代表主机名结束。在有些域名服务商网站设置的时候不会自动帮您加上，如果漏掉的话 DNS 服务器在解析的时候，会自动并上你的域名，这样会引起解析错误。
4） 万网还提供了主机名可以指向到一个别名（CNAME 记录），这时我们可以设置一个主机名 mail.chinaumail.com ，指向到动态域名umailtest.vicp.net 。
![wKioL1kaqaCQ2FtxAABYcIRT8lc322.png](http://lcbupayun.test.upcdn.net/static/f19ac02a6036fdf8f5c010ba21e3e2ed.png)
5）对于某些客户需要用客户端来收发邮件，建议增加pop,smtp,imap记录。增加完毕，可以在记录列表中看到设置的 MX 记录和 CNAME 记录。
![wKioL1kaqaCSTpfzAACT7IHv4Rw137.png](http://lcbupayun.test.upcdn.net/static/d385691c51f754079a7f52d075fc277b.png)

正确安装设置完 U-Mail邮件系统。 并对 Internet 开放 SMTP 25 ， POP3 110 ， Webmail 80 等端口（经过路由的需要做端口映射），您的邮件服务器就可以正常使用了。
**注意**：

    1. 域名的 MX 或 A 记录设置后一般需要 12-24小时才能生效，各域名服务商的更新时间不完全一样，所以生效时间也不一样。
    下面的安装和设置过程中，我们假定域名设置已经生效。用户在域名设置没有生效前，可以在需要填写主机名的位置，暂时使用你的 IP 地址或动态域名地址来代替换。
    2. 在下面的设置过程中我们umailtest.vicp.net和 mail.chinaumail.com作为例子，用户在实际运用中可以根据自己的实际情况，来设置确
    定要申请的域名，并以新申请的域名来设置邮件系统。
    
