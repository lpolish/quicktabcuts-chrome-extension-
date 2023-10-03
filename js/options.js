(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shortcut-form');
    const existingShortcutsDiv = document.getElementById('existing-shortcuts');
  
    function loadExistingShortcuts() {
      existingShortcutsDiv.innerHTML = '';
      chrome.storage.sync.get(['shortcuts'], function(data) {
        const shortcuts = data.shortcuts || [];
        let htmlString = '';
        shortcuts.forEach(function(sc, index) {
          htmlString += `
            <div class="card">
              <div class="card-content">
                <div>
                  <strong>${sc.name}</strong><br>
                  <span>${sc.url}</span>
                </div>
                <button class="delete-button" data-index="${index}">Delete</button>
              </div>
            </div>
          `;
        });
        existingShortcutsDiv.innerHTML = htmlString;
        
        // Attach delete event listeners
        document.querySelectorAll('.delete-button').forEach(function(button) {
          button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            shortcuts.splice(index, 1);
            chrome.storage.sync.set({ 'shortcuts': shortcuts }, loadExistingShortcuts);
          });
        });
      });
    }
  
    loadExistingShortcuts();
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const url = document.getElementById('url').value;
      chrome.storage.sync.get(['shortcuts'], function(data) {
        const shortcuts = data.shortcuts || [];
        shortcuts.push({ name, url });
        chrome.storage.sync.set({ 'shortcuts': shortcuts }, function() {
          loadExistingShortcuts();
          form.reset();
        });
      });
    });
  });
})();
