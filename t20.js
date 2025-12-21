// 自动更新页脚年份，并实现移动端菜单与滚动高亮（简易）
(() => {
  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    // close on link click (mobile)
    if (menu) {
      menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          nav.setAttribute('data-open', 'false');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // section highlight while scrolling
  const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const map = new Map(sections.map((s,i) => [s, links[i]]));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          map.get(ent.target)?.classList.add('active');
        }
      });
    }, {rootMargin: '-35% 0px -55% 0px', threshold: 0.01});
    sections.forEach(s => obs.observe(s));
  }
})();
