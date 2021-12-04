const Clothing = require('../models/ClothingItem');
const User = require('../models/User');

// USER ACTIONS

// finds user with username
async function getUser(username) {
    try {
        const user = await User.findOne({ username : username });
        return user;
    } catch(err) {
        return "Something went wrong in getUser."
    }
}


// finds user with credentials
async function getUserWithCredentials(username, password) {
    try {
        const user = await User.findOne({ username : username, password : password });
        if (user == null) {
            return "Username and/or password is incorrect."
        }
        return user;
    } catch(err) {
        return "Something went wrong in getUserWithCredentials."
    }
}


// adds user with credentials
async function addUserWithCredentials(username, password) {
    try {
        const userFound = await User.findOne({ username : username });
        if (userFound != null) {
            return "Username is already claimed.";
        }
        // if username not claimed
        const user = new User({
            username: username,
            password: password
        });
        await user.save();
        return user;
    } catch(err) {
        return "Something went wrong in addUserWithCredentials."
    }
}


// CLOTHING ACTIONS

// gets all clothing items
async function getAllClothingItems() {
    try {
      const clothing = await Clothing.find({}); // finds all Clothing Items
      return clothing;
    } catch(err) {
      return "Something went wrong in getAllClothingItems."
    }
};


// gets all clothing items donated by user with specified username
async function getUserDonatedClothingItems(username) {
    try {
      const user = await User.findOne({username: username}); // finds user
      const clothing_ids = user.donated_clothes; // ClothingItem ids stored in user's claimed clothing
      const donated_clothes = await Clothing.find({ _id: { $in : clothing_ids }});
      return donated_clothes;
    } catch(err) {
      return "Something went wrong in getUserDonatedClothingItems."
    }
};

// gets all clothing items donated by user with specified username
async function getUserPendingClothingItems(username) {
    try {
        console.log(username);
      const user = await User.findOne({username: username}); // finds user
      console.log(user);
      let clothing_ids = user.donated_clothes; // ClothingItem ids stored in user's claimed clothing
      console.log(user.donated_clothes);
      const donated_clothes = await Clothing.find({ _id: { $in : clothing_ids }});
      const pending_clothes = donated_clothes.filter(item => item.picked_up == false);
      return pending_clothes;
    } catch(err) {
      return "Something went wrong in getUserPendingClothingItems."
    }
};

// gets all clothing items donated by user with specified username
async function getUserPickedUpClothingItems(username) {
    try {
      const user = await User.findOne({username: username}); // finds user
      const clothing_ids = user.donated_clothes; // ClothingItem ids stored in user's claimed clothing
      const donated_clothes = await Clothing.find({ _id: { $in : clothing_ids }});
      const picked_up_clothes = donated_clothes.filter(item => item.picked_up == true);
      return picked_up_clothes;
    } catch(err) {
      return "Something went wrong in getUserPickedUpClothingItems."
    }
};

// adds a clothing item
async function donateClothingItem(clothing_type, condition, size, brand, image, donator, title) {
    try {
        console.log('hi');
        console.log(clothing_type, image, donator, title);
        // add clothing item
        const clothing_item = new Clothing({
            clothing_type: clothing_type,
            condition: condition,
            size: size,
            brand: brand,
            image: image,
            donator: donator,
            title: title
        });
        console.log(clothing_item);
        await clothing_item.save();

        // add clothing item to user's donated_clothes
        const user = await getUser(donator); // calls function to get user with username (same as donator)
        user.donated_clothes.push(clothing_item._id);
        await user.save();
        return clothing_item; 
    } catch(err) { 
        return "Something went wrong in donateClothingItem."; 
    }  
} 


module.exports = Object.freeze({
    getUser,
    getUserWithCredentials,
    addUserWithCredentials,
    getAllClothingItems,
    getUserDonatedClothingItems,
    getUserPendingClothingItems,
    getUserPickedUpClothingItems,
    donateClothingItem,
  });