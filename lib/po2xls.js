(function() {
  var Excelbuilder, Fs, Mkdirp, Path, Po2json, Po2xls, self;

  require('source-map-support').install();

  Excelbuilder = require('msexcel-builder');

  Fs = require("fs");

  Po2json = require('po2json');

  Path = require('path');

  Mkdirp = require('mkdirp');

  self = null;

  Po2xls = (function() {
    function Po2xls(options, cb) {
      var dirPath, error, error1, file, fileName, i, index, jsondata, keys, language, len, rows, sheet, val, workbook;
      self = this;
      this.options = options || {};
      this.options.file = options._[0] || '';
      this.options.output = options.output || './output.xls';
      try {
        console.log('Loading file "' + this.options.file + '"');
        file = Fs.readFileSync(this.options.file);
        console.log('Parsing...');
        jsondata = Po2json.parse(file);
        language = jsondata[''].language;
        keys = Object.keys(jsondata);
        rows = keys.length - 1;
        console.log('  Detected language: ' + language);
        console.log('  Found strings: ' + rows);
        dirPath = Path.dirname(this.options.output);
        fileName = Path.basename(this.options.output);
        Mkdirp.sync(dirPath);
        console.log('Exporting into XLS file "' + dirPath + '/' + fileName + '" ...');
        workbook = Excelbuilder.createWorkbook(dirPath, fileName);
        sheet = workbook.createSheet(language, 2, rows);
        for (index = i = 0, len = keys.length; i < len; index = ++i) {
          val = keys[index];
          if (index > 0) {
            sheet.set(1, index, val);
            sheet.set(2, index, jsondata[val][1]);
          }
        }
        workbook.save(function() {
          console.log('Done.');
          return cb();
        });
      } catch (error1) {
        error = error1;
        throw error;
      }
    }

    Po2xls.start = function(argv, exit, cb) {
      this.argv = argv;
      this.exit = exit;
      if (this.instance == null) {
        this.instance = new Po2xls(this.argv, cb);
      }
      return this;
    };

    return Po2xls;

  })();

  module.exports = Po2xls;

}).call(this);

//# sourceMappingURL=sourcemaps/po2xls.js.map
