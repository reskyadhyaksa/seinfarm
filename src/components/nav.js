'use client'

import { useState } from "react";

export default function CustomNavigation() {
    const [ selected , setSelected ] = useState(0); 
    return(
        <>
            <main className="w-full min-h-[10vh] flex justify-center md:justify-end place-items-end gap-10 pl-20 pr-20 items-center animate-in">
                <a href={'/'} className="md:block hidden text-green-600 brightness-105 text-2xl font-bold tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">SEIN FARM</a>
                <div className="md:block hidden grow"/>
                <a href={'/'} onClick={() => {setSelected(0)}} className={`hover:scale-125 text-xl font-bold text-green-600 md:brightness-150 md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]`}>Tentang</a>
                <a href={'/login'} onClick={() => setSelected(1)} className="text-xl font-bold text-green-600 md:brightness-150 md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">Login</a>
            </main>
            {/* <hr className="h-px border-none bg-white mx-20 animate-fade drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"/> */}
        </>
    )
}