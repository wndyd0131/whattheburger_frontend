import React, { useEffect, useState } from 'react'
import { fetchOrderByAuth } from '../../api/order';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { FilterIcon } from '../../svg/Utils';
import Button1 from '../../components/common/Button1';
import OrderStatusLabel from '../../components/OrderStatusLabel';

const OrderHistory = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("CREATED_AT_DESC");

  const columns = [
    { id: 'orderNumber', label: 'Order Number', minWidth: 170},
    { id: 'orderDate', label: 'Order Date', minWidth: 170},
    { id: 'orderType', label: 'Order Type', minWidth: 170},
    { id: 'totalPrice', label: 'Total', minWidth: 170},
    { id: 'lastUpdate', label: 'Last Update', minWidth: 170},
    { id: 'storeNumber', label: 'Store Number', minWidth: 170},
    { id: 'orderStatus', label: 'Status', minWidth: 170, align: "center"}
  ]
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderCount, setOrderCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    loadOrder(newPage, rowsPerPage);
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    loadOrder(0, event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  const handleClickViewDetailsButton = () => {
    // modal open
    // Order status
    // Order Type
    // Order Number
    // Order Date
    // Store Info
    // Products Info
    // Payment Info
    // Order Info
  }

  const createData = (orderNumber, orderDate, orderType, totalPrice, lastUpdate, storeNumber, orderStatus) => {
    return { orderNumber, orderDate, orderType, totalPrice, lastUpdate, storeNumber, orderStatus }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }

  const loadOrder = (page=0, rowsPerPage=10) => {
    setIsLoading(true);
    fetchOrderByAuth(sortType, page, rowsPerPage)
      .then(data => {
        console.log(data);
        setOrderCount(data.orderCount);
        const orderList = data.orders.map((order, orderIdx) => {
          const createdAt = formatDate(order.createdAt);
          const updatedAt = formatDate(order.updatedAt);
          return createData(
            order.orderNumber,
            createdAt,
            order.orderType,
            order.totalPrice,
            updatedAt,
            order.storeId,
            order.orderStatus
          );
        });
        setRows(orderList);
      })
      .catch(err => 
        console.error(err)
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadOrder();
  }, []);

  console.log("ROWS", rows);

  return (
    <div className="flex font-[sans-serif] px-50 py-20 justify-center items-center">
      <div className="h-full w-full p-5 border border-gray-200 rounded-2xl">
        <div className="flex flex-col gap-5">
          <h2>Order History</h2>
          <div className="flex justify-between">
            <TextField
              type='standard'
              label="Search by name, order ID..."
            />
            <button className="flex gap-1 justify-center items-center border border-gray-300 px-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <span className="flex w-[15px] h-[15px]">
                <FilterIcon/>
              </span>
              Filter
            </button>
          </div>

          <div className="search, filter">
            <div className="searchBar">
            </div>
            <div className="filter">

            </div>
          </div>
        </div>
        <div className="list">
          <Paper sx={{ width: '100%', overflow: 'hidden'}}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      align={column.align}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map(row => {
                    return (
                      <TableRow>
                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                            >
                              {column.id === "orderStatus"
                              ? <OrderStatusLabel status={value}/>
                              : value
                              }
                            </TableCell>
                          )
                        })}
                        <TableCell>
                          <Button1
                            onClick={handleClickViewDetailsButton}
                            font={'sans-serif'}
                          >
                            View Details
                          </Button1>
                        </TableCell>
                        <TableCell>
                          <Button1>Re-Order</Button1>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={orderCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          </Paper>


        </div>
      </div>
    </div>
  )
}

export default OrderHistory;