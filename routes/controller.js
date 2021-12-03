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
        const userFound = await User.findOne({ username : username});
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


// gets all unclaimed clothing items
async function getAllUnclaimedClothingItems() {
    try {
      const unclaimed_clothing = await Clothing.find({ claimed : false }); // finds all Clothing Items
      return unclaimed_clothing;
    } catch(err) {
      return "Something went wrong in getAllUnclaimedClothingItems."
    }
};


// gets all clothing items claimed by user with specified username
async function getUserClaimedClothingItems(username) {
    try {
      const user = await User.find({username: username}); // finds user
      const clothing_ids = user.claimed_clothes; // ClothingItem ids stored in user's claimed clothing
      const claimed_clothes = await Clothing.find({ _id : { $in : clothing_ids }});
      return claimed_clothes;
    } catch(err) {
      return "Something went wrong in getUserClaimedClothingItems."
    }
};


// gets all clothing items donated by user with specified username
async function getUserDonatedClothingItems(username) {
    try {
      const user = await User.find({username: username}); // finds user
      const clothing_ids = user.donated_clothes; // ClothingItem ids stored in user's claimed clothing
      const donated_clothes = await Clothing.find({ _id: { $in : clothing_ids }});
      return donated_clothes;
    } catch(err) {
      return "Something went wrong in getUserDonatedClothingItems."
    }
};


// adds a clothing item
async function donateClothingItem(clothing_type, image, donator, title) {
    try {
        // add clothing item
        const clothing_item = new Clothing({
            clothing_type: clothing_type,
            image: image,
            donator: donator,
            title: title
        });
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


// claims a clothing item for user with specified username
async function claimClothingItem(username, id) {
    try {
        const clothing_item = await Clothing.findOne({ _id : id }); //We make sure that names are unique
        clothing_item.claimed = true; // claim the item
        clothing_item.date_claimed = new Date(); // sets claim date
        await clothing_item.save();

        // add clothing item to user's claimed_clothes
        const user = await getUser(username); // calls function to get user with username
        user.claimed_clothes.push(id);
        await user.save()
        return clothing_item; 
    } catch(err) {
        return "Something went wrong in claimClothingItem.";
    }
} 


module.exports = Object.freeze({
    getUser,
    getUserWithCredentials,
    addUserWithCredentials,
    getAllClothingItems,
    getAllUnclaimedClothingItems,
    getUserClaimedClothingItems,
    getUserDonatedClothingItems,
    donateClothingItem,
    claimClothingItem,
  });