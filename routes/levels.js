const express = require('express');
const {
    getAllLevels,
    storeLevel,
    detailLevel,
    updateLevel,
    destroyLevel
} = require('../controllers/levelController.js');
const router = express.Router();
const {
    authMiddleware,
    permissionUser
} = require('../middleware/userMiddleware');
//find All data
router.get('/', getAllLevels);

//detail data
router.get('/:id', detailLevel)

//create data
router.post('/', authMiddleware, permissionUser("admin", "user"), storeLevel);

//update data
router.put('/:id', authMiddleware, permissionUser("admin", "user"),updateLevel);

//delete data
router.delete('/:id', authMiddleware, permissionUser("admin"), destroyLevel)

module.exports = router