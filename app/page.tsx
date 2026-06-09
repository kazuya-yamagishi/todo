'use client';

import { useState, useEffect, useRef } from 'react';

type Priority = 'high' | 'medium' | 'low';

type Todo = {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
};

const PRIORITY_NEXT: Record<Priority, Priority> = { high: 'medium', medium: 'low', low: 'high' };
const PRIORITY_LABEL: Record<Priority, string> = { high: '高', medium: '中', low: '低' };
const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

/* ──────────────────────────────────────────────────────
   イラスト①：月の上でひなたぼっこするねこ
────────────────────────────────────────────────────── */
function IllustrationHero() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="hero-illustration"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 背景の小さな星 */}
      <circle cx="18"  cy="22"  r="1.5" fill="#fde68a" />
      <circle cx="210" cy="18"  r="1"   fill="#f9a8d4" />
      <circle cx="228" cy="68"  r="2"   fill="#c4b5fd" />
      <circle cx="12"  cy="92"  r="1.5" fill="#a5f3fc" />
      <circle cx="226" cy="142" r="1"   fill="#fde68a" />
      <circle cx="8"   cy="158" r="1.8" fill="#c4b5fd" />
      <circle cx="52"  cy="12"  r="1"   fill="#c4b5fd" />
      <circle cx="188" cy="42"  r="1.5" fill="#fde68a" />
      <circle cx="172" cy="172" r="1"   fill="#f9a8d4" />
      <circle cx="32"  cy="172" r="1.5" fill="#c4b5fd" />
      <circle cx="142" cy="8"   r="1"   fill="#fde68a" />
      <circle cx="70"  cy="185" r="1"   fill="#a5f3fc" />

      {/* スパークル ✦ */}
      <text x="26"  y="56"  fontSize="10" fill="#fde68a" opacity="0.75">✦</text>
      <text x="196" y="108" fontSize="8"  fill="#f9a8d4" opacity="0.75">✦</text>
      <text x="40"  y="145" fontSize="6"  fill="#c4b5fd" opacity="0.75">✦</text>
      <text x="184" y="168" fontSize="7"  fill="#fde68a" opacity="0.75">✦</text>

      {/* 月のグロー（外側から内側へ） */}
      <circle cx="118" cy="116" r="74" fill="#fbbf24" opacity="0.03" />
      <circle cx="118" cy="116" r="62" fill="#fbbf24" opacity="0.06" />

      {/* 月本体 */}
      <circle cx="118" cy="116" r="50" fill="#fde68a" />

      {/* 月面の模様 */}
      <circle cx="97"  cy="102" r="7"   fill="#fbbf24" opacity="0.35" />
      <circle cx="136" cy="128" r="4.5" fill="#fbbf24" opacity="0.28" />
      <circle cx="112" cy="132" r="3.5" fill="#fbbf24" opacity="0.22" />

      {/* ねこ：胴体 */}
      <ellipse cx="118" cy="120" rx="23" ry="19" fill="#c4b5fd" />

      {/* ねこ：頭 */}
      <circle cx="118" cy="94" r="19" fill="#c4b5fd" />

      {/* 耳（外） */}
      <polygon points="105,83 98,67 112,80"  fill="#c4b5fd" />
      <polygon points="131,83 138,67 124,80" fill="#c4b5fd" />
      {/* 耳（内） */}
      <polygon points="106,81 100,69 112,79" fill="#f9a8d4" />
      <polygon points="130,81 136,69 124,79" fill="#f9a8d4" />

      {/* 目（睡眠中・半弧） */}
      <path d="M110,93 Q114,90 118,93" stroke="#5b21b6" strokeWidth="2"   fill="none" strokeLinecap="round" />
      <path d="M118,93 Q122,90 126,93" stroke="#5b21b6" strokeWidth="2"   fill="none" strokeLinecap="round" />
      {/* まつげ */}
      <line x1="111" y1="93" x2="110" y2="90.5" stroke="#5b21b6" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="118" y1="91" x2="118" y2="88.5" stroke="#5b21b6" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="125" y1="93" x2="126" y2="90.5" stroke="#5b21b6" strokeWidth="1.2" strokeLinecap="round" />

      {/* 鼻 */}
      <ellipse cx="118" cy="99" rx="3" ry="2.2" fill="#f472b6" />
      {/* 口 */}
      <path d="M115,101.5 Q118,105.5 121,101.5" stroke="#f472b6" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* ほっぺ（うっすらピンク） */}
      <ellipse cx="107" cy="101" rx="5.5" ry="3.2" fill="#f9a8d4" opacity="0.45" />
      <ellipse cx="129" cy="101" rx="5.5" ry="3.2" fill="#f9a8d4" opacity="0.45" />

      {/* しっぽ（二重線でふわっと） */}
      <path d="M141,126 Q161,107 153,91" stroke="#c4b5fd" strokeWidth="9"   fill="none" strokeLinecap="round" />
      <path d="M141,126 Q161,107 153,91" stroke="#ede9fe" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* 前足 */}
      <ellipse cx="105" cy="133" rx="10" ry="6" fill="#c4b5fd" />
      <ellipse cx="131" cy="133" rx="10" ry="6" fill="#c4b5fd" />

      {/* zzz（眠りのz） */}
      <text x="146" y="72" fontSize="11" fill="#c4b5fd"  opacity="0.80" fontWeight="bold">z</text>
      <text x="155" y="61" fontSize="9"  fill="#a78bfa"  opacity="0.65" fontWeight="bold">z</text>
      <text x="162" y="52" fontSize="7"  fill="#ddd6fe"  opacity="0.50" fontWeight="bold">z</text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────
   イラスト②：タスクが空のときの不思議そうなねこ
