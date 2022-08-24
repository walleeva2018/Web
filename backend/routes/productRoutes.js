import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/getemall', async (req, res) => {
  const prodi = await Product.find();
  res.send(prodi);
});
productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.put(
  '/update',
  expressAsyncHandler(async (req, res) => {
    const { id, d } = req.body;
    const updateproduct = await Product.findById(id[d]);
    if (updateproduct) {
      updateproduct.quantity = updateproduct.quantity + 1;

      const updatedProduct = await updateproduct.save();
      res.send({
        updatedProduct,
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default productRouter;
