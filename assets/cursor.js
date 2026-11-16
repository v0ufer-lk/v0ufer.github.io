/* Белый круг вместо курсора: плавно догоняет указатель, увеличивается на ссылках
   и инвертирует то, что под ним (mix-blend-mode: difference в стилях).
   Позицию двигает transform, размер меняет CSS — поэтому круг всегда резкий. */
(() => {
  const cur = document.getElementById('cursor');
  if (!cur) return;

  const fine = matchMedia('(pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || !document.body) return;

  document.body.classList.add('has-cursor');

  let tx = innerWidth / 2, ty = innerHeight / 2;
  let x = tx, y = ty;
  let raf = 0, shown = false;
  const ease = reduce ? 1 : .2;

  const apply = () => {
    cur.style.transform = 'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, 0) translate(-50%, -50%)';
  };

  function tick() {
    raf = 0;
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    apply();
    if (Math.abs(tx - x) + Math.abs(ty - y) > .2) raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    tx = e.clientX;
    ty = e.clientY;
    if (!shown) {
      shown = true;
      x = tx; y = ty;
      apply();
      cur.classList.add('on');
    }
    kick();
  }, { passive: true });

  const LINK = 'a, button, summary, label, [role="button"], .folder, .work-open, .chip';
  document.addEventListener('pointerover', e => {
    const t = e.target instanceof Element ? e.target : null;
    cur.classList.toggle('is-link', !!(t && t.closest(LINK)));
  }, { passive: true });

  addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    cur.classList.add('is-pressed');
    setTimeout(() => cur.classList.remove('is-pressed'), 170);
  }, { passive: true });

  document.addEventListener('pointerleave', () => cur.classList.remove('on'));
  document.addEventListener('pointerenter', () => { if (shown) cur.classList.add('on'); });
  addEventListener('blur', () => cur.classList.remove('on'));
})();
