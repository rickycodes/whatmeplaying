const getTweetMsg = (status, bots) => `
${status}

#bot2bot #botALLY

/cc ${bots}
`

module.exports = getTweetMsg
