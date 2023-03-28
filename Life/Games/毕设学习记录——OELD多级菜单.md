---
title: 毕设学习记录1😍
description: 关于毕设调试过程中的学习
sidebar_position: 7
author: 啵贝琴
date: 23-3-28 14:39
keywords:
- 毕设
tags: 
- 毕设
---

# 一、起因和以及我想要的效果🥺

> 我最先是怕自己的工作量不够，然后捏，我又在网上看到他们有OLED的多级菜单操作，我说这个炫酷啊，我要整我要整。

> 效果：就是我可以使用按键进行页面的切换，就像是小时候的那种老年机的样子，摁一下“下”光标就往下移动，然后还有“enter”键；返回操作。

# 二、代码的实现

对于我这个小菜，我肯定会寻求网络的帮助，我之前也没有搞过这个效果，于是我直接：CSDN启动！我看了许多个帖子，最后大多是用**利用函数结构体和函数体指针可以实现多级菜单的显示和按键调参**

大概的思路就是：先定义一个结构体，然后再定义一个相应的结构体数组,最后再进行每一个数组需要执行的函数书写，再结合按键，就OK噜！

# 三、代码的含义解读

我是直接写了一个OLED_Index.c和一个OLED_Index.h文件来打包我的OLED多级菜单

> OLED_Index.h(**特别重要的地方就是那个结构体**)
```c
#ifndef _OLED_INDEX_H
#define _OLED_INDEX_H

#include "main.h"

typedef struct
{
     unsigned char current;//当前状态索引号
     unsigned char up;//上键
     unsigned char down;//下键
     unsigned char enter;//确认键
     void (*current_operation)();
} key_table;

void fun0(void);
void fun1(void);
void fun2(void);
void fun3(void);
void fun4(void);
void fun5(void);
void fun6(void);
void fun7(void);
void fun8(void);

extern void (*current_operation_index)();

extern key_table table[30];

#endif
```
> OLED_Index.c
```c
#include "OLED_Index.h"

extern unsigned char string_U[30];
extern unsigned char string_I[30];
extern unsigned char string_P[30];

extern u16 ina220_data[3];//电压、电流、功率
extern u8 func_index;//主页
extern u8 adj_down,adj_up;//-、+
extern u8 oled_on;

u8 QC_handshake=0;//QC握手成功标志
u8 QC2_voltage[4]={5,9,12,20};//QC2.0目标电压列表
u8 voltage_num=0;//QC2.0电压序号
u16 QC3_voltage;//QC3.0目标电压

u8 Target_voltage;

void (*current_operation_index)();

//显示功率
void Show_power(u8 x,u8 y)
{
	sprintf((char*)string_P,"P:%.2fW ",ina226_data.Power_Val);
	OLED_ShowString(0,4,(uint8_t*)string_P);
}

//显示电压
void Show_voltage(u8 x,u8 y)
{
	sprintf((char*)string_U,"U:%.2fV ",ina226_data.voltageVal*0.001f);
	OLED_ShowString(0,0,(uint8_t*)string_U);
}

//显示电流
void Show_current(u8 x,u8 y)
{
	sprintf((char*)string_I,"I:%.2fA ",ina226_data.Shunt_Current*0.001f);
	OLED_ShowString(0,2,(uint8_t*)string_I);
}

//显示固定菜单
void Index_HomePage(void)
{
	/*返回到主页，即自由测量模式*/
	OLED_ShowChar(20,0,'H');
	OLED_ShowChar(28,0,'o');
	OLED_ShowChar(36,0,'m');
	OLED_ShowChar(42,0,'e');
	OLED_ShowChar(50,0,'P');
	OLED_ShowChar(58,0,'a');
	OLED_ShowChar(66,0,'g');
	OLED_ShowChar(74,0,'e');
	/*QC诱骗模式*/
	OLED_ShowChar(20,2,'Q');
	OLED_ShowChar(28,2,'C');
	OLED_ShowChar(36,2,'_');
	OLED_ShowChar(42,2,'D');
	OLED_ShowChar(50,2,'e');
	OLED_ShowChar(58,2,'c');
	OLED_ShowChar(66,2,'o');
	OLED_ShowChar(74,2,'y');
	/*返回到上一级*/
	OLED_ShowChar(20,4,'R');
	OLED_ShowChar(28,4,'e');
	OLED_ShowChar(36,4,'t');
	OLED_ShowChar(42,4,'u');
	OLED_ShowChar(50,4,'r');
	OLED_ShowChar(58,4,'n');
}

//选中的菜单位置[]
void show_brackets(u8 func_index)
{
	switch(func_index)
	{
	case 1:
		OLED_ShowChar(0,0,'-');
		OLED_ShowChar(8,0,'>');
		break;
	case 2:
		OLED_ShowChar(0,2,'-');
		OLED_ShowChar(8,2,'>');
		break;
	case 3:
		OLED_ShowChar(0,4,'-');
		OLED_ShowChar(8,4,'>');
		break;
	default:break;
	}
}

//显示固定菜单-->选择快充诱骗之后的二级界面
void Index_QC_Page(void)
{
	/*QC2.0*/
	OLED_ShowChar(20,0,'Q');
	OLED_ShowChar(28,0,'C');
	OLED_ShowChar(36,0,'2');
	OLED_ShowChar(42,0,'.');
	OLED_ShowChar(50,0,'0');
	/*QC3.0*/
	OLED_ShowChar(20,2,'Q');
	OLED_ShowChar(28,2,'C');
	OLED_ShowChar(36,2,'3');
	OLED_ShowChar(42,2,'.');
	OLED_ShowChar(50,2,'0');
	/*返回上一级*/
	OLED_ShowChar(20,4,'R');
	OLED_ShowChar(28,4,'e');
	OLED_ShowChar(36,4,'t');
	OLED_ShowChar(42,4,'u');
	OLED_ShowChar(50,4,'r');
	OLED_ShowChar(58,4,'n');
}

void fun0(void)
{
	Show_voltage(0,0);
	Show_current(0,2);
	Show_power(0,4);
}
void fun1(void)
{
	OLED_Clear();
	Index_HomePage();
	show_brackets(1);
}
void fun2(void)
{
	OLED_Clear();
	Index_HomePage();
	show_brackets(2);
}
void fun3(void)
{
	OLED_Clear();
	Index_HomePage();
	show_brackets(3);
}

void fun4(void)
{
	OLED_Clear();
	Index_QC_Page();
	show_brackets(1);
}
void fun5(void)
{
	OLED_Clear();
	Index_QC_Page();
	show_brackets(2);
}
void fun6(void)
{
	OLED_Clear();
	Index_QC_Page();
	show_brackets(3);
}

void fun7(void)//QC2.0诱骗
{
}

void fun8(void)//QC3.0诱骗
{
}

key_table table[30]=
{
	{0,0,0,1,(*fun0)}, //第0层,显示主界面
/*界面的显示，函数里面基本没有什么具体的计算*/
	{1,3,2,0,(*fun1)}, //第一层，->HomePage、QC_decoy、Return
	{2,1,3,4,(*fun2)}, //第一层，HomePage、->QC_decoy、Return
	{3,2,1,0,(*fun3)}, //第一层，HomePage、QC_decoy、->Return
	
/*界面的显示，函数里面基本没有什么具体的计算*/
	{4,6,5,7,(*fun4)}, //第二层，快充诱骗层下显示  ->QC 2.0、 QC3.0 、  Return
	{5,4,6,8,(*fun5)}, //第二层，快充诱骗层下显示  QC 2.0、 ->QC3.0 、  Return
	{6,5,4,2,(*fun6)},  //第二层，快充诱骗层下显示  QC 2.0、 QC3.0 、  ->Return
/*里面执行一些运算操作，比如QC的调压*/
	{7,7,7,4,(*fun7)},   //第三层，快充诱骗QC 2.0
	{8,8,8,5,(*fun8)},//第三层，快充诱骗QC 3.0
};
```
> main.c
```c
#include "main.h"
u8 key_enter=0,key_up=0,key_down=0,key_back=0;//按键的标志
u8 func_index=0;//页码，初始是0即执行fun0
MX_TIM2_Init();
HAL_TIM_Base_Start_IT(&htim2);
int main()
{
    while(1)
    {
      	 /*******************find index****************************/
	  if((key_enter==1)||(key_up==1)||(key_down==1))
	  {
		  if(key_up==1)
		  {
			  func_index=table[func_index].up;    //up
			  key_up=0;
		  }
		  if(key_down==1)
		  {
			  func_index=table[func_index].down;    //down
			  key_down=0;
		  }
		  if(key_enter==1)
		  {
			  OLED_Clear();
			  func_index=table[func_index].enter;    //enter
			  key_enter=0;
		  }
	  }
	  if(key_back==1)
	  {
		  key_back=0;
		  if(oled_on==1)
			  oled_on=0;
		  else
			  oled_on=1;
	  }
	  current_operation_index=table[func_index].current_operation;
	  (*current_operation_index)();//执行当前操作函数
		delay_ms(10);  
    }    
}
/按键外部中断回调函数
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
	HAL_NVIC_DisableIRQ(EXTI9_5_IRQn);//消抖，关闭中断
	__HAL_TIM_ENABLE(&htim2);//启动定时器，消抖时间到后再开启中断
/*在这就可以更改按键的含义，比如KEY0是enter键，可根据硬件自定义*/
	if(GPIO_Pin==KEY0_Pin)
	{
		key_enter=1;
	}
	if(GPIO_Pin==KEY1_Pin)
	{
		key_down = 1;
	}
	if(GPIO_Pin==KEY2_Pin)
	{
		key_up = 1;
	}
	if(GPIO_Pin==KEY3_Pin)
	{
		key_back = 1;
	}
}
//tim中断回调函数
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
	if(htim == &htim2)
	{
		HAL_NVIC_EnableIRQ(EXTI9_5_IRQn);//消抖结束，开启中断
	}
}
```

