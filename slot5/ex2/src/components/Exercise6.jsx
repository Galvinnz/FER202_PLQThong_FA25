// Bài 6: Sort + slice – doanh nghiệp theo năm kết thúc
// Mục tiêu: Thao tác sort bất biến (không mutate), cắt mảng.
// Yêu cầu:
// • Cho companies (name, category, start, end).
// • Tạo bản sao đã sắp xếp theo end tăng dần.
// • In 3 công ty đầu theo định dạng "Company - EndYear".

export function Exercise6() {
    // Khai báo mảng companies
    const companies = [
        { name: "Company A", category: "Finance", start: 2000, end: 2010 },
        { name: "Company B", category: "Retail", start: 1995, end: 2005 },
        { name: "Company C", category: "Auto", start: 1990, end: 2000 },
        { name: "Company D", category: "Tech", start: 2010, end: 2020 },
        { name: "Company E", category: "Health", start: 2005, end: 2015 },
    ];
    // Tạo bản sao đã sắp xếp theo end tăng dần
    const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
    // Lấy 3 công ty đầu
    const top3 = sortedCompanies.slice(0, 3);

    return (
        <div>
            <h1>Exercise 6</h1>
            <p><b>Sort + slice – doanh nghiệp theo năm kết thúc</b><br/>
            Mục tiêu: Thao tác sort bất biến (không mutate), cắt mảng.<br/>
            In 3 công ty đầu theo định dạng "Company - EndYear".</p>
            {top3.map((c, idx) => (
                <div key={idx}>{c.name} - {c.end}</div>
            ))}
        </div>
    );
}
