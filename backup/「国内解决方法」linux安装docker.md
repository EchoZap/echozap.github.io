# 1.安装Docker

一键安装命令

```zsh
sudo curl -fsSL https://github.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh | bash -s docker --mirror Aliyun
```

> 备用（如果Github访问不了，可以使用以下命令）

```zsh
sudo curl -fsSL https://gitee.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh | bash -s docker --mirror Aliyun
```

```zsh
sudo curl -fsSL https://app.ronan.us.kg/linux_install_docker.sh | bash -s docker --mirror Aliyun
```

# 2.镜像拉取
以下命令二选一，拉取失败则切换命令：

```zsh
bash -c "$(curl -sSLf https://xy.ggbond.org/xy/docker_pull.sh)" -s 完整镜像名
```

```zsh
bash -c "$(curl -sSLf https://app.ronan.us.kg/docker_pull.sh)" -s 完整镜像名
```