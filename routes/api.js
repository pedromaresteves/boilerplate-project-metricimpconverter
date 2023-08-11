'use strict';

const expect = require('chai').expect;
const { ConvertHandler } = require('../controllers/convertHandler.js');

module.exports = function (app) {

  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    console.log(req.query.input, decodeURI(req.query.input))
    const initNum = convertHandler.getNum(decodeURI(req.query.input));
    const initUnit = convertHandler.getUnit(req.query.input);
    if (!initNum && !initUnit) return res.send('invalid number and unit')
    if (!initNum) return res.send('invalid number');
    if (!initUnit) return res.send('invalid unit');
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.send({ initNum, initUnit, returnNum, returnUnit, string })
  })
};
