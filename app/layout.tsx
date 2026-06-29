import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello Readers',
  description: 'Read deeply · Think logically · Grow intelligently',
  verification: {
    other: {
      'naver-site-verification': '9bd714f1b7bcb807f11ecad069fffa1ef503a0df',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Titan+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
