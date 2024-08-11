## 遭遇问题
​***platformIO一直卡在烧录程序中，导致开发版一直处于断电状态***
![问题](https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/imgs/question.png)


## 解决方法

将main.py里的这一行注释即可
![解决1](https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/imgs/method1.png)


该文件在以下路径
`~/.platformio/intel_mcs51/builder/main.py`
![解决2](https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/imgs/method2.png)
