const fs = require("fs")

const file = "./node_modules/react-scripts/config/webpack.config.js"

console.log(
  "Applying hotfix for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/896..."
)

fs.readFile(file, "utf8", function (err, data) {
  if (err) {
    return console.log(err)
  }
  const result = data.replace(
    "require('mini-css-extract-plugin');",
    "require('mini-css-extract-plugin').default;"
  )

  fs.writeFile(file, result, "utf8", function (err) {
    if (err) return console.log(err)
  })
})