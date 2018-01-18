const statuses = require('./statuses')
const getTweetMsg = require('./getTweetMsg')
const update = require('./update')
const fs = require('fs')

const postGif = (T, path) => {
  const upload = (error, data, response) => {
    if (error) return console.log(error)
    const mediaIdStr = data.media_id_string
    const altText = 'what me playing'
    const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }
    T.post('media/metadata/create', metaParams, create.bind(null, mediaIdStr))
  }

  const create = (mediaIdStr, error, data, response) => {
    if (error) return console.log(error)
    const status = getTweetMsg(statuses, '@DATAM0SHER')
    const params = { status, media_ids: [mediaIdStr] }
    T.post('statuses/update', params, update)
  }

  const b64content = fs.readFileSync(`${path}output.gif`, { encoding: 'base64' })
  T.post('media/upload', { media_data: b64content }, upload)
}

module.exports = postGif
