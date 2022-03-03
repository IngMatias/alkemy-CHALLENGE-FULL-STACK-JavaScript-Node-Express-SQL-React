const express = require('express')
const router = express.Router()

const db = require('../database/operations')
const ensureAuthenticated = require('../auth/ensureAuthenticated')

router.post('/movement', ensureAuthenticated, (req, res) => {
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

router.delete('/movement', ensureAuthenticated, (req, res) => {
    const data = {
        movementId: req.body.movementId,
    }
    db.deleteMovement(data, () => {
        res.sendStatus(200)
    })
})

router.get('/movements', ensureAuthenticated, (req, res) => {
    const data = {
        userId: req.user.userId,
    }
    db.getMovements(data, (result) => {
        res.json(result)
    })
})

router.post('/category', ensureAuthenticated, (req, res) => {
    const data = {
        userId: req.user.userId,
        category: req.body.category,
    }
    db.addCategory(data, () => {
        res.sendStatus(200)
    })
})

router.delete('/category', ensureAuthenticated, (req, res) => {
    const data = {
        categoryId: req.body.categoryId,
    }
    db.deleteCategory(data, () => {
        res.sendStatus(200)
    })
})
router.get('/categories', ensureAuthenticated, (req, res) => {
    const data = {
        userId: req.user.userId,
    }
    db.getCategories(data, (result) => {
        res.json(result)
    })
})

module.exports = router