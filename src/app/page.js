/* eslint-disable @next/next/no-img-element */
'use client'

import CustomFooter from '@/components/footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ index, setIndex ] = useState(0);

  return (
    <>
      <main className="flex flex-col md:gap-4 place-items-center md:h-full h-fit  justify-center animate-fade pt-4 ">
        <section className='md:hidden flex'>
          <button onClick={() => setIndex(!index)} className='absolute left-3 translate-y-20 bg-white h-10 w-10 text-xl font-bold rounded-full'>{'<'}</button>
          <button onClick={() => setIndex(!index)} className='absolute right-3 translate-y-20 bg-white h-10 w-10 text-xl font-bold rounded-full'>{'>'}</button>

          { index == 0 ? 
            <div className='animate-fade'>
              <img src='/sein1.png' height={0} width={0} sizes='auto' alt='' className="w-64 md:auto animate-fade rounded-xl drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]"/>
            </div>
            : null }

          { index == 1 ? 
            <div className='animate-fade'><img src='/sein2.png' height={0} width={0} sizes='auto' alt='' className="w-64 md:auto animate-fade rounded-xl drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]"/></div>
            : null }

        </section>

        <section className='md:hidden flex -translate-y-5'>
          { index == 0 ? <div className='px-10 py-10 md:text-base text-sm text-white md:bg-white text-center animate-fade'>
          Seinfarm adalah salah satu merk untuk inovasi pertanian terpadu di Kota Bandung. 
          Sein Farm merupakan kependekan dari Sekemala Integrated Farming, pertanian terpadu yang berlokasi di Kelurahan 
          Pasanggaharan / Kelurahan Cisurupan. Sekemala benar-benar layak diangkatdan disebut secara bernas dalam inovasi 
          pertanian terpadu yang dikembangkan ini. Karena Sekemala nyaris menjadi wilayah terluar Kota Bandung yang sangat penting perannya. 
          Di sinilah lahan sawah abadi yang dimiliki Pemerintah Kota Bandung berada.</div> : null}
          { index == 1 ? <div className='px-10 py-10 md:text-base text-sm text-white md:bg-white text-center animate-fade'>
          Keseriusan pemerintah Kota dalam melakukan pembebasan lahan untuk sawah abadi sudah berlangsung Sejak 2008.
          Sekemala adalah lokasi yang telah ditetapkan pemerintah status dan perannya dalam mendukung penyelenggaraan
          tugas dan fungsi Dinas Pangan dan Pertanian. Alhasil, ia menjadi titik terluar kota yang telatif masih hijau.
          Padahal konsi eksisting sekarang wilayah yang melingkupi sawah abadi sudah penuh dengan pemukiman.
          </div> : null}
        </section>

        {/** Laptop View */}
        <section className='hidden md:flex flex-row animate-fade'>
          <div className='animate-fade'><img src={'/sein1.png'} height={0} width={0} sizes='auto' alt='' className="w-80 animate-fade rounded-3xl"/></div>
          <div className='w-[800px] bg-white z-10 -translate-x-4 self-center p-4 rounded-2xl'>Seinfarm adalah salah satu merk untuk inovasi pertanian terpadu di Kota Bandung. 
          Sein Farm merupakan kependekan dari Sekemala Integrated Farming, pertanian terpadu yang berlokasi di Kelurahan 
          Pasanggaharan / Kelurahan Cisurupan.Sekemala benar-benar layak diangkatdan disebut secara bernas dalam inovasi 
          pertanian terpadu yang dikembangkan ini. Karena Sekemala nyaris menjadi wilayah terluar Kota Bandung yang sangat penting perannya. 
          Di sinilah lahan sawah abadi yang dimiliki Pemerintah Kota Bandung berada.</div>
        </section>
        <section className='hidden md:flex flex-row animate-fade'>
          <div className='w-[800px] bg-white z-10 translate-x-4 self-center p-4 rounded-2xl'>Keseriusan pemerintah Kota dalam melakukan pembebasan lahan untuk 
          sawah abadi sudah berlangsung Sejak 2008. Sekemala adalah lokasi yang telah ditetapkan pemerintah status dan perannya dalam mendukung penyelenggaraan
          tugas dan fungsi Dinas Pangan dan Pertanian. Alhasil, ia menjadi titik terluar kota yang telatif masih hijau.
          Padahal konsi eksisting sekarang wilayah yang melingkupi sawah abadi sudah penuh dengan pemukiman.</div>
          <div className='animate-fade'><img src={'/sein2.png'} height={0} width={0} sizes='auto' alt='' className="w-80 animate-fade rounded-3xl"/></div>
        </section>  
      </main>
      
    </>
  )
}
