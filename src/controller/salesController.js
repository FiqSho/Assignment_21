const sales = require('../model/salesModel');

// Calculate total revenue
const calculateTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await sales.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]);
    res.json({ totalRevenue: totalRevenue[0].totalRevenue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get total quantity sold for each product
const getQuantityByProduct = async (req, res) => {
  try {
    const quantityByProduct = await sales.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]);
    res.json(quantityByProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get top 5 products with the highest total revenue
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await sales.aggregate([
      {
        $group: {
          _id: '$product',
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
    ]);
    res.json(topProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Calculate the average price of products sold
const calculateAveragePrice = async (req, res) => {
  try {
    const averagePrice = await sales.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price' },
        },
      },
    ]);
    res.json({ averagePrice: averagePrice[0].averagePrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Calculate total revenue by month
const calculateRevenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
    ]);
    res.json(revenueByMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Find the product with the highest quantity sold on a single day
const findHighestQuantitySold = async (req, res) => {
  try {
    const highestQuantitySold = await sales.aggregate([
      {
        $group: {
          _id: '$date',
          maxQuantity: { $max: '$quantity' },
        },
      },
      { $sort: { maxQuantity: -1 } },
      { $limit: 1 },
    ]);
    res.json(highestQuantitySold);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Calculate total salary expense for each department
const calculateDepartmentSalaryExpense = async (req, res) => {
  try {
    const departmentSalaryExpense = await sales.aggregate([
      {
        $group: {
          _id: '$department',
          totalSalaryExpense: { $sum: '$salary' },
        },
      },
    ]);
    res.json(departmentSalaryExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  calculateTotalRevenue,
  getQuantityByProduct,
  getTopProducts,
  calculateAveragePrice,
  calculateRevenueByMonth,
  findHighestQuantitySold,
  calculateDepartmentSalaryExpense,
  
};
