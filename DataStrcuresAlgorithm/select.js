/**
 * @title 选择排序，sort_slect
 * @param {array}
 * @description 通过比较首先选出最小的数放在第一位置上，然后在其余的数中选出次小数放在第二位置上，以此类推，直到所有的数成为有序数列
 */
function select(arr) {
  let len = arr.length,
    temp = null,
    minIndex = 0;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
console.log(select([10, 9, 8, 6, 7, 5, 3, 4, 2, 1]));
