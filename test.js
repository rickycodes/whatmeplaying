const test = require('tape')
const getRandomN = require('./src/getRandomN')
const staticBots = require('./src/staticBots')

test('getRandomN', (t) => {
  t.plan(2)
  const getThreeBots = getRandomN(staticBots, 3)
  t.true(getThreeBots.length === 3)
  t.true(staticBots.length > getThreeBots.length)
})
