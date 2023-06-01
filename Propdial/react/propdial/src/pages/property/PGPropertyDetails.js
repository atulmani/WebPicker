import { useEffect, useState } from 'react'
import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory, useLocation } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from '../../hooks/useCollection'
import Filters from '../../components/Filters'
import BillList from '../../components/BillList'
import PhotoList from '../../components/PhotoList'
import PropertyDocumentList from '../../components/PropertyDocumentList'

const propertyDetailsFilter = ['BILLS', 'PHOTOS', 'DOCS', 'TENANTS'];
let filterLength = 0
export default function PGPropertyDetails() {
    const { state } = useLocation()
    const { propertyid } = state
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('properties')
    const [filter, setFilter] = useState('BILLS')
    const { documents: billsdocuments, error: billserror } = useCollection('bills', ['propertyid', '==', propertyid])
    const { documents: photosdocuments, error: photoserror } = useCollection('photos', ['propertyid', '==', propertyid])
    const { documents: propertydocuments, error: propertydocumentserror } = useCollection('documents', ['propertyid', '==', propertyid])

    console.log('photos document:', photosdocuments)

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    if (billsdocuments) {
        filterLength = billsdocuments.length;
    }

    return (
        <div>
            <Filters changeFilter={changeFilter} filterList={propertyDetailsFilter} filterLength={filterLength} />
            {/* <PropertyDetails property={document} /> */}
            {filter === 'BILLS' && billsdocuments && <BillList bills={billsdocuments} />}

            {filter === 'PHOTOS' && photosdocuments && <PhotoList photos={photosdocuments} />}

            {filter === 'DOCS' && photosdocuments && <PropertyDocumentList propertydocs={propertydocuments} />}

        </div>
    )
}