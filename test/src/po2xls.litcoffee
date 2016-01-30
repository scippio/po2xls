    'use strict'

    require('source-map-support').install()
    should = require 'should'
    Excelbuilder = require 'msexcel-builder'
    Yargs = require 'yargs'
    Fs = require 'fs'
    Xlsx = require 'xlsx'

    describe('Create Po2xls class', () ->

        Po2xls = require('../../lib/po2xls')

        describe('Simple testing', () ->

            it('Converting', (done) ->
                parsed = Yargs.parse([ './resources/de.po', '--output', './resources/test.xls'])
                Po2xls.start(parsed,null, () ->
                    try
                        Fs.accessSync('./resources/test.xls')
                        done()
                    catch err
                        console.error err
                )
            )

            it('Check converted file', (done) ->
                workbook = Xlsx.readFile('./resources/test.xls')
                first_sheet_name = workbook.SheetNames[0]
                worksheet = workbook.Sheets[first_sheet_name]

                worksheet['A1'].v.should.be.exactly("Firstname")
                worksheet['A2'].v.should.be.exactly("Lastname")
                worksheet['A3'].v.should.be.exactly("Password")
                worksheet['A4'].v.should.be.exactly("Send")
                worksheet['A5'].v.should.be.exactly("Yes")
                worksheet['A6'].v.should.be.exactly("No")
                worksheet['B1'].v.should.be.exactly("Vorname")
                worksheet['B2'].v.should.be.exactly("Nachname")
                worksheet['B3'].v.should.be.exactly("Passwort")
                worksheet['B4'].v.should.be.exactly("Senden")
                worksheet['B5'].v.should.be.exactly("Ja")
                worksheet['B6'].v.should.be.exactly("Nein")

                # clean
                Fs.unlinkSync('./resources/test.xls')
                done()
            )
        )
    )
