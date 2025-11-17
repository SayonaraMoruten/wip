(function(){
  // Helpers
  const doc = document.documentElement;
  const KEY = 'theme';

  function applyTheme(theme){
    if(theme === 'dark'){
      doc.classList.add('dark');
    } else if(theme === 'light'){
      doc.classList.remove('dark');
    } else {
      // Follow system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      doc.classList.toggle('dark', prefersDark);
    }
  }

  function currentSetting(){
    return localStorage.getItem(KEY);
  }

  function setTheme(theme){
    if(theme === 'light' || theme === 'dark'){
      localStorage.setItem(KEY, theme);
    } else {
      localStorage.removeItem(KEY);
    }
    applyTheme(theme);
  }

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', function(){
    // Bind toggle button if present
    const toggle = document.getElementById('theme-toggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        const isDark = doc.classList.toggle('dark');
        localStorage.setItem(KEY, isDark ? 'dark' : 'light');
      });
    }
  });

  // Respond to system preference changes
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if(media && media.addEventListener){
    media.addEventListener('change', () => {
      const stored = currentSetting();
      if(!stored){ // only if following system
        applyTheme(null);
      }
    });
  }

  // Sync between tabs
  window.addEventListener('storage', (e) => {
    if(e.key === KEY){
      applyTheme(e.newValue);
    }
  });

  // Expose minimal API if needed
  window.toggleTheme = function(){
    const isDark = doc.classList.toggle('dark');
    localStorage.setItem(KEY, isDark ? 'dark' : 'light');
  };
  window.setTheme = setTheme;
})();
