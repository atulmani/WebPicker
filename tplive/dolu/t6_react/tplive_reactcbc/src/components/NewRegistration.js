import React from 'react'
import NewMember from './NewMember'

export default function NewRegistration() {
    console.log('in NewRegistration')
    return (
        <>
            <NewMember selectedPlayer='' addNewMember='true' showBack={false}></NewMember>

        </>

    )
}
