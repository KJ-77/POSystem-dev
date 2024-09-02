import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import OrderDetails from "./admin/OrderDetails";
import theme from "../globalStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios"; // Use axios for API requests

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
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [filtername, setFiltername] = useState("All");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/orders/1");
          console.log("API Response:", response.data); // Log the response data
      
          const orders = response.data; // API response might be an array of objects
          const formattedOrders = orders.map((order,index) => ({
            id:index,
            name: order.order_name,
            orderby: order.user_fullname,
            description: order.order_desc,
            totalprice: order.total_price,
            status: order.order_status,
            date: new Date(order.order_date).toLocaleDateString(),
          }));
          setRows(formattedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

    fetchOrders();
  }, []);

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
