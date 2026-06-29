import { BrowserRouter, Routes, Route } from "react-router-dom"

import IncomeApp from "./Income/Layout/IncomeApp"
import Expenses from "./Expenses/Layout/Expenses"
import Login from "./Login/Layout-Login"
import Register from "./Register/Layout-Register"

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"


function app (){

    


    return(
        
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Login />} />


    <Route path = "/income" element={
        <ProtectedRoute>
            <IncomeApp />
        </ProtectedRoute>
    } />

    <Route path = "/expenses" element={
        <ProtectedRoute>
            <Expenses />
        </ProtectedRoute>
    } />
    <Route path = "/register" element={
        <ProtectedRoute>
            <Register />
        </ProtectedRoute>
    } />

    
    </Routes>
    </BrowserRouter>
    )
}
export default app