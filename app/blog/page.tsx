import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return lang === 'en'
    ? { title: 'Blog | Hello Readers', description: 'Learning tips and stories from the Hello Readers classroom.' }
    : { title: 'Blog | Hello Readers', description: 'Hello Readers의 교육 이야기 — 학습법, 입시 정보, 공부 팁' };
}

const categoryColor: Record<string, string> = {
  '학습법': '#C2A040',
  '내신 전략': '#4A90D9',
  '자기주도학습': '#5BAD6F',
  '입시 정보': '#C0636A',
  '학원 이야기': '#9B7EC8',
  'Learning Tips': '#C2A040',
  'Study Strategy': '#4A90D9',
  'Self-Directed Learning': '#5BAD6F',
  'Education Info': '#C0636A',
  'Hello Readers': '#9B7EC8',
};

const ui = {
  ko: {
    back: '홈으로',
    label: 'Hello Readers',
    title: '교육 블로그',
    subtitle: '학습법, 내신 전략, 입시 정보까지\n학원 현장의 이야기를 전합니다.',
    readSuffix: ' 읽기',
    copyright: '© 2026 Hello Readers. All rights reserved.',
    preparing: '준비중',
    preparingTitle: '글을 준비하고 있습니다.',
    preparingDesc: '곧 새로운 글로 찾아뵙겠습니다.',
  },
  en: {
    back: 'Back to Home',
    label: 'Hello Readers',
    title: 'Blog',
    subtitle: 'Learning tips, study strategies, and stories\nfrom the Hello Readers classroom.',
    readSuffix: ' read',
    copyright: '© 2026 Hello Readers. All rights reserved.',
    preparing: 'Coming Soon',
    preparingTitle: 'Posts coming soon.',
    preparingDesc: "We're working on new content. Check back soon.",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: langParam } = await searchParams;
  const lang = langParam === 'en' ? 'en' : 'ko';
  const t = ui[lang];
  const posts = getAllPosts(lang);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8' }}>

      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href={`/?lang=${lang}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: '#666666' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <img src="/logo.png" alt="Hello Readers" style={{ height: '36px', width: 'auto' }} />
          <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Blog</span>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)' }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A040', letterSpacing: '3px' }}>
          Hello Readers
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
          {t.title}
        </h1>
        <p className="text-lg max-w-xl mx-auto whitespace-pre-line" style={{ color: '#666666', lineHeight: '1.8' }}>
          {t.subtitle}
        </p>
      </section>

      {/* Posts */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          /* 준비중 */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C2A040, transparent)',
              marginBottom: '2rem',
            }} />
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C2A040', letterSpacing: '3px' }}>
              {t.preparing}
            </p>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>
              {t.preparingTitle}
            </h2>
            <p className="text-base" style={{ color: '#999999' }}>
              {t.preparingDesc}
            </p>
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C2A040, transparent)',
              marginTop: '2rem',
            }} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const color = categoryColor[post.category] ?? '#C2A040';
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}?lang=${lang}`}
                  className="blog-card rounded-xl overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                    border: '1px solid #e8e8e8',
                  }}
                >
                  <div style={{ height: '4px', backgroundColor: color }} />
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full mb-4 self-start"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <h2 className="text-lg font-bold mb-3 leading-snug" style={{ color: '#1a1a1a' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm flex-1 mb-6" style={{ color: '#666666', lineHeight: '1.75' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: '#999999' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}{t.readSuffix}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center text-sm"
        style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0', color: '#999999' }}
      >
        {t.copyright}
      </footer>
    </div>
  );
}
