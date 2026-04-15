在终端cd到singbox内核所在目录，建议将面板文件（UI）和config.json和内核放到同一目录下。

开启singbox
```
sudo nohup ./sing-box run -c config.json &> sing-box.log &
```

关闭singbox
```
sudo pkill sing-box
```

使用控制面板，需要在[metacubexd](https://github.com/MetaCubeX/metacubexd/releases)下载想要版本的「compressed-dist.tgz」，里面是网页静态文件。下载后解压并将目录重名为ui，将其移到singbox内核同一目录下。在config.json的 "experimental"->"clash_api"里添加👇，开启内核后可在浏览器通过http://127.0.0.1:9090/ui访问本地面板：

>    "external_controller": "127.0.0.1:9090",
      "external_ui": "ui",
      "secret": "",

如果是第一次使用裸核运行可能会出现已经开启内核但是上不了网，那就需要把 macOS 的系统代理手动指向 sing-box 监听的 7890 端口。（ GUI 版本会自动执行）为什么是7890？因为你在inbounds里指定了（也可是其他，行业惯例都是7890）

> {
  "type": "mixed",
  "listen": "127.0.0.1",
  "listen_port": 7890
}

操作方法：打开新的终端窗口，输入以下内容回车即可，再次重启singbox内核
```
sudo networksetup -setwebproxy Wi-Fi 127.0.0.1 7890
sudo networksetup -setsecurewebproxy Wi-Fi 127.0.0.1 7890
sudo networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 7890
```


