import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";

interface Order {
    orderId: number;
    customerId: string;
    employeeId: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    shipVia: number;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string | null;
    shipPostalCode: string;
    shipCountry: string;
}

const OrderTable: React.FC = () => {
    const [data, setData] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState("ASC")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:3001/make-request?page=${currentPage}`);
                const jsonData: Order[] = await result.json();
                setData(jsonData);
                setTotalPages(83);
            } catch (error) {
                console.error('Error fetching data:');
            }
        };

        fetchData();
    }, [currentPage]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const sorting = <T extends keyof Order>(
        col: T,
    ) => {
        if (orders === "ASC") {
            const sorted = [...data].sort((a, b) =>
                String(a[col]).toLowerCase() > String(b[col]).toLowerCase() ? 1 : -1
            );
            setData(sorted);
            setOrders("DESC");
            <ArrowUpwardIcon fontSize="small" />
        }
        if (orders === "DESC") {
            const sorted = [...data].sort((a, b) =>
                String(a[col]).toLowerCase() < String(b[col]).toLowerCase() ? 1 : -1
            );
            setData(sorted);
            setOrders("ASC");
            <ArrowDownwardIcon fontSize="small" />
        }
    };


    return (
        <React.Fragment>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <div className='icon'><SearchIcon fontSize='large' /></div>
                <select title="Filters" placeholder="Filters">
                    <option value="Ship City">Freight</option>
                    <option value="Ship City">Ship City</option>
                    <option value="Ship City">Ship Country</option>
                    <option value="Ship City">Order Date</option>
                    <option value="Ship Country">Ship Address</option>
                </select>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" onClick={() => sorting("orderId")}>
                                {orders === 'ASC' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                                Order ID
                            </TableCell>
                            <TableCell align="right">Customer ID</TableCell>
                            <TableCell align="right">Employee ID</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Required Date</TableCell>
                            <TableCell align="right">Shipped Date</TableCell>
                            <TableCell align="right" onClick={() => sorting("shipVia")}>Ship Via</TableCell>
                            <TableCell align="right" onClick={() => sorting("freight")}>Freight</TableCell>
                            <TableCell align="right" onClick={() => sorting("shipName")}>Ship Name</TableCell>
                            <TableCell align="right">Ship Address</TableCell>
                            <TableCell align="right">Ship City</TableCell>
                            <TableCell align="right">Ship Region</TableCell>
                            <TableCell align="right">Ship Postal Code</TableCell>
                            <TableCell align="right">Ship Country</TableCell>
                        </TableRow>
                    </TableHead>
                    {<TableBody>
                        {data.filter((order) => {
                            if (search === "") {
                                return order
                            } else if (order.shipName.toLowerCase().includes(search.toLowerCase())) {
                                return order
                            }
                        }).map((order) => (
                            <TableRow key={order.orderId}>
                                {Object.values(order).map((value, index) => (
                                    <TableCell key={index} align="right">
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
        </React.Fragment>
    );
}

export default OrderTable;

