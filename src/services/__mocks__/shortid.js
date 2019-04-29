const shortid = jest.genMockFromModule('shortid')

let i = 6

shortid.generate = () => {
  let id = `${i}${i}${i}${i}`
  i++
  return id
}

module.exports = shortid
