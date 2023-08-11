const validUnits = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];

function ConvertHandler() {
  this.getNum = function (input) {
    if (/[^A-Za-z0-9.\//]/gi.exec(input) !== null) return false;
    const lowerCaseInput = input.toLowerCase();
    let unit = false;
    let textAfterUnit;
    validUnits.forEach(item => {
      if (lowerCaseInput.includes(item)) unit = item;
    });
    if (unit) {
      textAfterUnit = lowerCaseInput.slice(lowerCaseInput.indexOf(unit));
      if (/[\d.]/gi.exec(textAfterUnit) !== null) return false
    }
    let numsBarsAndDots = input.replace(/[^\d.\//]/g, '');
    if (numsBarsAndDots.indexOf("/") === -1) {
      if (numsBarsAndDots === "") return 1;
      return Number(numsBarsAndDots) ? Number(numsBarsAndDots) : false
    } else {
      numsBarsAndDots = numsBarsAndDots.split("/");
      if (numsBarsAndDots.length > 2) return false
      if (numsBarsAndDots[0].includes('.') && numsBarsAndDots[0].match(/\./g).length > 1 || numsBarsAndDots[1].includes('.') && numsBarsAndDots[1].match(/\./g).length > 1) return false
      if (numsBarsAndDots[1].includes('/')) return false;
      if (numsBarsAndDots[1]) return Number(numsBarsAndDots[0]) / Number(numsBarsAndDots[1]);
    }
  };

  this.getUnit = function (input) {
    const lowerCaseInput = input.toLowerCase();
    let unit = false;
    let textAfterUnit;
    validUnits.forEach(item => {
      if (!unit && lowerCaseInput.includes(item)) unit = item;
    });
    if (unit) {
      textAfterUnit = lowerCaseInput.slice(lowerCaseInput.indexOf(unit));
      if (textAfterUnit.length > unit.length) return false
    } else {
      return false;
    }
    if (unit === 'l' || unit === 'L') return unit.toUpperCase();
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    if (validUnits.indexOf(initUnit.toLowerCase()) % 2 === 0) result = validUnits[validUnits.indexOf(initUnit.toLowerCase()) + 1];
    if (validUnits.indexOf(initUnit.toLowerCase()) % 2 !== 0) result = validUnits[validUnits.indexOf(initUnit.toLowerCase()) - 1];
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
    let result;
    initUnit = initUnit.toLowerCase();
    if (initUnit === 'mi') result = initNum * miToKm;
    if (initUnit === 'km') result = initNum / miToKm;
    if (initUnit === 'lbs') result = initNum * lbsToKg;
    if (initUnit === 'kg') result = initNum / lbsToKg;
    if (initUnit === 'gal') result = initNum * galToL;
    if (initUnit === 'l') result = initNum / galToL;
    if (result.toString().length > 7) result = result.toFixed(5)
    return Number(result);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}



module.exports = { ConvertHandler, validUnits };