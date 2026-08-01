// 光照寺ホームページ - 共通JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // スクロールアニメーション（Intersection Observer）
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度表示したら監視終了
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を取得
  const animateElements = document.querySelectorAll('.section-title, .app-card, .news-item, .content-block, .hero-content');

  animateElements.forEach((el, index) => {
    el.classList.add('fade-in-up');

    // 遅延を追加してリズムを作る
    if (el.classList.contains('app-card')) {
      const delay = (index % 3) * 100;
      el.style.transitionDelay = `${delay}ms`;
    }

    observer.observe(el);
  });

  // 保険: IntersectionObserverが発火しない環境でも一定時間後に全要素を表示する
  setTimeout(() => {
    animateElements.forEach(el => el.classList.add('visible'));
  }, 3000);

  // Header Scroll Effect
  const header = document.querySelector('.header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');

      // ハンバーガーアイコンのアニメーション用クラス制御などがあればここに追加
      document.body.style.overflow = !expanded ? 'hidden' : ''; // メニューオープン時はスクロール固定
    });
  }

  // リンククリック時にメニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        menuToggle.click();
      }
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
