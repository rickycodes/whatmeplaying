const test = require('tape')
const getRandomN = require('./src/getRandomN')
const staticBots = require('./src/staticBots')
const getFilesize = require('./src/getFilesize')
const getTweetMsg = require('./src/getTweetMsg')

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
