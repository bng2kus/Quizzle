const express = require('express')
const {
    createSet,
    getSets,
    getSet,
    deleteSet,
    updateSet
} = require('../controllers/setController')

const router = express.Router()

//GET all sets
router.get('/', getSets)

//GET a single set
router.get('/:id', getSet)

//POST new set
router.post('/', createSet)

//DELETE set
router.delete('/:id', deleteSet)

//UPDATE set
router.patch('/:id', updateSet)

module.exports = router