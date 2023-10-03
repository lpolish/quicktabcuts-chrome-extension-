(function() {
  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['shortcuts'], function(data) {
      const shortcuts = data.shortcuts || [];
      const container = document.getElementById('shortcut-container');
      shortcuts.forEach(function(sc) {
        const btn = document.createElement('button');
        btn.innerText = sc.name;
        btn.addEventListener('click', function() {
          window.open(sc.url, '_blank');
        });
        container.appendChild(btn);
      });
    });
  });
})();
