const express = require('express');
const pollService = require('./service');
const HttpStatus = require('http-status-codes');
const getIO = require('../channel/service').getIo;
const logger = require('bigscreen-logger');
const secure = require('../auth/service').hasRole.bind(null, ['admin']);

var router = express.Router();

router.post('/:parent/screen', secure, (req, res) => {
    req.body.parent = req.params.parent;
    getIO().emit('changeScreen', req.body);
    pollService.saveLastScreen({
        pollName: req.body.pollName,
        lastScreen: req.body.step
    }, err => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.sendStatus(HttpStatus.OK);
    });
});

router.put('/:id', secure, (req, res) => {
    pollService.edit(req.params.id, req.body, err => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.sendStatus(HttpStatus.OK);
    });
});

router.get('/:id/participant', (req, res) => {
    pollService.getParticipants(req.params.id, (err, participants) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.json(participants);
    });
});

router.get('/:id/answer', secure, (req, res) => {
    pollService.getAnswers(req.params.id, (err, participants) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.json(participants);
    });
});

router.get('/', (req, res) => {
    pollService.getPolls(req.query.parent, (err, data) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.json(data);
    });
});
router.get('/:id', (req, res) => {
    pollService.getPoll(req.params.id, (err, data) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.json(data);
    });
});

module.exports = router;