────────────────────────────────────────────────────── */
function IllustrationEmpty() {
  return (
    <svg
      viewBox="0 0 130 130"
      className="empty-illustration"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 背景の星 */}
      <circle cx="18"  cy="25" r="1.2" fill="#fde68a" opacity="0.6" />
      <circle cx="108" cy="20" r="1"   fill="#f9a8d4" opacity="0.6" />
      <circle cx="115" cy="65" r="1.5" fill="#c4b5fd" opacity="0.6" />
      <circle cx="12"  cy="80" r="1"   fill="#a5f3fc" opacity="0.6" />
      <text x="22" y="50" fontSize="9" fill="#fde68a" opacity="0.55">✦</text>
      <text x="88" y="42" fontSize="8" fill="#c4b5fd" opacity="0.55">✦</text>

      {/* 胴体 */}
      <ellipse cx="65" cy="93" rx="18" ry="13" fill="#c4b5fd" opacity="0.75" />

      {/* 頭 */}
      <circle cx="65" cy="68" r="20" fill="#c4b5fd" opacity="0.75" />

      {/* 耳 */}
      <polygon points="51,57 44,41 56,55" fill="#c4b5fd" opacity="0.75" />
      <polygon points="79,57 86,41 74,55" fill="#c4b5fd" opacity="0.75" />
      <polygon points="52,56 46,43 56,54" fill="#f9a8d4" opacity="0.75" />
      <polygon points="78,56 84,43 74,54" fill="#f9a8d4" opacity="0.75" />

      {/* 目（ぱっちり・不思議そう） */}
      <circle cx="58"   cy="66"   r="4.5" fill="#5b21b6" opacity="0.85" />
      <circle cx="72"   cy="66"   r="4.5" fill="#5b21b6" opacity="0.85" />
      <circle cx="59.5" cy="64.5" r="1.8" fill="white"   opacity="0.90" />
      <circle cx="73.5" cy="64.5" r="1.8" fill="white"   opacity="0.90" />

      {/* 鼻・口 */}
      <ellipse cx="65" cy="73" rx="2.5" ry="1.8" fill="#f472b6" opacity="0.70" />
      <path d="M62,75.5 Q65,78.5 68,75.5" stroke="#f472b6" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.70" />

      {/* ほっぺ */}
      <ellipse cx="54" cy="71" rx="4.5" ry="2.8" fill="#f9a8d4" opacity="0.35" />
      <ellipse cx="76" cy="71" rx="4.5" ry="2.8" fill="#f9a8d4" opacity="0.35" />

      {/* 頭上の「？」 */}
      <text x="57" y="30" fontSize="16" fill="#a78bfa" opacity="0.50" fontWeight="bold">?</text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────
   メインページ
────────────────────────────────────────────────────── */
export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  // ページ読み込み時に localStorage から復元
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 既存データに priority がない場合は 'medium' を補完
        setTodos(parsed.map((t: Todo) => ({ ...t, priority: t.priority ?? 'medium' })));
      } catch { /* 破損データは無視 */ }
    }
  }, []);

  // todos が変わるたびに localStorage へ保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: Date.now(), text, done: false, priority: newPriority }]);
    setInput('');
    inputRef.current?.focus();
  };

  const toggleTodo = (id: number) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id: number) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  const cyclePriority = (id: number) =>
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, priority: PRIORITY_NEXT[t.priority] } : t
    ));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo();
  };

  const remaining = todos.filter(t => !t.done).length;

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  });

  return (
    <main>
      <div className="container">

        {/* ヒーローイラスト */}
        <IllustrationHero />

        <h1>🌙 Todoリスト</h1>

        {/* 入力エリア */}
        <div className="add-section">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="やることを入力..."
            className="todo-input"
            autoFocus
          />
          <select
            value={newPriority}
            onChange={e => setNewPriority(e.target.value as Priority)}
            className={`priority-select priority-select-${newPriority}`}
            aria-label="優先度を選択"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
          <button onClick={addTodo} className="add-btn">追加</button>
        </div>
        <p className="hint">Enter キーでも追加できます</p>

        {/* リスト or 空状態 */}
        {todos.length === 0 ? (
          <div className="empty">
            <IllustrationEmpty />
            <p>
              タスクはまだありません。<br />
              上の入力欄からタスクを追加してみましょう！
            </p>
          </div>
        ) : (
          <>
            <ul className="todo-list">
              {sortedTodos.map(todo => (
                <li
                  key={todo.id}
                  className={`todo-item priority-item-${todo.priority}${todo.done ? ' done' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-check"
                    aria-label={`「${todo.text}」を完了にする`}
                  />
                  <span className="todo-text">{todo.text}</span>
                  <button
                    onClick={() => cyclePriority(todo.id)}
                    className={`priority-badge priority-badge-${todo.priority}`}
                    aria-label={`優先度: ${PRIORITY_LABEL[todo.priority]}（クリックで変更）`}
                    title="クリックで優先度を変更"
                  >
                    {PRIORITY_LABEL[todo.priority]}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                    aria-label={`「${todo.text}」を削除`}
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
            <p className="count">残り {remaining} 件 / 全 {todos.length} 件</p>
          </>
        )}

      </div>
    </main>
  );
}
