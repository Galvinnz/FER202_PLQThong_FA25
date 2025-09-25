// Bài 5: Map + filter – danh sách teen
// Mục tiêu: Kết hợp filter và map với arrow function.
// Yêu cầu:
// • Cho mảng people (name, age).
// • Lọc những người tuổi 13–19 (bao gồm 13 và 19).
// • Map sang chuỗi "Ann (19)".
// • In ra từng dòng.

export function Exercise5() {
    // Khai báo mảng people
    const people = [
        { name: "Ann", age: 19 },
        { name: "Bob", age: 12 },
        { name: "Cindy", age: 15 },
        { name: "David", age: 22 },
        { name: "Eva", age: 17 },
        { name: "Frank", age: 13 },
    ];
    // Lọc tuổi teen và map sang chuỗi "Name (Age)"
    const teens = people
        .filter(person => person.age >= 13 && person.age <= 19)
        .map(person => `${person.name} (${person.age})`);

    return (
        <div>
            <h1>Exercise 5</h1>
            <p><b>Map + filter – danh sách teen</b><br/>
            Mục tiêu: Kết hợp filter và map với arrow function.<br/>
            Lọc những người tuổi 13–19 (bao gồm 13 và 19), map sang chuỗi "Ann (19)", in ra từng dòng.
            </p>
            {teens.map((str, idx) => (
                <div key={idx}>{str}</div>
            ))}
        </div>
    );
}
