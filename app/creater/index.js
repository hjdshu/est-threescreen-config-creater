const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, './template.tpl'), 'utf8');
const source_2p = fs.readFileSync(path.join(__dirname, './template_2p.tpl'), 'utf8');
const template = Handlebars.compile(source);
const template_2p = Handlebars.compile(source_2p);


// 已知等腰三角形，A B C三条边，其中A = B， 其中已知C边长，和高H，求三角形A和B之间的夹角
function getAngleAB(c, h) {
  var litC = c / 2;
  let tanAngle = litC / h;
  let angle = Math.atan(tanAngle);
  return ((angle * 180) / Math.PI) * 2;
}

function calculateHalfAngleTangent(angleInDegrees) {
  // 将角度转换为弧度
  let angleInRadians = (angleInDegrees * Math.PI) / 180;
  // 计算一半角的切线值
  let halfAngleTangent = Math.tan(angleInRadians / 2);
  return halfAngleTangent;
}

// excles=DEGREES(ATAN(E9/E10))*2
function calculateAngleFromTangent(tangent) {
    // 计算角度的切线值
    let angleInRadians = Math.atan(tangent);
    // 将弧度转换为角度
    let angleInDegrees = (angleInRadians * 180) / Math.PI;
    return angleInDegrees;
}

function creater (sw, sh, eyetoscrren, bickw, anglescreen) {
  var SW = sw; // 显示器宽度475mm
  var SH = sh; // 显示器高度267.1875mm
  var EYETOSCREEN = eyetoscrren; // 眼睛到显示器距离372.800325mm
  var ANGLEEYE = getAngleAB(SW, EYETOSCREEN);
  var BICKW = bickw; // 屏幕边框宽度17.5mm
  var ANGLESCREEN = anglescreen; // 屏幕边框角度20度
  
  var OC = SW / 2 / calculateHalfAngleTangent(ANGLEEYE);
  var AC = OC * calculateHalfAngleTangent(ANGLESCREEN * 2);
  var OA = Math.sqrt(OC * OC + AC * AC);
  var AE = SW / 2 - AC + BICKW;
  var AB = (AE / OA) * AC;
  var BE = (AE / OA) * OC;
  var BF = BE + BICKW + SW;
  var OB = AB + OA;
  
  // 接下来计算输出config文件的值
  const center = {
      horizontal_fov_override: ANGLEEYE
  }
  
  const left = {
      horizontal_fov_relative_offset: 0,
      heading_offset: ANGLESCREEN,
      horizontal_fov_override: calculateAngleFromTangent(BF/OB)*2,
      vertical_fov_override: calculateAngleFromTangent(SH/OB/2)*2,
      frustum_subrect_x: 0,
      frustum_subrect_width: SW/(BF*2)
  }
  
  const right = {
      horizontal_fov_relative_offset: 0,
      heading_offset: -ANGLESCREEN,
      horizontal_fov_override: left.horizontal_fov_override,
      vertical_fov_override: left.vertical_fov_override,
      frustum_subrect_x: 1-left.frustum_subrect_width,
      frustum_subrect_width: left.frustum_subrect_width
  }

  // 将left,center,rigth里的值转换为字符串，并toFixed(6)
  for (let key in center) {
    center[key] = center[key].toFixed(6);
  }
  for (let key in left) {
    left[key] = left[key].toFixed(6);
  }
  for (let key in right) {
    right[key] = right[key].toFixed(6);
  }
  
  return {
    center,
    left,
    right
  }
}

module.exports = function (options) {
  // const data =  creater(...arguments)
  // var result = template(data);
  // // fs.writeFileSync(path.join('./', 'test.sii'), result)
  // console.log(result)
  const is2p = options.is2p || false;
  let data = JSON.parse(JSON.stringify(creater(
    // 697.68, // 显示器宽度475mm
    // 392.26, // 显示器高度267.1875mm
    // 550, // 眼睛到显示器距离372.800325mm
    // -3, // 屏幕边框宽度17.5mm
    // 58 // 屏幕边框角度20度
    options.sw,
    options.sh,
    options.eyetoscrren,
    options.bickw,
    options.anglescreen
  )));
  var result;
  if (is2p) {
    result = template_2p(data);
  } else {
    result = template(data);
  }
  return result;
  // console.log('文件写入成功，test.sii')
};


