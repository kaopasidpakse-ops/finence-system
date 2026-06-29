
import "./add-Expenses.css";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import FormIncome from "../Form-Expenses/Form-Expenses";



function AddIncome() {
    const [showForm, setShowForm] = useState(false);

    const handleAddIncomeClick = () => { 
        setShowForm(true);
    };

    return (
      
        <div className="container-expenses">
            <div className="expenses-header">
                <h2>Expenses Management</h2>
            </div> 
            <div className="add-expense" >

                <button className="add-expense-button" onClick={handleAddIncomeClick} style={{ cursor: "pointer"}}><IoIosAdd style={{ fontSize: "30px", cursor: "pointer" }} /> Add Expense</button>
               {showForm && <FormIncome   showForm={true} setShowForm={setShowForm} />}

            </div> 
        </div>
           

      
    );
}
export default AddIncome;
       