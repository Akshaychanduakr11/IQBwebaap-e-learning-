function solveMatrix() {
    // 1. Get values into an Augmented Matrix array
    let A = [
        [parseFloat(document.getElementById('m00').value), parseFloat(document.getElementById('m01').value), parseFloat(document.getElementById('m02').value), parseFloat(document.getElementById('b0').value)],
        [parseFloat(document.getElementById('m10').value), parseFloat(document.getElementById('m11').value), parseFloat(document.getElementById('m12').value), parseFloat(document.getElementById('b1').value)],
        [parseFloat(document.getElementById('m20').value), parseFloat(document.getElementById('m21').value), parseFloat(document.getElementById('m22').value), parseFloat(document.getElementById('b2').value)]
    ];

    let n = 3;

    // 2. Forward Elimination
    for (let i = 0; i < n; i++) {
        // Pivot selection
        let max = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[max][i])) max = k;
        }
        [A[i], A[max]] = [A[max], A[i]];

        // Row reduction
        for (let k = i + 1; k < n; k++) {
            let factor = A[k][i] / A[i][i];
            for (let j = i; j <= n; j++) {
                A[k][j] -= factor * A[i][j];
            }
        }
    }

    // 3. Back Substitution
    let x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += A[i][j] * x[j];
        }
        x[i] = (A[i][n] - sum) / A[i][i];
    }

    // 4. Display Results
    document.getElementById('matrixResult').style.display = 'block';
    document.getElementById('solX').innerHTML = `<strong>X:</strong> ${x[0].toFixed(2)}`;
    document.getElementById('solY').innerHTML = `<strong>Y:</strong> ${x[1].toFixed(2)}`;
    document.getElementById('solZ').innerHTML = `<strong>Z:</strong> ${x[2].toFixed(2)}`;
}