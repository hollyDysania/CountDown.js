function IntervalUnit(interval, sign) {
  this.interval = interval
  this.Sign = sign
  this.isStop = false
}

var CountDown = {}

CountDown.M_IntervalUnits = [] //定时器容器数组

CountDown.countDown = function ({
  CountDownSeconds,
  Ele = document.body,
  EndFunc = function () {},
  Divider = [...Object.keys(window).slice(0, 4).map((v, i, arr) => v = i === arr.length - 1 ? '' : ':')],
  Sign = '',
  startDate = new Date(),
  endDate = new Date(),
  Day = false,
  additionToggle
}) {
  // 设置结束时间
  if (CountDownSeconds) {
    endDate.setSeconds(startDate.getSeconds() + CountDownSeconds);
  }
  // 与当前时间的时间差
  var tempdate = new Date(endDate.getTime() - startDate.getTime());

  var interval = setInterval(function () {
    // 停止计时跳出
    if (intervalUnit.isStop) {
      return;
    }
    // 当前时间大于结束时间清除定时器触发结束函数跳出
    if (startDate.getTime() >= endDate.getTime()) {
      clearInterval(interval)
      EndFunc();
      return;
    }
    // 当前时间+1s
    startDate.setSeconds(startDate.getSeconds() + 1)
    // 时间差会-1s
    tempdate.setTime(endDate.getTime() - startDate.getTime())
    // 指定剩余多少s时触发回调
    if (additionToggle && !this.alreadyToggle) {
      if (tempdate.getTime() / 1000 < additionToggle.seconds) {
        additionToggle.callback()
        this.alreadyToggle = true
      }
    }

    Ele.innerText = CountDown.makeDateAndTimeText(Day, tempdate, Divider)
  }, 1000)

  var intervalUnit = new IntervalUnit(interval, Sign, false)
  // 放进定时器数组中
  CountDown.M_IntervalUnits.push(intervalUnit)
};
// 清除指定倒计时
CountDown.closeBySign = function (Sign) {
  let countDownArray = CountDown.M_IntervalUnits
  for (var i = 0; i < countDownArray.length; ++i) {
    if (countDownArray[i].Sign == Sign) {
      clearInterval(countDownArray[i].interval)
    }
  }
};
// 停止倒计时
CountDown.stopBySign = function (Sign) {
  let countDownArray = CountDown.M_IntervalUnits
  for (var i = 0; i < countDownArray.length; ++i) {
    if (countDownArray[i].Sign == Sign) {
      countDownArray[i].isStop = true
    }
  }
};
// 继续倒计时
CountDown.resumeBySign = function (Sign) {
  let countDownArray = CountDown.M_IntervalUnits
  for (var i = 0; i < countDownArray.length; ++i) {
    if (countDownArray[i].Sign == Sign) {
      countDownArray[i].isStop = false
    }
  }
};

CountDown.makeDateAndTimeText = function (Day, tempdate, Divider) {
  var date = parseInt(tempdate.getTime() / (60 * 60 * 1000 * 24))
  var hour = parseInt((tempdate.getTime() % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000))
  var minutes = tempdate.getMinutes();
  var seconds = tempdate.getSeconds();
  console.log(tempdate.getTime(), 33)
  var timetext = ''
  if (Day) {
    timetext = timetext + date + Divider[0];
  }
  if (hour < 10) {
    timetext = timetext + '0'
  }
  timetext = timetext + hour + Divider[1];
  if (minutes < 10) {
    timetext = timetext + '0'
  }
  timetext = timetext + minutes + Divider[2];
  if (seconds < 10) {
    timetext = timetext + '0'
  }
  timetext = timetext + seconds + Divider[3];
  return timetext
};
export default CountDown
