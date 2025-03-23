---
title: LED and KEY
description: LED和KEY的配置
sidebar_position: 2
tags: 
- STM32
---

# 点亮第一个灯

**<u>Tips:下载程序之后一定要按复位键</u>**

当在STMcube上面建工程之后 我们还需要在while（1）里面写程序才能让灯亮

`HAL_GPIO_WritePin(GPIOA, GPIO_PIN_4|GPIO_PIN_5, GPIO_PIN_RESET);`

这个函数就是读引脚的高低电平的

主函数里面写如此就可以让LED交替闪烁

```C
  while (1)
  {
    /* USER CODE END WHILE */
		HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_4|GPIO_PIN_5);
		HAL_Delay(100);
    /* USER CODE BEGIN 3 */
  }
```

实现跑马灯：

```c
while(1)
{
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_1);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_2);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_3);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_4);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_6);
	HAL_Delay(200);
	HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_7);
	HAL_Delay(200);    
}
```

使用翻转HAL库函数让每个灯嗝相同时间翻转一次，即可实现跑马灯效果



if写法：

```c
if(HAL_GPIO_ReadPin(GPIOA,GPIO_PIN_1) == GPIO_PIN_RESET)
			{
				HAL_Delay(100);
				HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_4);
			}
```

# 按键操作
## 一、基本原理

■ 按键信号的识别:一般来说，按键的两个引脚的一端通过电阻上拉到高电平，另- -端则接地。 在没有按键按下的时候，输入引脚为高电平， 当有按键按下，输入引脚则为低电平。 通过反复读取按键输入引脚的信号，然后识别高低电平来判 断是否有按键触发。
■ 为什么去抖动:按键的输入引脚有低电平产生不代表一定 是 有按键按下，也许是干扰信号，因此，需要通过去抖动处理， 将这些干扰信号过滤，从而获得真实的按键触发信号。 ■ 如何去抖动:首次检测到按键输入引脚有低电平后，稍作延 时，再次读取该引脚，如还是低电平，则确认为按键触发信 号; 否则，判断为干扰信号，不予处理。

**按键原理图：**
![1](../../../static/STM32/LED%20and%20%20KEY/1.png)
## 二、设置按键的模式
![2](../../../static/STM32/LED%20and%20%20KEY/2.png)
选择拉高

## 三、按键程序：
```c
void KEY_Scanf()  
{  
    if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_0) == GPIO_PIN_RESET)  
    {  
        Delay(1000);  
        /*按键1让第一个灯亮（不知道为啥第二个灯也亮了）然后按一下亮一下 begin1*/  
        if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_0) == GPIO_PIN_RESET)  
        {  
            HAL_GPIO_TogglePin(GPIOA,GPIO_PIN_1);  
            while(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_0) == GPIO_PIN_RESET);  
        }  
    }  
    /*end1*/  
    /*按键2控制第二个灯亮也是按一下亮一下 begin2*/  
    if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_1) == GPIO_PIN_RESET)  
    {  
        Delay(1000);  
        if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_1) == GPIO_PIN_RESET)      
        {  
		//  while(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_1));   
		//  HAL_GPIO_TogglePin(GPIOA,GPIO_PIN_3);  
            HAL_GPIO_TogglePin(GPIOA,GPIO_PIN_3);  
            while(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_1) == GPIO_PIN_RESET);  
        }  
    }  
    /*end2*/  
    /*按键3控制，当按键三按下的时候前两个灯都关闭（即为总开关） begin3*/  
    if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_3) == GPIO_PIN_RESET)  
    {  
        Delay(1000);  
        if(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_3) == GPIO_PIN_RESET)  
        {  
            HAL_GPIO_WritePin(GPIOA, GPIO_PIN_1|GPIO_PIN_3, GPIO_PIN_SET );  
            while(HAL_GPIO_ReadPin(GPIOE,GPIO_PIN_3) == GPIO_PIN_RESET);  
        }  
    }  
    /*end3*/  
}
```
类似于15中按键的程序，同样需要消抖处理再判断一次，独立按键就只用判断两次就行。矩阵按键涉及按键的扫描。