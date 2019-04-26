import shortid from 'shortid'

const setNodeId = node => {
  node.id = shortid.generate()
  if (node.children && node.children.length !== 0) {
    node.children.forEach((node) => {
      return setNodeId(node)
    })
  }
  return node
}

export const setIds = doc => {
  return setNodeId(doc)
}
