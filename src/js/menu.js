class Menu {
  constructor() {
    this.active = false;
    this.topbarHeight = 85;
    this.close = document.querySelector('.close');
    this.button = document.querySelector('.header__menu');
    this.header = document.querySelector('.header');
    this.items = document.querySelectorAll('.navigation__item');
    this.menu = document.querySelector('.menu');
    this.page = document.querySelector('.page__content');
    this.percentage = document.querySelector('.progress__percentage');
    this.progress = document.querySelector('.progress');
  }

  init() {
    this.bindUIActions();
  }

  toggleActive() {
    this.active = !this.active;
  }

  isPost() {
    return this.header.classList.contains('header-post');
  }

  bindUIActions() {
    this.button.addEventListener('click', () => {
      this.openMenu();
    });
    this.close.addEventListener('click', () => {
      this.closeMenu();
    });
    window.addEventListener('scroll', () => {
      this.scrollMenu();
      this.progressBar();
    });
  }

  openMenu() {
    this.toggleActive();
    this.header.classList.add('header-up');
    this.menu?.setAttribute('style', 'display: block;');
    if (this.isPost()) {
      this.progress.classList.remove('progress-active');
    }
    setTimeout(() => {
      this.menu.classList.add('menu-active');
      this.toggleItems();
    }, 100);
  }

  toggleItems() {
    const items = this.active ? this.items : [...this.items].reverse();
    items.forEach((item, i) => {
      setTimeout(() => {
        if (this.active) {
          item.classList.add('navigation__item-active');
        } else {
          item.classList.remove('navigation__item-active');
        }
      }, 500 + i * 100);
    });
  }

  closeMenu() {
    this.toggleActive();
    this.toggleItems();
    setTimeout(() => {
      this.menu.classList.remove('menu-active');
      this.menu.removeAttribute('style');
      this.header.classList.remove('header-up');
      if (window.scrollY >= this.topbarHeight) {
        this.progress.classList.add('progress-active');
      } else {
        this.progress.classList.remove('progress-active');
      }
    }, 1200);
  }

  scrollMenu() {
    if (this.isPost()) {
      this.header.classList.toggle(
        'header-sticky',
        window.scrollY > this.topbarHeight,
      );
      this.progress.classList.toggle(
        'progress-active',
        window.scrollY > this.topbarHeight,
      );
    }
  }

  progressBar() {
    if (this.isPost()) {
      const docElement = document.documentElement;
      const docBody = document.body;
      const scrollTop = docElement.scrollTop || docBody.scrollTop;
      const scrollBottom =
        (docElement.scrollHeight || docBody.scrollHeight) - window.innerHeight;
      const percentage = (scrollTop / scrollBottom) * 100;
      this.percentage.style.width = `${percentage}%`;
    }
  }
}

const menu = new Menu();

export default menu;
