import {
  Button,
  Flex,
  Tabs,
  Text,
  TabList,
  Item,
  View,
} from "@adobe/react-spectrum"
import { useSelector, useDispatch } from "react-redux"
import { clearUser } from "../reducers/userReducer"
import { useLocation } from "react-router-dom"
import Book from "@spectrum-icons/workflow/Book"
import UserGroup from "@spectrum-icons/workflow/UserGroup"

const Navbar = () => {
  const dispatch = useDispatch()
  const pathname = useLocation()
  const user = useSelector(({ user }) => user)

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBloglistUser")
    dispatch(clearUser())
  }

  return (
    <Flex gap="size-125">
      <View>
        <Tabs selectedKey={pathname}>
          <TabList aria-label="Tabs">
            <Item key="/" href="/" textValue="Blogs">
              <Book /> <Text>Blogs</Text>
            </Item>
            <Item key="/users" href="/users" textValue="Users">
              <UserGroup /> <Text>Users</Text>
            </Item>
          </TabList>
        </Tabs>
      </View>
      <View
        borderRadius="regular"
        borderWidth="thick"
        borderXColor="default"
        borderYColor="disabled"
        paddingX="size-200"
        width="100%"
      >
        <Text>{user.name} logged in </Text>
        <Button marginX="size-100" onPress={handleLogout} data-cy="log out">
          log out
        </Button>
      </View>
    </Flex>
  )
}

export default Navbar
