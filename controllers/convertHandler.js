function ConvertHandler() {
  this.getNum = function (input) {
    const isValidInput = input.replace(/[^/]/g, '').length < 2;
    if (!isValidInput) return 'invalid number';
    let result = input.replace(/[^\d./]/g, '');
    if (result.indexOf('/') > -1) {
      const numerator = result.substring(0, result.indexOf('/'));
      const denominator = result.substring(result.indexOf('/') + 1, result.length);
      result = Number(numerator) / Number(denominator);
    }
    return Number(result) || 1;
  };

  this.getUnit = function (input) {
    const result = input.replace(/[^a-zA-Z]/g, '');
    const isValidInput = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'].includes(result.toLowerCase())
    if (!isValidInput) return 'invalid unit';
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];
    if (units.indexOf(initUnit) % 2 === 0) return units[units.indexOf(initUnit) + 1];
    return units[units.indexOf(initUnit) - 1];
  };

  this.spellOutUnit = function (unit) {
    if (!unit) return 'invalid unit'
    unit = unit.toLowerCase();
    if (unit === 'mi') return 'miles';
    if (unit === 'km') return 'kilometers';
    if (unit === 'lbs') return 'pounds';
    if (unit === 'kg') return 'kilograms';
    if (unit === 'gal') return 'gallons';
    if (unit === 'l') return 'liters';
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit = initUnit.toLowerCase();
    if (initUnit === 'mi') result = initNum * miToKm;
    if (initUnit === 'km') result = initNum / miToKm;
    if (initUnit === 'lbs') result = initNum * lbsToKg;
    if (initUnit === 'kg') result = initNum / lbsToKg;
    if (initUnit === 'gal') result = initNum * galToL;
    if (initUnit === 'l') result = initNum / galToL;
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
