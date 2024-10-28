// Add row functionality
document.getElementById('add_row').addEventListener('click', function() {
    const table = document.getElementById('course_table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="checkbox" class="GPA_input check_mark"></td>
        <td><input type="text" class="GPA_input" placeholder="Course"></td>
        <td>
            <select class="GPA_input grade_input">
                <option value="" selected disabled>--</option>
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
        <td><input type="number" class="GPA_input credit_input" min="0" max="5" step="1"></td>
        <td><button class="GPA_input delete">&times;</button></td>
    `;
});

// Delete row functionality
document.getElementById('course_table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
    }
});

// Grade-to-point mapping
const letterGradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.5,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.5,
    "C": 2.0,
    "C-": 1.7,
    "D": 1.0,
    "F": 0.0
};

// Calculate GPA functionality
document.getElementById('calculate').addEventListener('click', function() {
    const grades = document.querySelectorAll('.grade_input');
    const credits = document.querySelectorAll('.credit_input');
    const marks = document.querySelectorAll('.check_mark');

    let gradesTotal = 0;
    let creditsTotal = 0;
    const GPAOutput = document.getElementById('gpa_output');

    for (let i = 0; i < grades.length; ++i) {
        const grade = grades[i].value;
        const credit = parseFloat(credits[i].value);
        const mark = marks[i].checked;

        if (mark) {
            if (isNaN(credit) || credit < 0 || !letterGradePoints.hasOwnProperty(grade)) {
                GPAOutput.textContent = "Invalid input. Ensure valid grade and non-negative credits.";
                return;
            }
            gradesTotal += letterGradePoints[grade] * credit;
            creditsTotal += credit;
        }
    }

    const GPA = gradesTotal / creditsTotal;
    GPAOutput.textContent = `Your calculated GPA is ${GPA.toFixed(2)}`;
});

// Reset functionality
document.getElementById('reset').addEventListener('click', function() {
    location.reload();
});

// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
