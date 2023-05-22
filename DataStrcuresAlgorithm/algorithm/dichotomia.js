/**
 * @title 二分查找
 * @param {array}
 * @param {number}
 * @description 在数组中找到目标值索引，有返回数组索引，无返回-1
 * @param 对数据结构要求严，必须是升序的数组
 * @return {number}
 */
function dichotomia(arr, target) {
  let low = 0,
    hight = arr.length - 1;
  while (low <= hight) {
    //const mid = low + Math.floor((hight - low) / 2);
    const mid = (low + hight)>>1
    const num = arr[mid]
    if(num === target) {
      return mid
    } else if(num > target) {
      //值在左边
      hight = mid - 1
    } else {
      //值在右边
      low = mid + 1
    }
  }
  return -1;
}
//console.log(dichotomia([1,2,3,4,5,6,7,8,9,11,17,18,19,20,22,34,45,67,68,69,70], 69));
/**
 * @param 二分算法应用： 搜索插入位置
 * @param O(logn)的算法
 * @description 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 *  如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * @param 二分查找和二分插入排序结合解决
*/
const searchInsert = (arr, target)=> {
  let left = 0, right = arr.length - 1, mid, ans = arr.length
  while(left <= right) {
    mid = (left + right)>>1
    if(target <= arr[mid]) {
      //找到返回索引，找不到返回数组中最大的索引
      ans = mid
      //值在左边
      right = mid - 1
    } else {
      //值在右边
      left = mid + 1
    }
  }
  return ans
}
console.log(searchInsert([2,4,6,7,8,9,11,13,15,18,23,45,67,89,90], 69))
console.log(searchInsert([2,4,6,7,8,9,11,13,15,18,23,45,67,89,90], 67))
console.log(searchInsert([2,4,6,7,8,9,11,13,15,18,23,45,67,89,90], 44))
console.log(searchInsert([2,4,6,7,8,9,11,13,15,18,23,45,67,89,90], 3))
console.log(searchInsert([2,4,6,7,8,9,11,13,15,18,23,45,67,89,90], 1))