const mongoose = require('mongoose')
const Menu = require('../../Model/Menu/MenuModel');

//create menu
const createMenu = async(req, res) => {
    const {restaurantId, title, description, price,  availability,photos, category} = req.body

     const menuId = `MI-${Math.floor(1000 + Math.random() * 900000)}`;

     //add to db
     try{
         const menu = await Menu.create({menuId,restaurantId, title, description, price,  availability,photos, category})
         res.status(200).json(menu)
     }catch (error){
         res.status(400).json({error: error.message})
     }
}


//get all the menus
const getMenus = async(req,res) => {
  const menus = await Menu.find({}).sort({createdAt: -1})

  res.status(200).json(menus)
}


//delete menu
const deleteMenu = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such menu"})
        }
    
    const menu = await Menu.findOneAndDelete({_id : id})

    if(!menu){
        return res.status(404).json({error:"No such menu"})
    }

    res.status(200).json(menu)
}



//update menu
const updateMenu = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such menu"})
    }

    // Destructure allowed fields
    const { title,description,price,availability, photos, category } = req.body

    let updateFields = {};

    if(title) updateFields.title = title
    if(description) updateFields.description = description
    if(price) updateFields.price = price
    if(availability) updateFields.availability = availability
    if(photos) updateFields.photos = photos
    if(category) updateFields. category  = category 

    try {
            const menu = await Menu.findOneAndUpdate(
                { _id: id }, 
                { $set: updateFields }, 
                { new: true, runValidators: true }
            )

            if(!menu){
                return res.status(404).json({error:"No such menu"})
            }
        
            res.status(200).json(menu)
        } catch (error){
            res.status(500).json({ error: "Internal Server Error", details: error.message })
        }
}

module.exports = {createMenu, getMenus, updateMenu, deleteMenu}