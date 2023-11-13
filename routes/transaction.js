const { addIncome } = require('../income')
const { getIncome } = require('../income')
const { deleteIncome } = require('../income')
const { addExpense } = require('../expense')
const { getExpense } = require('../expense')
const { deleteExpense } = require('../expense')

const router=require('express').Router()

router.post('/add-income', addIncome)
        .get('/get-income',getIncome)
        .delete('/delete-income/:id', deleteIncome)
        .post('/add-expense', addExpense)
        .get('/get-expense',getExpense)
        .delete('/delete-expense/:id', deleteExpense)
module.exports = router