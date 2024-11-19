// Fetch and render the prompts
async function fetchPrompts() {
  try {
    const response = await fetch('prompts.json');
    const prompts = await response.json();
    displayTable(prompts);
    window.allPrompts = prompts; // Store for filtering
  } catch (error) {
    console.error('Error loading prompts:', error);
    document.getElementById('promptTable').innerHTML = '<p>Error loading prompts.</p>';
  }
}

// Render the prompts in a table
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
      <td>${prompt.tags.join(', ')}</td>
      <td>${prompt.author}</td>
      <td>${prompt.last_updated}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Filter prompts based on search input
function filterPrompts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = window.allPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(query) ||
    prompt.description.toLowerCase().includes(query) ||
    prompt.category.toLowerCase().includes(query) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(query)) ||
    prompt.author.toLowerCase().includes(query)
  );
  displayTable(filtered);
}

// Load prompts on page load
fetchPrompts();
