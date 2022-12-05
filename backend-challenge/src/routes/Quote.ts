import express from 'express';
import controller from '../controllers/Quote';

const router = express.Router();

router.post('/add', controller.addQuotes);
router.get('/quotes', controller.getQuotes);
router.get('/quotes/random-quote', controller.getOneQuote);

export = router;