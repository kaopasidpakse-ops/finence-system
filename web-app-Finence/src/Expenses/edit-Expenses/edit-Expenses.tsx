import { useState } from "react";
import "./edit-Expenses.css";
import axios from "axios";

 type ExpenseType = {
        _id: string;
        Date: string;
        Source: string;
        Category: string;
        Amount: string | number;
    };
function edit({ setShowEditForm , ExpenseEditData } : { showEditForm: boolean; setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>; ExpenseEditData: any }) {
 
    const [EditDate, setEditDate] = useState<ExpenseType>({
        _id: ExpenseEditData._id,
        Date: ExpenseEditData.Date,
        Source: ExpenseEditData.Source,
        Category: ExpenseEditData.Category,
        Amount: ExpenseEditData.Amount
    });

    const expenseEdit = async (
       e: React.FormEvent
    ) => {
        
          if (
        !EditDate.Date ||
        !EditDate.Source ||
        !EditDate.Category ||
        !EditDate.Amount
    ) {
        alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ");
        e.preventDefault();
        return;
    }

        try {
            const res = await axios.put(
                `http://localhost:3000/api/EditExpense/${EditDate._id}`,

                EditDate,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }


            );
             console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };


    function handleClose() {
        setShowEditForm(false);
    }
    return (
        <div className="backgroundBox-Expenses-Edit">
            <div className="box-form-Expenses-Edit">
                <div className="form-Expenses-Edit">
                    <form action="" onSubmit={expenseEdit}>
                        <h3 className="add-form-Expenses-Edit" style={{ textAlign: "left" }}>Edit Expense</h3>
                        <div className='input-container-Expenses-Edit'>
                        <p style={{ textAlign: "left" }}>Date:</p>
                        <input type="date"date-slot="input"className="date-input-Expenses-Edit" value={EditDate.Date} onChange={(e) => setEditDate({...EditDate, Date: e.target.value})} />
                        </div>
                        <div className='input-container-Expenses-Edit'>
                        <p style={{ textAlign: "left" }}>Source:</p>
                        <input type="text" placeholder="Source"  className="Source-Expenses-Edit" value={EditDate.Source} onChange={(e) => setEditDate({...EditDate, Source: e.target.value})} />
                        </div>
                        <div className='input-container-Expenses-Edit'>
                        <p style={{ textAlign: "left" }}>Category:</p>
                        <select className="category-Expenses-Edit" value={EditDate.Category} onChange={(e) => setEditDate({...EditDate, Category: e.target.value})}>
                        
                        <option>ຄ່າອາຫານ</option> 
                        <option>ຄ່າເຂົ້າໜົມ</option>
                        <option>ຄ່າຂອງໃໍຊ້</option>
                        <option>ຄ່າເຄຶ່ອງນູ່ງ</option>
                        <option>ຄ່າຂອງກິນໃນຫ້ອງ</option>
                        <option>ຄ່າອື່ນໆ</option>
                        
                        </select>
                        </div>
                        <div className='input-container-Expenses-Edit'>
                        <p style={{ textAlign: "left" }}>Amount:</p>
                        <input type="number" placeholder="Amount" className="Amount-Expenses-Edit" value={EditDate.Amount} onChange={(e) => setEditDate({...EditDate, Amount: parseFloat(e.target.value)})} />
                        </div>
                        <div className="button-container-Expenses-Edit">
                        <button className="add-input-Expenses-Edit">Edit Expense</button>   
                        <button className="close-Expenses-Edit" onClick={handleClose}>Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default edit;