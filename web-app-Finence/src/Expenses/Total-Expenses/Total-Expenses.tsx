import "./Total-Expenses.css"
import { useEffect,useState } from "react";
import axios from "axios";

type ExpenseType = {
    totalAmount: number;
    totalEntries: number;
}

function TotalExpenses() {

            const [Total, setTotal] = useState<ExpenseType>({
    totalAmount: 0,
    totalEntries: 0,
    });
       
    ;
    // console.log(Total);


        
useEffect(() => {

    axios.get("http://localhost:3000/api/Total-expense"
    , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    )
        .then((res) => {
            setTotal(res.data);
        });

}, []);

    return (
        <div className="Total-container-expense">
        <div className="Total-expense">
            <div className="Total-text-expense">
                <p>Total Expenses</p>
            </div>
            <div className="money-expense">
                <p>₭ {Total.totalAmount.toLocaleString()}</p>

            </div>
            <div className="Entries-expense">
                <p>{Total.totalEntries} Expense entries</p>
            </div> 
            
        </div>
        
        <br />

        <div className="Total-expense"  >
            <div className="Total-text-expense">
                <p>Total Expenses</p>
            </div>
            <div className="money-expense">
                <p>₭ {Total.totalAmount.toLocaleString()}</p>

            </div>
            <div className="Entries-expense">
                <p>{Total.totalEntries} Expense entries</p>
            </div> 
            
        </div>
        </div>

    )
}
export default TotalExpenses