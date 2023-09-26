import express from 'express';
const router = express.Router();


import WalletController  from '../controllers/walletController';


router
.route('/')
.post(WalletController.createWallet)


router
.route('/:userId')
.get(WalletController.getWallet)



// Add the prefix to all routes
const prefix = '/api/v1/wallets';
router.use(prefix, router);

export default router;