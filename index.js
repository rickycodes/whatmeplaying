const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const getFilesize = require('./src/getFilesize')
const statuses = require('./src/statuses')
const staticBots = require('./src/staticBots')
const getStatus = require('./src/getStatus')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'
const recordingsPath = '/home/pi/recordings/'
const T = new Twit(config)

// video related
let videoFile
let intervalID
let recordingStarted = false
let fileSizeIs = 0
let fileSizeWas = 0

// const gifBots = []

const upload = (file, error, data, response) => {
  if (error) return console.log(error)
  const mediaIdStr = data.media_id_string
  const altText = `what me playing: ${file}`
  const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }
  T.post('media/metadata/create', metaParams, create.bind(null, mediaIdStr))
}

const create = (mediaIdStr, error, data, response) => {
  if (error) return console.log(error)
  const status = getStatus(statuses, staticBots)
  const params = { status, media_ids: [mediaIdStr] }
  T.post('statuses/update', params, update)
}

const update = (error, data, response) => {
  if (error) return console.log(error)
  console.log(data)
}

const postScreenshot = (path, file) => {
  const b64content = fs.readFileSync(`${path}${file}`, { encoding: 'base64' })
  T.post('media/upload', { media_data: b64content }, upload.bind(null, file))
}

const screenshotTaken = (type, file) => {
  if (file && type === 'change') {
    console.log('screenshot taken!')
    postScreenshot(screenshotsPath, file)
  }
}

const videoRecording = (type, file) => {
  if (file && type === 'change') {
    videoFile = file
    fileSizeIs = getFilesize(`${recordingsPath}${file}`)
    if (!recordingStarted) {
      recordingStarted = true
      intervalID = setInterval(isVideoRecording, 4000)
    }
    console.log('video is recording!')
  }
}

const isVideoRecording = _ => {
  if (fileSizeWas === fileSizeIs) {
    console.log(`${videoFile} appears to be done recording`)
    recordingStarted = false
    clearInterval(intervalID)
    // convertToGif()
  } else {
    fileSizeWas = fileSizeIs
    console.log('video is still recording...')
  }
}

fs.watch(screenshotsPath, debounce(screenshotTaken, 100))
fs.watch(recordingsPath, videoRecording)
