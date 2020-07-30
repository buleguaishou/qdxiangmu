## 一、下载和安装

[下载git](https://git-scm.com/download/win)

## 二、安装-启动git

> Mac 本  打开终端

> windows本    开始 => git文件 => 
>
> a. git bash    支持linux命令的 shell
>
> b. git cmd    支持windows命令的shell（垃圾）
>
> c. git gui        可视化界面（难用）

## 三、git和github

1. git shell 命令行客户端工具
2. github 全球最大的一个开源社区，版本仓库网站。[github官网](https://github.com/)
3. [gitee](https://gitee.com/) 国内一个Git的代码托管和研发协作平台。(都去注册账号)

## 四、git操作

1. 进入当前目录

```bash
$ cd 路径
```

2. 当前目录的初始化（设置文件夹选项，显示隐藏文件）

```bash
$ git init
```

>  出现了一个.git文件，这个文件是当前仓库的配置文件，里面存储着，当前项目，进行版本控制的一切信息。
>
> 第二个事情，在本地建立一个虚拟仓库。

![image-20200728112454426](/Users/tianyufei/Library/Application Support/typora-user-images/image-20200728112454426.png)

3. 注册账号完成以后，在你的账号下，去建立一个远程仓库
4. 在本地的git上，设置你的账户和用户名

```bash
$ git config --global user.name '你的git名称'
$ git config --global user.email '你github登陆的邮箱地址'
```

5. 工作区 上传到 暂存区

```bash
$ git add * / git add . / git add 文件名字
$ git commit -m 'first commit'  这一次提交的描述信息
```

6. 查看暂存区和工作区提交状态

```bash
$ git status
```

7. 查看工作区和暂存区，文件的变化

```bash
$ git diff
```

8. 查看历史版本

```bash
$ git log
```

9. 版本回滚

```bash
$ git reset --hard HEAD^    回到上一个版本
$ git reset --hard HEAD^^   回到上上一个版本
$ git reset --hard 版本号
```

10. 配置一个文件 **.gitignore** 

> 在这个文件中缩写的路径，都是我们要忽略的文件。

11. 暂存区提交数据到远程仓库去

```bash
$ git remote add origin 仓库地址.git
$ git push -u origin master
```

> push以后，有可能会要求大家输入账户和密码（github的账户和密码）。

12. 必须先生成ssh密匙，是在你的电脑上生成，配置到github配置项中

```bash
$ ssh-keygen -t rsa -C '邮箱@gmail.com'
```

> 用户文件夹中查找 => .ssh/id_rsa.pub 复制其中密匙
>
> 在github或者gitee的用户配置项中添加ssh密匙



## 五、如果已经提交成功了

1. git add *
2. git commit -m ''
3. git push

## 六、创建分支

```bash
$ git branch (branchname)
$ git branch  //列出分支
```

> 一般情况下，我们在新增内容的时候，不要在主分支上在原程序做任何修改，我们可以先去创建一个分支，
>
> 如果在分支开发没有问题以后，再将分支的内容合并到主分支上去。
>
> 还可以用于：Bug修复 新开发功能  调试...

## 七、切换分支

```bash
$ git checkout branchname
```

> 快捷方式

```bash
$ git branch (branchname) -b  //创建分支，切换分支
```

## 八、合并分支

```bash
$ git merge (branchname)
```

## 九、提交到远程仓库去

```bash
$ git push --set-upstream origin bbb
```

## 十、删除分支

```bash
$ git branch -d (branchname)
```

## 十一、克隆（第一次拉去程序到本地）

```bash
$ git clone 仓库地址.git
```

## 十二、更新你当前的项目版本到最新版本

```bash
$ git pull
```



## PS：如果出现一些问题，首先不要慌，

1. 查看报错信息，从报错信息中查看官方提示的解决方案  
2. 百度一哈  google一哈(自备梯子)