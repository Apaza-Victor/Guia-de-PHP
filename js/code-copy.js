// COPY CODE
function copiar(btn) {
  const pre = btn.closest('.code-wrap').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado';
    setTimeout(() => btn.textContent = 'Copiar', 2000);
  });
}
