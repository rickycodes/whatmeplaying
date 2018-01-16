const fs = require('fs')

const getFilesize = filename => {
  const stats = fs.statSync(filename)
  const fileSizeInBytes = stats.size
  return fileSizeInBytes
}

module.exports = getFilesize
