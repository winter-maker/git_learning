/**
 * @title 快速排序：将序列分为2部分，左边放小数，右边放大数，最后将左边、中间、右边合并起来
 * @param {Array}
 * @return {array}
 */
function quick(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2),
    midNum = arr[mid],
    leftArr = [],
    midArr = [],
    rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midNum) {
      leftArr.push(arr[i]);
    } else if (arr[i] > midNum) {
      rightArr.push(arr[i]);
    } else {
      midArr.push(arr[i]);
    }
  }
  return quick(leftArr).concat(midArr, quick(rightArr));
}
console.log(quick([10, 9, 7, 5, 3, 2, 4, 6, 8]));
