const ExpenseSchema = require ("./models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount,maker, type, category, description, date,currency } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    maker,
    type,
    category,
    description,
    date,
    currency
  })
  if(amount<=0)
  {
    res.status(500).json({message: "Amount Should be positive"});
  }

  try {
    await expense.save()
    res.status(200).json({message: 'Expense is saved'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Server Error"})
  }

}

exports.getExpense = async (req, res) => {
    const maker=req.header("auth-token");
  try {
    const expense = await ExpenseSchema.find({maker}).sort({createdAt: -1})
    res.status(200).json({expense})
  } catch (error) {
    res.error(500).json({message: "Server Error"})
  }
}


exports.deleteExpense = async (req, res) => {
  const {id}=req.params
  ExpenseSchema.findByIdAndDelete(id)
  .then((expense) => {
    res.status(200).json({message: 'Expense deleted'})
  })
  .catch((error) => {
    res.error(500).json({message: "Server Error"})
  })
}
