/**
 * @title 冒泡排序
 * @param {array} 参数数组
 * @return {array}
 * @description 比较相邻两个元素的位置，如果第一个比第二个大，交换它们的位置。依次比较直至全部数据从小到大排好序
 * @expand 双层for循环执行过程：外层循环执行一次-》内层循环执行全部
 */
function bubble(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      let temp = arr[j];
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
let arr = [3, 4, 5, 1, 2, 0, 6];
console.log(bubble(arr));
