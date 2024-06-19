import axios from 'axios'
import { extractUrls } from './parser'
import type { SearchEngine } from './types'

const MAX_URLS = 1000

function getSubmitUrl(searchEngine: SearchEngine) {
  switch (searchEngine) {
    case 'yandex':
      return 'https://yandex.com/indexnow'
    case 'bing':
      return 'https://www.bing.com/indexnow'
    case 'naver':
      return 'https://searchadvisor.naver.com/indexnow'
    case 'yep':
      return 'https://indexnow.yep.com/indexnow'
    case 'seznam.cz':
      return 'https://search.seznam.cz/indexnow'
    case 'indexnow':
    default:
      return 'https://api.indexnow.org/indexnow'
  }
}

function chunkArray(array: string[], size = MAX_URLS) {
  const chunks: string[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function getRandomRange(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

export async function postIndex(sitemap: string, key: string, searchEngine: SearchEngine) {
  const keyLocation = new URL(`/${key}.txt`, sitemap).href
  try {
    await axios.get(keyLocation)
  } catch (e) {
    throw new Error(`Key ${keyLocation} not found`)
  }
  const submitUrl = getSubmitUrl(searchEngine)
  const host = new URL(sitemap).host
  const sitemapUrls = await extractUrls(sitemap)
  const urls = chunkArray(sitemapUrls)
  console.log(`[!] Submitting ${sitemapUrls.length} urls to ${submitUrl} with key ${key}`)
  console.log('[!] To', submitUrl)

  try {
    for (const urlList of urls) {
      const data = {
        keyLocation,
        key,
        host,
        urlList,
      }
      await axios.post(submitUrl, data)
      console.log(`[!] Submitted ${urlList.length} urls`)
      await wait(getRandomRange(2000, 15000))
    }
  } catch (e) {
    console.error(e)
  }
}
