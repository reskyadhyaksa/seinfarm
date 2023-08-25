/* eslint-disable @next/next/no-img-element */
'use client'

import { app, db } from "@/firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";
import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DateRange } from "react-date-range";
import { CSVLink } from "react-csv";
import { Box, Paper, Popper, Typography } from "@mui/material";

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = useRef(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
            setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
            alignItems: 'center',
            lineHeight: '24px',
            width: 1,
            height: 1,
            position: 'relative',
            display: 'flex',
            }}
        >
            <Box
            ref={cellDiv}
            sx={{
                height: 1,
                width,
                display: 'block',
                position: 'absolute',
                top: 0,
            }}
            />
            <Box
            ref={cellValue}
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
            {value}
            </Box>
            {showPopper && (
            <Popper
                open={showFullCell && anchorEl !== null}
                anchorEl={anchorEl}
                style={{ width, marginLeft: -17 }}
            >
                <Paper
                elevation={1}
                style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                >
                <Typography variant="body2" style={{ padding: 8 }}>
                    {value}
                </Typography>
                </Paper>
            </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
};

export default function Admin2() {
    var moment = require('moment');
    const [ data, setData ] = useState([]);
    const [ filterArray, setFilterArray ] = useState([]);
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ openPick, setOpenPick ] = useState(true);

    const columns = [
        { field: 'id', headerName: 'NO', width: 80, align: 'center', headerAlign: 'center', editable: false, type: 'number', },
        { field: 'nama', headerName: 'NAMA/INSTANSI', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'temp_tanggal', headerName: 'TANGGAL', width: 150, align: 'center', headerAlign: 'center', 
            valueFormatter: params => moment(params.value).format("DD/MM/YYYY")
        },
        { field: 'time', headerName: 'WAKTU', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'anak', headerName: 'ANAK', width: 100, align: 'center', headerAlign: 'center',},
        { field: 'dewasa', headerName: 'DEWASA', width: 100, align: 'center', headerAlign: 'center',},
        { field: 'testimoni', headerName: 'TESTIMONI', width: 150, align: 'center', headerAlign: 'center',},
        { field: 'kritik', headerName: 'KRITIK', width: 150, align: 'center', headerAlign: 'center', renderCell: renderCellExpand},
        { field: 'saran', headerName: 'SARAN', width: 225, align: 'center', headerAlign: 'center', renderCell: renderCellExpand},
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
        let tanggal = new Date()
        let year = 0
        let month = 0
        let date = 0
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
    
        setData(temp_array)
        setFilterArray(temp_array)
        setStartDate(new Date())
        setEndDate(new Date())
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
    
        setData(docs);
    };

    const convertDate = () => {
        handleSortAscendant()
        let temp_array = [];
        
        data.forEach((index, i) => {
            let tanggal = new Date()
            let year = 0
            let month = 0
            let date = 0
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

        setData(temp_array)
        setFilterArray(temp_array)
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const handleSelect = (date) => {
        // convertDate()
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
            setOpenPick(!openPick)
        }
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
                    <DateRange editableDateInputs={true} ranges={[selectionRange]} onChange={handleSelect} moveRangeOnFirstSelection={false}/>
                </div>
            </div>
            { data.length == 0 ? 
                <div className="flex justify-center">
                    <div className="self-center text-green-600">Data Loading</div>
                    <img src={'/loading.png'} alt="" height={0} width={0} sizes="25px" className="w-12 h-12 animate-spin ml-4"/>
                </div> : 
                
                <div className="h-auto ">
                    <DataGrid sx={{
                            "& .MuiDataGrid-columnHeaders": {backgroundColor: "rgb(22 163 74)", 
                            color: "rgb(255 255 255)", fontSize: 16 }, 
                            "& .MuiDataGrid-columnHeaderTitle": { whiteSpace: "normal", lineHeight: "normal" },
                            "& .MuiDataGrid-columnHeader": { height: "unset !important" },
                            "& .MuiDataGrid-columnHeaders": { maxHeight: "168px !important" }
                        }} 
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