if (!listing.geometry || !listing.geometry.coordinates) {
    console.log("No coordinates found");
} else {
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: "mapbox://styles/mapbox/streets-v11",
        center: listing.geometry.coordinates,
        zoom: 9
    });

    new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .addTo(map);
}