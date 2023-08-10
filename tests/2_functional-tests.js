const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert invalid number returns invalid number', function () {
        const inputNumber = convertHandler.getNum('25..');
        const inputUnit = convertHandler.getUnit('mi');
        const result = convertHandler.convert(inputNumber, inputUnit);
        assert.equal(result, 'invalid number', `If number is invalid and unit valid. It returns invalid number`)
    });
    test('Convert invalid unit returns invalid unit', function () {
        const inputNumber = convertHandler.getNum('25');
        const inputUnit = convertHandler.getUnit('mis');
        const result = convertHandler.convert(inputNumber, inputUnit);
        assert.equal(result, 'invalid unit', `If unit is invalid and number valid. It returns invalid unit`)
    });
    test('Convert invalid number and unit returns invalid number and unit', function () {
        const inputNumber = convertHandler.getNum('25...');
        const inputUnit = convertHandler.getUnit('mis');
        const result = convertHandler.convert(inputNumber, inputUnit);
        assert.equal(result, 'invalid number and unit', `If unit and number are invalid. It returns invalid number and unit`)
    });
});
