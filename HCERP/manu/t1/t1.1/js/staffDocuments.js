

// staff documents card - start

function moreOptionBtn(moreDiv) {
    moreDiv.classList.toggle('show');
}

// staff documents card - end

// add staff feilds - start

function showAddDocumentFeilds() {
    var addDocumentFeildSelect = document.getElementById('addDocumentFeildSelect');
    var addDocumentFeildDiv = document.getElementById('addDocumentFeildDiv');
    var addDocumentFeildImg = document.getElementById('addDocumentFeildImg');
    var addDocumentFeildName = document.getElementById('addDocumentFeildName');
    var addDocumentFeildInput = document.getElementById('addDocumentFeildInput');
    var addDocumentFeildPlaceholder = document.getElementById('addDocumentFeildPlaceholder');

    var documentType = addDocumentFeildSelect.options[addDocumentFeildSelect.selectedIndex].value;

    if (documentType === 'Document Type') {
        addDocumentFeildDiv.classList.remove('open');
    } else {
        addDocumentFeildDiv.classList.add('open');
    }

    if (documentType === 'Aadhar Card') {
        addDocumentFeildImg.src = './img/upload_aadhar.svg';
        addDocumentFeildInput.maxLength = '14';
        document.getElementById('addDocumentFeildInput').addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });
    } else if (documentType === 'PAN Card') {
        addDocumentFeildImg.src = './img/upload_pan.svg';
        addDocumentFeildInput.maxLength = '10';
    } else if (documentType === 'Driving License') {
        addDocumentFeildImg.src = './img/upload_dl.svg';
        addDocumentFeildInput.maxLength = '30';
    } else if (documentType === 'Document 4') {
        addDocumentFeildImg.src = './img/upload_document.svg';
        addDocumentFeildInput.maxLength = '30';
    } else if (documentType === 'Document 5') {
        addDocumentFeildImg.src = './img/upload_document.svg';
        addDocumentFeildInput.maxLength = '30';
    }

    addDocumentFeildName.innerHTML = documentType;
    addDocumentFeildPlaceholder.innerHTML = documentType + ' Number';

    console.log(addDocumentFeildInput);
}

// add staff feilds - end