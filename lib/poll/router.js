const express = require('express');
const pollService = require('./service');
const HttpStatus = require('http-status-codes');
const logger = require('bigscreen-logger');
const secure = require('../auth/service').hasRole(['admin']);
const updateOnlyPath = require('../db/helpers').updateOnlyPath;
var router = express.Router();

router.post('/:id/screen', (req, res) => {
	pollService.changeScreen({id: req.params.id, user: req.user, data: req.body}, err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

router.put('/:id/editable', (req, res) => {
	// don't let user to edit other properties than editable.
	pollService.edit({id: req.params.id, user: req.user}, updateOnlyPath('editable', req.body), err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

router.put('/:id/data/options', secure, (req, res) => {
	// don't let user to edit other properties than editable.
	pollService.edit({id: req.params.id, user: req.user}, updateOnlyPath('data.options', req.body), err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

router.post('/:id/data/results', secure, (req, res) => {
	pollService.addResults({id: req.params.id, user: req.user, resultsName: req.body.resultsName}, err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

router.delete('/:id/data/results/:result', secure, (req, res) => {
	pollService.deleteResult({
		user: req.user,
		id: req.params.id,
		resultId: req.params.result
	}, err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	})
});

router.delete('/:id/data/results', secure, (req, res) => {
	pollService.clearResults({id: req.params.id, user: req.user}, err => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	})
});

router.get('/:id/answer', (req, res) => {
	pollService.getAnswers({id: req.params.id, user: req.user}, (err, participants) => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.json(participants);
	});
});

router.get('/', (req, res) => {
	pollService.getPolls({user: req.user}, (err, data) => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.json(data);
	});
});

router.get('/:id', (req, res) => {
	pollService.getPoll({user: req.user, id: req.params.id}, (err, data) => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.json(data);
	});
});

module.exports = router;