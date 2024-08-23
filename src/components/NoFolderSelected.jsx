import { useNavigate } from "react-router-dom"

function NoFolderSelected() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <p style={styles.message}>No folder selected...</p>
      <div style={styles.actions}>
        <h3 style={styles.link} onClick={() => navigate("/newFolder")}>
          Create a new folder
        </h3>
        <span style={styles.separator}>or</span>
        <h3 style={styles.link} onClick={() => navigate("/")}>
          Go to All folders
        </h3>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  separator: {
    margin: "0.5rem 0",
    fontSize: "1rem",
    color: "#666",
  },
}

export default NoFolderSelected
