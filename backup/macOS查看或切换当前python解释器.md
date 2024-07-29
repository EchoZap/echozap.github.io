# 查看系统中所有安装的 Python 解释器
```
which -a python python3
```
这会列出系统路径中找到的 python 和 python3 解释器的位置:
```
❯ which -a python python3

python not found
/usr/bin/python3
/opt/homebrew/bin/python3
```
`-a` 选项确保显示所有匹配的路径，而不仅仅是第一个。



# 确定系统上当前正在使用的 Python 解释器
```
which python
which python3
```
这将显示出系统当前 python 和 python3 命令指向的实际路径。



# 切换系统上当前正在使用的 Python 解释器
有以下几种方式，根据需要选择
## 1.更新 PATH 环境变量
根据你使用的 Shell 类型，打开相应的配置文件。例如，对于 zsh 用户，编辑 ~/.zshrc 文件；对于 bash 用户，编辑 ~/.bash_profile 或 ~/.bashrc 文件。  
确保 /usr/bin 在 PATH 变量中位于其他 Python 解释器路径之前。例如，将 /usr/bin 放在最前面：
```
export PATH="/usr/bin:/opt/homebrew/bin:$PATH"
```
**注意：在这行之后不能有任何关于`/opt/homebrew/bin:$PATH`的环境变量设置，先后顺序不能乱，因为shell配置文件从上往下执行。如果不，则切换设置不生效**


## 2.使用 alias 命令
在~/.zshrc 或 ~/.bashrc 中添加以下设置
```
alias python3='/usr/bin/python3'
```
根据需要可以将`/usr/bin/python3`更换为所需。
