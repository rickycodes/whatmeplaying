let videoFile
let intervalID
let recordingStarted = false
let fileSizeIs = 0
let fileSizeWas = 0

const getFilesize = require('./getFilesize')

const screenRecording = (recordingsPath, type, file) => {
  if (file && type === 'change') {
    videoFile = file
    fileSizeIs = getFilesize(`${recordingsPath}${file}`)
    if (!recordingStarted) {
      recordingStarted = true
      intervalID = setInterval(isScreenRecording, 4000)
    }
    console.log('video is recording!')
  }
}

const isScreenRecording = _ => {
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

module.exports = screenRecording
