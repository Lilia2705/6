const {PHOTOS_CHECK} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];

    if (!req.files && req.files.photo) {
        next()
    }


    const photos = Object.values(req.files);

    for (let i = 0; i < photos.length; i++) {
        const {mimetype, size} = photos[i];

        if (!PHOTOS_CHECK.PHOTO_MIMETYPES.includes(mimetype)){
            next(throw new Error('Not correct file'))
    }

        if (PHOTOS_CHECK.MAX_PHOTO_SIZE < size) {
        next(throw new Error('Not correct file'))
    }

    req.photos.push(photos[i]);

    }

    next()
};