const test = require('tape')
const fs = require('fs')
const src = './src/'

// tested
const getRandomN = require(`${src}getRandomN`)
const staticBots = require(`${src}staticBots`)
const getFilesize = require(`${src}getFilesize`)
const getTweetMsg = require(`${src}getTweetMsg`)

// untested
const convertVideoToGif = require(`${src}convertVideoToGif`) // eslint-disable-line
const getRandomStatus = require(`${src}getRandomStatus`) // eslint-disable-line
const onRecording = require(`${src}onRecording`) // eslint-disable-line
const onScreenshot = require(`${src}onScreenshot`) // eslint-disable-line
const postGif = require(`${src}postGif`) // eslint-disable-line
const statuses = require(`${src}statuses`) // eslint-disable-line
const update = require(`${src}update`) // eslint-disable-line

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
  const { paths } = require('./config')
  const pathKeys = Object.keys(paths)
  test('paths', t => {
    t.plan(pathKeys.length)
    pathKeys.map(path => t.true(fs.existsSync(paths[path])))
  })
}
