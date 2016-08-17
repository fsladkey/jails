module.exports = function ({ users }) {
  users = users.map(user => {
    return `
      <li>
        <a href="/users/${user.id()}">${user.username()}</a>
      </li>
      `
  })

  return `
  <h1>Users</h1>
  <ul>
    ${ users.join("\n") }
  </ul>
  `
}
