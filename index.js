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


var SW = 475; // 显示器宽度
var SH = 267.1875; // 显示器高度
var EYETOSCREEN = 372.800325; // 眼睛到显示器距离
var ANGLEEYE = getAngleAB(SW, EYETOSCREEN);
var BICKW = 17.5; // 屏幕边框宽度
var ANGLESCREEN = 20; // 屏幕边框角度

console.log(ANGLEEYE);

var OC = SW / 2 / calculateHalfAngleTangent(ANGLEEYE);
var AC = OC * calculateHalfAngleTangent(ANGLESCREEN * 2);
var OA = Math.sqrt(OC * OC + AC * AC);
var AE = SW / 2 - AC + BICKW;
var AB = (AE / OA) * AC;
var BE = (AE / OA) * OC;
var BF = BE + BICKW + SW;
var OB = AB + OA;

console.log(OC, AC, OA, AE, AB, BE, BF, OB);
console.log({
  ANGLEEYE: ANGLEEYE,  
  SH: SH,
  OC: OC,
  AC: AC,
  OA: OA,
  AE: AE,
  AB: AB,
  BE: BE,
  BF: BF,
  OB: OB,
});

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

console.log(center, left, right);