(function() {
  'use strict';
  var Excelbuilder, Fs, Xlsx, Yargs, should;

  require('source-map-support').install();

  should = require('should');

  Excelbuilder = require('msexcel-builder');

  Yargs = require('yargs');

  Fs = require('fs');

  Xlsx = require('xlsx');

  describe('Create Po2xls class', function() {
    var Po2xls;
    Po2xls = require('../../lib/po2xls');
    return describe('Simple testing', function() {
      it('Converting', function(done) {
        var parsed;
        parsed = Yargs.parse(['./resources/de.po', '--output', './resources/test.xls']);
        return Po2xls.start(parsed, null, function() {
          var err, error;
          try {
            Fs.accessSync('./resources/test.xls');
            return done();
          } catch (error) {
            err = error;
            return console.error(err);
          }
        });
      });
      return it('Check converted file', function(done) {
        var address_of_cell, first_sheet_name, workbook, worksheet;
        workbook = Xlsx.readFile('./resources/test.xls');
        first_sheet_name = workbook.SheetNames[0];
        address_of_cell = 'A1';
        worksheet = workbook.Sheets[first_sheet_name];
        worksheet['A1'].v.should.be.exactly("Firstname");
        worksheet['A2'].v.should.be.exactly("Lastname");
        worksheet['A3'].v.should.be.exactly("Password");
        worksheet['A4'].v.should.be.exactly("Send");
        worksheet['A5'].v.should.be.exactly("Yes");
        worksheet['A6'].v.should.be.exactly("No");
        worksheet['B1'].v.should.be.exactly("Vorname");
        worksheet['B2'].v.should.be.exactly("Nachname");
        worksheet['B3'].v.should.be.exactly("Passwort");
        worksheet['B4'].v.should.be.exactly("Senden");
        worksheet['B5'].v.should.be.exactly("Ja");
        worksheet['B6'].v.should.be.exactly("Nein");
        Fs.unlinkSync('./resources/test.xls');
        return done();
      });
    });
  });

}).call(this);

//# sourceMappingURL=sourcemaps/po2xls.js.map
