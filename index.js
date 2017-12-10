const fs = require('fs')
const debounce = require('lodash.debounce')
const config = require('./config')
const Twit = require('twit')
const screenshotsPath = '/home/pi/.config/retroarch/screenshots/'

var T = new Twit(config)

const statuses = [
  'I am doing an video game',
  '↑↑↓↓←→←→BA',
  'beep',
  'boop'
]

const post = (path, file) => {
  const b64content = fs.readFileSync(`${path}${file}`, { encoding: 'base64' })

  T.post('media/upload', { media_data: b64content }, function (error, data, response) {
    if (error) return console.log(error)
    const mediaIdStr = data.media_id_string
    const altText = `what me playing: ${file}`
    const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', metaParams, function (error, data, response) {
      if (!error) {
        const params = { status: statuses[Math.floor(Math.random() * statuses.length)], media_ids: [mediaIdStr] }

        T.post('statuses/update', params, function (error, data, response) {
          if (error) return console.log(error)
          console.log(data)
        })
      } else {
        console.log(error)
      }
    })
  })
}

const onFileChange = (type, file) => {
  if (file && type === 'change') {
    console.log('screenshot taken!')
    post(screenshotsPath, file)
  }
}

fs.watch(screenshotsPath, debounce(onFileChange, 100))
