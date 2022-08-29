function openFilterAdvancePopup() {
    var advanceSearchPopup = document.getElementById('advanceSearchPopup');

    advanceSearchPopup.style.opacity = '1';
    advanceSearchPopup.style.pointerEvents = 'all';
}

function closeFilterAdvancePopup() {
    var advanceSearchPopup = document.getElementById('advanceSearchPopup');

    advanceSearchPopup.style.opacity = '0';
    advanceSearchPopup.style.pointerEvents = 'none';
}