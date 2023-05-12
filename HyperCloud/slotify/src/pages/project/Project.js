import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

// components
import ProjectComments from "./ProjectComments"
import ProjectSummary from "./ProjectSummary"

// styles
import './Project.css'

export default function Project() {
  const { id } = useParams()
  const { document, error } = useDocument('bookings', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary booking={document} />
      <ProjectComments booking={document} />
    </div>
  )
}
