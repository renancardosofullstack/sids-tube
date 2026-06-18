window.addEventListener("load", () => {
  const btn = document.getElementById("accessibility-btn");
  const menu = document.getElementById("accessibility-menu");

  if (!btn || !menu) return;


  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });


  const toggleDarkBtn = document.getElementById("toggle-dark");
  if (toggleDarkBtn) {
    toggleDarkBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
  }

  const toggleThemeBtn = document.getElementById("toggle-theme");
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("custom-scrollbar");
    });
  }

  const toggleContrastBtn = document.getElementById("toggle-contrast");
  if (toggleContrastBtn) {
    toggleContrastBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("contrast");
    });
  }


  let size = 100;
  const increaseBtn = document.getElementById("increase-font");
  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      size = Math.min(size + 10, 200);
      document.documentElement.style.fontSize = size + "%";
    });
  }

  const decreaseBtn = document.getElementById("decrease-font");
  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      size = Math.max(size - 10, 60);
      document.documentElement.style.fontSize = size + "%";
    });
  }


  const librasBtn = document.getElementById("activate-libras");
  if (librasBtn) {
    const observer = new MutationObserver(() => {
      const vlibrasBtn = document.querySelector('.vw-access-button');
      if (vlibrasBtn) {
        librasBtn.addEventListener("click", () => vlibrasBtn.click());
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});
