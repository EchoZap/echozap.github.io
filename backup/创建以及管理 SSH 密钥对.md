
# 快速参考

| 任务                    | 命令                                             |
| ----------------------- | ------------------------------------------------ |
| 创建默认密钥对          | `ssh-keygen`                                     |
| 创建自定义密钥对                | `ssh-keygen -t ed25519 -C "备注" -f ~/.ssh/名字` |
| 查看公钥                | `cat ~/.ssh/你的密钥名.pub`                      |
| 查看当前系统密钥对 | `ls ~/.ssh`                     |
| 清除网站连接缓存   | `ssh-keygen -R 网站名`                           |

---

# 查看系统已有密钥对

```shell
ls ~/.ssh
```

---

# 创建密钥对

*创建之前必须通过 `ls ~/.ssh`查看，看到有类似 `id_edxxxx`或者 `id_rsa`即说明已创建，无需重复创建，否则原有密钥可能被重写覆盖，造成意想不到的后果*

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

