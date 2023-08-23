/* eslint-disable @next/next/no-img-element */
'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"
import { app, db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const head_table = ["No", "Nama/Instansi","Tanggal", "Email", "Anak", "Dewasa", "Testimoni", "Kritik", "Saran"]



export default function Admin2()  {
    const [ data, setData] = useState([]);

    useEffect(() =>{
        fetchPost()
        console.log('a')
    }, [])

    const fetchPost = async () => {
        await getDocs(collection(db, "seinfarm"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setData(newData);                
                // console.log(todos, newData);
            })
    }

    return(
        <div>
            { data.length == 0 ? 
                <div className="flex justify-center mt-20">
                    <div className="self-center">Data Loading</div>
                    <img src={'/loading.png'} alt="" height={0} width={0} sizes="25px" className="w-12 h-12 animate-spin ml-4"/>
                </div> : 
                
                <TableContainer className="border border-gray-300 mt-2">
                    <Table sx={{minWidth: 725}} aria-label="simple-table">
                        <TableHead>
                            <StyledTableRow className="items-center self-center">
                            {head_table.map((head) => (
                                <TableCell key={head} align="center" padding='normal'> 
                                    <Typography className="font-lato font-bold text-base text-black ml-3 mb-2 mt-2">{head}</Typography>
                                </TableCell>
                            ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(({ nama, tanggal, email, anak, dewasa, testimoni, kritik, saran }, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{nama}</TableCell>
                                    <TableCell align="center">{tanggal}</TableCell>
                                    <TableCell align="center">{email}</TableCell>
                                    <TableCell align="center">{anak}</TableCell>
                                    <TableCell align="center">{dewasa}</TableCell>
                                    <TableCell align="center">{testimoni}</TableCell>
                                    <TableCell align="center">{kritik}</TableCell>
                                    <TableCell align="center">{saran}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

        </div>
    )
}