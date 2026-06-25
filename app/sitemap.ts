import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// 실제 배포 도메인
const BASE_URL = 'https://helloreaders.co.nz'

// 지원 언어
const LANGS = ['ko', 'en'] as const
type Lang = (typeof LANGS)[number]

// content/posts/{lang} 폴더에서 마크다운 파일명(slug)을 읽어오는 헬퍼.
// 폴더가 없거나 비어 있으면 빈 배열을 돌려줘서 에러 없이 넘어감.
function getSlugs(lang: Lang): string[] {
  const dir = path.join(process.cwd(), 'content', 'posts', lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

// 특정 페이지의 언어별 URL 묶음을 만들어주는 헬퍼.
// languages에 넣은 언어들끼리 "서로 번역본"이라고 구글에 알려줌(hreflang).
function buildAlternates(pathForLang: (lang: Lang) => string, langs: Lang[]) {
  const languages: Record<string, string> = {}
  for (const lang of langs) {
    languages[lang] = `${BASE_URL}${pathForLang(lang)}`
  }
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // 1) 고정 페이지 (홈, 블로그 목록) — 두 언어 모두 존재하므로 서로 번역본으로 묶음
  const staticPages: { pathFor: (lang: Lang) => string; priority: number; freq: 'monthly' | 'weekly' }[] = [
    { pathFor: (lang) => `/?lang=${lang}`, priority: 1, freq: 'monthly' },
    { pathFor: (lang) => `/blog?lang=${lang}`, priority: 0.8, freq: 'weekly' },
  ]

  for (const page of staticPages) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}${page.pathFor(lang)}`,
        lastModified: new Date(),
        changeFrequency: page.freq,
        priority: page.priority,
        alternates: buildAlternates(page.pathFor, [...LANGS]),
      })
    }
  }

  // 2) 블로그 글 — 언어별 slug 목록을 모아서, 같은 slug가 양쪽에 다 있으면 번역본으로 묶음
  const slugsByLang: Record<Lang, string[]> = {
    ko: getSlugs('ko'),
    en: getSlugs('en'),
  }

  for (const lang of LANGS) {
    for (const slug of slugsByLang[lang]) {
      // 이 slug가 실제로 존재하는 언어만 골라 번역본으로 묶음
      const availableLangs = LANGS.filter((l) => slugsByLang[l].includes(slug))

      entries.push({
        url: `${BASE_URL}/blog/${slug}?lang=${lang}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: buildAlternates(
          (l) => `/blog/${slug}?lang=${l}`,
          availableLangs
        ),
      })
    }
  }

  return entries
}
