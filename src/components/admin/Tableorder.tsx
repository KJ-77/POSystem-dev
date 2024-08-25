import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowOrder from "./RowOrder";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.rabe3.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function orders(
  name: string,
  orderby: string,
  unitprice: number,
  quantity: number,
  description: string,
  status: "pending" | "accepted" | "rejected",
  date: string
) {
  return { name, orderby, unitprice, quantity, description, status, date };
}

const rows = [
  orders(
    "Laptop",
    "khalil01",
    799.99,
    15,
    "inch MacBook Pro",
    "accepted",
    "2023-12-20"
  ),
  orders(
    "Laptop",
    "khaled",
    799.99,
    15,
    "inch MacBook Pro",
    "accepted",
    "2023-12-25"
  ),
  orders(
    "Phone",
    "rasha",
    599.99,
    1,
    "iPhone 13 Pro Max",
    "rejected",
    "2023-12-20"
  ),
  orders(
    "Tablet",
    "jawad",
    399.99,
    3,
    "iPad Pro 11 inch",
    "accepted",
    "2023-12-15"
  ),
  orders(
    "Headphones",
    "mouhamad",
    199.99,
    4,
    "Sony WH-1000XM4 Noise-Canceling Headphones",
    "rejected",
    "2023-12-10"
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Order Name
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Description
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Total Price
            </StyledTableCell>
            <StyledTableCell style={{ fontWeight: "bold" }}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {rows.map((row) => (
          <RowOrder row={row} />
        ))}
      </Table>
    </TableContainer>
  );
}
