const fs = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();

const {housesService, photoService} = require('../../service');

module.exports = async (req, res) => {
    try {
        const houseToCreate = req.body;
        const user_id = req.user;

        const photos = req.photos;
        const appRoot = global.appRoot;

        const {id} = await housesService.create(houseToCreate, user_id);
        const photoDir = `house/${id}/photo`;

        await fs.mkdirSync(resolve(appRoot, 'public', photoDir), {recursive: true});

        for (let i = 0; i < photos.length; i++) {
            const photoExtension = photos[i].name.split('.').pop();
            const photoName = `${uuid}.${photoExtension}`;

            await photos[i].mv(resolve(appRoot, 'public', photoDir, photoName));

            await photoService.uploadHousePhotos({house_id: id, photo_path: `${photoDir}/${photoName}`});
        }

        res.json('House was created');
    }
    catch (e) {
        res.json(e.message);
    }
};