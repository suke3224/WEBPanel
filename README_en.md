## 工作站网络中控模板
---
The template has built-in pages for basic intranet needs, including intranet management, remote desktop, program management, access management, and a supercomputer management page, which only contains front-end code. If necessary, please connect your own back-end code to support PHP, JavaWeb and other program codes

**Attention!! This code needs to be run on the service. The back end cannot be obtained by local operation**
>>This template comes from * * kitadmin * * and * * layui2.0**
>
>The current version is based on layui 2 X refactored version, and later 1 The X version is essentially different.
>
>The core of this version is [routing], which no longer supports [iframe] loading
>
>Version properties:
>
>1. The usage is as simple and fast as ever. (only simple configuration is required to realize some functions) 2. Provide local development environment. (depends on nodejs operating environment and gulp)
>3. Provide code function. (it depends on nodejs running environment and gulp) 4. Modular loading. (depends on the modularization of layui, and the usage is consistent with that of layui)
>5. Provide routing function. (routing is the core function of this version and needs to be bound to the template. Please refer to the relevant documents for details.)
>6. Complete front and rear end separation development. (integrated mockjs is used to intercept requests and return simulation data. Please refer to relevant documents for details)
>7. The menu on the left is rewritten to support level 4 menus. (integrated mockjs is used to intercept requests and return simulation data. Please refer to relevant documents for details)



Built in service

**Layui2.0** · **mock. js** **Aplayer. js** **Dplayer. js** **Viewer. js** **Layer. js** **jQuery. js**



The core is routing. Please go to js/index Modify the current version of mock js

**Integrated** Please don't touch other code unless you are sure that it will collapse that day. Don't cry. Other layer parameters can also be accessed to index JS, try not to move the others



There is a PDF for welcome in the app The text introduction in JS has links

Then use pdf JS online preview * * no browser interface** So it should be supported by Internet explorer9+, but now Microsoft seems to have killed Internet Explorer. Then again, I don't have the copyright to show the background image to the customer, so try not to use it. The source is [mastergo]（ https://mastergo.com/ ）Find your own welcome map

So Firefox and chrome · edge seem to be OK

emmmmmmm...
![首页](https://img-blog.csdnimg.cn/0542ee2bbef148a697360ef96462512f.png#pic_center)
![前端组件](https://img-blog.csdnimg.cn/4b930f7404e645fdb3088a7bcd41a037.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/3d4d90e0b5904a8ea936cd7b166013a5.png#pic_center)
![远程桌面](https://img-blog.csdnimg.cn/ee0d3a416c59432fbaef68561ebb517c.png#pic_center)
![访问跟踪（我在这）](https://img-blog.csdnimg.cn/56dce4dee32a4f63ba5d0cab24136e3f.png#pic_center)
![日志日历](https://img-blog.csdnimg.cn/f5ddd4e71f84446d9cd3022a9a1d4f1f.png#pic_center)

```mermaid
gantt
        dateFormat  YYYY-MM-DD
        title 维护计划
        section 项目进程
        已完成               :done,    des1, 2020-01-06,2022-05-18
        进行中               :active,  des2, 2022-05-19, 2023-05-19
        计划中               :         des3, after des2, 5d
```
OK, let's start by exploring the icon on icomont for you to download to the Lib folder Enjoyer~ 
