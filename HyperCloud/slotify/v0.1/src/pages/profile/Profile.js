import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Profile.css'

export default function Profile() {
    const { user } = useAuthContext()
    // const { id } = useParams()
    // console.log(user)
    const { document, error } = useDocument('users', user.uid)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div>
            {/* <h1>{document.displayName}</h1> */}
            <p>Hey {document.displayName}</p>

        </div>
    )
}
