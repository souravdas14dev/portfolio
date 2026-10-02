import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sourav Das — Full Stack Software Engineer',
  description: 'Full-stack engineer building scalable products, intelligent systems, and high-performance digital experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
