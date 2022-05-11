import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'RAFI',
      email: 'walleeva2018@gmail.com',
      password: bcrypt.hashSync('12345'),
      isAdmin: true,
    },
    {
      name: 'Sony',
      email: 'shahria@gmail.com',
      password: bcrypt.hashSync('1234'),
      isAdmin: false,
    },
  ],

  products: [
    {
      // _id: '1',
      name: 'Blue Shirt',
      slug: 'blue-shirt',
      category: 'Shirts',
      price: '250',
      image: '/Images/blue.jpg',
      rating: '4.5',
      reviews: '20',
      quantity: '10',
    },
    {
      // _id: '2',
      name: 'Stripe Shirt',
      slug: 'stripe-shirt',
      category: 'Shirts',
      price: '300',
      image: '/Images/stripe.png',
      rating: '3.5',
      reviews: '25',
      quantity: '2',
    },
    {
      // _id: '3',
      name: 'Solid Shirt',
      slug: 'solid-shirt',
      category: 'Shirts',
      price: '280',
      image: '/Images/solid.png',
      rating: '4',
      reviews: '21',
      quantity: '1',
    },
  ],
};

export default data;
