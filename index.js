const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const statuses = require('./src/statuses')
const staticBots = require('./src/staticBots')
const getTweetMsg = require('./src/getTweetMsg')
const screenRecording = require('./src/screenRecording')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'
const recordingsPath = '/home/pi/recordings/'
const T = new Twit(config)

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
  const status = getTweetMsg(statuses, staticBots)
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

fs.watch(screenshotsPath, debounce(screenshotTaken, 100))
fs.watch(recordingsPath, screenRecording.bind(null, recordingsPath))
