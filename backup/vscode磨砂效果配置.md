## 1.安装插件

[[Apc Customize UI++ ](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension)](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension)

## 2.下载图片

![Noisefigure](https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/imgs/noisefigure.png)

## 3.配置文件

在vscode的`.settings.json`中键入以下配置，**注意：** 将`/Users/einson/Pictures/vscbg/Noisefigure.png`修改为自己的文件路径

```json
"apc.stylesheet": {
    "body": {
        "background-image": "url(/Users/einson/Pictures/vscbg/Noisefigure.png), linear-gradient(to top,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
        "background-size": "cover",
        "background-blend-mode": "multiply",
        "background-repeat": "no-repeat",
        "opacity": 0.89
    },
}
```

## 4.意想不到的问题(无问题可忽略)

有可能最终配置效果不尽人意，所以在这里可以安装一款字体(可选)，在vscode的`.settings.json`键入以下内容。

[[Cascadia Code](https://github.com/microsoft/cascadia-code/releases)](https://github.com/microsoft/cascadia-code/releases)

```json
"editor.fontFamily": "Cascadia Code Light, OperatorMono Nerd Font, Monaco, 'Courier New', monospace",
```