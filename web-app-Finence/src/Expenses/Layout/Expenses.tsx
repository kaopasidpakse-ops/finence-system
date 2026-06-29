import "./Expenses.css"
import Navbar from "../navbar-Expenses/navbar"
import Header from "../Header-Expenses/Header"
import IncomeHistory from "../History-Expenses/Expenses-History"
import AddIncome from "../Add-Expenses/add-Expenses"
import TotalIncome from "../Total-Expenses/Total-Expenses"



function Expenses() {
  return (
    <>
    <Header />
    <Navbar />
    <AddIncome />
    <TotalIncome />
    <IncomeHistory />
    </>
  )
}
export default Expenses