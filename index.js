const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'
const T = new Twit(config)

let file, mediaIdStr

const statuses = [
  'I am doing an video game',
  '↑↑↓↓←→←→BA',
  'beep',
  'boop',
  'Hadōken',
  'PRINCESS IS IN ANOTHER CASTLE!',
  'FINISH HIM!!'
]

const bots = [
  '@pixelsorter',
  // '@Lowpolybot',
  '@ImgShuffleBOT',
  '@DeepDreamThis',
  '@a_quilt_bot',
  '@IMG2ASCII',
  '@kaleid_o_bot'
]

const getRandomN = (array, n) => {
  const shuffled = array.sort(_ => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

const getStatus = (statuses, bots) => `
${statuses[Math.floor(Math.random() * statuses.length)]}

/cc ${getRandomN(bots, 3).join(' ')}
`

const upload = (error, data, response) => {
  if (error) return console.log(error)
  mediaIdStr = data.media_id_string
  const altText = `what me playing: ${file}`
  const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', metaParams, create)
}

const create = (error, data, response) => {
  if (!error) {
    const status = getStatus(statuses, bots)
    const params = { status, media_ids: [mediaIdStr] }

    T.post('statuses/update', params, update)
  } else {
    console.log(error)
  }
}

const update = (error, data, response) => {
  if (error) return console.log(error)
  console.log(data)
}

const post = (path, _file) => {
  file = _file
  const b64content = fs.readFileSync(`${path}${file}`, { encoding: 'base64' })
  T.post('media/upload', { media_data: b64content }, upload)
}

const onFileChange = (type, file) => {
  if (file && type === 'change') {
    console.log('screenshot taken!')
    post(screenshotsPath, file)
  }
}

fs.watch(screenshotsPath, debounce(onFileChange, 100))
