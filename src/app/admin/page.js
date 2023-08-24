'use client'

import CustomFooter from "@/components/footer";
import Admin1 from "./admin1";
import Admin2 from "./admin2";
import { usePathname } from "next/navigation";
import TestAdmin from "./test";
import { useEffect } from "react";

export default function LoginPage() {
    const pathname = usePathname();;
    useEffect(() =>{
        document.title = " SEINFARM - Admin"
    })
    return(
        <div className="flex flex-col h-full">
            <main className="flex flex-col justify-center place-content-center h-full md:h-fit text-black animate-fade md:px-20 px-10">
                <section className="md:hidden px-10 py-5 bg-white font-bold text-base text-center rounded-xl">
                    Tabel dan Chart Admin Hanya Bisa Tampil Dalam Webview Laptop
                </section>

                <section className="hidden md:flex flex-col rounded-2xl h-fit w-full text-3xl bg-white px-10 py-5 text-green-600">
                    {/* <TestAdmin/> */}
                    
                    <Admin1/>
                </section>
                <section className="hidden md:flex flex-col rounded-2xl h-fit w-full text-3xl bg-white px-10 pt-3 py-10 my-5">
                    <Admin2/>
                </section>
            </main>
            <div className="grow"></div>
            { pathname === '/admin' && <div className="bg-green-600 h-fit"><CustomFooter/></div>}
        </div>
    )
}