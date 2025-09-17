// Danh sách companies
const companies = [
	{ name: "Company One", category: "Finance", start: 1981, end: 2004 },
	{ name: "Company Two", category: "Retail", start: 1992, end: 2008 },
	{ name: "Company Three", category: "Auto", start: 1999, end: 2007 }
];

// Tạo company0New với start += 1, không đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log("companies[0]:", companies[0]);
console.log("company0New:", company0New);

// Hàm concatAll dùng rest và spread
function concatAll(...arrays) {
	return [].concat(...arrays);
}

console.log("concatAll([1,2],[3],[4,5]):", concatAll([1,2],[3],[4,5]));