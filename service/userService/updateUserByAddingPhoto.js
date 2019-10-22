const db = require('../../dataBase').getInstance();

module.exports = (paramsObject, findObject) => {
    const UserModel = db.getModel('user');

    UserModel.update(paramsObject, {
        where: findObject
    })
}