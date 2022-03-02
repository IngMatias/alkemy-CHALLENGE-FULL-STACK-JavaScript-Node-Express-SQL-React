const express = require('express')
const router = express.Router()

const db = require('../database/operations')

router.post('/movement', (req, res) => {
    const data = {
        userId: req.user.userId,
        value: req.body.value,
        type: req.body.type,
        categoryId: req.body.categoryId,
        description: req.body.description,
        date: req.body.date,
    }
    db.addMovement(data, () => {
        res.sendStatus(200)
    })
})

router.delete('/movement', (req, res) => {
    const data = {
        movementId: req.body.movementId,
    }
    db.deleteMovement(data, () => {
        res.sendStatus(200)
    })
})

router.get('/movements', (req, res) => {
    const data = {
        userId: req.user.userId,
    }
    db.getMovements(data, (result) => {
        res.json(result)
    })
})

router.post('/category', (req, res) => {
    const data = {
        userId: req.user.userId,
        category: req.body.category,
    }
    db.addCategory(data, () => {
        res.sendStatus(200)
    })
})

router.delete('/category', (req, res) => {
    const data = {
        categoryId: req.body.categoryId,
    }
    db.deleteCategory(data, () => {
        res.sendStatus(200)
    })
})
router.get('/categories', (req, res) => {
    const data = {
        userId: req.user.userId,
    }
    db.getCategories(data, (result) => {
        res.json(result)
    })
})

module.exports = router