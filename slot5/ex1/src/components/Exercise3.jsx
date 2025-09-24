export function Exercise3() {
    // Khai báo object person
    const person = {
        name: "Nguyen Van A",
        age: 22,
        address: {
            street: "123 Le Loi",
            // city: "Hanoi" // thử comment dòng này để test giá trị mặc định
        }
    };
    // Destructuring lấy street, city (city mặc định là "Unknown City")
    const { address: { street, city = "Da Nang City" } } = person;

    return (
        <div>
            <h1>Exercise 3</h1>
            <p>Street: {street}</p>
            <p>City: {city}</p>
        </div>
    );
}
