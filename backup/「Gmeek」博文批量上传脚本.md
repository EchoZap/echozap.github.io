该脚本仅适用于通过Gmeek项目搭建的博客网站

# 1.使用前准备

- 系统已安装curl
- 系统已安装jq
- 系统可使用bash

以上具体安装步骤可自行百度。此外，还需获取github的个人token，Token具体获取方法如下：

![img](https://wowpb.pages.dev/file/349f3d72c80b48ba5a3f1.png)

# 2.使用方法

## 2.1配置脚本

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

## 2.2运行脚本

将以下脚本文件保存为 `blog_upload.sh` ，在终端里进入到改脚本所在位置，键入 `chmod 777 blog_upload.sh` ，然后通过 `./blog_upload.sh` 运行即可。

<!-- ##{"timestamp":1722611382}## -->