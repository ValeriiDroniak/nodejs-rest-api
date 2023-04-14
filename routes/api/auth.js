const express = require('express');

const { auth, upload, validation } = require('../../middlewares');
const { joiRegisterSchema, joiLoginSchema, joiSubscriptionSchema, joiEmailSchema } = require('../../models/user');
const { ctrlWrap } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrap(ctrl.getCurrent))

router.post('/register', validation({ schema: joiRegisterSchema }), ctrlWrap(ctrl.register))

router.post('/login', validation({ schema: joiLoginSchema }), ctrlWrap(ctrl.login))

router.post('/logout', auth, ctrlWrap(ctrl.logout))

router.patch('/', auth, validation({ schema: joiSubscriptionSchema }), ctrlWrap(ctrl.updateSubscriptionById))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrap(ctrl.updateAvatarById))

router.get('/verify/:verificationToken', ctrlWrap(ctrl.verifyUserEmail))

router.post('/verify', validation({ schema: joiEmailSchema, message: 'missing required field email' }), ctrlWrap(ctrl.resendEmail))

module.exports = router;