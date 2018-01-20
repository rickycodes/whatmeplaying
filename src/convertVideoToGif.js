const { spawn } = require('child_process')
const logData = data => console.log(data.toString())

const convertVideoToGif = (sh, file, path, cb) => {
  const args = [
    sh,
    file,
    path
  ]

  const command = spawn('bash', args)
  command.stdout.on('data', logData)
  command.stderr.on('data', logData)
  command.on('exit', code => {
    if (code === 0) return cb()
    return cb(new Error('fail'))
  })
}

module.exports = convertVideoToGif
