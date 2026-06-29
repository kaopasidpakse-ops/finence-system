import {  useEffect, useState } from "react";
import "./Expenses-History.css";
import Edit from "../edit-Expenses/edit-Expenses";
import axios from "axios";
function ExpensesHistory() {

  const [ExpenseEditData, setExpenseEditData] = useState<ExpenseType>({
    _id: "",
    Date: "",
    Source: "",
    Category: "",
    Amount: ""
});

    type ExpenseType = {
        _id: string;
        Date: string;
        Source: string;
        Category: string;
        Amount: string | number;
    };
    const [expensesData, setExpensesData] = useState<ExpenseType[]>([]);


const fetchExpensesData = () => {
 axios.get("https://finence-system.onrender.com/api/expenses", {
  headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

    .then((res) => {
      //  console.log(res.data);
      setExpensesData(res.data);
      //  if (Array.isArray(res.data)) {

      //     setExpensesData(res.data);

      //   } else {

      //     console.log("NOT ARRAY:", res.data);

      //     setExpensesData([]);

      //   }

    })
    .catch((err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    });

  
};


useEffect(() => {
    fetchExpensesData();
}, []);





const ExpenseDelete = (_id:string) => {
    axios.delete(`https://finence-system.onrender.com/api/DeleteExpense/${_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then((res) => {
            console.log(res.data);
            fetchExpensesData(); // Refresh the expenses data after deletion
        }
        )
        .catch((err) => {
            console.log(err);
        });
}


    const [showEditForm, setShowEditForm] = useState(false);
    
        const handleEditClick = () => {
            setShowEditForm(true);
        }

        
    return (

     <div className="container-expense-history">
    
    <div className="expense-history">
      <h2>Expenses History</h2>
      <p className="subtitle-expense">All recorded expense transactions</p>
    </div>

    <div className="expense-history-table">
 
      <table className="tb-expense">
        <thead>
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Category</th>
            <th>Amount</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
     
        <tbody className="td-expense">
            {expensesData.map((expense) => (
            <tr key={expense._id}>
              
              <td style={{ width: 250 }}>{expense.Date}</td>

              <td style={{ width: 450 }}>
                <span className="sub-expense">{expense.Source}</span>
              </td>

              <td>
                <span className="tag-expense">{expense.Category}</span>
              </td>

              <td>₭ {expense.Amount.toLocaleString()}</td>

              <td style={{ textAlign: "right" }}>
                
                <span className="icon-edit-expense" onClick={() => {
                  setExpenseEditData(expense);
                  handleEditClick();
                }}>
                  ✏️  
                </span>
                  {showEditForm && <Edit showEditForm={showEditForm} setShowEditForm={setShowEditForm} ExpenseEditData={ExpenseEditData} />}

                <span className="icon-delete-expense" onClick={() => {
                  ExpenseDelete(expense._id);
                   window.location.reload();
                }}>
                  🗑️
                </span>

              </td>

            </tr>
))}          
        </tbody>

      </table>

    </div>
    

    </div>

         
);


}
export default ExpensesHistory;