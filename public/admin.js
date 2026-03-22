const form = document.getElementById('jsonForm');
const editor = document.getElementById('jsonEditor');
const statusEl = document.getElementById('status');

function showStatus(message, ok) {
  statusEl.textContent = message;
  statusEl.style.color = ok ? '#00695c' : '#bf360c';
}

async function loadContent() {
  try {
    const response = await fetch('/api/content');
    const content = await response.json();
    editor.value = JSON.stringify(content, null, 2);
    showStatus('Loaded current portfolio JSON.', true);
  } catch (error) {
    showStatus('Failed to load content.', false);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let parsed;
  try {
    parsed = JSON.parse(editor.value);
  } catch (error) {
    showStatus(`Invalid JSON: ${error.message}`, false);
    return;
  }

  try {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed)
    });

    if (!response.ok) {
      showStatus('Save failed.', false);
      return;
    }

    showStatus('Saved successfully. Redirecting...', true);
    setTimeout(() => {
      window.location.href = '/';
    }, 900);
  } catch (error) {
    showStatus('Error while saving.', false);
  }
});

document.addEventListener('DOMContentLoaded', loadContent);
