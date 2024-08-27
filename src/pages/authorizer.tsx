import OrdersDataGrid from "../components/admin/DataGridOr";
import TitleBar from "../components/TitleBar";

export default function admin() {

  return (<>
  <TitleBar role="Authorizer"/>
  <OrdersDataGrid />;
  </>
    
  )
}