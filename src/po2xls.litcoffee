
Easy...

    require('source-map-support').install()
    Excelbuilder = require 'msexcel-builder'
    Fs = require "fs"
    Po2json = require 'po2json'
    Path = require 'path'
    Mkdirp = require 'mkdirp'

    self = null

    class Po2xls
        constructor: (options, cb) ->
            self = @
            @options = options || {}
            @options.file = options._[0] || ''
            @options.output = options.output || './output.xls'

            try
                console.log 'Loading file "'+@options.file+'"'
                file = Fs.readFileSync(@options.file)

                console.log 'Parsing...'
                jsondata = Po2json.parse(file)
                language = jsondata[''].language
                keys = Object.keys(jsondata)
                rows = keys.length-1

                console.log '  Detected language: '+language
                console.log '  Found strings: '+rows

                dirPath = Path.dirname(@options.output)
                fileName = Path.basename(@options.output)
                Mkdirp.sync(dirPath)
                console.log 'Exporting into XLS file "'+dirPath+'/'+fileName+'" ...'
                workbook = Excelbuilder.createWorkbook(dirPath, fileName)
                sheet = workbook.createSheet(language,2,rows)
                for val, index in keys
                    if index > 0
                        sheet.set(1,index,val)
                        sheet.set(2,index,jsondata[val][1])
                workbook.save () ->
                    console.log 'Done.'
                    cb()

            catch error
                throw error

        @start: (@argv, @exit, cb) ->
            @instance ?= new Po2xls(@argv, cb)
            this

    module.exports = Po2xls
