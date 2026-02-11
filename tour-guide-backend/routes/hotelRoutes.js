const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const auth = require('../middleware/authMiddleware');
const { upload, compressImage } = require('../middleware/upload');

// Public routes
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);

// Protected routes - with image upload support
router.post('/', upload.array('images', 10), compressImage, hotelController.createHotel);
router.put('/:id', upload.array('images', 10), compressImage, hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
