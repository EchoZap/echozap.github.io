> [!note]
>
> **注意：** 该脚本仅适用于通过Gmeek项目搭建的博客网站  
>
> 该脚本可以上传任意内容的markdown以及txt文件

# 1.获取github个人Token

- github的个人Token具体获取方法如下：

![img](https://wowpb.pages.dev/file/349f3d72c80b48ba5a3f1.png)

# 2.方法1--sh脚本

使用前准备：

- 系统已安装curl
- 系统已安装jq
- 系统可使用bash

### 2.1配置脚本

1.将第28行的 `<Token>` 替换为上面获取到的值

2.将第30行的 `<OWNER>` 替换为自己的github用户名

3.将第30行的 `<REPO>` 替换为自己的Gmeek博客仓库名，一般是 `xxx.github.io`

```shell
#!/usr/bin/env bash

# 上传主程序
main_upload_program() {
    local file=$1
    local labels=$2

    # 使用 sed 命令从完整路径中提取文件名
    title=$(echo "$file" | sed -e 's/.*\/\(.*\).md/\1/')

    # 获取文章内容
    content=$(sed "" "$file")

    # 将标签转换成 JSON 数组格式
    labels_json=$(echo "$labels" | sed 's/,/","/g' | sed 's/^/["/' | sed 's/$/"]/')

    # 构建 JSON 数据
    json_data=$(jq -n \
    --arg title "$title" \
    --arg body "$content" \
    --argjson labels "$labels_json" \
    '{title: $title, body: $body, labels: $labels}')

    # 发送 POST 请求
    curl -L \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer <Token>" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/repos/<OWNER>/<REPO>/issues \
        -d "$json_data"
}

# 上传单篇文章
upload_a_single_article() {
    read -p "请输入文章完成路径：" file
    read -p "请输入文章标签(多个标签请用,隔开)：" labels

    main_upload_program "$file" "$labels"}

# 批量上传
batch_upload() {
    read -p "请输入要上传的文件目录(绝对、相对路径皆可)：" file_path
    read -p "请输入文章标签(多个标签请用,隔开)：" labels
    for file in "${file_path}"/*.md
    do
        main_upload_program "$file" "$labels"
    done
}


while true;do
    echo " -----Made by Ronan----- "
    echo " 在键盘上按下对应数字即可选择相应设置"
    echo "————————————————————————————————————————————————————"
    echo " 1. 上传单篇文章"
    echo " 2. 批量上传"
    echo " Q. 退出本程序"
    echo
    read -p "请选择一个选项: " status
    case $status in  
        1)
            upload_a_single_article
            break
        ;;
        2)
            batch_upload
            break
        ;;
        q | Q)
            echo "退出"
            exit 0
        ;;
        *)
            echo "无效选项，请重新选择。"
        ;;
    esac
done
```

### 2.2运行脚本

将以上脚本文件保存为 `blog_upload.sh` ，在终端里进入到改脚本所在位置，键入 `chmod 777 blog_upload.sh` ，然后通过 `./blog_upload.sh` 运行，之后根据提示进行即可。


# 3.方法2--py脚本

### 3.1配置脚本

> [!warning]
>
> 请确保python已经安装requests模块，可以通过 `pip3 install requests` 安装

1.将第7行的 `<Token>` 替换为上面获取到的值

2.将第7行的 `<OWNER>` 替换为自己的github用户名

3.将第11行的 `<REPO>` 替换为自己的Gmeek博客仓库名，一般是 `xxx.github.io`

```python
import json
import os
import requests

def upload_data(title, content, labels):

    url = "https://api.github.com/repos/<OWNER>/<REPO>/issues"

    header = {
        "Accept": "application/vnd.github+json" ,
        "Authorization": "Bearer <Token>" ,
        "X-GitHub-Api-Version": "2022-11-28"
    }

    data = {
        "title":title,
        "body":content,
        "labels":labels
    }

    json_str = json.dumps(data)

    status_code = requests.post(url=url, headers=header, data=json_str).status_code

    match status_code:
        case 201:
            print("Created, 上传成功")
        case 400:
            print("Bad Request, 错误请求")
        case 403:
            print("Forbidden")
        case 404:
            print("Resource not found")
        case 410:
            print("Gone")
        case 422:
            print("Validation failed, or the endpoint has been spammed. \n 验证失败，或终结点已收到垃圾邮件。")
        case 502:
            print("Service unavailable, 服务不可用")
  

def get_post():

    status = input("\n 1.上传单篇文章 \n 2.批量上传 \n 按下对应数字并回车可选择相应功能：")

    # 获取标签输入并用,分隔
    labels = input("请输入标签，用,隔开：")

    # 将输入的字符串拆分为列表，并去除每个单词前后的空白字符
    labels = [word.strip() for word in labels.split(',')]

    # 上传单篇文章
    if status == "1" :
        file_path = input("请输入文件路径：")

        # 提取文件名并去除扩展名
        title = os.path.splitext(os.path.basename(file_path))[0]

        # 打开并读取文件内容
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            upload_data(title, content, labels)

    # 批量上传
    elif status == "2" :
        directory = input("请输入目录路径：")

        # 遍历指定目录下的所有文件
        for filename in os.listdir(directory):
            # 检查文件是否以.md结尾
            if filename.endswith('.md'):
                # 获取title ，去掉文件名中的.md扩展名
                title = os.path.splitext(filename)[0]
    
                # 获取content
                file_path = os.path.join(directory, filename)
                # 打开并读取文件内容
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    upload_data(title, content, labels)
    else:
        print("已退出程序...")
        exit

if __name__ == "__main__":
    get_post()
```

### 3.2运行脚本

将以上脚本文件保存为 `blog_upload.py` ，在终端里进入到改脚本所在位置，然后通过以下命令运行，之后根据提示进行即可。

```python
python3 blog_upload.py
```


<!-- ##{"timestamp":1722611382}## -->
