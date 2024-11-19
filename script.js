async function fetchPrompts() {
  try {
    const response = await fetch('prompts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const prompts = await response.json();
    displayTable(prompts);
    window.allPrompts = prompts; // Store for filtering
  } catch (error) {
    console.error('Error loading prompts:', error);
    document.querySelector('tbody').innerHTML = '<tr><td colspan="15">Error loading prompts.</td></tr>';
  }
}

function displayTable(data) {
  const tableBody = document.querySelector('#promptTable tbody');
  tableBody.innerHTML = ''; // Clear previous rows
  data.forEach(prompt => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prompt.prompt_id}</td>
      <td>${prompt.title}</td>
      <td>${prompt.description}</td>
      <td>${prompt.category}</td>
      <td>${prompt.models.join(', ')}</td>
      <td>${prompt.author}</td>
      <td>${prompt.prompt_text}</td>
      <td>${prompt.use_case}</td>
      <td>${prompt.input_type}</td>
      <td>${prompt.output_type}</td>
      <td>${prompt.version_number}</td>
      <td>${prompt.last_updated}</td>
      <td>${prompt.license}</td>
      <td>${prompt.export_format.join(', ')}</td>
    `;
    tableBody.appendChild(row);
  });
}

function sortTable(columnIndex) {
  const table = document.getElementById('promptTable');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);

  // Determine the sort direction (ascending or descending)
  const isAscending = table.dataset.sortDirection === 'asc';
  table.dataset.sortDirection = isAscending ? 'desc' : 'asc';

  // Clear previous sort indicators
  const headers = table.querySelectorAll('th');
  headers.forEach(header => header.classList.remove('sorted-asc', 'sorted-desc'));

  // Add the new sort indicator
  const header = headers[columnIndex];
  header.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');

  // Sort rows
  const sortedRows = rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].innerText.toLowerCase();
    const cellB = b.cells[columnIndex].innerText.toLowerCase();

    if (cellA < cellB) return isAscending ? -1 : 1;
    if (cellA > cellB) return isAscending ? 1 : -1;
    return 0;
  });

  // Reattach rows in sorted order
  tbody.innerHTML = '';
  sortedRows.forEach(row => tbody.appendChild(row));
}

function filterPrompts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = window.allPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(query) ||
    prompt.description.toLowerCase().includes(query) ||
    prompt.category.toLowerCase().includes(query) ||
    prompt.models.some(model => model.toLowerCase().includes(query)) ||
    prompt.author.toLowerCase().includes(query) ||
    prompt.prompt_text.toLowerCase().includes(query) ||
    prompt.use_case.toLowerCase().includes(query) ||
    prompt.input_type.toLowerCase().includes(query) ||
    prompt.output_type.toLowerCase().includes(query) ||
    prompt.version_number.toLowerCase().includes(query) ||
    prompt.last_updated.toLowerCase().includes(query) ||
    prompt.license.toLowerCase().includes(query) ||
    prompt.export_format.some(format => format.toLowerCase().includes(query))
  );
  displayTable(filtered);
}

// Load prompts on page load
fetchPrompts();
