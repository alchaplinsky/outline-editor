module.exports = {
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./test/setupTests.js"],
  setupFilesAfterEnv: ["./node_modules/jest-enzyme/lib/index.js"],
  testPathIgnorePatterns: ["lib"]
}
