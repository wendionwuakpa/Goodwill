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
 * Get all clothing items donated by specified user that is pending pickup
 * 
 * @id GET /api/clothing/donated/:username?
 * 
 * @param   {String} - username of user
 * @returns {[ClothingItem]} - all donated clothing items by user
 * @throws  {500} - if error in controller call
 */
router.get('/pending/:username?', [], async (req, res) => {
    // GET has req.params
    let username = req.params.username;
    const clothing = await controller.getUserPendingClothingItems(username);
    let status = 200; // status code for ok
    if (typeof clothing == "string") {
        status = 500; // status code for internal server error
    }
    res.status(status).json(clothing).end(); 
  })

  /**
 * Get all clothing items donated by specified user that has been picked-up
 * 
 * @id GET /api/clothing/donated/:username?
 * 
 * @param   {String} - username of user
 * @returns {[ClothingItem]} - all donated clothing items by user
 * @throws  {500} - if error in controller call
 */
router.get('/pickedup/:username?', [], async (req, res) => {
    // GET has req.params
    let username = req.params.username;
    const clothing = await controller.getUserPickedUpClothingItems(username);
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
  let condition = req.body.condition;
  let size = req.body.size;
  let brand = req.body.brand;
  let image = req.body.image;
  let donator = req.body.donator;
  let title = req.body.title;
  const clothing_item = await controller.donateClothingItem(clothing_type, condition, size, brand, image, donator, title);
  let status = 200; // status code for ok
  if (typeof clothing_item == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing_item).end(); 
})

module.exports = router;