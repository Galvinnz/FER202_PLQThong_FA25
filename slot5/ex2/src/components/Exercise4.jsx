// Bài 4: Destructuring array + skip + default
// Mục tiêu: Bỏ qua phần tử, đặt mặc định.
// Yêu cầu:
// • Với const ages = [33, 12, 20, 16];
// • Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại.
// • In: first, third, restAges.

export function Exercise4() {
    // Khai báo mảng ages
    const ages = [33, 12, 20, 16];
    // Destructuring: lấy first, bỏ qua phần tử 2, lấy third (mặc định 0), restAges
    const [first, , third = 0, ...restAges] = ages;

    return (
        <div>
            <h1>Exercise 4</h1>
            <p><b>Destructuring array + skip + default</b><br/>
            Bỏ qua phần tử, đặt mặc định. Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại.</p>
            <p>Ages = [33, 12, 20, 16]</p>
            <p>First: {first}</p>
            <p>Third: {third}</p>
            <p>Rest Ages: {JSON.stringify(restAges)}</p>
        </div>
    );  
}
