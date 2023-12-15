import PropTypes from "prop-types"

const Notification = ({ message, color }) => {
  if (!color) {
    color = "red"
  }

  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  if (message === null) {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Notification
