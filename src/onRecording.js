let videoFile
let intervalID
let recordingStarted = false
let fileSizeIs = 0
let fileSizeWas = 0

const getFilesize = require('./getFilesize')
const convertVideoToGif = require('./convertToGif')

const onRecording = (T, gifPath, recordingsPath, type, file) => {
  if (file && type === 'change') {
    videoFile = file
    fileSizeIs = getFilesize(`${recordingsPath}${file}`)
    if (!recordingStarted) {
      recordingStarted = true
      intervalID = setInterval(isScreenRecording.bind(null, recordingsPath, gifPath), 4000)
    }
    console.log('video is recording!')
  }
}

const isScreenRecording = (recordingsPath, gifPath) => {
  if (fileSizeWas === fileSizeIs) {
    console.log(`${videoFile} appears to be done recording`)
    recordingStarted = false
    clearInterval(intervalID)
    convertVideoToGif(`${recordingsPath}${videoFile}`, gifPath)
  } else {
    fileSizeWas = fileSizeIs
    console.log('video is still recording...')
  }
}

module.exports = onRecording
