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
        assert.equal(result, 'invalid number', 'Result is an error')
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        const fractionalNumberInput = 'mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 1, 'Result is 1')
    });
    test('convertHandler should return false if there are two dots', function () {
        const input = '25..mi';
        const result = convertHandler.getNum(input);
        assert.equal(result, 'invalid number', 'Result is 1')
    });
    test('convertHandler should correctly read each valid input unit', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
        units.forEach((item, i) => {
            assert.equal(convertHandler.getUnit(item.toLowerCase()), units[i], 'Valid input is read')
            assert.equal(convertHandler.getUnit(item.toUpperCase()), units[i], 'Valid input is read')
        });
    });
    test('convertHandler should return invalid unit if unit is invalid', function () {
        assert.equal(convertHandler.getUnit('hello'), 'invalid unit', 'Result is invalid')
    });
    test('convertHandler should correctly converts all units', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
        const returnUnits = ['km', 'mi', 'kg', 'lbs', 'L', 'gal'];
        units.forEach((item, i) => {
            const result = convertHandler.getReturnUnit(item);
            assert.equal(result, returnUnits[i], `${item} converts to ${returnUnits[i]}`)
            const resultFromUpper = convertHandler.getReturnUnit(item.toUpperCase());
            assert.equal(resultFromUpper, returnUnits[i], `${item} converts to ${returnUnits[i]}`)
            const resultFromLower = convertHandler.getReturnUnit(item.toLowerCase());
            assert.equal(resultFromLower, returnUnits[i], `${item} converts to ${returnUnits[i]}`)
        });
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
        const spelledOutUnits = ['miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters']
        units.forEach((item, i) => {
            assert.equal(convertHandler.spellOutUnit(item), spelledOutUnits[i], `Result is ${spelledOutUnits[i]}`)
        });
    });
    test('You can convert "gal" to "L" and vice versa. (1 gal to 3.78541 L)', function () {
        const result = convertHandler.convert(1, 'gal');
        assert.equal(result, '3.78541', `Gal turns to L`)
        const result2 = convertHandler.convert(1, 'L');
        assert.equal(result2, '0.26417', `Gal turns to L`)
    });
    test('You can convert "lbs" to "kg" and vice versa. (1 lbs to 0.453592 kg)', function () {
        const result = convertHandler.convert(1, 'lbs');
        assert.equal(result, '0.45359', `Lbs turns to kg`)
        const result2 = convertHandler.convert(1, 'kg');
        assert.equal(result2, '2.20462', `Kg turns to lbs`)
    });
    test('You can convert "mi" to "km" and vice versa. (1 mi to 1.60934 km)', function () {
        const result = convertHandler.convert(1, 'mi');
        assert.equal(result, '1.60934', `Mi turns to KM`)
        const result2 = convertHandler.convert(1, 'km');
        assert.equal(result2, '0.62137', `Km turns to Mi`)
    });
});