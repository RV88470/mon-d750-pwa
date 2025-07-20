if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/mon-d750-pwa/service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré avec succès:', registration);
            })
            .catch(error => {
                console.log('Échec de l\'enregistrement du Service Worker:', error);
            });
    });
}