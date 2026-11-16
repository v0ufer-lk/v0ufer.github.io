/* Цифры в блоке «кто я такой»: считаются вверх при появлении на экране.
   Плюс необязательный live-режим: если вписать ключ YouTube Data API,
   подписчики/видео/просмотры подтягиваются с канала при загрузке страницы. */
(() => {
  const nums = [...document.querySelectorAll('.stats .num')];
  if (!nums.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function run(el) {
    const to = Number(el.dataset.to || el.textContent.replace(/\s/g, '')) || 0;
    if (reduce) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const dur = 1200;
    const step = t => {
      const k = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function startAll() {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { io.unobserve(en.target); run(en.target); }
      }), { threshold: .5 });
      nums.forEach(n => io.observe(n));
    } else {
      nums.forEach(run);
    }
  }

  startAll();

  // ---- необязательный live-режим ----
  // Ключ создаётся в Google Cloud Console (YouTube Data API v3) и вписывается сюда.
  // Без ключа страница работает на цифрах из разметки — честная дата указана в примечании.
  const LIVE = {
    youtubeKey: '',
    channelId: 'UCcpwcnNamNmcW-K9aRzWl_A'
  };

  if (!LIVE.youtubeKey) return;

  const note = document.getElementById('stats-note');
  const setNum = (i, value) => {
    const el = nums[i];
    if (!el || !Number.isFinite(value)) return;
    el.dataset.to = String(value);
    run(el);
  };

  const url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics'
    + '&id=' + encodeURIComponent(LIVE.channelId)
    + '&key=' + encodeURIComponent(LIVE.youtubeKey);

  fetch(url, { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('http ' + r.status)))
    .then(data => {
      const st = data && data.items && data.items[0] && data.items[0].statistics;
      if (!st) return;
      setNum(0, Number(st.subscriberCount));
      setNum(1, Number(st.videoCount));
      setNum(2, Number(st.viewCount));
      if (note) note.textContent = 'Подписчики, видео и просмотры обновлены только что — прямо с канала.';
      note && note.classList.add('is-live');
    })
    .catch(() => { /* офлайн или ключ не работает — остаются цифры из разметки */ });
})();
