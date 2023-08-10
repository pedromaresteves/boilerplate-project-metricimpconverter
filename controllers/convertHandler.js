function ConvertHandler() {
  this.getNum = function (input) {
    let numsBarsAndDots = input.replace(/[^\d.\//]/g, '');
    if (numsBarsAndDots.indexOf("/") === -1) {
      if (numsBarsAndDots === "") return 1;
      return Number(numsBarsAndDots) ? Number(numsBarsAndDots) : false
    } else {
      numsBarsAndDots = numsBarsAndDots.split("/");
      if (numsBarsAndDots.length > 2) return false
      if (numsBarsAndDots[0].includes('.') && numsBarsAndDots[0].match(/\./g).length > 1 || numsBarsAndDots[1].includes('.') && numsBarsAndDots[1].match(/\./g).length > 1) return "invalid number"
      if (numsBarsAndDots[1]) return Number(numsBarsAndDots[0]) / Number(numsBarsAndDots[1]);
    }
  };

  this.getUnit = function (input) {
    let result = input.replace(/[^a-zA-Z]/g, '');
    if (!result) return false;
    const isValidInput = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'].includes(result.toLowerCase())
    if (!isValidInput) return false;
    if (result === 'l' || result === 'L') return result.toUpperCase();
    return result.toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
    let result;
    if (units.indexOf(initUnit.toLowerCase()) % 2 === 0) result = units[units.indexOf(initUnit.toLowerCase()) + 1];
    if (units.indexOf(initUnit.toLowerCase()) % 2 !== 0) result = units[units.indexOf(initUnit.toLowerCase()) - 1];
    if (!result) return 'invalid unit';
    if (result === 'l') return result.toUpperCase();
    return result.toLowerCase();
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
    if (typeof initNum === String || initUnit === 'invalid unit') return 'invalid input'
    let result;
    initUnit = initUnit.toLowerCase();
    if (initUnit === 'mi') result = initNum * miToKm;
    if (initUnit === 'km') result = initNum / miToKm;
    if (initUnit === 'lbs') result = initNum * lbsToKg;
    if (initUnit === 'kg') result = initNum / lbsToKg;
    if (initUnit === 'gal') result = initNum * galToL;
    if (initUnit === 'l') result = initNum / galToL;
    if (result.toString().length > 7) result = result.toFixed(5)
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

const poo = new ConvertHandler();

module.exports = ConvertHandler;