const expect = require('expect.js');

import {hasAnyErrorsSet} from '../../../../public/js/lib/errors/service';

describe('should verify error handling functions', function () {
    it('#hasAnyErrorsSet1', function () {
        var errors = {
            fiedl1: { length : true},
            field2: { length: false}
        };

        expect(hasAnyErrorsSet(errors)).to.be(true);
    });

    it('#hasAnyErrorsSet2', function () {
        var errors = {
            fiedl1: { length : false},
            field2: { length: false}
        };

        expect(hasAnyErrorsSet(errors)).to.be(false);
    });

    it('#hasAnyErrorsSet3', function () {
        var errors = {
            fiedl1: { length : false, test: true}
        };

        expect(hasAnyErrorsSet(errors)).to.be(true);
    });

    it('#hasAnyErrorsSet4', function () {
        expect(hasAnyErrorsSet({ error : true })).to.be(true);
        expect(hasAnyErrorsSet({ error : false })).to.be(false);
        expect(hasAnyErrorsSet({ error1 : false, error2: true })).to.be(true);
    });

    it('#hasAnyErrorsSet5', function () {
        expect(hasAnyErrorsSet({})).to.be(false);
        expect(hasAnyErrorsSet()).to.be(false);
    });
});