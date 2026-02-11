const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Multer storage in memory to process with Sharp
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

const compressImage = async (req, res, next) => {
    // Handle both single and multiple files
    const files = req.files || (req.file ? [req.file] : []);
    
    if (files.length === 0) return next();

    try {
        const compressedFiles = [];

        for (const file of files) {
            const fileName = `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
            const outputPath = path.join(__dirname, '../public/uploads', fileName);

            await sharp(file.buffer)
                .webp({ quality: 80 })
                .resize(1200, null, { withoutEnlargement: true })
                .toFile(outputPath);

            compressedFiles.push(`/uploads/${fileName}`);
        }

        // Store compressed file URLs for controller access
        req.compressedFiles = compressedFiles;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    upload,
    compressImage
};
