(() => {
  'use strict';

  if (window.MOC_MIEN_API_BASE_URL) return;

  const localHosts = new Set(['localhost', '127.0.0.1']);
  if (localHosts.has(window.location.hostname)) {
    window.MOC_MIEN_API_BASE_URL = 'http://127.0.0.1:8000';
    return;
  }

  window.MOC_MIEN_API_BASE_URL = 'https://moc-vi-demo.onrender.com';
})();
