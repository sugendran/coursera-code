// input variables
var assert = require("assert");
var min = 1;
var max = 20;
var count = 1000000;
//var count = 100;
var toSort = [];
// create some random numbers
for(var i=0; i<count; i++) {
	toSort[i] = Math.floor(Math.random() * max) + min;
}

function mergeSort(arr) {
	if(arr.length == 2) {
		if(arr[0] > arr[1])
			arr.reverse();
		return arr;
	}else if(arr.length < 2) {
		return arr;
	}
	var mid = Math.ceil(arr.length * 0.5);
	var r2Max = arr.length - mid;
	var result1 = mergeSort(arr.slice(0, mid));
	var result2 = mergeSort(arr.slice(mid));
	var result = [];
	var indx1 = 0, indx2 = 0;
	while(indx1<mid) {
		while(indx2<r2Max) {
			if(result1[indx1] <= result2[indx2]) {
				result.push(result1[indx1]);
				indx1++;
			} else {
				result.push(result2[indx2]);
				indx2++;
			}
		}
		if(indx1<mid) {
			result.push(result1[indx1]);
			indx1++;
		}
	}
	return result;
}

var startTime = Date.now();
var sorted = mergeSort(toSort);
var elapsed = Date.now() - startTime;

var nativeStart = Date.now();
toSort.sort(function(a, b) { return a - b; });
assert.deepEqual(toSort, sorted);
var nativeElapsed = Date.now() - nativeStart;

console.log("merge sorted %j numbers in %jms", count, elapsed);
console.log("native sort took %jms", nativeElapsed);