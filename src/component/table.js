import React, { useEffect, useState } from "react";
import Tableapi  from "../Api/Tableapi";
import { Table } from 'react-bootstrap';

const TableData = () => {
    const [data, setData] = useState([]);
    const [checkboxs,setCheckboxs] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsedata = await Tableapi();
               setData(responsedata)
            } catch (err) {
                console.log("err")
            }
        }
        fetchData()
    }, [])
    
    const checkhandle =(event,row)=>{
        const updateCheckbox = {
            ...checkboxs,
            [row.id]:event.target.checked
        }
        setCheckboxs(updateCheckbox)
        if (event.target.checked) {
            console.log(row);
          }
    }
    return (
        <div className="container mt-4">
            <h1>User Table</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
{data.map((row)=>(
    <tr key={row.id}>
      <td><input type="checkbox" checked={checkboxs[row.id] || false} onChange={(event)=>checkhandle(event,row)}/></td>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.username}</td>
        <td>{row.email}</td>
    </tr>
))}
                </tbody>
            </Table>
        </div>
    )
}
export default TableData;