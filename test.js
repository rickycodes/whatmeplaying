const test = require('tape')
const fs = require('fs')
const getRandomN = require('./src/getRandomN')
const staticBots = require('./src/staticBots')
const getFilesize = require('./src/getFilesize')
const getTweetMsg = require('./src/getTweetMsg')
const { paths } = require('./config')
const pathKeys = Object.keys(paths)

test('getRandomN', t => {
  t.plan(2)
  const getThreeBots = getRandomN(staticBots, 3)
  t.true(getThreeBots.length === 3)
  t.true(staticBots.length > getThreeBots.length)
})

test('getFilesize', t => {
  t.plan(1)
  t.true(getFilesize('./src/getFilesize.js') === 192)
})

test('getTweetMsg', t => {
  t.plan(1)
  t.true(getTweetMsg('beep beeb boop', ['e', 'f', 'g']), `beep beeb boop

#bot2bot #botALLY

/cc e,f,g`)
})

// test config
if (process.env.NODE_ENV === 'local') {
  test('paths', t => {
    t.plan(pathKeys.length)
    pathKeys.map(path => t.true(fs.existsSync(paths[path])))
  })
}
