const shortid = jest.genMockFromModule('shortid')

shortid.generate = () => {
  return 'UNIQID'
}

module.exports = shortid
