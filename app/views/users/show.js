module.exports = function ({ user }) {

  return `
  <h1>${user.username()}</h1>
  <a href="/users/">Users</a>
  `
}
