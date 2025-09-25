// Bài 8: Reduce nâng cao – thống kê tuổi
// Mục tiêu: Tính tổng, min, max, và đếm theo nhóm bằng reduce.
// Yêu cầu:
// • Với ages (mảng số), tính:
//   o total, min, max
//   o buckets: { teen: count(13–19), adult: count(>=20) }
// • In dạng:
//   o Total: X, Min: Y, Max: Z
//   o Buckets: { teen: a, adult: b }

export function Exercise8() {
    // Khai báo mảng ages
    const ages = [12, 15, 19, 22, 17, 25, 13, 30, 18, 20];
    // Tính total, min, max, buckets bằng reduce
    const stats = ages.reduce(
        (acc, age) => {
            acc.total += age;
            if (age < acc.min) acc.min = age;
            if (age > acc.max) acc.max = age;
            if (age >= 13 && age <= 19) acc.buckets.teen++;
            if (age >= 20) acc.buckets.adult++;
            return acc;
        },
        { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
    );

    return (
        <div>
            <h1>Exercise 8</h1>
            <p><b>Reduce nâng cao – thống kê tuổi</b><br/>
            Mục tiêu: Tính tổng, min, max, và đếm theo nhóm bằng reduce.<br/>
            </p>
            <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
            <p>Buckets: {'{'} teen: {stats.buckets.teen}, adult: {stats.buckets.adult} {'}'}</p>
        </div>
    );
}
