import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import expressAsyncHandler from 'express-async-handler';
import orderRouter from './routes/orderRoutes.js';
import path from 'path';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51LZQUTGYTrEwzPzdraMi6cLEdTgFeAp0v3iwquxqDcX3AREmJp2NUp5k1exG3jha9ZsS7tEgDiZ3fgDdUDMhudDr00aRNpeSZe'
);
import cors from 'cors';
import Order from './models/orderModel.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('COnnected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.post('/checkout', async (req, res) => {
  //console.log('Request:', req.body);

  let error;
  let status;
  try {
    const { token, order } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: order.totalPrice.toFixed(2) * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: 'DOne',
      shipping: {
        name: token.name,
      },
    });
    //console.log('Charge:', { charge });
    status = 'success';
  } catch (error) {
    //console.error('Error:', error);
    status = 'failure';
  }

  res.json({ error, status });
});

app.put(
  '/updatepay',
  expressAsyncHandler(async (req, res) => {
    const { order, d } = req.body;
    const updateorder = await Order.findById(order._id);
    if (updateorder) {
      if (d === 2) {
        updateorder.isDelivered = true;
      } else if (d == 3) {
        updateorder.isPaid = true;
      } else if (d == 4) {
        updatedOrder.isAdmin = true;
      }

      const updatedOrder = await updateorder.save();
      res.send({
        updatedOrder,
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
