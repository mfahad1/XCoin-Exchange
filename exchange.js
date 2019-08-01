/*
Implement the `Exchange` stub found below. You can run the
included test suite with `node exchange.js`.

Feel free to extend or change the `Exchange` class methods or modify
the test suite.

Use whatever libraries you need to make it work.

Good luck!

*/

var assert = require('assert');


/**
 * A JSDoc-style type definition for an Order
 *
 * @typedef {Object} Order
 * @property {String} origin
 * @property {Number} price
 * @property {Number} quantity
 *
 * Example:
 *  {origin: 'Alice', price: 9.99, quantity: 100}
 */


/**
 * A JSDoc-style type definition for a Transaction
 *
 * @typedef {Object} Transaction
 * @property {string} buyer
 * @property {string} seller
 * @property {Number} price
 * @property {Number} quantity
 *
 * Example:
 *  {seller: 'Alice', buyer: 'bob', price: 9.99, quantity: 100}
 */



/**
 * Initializes the exchange
 */
var Exchange = function() {
    this.buys = []
    this.sells = []
    this.transactions = []
};


/**
 * Return all unfulfilled buy orders.
 *
 * @return {Array<Order>}
 */
Exchange.prototype.getBuyOrders = function() {
    return this.buys;
};


/**
 * Return all unfulfilled sell orders.
 *
 * @return {Array<Order>}
 */
Exchange.prototype.getSellOrders = function() {
    return this.sells;
};


/**
 * Return all transactions that have been processed.
 *
 * @return {Array<Transaction>}
 */
Exchange.prototype.getTransactions = function() {
    return this.transactions;
};


/**
 * Add a transaction.
 * @param {Object} TransactionExtractor
 * @typedef {Object} TransactionExtractor
 * @property {Order} buy
 * @property {Order} sell
 * @property {Number} quantity
 */

Exchange.prototype.addTransaction = function (buy, sell, quantity) {
    this.transactions.push({
        seller: sell.origin,
        buyer: buy.origin,
        price: sell.price,
        quantity: quantity
    })
}

/**
 * Place a BUY order and transact if possible
 *
 * @param {Order} buyOrder
 */
Exchange.prototype.buy = function(buyOrder) {
    // TODO
    if (this.sells.length < 1) {
        this.buys = insertInSortedArray(this.buys, buyOrder, false);
    } else {
        this.sells = sellOrBuyAlgorithmToTrackTransactionsANDRecord.call(this, this.sells, buyOrder, false);
    }
};






/**
 * Place a SELL order and transact if possible
 *
 * @param {Order} sellOrder
 */
Exchange.prototype.sell = function(sellOrder) {
    // TODO

    if (this.buys.length < 1) {
        this.sells = insertInSortedArray(this.sells, sellOrder, true);
    } else {
        this.buys = sellOrBuyAlgorithmToTrackTransactionsANDRecord.call(this, this.buys, sellOrder, true);
    }

};


/**
 * Helper Algorithm to decide what to put in sells array and buys array respectively
 * and record the transactions
 *
 * @param {Array<Order>} sellOrder
 * @param {Order} order
 * @param {Boolean} isSell
 * 
 * @return {Array<Order>} orderCollection
 */

function sellOrBuyAlgorithmToTrackTransactionsANDRecord (orderCollection, order, isSell) {
    let conditionCheck = false,
        sell,buy;
    if (isSell) {
        conditionCheck = order.price <= orderCollection[0].price;
        buy = orderCollection[0];
        sell = order;
    } else {
        conditionCheck = order.price >= orderCollection[0].price;
        buy = order;
        sell = orderCollection[0];
    }
    if(conditionCheck) {
        if (order.quantity > orderCollection[0].quantity) {
            this.addTransaction(buy, sell, orderCollection[0].quantity);
            order.quantity = order.quantity - orderCollection[0].quantity;
            orderCollection.shift();
            return sellOrBuyAlgorithmToTrackTransactionsANDRecord.call(this, orderCollection, order);
        }
        if (order.quantity < orderCollection[0].quantity){
            this.addTransaction(buy, sell, order.quantity);
            orderCollection[0].quantity = orderCollection[0].quantity - order.quantity;
            return orderCollection;
        }
        if (order.quantity === orderCollection[0].quantity) {
            this.addTransaction(buy, sell, order.quantity);
            orderCollection.shift();
            return orderCollection;
        }
    } else {
        if (isSell) this.sells = insertInSortedArray(this.sells, order, true);
        else this.buys = insertInSortedArray(this.buys, order, false);
        return orderCollection;
    }
}

