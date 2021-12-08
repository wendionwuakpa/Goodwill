const Administrator = require('./models/Administrator');
const Clothing = require('./models/ClothingItem');
const User = require('./models/User');

// USER ACTIONS

// finds user with username
async function getUser(username) {
    try {
        const user = await User.findOne({ username : username });
        return user;
    } catch(err) {
        return "Something went wrong in getUser.";
    }
}

// 2-CHANGE: finds admin with username
async function getAdmin(username) {
    try {
        const admin = await Administrator.find({ username : username });
        return admin;
    } catch(err) {
        return "Something went wrong in getAdmin.";
    }
}

// // 3-CHANGE: finds admin with credentials
// async function getAdminWithCredentials(username, password) {
//     try {
//         const admin = await Administrator.find({ username : "admin" , password : "pass123" });
//         if (admin == null) {
//             return "Username and/or password is incorrect.";
//         }
//         return admin;
//     } catch(err) {
//         return "Something went wrong in getAdminWithCredentials.";
//     }
// }


// finds user with credentials
async function getUserWithCredentials(username, password) {
    try {
        const user = await User.findOne({ username : username, password : password });
        const admin = await Administrator.findOne({ username : username, password : password });
        if (user == null && admin == null) {
            return "Username and/or password is incorrect."
        }
        else if (user != null) {
            return [user, false];
        } else if (admin != null) {
            return [admin, true];
        }
    } catch(err) {
        return "Something went wrong in getUserWithCredentials."
    }
}


//4-CHANGE: Checked if the username is equal to admin.
// adds user with credentials
async function addUserWithCredentials(username, password, isAdmin) {
    try {
        const userFound = await User.findOne({ username : username });
        const adminFound = await Administrator.findOne({ username : username });
        if (userFound != null || adminFound != null) {
            return "Username is already claimed.";
        }
        // if username not claimed
        let user = null;
        if (isAdmin) {
            user = new Administrator({
                username: username,
                password: password
            });
        } else {
            user = new User({
                username: username,
                password: password
            });
        }
        await user.save();
        if (isAdmin) {
            return [user, true];
        } else {
            return [user, false];
        }
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

//5-CHANGE: gets all clothing items donated by all users, yet to be picked up
/*
ISSUE: donated_clothes is never used.
- store all the usernames in an array
- find the clothing_id
*/
async function getAllPendingClothingItems() {
    try {
      const pending_clothes = await Clothing.find({ picked_up : false });
      return pending_clothes;
    } catch(err) {
      return "Something went wrong in getAdminPendingClothingItems."
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


// gets all clothing items donated by all users
async function getAllPickedUpClothingItems() {
    try {
      //get all the users
      const picked_up_clothes = await Clothing.find({ picked_up : true });
      return picked_up_clothes;
    } catch(err) {
      return "Something went wrong in getAdminPickedUpClothingItems."
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
}

// adds a clothing item
async function donateClothingItem(clothing_type, condition, size, brand, address, image, donator, title) {
    try {
        // add clothing item
        const clothing_item = new Clothing({
            clothing_type: clothing_type,
            condition: condition,
            size: size,
            brand: brand,
            image: image,
            donator: donator,
            title: title,
            address: address,
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

/* The administrator is the only user when given an id can move an item from donated to pending

 user = db.users.findOne({'nickname': 'user1'})
> user.nickname = 'userX'
> delete user['_id']
> db.users.insert(user)

Logic: remove from donated and add to pending
*/
async function processPendingtoPickedUp(id) {
    try {
        let clothingToMove = await Clothing.findOne({ _id : id});
        clothingToMove.picked_up = true;
        console.log('hi');
        await clothingToMove.save();
        return clothingToMove;
    } catch (err) {
        return "Something went wrong with processPendingtoPickedUp";
    }
}


async function deleteClothingItem(id) {
    try {
        console.log(id);
        const deleted = await Clothing.deleteOne({ _id : id});
        return deleted;
    } catch(err) {
        return "Something went wrong in deleteClothingItem.";
    }
}

module.exports = Object.freeze({
    getUser,
    getAdmin,
    getUserWithCredentials,
    addUserWithCredentials,
    getAllClothingItems,
    getUserDonatedClothingItems,
    getUserPendingClothingItems,
    getUserPickedUpClothingItems,
    getAllPendingClothingItems,
    getAllPickedUpClothingItems,
    donateClothingItem,
    deleteClothingItem,
    processPendingtoPickedUp
});
