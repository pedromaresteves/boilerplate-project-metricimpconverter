const chai = require('chai');
let assert = chai.assert;
const { ConvertHandler, validUnits } = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('getNum Tests', function () {
    test('convertHandler should correctly read a whole number input.', function () {
        const wholeNumberInput = '5mi';
        const result = convertHandler.getNum(wholeNumberInput);
        assert.equal(result, 5, 'Result is equal to 5')
    });
    test('convertHandler should correctly read a decimal number input.', function () {
        const decimalNumberInput = '5.5mi';
        const result = convertHandler.getNum(decimalNumberInput);
        assert.equal(result, 5.5, 'Result is equal to 5.5')
    });
    test('convertHandler should correctly read a fractional input.', function () {
        const fractionalNumberInput = '3/5mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 0.6, 'Result is equal to 0.6')
    });
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        const fractionalNumberInput = '3.5/5mi';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, 0.7, 'Result is equal to 0.7')
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        const fractionalNumberInput = '3/2/3';
        const result = convertHandler.getNum(fractionalNumberInput);
        assert.equal(result, false, 'Result is an error')
    });
    test('convertHandler should correctly return an error with a many dots input.', function () { //?
        const input = '3.5.5';
        const result = convertHandler.getNum(input);
        assert.equal(result, false, 'Result is an error')
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        const input = 'mi';
        const result = convertHandler.getNum(input);
        assert.equal(result, 1, 'Result is 1')
    });
    test('!10kg! should break', function () {
        const input = '!10kg!';
        const result = convertHandler.getNum(input);
        assert.equal(result, false, 'Result is false')
    });
    test('!10kg should break', function () {
        const input = '!10kg!';
        const result = convertHandler.getNum(input);
        assert.equal(result, false, 'Result is false')
    });
    test('k!g should break', function () {
        const input = '!10kg!';
        const result = convertHandler.getNum(input);
        assert.equal(result, false, 'Result is false')
    });
});
suite('getUnit Tests', function () {
    test('convertHandler should correctly read each valid input unit.', function () {
        validUnits.forEach((item, i) => {
            assert.equal(convertHandler.getUnit(item.toLowerCase()), validUnits[i] === 'l' ? validUnits[i].toUpperCase() : validUnits[i], 'Valid input is read')
            assert.equal(convertHandler.getUnit(item.toUpperCase()), validUnits[i] === 'l' ? validUnits[i].toUpperCase() : validUnits[i], 'Valid input is read')
        });
    });
    test('convertHandler should correctly return an error for an invalid input unit.', function () {
        assert.equal(convertHandler.getUnit('hello'), false, 'Result is invalid')
    });
    test('if unit is l it return L', function () {
        assert.equal(convertHandler.getUnit('l'), 'L', 'l is L');
        assert.equal(convertHandler.getUnit('L'), 'L', 'l is L');
    }),
        test('!10kg! should break', function () {
            const input = '!10kg!';
            const result = convertHandler.getNum(input);
            assert.equal(result, false, 'Result is false')
        });
    test('k!g should break', function () {
        const input = '!10kg!';
        const result = convertHandler.getNum(input);
        assert.equal(result, false, 'Result is false')
    });
});
suite('getReturnUnit Tests', function () {
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
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
});
suite('spellOutUnit Tests', function () {
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
        const spelledOutUnits = ['miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters']
        units.forEach((item, i) => {
            assert.equal(convertHandler.spellOutUnit(item), spelledOutUnits[i], `Result is ${spelledOutUnits[i]}`)
        });
    });
});
suite('convert Tests', function () {
    test('convertHandler should correctly convert gal to L.', function () {
        const result = convertHandler.convert(1, 'gal');
        assert.equal(result, '3.78541', `Gal turns to L`)
    });
    test('convertHandler should correctly convert L to gal.', function () {
        const result2 = convertHandler.convert(1, 'L');
        assert.equal(result2, '0.26417', `L turns to Gal`)
    });
    test('convertHandler should correctly convert lbs to kg.', function () {
        const result = convertHandler.convert(1, 'lbs');
        assert.equal(result, '0.45359', `Lbs turns to kg`)
    });
    test('convertHandler should correctly convert kg to lbs.', function () {
        const result2 = convertHandler.convert(1, 'kg');
        assert.equal(result2, '2.20462', `Kg turns to lbs`)
    });
    test('convertHandler should correctly convert mi to km.', function () {
        const result = convertHandler.convert(1, 'mi');
        assert.equal(result, '1.60934', `Mi turns to KM`)
    });
    test('convertHandler should correctly convert km to mi.', function () {
        const result2 = convertHandler.convert(1, 'km');
        assert.equal(result2, '0.62137', `Km turns to Mi`)
    });
});