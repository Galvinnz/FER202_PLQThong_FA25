// Hàm tính tổng các số hợp lệ (bỏ NaN, string không phải số)
function sum(...nums) {
	return nums.reduce((acc, val) => {
		const n = Number(val);
		return !isNaN(n) && typeof n === 'number' && isFinite(n) ? acc + n : acc;
	}, 0);
}

// Hàm tính trung bình các số hợp lệ, làm tròn 2 chữ số thập phân, rỗng trả 0
function avg(...nums) {
	const validNums = nums.reduce((arr, val) => {
		const n = Number(val);
		if (!isNaN(n) && typeof n === 'number' && isFinite(n)) arr.push(n);
		return arr;
	}, []);
	if (validNums.length === 0) return 0;
	const total = validNums.reduce((acc, n) => acc + n, 0);
	return Number((total / validNums.length).toFixed(2));
}

// Test
console.log('sum(1,2,3) =', sum(1,2,3)); // 6
console.log("sum(1,'x',4) =", sum(1,'x',4)); // 5
console.log('avg(1,2,3,4) =', avg(1,2,3,4)); // 2.5
console.log('avg() =', avg()); // 0
