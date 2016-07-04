'use strict';

const EventEmitter = require('events');

class CustomEventEmitter extends EventEmitter {};

const customEventEmitter = new CustomEventEmitter();

module.exports = customEventEmitter;
