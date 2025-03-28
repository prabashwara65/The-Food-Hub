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


module.exports = {createMenu, getMenus}