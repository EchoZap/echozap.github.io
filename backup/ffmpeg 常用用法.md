## 不改变原视频码率裁剪
### 废话少说，直接举栗🌰
1.从 `1时15分25秒` 开始裁剪到视频结束： 
```shell
ffmpeg -i input.mp4 -ss 01:15:25 -c copy output.mp4
``` 

2.从 `视频开始到15分5秒` ：
```shell
ffmpeg -i input.mp4 -to 00:15:05 -c copy output.mp4
```  

3.从 `15分25秒` 到  `1时15分25秒` ：
```shell
ffmpeg -i input.mp4 -ss 15:25 -to 01:15:25 -c copy output.mp4
``` 
  
`-i` 指定输入视频路径，`input.mp4`是要裁剪的视频文件的路径， `-ss` 裁剪视频起始时间，`-to` 裁剪视频结束时间，`-c copy` 在裁剪时不改变视频编码，从而保持原始视频码率， `output.mp4` 为裁剪后的视频文件。

---

## 不改变原视频码率合并

> 前提：确保两条视频的格式、分辨率、帧率等一致。如果不一致，可能会导致合并时出现问题。你可以通过 `ffmpeg` 命令来检查视频的属性。

假设你有两条视频文件 `video1.mp4` 和 `video2.mp4`，并且你希望将它们合并。

#### 1. 创建一个文件列表
创建一个文本文件 `filelist.txt`，内容如下：

```shell
file 'video1.mp4'
file 'video2.mp4'
```

#### 2. 使用 `ffmpeg` 合并视频
使用 `ffmpeg` 命令合并视频，并且不改变原视频的码率数据：

```bash
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

**解释**：
- `-f concat`：指定使用 concat 模式来合并视频。
- `-safe 0`：允许使用不安全的文件路径。
- `-i filelist.txt`：指定包含视频文件列表的文本文件。
- `-c copy`：告诉 `ffmpeg` 直接复制视频和音频流，而不重新编码，从而保留原始视频的质量和码率。
- `output.mp4`：输出合并后的文件名。

**注意事项**：
1. 合并的视频必须有相同的编码格式、分辨率和帧率。如果不相同，你可以先进行格式统一。
2. 如果视频的音频编码不同，也有可能需要做音频的统一处理。

---

## 提取MP4音频并保存为MP3

```shell
ffmpeg -i input.mp4 -vn -acodec libmp3lame -ar 44100 -ac 2 -ab 192k output.mp3
```

**解释**：
- -i input.mp4：指定输入的 MP4 文件。
- -vn：不处理视频流，仅提取音频。
- -acodec libmp3lame：使用 libmp3lame 编解码器将音频编码为 MP3 格式。
- -ar 44100：设置音频采样率为 44.1kHz。
- -ac 2：设置音频通道为 立体声（2 通道）。
- -ab 192k：设置比特率为 192 kbps。
  
output.mp3 是提取的 MP3 音频文件名，可以根据需要更改输出文件名。  
运行命令后，音频文件就会被提取并保存为 MP3 格式。


