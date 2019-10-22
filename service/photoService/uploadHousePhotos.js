const db = require('../../database').getInstance();

module.exports = async (path) => {
    const housePhotoModel = db.getModel('house_to_photo');

    await housePhotoModel.create(path);
};