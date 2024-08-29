import React from "react";
import OrdersDataGrid from "../components/admin/DataGridOr";
import TitleBar from "../components/TitleBar";
import ProtectedRoute from "../config/ProtectedRoute";

export default function admin() {
  const role = localStorage.getItem('role');
  console.log(role);
  return (
    <>
      <ProtectedRoute>
        <TitleBar role="Admin" />
        <OrdersDataGrid />
      </ProtectedRoute>
    </>
  );
}
