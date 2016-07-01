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

    it('#updateOnlyEditable2', function () {
        expect(updateOnlyPath('editable', {
            property: 'test',
            property2: 'test2'
        })).to.eql({
            $set: {
                'editable.property': 'test',
                'editable.property2': 'test2'
            }
        });
    });

    it('#updateOnlyEditable3 - check nested objects', function () {
        expect(updateOnlyPath('editable', {
            property: {
                left: 1,
                top: 5
            },
            test: 'test'
        })).to.eql({
            $set: {
                'editable.test': 'test',
                'editable.property.left': 1,
                'editable.property.top': 5
            }
        });
    });
});