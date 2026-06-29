import mongoose from 'mongoose';



mongoose.connect('mongodb://127.0.0.1:27017/finance', )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

let incomeDataSchema = new mongoose.Schema({
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "userData",
  required: true
},
    Date: String,
    Source: String,
    Category: String,
    Amount: Number
});    
let expenseDataSchema = new mongoose.Schema({
       userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "userData",
  required: true
},
    Date: String,
    Source: String,
    Category: String,
    Amount: Number
}); 
let UserDataSchema = new mongoose.Schema({
     username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
})




let ExpenseData = mongoose.model('expenseData', expenseDataSchema);
let IncomeData = mongoose.model('incomeData', incomeDataSchema);
let UserData = mongoose.model('userData', UserDataSchema);

export {ExpenseData, IncomeData , UserData};
