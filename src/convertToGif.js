const { exec } = require('child_process')
const scale = 320
const fps = 10

const convertToFrames = (file, path) => {
  const command = `ffmpeg -sseof -10 -t 10 -i ${file} -vf scale=${scale}:-1:flags=lanczos,fps=${fps} ${path}ffout%03d.png`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

const convertVideoToGif = (file, path) => {
  convertToFrames(file, path)
  // convert to frames first
}

module.exports = convertVideoToGif
