使用方法：将下面代码保存在一个 py 文件中，之后运行即可。  
或者将其[打包为可执行文件](https://blog.ronan.us.kg/article/python%E6%89%93%E5%8C%85%E7%A8%8B%E5%BA%8F/).

```python
# 首先要安装第三方库PyGithub
# 通过 pip install PyGithub进行安装
# 填写下面的 “关键信息”

import os
from datetime import datetime
from github import Github
import pytz

############################## 需要填写的关键信息 ############################
OWNER = ""  # 仓库拥有者，例如 "username"
REPO = ""   # 仓库名称，一般是 "username.github.io"
TOKEN = ""  # GitHub 的个人访问令牌
REPO_PATH = "" # 需要将文章上传到仓库的具体哪个目录，例如上传到仓库根目录'content'下的'article'中，则输入"content/article"
###########################################################################

# 检查用户是否填写了必要信息
if not OWNER or not REPO or not TOKEN or not REPO_PATH:
    raise ValueError("请在文件顶部填写 OWNER、REPO、TOKEN 和 REPO_PATH 的值。")

class HugoBlog:
    def __init__(self, owner, repo, token):
        self.owner = owner
        self.repo = repo
        self.token = token

        g = Github(self.token)
        self.repo = g.get_repo(f"{self.owner}/{self.repo}")

    def create_new_file_in_the_repo(self, file_path, content):
        self.repo.create_file(f"{file_path}", f"Added {file_path}", content, branch="main")

    def get_post_paths(self):
        directory = input("请输入文章目录：")

        file_paths = []
        for filename in os.listdir(directory):
            if filename.endswith('.md') or filename.endswith('.txt'):
                file_path = os.path.join(directory, filename)
                file_paths.append(file_path)
        return file_paths

    def generate_md_front_matter(self, post_path, categories_input, author="Ronan"):
        title = os.path.splitext(os.path.basename(post_path))[0]
        timezone = pytz.timezone('Asia/Shanghai')
        now = datetime.now(timezone)
        formatted_time = now.strftime(f"%Y-%m-%dT%H:%M:%S{now.strftime('%z')}")
        current_time = formatted_time[:-2] + ':' + formatted_time[-2:]
        categories = [cat.strip().capitalize() for cat in categories_input.split(",")]

        front_matter = f"""---
title: "{title}"
date: {current_time}
categories: {categories}
author: "{author}"
---
"""
        return front_matter

    def append_front_matter_to_md_file(self, front_matter, post_path, repo_path):
        dir_name, base_name = os.path.split(post_path)
        file_name, file_ext = os.path.splitext(base_name)
        final_path = f"{repo_path}/{base_name}"

        with open(post_path, "r", encoding='utf-8') as f:
            source_body = f.read()
        final_content = front_matter + source_body

        return final_content, final_path

def main():
    blog = HugoBlog(
        owner=OWNER,
        repo=REPO,
        token=TOKEN
    )

    status = input("\n 1.上传单篇文章 \n 2.批量上传 \n 按下对应数字并回车可选择相应功能：")
    categories_input = input("请输入标签，用,隔开：")

    match status:
        case "1":
            post_path = input("请输入文章路径：")
            front_matter = blog.generate_md_front_matter(post_path, categories_input)
            final_content, final_path = blog.append_front_matter_to_md_file(front_matter, post_path, REPO_PATH)

            blog.create_new_file_in_the_repo(final_path, final_content)
            print(f"{final_path}上传成功！")

        case "2":
            post_paths = blog.get_post_paths()
            for post_path in post_paths:
                front_matter = blog.generate_md_front_matter(post_path, categories_input)
                final_content, final_path = blog.append_front_matter_to_md_file(front_matter, post_path)

                blog.create_new_file_in_the_repo(final_path, final_content)
                print(f"{final_path}上传成功！")

if __name__ == "__main__":
    main()
```
