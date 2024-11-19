// Fetch and render the prompts
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
    document.querySelector('tbody').innerHTML = '<tr><td colspan="14">Error loading prompts.</td></tr>';
  }
}

// Render the prompts in a table
function displayTable(data) {
  const tableBody = document.querySelector('#promptTable tbody');
  tableBody.innerHTML = ''; // Clear previous rows
  data.forEach(prompt => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prompt["dcterms:identifier"]}</td>
      <td>${prompt["dcterms:title"]}</td>
      <td>${prompt["dcterms:description"]}</td>
      <td>${prompt["dcterms:subject"]}</td>
      <td>${prompt["dcterms:relation"].join(', ')}</td>
      <td>${prompt["dcterms:creator"]}</td>
      <td>${prompt.prompt_text}</td>
      <td>${prompt["dcterms:type"]}</td>
      <td>${prompt.input_type}</td>
      <td>${prompt.output_type}</td>
      <td>${prompt["dcterms:hasVersion"]}</td>
      <td>${prompt["dcterms:modified"]}</td>
      <td>${prompt["dcterms:rights"]}</td>
      <td>${prompt.export_format.join(', ')}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Sort the table based on column index
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

// Corrected filterPrompts function
function filterPrompts() {
  const query = document.getElementById('search').value.toLowerCase();

  const filtered = window.allPrompts.filter(prompt => {
    return (
      (prompt["dcterms:identifier"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:title"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:description"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:subject"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:creator"]?.toLowerCase() || '').includes(query) ||
      (prompt.prompt_text?.toLowerCase() || '').includes(query) ||
      (prompt.input_type?.toLowerCase() || '').includes(query) ||
      (prompt.output_type?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:type"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:hasVersion"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:modified"]?.toLowerCase() || '').includes(query) ||
      (prompt["dcterms:rights"]?.toLowerCase() || '').includes(query) ||
      prompt["dcterms:relation"].some(model => model.toLowerCase().includes(query)) ||
      prompt.export_format.some(format => format.toLowerCase().includes(query))
    );
  });

  displayTable(filtered);
}

// Load prompts on page load
fetchPrompts();
