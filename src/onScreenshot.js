const statuses = require('./statuses')
const staticBots = require('./staticBots')
const getTweetMsg = require('./getTweetMsg')
const getRandomN = require('./getRandomN')
const fs = require('fs')

const onScreenshot = (T, screenshotsPath, type, file) => {
  const upload = (file, error, data, response) => {
    if (error) return console.log(error)
    const mediaIdStr = data.media_id_string
    const altText = `what me playing: ${file}`
    const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }
    T.post('media/metadata/create', metaParams, create.bind(null, mediaIdStr))
  }

  const create = (mediaIdStr, error, data, response) => {
    if (error) return console.log(error)
    const status = getTweetMsg(statuses, getRandomN(staticBots, 3).join(' '))
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

  if (file && type === 'change') {
    console.log('screenshot taken!')
    postScreenshot(screenshotsPath, file)
  }
}

module.exports = onScreenshot
