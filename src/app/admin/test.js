
import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";

export default function TestAdmin() {
    const [ newArray, setArray ] = useState([]);
    const [ filterArray, setFilterArray ] = useState([]);

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const [ openPick, setOpenPick ] = useState(false);


    const data = [
        {
            nama: 'Resky Adhyaksa',
            total: '22',
            tanggal: '22/07/2023',
            time: '02:08'
        },
        {
            nama: 'Zhillan',
            total: '22',
            tanggal: '07/10/2023',
            time: '22:18'
        },
        {
            nama: 'Dave',
            total: '22',
            tanggal: '11/08/2023',
            time: '21:08'
        },
        {
            nama: 'b',
            total: '22',
            tanggal: '12/08/2023',
            time: '21:08'
        },
        {
            nama: 'a',
            total: '22',
            tanggal: '13/08/2023',
            time: '21:08'
        },
        {
            nama: 'c',
            total: '22',
            tanggal: '11/05/2023',
            time: '23:08'
        }
    ]
    
    const columns = [
        { field: 'id', headerName: 'NO', width: 30 },
        { field: 'nama', headerName: 'NAMA/INSTANSI', width: 70 },
        { field: 'total', headerName: 'TOTAL', width: 130 },
        { field: 'tanggal', headerName: 'TANGGAL', width: 130 },
        { field: 'time', headerName: 'WAKTU', width: 130 },
    ];
    
    const getData = () => {
        const temp_array = [];
        const docs = data.sort((a, b) => {
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
            })
        })
    
        console.log(temp_array);
        setArray(temp_array);
    };

    const handleSortAscendant = () => {
        const temp_array = [];
        const docs = data.sort((a, b) => {
            const dateA = new Date(a.tanggal.split('/').reverse().join('/'));
            const dateB = new Date(b.tanggal.split('/').reverse().join('/'));
            
            if (dateA.getTime() !== dateB.getTime()) {
                return dateB.getTime() + dateA.getTime(); // Sort by date if dates are different
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
            })
        })
    
        console.log(temp_array);
        setArray(temp_array);
    };


    const testDate = () => {
        handleSortAscendant()
        let temp_array = [];
        let tanggal = new Date()
        let year = 0
        let month = 0
        let date = 0
        let hour = 0
        let minute = 0

        data.forEach((index, i) => {
            const nama = index.nama;
            const total = index.total;
            const dateArray = index.tanggal.split('/');
            const timeArray = index.time.split(':');

            date = dateArray[0];
            month = dateArray[1] - 1;
            year = dateArray[2];

            hour = timeArray[0];
            minute = timeArray[1];

            tanggal = new Date(year, month, date)
            temp_array.push({
                id: i+1,
                tanggal: index.tanggal,
                temp_tanggal: tanggal,
                time: index.time,
                nama: nama,
                total: total,
            })
        })

        console.log(temp_array)
        setArray(temp_array)
        setFilterArray(temp_array)
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }
    
    const handleSelect = (date) => {
        testDate()
        let filter = filterArray.filter((arr) => {
            let filterDate = new Date(arr['temp_tanggal'])
            return (
                filterDate >= date.selection.startDate && 
                filterDate <= date.selection.endDate
            )
        })

        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        setArray(filter)
        if(date.selection.startDate != date.selection.endDate) {
            setInterval(setOpenPick(!openPick), 3000)
        }
        console.log('Start', date.selection.startDate)
        console.log('End', date.selection.endDate)
    }
    
    const convertTime = () => {
        var today = new Date();
        let minute = today.getMinutes()
        let hour = today.getHours()
        if ( hour < 10 ){
            hour = '0' + hour
        }
        if ( minute < 10 ){
            minute = '0' + minute
        }
        var time = hour + ':' + minute;
        console.log(time)
    }

    useEffect(() => {
        // handleSort()
        getData()
    }, [])

    return(
        <>
            
            
            <div className="h-[300px] flex flex-row">
                <div className={`${ openPick ? 'hidden' : 'block'} `}>
                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}/>
                </div>
                <div>
                    <button onClick={convertTime}>Refresh</button>
                    <button onClick={() => {setOpenPick(!openPick)}}>Pick A Date</button>
                    { data.length != 0 && <DataGrid 
                        rows={newArray}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        }}
                        pageSizeOptions={[10, 50, 100]}
                    /> }
                </div>
            </div>
        </>
    )
}