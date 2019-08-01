                      _.--.
                  _.-'_:-'||
              _.-'_.-::::'||
         _.-:'_.-::::::'  ||
       .'`-.-:::::::'     ||
      /.'`;|:::::::'      ||_
     ||   ||::::::'     _.;._'-._
     ||   ||:::::'  _.-!oo @.!-._'-.
     \'.  ||:::::.-!()oo @!()@.-'_.|
      '.'-;|:.-'.&$@.& ()$%-'o.'\U||
        `>'-.!@%()@'@_%-'_.-o _.|'||
         ||-._'-.@.-'_.-' _.-o  |'||
         ||=[ '-._.-\U/.-'    o |'||
         || '-.]=|| |'|      o  |'||
         ||      || |'|        _| ';
         ||      || |'|    _.-'_.-'
         |'-._   || |'|_.-'_.-'
         '-._'--.|| |' `_.-'
              '-.||_/.-'

## XCoin Exchange Challenge

XCoin is the future of currency, but more importantly, people really want to
speculate on the value of their XCoins in US Dollars.

Rumor has it, XCoin is going to the moon!

To capitalize on this frenzy, you are tasked with **creating an electronic
exchange where people can post buy or sell orders through a Node API**.


### How Exchanges Match Orders

A short overview about how an exchange might work to match buy and sell orders.
You don't have to follow this method exactly if you prefer to implement the
exchange another way.

An exchange maintains two sorted lists of orders:

1. A **buy list** ordered highest-to-lowest price. It contains orders people are willing
to buy at a given price and quantity.

2. A **sell list** ordered lowest-to-highest price. It contains orders people are willing
to sell at a given price and quantity.

### Example

    BUY
    ====

    100 MOC at $10.00   USD/MOC
     50 MOC at $ 9.50   USD/MOC
     20 MOC at $ 8.99   USD/MOC

    SELL
    ====

     10 MOC at $11.00   USD/MOC
    500 MOC at $12.50   USD/MOC
    200 MOC at $13.49   USD/MOC

In the above exchange, there is nobody willing to buy at the lowest selling
price ($11.00), nor is there anyone willing to sell at highest buying
price ($10.00), thus no transaction can take place.

If a new order comes in at say, BUY 20 MOC at $11.50 USD, then there is a buyer
willing to pay what some seller is selling for ($11.00 USD/MOC). Thus, a
transaction happens.

So, we match this buy order up with the first order in the sell list. We can
transact 10 MOC at the price $11.00 per MOC.

However, there is still a buy order for 10 MOC unfilled at the price
of $11.50, because we cannot fill it at the next highest SELL price ($12.50).
Therefore, the remaining BUY order goes at the top of the BUY list.

The exchange now looks like this:

    BUY
    ====

     10 MOC at $11.50   USD/MOC
    100 MOC at $10.00   USD/MOC
     50 MOC at $ 9.50   USD/MOC
     20 MOC at $ 8.99   USD/MOC

    SELL
    ====

    500 MOC at $12.50   USD/MOC
    200 MOC at $13.49   USD/MOC

If an order comes in that satisfies no current SELL or BUY price, it is
placed in the SELL or BUY lists at the appropriate point.

When a transaction is completed, we store the result in a log so we can
reconcile it later with people's account balances.


### Suggested Order to Approach

We're providing you with a stub implementation in `exchange.js`.

There are a few functions to start you off. Each of these take the following
arguments:

- origin: the user that placed the order.
- price: the price per Xcoin.
- quantity: the number of Xcoins to transact.

Please implement the necessary functionality in the `Exchange` stub object.
A stub test suite is also included and can by run using `node exchange.js`.

Feel free to extend or change the `Exchange` object or modify the test
suite. Use whatever libraries you need to make it work. You can use sorted
lists or any other data structure that you want. You can extend the existing
tests or add new ones using your preferred test library.

Good luck!


### What we'd like to see in your solution:

- At least some of the functionality implemented and working
- Tests for that functionality
- Be prepared to explain your choices and compromises
- We'd rather see something that works than something that's perfect
- We'll ask you to provide us with a copy of your code at the end
