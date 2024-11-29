// Function to open the modal
function openModal() {
    document.getElementById('membershipModal').style.display = 'block';
}
function openModal2(){
    document.getElementById('membershipHistory').style.display = 'block';
}
// Function to close the modal
function closeModal() {
    document.getElementById('membershipModal').style.display = 'none';
    document.getElementById('membershipHistory').style.display = 'none';
}

// Add event listener to close modal when clicked outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('membershipModal')) {
        closeModal();
    }
    if (event.target === document.getElementById('membershipHistory')) {
        closeModal();
    }
    
}

