const statuses = require('./statuses')
const staticBots = require('./staticBots')
const getTweetMsg = require('./getTweetMsg')
const getRandomN = require('./getRandomN')
const getRandomStatus = require('./getRandomStatus')
const update = require('./update')
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
    const status = getTweetMsg(getRandomStatus(statuses), getRandomN(staticBots, 3).join(' '))
    const params = { status, media_ids: [mediaIdStr] }
    T.post('statuses/update', params, update)
  }

  if (file && type === 'change') {
    console.log('screenshot taken!')
    const b64content = fs.readFileSync(`${screenshotsPath}${file}`, { encoding: 'base64' })
    T.post('media/upload', { media_data: b64content }, upload.bind(null, file))
  }
}

module.exports = onScreenshot
