/**
 * @title 二分查找
 * @param {array}
 * @param {number}
 * @description 在数组中找到目标值索引，有返回数组索引，无返回-1
 * @return {number}
 */
function dichotomia(arr, target) {
  let low = 0,
    hight = arr.length - 1;
  while (low <= hight) {
    let mid = low + Math.floor((hight - low) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] > target) {
      hight = mid + 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
console.log(dichotomia([1, 2, 3, 4, 5, 6, 7, 8], 9));
