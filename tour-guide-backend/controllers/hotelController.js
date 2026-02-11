const Hotel = require('../models/Hotel');

// Create a new hotel
exports.createHotel = async (req, res) => {
    try {
        const hotelData = { ...req.body };
        
        // Add compressed images if uploaded
        if (req.compressedFiles && req.compressedFiles.length > 0) {
            hotelData.images = req.compressedFiles;
        }
        
        const newHotel = new Hotel(hotelData);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    try {
        const hotelData = { ...req.body };
        
        // Add compressed images if uploaded
        if (req.compressedFiles && req.compressedFiles.length > 0) {
            hotelData.images = req.compressedFiles;
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            hotelData,
            { new: true, runValidators: true }
        );
        if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
