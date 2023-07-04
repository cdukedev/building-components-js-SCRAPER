// Header component
class Header {
  render() {
    return `
      <header id="header">
        <nav id="nav-bar" class="header-item header-left">
          <a>Home</a> |
          <a>About</a> |
          <a>Contact</a>
        </nav>
        <div class="header-item logo">
          Logo
        </div>
        <div class="header-item header-right">
          User:
          <a>John Smith</a> |
          <a>Logout</a>
        </div>
      </header>
    `;
  }
}

// Hero component
class Hero {
  render() {
    return `
      <section class="hero">
        <div>
          <h2 class="hero-title">Hero Title</h2>
          <h3 class="hero-tagline">Tag Line</h3>
        </div>
      </section>
    `;
  }
}

// MainContent component
class MainContent {
  constructor(data) {
    this.data = data;
  }

  generateCards() {
    return this.data
      .map((item) => {
        return `
        <div class="card">
          <div class="card__content">
            ${item.content}
          </div>
          <h4 class="card__title">
            ${item.title}
          </h4>
        </div>
      `;
      })
      .join("");
  }

  render() {
    return `
      <main>
        <section class="card-list">
          ${this.generateCards()}
        </section>
        <section class="activity-list">
          <div>
            <h3>Activity Feed</h3>
            <div class="activity">
              Activity
            </div>
          </div>
        </section>
      </main>
    `;
  }
}

// Footer component
class Footer {
  render() {
    return `
      <footer>
        <section class="footer footer-left">
          Left Footer
        </section>
        <section class="footer footer-center">
          Center Footer
        </section>
        <section class="footer footer-right">
          Right Footer
        </section>
      </footer>
    `;
  }
}
async function fetchData() {
  const response = await fetch("members.json");
  const data = await response.json();
  return data;
}

class Main {
  constructor() {
    this.header = new Header();
    this.hero = new Hero();
    this.mainContent = null;
    this.footer = new Footer();
  }

  async init() {
    const data = await fetchData();
    this.mainContent = new MainContent(data);
  }

  render() {
    if (!this.mainContent) {
      return "<div>Loading...</div>";
    }

    return `
      <div>
        ${this.header.render()}
        ${this.hero.render()}
        ${this.mainContent.render()}
        ${this.footer.render()}
      </div>
    `;
  }
}

let bootstrap = document.getElementById("main");
let main = new Main();

(async () => {
  await main.init();
  bootstrap.innerHTML = main.render();
})();
