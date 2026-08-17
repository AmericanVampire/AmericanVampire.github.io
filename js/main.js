document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

document.querySelectorAll('[data-site-back]').forEach(button => {
  button.addEventListener('click', () => {
    if (document.referrer && document.referrer.includes(location.hostname)) {
      history.back();
      return;
    }

    window.location.href = button.getAttribute('data-fallback') || '/';
  });
});
