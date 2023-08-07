const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        const wholeNumberInput = '5mi';
        const result = convertHandler.getNum(wholeNumberInput);
        assert.equal(result, 5, 'Result is equal to 5')
    });
    test('convertHandler should correctly read a decimal number input', function () {
        const decimalNumberInput = '5.5mi';
        const result = convertHandler.getNum(decimalNumberInput);
        assert.equal(result, 5.5, 'Result is equal to 5.5')
    });
    test('convertHandler should correctly read a fractional input', function () {
        const fractionalNumberInput = '3/5mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 0.6, 'Result is equal to 0.6')
    });
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        const fractionalNumberInput = '3.5/5mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 0.7, 'Result is equal to 0.7')
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        const fractionalNumberInput = '3/2/3';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result.error, true, 'Result is an error')
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        const fractionalNumberInput = 'mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 1, 'Result is 1')
    });
    test('convertHandler should correctly read each valid input unit', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
        units.forEach((item, i) => {
            assert.equal(convertHandler.getUnit(item), units[i], 'Result is 1')
        });
    });
    test('convertHandler should correctly converts all units', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
        const returnUnits = ['km', 'mi', 'kg', 'lbs', 'l', 'gal'];
        units.forEach((item, i) => {
            const result = convertHandler.getReturnUnit(item);
            assert.equal(result, returnUnits[i], `${item} converts to ${returnUnits[i]}`)
        });
        returnUnits.forEach((item, i) => {
            const result = convertHandler.getReturnUnit(item);
            assert.equal(result, units[i], `${item} converts to ${units[i]}`)
        });
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
        const spelledOutUnits = ['miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters']
        units.forEach((item, i) => {
            assert.equal(convertHandler.spellOutUnit(item), spelledOutUnits[i], `Result is ${spelledOutUnits[i]}`)
        });
    });
});