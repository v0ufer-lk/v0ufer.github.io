/* Разделы, работы, лайтбокс, 3D-заголовок и реакции страницы на скролл.
   Постеры и иконки рисуются прямо в SVG — без картинок и без сети. */

// ---------- Разделы ----------
// parent: раздел, внутри которого лежит проект (пока не используется, оставлено как в оригинале).
const FOLDERS = {
  video: { icon: 'film', title: 'Видео', desc: 'Шортсы про Minecraft и эдиты по CS2: промо серверов, мемы, мувики.' },
  servers: { icon: 'server', title: 'Серверы', desc: 'Мои Minecraft-проекты: ванила, анархия со своими фишками, вайпы и ивенты.' },
  code: { icon: 'code', title: 'Код', desc: 'Сайты и боты для своих проектов — от GitHub Pages до Python.' }
};

// ---------- Работы ----------
// Чтобы добавить работу — скопируй объект и поставь cat в ключ раздела выше.
// big — крупная надпись на постере, icon — иконка, label — подпись под карточкой.
const WORKS = [
  { cat: 'video', icon: 'play', big: '34 000', title: 'Сервер в шапке профиля', label: 'shorts · minecraft', metric: '34 000 просмотров',
    desc: 'Самый просматриваемый ролик канала: короткое промо сервера, которое набрало 34 тысячи просмотров.',
    href: 'https://www.youtube.com/@v0ufer' },
  { cat: 'video', icon: 'block', big: 'LOCKHUB', title: 'Сервер LockHub', label: 'shorts · ванильный сервер', metric: '9 700 просмотров',
    desc: 'Ролик про свой ванильный сервер: что внутри, как зайти и почему стоит попробовать.',
    href: 'https://www.youtube.com/@v0ufer' },
  { cat: 'video', icon: 'block', big: 'LOCKHUB', title: 'Сервер LockHub — ванильный', label: 'shorts · сервер', metric: '9 000 просмотров',
    desc: 'Ещё один заход на сервер: ванильный мир, выживание и приглашение зайти.',
    href: 'https://www.youtube.com/@v0ufer' },
  { cat: 'video', icon: 'aim', big: 'DICE', title: 'Dice Once x CS2', label: 'эдит · cs2', metric: 'эдит',
    desc: 'Эдит по CS2 под трек Dice Once: ритм, синхрон кадров и ничего лишнего.',
    href: 'https://www.youtube.com/@v0ufer' },
  { cat: 'video', icon: 'bolt', big: 'ROLL', title: 'Heads Will Roll x CS2', label: 'эдит · cs2', metric: 'эдит',
    desc: 'Второй эдит в той же серии — про моменты, которые хочется пересматривать.',
    href: 'https://www.youtube.com/@v0ufer' },
  { cat: 'video', icon: 'film', big: 'МУВИК', title: "don't panic, just play", label: 'тикток · мувики', metric: '9 роликов',
    desc: 'Плейлист «Мувики» в TikTok: короткие нарезки по CS2, фанни-моменты и клипы игроков.',
    href: 'https://www.tiktok.com/@v0ufer' },

  { cat: 'servers', icon: 'cube', big: 'LOCKHUB', title: 'LockHub', label: 'minecraft · ванила + анархия', metric: 'с 2023',
    desc: 'Свой сервер: ванильный мир и анархия со своими фишками, вайпы, ивенты и розыгрыши. Discord, магазин на EasyDonate, свой сайт.' },
  { cat: 'servers', icon: 'globe', big: 'MUGIVARA', title: 'MugivaraCraft', label: 'minecraft · smp 1.21', metric: 'без доната',
    desc: 'Ванильный SMP без PvP и доната: вход по заявке, правила, список игроков, механики и карта — всё на своём сайте.',
    href: 'https://mugivaracraft.ru' },

  { cat: 'code', icon: 'code', big: 'САЙТ', title: 'mugivaracraft.ru', label: 'сайт · html / css / js', metric: '230 коммитов',
    desc: 'Сайт сервера: главная, правила, заявка, игроки, карта, механики. GitHub Pages и свой домен.',
    href: 'https://github.com/v0ufer/mugiwara.github.oi' },
  { cat: 'code', icon: 'bot', big: 'PY', title: 'fotofilterbot', label: 'telegram-бот · python', metric: 'форк',
    desc: 'Бот, который накладывает фильтры на картинки. Открытый проект — брал как основу и разбирался в коде.',
    href: 'https://github.com/v0ufer/fotofilterbot' },
  { cat: 'code', icon: 'chat', big: 'v1', title: 'Первые сайты', label: 'github pages', metric: '2024',
    desc: 'Стартовые статические страницы для серверов — ggclub и sunvanilla. С них всё началось.',
    href: 'https://github.com/v0ufer?tab=repositories' }
];

