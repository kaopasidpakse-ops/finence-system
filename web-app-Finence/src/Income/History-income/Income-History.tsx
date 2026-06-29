import {useEffect, useState } from "react";
import "./Income-History.css";
import Edit from "../edit-income/edit-income";
import axios from "axios";

type IncomeType = {
    _id: string;
    Date: string;
    Source: string;
    Category: string;
    Amount:  string | number;
};
function IncomeHistory() {
    const [IncomeEditData, setIncomeEditData] = useState<IncomeType>({
        _id: "",
        Date: "",
        Source: "",
        Category: "",
        Amount: "",
    });

    
    const [incomeData, setIncomeData] = useState<IncomeType[]>([]);



   const fetchIncomeData = () => {
    axios.get("http://localhost:3000/api/income", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((res) => {
        setIncomeData(res.data);
    })
    .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    });
};

    useEffect(() => {
        fetchIncomeData();
    }, []);

    const IncomeDelete = (_id:string) => {
        axios.delete(`http://localhost:3000/api/DeleteIncome/${_id}`
        , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        )
            .then((res) => {
                console.log(res.data);
                fetchIncomeData(); // Refresh the income data after deletion
            })
            .catch((err) => {
                console.log(err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            });
    }

    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditClick = () => {
        setShowEditForm(true);
    }
    return (
        <div className="container-income-history">
            <div className="income-history">
                <h2>Income History</h2>
                <p className="subtitle">All recorded income transactions</p>

            </div>
            <div className="income-history-table">
                <table >
                    <thead>
                        <tr>
                            <th >Date</th>
                            <th>Source</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th style={{textAlign:"right"}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
            {incomeData.map((income, ) => (
            <tr key={income._id}>
              
              <td style={{ width: 250 }}>{income.Date}</td>

              <td style={{ width: 450 }}>
                <span className="sub">{income.Source}</span>
              </td>

              <td>
                <span className="tag">{income.Category}</span>
              </td>

              <td className="Amount-income">₭ {income.Amount.toLocaleString()}</td>

              <td style={{ textAlign: "right" }}>
                
                <span className="icon-edit" onClick={() => {
                  setIncomeEditData(income);
                  handleEditClick();
                }}>
                  ✏️  
                </span>
                  {showEditForm && <Edit showEditForm={showEditForm} setShowEditForm={setShowEditForm} IncomeEditData={IncomeEditData} />}

                <span className="icon-delete" onClick={() =>{
                     IncomeDelete(income._id)
                     window.location.reload()
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
export default IncomeHistory;