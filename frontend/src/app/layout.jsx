import './globals.css';
import Script from 'next/script';
import { AppProvider } from '../context/AppContext';
import TopHeader from '../components/TopHeader';
import DiaChatbot from '../components/DiaChatbot';
import MobileBottomBarWrapper from '../components/MobileBottomBarWrapper';

export const metadata = {
  title: 'Afterclass for Amity — Beyond the Classroom',
  description: 'A campus-wide community and discovery platform for Amity University Kolkata.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="25" fill="%23E11D48"/><path d="M30 70 L50 25 L70 70 L56 70 L50 52 L44 70 Z" fill="white"/><circle cx="68" cy="32" r="8" fill="%23FFFDF5"/></svg>'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800;900&family=Righteous&display=swap" rel="stylesheet" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1669658018247873"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-[#E11D48] text-[#000000] font-sans antialiased selection:bg-[#FFFDF5] selection:text-[#E11D48] min-h-screen flex flex-col">
        <AppProvider>
          {/* Globally persistent Navbar & Meet Dia Banner */}
          <TopHeader />
          <main className="flex-1">
            {children}
          </main>
          {/* Floating AI Companion Chatbot in Bottom Right */}
          <DiaChatbot />
          {/* Mobile Bottom Navigation Bar (Pill + Audio/AI Circle) */}
          <MobileBottomBarWrapper />
        </AppProvider>
      </body>
    </html>
  );
}
