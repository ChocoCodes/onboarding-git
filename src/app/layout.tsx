import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Intro to Git Onboarding",
  description: "Technology department onboarding session",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}