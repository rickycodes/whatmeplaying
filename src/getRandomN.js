const getRandomN = (array, n) => {
  const shuffled = array.sort(_ => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

module.exports = getRandomN
