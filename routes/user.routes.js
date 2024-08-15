const { Router } = require('express');
const handleValidationErrors = require('../middlewares/validator_routes');
// Controller
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  uploadProfileImage,
} = require('../controllers/user.controller');




const userValidations = require('../middlewares/user_validator_routes');
const router = Router();

router.post('/', userValidations.createUser, handleValidationErrors, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/login', userValidations.loginUser, handleValidationErrors, loginUser);
router.post('/upload-profile-image/:id', userValidations.uploadProfileImage, handleValidationErrors, uploadProfileImage);

module.exports = router;
