> 在https://github.com/flypie2/CountDown的基础上做了修改

加了可以指定展示的单位

以及是否显示天

封装了一个类

重复的部分做了合并

- CountDownClass.js是es6类的写法

用法：

```javascript
// 首先导入这个类 
import CountDown from '@/common/js/CountDownClass'
// 实例化
this.countDown = new CountDown({
    CountDownSeconds: 20, // 指定秒 （可选） 
    Ele: dom ,// dom元素，展示的容器 （可选，未传默认body）
    EndFunc () {
        // 倒计时结束后的回调
    }，
    Divider: ['年','时', '分'，'秒'],// 展示的单位(可选，不传默认：)
    Sign: 'holly', // 倒计时的标志（用于暂停开始清除指定的定时器，可选）
    startDate： Date, // 开始时间的时间对象（可选，默认当前时间对象）
    endDate: Date, // 结束时间的时间对象（可选，默认当前时间的时间对象）
    Day: Boolean, // 是否显示 天的倒计时（可选，默认false）
    additionToggle: { // 可选，剩余seconds时触发的回调
    	seconds: 10,
         callback: function () {
             alert('剩余10s时的回调');
         }
	}
})
// 开始倒计时
this.countDown.countDown()
// 暂停指定的倒计时 不传参时对当前倒计时进行操作
this.countDown.stopBySign(Sign)
// 继续指定的倒计时
this.countDown.resumeBySign(Sign)
// 清除指定倒计时
this.countDown.closeBySign(Sign)
```

- CountDownObject.js 是一个对象的写法

```javascript
// 首先导入
import countDown from '@/common/js/CountDownObject'
// 使用
countDown.countDown(params) //参数与上面一样
// 暂停
countDown.stopBySign()
// 继续
countDown.resumeBySign()
// 清除
countDown.closeBySign()
```

> 如果有问题欢迎指出，虽然我不一定能解决哈哈哈。

顺便贴一写博客地址：[https://www.hollytree.top/](https://www.hollytree.top/)