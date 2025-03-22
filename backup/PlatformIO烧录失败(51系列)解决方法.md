## 遭遇问题

***platformIO一直卡在烧录程序中，导致开发版一直处于断电状态***
![问题](https://pub-a25b6a83a2d846958fb63f69d07d79a5.r2.dev/PIO1.png)

## 解决方法

将main.py里的这一行注释即可
![解决1](https://pub-a25b6a83a2d846958fb63f69d07d79a5.r2.dev/PIO2.png)

该文件在以下路径
`~/.platformio/platforms/intel_mcs51/builder/main.py`
![解决2](https://pub-a25b6a83a2d846958fb63f69d07d79a5.r2.dev/PIO3.png)
