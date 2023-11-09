const IncomeSchema = require ("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, type, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    type,
    category,
    description,
    date
  })


  try {
    if(!title || !category || !description || !date ||!type)
    {
      return res.status(400).json({message: 'All fields are required'})
    }
  if(amount<=0 || !amount === 'number')
    {
      return res.status(400).json({message: 'Amount must be positive'})
    }
    await income.save()
    res.status(200).json({message: 'Income is saved'})
  } catch (error) {
    res.status(500).json({message: "Server Error"})
  }

}

exports.getIncome = async (req, res) => {
  try {
    const income = await IncomeSchema.find().sort({createdAt: -1})
    res.status(200).json({income})
  } catch (error) {
    res.error(500).json({message: "Server Error"})
  }
}


exports.deleteIncome = async (req, res) => {
  const {id}=req.params
  IncomeSchema.findByIdAndDelete(id)
  .then((income) => {
    res.status(200).json({message: 'Income deleted'})
  })
  .catch((err) => {
    res.error(500).json({message: "Server Error"})
  })
}
