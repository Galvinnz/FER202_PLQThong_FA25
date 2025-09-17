// Mảng ages
const ages = [33, 12, 20, 16];

// Destructuring: lấy first, bỏ qua phần tử 2, lấy third (mặc định 0), restAges
const [first, , third = 0, ...restAges] = ages;

console.log("first:", first);      // 33
console.log("third:", third);      // 20
console.log("restAges:", restAges); // [16]
