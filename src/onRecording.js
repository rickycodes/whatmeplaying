let videoFile = null
let intervalID
let recordingStarted = false
let fileSizeIs = 0
let fileSizeWas = 0

const getFilesize = require('./getFilesize')
const convertVideoToGif = require('./convertVideoToGif')
const postGif = require('./postGif')

const onRecording = (T, gifPath, recordingsPath, type, file) => {
  if (file && type === 'change') {
    videoFile = file
    fileSizeIs = getFilesize(`${recordingsPath}${file}`)
    if (!recordingStarted) {
      recordingStarted = true
      intervalID = setInterval(isScreenRecording.bind(null, T, recordingsPath, gifPath), 4000)
    }
    console.log('video is recording!')
  }
}

const isScreenRecording = (T, recordingsPath, gifPath) => {
  if (videoFile && fileSizeWas === fileSizeIs) {
    console.log(`${videoFile} appears to be done recording`)
    recordingStarted = false
    clearInterval(intervalID)
    convertVideoToGif(`${recordingsPath}${videoFile}`, gifPath, postGif.bind(null, T, gifPath))
  } else {
    fileSizeWas = fileSizeIs
    console.log('video is still recording...')
  }
}

module.exports = onRecording
