import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowParams,
} from "@mui/x-data-grid";
import theme from "../../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import UserDetails from "./UserDetails";

function users(
  id: number,
  username: string,
  email: string,
  role: "Admin" | "Authorizer" | "Employee",

) {
  return {
    id,
    username,
    email,
    role
  };
}

const rows = [
  users(
    1,
    "khalil01",
    "khalil01@gmail.com",
    "Admin"
  ),
  users(
    2,
    "jawad1",
    "jawad@gmail.com",
    "Admin"
  ),
  users(
    3,
    "jamil",
    "jamil@gmail.com",
    "Employee"),
    users(
    4,
    "khalil",
    "khaled@gmail.com",
    "Authorizer"
  ),
    users(
    5,
    "mustafa",
    "mustafa@gmail.com",
    "Employee"
  ),
];

const columns: GridColDef[] = [
  {
    field: "username",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"User Name"}</strong>
    ),
  },
  {
    field: "email",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"Email"}</strong>
    ),
  },
  {
    field: "role",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader: () => (
      <strong style={{ color: "rgb(190,190,190)" }}>{"Role"}</strong>
    ),
    renderCell: (params) => {
      const { value } = params;
      return (
        <div
          style={{
            color:
              value === "Admin"
                ? theme.palette.teni.main
                : value === "Authorizer"
                ? theme.palette.telet.main
                : theme.palette.khames.main,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      );
    },
  },
];

export default function UsersDataGrid() {
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
      row.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      row.role.toLowerCase().includes(filter.toLowerCase())
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
          <InputLabel id="demo-simple-select-helper-label">Rule</InputLabel>
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
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Authorizer"}>Authorizer</MenuItem>
            <MenuItem value={"Employee"}>Employee</MenuItem>
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
        <UserDetails
          id={selectedRow.id}
          username={selectedRow.username}
          email={selectedRow.email}
          role={selectedRow.role}
          isopen={open}
          setisopen={setOpen}
        />
      )}
    </div>
  );
}
