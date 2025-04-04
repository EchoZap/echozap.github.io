# 1.创建密钥对（此方法适用于从未创建过密钥对的本地主机）

在终端输入以下命令:

```shell
ssh-keygen
```

之后一路回车，不出意外的话，看到以下画面，密钥（包含私钥和公钥，公钥以 .pub 结尾）就创建成功了
![ssh-kegen](https://pub-a25b6a83a2d846958fb63f69d07d79a5.r2.dev/ssh-keygen.png)

对于 linux 和类 linux 系统，该密钥存放于 `~/.ssh/` ，可以通过 `ls ～/.ssh` 查看。

# 2.创建多个密钥对

有时候可能会需要多个密钥对，但是又不想影响到之前已创建的密钥对

创建 ed25519 类型的密钥对（最推荐）

```shell
ssh-keygen -t ed25519 -C "这里写注释" -f ~/.ssh/id_ed25519_new_name
```

`ssh-keygen`：这是一个用于生成、管理和转换 SSH 密钥的命令行工具。
`-t ed25519`：指定要生成的密钥类型为 ed25519。这种类型的密钥被认为更安全，并且通常生成更快。
`-C "这里写注释"`：这是一个注释（通常使用邮箱，但是我不喜欢），用于标识这个密钥的用途。
`-f ~/.ssh/id_ed25519_new_name`：指定生成的密钥文件的存储路径和名称。在这里，密钥会被保存为 ~/.ssh/id_ed25519_new_name，私钥为 id_ed25519_new_name，而公钥则为 id_ed25519_new_name.pub。

或者可以创建 rsa 类型的密钥对

```shell
ssh-keygen -t rsa -b 4096 -C "用于163账号的 github" -f ~/.ssh/id_rsa_new
```

### 2.1创建带有密码的密钥对

通过上面的命令创建密钥对时，一路回车不要过快，系统会提示输入一个密码。可以输入一个强密码，确保它是安全的。再次输入相同的密码以确认：

```shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

注意：在输入密码时，终端不会显示任何字符（包括星号），这是正常现象。

如果你忘记了 SSH 密钥的密码，将无法使用该密钥进行身份验证，因为 SSH 并没有提供恢复密码的功能。最简单的解决方案是生成一个新的 SSH 密钥对。

# 3. 配置 `~/.ssh/config` 文件（以 GitHub、Gitee 为例）

为了方便管理不同的 SSH 密钥，可以在 `~/.ssh/config` 文件中为每个密钥配置别名。打开并编辑 `~/.ssh/config` 文件，添加如下内容：

```bash
# 默认 SSH 配置
Host github.com
	HostName ssh.github.com
	User git
	Port 443
	IdentityFile ~/.ssh/id_ed25519_github

# 为另一个服务或项目的 SSH 配置
Host gitee.com
	HostName gitee.com
	User git
	IdentityFile ~/.ssh/id_ed25519_gitee
```

在这个例子中，`Host` 是自定义的别名，用于指定不同的 SSH 密钥。当你使用该别名连接 GitHub 时，会使用 `~/.ssh/id_ed25519_github` 这个密钥。

### 3.1遭遇git clone失败问题
使用以下命令清除之前缓存再次 `git clone`；

```shell
ssh-keygen -R <github.com>
```

`-R` 后面的 hostname 根据实际情况填写

# 4.ssh-agent

如果你在创建密钥对的时候设置了密码，那么及时你讲公钥发送给别人，但是每次 ssh 连接你都需要输入密码，这时候 `ssh-agent` 就可以派上用场了， `ssh-agent` 是一个用于管理 SSH 密钥的后台进程，它的主要作用是保存私钥的解密密钥，以便你在需要使用 SSH 进行身份验证时， **不必每次都输入密码**。

`ssh-agent` 的作用：

- 管理 SSH 密钥：可以将多个 SSH 密钥添加到 ssh-agent 中，它会自动处理这些密钥的解密和身份验证。
- 避免重复输入密码：在会话期间，用户只需输入一次私钥的密码，之后的 SSH 连接将不需要再次输入，直到 ssh-agent 进程终止或密钥被移除。
- 安全性：私钥在本地存储，不会在网络中传输，ssh-agent 仅处理密钥的解密和身份验证。

### 4.1 启动和停止 ssh-agent

- 通常在终端中，你可以通过以下命令启动 ssh-agent：
```shell
eval $(ssh-agent)
```

- 停止 ssh-agent 并清除相应的环境变量：
```shell
eval $(ssh-agent -k)
```

> **注意：** 该缓存只在当前会话有效，也就是说，如果你关闭了终端再重新打开，就得重复该步骤。

### 4.2 添加 SSH 密钥

接下来，可以使用 ssh-add 命令将你的 SSH 密钥添加到 ssh-agent 中：
```shell
ssh-add ~/.ssh/id_ed25519
```
如果你的密钥有密码，系统会提示你输入。输入后，ssh-agent 将缓存该密钥。之后连接你无需再次输入密码。

### 4.3 查看已添加到 ssh-agent 的密钥对

```shell
ssh-add -l
```

### 4.4 删除所有已添加到 ssh-agent 的密钥对

```shell
ssh-add -D
```

### 4.5 删除已添加到 ssh-agent 的特定密钥对

```shell
ssh-add -d /path/to/your/private_key
```