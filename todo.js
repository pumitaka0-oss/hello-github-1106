const storageKey = 'ryusei-todos';
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyMessage = document.querySelector('#empty-message');
const remaining = document.querySelector('#remaining');

let todos = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) todos = saved.filter(item => item && typeof item.text === 'string');
} catch {
  todos = [];
}

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(todos)); } catch { /* 保存できない環境でもリストは使える */ }
}

function render() {
  list.replaceChildren();
  emptyMessage.hidden = todos.length > 0;
  remaining.textContent = `${todos.filter(item => !item.done).length} 件のこり`;

  todos.forEach((item, index) => {
    const row = document.createElement('li');
    if (item.done) row.classList.add('done');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = Boolean(item.done);
    check.setAttribute('aria-label', `${item.text}を完了にする`);
    check.addEventListener('change', () => {
      item.done = check.checked;
      save();
      render();
    });

    const text = document.createElement('span');
    text.textContent = item.text;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = '削除';
    remove.setAttribute('aria-label', `${item.text}を削除`);
    remove.addEventListener('click', () => {
      todos.splice(index, 1);
      save();
      render();
    });

    row.append(check, text, remove);
    list.append(row);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  save();
  render();
  input.focus();
});

render();
