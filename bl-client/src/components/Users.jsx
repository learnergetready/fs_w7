import { useSelector } from "react-redux"

const Users = () => {
  const byBlogAmounts = (a, b) => b[1] - a[1]
  const userReducer = (acc, user) => [
    ...acc,
    [user.name, user.blogs.length, user.id],
  ]

  const userlist = useSelector(({ userlist }) => userlist)

  if (!userlist) {
    return null
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>User</th>
          <th>Blogs added</th>
        </tr>
        {userlist
          .reduce(userReducer, [])
          .sort(byBlogAmounts)
          .map(([user, amount, userID]) => {
            return (
              <tr key={userID}>
                <td>{user}</td>
                <td>{amount}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default Users
