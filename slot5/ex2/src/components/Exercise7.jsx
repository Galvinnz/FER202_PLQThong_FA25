// Bài 7: Spread vs. rest – bất biến & gộp mảng
// Mục tiêu: Phân biệt rest (định nghĩa hàm) và spread (sao chép/gộp).
// Yêu cầu:
// • Từ companies[0], tạo company0New với start += 1 mà không làm đổi companies[0].
// • Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào.
// • In: companies[0] và company0New; kết quả concatAll([1,2],[3],[4,5]).

export function Exercise7() {
    // Khai báo mảng companies
    const companies = [
        { name: "Company A", category: "Finance", start: 2000, end: 2010 },
        { name: "Company B", category: "Retail", start: 1995, end: 2005 },
    ];
    // Tạo company0New với start += 1, không làm đổi companies[0]
    const company0New = { ...companies[0], start: companies[0].start + 1 };
    // Hàm concatAll dùng rest và spread
    function concatAll(...arrays) {
        return [].concat(...arrays);
    }
    const concatResult = concatAll([1,2],[3],[4,5]);

    return (
        <div>
            <h1>Exercise 7</h1>
            <p><b>Spread vs. rest – bất biến & gộp mảng</b><br/>
            Từ companies[0], tạo company0New với start += 1 mà không làm đổi companies[0].<br/>
            Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào.<br/>
            In: companies[0] và company0New; kết quả concatAll([1,2],[3],[4,5]).
            </p>
            <p>companies[0]: {JSON.stringify(companies[0])}</p>
            <p>company0New: {JSON.stringify(company0New)}</p>
            <p>concatAll([1,2],[3],[4,5]): {JSON.stringify(concatResult)}</p>
        </div>
    );
}