其实对于一个小白来说最看不懂的就是那个结构体数组跟结构体有什么关系。

在结构体里面定义了五个东西
```
     unsigned char current;//当前状态索引号
     unsigned char C;//上键
     unsigned char down;//下键
     unsigned char enter;//确认键
     void (*current_operation)();
```
他们分别就对应了在数组里面的四个值
```
current  up  down    enter   (也就对应了硬件的四个按键)
{   0,   0,    0,      1,    (*fun0)}, //第0层,显示主界面
```

![1](../../static/life_Page/Games/毕设学习/OELD多级菜单.png)

**举个例子如图钱两行**索引值可以理解为一个表示，主界面就是1；然后`HomePage`就是2..，当`enter`按键按下，索引的值是1，所以就到了HomePage这一栏；当`up`键摁下，此时的索引值为3，那么就应该到`Return`那一栏；如果我们不是`up`键按下，是按下的`down`那么就是到QC这一栏。然后我们需要执行的函数就在对应的（*fun1）中执行。对于我的例子，我到QC这一栏的时候，摁下enter键就应该进入第二个界面（二级界面）里面有选择是`QC2.0`还是`QC3.0`还有`Return`,分析方法就跟上面详细说的一样分析了。

所有的核心代码在上面都有贴出来了。

# 四、感悟

其实最开始我的毕设是有开源的，我有别人的开源代码，我当初拿着看了一下，“我草，恐怖如斯的代码，妈耶”。近期也到了联调的阶段，于是乎我又开始细看别人的开源代码，开始看OELD多级页面这部分的时候确实我也看不懂，特别是我这篇博客写的部分，于是乎我开始静下心来慢慢看，一行一行的分析，不懂的就百度，去查资料，去手动画图一步一步分析。**其实最好的还是要动笔画一下代码之间的逻辑关系，这样最快能够明白代码的含义**