const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { upload, compressImage } = require('../middleware/upload');

// Package Routes - with image upload support for create
router.post('/', upload.array('gallery', 20), compressImage, packageController.createPackage);
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.put('/:id', upload.array('gallery', 20), compressImage, packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;
