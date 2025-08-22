import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic"; 

export const metadata = {
  title: "Aruba Cab Services | Premier Tour and Taxi Service in Sri Lanka",
  description: "Explore Sri Lanka with Aruba Cab Services. We offer customized tour packages, reliable airport transfers, and personalized taxi services. Book your adventure today!",
  keywords: "Sri Lanka tours, Sri Lanka taxi, airport transfer Sri Lanka, Sri Lanka cab service, Sri Lanka travel, custom tours Sri Lanka",
  openGraph: {
    title: "Aruba Cab Services | Premier Tour and Taxi Service in Sri Lanka",
    description: "Explore Sri Lanka with Aruba Cab Services. We offer customized tour packages, reliable airport transfers, and personalized taxi services. Book your adventure today!",
    url: "https://aruba-cabs.vercel.app",
    siteName: "Aruba Cab Services",
    images: [
      {
        url: "https://aruba-cabs.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aruba Cab Services | Premier Tour and Taxi Service in Sri Lanka",
    description: "Explore Sri Lanka with Aruba Cab Services. We offer customized tour packages, reliable airport transfers, and personalized taxi services. Book your adventure today!",
    images: ["https://aruba-cabs.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-graduate">
        <BackgroundMusic /> 
        <Header />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}