const el = (tag, cls, attrs = {}) => Object.assign(document.createElement(tag), cls ? { className: cls } : {}, attrs);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Постеры с иконками ----------
// Иконки живут в круглом бейдже: без неона, но заметно и аккуратно на тёмной карточке.
const ICONS = {
  play: '<rect x="2.4" y="4.2" width="19.2" height="15.6" rx="4.6" fill="rgba(245,239,226,.12)"/>'
    + '<path d="M10 8.7l6.2 3.3-6.2 3.3z" fill="#f5efe2"/>'
    + '<rect x="2.4" y="4.2" width="19.2" height="15.6" rx="4.6" fill="none" stroke="#f5efe2" stroke-width="1.6"/>',
  block: '<path d="M12 2.2l8.8 4.9L12 12 3.2 7.1z" fill="rgba(245,239,226,.92)"/>'
    + '<path d="M3.2 7.1v9.8L12 21.8v-9.8z" fill="rgba(245,239,226,.42)"/>'
    + '<path d="M20.8 7.1v9.8L12 21.8v-9.8z" fill="rgba(245,239,226,.66)"/>'
    + '<path d="M12 2.2l8.8 4.9L12 12 3.2 7.1zM3.2 7.1v9.8L12 21.8v-9.8zM20.8 7.1v9.8L12 21.8v-9.8z" fill="none" stroke="#f5efe2" stroke-width="1.5" stroke-linejoin="round"/>',
  snow: '<path d="M12 2.2v19.6M3.5 7.1l17 9.8M20.5 7.1l-17 9.8" stroke="#f5efe2" stroke-width="1.7" stroke-linecap="round"/>'
    + '<path d="M12 6.2l2.6-2.2M12 6.2L9.4 4M12 17.8l2.6 2.2M12 17.8L9.4 20M7.9 8.8l-.8-3.2M7.9 8.8l-3.2-1M16.1 15.2l.8 3.2M16.1 15.2l3.2 1M16.1 8.8l.8-3.2M16.1 8.8l3.2-1M7.9 15.2l-.8 3.2M7.9 15.2l-3.2 1" stroke="#f5efe2" stroke-width="1.4" stroke-linecap="round"/>'
    + '<circle cx="12" cy="12" r="1.8" fill="#f5efe2"/>',
  aim: '<circle cx="12" cy="12" r="7.8" fill="none" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<path d="M12 1.6v4.6M12 17.8v4.6M1.6 12h4.6M17.8 12h4.6" stroke="#f5efe2" stroke-width="1.8" stroke-linecap="round"/>'
    + '<circle cx="12" cy="12" r="1.9" fill="#f5efe2"/>',
  film: '<rect x="2.2" y="4.6" width="19.6" height="14.8" rx="2.8" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<rect x="5" y="7.2" width="3" height="2.4" rx=".7" fill="#f5efe2"/><rect x="5" y="14.4" width="3" height="2.4" rx=".7" fill="#f5efe2"/>'
    + '<rect x="16" y="7.2" width="3" height="2.4" rx=".7" fill="#f5efe2"/><rect x="16" y="14.4" width="3" height="2.4" rx=".7" fill="#f5efe2"/>'
    + '<path d="M10.4 9.2l4 2.8-4 2.8z" fill="#f5efe2"/>',
  server: '<rect x="2.8" y="2.8" width="18.4" height="8" rx="2.6" fill="rgba(245,239,226,.12)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<rect x="2.8" y="13.2" width="18.4" height="8" rx="2.6" fill="rgba(245,239,226,.12)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<circle cx="6.6" cy="6.8" r="1" fill="#f5efe2"/><circle cx="6.6" cy="17.2" r="1" fill="#f5efe2"/>'
    + '<path d="M11 6.8h6.4M11 17.2h6.4" stroke="#f5efe2" stroke-width="1.6" stroke-linecap="round"/>',
  code: '<rect x="2.4" y="4" width="19.2" height="16" rx="3.2" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<path d="M2.4 8.4h19.2" stroke="#f5efe2" stroke-width="1.3" opacity=".75"/>'
    + '<circle cx="5.4" cy="6.2" r=".7" fill="#f5efe2"/>'
    + '<path d="M8 11.8l-2.6 2.4L8 16.6M16 11.8l2.6 2.4L16 16.6M13.2 10.8l-2.4 6.8" fill="none" stroke="#f5efe2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  globe: '<circle cx="12" cy="12" r="8.6" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<ellipse cx="12" cy="12" rx="3.8" ry="8.6" fill="none" stroke="#f5efe2" stroke-width="1.3" opacity=".9"/>'
    + '<path d="M3.4 12h17.2M5.2 7.4h13.6M5.2 16.6h13.6" stroke="#f5efe2" stroke-width="1.3" opacity=".7"/>',
  bot: '<rect x="3.8" y="7.4" width="16.4" height="11.4" rx="3.8" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<path d="M12 3.2v4.2M2 11v3.8M22 11v3.8" stroke="#f5efe2" stroke-width="1.6" stroke-linecap="round"/>'
    + '<circle cx="12" cy="2.9" r="1.1" fill="#f5efe2"/>'
    + '<circle cx="9.2" cy="12.4" r="1.2" fill="#f5efe2"/><circle cx="14.8" cy="12.4" r="1.2" fill="#f5efe2"/>'
    + '<path d="M9.8 16h4.4" stroke="#f5efe2" stroke-width="1.5" stroke-linecap="round"/>',
  chat: '<path d="M20.6 12.1c0 4-3.85 7.2-8.6 7.2-1 0-2-.15-2.9-.42L4.4 21l1.3-3.7c-1.4-1.3-2.3-3.1-2.3-5.2 0-4 3.85-7.2 8.6-7.2s8.6 3.2 8.6 7.2z" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6" stroke-linejoin="round"/>'
    + '<circle cx="8.6" cy="12" r="1.1" fill="#f5efe2"/><circle cx="12" cy="12" r="1.1" fill="#f5efe2"/><circle cx="15.4" cy="12" r="1.1" fill="#f5efe2"/>',
  bolt: '<path d="M13.7 2.3L4.9 13.5h5.5l-1 8.2 8.7-11.3h-5.5z" fill="rgba(245,239,226,.55)" stroke="#f5efe2" stroke-width="1.6" stroke-linejoin="round"/>',
  disc: '<circle cx="12" cy="12" r="8.6" fill="rgba(245,239,226,.10)" stroke="#f5efe2" stroke-width="1.6"/>'
    + '<circle cx="12" cy="12" r="2.2" fill="none" stroke="#f5efe2" stroke-width="1.5"/>'
    + '<path d="M12 3.4a8.6 8.6 0 016.1 2.5" stroke="#f5efe2" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>'
};