/**
 * Helper Algorithm push elements in ascending or descending order
 *
 * @param {Array<Order>} collection
 * @param {Order} toBeInsertedValue
 * @param {Boolean} isAscending
 * 
 * @return {Array<Order>} collection
 */

const insertInSortedArray = (collection, toBeInsertedValue, isAscending) => {
    if (collection.length === 0) return [toBeInsertedValue];
    let didPush = false;
    for (var i = 0, len = collection.length; i < len ; i++) {
        if (isAscending ? toBeInsertedValue.price < collection[i].price : toBeInsertedValue.price > collection[i].price) {
            collection.splice(i, 0, toBeInsertedValue);
            didPush = true;
            break;
        }
    }
    if (!didPush) collection.push(toBeInsertedValue);
    return collection;
}


function testBuyListSorting() {
    var exchange = new Exchange();

    exchange.buy({origin: 'Alice', price: 1.00, quantity: 10})
    exchange.buy({origin: 'Bob', price: 5.00, quantity: 10})
    exchange.buy({origin: 'Charlie', price: 0.50, quantity: 10})

    assert.deepStrictEqual(exchange.getBuyOrders(), [
        {origin: 'Bob', price: 5.00, quantity: 10},
        {origin: 'Alice', price: 1.00, quantity: 10},
        {origin: 'Charlie', price: 0.50, quantity: 10}
    ])
}


function testSellListSorting() {
    var exchange = new Exchange();

    exchange.sell({origin: 'Alice', price: 1.00, quantity: 10})
    exchange.sell({origin: 'Bob', price: 5.00, quantity: 10})
    exchange.sell({origin: 'Charlie', price: 0.50, quantity: 10})

    assert.deepStrictEqual(exchange.getSellOrders(), [
        {origin: 'Charlie', price: 0.50, quantity: 10},
        {origin: 'Alice', price: 1.00, quantity: 10},
        {origin: 'Bob', price: 5.00, quantity: 10}
    ])
}


function testSimpleTransaction() {
    var exchange = new Exchange();

    exchange.sell({origin: 'Alice', price: 1.00, quantity: 10})
    exchange.buy({origin: 'Bob', price: 1.00, quantity: 10})

    assert.deepStrictEqual(exchange.getSellOrders(), [])

    assert.deepStrictEqual(exchange.getBuyOrders(), [])

    assert.deepStrictEqual(exchange.getTransactions(), [
        {seller: 'Alice', buyer: 'Bob', price: 1.00, quantity: 10}
    ])
}


function testPartialTransaction() {
    var exchange = new Exchange();

    exchange.sell({origin: 'Alice', price: 1.00, quantity: 20})
    exchange.buy({origin: 'Bob', price: 1.00, quantity: 10})

    assert.deepStrictEqual(exchange.getSellOrders(), [
        {origin: 'Alice', price: 1.00, quantity: 10}
    ])

    assert.deepStrictEqual(exchange.getBuyOrders(), [])

    assert.deepStrictEqual(exchange.getTransactions(), [
        {seller: 'Alice', buyer: 'Bob', price: 1.00, quantity: 10}
    ])
}


function testTransactionThatCanSellMoreThenOneTransaction() {
    var exchange = new Exchange();

    exchange.sell({origin: 'Alice', price: 11.00, quantity: 10})
    exchange.sell({origin: 'White Rabbit', price: 12.50, quantity: 10})
    exchange.sell({origin: 'Caterpiller', price: 13.00, quantity: 10})
    exchange.sell({origin: 'The Mad Hatter', price: 15.00, quantity: 20})
    exchange.sell({origin: 'Queen of Hearts', price: 16.00, quantity: 20})
    
    exchange.buy({origin: 'March Hare', price: 11.50, quantity: 20})
    exchange.buy({origin: 'King of Hearts', price: 14.00, quantity: 30})


    assert.deepStrictEqual(exchange.getSellOrders(), [
        {origin: 'The Mad Hatter', price: 15.00, quantity: 20},
        {origin: 'Queen of Hearts', price: 16.00, quantity: 20}
    ])

    assert.deepStrictEqual(exchange.getBuyOrders(), [
        {origin: 'King of Hearts', price: 14.00, quantity: 10},
        {origin: 'March Hare', price: 11.50, quantity: 10},
    ])
}

var tests = [
    testBuyListSorting,
    testSellListSorting,
    testSimpleTransaction,
    testPartialTransaction,
    testTransactionThatCanSellMoreThenOneTransaction
]

function test() {
    tests.forEach(function(test) {
        console.log('>>> ' + test.name)
        try {
            test()
            console.log('OK');
        } catch (e) {
            console.log(e.toString());
            console.log('Fail');
        }
        console.log('')
    })
};

test();
