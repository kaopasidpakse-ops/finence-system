import { useState } from "react";
import axios from "axios";
import "./Form-income.css";

type IncomeType = {
    Date: string;
    Source: string;
    Category: string;
    Amount: string | number;
};

function FormIncome({
    setShowForm
}: {
    showForm: boolean;
    setShowForm: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}) {
    

    const [dataIncome, setDataIncome] =
        useState<IncomeType>({
            Date: "",
            Source: "",
            Category: "ພໍ່ໃຫ້",
            Amount: "",
        });
        
        

const AddIncomeData = async  (e: React.FormEvent) => {

    e.preventDefault();  
        if (
        !dataIncome.Date ||
        !dataIncome.Source ||
        !dataIncome.Category ||
        !dataIncome.Amount
    ) {
        alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ");
        return;
    }

         

        try {

const token = localStorage.getItem("token");

const res = await axios.post(
  "http://localhost:3000/api/AddIncome",
  dataIncome,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

            console.log(res.data);

            alert("ເພີ່ມຂໍ້ມູນສຳເລັດ");

            setDataIncome({
                Date: "",
                Source: "",
                Category: "ພໍ່ໃຫ້",
                Amount: 0
            });

        } catch (err) {

            console.log(err);
            alert("Error saving income");

        }
    }



    function handleClose() {
        setShowForm(false);
         window.location.reload();
    }

    return (

        <div className="backgroundBox">

            <div className="box-form-income">

                <div className="form-income">

                    <form onSubmit={AddIncomeData}>

                        <h3 className="add-form">
                            Add Income
                        </h3>

                        <div className='input-container'>

                            <p>Date:</p>

                            <input
                                type="date"
                                className="date-input"
                                value={dataIncome.Date}
                                onChange={(e) => {
                                    setDataIncome({
                                        ...dataIncome,
                                        Date: e.target.value
                                    });
                                }}
                            />

                        </div>

                        <div className='input-container'>

                            <p>Source:</p>

                            <input
                                type="text"
                                placeholder="Source"
                                className="Source"
                                value={dataIncome.Source}
                                onChange={(e) => {
                                    setDataIncome({
                                        ...dataIncome,
                                        Source: e.target.value
                                    });
                                }}
                            />

                        </div>

                        <div className='input-container'>

                            <p>Category:</p>

                            <select
                                className="category"
                                value={dataIncome.Category}
                                onChange={(e) => {
                                     
                                    setDataIncome({
                                        ...dataIncome,
                                        Category: e.target.value
                                       
                                    });
                                }}
                            >

                                <option>ພໍ່ໃຫ້</option>
                                <option>ແມ່ໃຫ້</option>
                                <option>ເງິນເດິອນບໍລິສາກ</option>
                                <option>ເງິນເດິອນໂຮງຮຽນ</option>
                                
                           

                            </select>

                        </div>

                        <div className='input-container'>

                            <p>Amount:</p>

                            <input
                                type="number"
                                placeholder="Amount"
                                className="Amount"
                                value={dataIncome.Amount}
                                onChange={(e) => {
                                    setDataIncome({
                                        ...dataIncome,
                                        Amount:
                                            parseFloat(
                                                e.target.value
                                            ) 
                                    });
                                }}
                            />

                        </div>

                        <div className="button-container">

                           <button className="add-input " >Add Income</button>

                            <button
                                type = "submit"
                                className="close"
                                onClick={handleClose}
                            >
                                Close
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default FormIncome;