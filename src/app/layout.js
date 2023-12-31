'use client'

import CustomNavigation from '@/components/nav'
import './globals.css'
import { Poppins } from 'next/font/google'
import CustomFooter from '@/components/footer'
import { usePathname } from 'next/navigation'

const poppins = Poppins({subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] }, )


export const metadata = {
  title: 'SEINFARM',
  description: 'SEINFARM WEB',
}

export default function RootLayout({ children }) {
   const pathname = usePathname();
   return (
      <html lang='en'>
         <head>
            <link rel='icon' href='/logo2.png' sizes='any'/>
         </head>
         <body className={poppins.className}>
            <div className={`background flex flex-col ${ pathname == '/admin/' ? 'h-[100vh]' : 'h-[85vh]'}`}>
               <CustomNavigation/>
               <div className='h-[100%] overflow-y-auto bg-black/[.25]'>{children}</div>
            </div>
            { pathname != '/admin/' && <div className='h-[15vh] bg-green-700 md:pt-4'><CustomFooter/></div>}
         </body>
      </html>
   )
}
