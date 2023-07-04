# Necessary packages are imported
import asyncio  # Allows for asynchronous IO operations for enhanced performance
import json
from pyppeteer import launch  # Launches a browser instance for website interaction


async def scrape_website():
    """Scrapes data from the specified website."""

    # Launch a headless browser and create a new page.
    browser = await launch()
    page = await browser.newPage()

    # Navigate to the target webpage.
    url = 'https://www.codenected.live/'
    await page.goto(url)

    # Wait until the required AJAX content loads on the page.
    await page.waitForSelector('.membertext_container', {'timeout': 10000})

    # Find all containers that have the required content.
    containers = await page.querySelectorAll('.membertext_container')

    # The data scraped from the website will be stored in this list.
    data = []

    for container in containers:
        # Evaluate JavaScript code on the page to extract the content.
        title = await page.evaluate('(el) => el.querySelector("h4").textContent', container)
        description = await page.evaluate('(el) => el.querySelector("span").textContent', container)

        # Store the scraped data.
        data.append({'title': title, 'content': description})

    # Close the browser once the task is complete.
    await browser.close()

    return data


async def main():
    """Executes the scraping operation and saves the result to a JSON file."""

    data = await scrape_website()

    # Save the scraped data to a JSON file.
    with open('members.json', 'w') as outfile:
        json.dump(data, outfile)

# Ensure the main function is only executed when the script is run directly (not imported as a module).
if __name__ == "__main__":
    asyncio.run(main())
