const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const balanceController = require('../controllers/balance-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/addBalance', balanceController.addBalance);
router.post('/convertCurrency', balanceController.convertCurrency);
router.get('/getBalance', balanceController.getBalance);
router.get('/getTransactions', balanceController.getTransactions);

module.exports = router
