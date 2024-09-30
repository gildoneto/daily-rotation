document
  .getElementById('addNamesButton')
  .addEventListener('click', function () {
    const namesInput = document.getElementById('namesInput');
    const names = namesInput.value
      .split(',')
      .map(name => name.trim())
      .filter(name => name !== '');
    names.forEach(name => {
      if (name) {
        addNameToList(name);
      }
    });
    namesInput.value = ''; // Clear the input field
  });

document.getElementById('addNameButton').addEventListener('click', function () {
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
  removeButton.addEventListener('click', function () {
    nameList.removeChild(listItem);
  });

  const unavailableDaysInput = document.createElement('input');
  unavailableDaysInput.type = 'text';
  unavailableDaysInput.placeholder = 'Unavailable days (e.g., [1-10],25)';

  listItem.appendChild(unavailableDaysInput);
  listItem.appendChild(removeButton);
  nameList.appendChild(listItem);
}

document
  .getElementById('inputForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate that at least one name has been added
    const nameListItems = document.getElementById('nameList').children;
    if (nameListItems.length === 0) {
      alert('Please add at least one name.');
      return;
    }

    // Validate that a month has been selected
    const month = parseInt(document.getElementById('month').value);
    if (isNaN(month) || month < 1 || month > 12) {
      alert('Please select a valid month.');
      return;
    }

    // Validate that a year has been selected
    const year = parseInt(document.getElementById('year').value);
    if (isNaN(year) || year < 2023 || year > 2100) {
      alert('Please select a valid year.');
      return;
    }

    // Validate that at least one day of the week has been selected
    const selectedDays = Array.from(
      document.querySelectorAll('input[name="days"]:checked')
    ).map(input => parseInt(input.value));
    if (selectedDays.length === 0) {
      alert('Please select at least one day of the week.');
      return;
    }

    // Collect names and their unavailable days
    const names = [];
    for (let item of nameListItems) {
      const name = item.firstChild.textContent;
      const unavailableDaysInput = item.querySelector('input').value;
      const unavailableDays = parseUnavailableDays(unavailableDaysInput);
      names.push({ name, unavailableDays });
    }

    const resultTableBody = document
      .getElementById('resultTable')
      .querySelector('tbody');
    resultTableBody.innerHTML = ''; // Clear previous results

    // Set the caption with the selected month and year
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const caption = document
      .getElementById('resultTable')
      .querySelector('caption');
    caption.textContent = `Rotation of ${monthNames[month - 1]} ${year}`;

    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let nameIndex = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();

      // Skip days not selected by the user
      if (!selectedDays.includes(dayOfWeek)) {
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

      // Use uma IIFE para capturar o valor correto de nameIndex
      (function (capturedNameIndex) {
        row.addEventListener('click', function () {
          highlightRowsWithName(names[capturedNameIndex].name);
        });
      })(nameIndex);

      nameIndex = (nameIndex + 1) % names.length; // Cycle through names
    }
  });

document
  .getElementById('resetTableButton')
  .addEventListener('click', function () {
    const resultTableBody = document
      .getElementById('resultTable')
      .querySelector('tbody');
    resultTableBody.innerHTML = ''; // Clear the table body
    const caption = document
      .getElementById('resultTable')
      .querySelector('caption');
    caption.textContent = ''; // Clear the caption
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

function highlightRowsWithName(name) {
  const rows = document.querySelectorAll('#resultTable tbody tr');
  rows.forEach(row => {
    const nameCell = row.cells[2];
    if (nameCell && nameCell.textContent === name) {
      row.classList.toggle('selected-row');
    }
  });
}
