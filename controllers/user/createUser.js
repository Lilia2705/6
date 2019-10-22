const fs = require('fs-extra');
const uuid = require('uuid').v1();
const {resolve} = require('path');

const {userService, emailService, photoService} = require('../../service');

module.exports = async (req, res) => {
    try {
        const userToCreate = req.body;

        const [photo] = req.photos;
        const appRoot = global.appRoot;

        const id = await userService.create(userToCreate);
        const photoDir = `user/${id}/photo`;
        const photoExtension = photo.name.split('.').pop();
        const photoName = `${uuid}.${photoExtension}`;

        await fs.mkdirSync(resolve(appRoot, 'public', photoDir), {recursive: true});

        await photo.mv(resolve(appRoot, 'public', photoDir, photoName));

        await userService.updateUser({photo_path: `${photoDir}/${photoName}`}, id);

        await emailService.emailService(userToCreate.email);

        res.json('User is created')
    }
    catch (e) {
        res.json(e.message);
    }
};