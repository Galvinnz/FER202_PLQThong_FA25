// Mảng ages
const ages = [33, 12, 20, 16, 16, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// Destructuring: lấy first, bỏ qua phần tử 2, lấy third (mặc định 0), restAges
const [first, , third = 0, ...restAges] = ages;
const isEven = (x) => x % 2 === 0;
console.log(isEven(first));
console.log("first:", first);      // 33
console.log("third:", third);      // 20
console.log("restAges:", restAges); // [16]
