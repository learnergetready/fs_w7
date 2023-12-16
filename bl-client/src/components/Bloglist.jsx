import { BlogInBloglist } from "./Blog"
import { useSelector } from "react-redux"

const Bloglist = () => {
  const byLikes = (a, b) => b.likes - a.likes
  const username = useSelector(({ user }) => user.username)

  const bloglist = useSelector(({ bloglist }) => bloglist)

  const sortedBloglist = [...bloglist].sort(byLikes)

  return (
    <div>
      {sortedBloglist.map((blog) => (
        <BlogInBloglist key={blog.id} blog={blog} username={username} />
      ))}
    </div>
  )
}

export default Bloglist
