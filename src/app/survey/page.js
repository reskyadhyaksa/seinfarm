/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from "react"
import { app, db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getCurrentDate } from "@/components/getDate";
import { useRouter } from "next/navigation";
import Head from "next/head";



export default function SurveyPage() {
    const router = useRouter();

    const [ page, setPage ] = useState(0);
    const [ anak, setAnak ] = useState(0);
    const [ dewasa, setDewasa ] = useState(0);
    const [ nama, setNama] = useState('');
    const [ email, setEmail] = useState('');
    const [ testi, setTesti] = useState(1);
    const [ kritik, setKritik] = useState('');
    const [ saran, setSaran] = useState('');
    
    const saveSurvey = async () => {
        var today = new Date();
        
        let minute = today.getMinutes()
        let hour = today.getHours()
        
        if ( hour < 10 ){
            hour = '0' + hour
        }
        if ( minute < 10 ){
            minute = '0' + minute
        }
        
        var time = hour + ':' + today.getMinutes();

        try {
            setPage(2)
            await addDoc(collection(db, "seinfarm"), {
                nama: nama,
                email: email,
                anak: anak,
                dewasa: dewasa,
                testimoni: testi,
                kritik: kritik,
                saran: saran,
                tanggal: getCurrentDate(),
                time: time
            });
            console.log("Data added successfully");
            setPage(3)
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    const backToTentang = () => {
        router.push('/')
    }
    useEffect(() => {
        if ( anak > 999 ) {
            setAnak(999)
        }
        if ( anak < 0 ) {
            setAnak(0)
        }

        if ( isNaN(anak)) {
            setAnak(0)
        }
        if ( isNaN(dewasa)) {
            setDewasa(0)
        }

        if ( dewasa > 999 ) {
            setDewasa(999)
        }
        if ( dewasa < 0 ) {
            setDewasa(0)
        }

        document.title = "SEINFARM - Survey"

    } , [dewasa, anak])

    return(
        <>  
            <main className="animate-fade flex md:flex-row flex-col place-items-center justify-center h-[100%] min-h-[30vh] md:px-0 px-3 gap-20">
                { page === 0 && 

                <div className="bg-white py-10 px-12 rounded-xl flex flex-col animate-fade">
                <p className="font-bold self-center text-xl mb-5">PENGUNJUNG</p>
                <div className="flex flex-col gap-2">
                    <p>Nama / Instansi</p>
                    <input required placeholder="" value={ nama } onChange={(e) => setNama(e.target.value)} className="bg-gray-200 outline-none md:w-80 text-md"/>
                    <p>Email</p>
                    <input placeholder="" value={ email } onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 outline-none md:w-80 text-md"/>
                    <p className="md:self-start self-center">{'Anak ( < 17 tahun )'}</p>
                    <div className="flex flex-row md:self-start self-center  gap-2">
                        <button onClick={() => {setAnak(anak - 1)}} className="bg-gray-400 h-6 w-6 rounded-full border-2 flex justify-center place-items-center font-bold text-white">-</button>
                        <input placeholder="" required min={1} max={50} value={ anak } onChange={(e) => setAnak(parseInt(e.target.value))} className="text-center w-20 bg-gray-300 rounded-lg outline-none text-md flex place-items-center"/>
                        <button onClick={() => {setAnak(anak + 1)}} className="bg-green-600 h-6 w-6 rounded-full border-2 flex justify-center place-items-center font-bold text-white">+</button>
                    </div>
                    <p className="mt-1 md:self-start self-center">{'Dewasa ( > 17 tahun )'}</p>
                    <div className="flex flex-row md:self-start self-center gap-2">
                        <button onClick={() => {setDewasa(dewasa - 1)}} className="bg-gray-400 h-6 w-6 rounded-full border-2 flex justify-center place-items-center font-bold text-white">-</button>
                        <input placeholder="" required value= { dewasa } onChange={(e) => setDewasa(parseInt(e.target.value))} className="w-20 text-center bg-gray-300 rounded-lg outline-none text-md flex place-items-center"/>
                        <button onClick={() => {setDewasa(dewasa + 1)}} className="bg-green-600 h-6 w-6 rounded-full border-2 flex justify-center place-items-center font-bold text-white">+</button>
                    </div>
                </div>
                <button onClick={() => setPage(1)} className="font-medium bg-green-600 text-white rounded-lg px-8 self-center text-xl mt-6">Next</button>
                </div> 
                }

                { page === 1 && 

                <div className="bg-white py-10 md:px-12 px-7 rounded-xl flex flex-col animate-fade">
                <p className="font-bold self-center text-xl mb-5">PENGUNJUNG</p>
                <div className="flex flex-col gap-2 ">
                    <p className="flex self-center">Kritik</p>
                    <input placeholder="" value={ kritik } onChange={(e) => setKritik(e.target.value)} className="bg-gray-200 outline-none md:w-80 text-md flex self-center"/>
                    <p className="flex self-center">Saran</p>
                    <input placeholder="" value={ saran } onChange={(e) => setSaran(e.target.value)} className="bg-gray-200 outline-none md:w-80 text-md flex self-center"/>
                    <p  className="flex self-center mt-2">Testimoni</p>
                    <div className="flex flex-row justify-center gap-2">
                        <img src={'/emot2.png'} alt="" height={0} width={0} sizes="40px" className="w-8 h-8"/>
                        <button onClick={() => {setTesti(1)}} className={`${ testi == 1 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(2)}} className={`${ testi == 2 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(3)}} className={`${ testi == 3 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(4)}} className={`${ testi == 4 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(5)}} className={`${ testi == 5 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(6)}} className={`${ testi == 6 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(7)}} className={`${ testi == 7 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(8)}} className={`${ testi == 8 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(9)}} className={`${ testi == 9 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <button onClick={() => {setTesti(10)}} className={`${ testi == 10 ? 'bg-green-600' : 'bg-gray-200'} h-[18px] w-[18px] md:h-6 md:w-6 md:mt-1 mt-2 rounded-full border-2 flex justify-center place-items-center font-bold text-white`}/>
                        <img src={'/emot1.png'} alt="" height={0} width={0} sizes="40px" className="w-8 h-8"/>
                    </div> 
                    
                </div>
                <div className="flex flex-row mt-7 self-center">
                    <button onClick={() => setPage(0)} className="font-medium bg-gray-200 text-green-600 rounded-lg px-5 mr-2 self-center text-base">Kembali</button>
                    <button onClick={(saveSurvey)} className="font-medium bg-green-600 text-white rounded-lg px-8 self-center text-base">Simpan</button>
                </div>
                </div>

                }

                { page === 2 && <div className="md:p-20 p-10 bg-white rounded-xl flex flex-col place-items-center gap-3">
                <p>Mohon Tunggu Sebentar Yaa!!</p>
                <img src={'/loading.png'} alt="" height={0} width={0} sizes="25px" className="w-12 h-12 animate-spin ml-4"/>
                </div> }

                { page === 3 && <div onLoad={setTimeout(backToTentang, 3000)} className="py-10 px-12 rounded-xl flex flex-col animate-fade bg-white ">
                    <p className="text-center font-bold text-green-600 md:text-xl sm:text-lg text-base md:w-[700px]"> Terima kasih telah mengunjungi Sein Farm! 
                    Semoga Anda menikmati petualangan agraris kami.
                    Jangan ragu untuk kembali kapan saja ya!!!</p>
                
                </div>}

                { page == 2 || page == 3  ? null : 
                <p className={`md:w-[500px] text-3xl font-bold text-white text-center md:block hidden`}>“ SEINFARM  ADALAH SALAH SATU MERK UNTUK INOVASI PERTANIAN TERPADU DI KOTA BANDUNG “</p>}

            </main>
            
        </>
    )
}