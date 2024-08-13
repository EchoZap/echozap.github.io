# 1. 导入以前的文章
如需修改发布时间，可以在文章最后一行添加如下代码。里面的时间是采用时间戳的形式，可以用如下 [网站](https://tool.lu/timestamp) 转换。

```
<!-- ##{"timestamp":1490764800}## -->
```

# 2. 自定义单篇文章参数
自定义单篇文章页面的style和script

```
<!-- ##{"style":"<style>#postBody{font-size:20px}</style>"}## -->
```

```
<!-- ##{"script":"<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script>"}## -->
```

# 3. 多种自定义参数
可同时一起添加多种自定义参数：

```
<!-- ##{"script":"<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script>","style":"<style>#postBody{font-size:20px}</style>","timestamp":1490764800}## -->
```

#4. 自定义全局文章参数
添加全局文章页面的style和script，在config.json文件中添加

```
"style":"<style>#postBody{font-size:20px}</style>",
"script":"<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script>",
```

# 5. 置顶博客文章
只需要「Pin issue」即可。

# 6. utteranc报错
如果在评论里面登录后评论报错，可直接按照提示安装utteranc app即可

```
Error: utterances is not installed on xxx/xxx.github.io. If you own this repo, install the app. Read more about this change in the PR.
```

# 7. 删除文章
只需要「Close issue」或者「Delete issue」后，再手动全局生成一次即可。


<!-- ##{"timestamp":1722598446}## -->