import  { useEffect, useState } from "react";
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
import axios from 'axios';
import Loading from "../Loading";
import AddUser from "./AddUser"

//"ID":2,"FULLNAME":"Jane Smith","":"jane.smith@example.com","position":"admin","status":"working"
interface Users {
  id: string;
  FULLNAME: string;
  email: string;
  position: string;
  status: string;
}


const columns: GridColDef[] = [
  {
    field: "FULLNAME",
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
    field: "position",
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

  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  /*const [error, setError] = useState<string | null>(null);*/
  
  useEffect(() => {
    const fetchUserss = async () => {
      try {
        const response = await axios.get('https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/users');
        
        const userssWithId = response.data.map((users: any, index: number) => ({
          ...users,
          id: users.ID || index.toString(), // Ensure each users has a unique id
        }));
        setUsers(userssWithId);
      } catch (err ) {
       // setError('Failed to fetch users');
       console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchUserss();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const filteredRows = users.filter(
    (row) =>
      row.FULLNAME.toLowerCase().includes(searchTerm.toLowerCase()) &&
      row.position.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
   {loading ? (<Loading/>) : (
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
          username={selectedRow.FULLNAME}
          email={selectedRow.email}
          role={selectedRow.position}
          isopen={open}
          setisopen={setOpen}
        />
      )}
      <AddUser />
    </div>
    
  )}
  </>
  );
}
