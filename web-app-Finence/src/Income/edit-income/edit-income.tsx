
import React, { useState } from "react";
import "./edit-income.css";
import axios from "axios";

type IncomeType = {
    _id: string;
    Date: string;
    Source: string;
    Category: string;
    Amount: string | number;
};
function edit({ setShowEditForm , IncomeEditData } : { showEditForm: boolean; setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>; IncomeEditData: IncomeType }) {
const [EditDate, setEditDate] = useState<IncomeType>({
    _id: IncomeEditData._id,
    Date: IncomeEditData.Date,
    Source: IncomeEditData.Source,
    Category: IncomeEditData.Category,
    Amount: IncomeEditData.Amount
});

 const incomeEdit = async (
        e: React.FormEvent
    ) => {
        
          if (
        !EditDate.Date ||
        !EditDate.Source ||
        !EditDate.Category ||
        !EditDate.Amount
    ) {
        alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ")
        e.preventDefault();
        return;
    }


        try {
            const res = await axios.put(
                `http://localhost:3000/api/EditIncome/${EditDate._id}`,
                EditDate,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(res.data);

            setShowEditForm(false);

        } catch (err) {
            console.log(err);
        }
    };

    function handleClose() {
        setShowEditForm(false);
        
    }
    return (
        <div className="backgroundBox-Income-Edit">
            <div className="box-form-Income-Edit">
                <div className="form-Income-Edit">
                   <form onSubmit={incomeEdit}>
                        <h3 className="add-form-Income-Edit" style={{ textAlign: "left" }}>Edit Income</h3>
                        <div className='input-container-Income-Edit'>
                        <p style={{ textAlign: "left" }}>Date:</p>
                        <input type="date"date-slot="input"className="date-input-Income-Edit" value={EditDate.Date} onChange={(e) => setEditDate({...EditDate, Date: e.target.value})} />
                        </div>
                        <div className='input-container-Income-Edit'>
                        <p style={{ textAlign: "left" }}>Source:</p>
                        <input type="text" placeholder="Source"  className="Source-Income-Edit" value={EditDate.Source} onChange={(e) => setEditDate({...EditDate, Source: e.target.value})} />
                        </div>
                        <div className='input-container-Income-Edit'>
                        <p style={{ textAlign: "left" }}>Category:</p>
                        <select className="category-Income-Edit" value={EditDate.Category} onChange={(e) => setEditDate({...EditDate, Category: e.target.value})}>
                        
                        <option>ພໍ່ໃຫ້</option> 
                        <option>ແມ່ໃຫ້</option>
                        <option>ເງິນເດິອນບໍລິສາກ</option>
                        <option>ເງິນເດິອນໂຮງຮຽນ</option>

                        
                        </select>
                        </div>
                        <div className='input-container-Income-Edit'>
                        <p style={{ textAlign: "left" }}>Amount:</p>
                        <input type="number" placeholder="Amount" className="Amount-Income-Edit" value={EditDate.Amount} onChange={(e) => setEditDate({...EditDate, Amount: parseFloat(e.target.value) })} />
                        </div>
                        <div className="button-container-Income-Edit">
                        <button className="add-input-Income-Edit" >Edit Income</button>   
                        <button type="submit" className="close-Income-Edit" onClick={handleClose}>Close</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default edit;