import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello Readers',
  description: 'Read deeply · Think logically · Grow intelligently',
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
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
