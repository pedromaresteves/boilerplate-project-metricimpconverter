'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    let invalidMsg = initNum
    if (initNum === 'invalid number' && initUnit === 'invalid unit') return res.send(`invalid number and unit`)
    if (initNum === 'invalid number') return res.send(initNum)
    if (initUnit === 'invalid unit') return res.send(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.send({ initNum, initUnit, returnNum, returnUnit, string })
  })
};
