const mongoose = require('mongoose')
const Menu = require('../../Model/Menu/MenuModel');
const {putObject} = require('../../utils/putObject')
const {v4} = require('uuid')

//create menu
const createMenu = async (req, res) => {
    const { restaurantId, title, description, price, availability, category } = req.body;
  
    const files = req.files?.photos;
    const photoFiles = Array.isArray(files) ? files : [files];
  
    if (!photoFiles || photoFiles.length < 1) {
      return res.status(400).json({ status: 'error', error: 'At least one image is required.' });
    }
  
    const menuId = `MI-${Math.floor(1000 + Math.random() * 900000)}`;
    const imageUrls = [];
  
    try {
      for (const file of photoFiles) {
        const fileName = `images/${v4()}-${file.name}`;
        const { url } = await putObject(file.data, fileName);
        if (!url) throw new Error(`Failed to upload image: ${file.name}`);
        imageUrls.push(url);
      }
  
      const menu = await Menu.create({
        menuId,
        restaurantId,
        title,
        description,
        price,
        availability,
        photos: imageUrls,
        category,
      });
  
      res.status(200).json(menu);
    } catch (err) {
      res.status(500).json({ status: 'error', error: err.message });
    }
  };


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