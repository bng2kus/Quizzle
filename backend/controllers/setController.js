const Set = require('../models/setModel')
const mongoose = require('mongoose')

//GET ALL SETS
const getSets = async (req, res) => {
    const sets = await Set.find({}).sort({createdAt: -1})

    res.status(200).json(sets)
}

//GET A SINGLE SET
const getSet = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such set'})
    }

    const set = await Set.findById(id)

    if(!set){
        return res.status(404).json({error: 'No such set'})
    }

    res.status(200).json(set)

}

//CREATE NEW STUDY SET
const createSet = async (req, res) =>{
    const {title, author, terms, definitions} = req.body

    //add doc to db
    try{
        const set = await Set.create({title, author, terms, definitions})
        res.status(200).json(set)
    } 
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE A STUDY SET
const deleteSet = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such set'})
    }

    const set = await Set.findOneAndDelete({_id: id})

    if(!set){
        return res.status(404).json({error: 'No such set'})
    }

    res.status(200).json(set)
}

//UPDATE A STUDY SET
const updateSet = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such set'})
    }

    const set = await Set.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!set){
        return res.status(404).json({error: 'No such set'})
    }

    res.status(200).json(set)

}

module.exports = {
    getSets,
    getSet,
    createSet,
    deleteSet,
    updateSet
}