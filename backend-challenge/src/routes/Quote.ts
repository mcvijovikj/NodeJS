import express from 'express';
import controller from '../controllers/Quote';

const router = express.Router();

router.post('/add', controller.addQuote);
router.get('/quotes', controller.readAllQuotes);
router.get('/quotes/random-quote', controller.readQuote);

export = router;