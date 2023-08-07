'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    if (initNum.error || initUnit.error || returnNum.error || returnUnit.error || string.error) { res.send('invalid number and unit') }
    res.send({ initNum, initUnit, returnNum, returnUnit, string })
  })

};
