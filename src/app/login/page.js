/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginPage() {
    const [ index, setIndex ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ pass, setPass ] = useState('');
    const [ login, setLogin ] = useState('');
    const router = useRouter();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const handlePass = (event) => {
        setPass(event.target.value);
    }


    const handleLogin = ( login ) => {
        if(email == '' || pass == ''){
            return alert('Silahkan Input Email dan Password Pada Form yang Tersedia');
        }
        if(email != 'seinfarmweb@gmail.com'){
            return alert('Email Salah');
        }
        if(pass != 'seinfarmadmin123'){
            return alert('Password Salah');
        }
        alert('Login Berhasil')
        router.push('/admin')
        // setLogin('/admin')
    }

    return(
        <main className="animate-fade flex items-center justify-center mt-20 md:mt-24">
            { index == false ? 
            <div className="bg-white rounded-2xl h-fit px-10 py-10 md:px-40 md:py-20 flex flex-col items-center">
                <p className="font-bold text-2xl text-green-600 mb-5">Masuk</p>
                <Link href={'/survey'} className="bg-green-600 rounded-xl px-[50px] py-2 text-white font-semibold mt-2">Pengunjung</Link>
                <button onClick={() => setIndex(true)} className="border-2 border-green-600 rounded-xl px-[73px] py-2 text-green-600 font-semibold mt-2">Admin</button>
            </div> 
            : 
            <div className="w-auto animate-fade">
                <button onClick={() => window.location.reload(false)}><img src="/arrow.png" height={0} width={0} sizes='30px' alt='' className="translate-x-6 translate-y-[28px] absolute w-7"/></button>
                <div className="bg-white h-fit px-10 py-5 flex flex-col items-center">
                    <p className="font-bold text-2xl text-green-600 mb-5">
                        Administrator</p>
                    <p className="w-full font-medium text-lg text-green-500 mb-1 ml-2">
                        Email</p>
                    <input placeholder="" onChange={handleEmail} className="md:h-7 w-fit md:w-[350px] outline-none bg-green-600 text-white rounded-full px-5 mb-3"/>
                    <p className="w-full font-medium text-lg text-green-500 mb-1 ml-2">
                        Password</p>
                    <input type="password" placeholder="" onChange={handlePass} className="md:h-7 w-fit md:w-[350px] outline-none bg-green-600 text-white rounded-full px-5"/>

                    <button onClick={handleLogin} className="px-10 py-1 bg-green-600 text-white rounded-full mt-10">Login</button>
                </div>
            </div>
            }
        </main>
    )
}