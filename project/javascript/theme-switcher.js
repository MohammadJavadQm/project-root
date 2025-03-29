// theme-switcher.js
export const ListProductForCart = [
  { Name: "The Slim Shady LP", Price: 1510, Img: "../project/assets/images/Eminem/download (3).jpg" },
  { Name: "The Marshall Mathers LP", Price: 2050, Img: "../project/assets/images/Eminem/download (1).jpg" },
  { Name: "The Eminem Show", Price: 780, Img: "../project/assets/images/Eminem/download (2).jpg" },
  { Name: "Encore", Price: 3560, Img: "../project/assets/images/Eminem/download (6).jpg" },
  { Name: "Relapse", Price: 1540, Img: "../project/assets/images/Eminem/OIP (1).jpg" },
  { Name: "Recovery", Price: 8450, Img: "../project/assets/images/Eminem/download (4).jpg" },
  { Name: "Revival", Price: 9540, Img: "../project/assets/images/Eminem/download (7).jpg" },
  { Name: "Kamikaze", Price: 1450, Img: "../project/assets/images/Eminem/download (5).jpg" },
  { Name: "Music to Be Murdered By", Price: 3400, Img: "../project/assets/images/Eminem/download.jpg" },
  { Name: "Infinite", Price: 7000, Img: "../project/assets/images/Eminem/download (8).jpg" }
];

class ThemeManager {
  constructor() {
    this.initTheme();
    this.initProducts();
  }

  initTheme() {
    this.themeToggle = document.getElementById('themeToggle');
    this.htmlEl = document.documentElement;
    this.currentTheme = localStorage.getItem('rosel') || 'light';

    this.applyTheme();
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme() {
    this.htmlEl.setAttribute('data-theme', this.currentTheme);
    if(this.themeToggle) {
      this.themeToggle.innerHTML = this.currentTheme === 'light' ? "🌙" : "☀️";
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('rosel', this.currentTheme);
    this.applyTheme();
  }

  initProducts() {
    this.productsContainer = document.querySelector('.products-container');
    if(!this.productsContainer) return;

    this.renderProducts();
    this.initCartButtons();
  }

  renderProducts() {
    this.productsContainer.innerHTML = ListProductForCart
      .map(product => this.createProductCard(product))
      .join('');
  }

  createProductCard(product) {
    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.Img}" alt="${product.Name}" loading="lazy">
        </div>
        <div class="product-info">
          <h3>${product.Name}</h3>
          <p class="price">${product.Price.toLocaleString()} $</p>
          <button class="btn add-to-cart">Add to cart</button>
        </div>
      </article>
    `;
  }

  initCartButtons() {
    this.productsContainer.addEventListener('click', (e) => {
      if(e.target.closest('.add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard?.querySelector('h3')?.textContent;
        const product = ListProductForCart.find(p => p.Name === productName);
        
        if(product) {
          this.handleAddToCart(product);
        }
      }
    });
  }

  handleAddToCart(product) {
    console.log('Added to cart:', product);
    // منطق سبد خرید را اینجا پیاده‌سازی کنید
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

 // Mobile Menu Toggle
 const mobileContainer = document.querySelector('.mobile-nav-container');
 const menuToggle = document.querySelector('.menu-toggle');

 menuToggle.addEventListener('click', () => {
   mobileContainer.classList.toggle('active');
 });

 // Close menu when clicking outside
 document.addEventListener('click', (e) => {
   if (!mobileContainer.contains(e.target) && !menuToggle.contains(e.target)) {
     mobileContainer.classList.remove('active');
   }
 });