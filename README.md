- # Web Scraping with Pyppeteer

This script is a web scraper built using Pyppeteer, an implementation of Puppeteer in Python. The script navigates to a specific URL, waits for specific elements to load, extracts data from those elements, and then stores that data into a JSON file.

## 1. Dependencies

The script depends on:

- **asyncio** : used for managing concurrent tasks, ideal for I/O-bound and high-level structured network code.
- **json** : used for parsing and handling JSON data.
- **pyppeteer** : a Python port of Puppeteer, used for automating headless browser tasks.

Install the dependencies with:

```bash

pip install asyncio json pyppeteer
```

## 2. Function scrape_website()

This asynchronous function scrapes a website's data. It launches a browser, creates a new page, and navigates to a specified URL. The function waits for a particular element, indicated by the CSS selector '.membertext_container', to load within a timeout of 10,000 ms (10 seconds). It then queries the page for all elements with the '.membertext_container' selector, and for each container, it retrieves the text content of the 'h4' and 'span' elements, assumed to be the title and description respectively. These data points are added to a list as dictionaries, and the list is returned after closing the browser.

## 3. Function main()

This asynchronous function serves as the driver function for the script. It calls the `scrape_website()` function and receives the scraped data as a list of dictionaries. It then opens a file named 'members.json' in write mode, and writes the list to the file in JSON format.

## 4. Execution

The script's execution begins by running the `main()` function in an event loop provided by `asyncio.run()`.

## Adaptability

This script can be adapted for use with other websites by modifying:

- **url** : change this to the URL of the website you wish to scrape.
- **CSS Selectors** : modify '.membertext_container', 'h4', and 'span' to match the HTML structure of the website you are scraping. The first selector should identify the container of the data you want, while the second and third selectors should identify the specific data points within the container.

Before scraping a website, ensure you are compliant with the site's terms of service or robots.txt file, and that your activities respect users' privacy and data.

## 5. PlayGround

This project includes a simple HTML site to play around with the data that you are returning from the scrape. To run the site, simply open the index.html file in your browser. The site will load the data from the members.json file and display it in a table.
