使用以下命令打开；

```zsh
sudo vim /etc/pam.d/sudo
```

出现画面：

![img](https://wowpb.pages.dev/file/87d7666969a963e5c4890.png)

将第一行，也就是这一行

```plain
auth sufficient pam_smartcard.so
```

修改为

```plain
auth sufficient pam_tid.so
```

保存并退出即可