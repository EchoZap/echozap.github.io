# 构建第一个Dockerfile

假设该镜像实现的等同于我们在已经配置好python环境的机器上通过`python hello.py`命令来运行一个python脚本

所以该Dockerfile的构建有以下步骤：

1. 在桌面或其他位置新建一个文件夹，假设文件夹名为docker
2. 在docker新建一个hello.py文件，hello.py已经实现所需功能
3. 再在docker新建一个`Dockerfile`，**注意：仅开头且必须大写**

以下是Dockerfile内容：

```shell
FROM python:3.9.19-alpine3.18
COPY hello.py /hello.py
CMD python hello.py
```

## FROM参数解析

FROM为第一项，这是必须的，这是搭建镜像的基础

* `python:3.9.19-alpine3.18`前面的`python`为镜像名称，可到dockerhub按需搜索，如下图

![img](https://wowpb.pages.dev/file/bf1ceb0c58b78986465a5.png)

* `python:3.9.19-alpine3.18`冒号后面的是tag，也就是标签(版本号)。**标签必须与dockerhub镜像里提供的一致，在上图点击所需镜像名称即可看到可用标签。**

![img](https://wowpb.pages.dev/file/bd524210102f218c229d8.png)

## COPY参数解析

`hello.py`是该文件相对于Dockerfile所在目录的相对路径，`/hello.py`是将hello.py复制到镜像根目录下(也可以根目录下的其他目录)

本例中因为只有hello.py一个文件，所以可以使用`COPY hello.py /hello.py`

如果有多个文件一般使用

```shell
COPY . .
```

该命令表示将当前目录下所有文件复制到镜像目录

## CMD参数解析

即类似在本地机器终端输入的指令

---

# 查看镜像目录

```shell
docker images
```

这将显示以下内容

![img](https://wowpb.pages.dev/file/78aa59e6baf4b2597a390.png)

其中的`TAG`是镜像的版本号，如不指定版本，默认是latest。如需指定版本，可以在构建镜像时在其名字后面加上冒号和版本号。

---

# 删除本地镜像

```plain
docker rmi <IMAGE ID>
```

也许你会遇到以下情况

![img](https://wowpb.pages.dev/file/b300a5746b51b634d89f3.png)

这个错误表明 Docker 镜像 <f96455e9c93d> 正在被一个已停止的容器 <49504893944e> 使用，因此不能直接删除。

1. 删除相关容器后再删除镜像：你可以先删除使用该镜像的容器，然后再尝试删除镜像。

```plain
docker rm <49504893944e> 
docker rmi <f96455e9c93d> 
```

1. 强制删除镜像：如果你确定要删除该镜像并且不再需要与之关联的任何容器，可以使用 -f 参数来强制删除该镜像。

```plain
docker rmi -f <f96455e9c93d> 
```

---

# 构建镜像(image)

```zsh
docker build -t <images_name> <dir_path>
```

`dir_path`是Dockerfile所在文件夹路径，`images_name`是镜像名称。

---

# 运行镜像

```shell
docker run <images_name>
```
