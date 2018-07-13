export default class CountDown {
  constructor({
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
    this.CountDownSeconds = CountDownSeconds
    this.Ele = Ele
    this.EndFunc = EndFunc
    this.Divider = Divider
    this.Sign = Sign
    this.startDate = startDate
    this.endDate = endDate
    this.Day = Day
    this.additionToggle = additionToggle
    this.M_IntervalUnits = []
  }
  countDown() { 
    // 设置结束时间
    let $_this = this 
    if ($_this.CountDownSeconds) {
      $_this.endDate.setSeconds($_this.startDate.getSeconds() + $_this.CountDownSeconds);
    }
    // 与当前时间的时间差
    var tempdate = new Date($_this.endDate.getTime() - $_this.startDate.getTime());

    var interval = setInterval(function () {
      // 停止计时跳出
      if (intervalUnit && intervalUnit.isStop) {
        return;
      }
      // 当前时间大于结束时间清除定时器触发结束函数跳出
      if ($_this.startDate.getTime() >= $_this.endDate.getTime()) {
        clearInterval(interval);
        $_this.EndFunc();
        return;
      }
      // 当前时间+1s
      $_this.startDate.setSeconds($_this.startDate.getSeconds() + 1);
      // 时间差会-1s
      tempdate.setTime($_this.endDate.getTime() - $_this.startDate.getTime());
      // 指定剩余多少s时触发回调
      if ($_this.additionToggle && !$_this.alreadyToggle) {
        if (tempdate.getTime() / 1000 < $_this.additionToggle.seconds) {
          $_this.additionToggle.callback();
          $_this.alreadyToggle = true;
        }
      }

      $_this.Ele.innerText = $_this.makeDateAndTimeText($_this.Day, tempdate, $_this.Divider);
    }, 1000);

    var intervalUnit = $_this.IntervalUnit(interval, $_this.Sign, false);
    // 放进定时器数组中
    $_this.M_IntervalUnits.push(intervalUnit);
  }
  IntervalUnit(interval, Sign) {
    return {
      interval,
      Sign,
      isStop: false
    }
  }
  closeBySign(Sign) {
    let countDownArray = this.M_IntervalUnits
    for (var i = 0; i < countDownArray.length; ++i) {
      if (countDownArray[i].Sign == Sign) {
        clearInterval(countDownArray[i].interval);
      }
    }
  }
  stopBySign(Sign) {
    let countDownArray = this.M_IntervalUnits
    for (var i = 0; i < countDownArray.length; ++i) {
      if (countDownArray[i].Sign == Sign) {
        countDownArray[i].isStop = true;
      }
    }
  }
  // 继续倒计时
  resumeBySign(Sign) {
    let countDownArray = this.M_IntervalUnits
    for (var i = 0; i < countDownArray.length; ++i) {
      if (countDownArray[i].Sign == Sign) {
        countDownArray[i].isStop = false;
      }
    }
  }
  makeDateAndTimeText(Day, tempdate, Divider) {
    var date = parseInt(tempdate.getTime() / (60 * 60 * 1000 * 24));
    var hour = parseInt((tempdate.getTime() % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000));
    var minutes = tempdate.getMinutes();
    var seconds = tempdate.getSeconds();
    console.log(tempdate.getTime(), 33)
    var timetext = '';
    if (Day) {
      timetext = timetext + date + Divider[0];
    }
    if (hour < 10) {
      timetext = timetext + '0';
    }
    timetext = timetext + hour + Divider[1];
    if (minutes < 10) {
      timetext = timetext + '0';
    }
    timetext = timetext + minutes + Divider[2];
    if (seconds < 10) {
      timetext = timetext + '0';
    }
    timetext = timetext + seconds + Divider[3];
    return timetext;
  }
}