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
    return this.data.map(item => {
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
    }).join('');
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
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}


// CORS ERROR 
// async function fetchPageContent(url) {
//   const response = await fetch(url);
//   const html = await response.text();
//   return html;
// }
// // Extracting Data from Codenected
// function extractData(html) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, 'text/html');

//   const containers = doc.querySelectorAll('.membertext_container');
//   const dataArray = [];

//   containers.forEach(container => {
//     const title = container.querySelector('h4').textContent;
//     const description = container.querySelector('span').textContent;

//     dataArray.push({
//       title: title,
//       content: description,
//     });
//   });

//   return dataArray;
// }
// Example data array
// const data = [
//   { title: 'Card 1', content: 'Content 1' },
//   { title: 'Card 2', content: 'Content 2' },
//   { title: 'Card 3', content: 'Content 3' },
// ];
// Main component
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
      return '<div>Loading...</div>';
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

let bootstrap = document.getElementById('main');
let main = new Main();

(async () => {
  await main.init();
  bootstrap.innerHTML = main.render();
})();