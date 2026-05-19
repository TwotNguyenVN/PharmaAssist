/**
 * Kiểm tra số chẵn hay lẻ
 * @param {number} n 
 * @returns {string}
 */
function checkEvenOdd(n) {
    if (n % 2 === 0) {
        return "Số chẵn";
    } else {
        return "Số lẻ";
    }
}

// Ví dụ sử dụng
const num = 5;

console.log(`${num} là ${checkEvenOdd(num)}`);

