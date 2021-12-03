const express = require('express');
const controller = require('./controller');
const router = express.Router();


/**
 * Get all clothing items
 * 
 * @id GET /api/clothing
 * 
 * @returns {[ClothingItem]} - all clothing items
 * @throws  {500} - if error in controller call
 */
router.get('/', [], async (req, res) => {
    const clothing = await controller.getAllClothingItems();
    let status = 200; // status code for ok
    if (typeof clothing == "string") {
        status = 500; // status code for internal server error
    }
    res.status(status).json(clothing).end(); 
})


/**
 * Get all unclaimed clothing items
 * 
 * @id GET /api/clothing/unclaimed
 * 
 * @returns {[ClothingItem]} - all unclaimed clothing items
 * @throws  {500} - if error in controller call
 */
router.get('/unclaimed', [], async (req, res) => {
  const clothing = await controller.getAllUnclaimedClothingItems();
  let status = 200; // status code for ok
  if (typeof clothing == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing).end(); 
})


/**
 * Get all clothing items claimed by specified user
 * 
 * @id GET /api/clothing/claimed/:username?
 * 
 * @param   {String} - username of user
 * @returns {[ClothingItem]} - all claimed clothing items by user
 * @throws  {500} - if error in controller call
 */
router.get('/claimed/:username?', [], async (req, res) => {
  // GET has req.params
  let username = req.params.username;
  const clothing = await controller.getUserClaimedClothingItems(username);
  let status = 200; // status code for ok
  if (typeof clothing == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing).end(); 
})


/**
 * Get all clothing items donated by specified user
 * 
 * @id GET /api/clothing/donated/:username?
 * 
 * @param   {String} - username of user
 * @returns {[ClothingItem]} - all donated clothing items by user
 * @throws  {500} - if error in controller call
 */
router.get('/donated/:username?', [], async (req, res) => {
  // GET has req.params
  let username = req.params.username;
  const clothing = await controller.getUserDonatedClothingItems(username);
  let status = 200; // status code for ok
  if (typeof clothing == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing).end(); 
})


/**
 * Add new clothing item
 * 
 * @id POST /api/clothing
 * 
 * @param   {String} - type of clothing in schema enum
 * @param   {String} - url to clothing image
 * @param   {String} - username of donator
 * @param   {String} - title of donation
 * @returns {ClothingItem} - newly added clothing item
 * @throws  {500} - if error in controller call
 */
router.post('/', [], async (req, res) => {
  // POST has req.body
  let clothing_type = req.body.clothing_type;
  let image = req.body.image;
  let donator = req.body.donator;
  let title = req.body.title;
  const clothing_item = await controller.donateClothingItem(clothing_type, image, donator, title);
  let status = 200; // status code for ok
  if (typeof clothing_item == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing_item).end(); 
})


/**
 * Claim a clothing item
 * 
 * @id PUT /api/clothing/claim
 * 
 * @param   {String} - username of claimer
 * @param   {Schema.Type.ObjectId} - Object ID of clothing item
 * @returns {ClothingItem} - newly added clothing item
 * @throws  {500} - if error in controller call
 */
 router.post('/claim', [], async (req, res) => {
  // PUT has req.body
  let username = req.body.username;
  let id = req.body.id;
  const clothing_item = await controller.claimClothingItem(username, id);
  let status = 200; // status code for ok
  if (typeof clothing_item == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing_item).end(); 
})

module.exports = router;