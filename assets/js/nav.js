document.addEventListener('DOMContentLoaded', () => {
    fetch('../partials/nav.html')
        .then(response => response.text())
        .then(data => {
            const navContainer = document.createElement('div');
            navContainer.innerHTML = data;
            document.body.insertAdjacentElement('afterbegin', navContainer);
        })
        .catch(error => console.error('Error loading navigation:', error));
});