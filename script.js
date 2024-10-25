// Toggle light and dark mode
document.getElementById('theme-toggle').addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// GPA Calculator data
const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D": 1.0,
    "F": 0.0
};

// Add row functionality
document.getElementById('add_row').addEventListener('click', () => {
    const table = document.getElementById('course_table').querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="checkbox" class="check_mark"></td>
        <td><input type="text" placeholder="Course"></td>
        <td>
            <select class="grade_input">
                <option value="" disabled selected>--</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><input type="number" class="credit_input" min="0" max="5"></td>
        <td><button class="delete">×</button></td>
    `;
    table.appendChild(newRow);
});

// Remove row functionality
document.getElementById('course_table').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.closest('tr').remove();
    }
});

// Calculate GPA functionality
document.getElementById('calculate').addEventListener('click', () => {
    const rows = document.querySelectorAll('#course_table tbody tr');
    let totalPoints = 0;
    let totalCredits = 0;
    
    rows.forEach(row => {
        const isChecked = row.querySelector('.check_mark').checked;
        const grade = row.querySelector('.grade_input').value;
        const credits = parseFloat(row.querySelector('.credit_input').value);
        
        if (isChecked && grade && !isNaN(credits)) {
            totalPoints += (gradePoints[grade] || 0) * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById('gpa_output').innerText = `Your calculated GPA is: ${gpa}`;
});

// Reset functionality
document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll('#course_table tbody tr:not(:first-child)').forEach(row => row.remove());
    document.getElementById('gpa_output').innerText = '* Please click "Calculate" to see the result';
});
