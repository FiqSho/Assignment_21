const express = require('express');
const router = express.Router();
const {
    calculateTotalRevenue,
    getQuantityByProduct,
    getTopProducts,
    calculateAveragePrice,
    calculateRevenueByMonth,
    findHighestQuantitySold,
    calculateDepartmentSalaryExpense,
    
} = require('../controller/salesController');


// GET /api/v1/total-revenue
router.get('/total-revenue', calculateTotalRevenue);

// GET /api/v1/quantity-by-product
router.get('/quantity-by-product', getQuantityByProduct);

// GET /api/v1/top-products
router.get('/top-products', getTopProducts);

// GET /api/v1/average-price
router.get('/average-price', calculateAveragePrice);

// GET /api/v1/revenue-by-month
router.get('/revenue-by-month', calculateRevenueByMonth);

// GET /api/v1/highest-quantity-sold
router.get('/highest-quantity-sold', findHighestQuantitySold);

// GET /api/v1/department-salary-expense
router.get('/department-salary-expense', calculateDepartmentSalaryExpense);


module.exports = router;
