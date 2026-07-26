// QUIZ
const quizData = [
  { q: "¿Cuál es el operador de comparación estricta en PHP?", opts: ["==","===","!==","<=>"], ans: 1, exp: "=== compara valor Y tipo. == solo compara valor con coerción." },
  { q: "¿Qué devuelve <code>empty([])</code> en PHP?", opts: ["false","true","null","0"], ans: 1, exp: "Un array vacío es falsy, por lo que empty([]) devuelve true." },
  { q: "¿Qué significa PSR-4 en PHP?", opts: ["Un estándar de seguridad","Un estándar de autoloading de clases","Una función de cifrado","Una versión de PHP"], ans: 1, exp: "PSR-4 es el estándar de autoloading que mapea namespaces a directorios." },
  { q: "¿Cuál de estas previene SQL Injection?", opts: ["mysql_query()","$_GET directo","PDO prepare + execute","htmlspecialchars()"], ans: 2, exp: "PDO con sentencias preparadas separa los datos del SQL, evitando inyección." },
  { q: "¿Qué patrón garantiza una sola instancia de una clase?", opts: ["Factory","Observer","Singleton","Repository"], ans: 2, exp: "Singleton usa un constructor privado y un método estático getInstance() para devolver siempre la misma instancia." }
];

let quizScore = 0, quizCurrent = 0, quizAnswered = [];

function renderQuiz() {
  quizScore = 0; quizCurrent = 0; quizAnswered = new Array(quizData.length).fill(null);
  document.getElementById('quiz-score').style.display = 'none';
  const c = document.getElementById('quiz-container');
  c.innerHTML = quizData.map((q, i) => `
    <div class="quiz-card" id="qcard-${i}">
      <div class="quiz-q">${i+1}. ${q.q}</div>
      <div class="quiz-opts" id="qopts-${i}">
        ${q.opts.map((o, j) => `<button onclick="answerQuiz(${i},${j})">${o}</button>`).join('')}
      </div>
      <div class="quiz-result" id="qres-${i}"></div>
    </div>
  `).join('');
}

function answerQuiz(qi, sel) {
  if (quizAnswered[qi] !== null) return;
  quizAnswered[qi] = sel;
  const q = quizData[qi];
  const btns = document.querySelectorAll(`#qopts-${qi} button`);
  btns.forEach((b, j) => {
    if (j === q.ans) b.classList.add('correct');
    else if (j === sel && sel !== q.ans) b.classList.add('wrong');
    b.disabled = true;
  });
  const res = document.getElementById(`qres-${qi}`);
  res.style.display = 'block';
  if (sel === q.ans) {
    quizScore++;
    res.style.background = 'rgba(6,214,160,.12)';
    res.style.color = '#06d6a0';
    res.style.borderRadius = '7px';
    res.style.padding = '.5rem .8rem';
    res.innerHTML = '✅ ' + q.exp;
  } else {
    res.style.background = 'rgba(255,107,107,.1)';
    res.style.color = '#ff9999';
    res.style.borderRadius = '7px';
    res.style.padding = '.5rem .8rem';
    res.innerHTML = '❌ ' + q.exp;
  }
  if (quizAnswered.every(a => a !== null)) showQuizScore();
}

function showQuizScore() {
  const s = document.getElementById('quiz-score');
  const pct = quizScore / quizData.length;
  document.getElementById('quiz-emoji').textContent = pct >= .8 ? '🏆' : pct >= .6 ? '👍' : '📚';
  document.getElementById('quiz-final').textContent = quizScore + ' / ' + quizData.length + ' correctas';
  document.getElementById('quiz-msg').textContent = pct >= .8 ? '¡Excelente! Dominas PHP.' : pct >= .6 ? 'Bien, sigue practicando.' : 'Repasa los conceptos y vuelve a intentarlo.';
  s.style.display = 'block';
}

function reiniciarQuiz() { renderQuiz(); }

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz-container')) renderQuiz();
});
