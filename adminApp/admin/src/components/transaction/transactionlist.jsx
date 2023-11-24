import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:2020/transaction/all");
        const formattedTransactions = res.data.map((transaction) => ({
          ...transaction,
          id: transaction._id, // Chuyển đổi _id sang id
          status: transaction.transactionStatus == "00" ? "Success" : "Failed",
        }));
        setTransactions(formattedTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "idTransactionVNPay", headerName: "Transaction ID", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "bankCode", headerName: "Bank Code", width: 150 },
    {
      field: "thoiGianThanhToan",
      headerName: "Payment Time",
      width: 200,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    { field: "status", headerName: "Status", width: 150 },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="airportList">
      <div className="airportTitleContainer">
        <h1 className="airportTitle">Transaction</h1>
      </div>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}

export default TransactionList;
