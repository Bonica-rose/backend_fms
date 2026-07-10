const express = require('express')
const router = express.Router()

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController')

const { getProfile, updateProfile } = require('../controllers/profileController')

const authCheck = require('../middlewares/authCheck')
const roleCheck = require('../middlewares/roleCheck')
const validateUser = require('../middlewares/validateUser')

router.get('/', authCheck, roleCheck("admin"), getAllUsers)
router.post('/', validateUser, createUser)

router.get('/profile', authCheck, getProfile)
router.put('/profile', authCheck, updateProfile)


router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router