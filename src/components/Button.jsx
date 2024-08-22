import PropTypes from "prop-types"
import "./Button.css"

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick} style={{ cursor: "pointer" }}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
