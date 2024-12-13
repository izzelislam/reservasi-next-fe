import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import Image from 'next/image'

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Icon } from '@iconify/react/dist/iconify.js'
import {Button, ButtonGroup} from "@nextui-org/button";
import { Inter, Rubik } from 'next/font/google'

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import NavnarSection from "@/components/NavnarSection";
import ProgressbarC from "@/components/progress-barr";
import FooterSection from "@/components/FooterSection";
import ToastProvider from "@/provides/toas-provider";
import { Toaster } from "react-hot-toast";
import { ToasterProvider } from "@/provides/hot-toas.provider";
import { AuthProvider } from "@/provides/auth-provider";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={inter.className}>
        <ToasterProvider />
        <AuthProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ProgressbarC/>

            {/* header */}
            <div className="bg-gray-100 py-3 z-20">
              <div className="container mx-auto">
                <div className="flex justify-end">
                  <div className="flex gap-5">
                    <div className="flex gap-2 items-center">
                      <Icon icon="solar:phone-calling-bold-duotone" className="w-5 h-5"/>
                      <p className=" text-sm font-semibold text-gray-600">08712376123</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Icon icon="solar:mailbox-bold-duotone" className="w-5 h-5"/>
                      <p className=" text-sm font-semibold text-gray-600">tola@mail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end header */}

            <NavnarSection />

            {/* content */}
              {children}
            {/* content */}

            {/* footer */}
            <FooterSection/>
            {/* end footer */}

          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
