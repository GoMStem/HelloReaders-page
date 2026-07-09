import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content', 'posts');

function formatDate(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return String(value);
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export function getAllPosts(lang: 'ko' | 'en'): PostMeta[] {
  const dir = path.join(postsDir, lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  if (files.length === 0) return [];

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? '',
        date: formatDate(data.date),
        category: data.category ?? '',
        excerpt: data.excerpt ?? '',
        readTime: data.readTime ?? '',
      } satisfies PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(
  slug: string,
  lang: 'ko' | 'en'
): Promise<{ meta: PostMeta; contentHtml: string } | null> {
  const filePath = path.join(postsDir, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    meta: {
      slug,
      title: data.title ?? '',
      date: formatDate(data.date),
      category: data.category ?? '',
      excerpt: data.excerpt ?? '',
      readTime: data.readTime ?? '',
    },
    contentHtml: processed.toString(),
  };
}
