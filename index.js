const fs = require('fs')
const debounce = require('lodash.debounce')
const onRecording = require('./src/onRecording')
const onScreenshot = require('./src/onScreenshot')
const { twitter, paths: { screenshots_path, recording_path, gif_path } } = require('./config')
const Twit = require('twit')
const T = new Twit(twitter)

fs.watch(screenshots_path, debounce(onScreenshot.bind(null, T, screenshots_path), 100))
fs.watch(recording_path, onRecording.bind(null, T, gif_path, recording_path))

console.log('application running!')
