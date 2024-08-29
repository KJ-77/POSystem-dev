import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import OrderDetails from "./OrderDetails";
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function createOrder(
  id: number,
  name: string,
  orderby: string,
  description: string,
  unitprice: number,
  quantity: number,
  status: "pending" | "accepted" | "rejected",
  date: string
) {
  return {
    id,
    orderby,
    name,
    description,
    unitprice,
    quantity,
    status,
    date,
    totalprice: unitprice * quantity,
  };
}

const initialRows = [
  createOrder(1, "Laptop", "khalil01", "15 inch MacBook Pro", 799.99, 15, "accepted", "2023-12-20"),
  createOrder(2, "Laptop", "khalil01", "15 inch MacBook Pro", 799.99, 15, "accepted", "2023-12-25"),
  createOrder(3, "Phone", "khalil01", "iPhone 13 Pro Max", 599.99, 1, "pending", "2023-12-20"),
  createOrder(4, "Tablet", "khalil01", "iPad Pro 11 inch", 399.99, 3, "accepted", "2023-12-15"),
  createOrder(5, "Headphones", "khalil01", "Sony WH-1000XM4 Noise-Canceling Headphones", 199.99, 4, "rejected", "2023-12-10"),
];

const columns: GridColDef[] = [
  {
    field: "name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Order Name</strong>,
  },
  {
    field: "orderby",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Order By</strong>,
  },
  {
    field: "description",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Description</strong>,
  },
  {
    field: "totalprice",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Total Price</strong>,
  },
  {
    field: "status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Status</strong>,
    renderCell: (params) => {
      const { value } = params;
      return (
        <div
          style={{
            color: value === "accepted" ? "green" : value === "rejected" ? "red" : "blue",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      );
    },
  },
  {
    field: "date",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => <strong style={{ color: "#002a2f" }}>Date</strong>,
  },
];

export default function OrdersDataGrid() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const updateStatus = (id: number, newStatus: "pending" | "accepted" | "rejected") => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || row.status.toLowerCase() === filter.toLowerCase())
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <SearchIcon style={{ color: theme.palette.primary.main }} />
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "25%" }}
        />
        <Box>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={filtername}
            onChange={(e) => {
              const value = e.target.value;
              setFilter(value === "All" ? "" : value.toLowerCase());
              setFiltername(value);
            }}
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Accepted"}>Accepted</MenuItem>
            <MenuItem value={"Rejected"}>Rejected</MenuItem>
          </Select>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        //@ts-ignore
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          color: theme.palette.text.primary,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: theme.palette.text.primary,
            textAlign: "center",
          },
        }}
        onRowClick={handleRowClick}
      />
      {selectedRow && (
        <OrderDetails
          id={selectedRow.id}
          name={selectedRow.name}
          orderby={selectedRow.orderby}
          unitprice={selectedRow.unitprice}
          quantity={selectedRow.quantity}
          description={selectedRow.description}
          status={selectedRow.status}
          date={selectedRow.date}
          isopen={open}
          setisopen={setOpen}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}
