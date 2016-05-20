const expect = require('expect.js');
const updateOnlyEditable = require('../../../../lib/db/db').updateOnlyEditable;

describe('poll service tests', function () {
    it('#updateOnlyEditable1', function () {
        expect(updateOnlyEditable({
            property: 'test'
        })).to.eql({
            $set: {
                'editable.property': 'test'
            }
        });
    });

    it('#updateOnlyEditable', function () {
        expect(updateOnlyEditable({
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