function iconMarkup(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.block}</svg>`;
}

// постер: нейтральный фон, круглый бейдж с иконкой и подписи
function poster(w, i, bare) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 800 600');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', w.title + ' — обложка');
  const id = 'p' + i + (bare ? 'b' : '');
  const size = titleSize(w.big || w.title || '');
  const badgeY = bare ? 268 : 236;
  const badgeR = bare ? 118 : 98;
  const scale = (badgeR * 1.55) / 24;
  const caption = '';
  const text = bare
    ? ''
    : `<text x="44" y="64" font-family="Onest, system-ui, sans-serif" font-size="15" letter-spacing="2.4"
             fill="rgba(245,239,226,.5)">${w.label.toUpperCase()}</text>
       <text x="756" y="64" text-anchor="end" font-family="Onest, system-ui, sans-serif" font-size="15"
             fill="rgba(245,239,226,.36)">${w.metric || ''}</text>
       <line x1="44" y1="452" x2="756" y2="452" stroke="rgba(245,239,226,.16)" stroke-width="1"/>
       <text x="44" y="524" font-family="Unbounded, system-ui, sans-serif" font-weight="700" font-size="${size}"
             letter-spacing="-2" fill="#ffffff">${w.big}</text>
       <text x="44" y="562" font-family="Onest, system-ui, sans-serif" font-size="15"
             fill="rgba(245,239,226,.42)">${w.title}</text>`;

  svg.innerHTML =
    `<defs>
       <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#17181c"/><stop offset=".55" stop-color="#101113"/><stop offset="1" stop-color="#0a0b0c"/>
       </linearGradient>
       <radialGradient id="spot${id}" cx=".5" cy=".42" r=".55">
         <stop offset="0" stop-color="#ffffff" stop-opacity=".07"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
       </radialGradient>
     </defs>
     <rect width="800" height="600" fill="url(#bg${id})"/>
     <rect width="800" height="600" fill="url(#spot${id})"/>
     <circle cx="400" cy="${badgeY}" r="${badgeR}" fill="rgba(255,255,255,.035)" stroke="rgba(245,239,226,.2)" stroke-width="1.5"/>
     <g transform="translate(400 ${badgeY}) scale(${scale.toFixed(3)}) translate(-12 -12)"
        stroke-linecap="round" stroke-linejoin="round">${ICONS[w.icon] || ICONS.block}</g>
     ${text}`;
  return svg;
}

function titleSize(text) {
  const n = text.length;
  if (n <= 3) return 104;
  if (n <= 5) return 88;
  if (n <= 7) return 72;
  if (n <= 9) return 58;
  if (n <= 12) return 46;
  return 38;
}

function mediaFor(w, i) {
  const box = el('span', 'media');
  box.append(poster(w, i, false));
  if (w.cat === 'video') box.append(el('span', 'tag', { textContent: '▶ видео' }));
  if (w.cat === 'servers') box.append(el('span', 'tag', { textContent: '⛏ сервер' }));
  if (w.cat === 'code') box.append(el('span', 'tag', { textContent: '</> код' }));
  return box;
}

function coverFor(w, i) {
  return poster(w, i, true);
}

// ---------- Карточки разделов ----------
const foldersBox = document.querySelector('.folders');
const view = document.querySelector('.folder-view');
const list = view.querySelector('.works');
const subBox = el('div', 'folders sub');
list.before(subBox);

const kids = key => Object.keys(FOLDERS).filter(k => FOLDERS[k].parent === key);
const worksIn = key => WORKS.filter(w => w.cat === key);
const plural = n => n % 10 === 1 && n % 100 !== 11 ? 'проект' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'проекта' : 'проектов';

function folderCard(key) {
  const f = FOLDERS[key], items = worksIn(key);
  const a = el('a', 'folder', { href: '#razdel-' + key });
  const stack = el('span', 'stack');
  const covers = items.slice(0, 3).map((w, i) => coverFor(w, i));
  // в веере всегда три обложки: если работ меньше — добираем нейтральной плашкой
  while (covers.length < 3) covers.push(coverFor({ icon: f.icon, title: f.title, label: f.title, big: f.title }, covers.length + 3));
  covers.forEach(c => stack.append(c));
  const info = el('span', 'f-info');
  info.append(
    el('span', 'label', { textContent: `${items.length} ${plural(items.length)}${f.personal ? ' · не на продажу' : ''}` }),
    el('span', 'f-title', { textContent: f.title }),
    el('span', 'f-desc', { textContent: f.desc })
  );
  a.append(stack, info, el('span', 'f-arrow', { textContent: '→', ariaHidden: 'true' }));
  return a;
}
Object.keys(FOLDERS).filter(k => !FOLDERS[k].parent).forEach((k, i) => foldersBox.append(folderCard(k, i)));

// ---------- Внутри раздела ----------
let shownWorks = [];
function openFolder(key, animate = true) {
  const f = FOLDERS[key];
  if (!f) return closeFolder();
  view.querySelector('.fv-title').textContent = f.title;
  view.querySelector('.fv-desc').textContent = f.desc;
  const back = view.querySelector('.back');
  back.href = '#works';
  back.textContent = '← Все разделы';
  const k = kids(key);
  subBox.replaceChildren(...k.map(folderCard));
  subBox.hidden = !k.length;
  shownWorks = worksIn(key);
  list.hidden = !shownWorks.length;
  list.replaceChildren(...shownWorks.map((w, i) => {
    const li = el('li', 'work');
    const btn = el('button', 'work-open', { type: 'button' });
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-label', 'Открыть: ' + w.title);
    btn.append(mediaFor(w, i));
    btn.addEventListener('click', () => openLB(i));
    const meta = el('div', 'meta');
    const row = el('div', 'm-row');
    row.append(el('h3', '', { textContent: w.title }));
    meta.append(el('span', 'label', { textContent: w.label }), row);
    li.append(btn, meta);
    return li;
  }));
  if (!animate || reduce) {
    foldersBox.hidden = true; view.hidden = false;
    view.classList.remove('enter', 'leave', 'anim');
    view.classList.add('in');
    return;
  }
  // плавный переход: карточка разворачивает обложки, список разделов уходит,
  // работы появляются лесенкой
  const card = foldersBox.querySelector('a[href="#razdel-' + key + '"]');
  if (card) card.classList.add('opening');
  foldersBox.classList.add('out');
  setTimeout(() => {
    if (card) card.classList.remove('opening');
    foldersBox.hidden = true;
    foldersBox.classList.remove('out');
    view.hidden = false;
    view.classList.add('enter');
    view.classList.remove('in');
    [...list.children].forEach((li, n) => li.style.setProperty('--wd', Math.min(n, 9) * 55 + 'ms'));
    // принудительный reflow вместо requestAnimationFrame: анимация не зависит от кадров
    void view.offsetHeight;
    view.classList.remove('enter');
    view.classList.add('in');
    // страховка: что бы ни случилось, работы должны стать видимыми
    setTimeout(() => view.classList.add('in'), 900);
  }, 250);
}
function closeFolder(animate = true) {
  if (!animate || reduce) {
    list.replaceChildren(); subBox.replaceChildren();
    view.hidden = true; foldersBox.hidden = false;
    view.classList.remove('in', 'enter', 'leave');
    return;
  }
  view.classList.add('leave');
  view.classList.remove('in');
  setTimeout(() => {
    list.replaceChildren(); subBox.replaceChildren();
    view.hidden = true;
    view.classList.remove('leave', 'enter');
    foldersBox.hidden = false;
    foldersBox.classList.add('out');
    requestAnimationFrame(() => foldersBox.classList.remove('out'));
  }, 260);
}
function route(scroll) {
  const m = location.hash.match(/^#razdel-(\w+)/);
  if (m) {
    openFolder(m[1], true);
    if (scroll) setTimeout(() => document.getElementById('works').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), reduce ? 0 : 230);
  } else if (!view.hidden) closeFolder(true);
}
addEventListener('hashchange', () => route(true));
if (location.hash.startsWith('#razdel-')) history.replaceState(null, '', location.pathname + location.search);

// ---------- Лайтбокс ----------
const lb = document.querySelector('.lightbox');
const lbMedia = lb.querySelector('.lb-media');
const lbSide = lb.querySelector('.lb-side');
const lbCount = lb.querySelector('.lb-count');
const lbLink = lb.querySelector('.lb-link');
let current = 0;
function openLB(i) {
  current = i;
  const w = shownWorks[i];
  lbMedia.replaceChildren(poster(w, i, false));
  lb.querySelector('#lb-title').textContent = w.title;
  lb.querySelector('.lb-desc').textContent = w.desc;
  lbCount.textContent = `${String(i + 1).padStart(2, '0')} / ${String(shownWorks.length).padStart(2, '0')} · ${w.label}`;
  if (w.href) { lbLink.href = w.href; lbLink.hidden = false; } else { lbLink.hidden = true; }
  document.body.classList.add('lb-open');
  if (!lb.open) lb.showModal();
}
function closeLB() { lbMedia.replaceChildren(); lb.close(); document.body.classList.remove('lb-open'); }
lb.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
  openLB((current + +b.dataset.step + shownWorks.length) % shownWorks.length);
}));
lb.querySelector('.lb-close').addEventListener('click', closeLB);
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
lb.addEventListener('close', () => { lbMedia.replaceChildren(); document.body.classList.remove('lb-open'); });
lb.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') lb.querySelector('[data-step="1"]').click();
  if (e.key === 'ArrowLeft') lb.querySelector('[data-step="-1"]').click();
});

// ---------- 3D-заголовок ----------
document.querySelectorAll('.title3d').forEach(title => {
  const text = title.textContent.trim();
  title.setAttribute('aria-label', text);
  title.textContent = '';
  const letters = [];
  let n = 0;
  text.split(' ').forEach((word, wi) => {
    if (wi) title.append(' ');
    const w = el('span', 'word');
    w.setAttribute('aria-hidden', 'true');
    [...word].forEach(ch => {
      const s = el('span', 'ch');
      const inner = el('span', 'in', { textContent: ch });
      inner.style.animationDelay = (n++ * -0.23).toFixed(2) + 's';
      s.append(inner); w.append(s);
      letters.push({ s, z: 0, rx: 0, o: 1 });
    });
    title.append(w);
  });

  if (!reduce) {
    let mx = -9999, my = -9999, over = 0, overTarget = 0, tiltX = 0, tiltY = 0, raf = 0, touchTimer = 0;
    const tick = () => {
      raf = 0;
      over += (overTarget - over) * .09;
      const box = title.getBoundingClientRect();
      const tx = overTarget ? ((mx - box.left) / box.width - .5) * 2 : 0;
      const ty = overTarget ? ((my - box.top) / box.height - .5) * 2 : 0;
      tiltX += (ty * -10 - tiltX) * .08; tiltY += (tx * 14 - tiltY) * .08;
      title.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      let moving = Math.abs(overTarget - over) > .002 || Math.abs(tiltX) + Math.abs(tiltY) > .05;
      letters.forEach(L => {
        const z = -over * 520, rx = over * 14, o = 1 - over * .35;
        L.z += (z - L.z) * .12; L.rx += (rx - L.rx) * .12; L.o += (o - L.o) * .12;
        if (Math.abs(z - L.z) > .3) moving = true;
        L.s.style.transform = `translateZ(${L.z.toFixed(1)}px) rotateX(${L.rx.toFixed(1)}deg)`;
        L.s.style.opacity = L.o.toFixed(3);
      });
      if (moving || overTarget) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const near = (x, y) => {
      const b = title.getBoundingClientRect(), m = overTarget ? 90 : 20;
      return x > b.left - m && x < b.right + m && y > b.top - m && y < b.bottom + m;
    };
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      mx = e.clientX; my = e.clientY;
      overTarget = near(mx, my) ? 1 : 0;
      kick();
    }, { passive: true });
    document.addEventListener('pointerleave', () => { overTarget = 0; kick(); });
    title.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'touch') return;
      mx = e.clientX; my = e.clientY; overTarget = 1; kick();
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { overTarget = 0; kick(); }, 1400);
    });
  }
});

// ---------- Блоки поднимаются при скролле ----------
var revealIO;
function reveal(nodes, step = .08) {
  if (reduce || !('IntersectionObserver' in window)) return;
  revealIO = revealIO || new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) { target.classList.add('in'); revealIO.unobserve(target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  nodes.forEach((n, i) => {
    if (!n) return;
    n.classList.remove('in');
    n.classList.add('reveal');
    n.style.setProperty('--d', (Math.min(i, 8) * step).toFixed(2) + 's');
    revealIO.observe(n);
  });
}
reveal([...document.querySelectorAll('.sec-head')], 0);
reveal([...document.querySelectorAll('.price-row')], .07);
reveal([...document.querySelectorAll('.stats li'), document.querySelector('.note')], .06);
reveal([...document.querySelectorAll('.setup-panel')], 0);
reveal([...document.querySelectorAll('.contact h2, .contact .lead, .contact .contact-links li')], .1);

// ---------- Рисунок сетапа: линии прорисовываются, когда блок в кадре ----------
const setupArt = document.querySelector('.setup-art');
if (setupArt) {
  if ('IntersectionObserver' in window && !reduce) {
    const artIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { setupArt.classList.add('draw'); artIO.disconnect(); }
    }), { threshold: .35 });
    artIO.observe(setupArt);
  } else {
    setupArt.classList.add('draw');
  }
}

// ---------- Загрузка, шапка, долина ----------
const loader = document.getElementById('loader');
let shown = false;
window.valleyReady = () => {
  if (shown) return; shown = true;
  loader.classList.add('gone');
  setTimeout(() => document.querySelectorAll('.ui').forEach(n => n.classList.add('on')), 500);
};
setTimeout(() => window.valleyReady(), 4500);

const header = document.getElementById('top');
const valleyEl = document.getElementById('valley');
const onScroll = () => {
  const k = Math.min(scrollY / innerHeight, 1);
  valleyEl.style.opacity = (1 - k * .7).toFixed(3);
  header.classList.toggle('solid', scrollY > innerHeight * .6);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// ---------- Игровой HUD: координаты и «биом» по разделам ----------
const hudX = document.getElementById('hud-x');
const hudY = document.getElementById('hud-y');
const hudZ = document.getElementById('hud-z');
const hudBiome = document.getElementById('hud-biome');
const BIOMES = [
  ['hero', 'кристальная долина'],
  ['works', 'проекты'],
  ['prices', 'обо мне'],
  ['process', 'сетап'],
  ['contact', 'контакты']
];
let hudQueued = false;
function updateHud() {
  hudQueued = false;
  if (!hudX) return;
  const z = Math.round(scrollY / 5);
  const x = Math.round(Math.sin(scrollY / 640) * 46 + Math.sin(scrollY / 170) * 6);
  const y = Math.max(4, 96 - Math.round(scrollY / 24));
  hudX.textContent = (x < 0 ? '−' : '') + String(Math.abs(x)).padStart(3, '0');
  hudY.textContent = String(y).padStart(2, '0');
  hudZ.textContent = '−' + String(z).padStart(4, '0');
  let name = BIOMES[0][1];
  for (const [id, n] of BIOMES) {
    const node = document.getElementById(id);
    if (node && node.getBoundingClientRect().top <= innerHeight * .5) name = n;
  }
  if (hudBiome.textContent !== name) hudBiome.textContent = name;
}
addEventListener('scroll', () => {
  if (hudQueued) return;
  hudQueued = true;
  requestAnimationFrame(updateHud);
}, { passive: true });
updateHud();

// наведение на стрелку поднимает цветы в воздух, уход — отпускает
const go = document.getElementById('go');
go.addEventListener('pointerenter', () => window.valley && window.valley.gather(true));
go.addEventListener('pointerleave', () => window.valley && window.valley.gather(false));
go.addEventListener('focus', () => window.valley && window.valley.gather(true));
go.addEventListener('blur', () => window.valley && window.valley.gather(false));
