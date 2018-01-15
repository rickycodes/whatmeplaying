const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'
const recordingsPath = '/home/pi/recordings/'
const T = new Twit(config)

const statuses = [
  'I am doing an video game',
  '↑↑↓↓←→←→BA',
  'beep',
  'boop',
  'Hadōken',
  'PRINCESS IS IN ANOTHER CASTLE!',
  'FINISH HIM!!'
]

const imageBots = [
  '@pixelsorter',
  '@ImgShuffleBOT',
  '@DeepDreamThis',
  '@a_quilt_bot',
  '@IMG2ASCII',
  '@kaleid_o_bot',
  '@picwhip'
]

// const gifBots = []

const getRandomN = (array, n) => {
  const shuffled = array.sort(_ => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

const getStatus = (statuses, bots) => `
${statuses[Math.floor(Math.random() * statuses.length)]}

#bot2bot #botALLY

/cc ${getRandomN(imageBots, 3).join(' ')}
`

const upload = (file, error, data, response) => {
  if (error) return console.log(error)
  const mediaIdStr = data.media_id_string
  const altText = `what me playing: ${file}`
  const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', metaParams, create.bind(null, mediaIdStr))
}

const create = (mediaIdStr, error, data, response) => {
  if (error) return console.log(error)
  const status = getStatus(statuses, imageBots)
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

const videoRecorded = (type, file) => {
  console.log(type, file)
}

fs.watch(screenshotsPath, debounce(screenshotTaken, 100))
fs.watch(recordingsPath, debounce(videoRecorded, 100))
