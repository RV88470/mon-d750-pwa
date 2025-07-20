// app.js

// Enregistrement du Service Worker pour la PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Logique de filtrage du tableau
document.addEventListener('DOMContentLoaded', () => {
    const filterNav = document.getElementById('filter-nav');
    const tableRows = document.querySelectorAll('#settings-table tbody tr');

    filterNav.addEventListener('click', (event) => {
        let filterItem = event.target.closest('.filter-item');

        if (filterItem) {
            // Supprime la classe 'active' de tous les éléments de filtre
            document.querySelectorAll('.filter-item').forEach(item => {
                item.classList.remove('active');
            });

            // Ajoute la classe 'active' à l'élément cliqué
            filterItem.classList.add('active');

            const filterValue = filterItem.dataset.filter; // 'all' ou le type de photo

            tableRows.forEach(row => {
                const typeDePhoto = row.children[0].textContent; // La première colonne contient le type de photo
                
                if (filterValue === 'all' || typeDePhoto.includes(filterValue)) {
                    row.classList.remove('hidden');
                } else {
                    row.classList.add('hidden');
                }
            });
        }
    });
});