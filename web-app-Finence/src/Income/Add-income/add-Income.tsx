
import "./add-Income.css";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import FormIncome from "../Form-income/Form-income";



function AddIncome() {
    const [showForm, setShowForm] = useState(false);

    const handleAddIncomeClick = () => { 
        setShowForm(true);
    };

    return (
      
        <div className="container-income">
            <div className="Income-m">
                <h2>Income Management</h2>
            </div> 
            <div className="add-Income" >

                <button className="add-income-button" onClick={handleAddIncomeClick} style={{ cursor: "pointer"}}><IoIosAdd style={{ fontSize: "30px", cursor: "pointer" }} /> Add Income</button>
               {showForm && <FormIncome   showForm={true} setShowForm={setShowForm} />}

            </div> 
        </div>
           

      
    );
}
export default AddIncome;
       