document.getElementById('addNamesButton').addEventListener('click', function() {
    const namesInput = document.getElementById('namesInput');
    const names = namesInput.value.split(',').map(name => name.trim()).filter(name => name !== '');
    names.forEach(name => {
        if (name) {
            addNameToList(name);
        }
    });
    namesInput.value = ''; // Clear the input field
});

document.getElementById('addNameButton').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name) {
        addNameToList(name);
        nameInput.value = '';
    }
});

function addNameToList(name) {
    const nameList = document.getElementById('nameList');
    const listItem = document.createElement('li');
    listItem.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        nameList.removeChild(listItem);
    });

    const unavailableDaysInput = document.createElement('input');
    unavailableDaysInput.type = 'text';
    unavailableDaysInput.placeholder = 'Unavailable days (e.g., [1-10],25)';

    listItem.appendChild(unavailableDaysInput);
    listItem.appendChild(removeButton);
    nameList.appendChild(listItem);
}

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const names = [];
    const nameListItems = document.getElementById('nameList').children;
    for (let item of nameListItems) {
        const name = item.firstChild.textContent;
        const unavailableDaysInput = item.querySelector('input').value;
        console.log(`Name: ${name}, Unavailable Days Input: ${unavailableDaysInput}`);
        const unavailableDays = parseUnavailableDays(unavailableDaysInput);
        console.log(`Parsed Unavailable Days: ${unavailableDays}`);
        names.push({ name, unavailableDays });
    }

    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const resultTableBody = document.getElementById('resultTable').querySelector('tbody');
    
    resultTableBody.innerHTML = ''; // Clear previous results

    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let nameIndex = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();

        // Skip Saturday (6), Sunday (0), and Wednesday (3)
        if (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6) {
            continue;
        }

        // Find the next available name
        while (names[nameIndex].unavailableDays.includes(day)) {
            nameIndex = (nameIndex + 1) % names.length;
        }

        const row = document.createElement('tr');
        const dayOfWeekCell = document.createElement('td');
        const dayOfMonthCell = document.createElement('td');
        const nameCell = document.createElement('td');

        dayOfWeekCell.textContent = weekdays[dayOfWeek];
        dayOfMonthCell.textContent = day;
        nameCell.textContent = names[nameIndex].name;

        row.appendChild(dayOfWeekCell);
        row.appendChild(dayOfMonthCell);
        row.appendChild(nameCell);
        resultTableBody.appendChild(row);

        nameIndex = (nameIndex + 1) % names.length; // Cycle through names
    }
});

function parseUnavailableDays(input) {
    const unavailableDays = [];
    const parts = input.split(',');
    parts.forEach(part => {
        part = part.trim();
        if (part.startsWith('[') && part.endsWith(']')) {
            const range = part.slice(1, -1).split('-').map(Number);
            if (range.length === 2 && !isNaN(range[0]) && !isNaN(range[1])) {
                for (let i = range[0]; i <= range[1]; i++) {
                    unavailableDays.push(i);
                }
            }
        } else {
            const day = parseInt(part);
            if (!isNaN(day)) {
                unavailableDays.push(day);
            }
        }
    });
    return unavailableDays;
}