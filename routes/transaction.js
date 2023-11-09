const { addIncome } = require('../controllers/income')
const { getIncome } = require('../controllers/income')
const { deleteIncome } = require('../controllers/income')
const { addExpense } = require('../controllers/expense')
const { getExpense } = require('../controllers/expense')
const { deleteExpense } = require('../controllers/expense')

const router=require('express').Router()

router.post('/add-income', addIncome)
        .get('/get-income',getIncome)
        .delete('/delete-income/:id', deleteIncome)
        .post('/add-expense', addExpense)
        .get('/get-expense',getExpense)
        .delete('/delete-expense/:id', deleteExpense)
module.exports = router