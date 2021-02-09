/**
 * 防反跳。fn函数在最后一次调用时刻的delay毫秒之后执行！
 * @param fn 执行函数
 * @param delay 时间间隔
 * @param isImmediate 为true，debounce会在delay时间间隔的开始时立即调用这个函数
 * @returns {Function}
 */
export function debounce(fn, delay, isImmediate) {
  let timer = null; //初始化timer，作为计时清除依据
  return function() {
    let context = this; //获取函数所在作用域this
    let args = arguments; //取得传入参数
    clearTimeout(timer);
    if (isImmediate && timer === null) {
      //时间间隔外立即执行
      fn.apply(context, args);
      timer = 0;
      return;
    }
    timer = setTimeout(function() {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

export function getQueryVariable(variable) {
  let search = decodeURIComponent(window.location.href);
  let url = new URL(search);
  if (url.searchParams.has(variable)) {
    return url.searchParams.get(variable);
  } else {
    return false;
  }
}

export function hexToRgba(hex, opacity) {
  return (
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")"
  );
}

/**
 * @summary 文字处理函数 获得字符串实际长度，中文2，英文1
 * @param {string} str 要获得长度的字符串
 */
export function strLength(str) {
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

/*
 * 计算两点之间的正东0度夹角角度
 * @param {*} start format:{'x': 30, 'y': 120 }
 * @param {*} end
 */
export function getAngle({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  let radian = Math.atan2(y2 - y1, x2 - x1); //弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
  let theta = getDegrees(radian); //角度 -36.86989764584402，即360 - 36.86989764584402 = 323.13010235415598
  return theta;
}

// 角度转弧度
export function getRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// 弧度转角度
export function getDegrees(radians) {
  return radians * (180 / Math.PI);
}
