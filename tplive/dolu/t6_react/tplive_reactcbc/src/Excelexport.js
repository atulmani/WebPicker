import React from 'react'

import { async } from '@firebase/util';
import * as FileSaver from 'file-saver'
import { Button, Tooltip } from 'react-bootstrap';
import XLSX from 'sheetjs-style'

const ExportExcel = ({ excelData, fileName, buttonName }) => {
    console.log('in ExportExcel');
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);

    }

    return (
        <>
            {/* <Tooltip title='Excel Export'> */}
            <button type="button" className="mybutton button5"
                onClick={(e) => exportToExcel(fileName)} color='primary'
                style={{ cursor: "pointer", fontSize: '14' }}>{buttonName}</button>
            {/* </Tooltip> */}
        </>
    )
}

export default ExportExcel;