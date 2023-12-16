import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

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
                <td>
                  <Link to={`/users/${userID}`}>{user}</Link>
                </td>
                <td>{amount}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default Users
