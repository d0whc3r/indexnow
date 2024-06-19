import { describe, expect, test, mock } from 'bun:test'
import { extractUrls } from './parser'
import axios from 'axios'

describe('Parse sitemap', () => {
  test('should parse sitemap urls', async () => {
    mock.module('axios', () => {
      return {
        default: {
          get: () => {
            return Promise.resolve({
              data: `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <url>
                <loc>https://example.com/</loc>
              </url>
              <url>
                <loc>https://example.com/about</loc>
              </url>
              <url>
                <loc>https://example.com/contact</loc>
              </url>
            </urlset>`,
            })
          },
        },
      }
    })

    const sitemap = await extractUrls('https://example.com/sitemap.xml')
    expect(sitemap).toEqual([
      'https://example.com/',
      'https://example.com/about',
      'https://example.com/contact',
    ])
  })
  test('should parse sitemap index', async () => {
    mock.module('axios', () => {
      return {
        default: {
          get: mock((url: string) => {
            if (url === 'https://example.com/sitemap.xml') {
              return Promise.resolve({
                data: `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  <sitemap>
    <loc>https://example.com/about/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/category/sitemap.xml</loc>
  </sitemap>
</sitemapindex>`,
              })
            } else if (url === 'https://example.com/about/sitemap.xml') {
              return Promise.resolve({
                data: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/about</loc>
  </url>
</urlset>`,
              })
            } else if (url === 'https://example.com/category/sitemap.xml') {
              return Promise.resolve({
                data: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/category</loc>
  </url>
</urlset>`,
              })
            }
            return Promise.resolve({ data: '' })
          }),
        },
      }
    })

    const sitemap = await extractUrls('https://example.com/sitemap.xml')
    expect(axios.get).toHaveBeenNthCalledWith(1, 'https://example.com/sitemap.xml')
    expect(axios.get).toHaveBeenNthCalledWith(2, 'https://example.com/about/sitemap.xml')
    expect(axios.get).toHaveBeenNthCalledWith(3, 'https://example.com/category/sitemap.xml')
    expect(sitemap).toEqual(['https://example.com/about', 'https://example.com/category'])
  })
})

