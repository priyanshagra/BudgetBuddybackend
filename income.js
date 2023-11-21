const IncomeSchema = require ("./models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount,maker,  category, description, date } = req.body;
  const income = IncomeSchema({
    title,
    amount,
    maker,
    category,
    description,
    date
  })


  try {
    await income.save()
    res.status(200).json({success:true})
  } catch (error) {
    res.status(500).json({message: "Server Error"})
  }

}

exports.getIncome = async (req, res) => {
    const maker=req.header("auth-token");
  try {
    const income = await IncomeSchema.find({maker}).sort({createdAt: -1})
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
