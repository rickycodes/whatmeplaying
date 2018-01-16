const getRandomN = (array, n) => {
  const shuffled = array.sort(_ => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

const getStatus = (statuses, bots) => `
${statuses[Math.floor(Math.random() * statuses.length)]}

#bot2bot #botALLY

/cc ${getRandomN(bots, 3).join(' ')}
`

module.exports = getStatus
