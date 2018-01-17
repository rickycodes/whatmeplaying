const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const onRecording = require('./src/onRecording')
const onScreenshot = require('./src/onScreenshot')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'
const recordingsPath = '/home/pi/recordings/'
const T = new Twit(config)

fs.watch(screenshotsPath, debounce(onScreenshot.bind(null, T, screenshotsPath), 100))
fs.watch(recordingsPath, onRecording.bind(null, recordingsPath))
