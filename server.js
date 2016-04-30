var amqp = require('amqp')
    , util = require('util')

var logInSignup = require('./services/logInSignup');
var users = require('./services/users');
var admin = require('./services/admin');
var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
    console.log("listening on login__signup_queue");
    // Gaurav  enter heree
    cnn.queue('loginSignupQueue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            if (message.functionToBeImplemented == "signup")
            {
                logInSignup.handle_request(message, function (err, res) {

                    //return index sent
                    cnn.publish(m.replyTo, res, {
                        contentType: 'application/json',
                        contentEncoding: 'utf-8',
                        correlationId: m.correlationId
                    });

                });
            }
        });
    });

    console.log("listening on doSearchAdminQueue");
    cnn.queue('doSearchAdminQueue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            // Chirag
                admin.doSearchAdmin(message, function (err, res) {

                    //return index sent
                    cnn.publish(m.replyTo, res, {
                        contentType: 'application/json',
                        contentEncoding: 'utf-8',
                        correlationId: m.correlationId
                    });

                });
        });
    });

    cnn.queue('usersQueue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            if (message.functionToBeImplemented == "getCustomerAccountDetails")
            {
                users.handle_request(message, function (err, res) {

                    //return index sent
                    cnn.publish(m.replyTo, res, {
                        contentType: 'application/json',
                        contentEncoding: 'utf-8',
                        correlationId: m.correlationId
                    });

                });
            }

            // Aneri

            else if (message.functionToBeImplemented == "fetchPurchaseHistory")
            {
                users.handle_request1(message, function (err, res) {

                    //return index sent
                    cnn.publish(m.replyTo, res, {
                        contentType: 'application/json',
                        contentEncoding: 'utf-8',
                        correlationId: m.correlationId
                    });

                });
            }

        });
    });
});
