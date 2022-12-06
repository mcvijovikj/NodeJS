import express from 'express';
import controller from '../controllers/Quote';

const router = express.Router();


router.get('/quotes', controller.getStoredData);
router.get('/', controller.getQuotes);
router.get('/quotes/random-quote', controller.getOneQuote);


export = router;