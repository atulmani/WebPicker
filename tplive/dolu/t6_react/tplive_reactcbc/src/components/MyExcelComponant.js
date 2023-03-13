import React from 'react'
import ExportExcel from '../Excelexport'

export default function MyExcelComponant() {
    const myData = [{
        'SNo': '1',
        'firstName': 'Anita',
        'lastName': 'Tripathi',
        'phone': '9922112886',
        'city': 'Bangalore'
    },
    {
        'SNo': '2',
        'firstName': 'Atul',
        'lastName': 'Tripathi',
        'phone': '9822752885',
        'city': 'Bangalore'
    },
    {
        'SNo': '3',
        'firstName': 'Manu',
        'lastName': '',
        'phone': '8484996096',
        'city': 'india'
    }, {
        'SNo': '4',
        'firstName': 'ambalika',
        'lastName': 'Tripathi',
        'phone': '9822621876',
        'city': 'Sonipat'
    }]
    return (
        <div>
            <h1 style={{ margin: '20%' }}>Export Excel</h1>
            <ExportExcel excelData={myData} fileName='testfile' buttonName='Export File'></ExportExcel>
        </div>
    )
}
