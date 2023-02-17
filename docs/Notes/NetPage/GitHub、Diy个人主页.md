---
title: DIY GitHub个人主页
description: GitHub个人主页
sidebar_position: 7
keywords:
- GitHub Diy
tags: 
- GitHub
---

# 起因
上班摸鱼（bushi）休息时间闲着没事，去逛了一下<a href="https://www.disnox.top/">尚宇的小站</a>,然后无意间点开他的GitHub，蛙趣，这是？这是强者的世界吗？
![1](../../../static/img_log/Pasted%20image%2020230217162942.png)

确实是挺好看的嗷。

然后我一看我自己的，耗夹嚯（好家伙）！真丑！然后我就开始百度了。

# 我的美化道路

## 第一步：伞兵一号准备就绪
新建一个仓库，仓库的名字就叫你自己的名字，比如我GitHub的名字叫做DxIMT，仓库就叫DxIMT

![Pasted image 20230217163640.png](../../../static/img_log/Pasted%20image%2020230217163640.png)

框选的这句话就是说**DxIMT/DxIMT是一个特殊的存储库，可以用来添加README。md到你的GitHub配置文件。确保它是公共的，并使用README初始化它来开始。**通俗来讲就是**你在这个ReadMe.md里面写的东西会在你的主页进行展示**

![Pasted image 20230217163922.png](../../../static/img_log/Pasted%20image%2020230217163922.png)

记住需要勾选生成ReadMe文件。

----▶️Create repository...---

![Pasted image 20230217164238.png](../../../static/img_log/Pasted%20image%2020230217164238.png)

然后点击这个笔的样子就可以开始写你的个人主页啦。

**🎀Tips：**他支持MarkDown语法以及HTML哟！

## 第二步：寻找资源

<a href="https://github.com/DenverCoder1/readme-typing-svg">炫光动效字幕</a>

<a href="https://github.com/anuraghazra/github-readme-stats/blob/master/docs/readme_cn.md">插件代码大全</a>

首先贴一张我目前已经弄完的主页,方便之后说明：
![Pasted image 20230217164940.png](../../../static/img_log/Pasted%20image%2020230217164940.png)

### 第一个点

贴个代码叭~：
```
![Typing SVG](https://readme-typing-svg.demolab.com/?font=ComicSansMS&center=true&vCenter=true&width=500&height=60&lines=Welcome+to+Baby_9in's+GitHub+homepage)
```

其实在最上边的**插件代码大全**里面都说的很清楚了，这个代码看着很长，细看也就没啥，主要就是以一个“&”为一节来看，比如**font=Comic+Sans+MS&center=true**解释就是，字体是：Comic Sans MS；居中？true（对）**🎀Tips：**如果有空格地方，用加号来取代，比如我的那个字体是Comic Sans MS，但是在代码里面就要写成Comic+Sans+MS。同理，我们需要写的文本也需要用+来代替空格。

### 第二个点
这种是显示我的主页浏览量，还有就是我仓库所有语言的占比。如下为官方代码：
![Pasted image 20230217170909.png](../../../static/img_log/Pasted%20image%2020230217170909.png)
咋们就需要按照说明更改就行了，然后往下看会有一个自定义
![Pasted image 20230217171018.png](../../../static/img_log/Pasted%20image%2020230217171018.png)
这些自定义需要写就直接加在代码里面就行了例如：
```[![啵贝琴's github stats](https://github-readme-stats.vercel.app/api?username=DxIMT&hide_title=false&hide_border=true&show_icons=true&include_all_commits=true&line_height=20&bg_color=0,EC6C6C,FFD479,FFFC79,73FA79&theme=dark&locale=cn)](https://github-readme-stats.vercel.app/api?username=DxIMT&hide_title=false&hide_border=true&show_icons=true&include_all_commits=true&line_height=20&bg_color=0,EC6C6C,FFD479,FFFC79,73FA79&theme=graywhite&locale=cn)```

里面的那些“XXX = true&XXX = true”都是可以根据自己要求加上去的，我也是白嫖的背景颜色和主题，啊哈哈哈！

### 第三和第四个点
这其实就是一串固定的格式，根据自己改就Ojbk啦

```MarkDown
### 📝 博客最近更新

<details open>
<summary>点击展开 ...</summary>
<img align='right' src="图片" width="330" />
<!-- BLOG-POST-LIST:START -->

- 💮 [网页搭建日常](https://littlefairy.top/docs/category/%E6%90%AD%E5%BB%BA%E7%BD%91%E9%A1%B5%E7%9A%84%E6%97%A5%E5%B8%B8)

- 🐸 [工作经验小记](https://littlefairy.top/docs/category/%E5%B7%A5%E4%BD%9C%E7%BB%8F%E9%AA%8C%E5%B0%8F%E8%AE%B0)
  
- 🐳 [生活的碎碎念](https://littlefairy.top/Life/category/%E7%A2%8E%E7%A2%8E%E5%BF%B5)

- 🥑 [关于我爱的娱乐游戏](https://littlefairy.top/Life/category/games)

<!-- BLOG-POST-LIST:END -->

更多内容直接点击：[https://littlefairy.top/](https://littlefairy.top/)
```
只需要吧里面的东西换成自己的名字和网站就舒舒服服的了；第四点那个图片就是
```
<img align='right' src="图片" width="330" />
<!-- BLOG-POST-LIST:START -->
```
只要把**图片改成你想要的GIF图片网站就行啦**。

# 🎉总结
又是一次舒舒服服的学习过程！