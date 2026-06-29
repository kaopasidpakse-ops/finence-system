import "./Form-Expenses.css"
import { useState } from "react";
import axios from "axios";

type ExpenseType = {
    Date: string;
    Source: string;
    Category: string;
    Amount: string | number;
};
function FormExpenses({ setShowForm } : { showForm: boolean; setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) {
 const [dataExpense, setDataExpense] = useState<ExpenseType>({
    Date: "",
    Source: "",
    Category: "ຄ່າອາຫານ",
    Amount: ""
 });

const AddExpenseData = async(e: React.FormEvent) => {

    e.preventDefault();  
        if (
        !dataExpense.Date ||
        !dataExpense.Source ||
        !dataExpense.Category ||
        !dataExpense.Amount
    ) {
        alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ");
        return;
    }

  
    try {
const token = localStorage.getItem("token");
        const res = await axios.post(
            "http://localhost:3000/api/AddExpense",
            dataExpense
            , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(res.data);
        alert("ເພີ່ມຂໍ້ມູນສຳເລັດ");
        setDataExpense({
            Date: "",
            Source: "",
            Category: "ຄ່າອາຫານ",
            Amount: ""
        });
    } catch (err) {
        console.log(err);
    }
}






    function handleClose() {
        setShowForm(false);
         window.location.reload();
    }
    return (
        <div className="backgroundBox-expense">
            <div className="box-form-expense">
                <div className="form-expense">
                    <form action="" onSubmit={AddExpenseData}>
                        <h3 className="add-form-expense">Add Expenses</h3>
                        <div className='input-container-expense'>
                        <p>Date:</p>
                        <input type="date"date-slot="input"className="date-input" value={dataExpense.Date} onChange={(e) => setDataExpense({...dataExpense, Date: e.target.value})} />
                        </div>
                        <div className='input-container-expense'>
                        <p>Source:</p>
                        <input type="text" placeholder="Source"  className="Source" value={dataExpense.Source} onChange={(e) => setDataExpense({...dataExpense, Source: e.target.value})} />
                        </div>
                        <div className='input-container-expense'>
                        <p>Category:</p>
                        <select className="category-expense" value={dataExpense.Category} onChange={(e) => setDataExpense({...dataExpense, Category: e.target.value})}>
                        <option>ຄ່າອາຫານ</option> 
                        <option>ຄ່າເຂົ້າໜົມ</option>
                        <option>ຄ່າຂອງໃໍຊ້</option>
                        <option>ຄ່າເຄຶ່ອງນູ່ງ</option>
                        <option>ຄ່າຂອງກິນໃນຫ້ອງ</option>
                        <option>ຄ່າອື່ນໆ</option>
                    
                        
                        </select>
                        </div>
                        <div className='input-container-expense'>
                        <p>Amount:</p>
                        <input type="number" placeholder="Amount" className="Amount" value={dataExpense.Amount} onChange={(e) => setDataExpense({...dataExpense, Amount: parseFloat(e.target.value)})} />
                        </div>
                        <div className="button-container-expense">
                        <button className="add-input-expense" type="submit">Add Expense</button>   
                        <button className="close-expense" onClick={handleClose}>Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default FormExpenses;