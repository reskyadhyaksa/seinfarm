/* eslint-disable @next/next/no-img-element */
'use client'

import { app, db } from "@/firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DateRangePicker } from "react-date-range";
import { CSVLink } from "react-csv";




export default function Admin2()  {
    const [ data, setData ] = useState([]);
    const [ filterArray, setFilterArray ] = useState([]);
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ openPick, setOpenPick ] = useState(true);

    const columns = [
        { field: 'id', headerName: 'NO', width: 80, align: 'center', headerAlign: 'center',},
        { field: 'nama', headerName: 'NAMA/INSTANSI', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'tanggal', headerName: 'TANGGAL', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'time', headerName: 'WAKTU', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'anak', headerName: 'ANAK', width: 100, align: 'center', headerAlign: 'center',},
        { field: 'dewasa', headerName: 'DEWASA', width: 100, align: 'center', headerAlign: 'center',},
        { field: 'testimoni', headerName: 'TESTIMONI', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'kritik', headerName: 'KRITIK', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'saran', headerName: 'SARAN', width: 225, align: 'center', headerAlign: 'center',},
    ];

    const csv_head = [
        {label: 'no', key: 'id'},
        {label: 'Nama', key: 'nama'},
        {label: 'tanggal', key: 'tanggal'},
        {label: 'waktu', key: 'time'},
        {label: 'anak', key: 'anak'},
        {label: 'dewasa', key: 'dewasa'},
        {label: 'testimoni', key: 'testimoni'},
        {label: 'kritik', key: 'kritik'},
        {label: 'saran', key: 'saran'},
    ]

    const csv_Link = {
        filename:'seinfarm.csv',
        headers:csv_head,
        data:data
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const getData = async () => {
        const temp_array = []
        const colRef = collection(db, 'seinfarm');
        const snapshot = await getDocs(colRef);
        const docs = snapshot.docs.map((doc) => doc.data()).sort((a, b) => {
            const dateA = new Date(a.tanggal.split('/').reverse().join('/'));
            const dateB = new Date(b.tanggal.split('/').reverse().join('/'));
            
            if (dateA.getTime() !== dateB.getTime()) {
                return dateB.getTime() - dateA.getTime(); // Sort by date if dates are different
            } else {
                // If dates are equal, sort by time
                const timeA = a.time.split(':').map(part => parseInt(part, 10));
                const timeB = b.time.split(':').map(part => parseInt(part, 10));
                
                if (timeA[0] !== timeB[0]) {
                    return timeB[0] - timeA[0]; // Sort by hours if hours are different
                } else {
                    return timeB[1] - timeA[1]; // Sort by minutes if hours are the same
                }
            }
        });

        docs.forEach((index, i) => {
            temp_array.push({
                id: i+1,
                nama: index.nama,
                tanggal: index.tanggal,
                time: index.time,
                anak: index.anak,
                dewasa: index.dewasa,
                testimoni: index.testimoni,
                kritik: index.kritik,
                saran: index.saran
            })
        })
    
        console.log(docs);
        setData(temp_array);
    }

    const handleSortAscendant = () => {
        const temp_array = [];
        const item = [...data];
        const docs =  item.sort((a, b) => {
            const dateA = new Date(a.tanggal.split('/').reverse().join('/'));
            const dateB = new Date(b.tanggal.split('/').reverse().join('/'));
            
            if (dateA.getTime() !== dateB.getTime()) {
                return dateA.getTime() + dateB.getTime();
            } else {
                // If dates are equal, sort by time
                const timeA = a.time.split(':').map(part => parseInt(part, 10));
                const timeB = b.time.split(':').map(part => parseInt(part, 10));
                
                if (timeA[0] !== timeB[0]) {
                    return timeB[0] - timeA[0]; 
                } else {
                    return timeB[1] - timeA[1]; 
                }
            }
        });

        docs.forEach((index, i) => {
            temp_array.push({
                id: i+1,
                nama: index.nama,
                tanggal: index.tanggal,
                time: index.time,
                anak: index.anak,
                dewasa: index.dewasa,
                testimoni: index.testimoni,
                kritik: index.kritik,
                saran: index.saran
            })
        })
    
        console.log(temp_array);
        setData(docs);
    };

    const convertDate = () => {
        handleSortAscendant()
        let temp_array = [];
        let tanggal = new Date()
        let year = 0
        let month = 0
        let date = 0

        data.forEach((index, i) => {
            const dateArray = index.tanggal.split('/');

            date = dateArray[0];
            month = dateArray[1] - 1;
            year = dateArray[2];

            tanggal = new Date(year, month, date)
            temp_array.push({
                id: i+1,
                nama: index.nama,
                tanggal: index.tanggal,
                temp_tanggal: tanggal,
                time: index.time,
                anak: index.anak,
                dewasa: index.dewasa,
                testimoni: index.testimoni,
                kritik: index.kritik,
                saran: index.saran
            })
        })

        console.log(temp_array)
        setData(temp_array)
        setFilterArray(temp_array)
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const handleSelect = (date) => {
        convertDate()
        let filter = filterArray.filter((arr) => {
            let filterDate = new Date(arr['temp_tanggal'])
            return (
                filterDate >= date.selection.startDate && 
                filterDate <= date.selection.endDate
            )
        })

        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        setData(filter)
        if(date.selection.startDate != date.selection.endDate) {
            setInterval(setOpenPick(!openPick), 3000)
        }
        console.log('Start', date.selection.startDate)
        console.log('End', date.selection.endDate)
    }

    useEffect(() =>{
        getData()
    }, [])


    return(
        <div className="flex flex-col">
            <p className="w-full flex justify-center font-medium text-green-600">TABEL PENGUNJUNG</p>
            <hr className="h-px border-none bg-green-600 mt-3 animate-fade drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"/>
            
            <div className="flex flex-row w-full pt-5 pb-5 gap-2">
                <button className="text-base bg-green-600 text-white border-2 rounded-md py-1 px-6" onClick={getData}>Refresh Data</button>
                <CSVLink {...csv_Link} className="text-base bg-green-600 text-white border-2 rounded-md py-1 px-6" onClick={{}}>Download CSV</CSVLink>
                <div className="grow"></div>
                <button className="text-base bg-green-600 text-white border-2 rounded-lg py-1 px-6" onClick={() => {setOpenPick(!openPick)}}>Search by Date</button>
                <div className={`${ openPick ? 'hidden' : 'absolute'} z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} rangeColors={['#26833A', '#26833A', '#26833A']} />
                </div>
            </div>
            { data.length == 0 ? 
                <div className="flex justify-center mt-20">
                    <div className="self-center">Data Loading</div>
                    <img src={'/loading.png'} alt="" height={0} width={0} sizes="25px" className="w-12 h-12 animate-spin ml-4"/>
                </div> : 
                
                <div className="h-auto">
                    <DataGrid sx={{"& .MuiDataGrid-columnHeaders": {backgroundColor: "rgb(22 163 74)", color: "rgb(255 255 255)", fontSize: 16 }}} 
                        rows={data} columns={columns} initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}/>
                </div>
            }

        </div>
    )
}