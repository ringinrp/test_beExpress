const {
    Department
} = require('../models');
const department = require('../models/department');
const asyncHandler = require('../middleware/asyncHandle');

exports.getAllDepartments = async (req, res) => {
    try {
        const Departments = await Department.findAll();

        return res.status(200).json({
            status: "Success",
            data: Departments
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        })
    }
}

exports.detailDepartment = async (req, res) => {
    try {
        const id = req.params.id
        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                status: "Fail",
                error: "Data id tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: department
        })

    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        })
    }
}

exports.storeDepartment = async (req, res) => {
    try {
        let {
            name,
            description
        } = req.body;

        const newDepartment = await Department.create({
            name,
            description
        });

        return res.status(201).json({
            status: "Success",
            data: newDepartment
        })

    } catch (error) {
        return res.status(400).json({
            status: "Fail",
            error: error
        })
    }
}

exports.updateDepartment = asyncHandler(async (req, res) => {
    const id = req.params.id
    await Department.update(req.body, {
        where: {
            id: id
        }
    });
    const newDepartment = await Department.findByPk(id);

    if (!newDepartment) {
        res.status(404);
        throw new Error("Department tidak ditemukan")
    }


    return res.status(200).json({
        status: "Success",
        data: newDepartment
    })
})

exports.destroyDepartment = async (req, res) => {
    const id = req.params.id
    const idDepartment = await Department.findByPk(id)

    if (!idDepartment) {
        return res.status(404).json({
            status: "Fail",
            error: "Id tidak ditemukan"
        })
    }

    await Department.destroy({
        where: {
            id
        }
    });

    return res.status(200).json({
        status: "Success",
        message: `Department dengan id ${id} berhasil dihapus`
    })
}