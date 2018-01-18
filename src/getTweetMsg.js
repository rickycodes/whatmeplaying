const getTweetMsg = (statuses, bots) => `
${statuses[Math.floor(Math.random() * statuses.length)]}

#bot2bot #botALLY

/cc ${bots}
`

module.exports = getTweetMsg
