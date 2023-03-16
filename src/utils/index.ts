// 格式化数字
export function formateNumber(num:number) {
    // 小于999的数字直接返回
    if (num < 99999) return num.toString();
    // 大于1万 小于1亿
    if (num < 100000000) return Math.round(num / 10000) + '万';
    // 大于1亿
    if (num >= 100000000) return Math.round(num / 100000000) + '亿';
   
    return num.toString();
  }