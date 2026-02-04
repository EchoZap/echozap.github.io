# 1.创建密钥对

*此方法适用于从未创建过密钥对的本地主机，创建之前可以通过 `ls ~/.ssh`查看，看到有类似 `id_edxxxx`或者 `id_rsa`即说明已创建，无需重复创建*

在终端输入以下命令:

```shell
ssh-keygen
```

之后一路回车，不出意外的话，看到以下画面，密钥（包含私钥和公钥，公钥以 .pub 结尾）就创建成功了
![ssh-kegen](https://pub-a25b6a83a2d846958fb63f69d07d79a5.r2.dev/ssh-keygen.png)

对于 linux 和类 linux 系统，该密钥存放于 `~/.ssh` ，可以通过 `ls ~/.ssh` 查看。

## 1.1 给密钥起个名字

```shell
ssh-keygen -t ed25519 -C "这里写注释" -f ~/.ssh/github_key
```

`ssh-keygen`：这是一个用于生成、管理和转换 SSH 密钥的命令行工具。
`-t ed25519`：指定要生成的密钥类型为 ed25519（也可以是rsa等等）。
`-C "这里写注释"`：给这个密钥写个备注（通常使用邮箱，但是我不喜欢），方便以后辨认。
`-f ~/.ssh/github_key`：保存位置和名字，私钥叫 `github_key`，公钥叫 `github_key.pub`。

或者可以创建 rsa 类型的密钥对

```shell
ssh-keygen -t rsa -b 4096 -C "这里写注释" -f ~/.ssh/github_key
```

## 1.2 给密钥加个密码

通过上面的命令创建密钥对时，**一路回车不要过快**，系统会提示输入一个密码。可以输入一个强密码，确保它是安全的。再次输入相同的密码以确认：

```shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

注意：在输入密码时，终端不会显示任何字符（包括星号），这是正常现象。

如果你忘记了 SSH 密钥的密码，将无法使用该密钥进行身份验证，因为 SSH 并没有提供恢复密码的功能。最简单的解决方案是生成一个新的 SSH 密钥对。

---

# 2.  配置多个密钥（让系统自动选择）

你创建了多个密钥后，怎么让系统知道用哪个呢？答案是：配置文件！

打开（或创建）配置文件 `~/.ssh/config`，写入：

```bash
# GitHub 使用的密钥
Host github.com
	HostName ssh.github.com
	User git
	Port 443
	IdentityFile ~/.ssh/id_ed25519_github

# Gitee 使用的密钥
Host gitee.com
	HostName gitee.com
	User git
	IdentityFile ~/.ssh/id_ed25519_gitee
```

在这个例子中，`Host` 是自定义的别名，用于指定不同的 SSH 密钥。这样，当你连接 GitHub 时会自动用 `github_key`，连接 Gitee 时自动用 `gitee_key`。

## 2.1遭遇git clone失败问题

使用以下命令清除之前缓存再次 `git clone`；

```shell
ssh-keygen -R <github.com>
```

`-R` 后面的 hostname 根据实际情况填写

---

# 3.让密钥使用更方便：ssh-agent

如果你给密钥加了密码，每次连接都要输入密码很麻烦。`ssh-agent` 可以帮你**只输入一次密码，之后都自动帮你通过**。

`ssh-agent` 的作用：

- 管理 SSH 密钥：可以将多个 SSH 密钥添加到 ssh-agent 中，它会自动处理这些密钥的解密和身份验证。
- 避免重复输入密码：在会话期间，用户只需输入一次私钥的密码，之后的 SSH 连接将不需要再次输入，直到 ssh-agent 进程终止或密钥被移除。
- 安全性：私钥在本地存储，不会在网络中传输，ssh-agent 仅处理密钥的解密和身份验证。

## 3.1 启动和停止 ssh-agent

- 通常在终端中，你可以通过以下命令启动 ssh-agent：
```shell
eval $(ssh-agent)
```

- 停止 ssh-agent 并清除相应的环境变量：
```shell
eval $(ssh-agent -k)
```

> **注意：** 该缓存只在当前会话有效，也就是说，如果你关闭了终端再重新打开，就得重复该步骤。

## 3.2 添加 SSH 密钥

接下来，可以使用 ssh-add 命令将你的 SSH 密钥添加到 ssh-agent 中：
```shell
ssh-add ~/.ssh/id_ed25519
```
如果你的密钥有密码，这时会要求输入一次，之后就不用再输了。

## 3.3 查看已添加到 ssh-agent 的密钥对

```shell
ssh-add -l
```

## 3.4 删除所有已添加到 ssh-agent 的密钥对

```shell
ssh-add -D
```

## 3.5 删除已添加到 ssh-agent 的特定密钥对

```shell
ssh-add -d /path/to/your/private_key
```

---

# 4.如何使用你创建的密钥？

创建好密钥后，你需要把**公钥**（`.pub` 结尾的文件）给到目标平台：

## 查看你的公钥

```shell
cat ~/.ssh/github_key.pub
```

复制输出的内容，粘贴到：

- **GitHub**：Settings → SSH and GPG keys → New SSH key
- **Gitee**：设置 → SSH 公钥
- **你的服务器**：把公钥内容添加到服务器的 `~/.ssh/authorized_keys` 文件中

## 测试连接是否成功

```shell
ssh -T git@github.com
```

看到类似这样的消息就成功了：

```
Hi 你的用户名! You've successfully authenticated...
```



---

# 快速参考

| 任务                    | 命令                                             |
| ----------------------- | ------------------------------------------------ |
| 创建默认密钥对          | `ssh-keygen`                                     |
| 创建命名密钥            | `ssh-keygen -t ed25519 -C "备注" -f ~/.ssh/名字` |
| 查看公钥                | `cat ~/.ssh/你的密钥名.pub`                      |
| 启动 ssh-agent          | `eval $(ssh-agent)`                              |
| 添加密钥到 ssh-agent    | `ssh-add ~/.ssh/你的密钥名`                      |
| 查看 ssh-agent 中的密钥 | `ssh-add -l`                                     |
| 清除 ssh-agent 缓存     | `ssh-add -D`                                     |
| 清除网站连接缓存        | `ssh-keygen -R 网站名`                           |

