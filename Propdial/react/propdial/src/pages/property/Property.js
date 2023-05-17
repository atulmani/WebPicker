import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

// components
import PropertyComments from "./PropertyComments"
import PropertyDetails from "./PropertyDetails"

// styles
import './Property.css'

export default function Property() {
    const { id } = useParams()
    const { document, error } = useDocument('properties', id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="property-details">
            <PropertyDetails property={document} />
            <PropertyComments property={document} />
        </div>
    )
}
