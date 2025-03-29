import { ListProductForCart } from './theme-switcher.js';

class SearchManager {
  constructor() {
    this.searchModal = document.getElementById('searchModal');
    this.modalResults = document.getElementById('modalResults');
    this.initSearch();
  }

  initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const closeModal = document.querySelector('.close-modal');

    searchIcon?.addEventListener('click', () => this.handleSearch(searchInput));
    searchInput?.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') this.handleSearch(searchInput);
    });

    closeModal?.addEventListener('click', () => this.hideModal());
    this.searchModal?.addEventListener('click', (e) => {
      if(e.target === this.searchModal) this.hideModal();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') this.hideModal();
    });
  }

  handleSearch(searchInput) {
    const searchValue = searchInput.value.trim().toLowerCase();
    const filteredProducts = ListProductForCart.filter(product => 
      product.Name.toLowerCase().includes(searchValue)
    );

    this.renderResults(filteredProducts);
    this.showModal();
  }

  renderResults(products) {
    this.modalResults.innerHTML = products.length > 0 
      ? products.map(product => this.createProductCard(product)).join('')
      : '<p class="no-results">محصولی یافت نشد!</p>';
  }

  createProductCard(product) {
    return `
      <div class="modal-product">
        <img src="${product.Img}" alt="${product.Name}" loading="lazy">
        <div class="product-details">
          <h3>${product.Name}</h3>
          <p>${product.Price.toLocaleString()} $</p>
        </div>
      </div>
    `;
  }

  showModal() {
    this.searchModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.searchModal.classList.add('active');
  }

  hideModal() {
    this.searchModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    this.searchModal.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchManager();
});

const DropdownMenu = document.querySelector('.nav-item');
const MenuParent = document.querySelector('.dropdown-menu');

DropdownMenu.addEventListener('click', function (e) {
  e.preventDefault(); // از رفتار پیش‌فرض لینک جلوگیری می‌کند
  MenuParent.style.display = MenuParent.style.display === "block" ? "none" : "block";
});
