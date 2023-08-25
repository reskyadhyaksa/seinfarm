/* eslint-disable @next/next/no-img-element */
import { app, db } from "@/firebase/config";
import styled from "@emotion/styled";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";


export default function Admin1() {
    const [ dataChart, setDataChart ] = useState([]);
    const [ data, setData] = useState([]);

    const fetchPost = async () => {
        await getDocs(collection(db, "seinfarm"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id })).sort((a, b) =>{
                        const dateA = new Date(a.tanggal.split('/').reverse().join('/'));
                        const dateB = new Date(b.tanggal.split('/').reverse().join('/'));
                        return dateA - dateB;
                    });
                setData(newData);                
                // console.log(todos, newData);
            })

        
    }


    useEffect(() =>{
        fetchPost()
        getTotal()
    }, [])

    let totalVisitorCount = 0;
    let totalAnak = 0;
    let totalDewasa = 0;
    for (const entry of data) {
        if (entry.hasOwnProperty('anak')) {
            totalVisitorCount += entry.anak;
            totalAnak += entry.anak
        }
        if (entry.hasOwnProperty('dewasa')) {
            totalVisitorCount += entry.dewasa;
            totalDewasa += entry.dewasa
        }
    }



    const getTotal =  () => {
        let totalAnak = 0
        let totalDewasa = 0
        const temp_array = [];
        const monthNames = [
            'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
            'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
        ];

        const monthTotals = Array(12).fill(0);
        const newArray = [];


        data.forEach(item => {
            const total = item.anak + item.dewasa
            totalAnak = totalAnak + item.anak
            totalDewasa = totalDewasa + item.anak 
            const tanggal = item.tanggal;
            var dateparts = tanggal.split('/')
            var bulan = parseInt(dateparts[1].replace('0', ''))

            temp_array.push({
                total: total,
                bulan: bulan,
            })
        })
        

        temp_array.forEach(item => {
            const total = item.total;
            const bulan = item.bulan;
            monthTotals[bulan - 1] += total;
        });
        
        for( let i = 0; i < monthNames.length; i++) {
            let nama = monthNames[i]
            let total = monthTotals[i]
            newArray.push({
                bulan: nama,
                total: total,
            })
        }
        console.log(newArray)
        
        setDataChart(newArray);
    }

    const head_table = [ "Kategori", "Total", ]

    return(
        <>  
            <p className="w-full flex justify-center font-medium">
                Grafik Pengunjung</p>
            <hr className="h-px border-none bg-green-600 mt-3 animate-fade drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"/>
            { data.length == 0 ? 
                <div className="flex justify-center mt-5">
                    <div className="self-center">Data Loading</div>
                    <img src={'/loading.png'} alt="" height={0} width={0} sizes="25px" className="w-12 h-12 animate-spin ml-4 "/>
                </div> 
                : 
                <div id="chart" onLoad={setTimeout(getTotal, 1500)} className="w-full flex flex-col md:flex-row px-4 gap-10 my-3">
                    <ResponsiveContainer height={300} width={925} className={'flex text-xs mt-3 w-fit'}>
                        <LineChart data={dataChart} margin={{ right: 30, top: 20, bottom: 10}}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey={'bulan'} interval={'preserveStartEnd'} className="font-semibold font-sans"/>
                            <YAxis className="font-semibold"/>
                            <Line type='monotone' dataKey="total" stroke="#16A34A" strokeWidth={2} activeDot={{ r: 5 }} dot={{r : 0}}/>
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="md:w-[25%] w-full flex items-center rounded-xl text-white">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 150, }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className="bg-green-600">
                                        { head_table.map((head) => (
                                            <TableCell key={head} padding="normal" align="center">
                                                <Typography className="text-white">{head}</Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">Pengunjung Dewasa</TableCell>
                                        <TableCell align="center">{totalDewasa} orang</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Pengunjung Anak</TableCell>
                                        <TableCell align="center">{totalAnak} orang</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Rata-Rata Mingguan</TableCell>
                                        <TableCell align="center">{(totalVisitorCount / 7).toFixed(0)} orang</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Rata-Rata Bulanan</TableCell>
                                        <TableCell align="center">{(totalVisitorCount / 30).toFixed(0)} orang</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Total Pengunjung</TableCell>
                                        <TableCell align="center">{totalVisitorCount} orang</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            }
        </>
    )
}