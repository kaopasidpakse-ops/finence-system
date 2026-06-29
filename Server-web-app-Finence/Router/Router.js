

import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();


const { ExpenseData } = await import('../DataBaseMongoDB/db.js');
const { IncomeData } = await import('../DataBaseMongoDB/db.js');
const { UserData } = await import('../DataBaseMongoDB/db.js');


// ກວດສອບ token ທີ່ user ເຮັດ request ມາ
export const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired / invalid" });
    }
};




router.get("/income", auth, async (req,res)=>{
  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const data = await IncomeData.find({
      userId: req.user.userId
    });
    // console.log("Fetched Income Data:", data); // ກວດສອບ data

    res.json(data);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err);
  }
});




router.get("/expenses", auth, async (req, res) => {
    try {
        const data = await ExpenseData.find({
            userId: req.user.userId
        });

        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/AddIncome", auth, async (req, res) => {
  try {
    const newIncome = new IncomeData({
      ...req.body,
      userId: req.user.userId
    });

    const saved = await newIncome.save();
    res.json(saved);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err);
  }
});
router.post("/AddExpense", auth, async (req, res) => {
    try {
        const newExpense = new ExpenseData({
            ...req.body,
            userId: req.user.userId
        });

        const savedExpense = await newExpense.save();
        res.json(savedExpense);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete("/DeleteIncome/:id", auth, async (req, res) => {
    try {
        const deletedIncome = await IncomeData.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedIncome) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        res.json({
            message: "Income deleted successfully"
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/DeleteExpense/:id", auth, async (req, res) => {
    try {
        const deletedExpense = await ExpenseData.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/EditIncome/:id", auth, async (req, res) => {
    try {
        const updatedIncome = await IncomeData.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            req.body,
            {
                new: true
            }
        );

        if (!updatedIncome) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        res.json(updatedIncome);

    } catch (err) {
        res.status(500).json(err);
    }
});
router.put("/EditExpense/:id",  async (req, res) => {
    try {
        const updatedExpense = await ExpenseData.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }   
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json(err);
    }
});

import mongoose from "mongoose";

router.get("/Total-income", auth, async (req, res) => {
    try {

        const userId = new mongoose.Types.ObjectId(
            req.user.userId
        );

        const total = await IncomeData.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$Amount"
                    }
                }
            }
        ]);

        const count = await IncomeData.countDocuments({
            userId: userId
        });

        res.json({
            totalAmount: total[0]?.totalAmount || 0,
            totalEntries: count
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/Total-expense", auth, async (req, res)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const total = await ExpenseData.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount"}
                }

            }
        ])
        const count = await ExpenseData.countDocuments({
            userId: userId
        });
         res.json({ 
            totalAmount: total[0]?.totalAmount || 0,
            totalEntries: count
        });
    }
        catch (err) {
        res.status(500).json(err);
    }
})

router.get("/Total-money", auth, async (req, res)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const totalIncome = await IncomeData.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount"}
                }
            }
        ])
        const totalExpense = await ExpenseData.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Amount"}
                }
            }
        ])
        const netBalance = (totalIncome[0]?.totalAmount || 0) - (totalExpense[0]?.totalAmount || 0);
        res.json({ netBalance });
    } catch (err) {
        res.status(500).json(err);
    }
})


 router.post("/register", async (req, res) => {
    try {
    const { username,role, password } = req.body;
    // console.log(username, role, password);

    // 1. check user exist
    const existUser = await UserData.findOne({ username });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });

    }

   

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create user
    const newUser = new UserData({
      username,
     
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Register successful"
    });

  } catch (err) {
    res.status(500).json({
       
       
      success: false,
      message: err.message
    });
  }

})

router.post("/login", async (req, res) => {
   try {
    const { username, password } = req.body;

    const user = await UserData.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // console.log("Generated Token:", token);

    return res.json({ user, token });

  } catch (error) {
    console.log("LOGIN ERROR:", error); // 👈 ສຳຄັນຫຼາຍ
    return res.status(500).json({ message: error.message });
  }
});




    







       



export default router