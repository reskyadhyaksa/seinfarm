'use client'

import CustomFooter from "@/components/footer";
import Admin1 from "./admin1";
import Admin2 from "./admin2";
import { usePathname } from "next/navigation";

export default function LoginPage() {
    const pathname = usePathname();;

    return(
        <>
            <main className="flex flex-col justify-center place-content-center h-full md:h-fit text-green-600 animate-fade md:px-20 px-10">
                <section className="md:hidden px-10 py-5 bg-white font-bold text-base text-center rounded-xl">
                    Tabel dan Chart Admin Hanya Bisa Tampil Dalam Webview Laptop
                </section>

                <section className="hidden md:flex flex-col rounded-2xl h-fit w-full text-3xl bg-white px-10 py-10 mt-5">
                    {/* <TestAdmin/> */}
                    
                    <Admin1/>
                </section>
                <section className="hidden md:flex flex-col rounded-2xl h-fit w-full text-3xl bg-white px-10 pt-3 py-10 my-5">
                    <p className="w-full flex justify-center font-medium">
                        Tabel Pengunjung</p>
                    <hr className="h-px border-none bg-green-600 mt-3 animate-fade drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"/>
                    <Admin2/>
                </section>
            </main>
            { pathname === '/admin' && <div className="bg-green-600"><CustomFooter/></div>}
        </>
    )
}