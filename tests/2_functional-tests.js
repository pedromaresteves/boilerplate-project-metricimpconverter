const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert a valid input such as 10L: GET request to /api/convert.', function () {
        chai.request(server).get('/api/convert?input=10L').then(res => {
            assert.deepEqual(JSON.parse(res.text),
                { "initNum": 10, "initUnit": "L", "returnNum": 2.64172, "returnUnit": "gal", "string": "10 liters converts to 2.64172 gallons" });
        })
    }),
        test('Convert an invalid input such as 32g: GET request to /api/convert.', function () {
            chai.request(server).get('/api/convert?input=32g').then(res => {
                assert.deepEqual(res.text, "invalid unit");
            })
        }),
        test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', function () {
            chai.request(server).get('/api/convert?input=3/7.2/4kg').then(res => {
                assert.deepEqual(res.text, "invalid number");
            })
        }),
        test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', function () {
            chai.request(server).get('/api/convert?input=3/7.2/4kilomegagram').then(res => {
                assert.deepEqual(res.text, "invalid number and unit");
            });
        }),
        test('Convert with no number such as kg: GET request to /api/convert.', function () {
            chai.request(server).get('/api/convert?input=kg').then(res => {
                assert.deepEqual(JSON.parse(res.text),
                    { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" });
            })
        }),
        test('Edge case: 3.5/2.1.1km', function () {
            chai.request(server).get('/api/convert?input=3.5/2.1.1km').then(res => {
                assert.deepEqual(res.text, "invalid number");
            })
        }),
        test('Edge case: 3.5/2.1.1', function () {
            chai.request(server).get('/api/convert?input=3.5/2.1.1').then(res => {
                assert.deepEqual(res.text, "invalid number and unit");
            })
        })
});
