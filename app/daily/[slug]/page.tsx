import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getDailyPost } from '@/lib/daily';

const categoryColor: Record<string, string> = {
  '학습법': '#C2A040',
  '내신 전략': '#4A90D9',
  '자기주도학습': '#5BAD6F',
  '입시 정보': '#C0636A',
  '학원 이야기': '#9B7EC8',
  '오늘의 소식': '#C2A040',
  'Learning Tips': '#C2A040',
  'Study Strategy': '#4A90D9',
  'Self-Directed Learning': '#5BAD6F',
  'Education Info': '#C0636A',
  'Hello Readers': '#9B7EC8',
  'Daily Update': '#C2A040',
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam === 'en' ? 'en' : 'ko';
  const post = await getDailyPost(slug, lang);
  if (!post) return { title: 'Hello Readers' };
  return {
    title: `${post.meta.title} | Hello Readers`,
    description: post.meta.excerpt,
  };
}

export default async function DailyPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = langParam === 'en' ? 'en' : 'ko';

  const post = await getDailyPost(slug, lang);
  if (!post) notFound();

  const { meta, contentHtml } = post;
  const color = categoryColor[meta.category] ?? '#C2A040';

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
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href={`/daily?lang=${lang}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: '#666666' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'ko' ? 'Daily로' : 'Back to Daily'}
          </Link>
          <img src="/logo.png" alt="Hello Readers" style={{ height: '36px', width: 'auto' }} />
          <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Daily</span>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Meta */}
        <div className="mb-10">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full mb-5"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <Tag className="w-3 h-3" />
            {meta.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-5 leading-snug" style={{ color: '#1a1a1a' }}>
            {meta.title}
          </h1>
          <div className="flex items-center gap-5 text-sm" style={{ color: '#999999' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {meta.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {meta.readTime}{lang === 'ko' ? ' 읽기' : ' read'}
            </span>
          </div>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C2A040, transparent)',
            marginTop: '2rem',
          }} />
        </div>

        {/* Content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>

      {/* Footer */}
      <footer
        className="py-8 text-center text-sm"
        style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0', color: '#999999' }}
      >
        © 2026 Hello Readers. All rights reserved.
      </footer>
    </div>
  );
}
