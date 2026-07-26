// TABS
function showTab(btn, id) {
  const parent = btn.closest('.concept-body') || btn.closest('.section') || btn.parentElement.parentElement;
  parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}
