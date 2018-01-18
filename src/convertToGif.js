const { spawn } = require('child_process')

const convertVideoToGif = (file, path, cb) => {
  const args = [
    'mkvToGif.sh',
    file,
    path
  ]

  const command = spawn('bash', args)

  command.stdout.on('data', function (data) {
    console.log(`stdout: ${data}`)
  })

  command.stderr.on('data', function (data) {
    console.log(`stderr: ${data}`)
  })

  command.on('exit', function (code) {
    console.log(`child process exited with code ${code}`)
    if (code === 0) {
      cb(file, path)
    }
  })
}

module.exports = convertVideoToGif
