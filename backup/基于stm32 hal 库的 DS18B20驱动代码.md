使用方法：   

1.将下面的  DS18B20.c 放入你从 CubeMX 导出的工程的 ../Core/Src 目录中       
2.将 DS18B20.h 放入 ../Core/Inc 目录中  
3.在 Cube 中将要使用的引脚设置标签别名为 `DS18b20`  

[「点我获取DS18B20.c、DS18B20.h代码」](https://gist.github.com/EchoZap/82ed2fcdea7508d8e135ae30d052f609)

调用DS18b20驱动函数：  
在main.c中合适的位置处添加 #include "ds18b20.h":

```c
/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
 
#include "ds18b20.h"
 
/* USER CODE END Includes */
```

定义一个浮点型的变量，用于存放温度数据

```c
/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
 
float Temp = 0;
 
/* USER CODE END PD */
```

在main函数中初始化ds18b20

```c
/* Initialize all configured peripherals */
   MX_GPIO_Init();
   MX_USART1_UART_Init();
/* USER CODE BEGIN 2 */
 
   DS18B20_Init();
 
/* USER CODE END 2 */
```

 在while(1)中调用温度读取函数

```c
  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
		Temp = DS18B20_GetTemp_SkipRom();
		HAL_Delay(1000);
    /* USER CODE END WHILE */
 
    /* USER CODE BEGIN 3 */
  }
```