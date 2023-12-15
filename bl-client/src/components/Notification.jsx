import { useSelector } from "react-redux"

const Notification = () => {
  const { message, color = "red" } = useSelector(
    ({ notification }) => notification,
  )

  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  if (message === "") {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
