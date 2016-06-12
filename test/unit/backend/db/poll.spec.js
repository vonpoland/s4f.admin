/* global describe, it */

const expect = require('expect.js');
const updateOnlyPath = require('../../../../lib/db/helpers').updateOnlyPath;

describe('poll service tests', function () {
    it('#updateOnlyEditable1', function () {
        expect(updateOnlyPath('data', {
            property: 'test'
        })).to.eql({
            $set: {
                'data.property': 'test'
            }
        });
    });

    it('#updateOnlyEditable', function () {
        expect(updateOnlyPath('editable', {
            property: 'test',
            property2 : 'test2'
        })).to.eql({
            $set: {
                'editable.property': 'test',
                'editable.property2': 'test2'
            }
        });
    });
});