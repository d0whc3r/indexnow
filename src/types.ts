export type SearchEngine = 'indexnow' | 'yandex' | 'bing' | 'seznam.cz' | 'naver' | 'yep'

export interface ProgramaProps {
  url: string
  key: string
  searchEngine: SearchEngine
}

