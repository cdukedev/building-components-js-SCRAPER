
# This code scrapes the CodeNected members page and saves the data in a json file.


import asyncio
import json
from pyppeteer import launch


async def scrape_website():
    browser = await launch()
    page = await browser.newPage()
    url = 'https://www.codenected.live/'
    await page.goto(url)

    # Wait for the AJAX request to finish loading
    await page.waitForSelector('.membertext_container', {'timeout': 10000})

    containers = await page.querySelectorAll('.membertext_container')
    data = []

    for container in containers:
        title = await page.evaluate('(el) => el.querySelector("h4").textContent', container)
        description = await page.evaluate('(el) => el.querySelector("span").textContent', container)
        data.append({'title': title, 'content': description})

    await browser.close()
    return data


async def main():
    data = await scrape_website()

    with open('members.json', 'w') as outfile:
        json.dump(data, outfile)

asyncio.run(main())
