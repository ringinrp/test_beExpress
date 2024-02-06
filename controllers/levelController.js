const {
    Level
} = require('../models');
const level = require('../models/level');
const asyncHandler = require('../middleware/asyncHandle');

exports.getAllLevels = async (req, res) => {
    try {
        const Levels = await Level.findAll();

        return res.status(200).json({
            status: "Success",
            data: Levels
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        })
    }
}

exports.detailLevel = async (req, res) => {
    try {
        const id = req.params.id
        const level = await Level.findByPk(id);

        if (!level) {
            return res.status(404).json({
                status: "Fail",
                error: "Data id tidak ditemukan"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: level
        })

    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        })
    }
}

exports.storeLevel = async (req, res) => {
    try {
        let {
            name,
            description
        } = req.body;

        const newLevel = await Level.create({
            name,
            description
        });

        return res.status(201).json({
            status: "Success",
            data: newLevel
        })

    } catch (error) {
        return res.status(400).json({
            status: "Fail",
            error: error
        })
    }
}

exports.updateLevel = asyncHandler(async (req, res) => {
    const id = req.params.id
    await Level.update(req.body, {
        where: {
            id: id
        }
    });
    const newLevel = await Level.findByPk(id);

    if (!newLevel) {
        res.status(404);
        throw new Error("Level tidak ditemukan")
    }


    return res.status(200).json({
        status: "Success",
        data: newLevel
    })
})

exports.destroyLevel = async (req, res) => {
    const id = req.params.id
    const idLevel = await Level.findByPk(id)

    if (!idLevel) {
        return res.status(404).json({
            status: "Fail",
            error: "Id tidak ditemukan"
        })
    }

    await Level.destroy({
        where: {
            id
        }
    });

    return res.status(200).json({
        status: "Success",
        message: `Data dengan id ${id} berhasil dihapus`
    })
}