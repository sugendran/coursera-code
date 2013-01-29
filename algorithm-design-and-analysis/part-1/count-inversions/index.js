// input variables
var assert = require("assert");
var min = 1;
var max = 20;
var count = 10000;
//var count = 10;
var toSort = [];
// create some random numbers
for(var i=0; i<count; i++) {
	toSort[i] = Math.floor(Math.random() * max) + min;
}

var inversionCount = 0;

function mergeSort(arr) {
	if(arr.length == 2) {
		if(arr[0] > arr[1]) {
			arr.reverse();
			inversionCount++;
		}
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
				inversionCount += (mid - indx1);
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
mergeSort(toSort);
var elapsed = Date.now() - startTime;

var forcedCount = 0;
var forcedStart = Date.now();
for(var i=0, ii=toSort.length; i<ii; i++) {
	for(var j=i+1; j<ii; j++) {
		if(toSort[j] < toSort[i]) {
			forcedCount++;
		}
	}
}
var forcedElapsed = Date.now() - forcedStart;

assert.equal(forcedCount, inversionCount);

console.log("found %j inversions in %jms", inversionCount, elapsed);
console.log("brute force took %jms", forcedElapsed);


