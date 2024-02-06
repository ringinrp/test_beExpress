const express = require('express');
const {
    getAllDepartments,
    storeDepartment,
    detailDepartment,
    updateDepartment,
    destroyDepartment
} = require('../controllers/departmentController');
const router = express.Router();
const {
    authMiddleware,
    permissionUser
} = require('../middleware/userMiddleware');
//find All data
router.get('/', authMiddleware, permissionUser("admin", "user"),getAllDepartments);

//detail data
router.get('/:id', authMiddleware, permissionUser("admin", "user"),detailDepartment)

//create data
router.post('/', authMiddleware, permissionUser("admin", "user"), storeDepartment);

//update data
router.put('/:id', authMiddleware, permissionUser("admin", "user"),updateDepartment);

//delete data
router.delete('/:id', authMiddleware, permissionUser("admin"), destroyDepartment)

module.exports = router