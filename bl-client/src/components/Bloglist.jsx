import { BlogInBloglist } from "./Blog"
import { useSelector } from "react-redux"
import { Flex } from "@adobe/react-spectrum"

const Bloglist = () => {
  const byLikes = (a, b) => b.likes - a.likes
  const username = useSelector(({ user }) => user.username)

  const bloglist = useSelector(({ bloglist }) => bloglist)

  const sortedBloglist = [...bloglist].sort(byLikes)

  return (
    <Flex direction="column" gap="size-100">
      {sortedBloglist.map((blog) => (
        <BlogInBloglist key={blog.id} blog={blog} username={username} />
      ))}
    </Flex>
  )
}

export default Bloglist
