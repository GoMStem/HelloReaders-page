import { MetadataRoute } from 'next'

const BASE_URL = 'https://helloreaders.co.nz'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 모든 검색 로봇에게
      allow: '/', // 사이트 전체 크롤링 허용
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // 사이트맵 위치 알려주기
  }
}
