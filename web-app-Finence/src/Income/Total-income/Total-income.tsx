import "./Total-income.css"
import { useEffect,useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

type incomeType = {
    totalAmount: number;
    totalEntries: number;
    

}


function TotalIncome() {

    const [Total, setTotal] = useState<incomeType>({
    totalAmount: 0,
    totalEntries: 0,
    });
       
    ;
    // console.log(Total);


        
useEffect(() => {

    axios.get(`${API}/api/Total-income`,
    {
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
        <div className="Total-container">
        <div className="Total">
            <div className="Total-income">
                <p>Total Income</p>
            </div>
            <div className="money-income">
                <p>₭ {Total.totalAmount.toLocaleString()}</p>

            </div>
            <div className="Entries-income">

                <p>{Total.totalEntries} Income entries</p>
            </div> 
            
        </div>
        
        <br />

        <div className="Total">
            <div className="Total-income">
                <p>Total Income</p>
            </div>
            <div className="money-income">
                <p>₭ {Total.totalAmount.toLocaleString()}</p>

            </div>
            <div className="Entries-income">
                <p>{Total.totalEntries} Income entries </p>
            </div> 
            
        </div>
        </div>

    )
}
export default TotalIncome