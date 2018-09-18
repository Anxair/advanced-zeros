module.exports = function getZerosCount(number, base) {
    let primeNum = [2, 3];
    for (let i = 4; i <= 256; i++) {
        let mark = true;
        for (let j = 0; j < primeNum.length; j++) {
            if (i % primeNum[j] === 0) {
                mark = false;
                break;
            }
        }
        if (mark) primeNum.push(i);
    }
    let primeNumBase = [];
    for (let i = 0; i < primeNum.length; i++) {
        if (base % primeNum[i] === 0) {
            primeNumBase.push(primeNum[i]);
            base /= primeNum[i];
            i--;
        }
    }
    let mapPrimeNum = new Map();
    for (let i = 0; i < primeNumBase.length; i++) {
        let count = 1;
        if (mapPrimeNum.has(primeNumBase[i])) {
            count += mapPrimeNum.get(primeNumBase[i]);
            mapPrimeNum.set(primeNumBase[i], count);
        } else
            mapPrimeNum.set(primeNumBase[i], count);
    }

    let minCount = 1e10;
    mapPrimeNum.forEach(function (item, key) {
        let sum = primeCount(number, key);
        let z = Math.trunc(sum / item);
        if (z < minCount) {
            minCount = z;
        }
    });
    return minCount;
};

function primeCount(number, prime) {
    let count = 0;
    while (number / prime > 0) {
        count += Math.trunc(number / prime);
        number /= prime;
    }
    return Math.trunc(count);
}