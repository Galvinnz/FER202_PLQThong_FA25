export function Exercise2() {
    //1.Tạo 1 mảng số nguyên, in ra danh sách list
    const numbers = [1, 12, -3, 4, 15, 20, -10, 8, 7, 6];
    //2.Tính tổng các phẩn tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //3.Tính giá trị trung bình các phần tử trong mảng
    const average = sum / numbers.length;
    //4.Khai mảng chuỗi names, in ra danh sách các phần tử trong mảng
    const names = ["An", "Linh", "Bảo", "Hiếu", "Dũng", "Thắng", "Huy", "Tuấn,", "Hà", "Lan"];
    names.sort()//Sắp xếp mảng names theo thứ tự alphabet
    //5. Khai báo 1 mảng student có các thuộc tính: id, name, age,  grade
    // (id là số nguyên, name là chuỗi, age là số nguyên, grade là số thực
    const students = [
        { id: 1, name: "An", age: 20, grade: 8.5 },     
        { id: 2, name: "Linh", age: 21, grade: 9.0 },
        { id: 3, name: "Bảo", age: 19, grade: 7.5 },
        { id: 4, name: "Hiếu", age: 22, grade: 6.0 },
        { id: 5, name: "Dũng", age: 20, grade: 8.0 },
        { id: 6, name: "Thắng", age: 21, grade: 9.5 },
        { id: 7, name: "Huy", age: 19, grade: 7.0 },
        { id: 8, name: "Tuấn", age: 22, grade: 6.5 },
        { id: 9, name: "Hà", age: 20, grade: 8.0 },
        { id: 10, name: "Lan", age: 21, grade: 9.0 },
    ];
        //In ra danh sách sinh viên có điểm >= 7.5, sắp xếp grande giảm dần
        const topStudents = students
        .filter((student) => student.grade >= 7.5)
        .sort((a, b) => b.grade - a.grade);
        //Hiển thị danh sách topStudents dưới dạng bảng
    return (
        <div>
            <h1>Exercise 2</h1>
            <p>In mảng số nguyên.</p>
            <ul>
                {numbers.map((number, i) => (
                    <li key={i}>Phần tử thứ {i}-{number}</li>
                ))}
            </ul>
            <p>Tổng các phần tử của mảng: {sum} </p>
            <p>Giá trị Trung bình các phần tử trong mảng: {average.toFixed(2)} </p>
            <p>In mảng chuỗi names</p>
            <ul>
                {names.map((name, i) => (
                    <li key={i}>{name}</li>
                ))}
            </ul>
            <p>Danh sách sinh viên có điểm {'>='} 7.5 (sắp xếp giảm dần):</p>
            <ul>
                {topStudents.map((student) => (
                    <li key={student.id}>{student.name} - Điểm: {student.grade}</li>
                ))}
            </ul>
            <p>Hiển thị danh sách topStudents dưới dạng bảng </p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {topStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3"><b>Average Grade </b></td>
                        <td>
                            {(
                                topStudents.reduce((acc, curr) => acc + curr.grade, 0) / topStudents.length
                            ).toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
