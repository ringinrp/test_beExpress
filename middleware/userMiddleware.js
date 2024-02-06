const jwt = require('jsonwebtoken');
const {
    User,
    Role
} = require('../models')

exports.authMiddleware = async (req, res, next) => {

    // 1) fungsi jika di header dimasukkan token atau tidak
    let token
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(" ")[1]
    // }

    token = req.cookies.jwt

    if (!token) {
        return next(res.status(401).json({
            status: 401,
            message: "anda belum login / register. Token tidak ditemukan"
        }))
    }

    // console.log(token);
    let decoded
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return next(res.status(401).json({
            error: err,
            message: " token yang dimasukkan tidak ditemukan/tidak ada/ token mismatch"
        }))
    }

    // 3) ambil data user berdasarkan kondisi decoded
    const currentUser = await User.findByPk(decoded.id)
    if (!currentUser) {
        return next(res.status(401).json({
            status: 401,
            message: "user sudah tidak bisa ditemukkan, token tidak bisa digunakan"
        }))
    }
    // console.log(`currentUser : ${currentUser}`);

    req.user = currentUser

    next()
}

exports.permissionUser = (...roles) => {
    return async (req, res, next) => {
        const rolesData = await Role.findByPk(req.user.role_id)
        const role_name = rolesData.name

        if (!roles.includes(role_name)) {
            return next(res.status(403).json({
                status: 403,
                error: "Anda tidak bisa mengakses halaman ini, gunakan akun admin"
            }))
        }

        next()
    }
}