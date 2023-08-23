/* eslint-disable @next/next/no-img-element */


export default function CustomFooter() {
    return(
        <main className="flex flex-row h-full md:gap-10 md:px-20 justify-center">
            <div className="w-auto hidden md:flex self-center">
                <img src="/logo.png" height={0} width={0} sizes='auto' alt='' className="md:w-auto h-20"/>
                <img src="/logo2.png" height={0} width={0} sizes='auto' alt='' className="md:w-auto h-20"/>
            </div>
            <div className="grow"></div>
            <div className="flex self-center place-items-center font-bold text-white md:text-xs md:gap-20 gap-3">
                <div className="flex md:hidden flex-col place-items-center">
                    <img src="/logo.png" height={0} width={0} sizes='auto' alt='' className="w-auto md:h-20 h-10"/>
                    <img src="/logo2.png" height={0} width={0} sizes='auto' alt='' className="md:w-auto md:h-20 w-10 h-10"/>
                </div>
                <div className="flex flex-col place-items-center gap-1">
                    <a href="https://wa.me/6281321501117" target="_blank"  className="h-fit w-fit"><img src="/WA.png" height={0} width={0} sizes='auto' alt='' className="w-auto h-10"/></a>
                    <p className="md:block hidden">WHATSAPP</p>
                </div>
                <div className="flex flex-col place-items-center gap-1">
                    <a href="https://www.instagram.com/" target="_blank" className="h-fit w-fit"><img src="/IG.png" height={0} width={0} sizes='auto' alt='' className="w-auto h-10"/></a>
                    <p className="md:block hidden">INSTAGRAM</p>
                </div>
                <div className="flex flex-col place-items-center gap-1">
                    <a href="https://www.gmail.com/" target="_blank"  className="bg-white p-2 h-10 w-10 rounded-full"><img src="/gmail.png" height={0} width={0} sizes='auto' alt='' className="w-auto h-6"/></a>
                    <p className="md:block hidden">EMAIL</p>
                </div>
            </div>
            <div className="grow"></div>
            <div className="w-auto flex flex-col self-center">
                <div className="w-full flex place-content-center"><img src="/maps.png" height={0} width={0} sizes='auto' alt='' className="w-10 h-10 flex justify-center"/></div>
                <p className="text-white md:text-xs text-[8px] md:w-[200px] w-32 text-center">Jl. Sekemala, Pasanggrahan, Kec. Ujung Berung, Kota Bandung, Jawa Barat 40617</p>
            </div>
        </main>
    )
}