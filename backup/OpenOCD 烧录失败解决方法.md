# 在烧录时遇到如下问题：

```shell
❯ openocd -f interface/stlink-v2.cfg -f target/stm32f1x.cfg -c "program /path/project/build.bin verify reset exit 0x08000000" 
                                                                                                             
openocd -f interface/stlink-v2.cfg -f target/stm32f1x.cfg -c "program build/final.bin verify reset exit 0x08000000"
Open On-Chip Debugger 0.12.0
Licensed under GNU GPL v2
For bug reports, read
       http://openocd.org/doc/doxygen/bugs.html
WARNING: interface/stlink-v2.cfg is deprecated, please switch to interface/stlink.cfg
Info : auto-selecting first available session transport "hla_swd". To override use 'transport select <transport>'.
Info : The selected transport took over low-level target control. The results might differ compared to plain JTAG/SWD
Info : clock speed 1000 kHz
Info : STLINK V2J45M30 (API v2) VID:PID 0483:374B
Info : Target voltage: 3.269241
Warn : UNEXPECTED idcode: 0x1ba01477
Error: expected 1 of 1: 0x2ba01477
in procedure 'program'
** OpenOCD init failed **
shutdown command invoked
make: *** [flash] Error 1
```

---

# 解决方法
在  /opt/homebrew/Cellar/open-ocd/0.12.0_1/share/openocd/scripts/target（根据自己安装 OpenOCD 的位置查找，通过 brew 安装的就在这个位置）找到符合自己单片机型号的 cfg 文件，例如 stm32f1x.cfg 。在其中找到关于 `jtag scan chain` 的设置，也就是类似下面：

```shell
#jtag scan chain
if { [info exists CPUTAPID] } {
set _CPUTAPID $CPUTAPID
} else {
if { [using_jtag] } {
# See STM Document RM0008 Section 26.6.3
set _CPUTAPID 0x3ba00477
} {
# this is the SW-DP tap id not the jtag tap id
set _CPUTAPID 0x1ba01477
# set _CPUTAPID 0x2ba01477
}
}
```

将 `this is the SW-DP tap id not the jtag tap id` 设置项里的 `set _CPUTAPID` 后面的 `id` 修改为报错信息里的 `Error：expected 1 of 1: 0x2ba01477` 期望的 id （也就是将 **0x1ba01477** 改为 **0x2ba01477**）。
