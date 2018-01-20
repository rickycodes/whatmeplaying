module.exports = statuses => {
  return statuses[Math.floor(Math.random() * statuses.length)]
}
