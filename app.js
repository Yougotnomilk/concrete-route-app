const routeStages = [
    { x: -484.3, y: -3134.9, z: 6.1, label: 'Elysian Island Waste Deposit (Toxic Waste)' },
    { x: 965.7, y: -3004.5, z: 5.9, label: 'Chemical Laboratories (Acid)' },
    { x: -1606.3, y: 4830.9, z: 10.4, label: 'Land Act Reservoir (Unfiltered Water)' },
    { x: -207.1, y: 6225.8, z: 31.5, label: 'Water Treatment Plant (Treated Water)' },
    { x: 1134.7, y: 2185.5, z: 56.4, label: 'Logging Camp (Logs)' },
    { x: 972.3, y: 1382.8, z: 362.2, label: 'Sawmill (Sawdust)' },
    { x: 2954.4, y: 2798.8, z: 43.5, label: 'Quarry (Quarry Rubble)' },
    { x: 2386.8, y: 2864.6, z: 43.5, label: 'Filtering Plant (Gravel, Sand, Cement Mix)' },
    { x: -519.8, y: 210.6, z: 82.4, label: 'Alta Construction Site (Final Export)' }
];

document.getElementById('startRouteBtn').addEventListener('click', () => {
    // Hide the UI container
    document.getElementById('appContainer').style.display = 'none';

    // Clear any existing blips or waypoints
    sendMessage('clearRoute');

    // Start routing stages
    routeStages.forEach((stage, index) => {
        setTimeout(() => {
            sendMessage('setBlip', { x: stage.x, y: stage.y, z: stage.z, label: stage.label });
            sendMessage('setWaypoint', { x: stage.x, y: stage.y });
            sendMessage('notify', { text: `Next stop: ${stage.label}` });
        }, index * 3000);
    });
});

function sendMessage(type, payload = {}) {
    fetch(`https://${GetParentResourceName()}/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(console.error);
}
