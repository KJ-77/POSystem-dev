import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowParams,
} from "@mui/x-data-grid";
//import { useTheme } from '@mui/material/styles';
import OrderDetails from "./OrderDetails";
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function orders(
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

const rows = [
  orders(
    1,
    "Laptop",
    "khalil01",
    "15 inch MacBook Pro",
    799.99,
    15,
    "accepted",
    "2023-12-20"
  ),
  orders(
    2,
    "Laptop",
    "khalil01",
    "15 inch MacBook Pro",
    799.99,
    15,
    "accepted",
    "2023-12-25"
  ),
  orders(
    3,
    "Phone",
    "khalil01",
    "iPhone 13 Pro Max",
    599.99,
    1,
    "pending",
    "2023-12-20"
  ),
  orders(
    4,
    "Tablet",
    "khalil01",
    "iPad Pro 11 inch",
    399.99,
    3,
    "accepted",
    "2023-12-15"
  ),
  orders(
    5,
    "Headphones",
    "khalil01",
    "Sony WH-1000XM4 Noise-Canceling Headphones",
    199.99,
    4,
    "rejected",
    "2023-12-10"
  ),
];

const columns: GridColDef[] = [
  {
    field: "name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Order Name "}</strong>
    ),
  },
  {
    field: "orderby",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Order By "}</strong>
    ),
  },
  {
    field: "description",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Description"}</strong>
    ),
  },
  {
    field: "totalprice",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Total price"}</strong>
    ),
  },
  {
    field: "status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Status"}</strong>
    ),
    renderCell: (params) => {
      const { value } = params;
      return (
        <div
          style={{
            color:
              value === "accepted"
                ? "green"
                : value === "rejected"
                ? "red"
                : "blue",
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
    renderHeader: () => (
      <strong style={{ color: "#002a2f" }}>{"Date"}</strong>
    ),
  },
];

export default function OrdersDataGrid() {
  //const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      row.status.toLowerCase().includes(filter.toLowerCase())
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
          <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filtername}
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilter("");
                setFiltername("All");
              } else {
                setFilter(e.target.value);
                setFiltername(e.target.value);
              }
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
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
          color: theme.palette.telet.main,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "red",
            color: "red",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "black",
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
        />
      )}
    </div>
  );
}
