const { exec } = require('child_process')
const { parallel } = require('gulp')

function testing(cb) {
  exec('yarn test:flexysearch', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
  exec('yarn test:react', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
  exec('yarn test:textfield', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
}


function buildAll(cb) {
  exec('yarn build:flexysearch', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
  exec('yarn build:react', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
  exec('yarn build:textfield', (err, stdout) => {
    if(err) {
      console.error(err)
      return
    }
    console.log(stdout)
    cb()
  })
}


exports.testCI = parallel(testing, buildAll)
