> typroa的图片上传脚本，针对[Telegraph-Image](https://github.com/cf-pages/Telegraph-Image)项目，适用于macOS和Linux系统。

## 安装json处理器

* macOS

```
brew install jq
```

* Linux：

```
# Debian/Ubuntu
apt install jq -y
```


## 脚本配置

编辑脚本，在以下位置填入你的图床url：

```
# 自定义URL部分
base_url=""
```

> **注意**：网址url后不需要加 / ，因为这可能会报错。就比如我的图床网址是https://wpb.pages.dev，但是在复制时浏览器总会添加https://wpb.pages.dev/，最后的/一定不能要！！！

## Typroa配置

记住脚本的位置，如:

```
～/project/scripts/typora-uploader/upload-image.sh
```

进入Typroa`设置`->`图像`->`上传服务设定`，将上传服务改为`自定义命令`，命令为`脚本路径`：

![img](https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/imgs/typora.png)

记得在插入图片时选择`上传图片`，并勾选`对本地位置的图片应用上述规则`。

## 脚本代码

```shell
#!/bin/bash

# 使用帮助信息
function display_help {
    echo "Usage: $0 [file1] [file2] ... [fileN]"
    echo
    echo "This script uploads images to a specified server and returns their URLs."
    echo
    echo "Options:"
    echo "  --help    Display this help message and exit"
    echo
    echo "Example:"
    echo "  $0 image1.jpg image2.png"
}

# 检查是否需要显示帮助信息
if [[ "$1" == "--help" ]]; then
    display_help
    exit 0
fi

# 自定义URL部分
base_url=""

# 检查是否安装了jq
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq before running this script. "
    echo "You can install jq using the following command:"
    echo "brew install jq [macOS]"
    exit 1
fi

# 用于存储图片URL的数组
image_urls=()

# 循环读取参数
for file_path in "$@"; do
    # 发送上传图片请求，关闭curl输出
    response=$(curl --location --request POST "${base_url}/upload" \
        --header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
        --form "file=@\"${file_path}\"" \
        --silent)  # 添加 --silent 选项以关闭输出

    # 检查请求是否成功
    if [ $? -eq 0 ]; then
        # 解析返回的JSON并拼接图片URL
        img_url="${base_url}$(echo "$response" | jq -r '.[0].src')"

        # 存储图片URL到数组
        image_urls+=("${img_url}")
    else
        # 请求失败，输出错误信息并退出脚本
        echo "Upload Failed"
        exit 1
    fi
done

# 所有请求成功后输出成功信息
echo "Upload Success"

# 输出所有图片URL
for url in "${image_urls[@]}"; do
    echo "${url}"
done
```