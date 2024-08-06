document.getElementById('fetch-artworks').addEventListener('click', function() {
    const apiUrl = 'https://api.artic.edu/api/v1/artworks';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const artworks = data.data;
            const artworksContainer = document.getElementById('artworks-container');
            const artistCheckboxes = document.getElementById('artist-checkboxes');
            artworksContainer.innerHTML = ''; // Clear previous results
            artistCheckboxes.innerHTML = ''; // Clear previous checkboxes

            // Display artworks
            function displayArtworks(artworksToDisplay) {
                artworksContainer.innerHTML = ''; // Clear previous results
                artworksToDisplay.forEach(artwork => {
                    const artworkDiv = document.createElement('div');
                    artworkDiv.classList.add('artwork-item');
                    artworkDiv.innerHTML = `
                        <h2 class="artwork-title">${artwork.title}</h2>
                        <p class="artwork-date"><strong>Date:</strong> ${artwork.date_display || 'Unknown'}</p>
                        <img class="artwork-image" src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg" alt="${artwork.title}">
                        <p class="artwork-artist"><strong>Artist:</strong> ${artwork.artist_title || 'Unknown'}</p>
                    `;
                    artworksContainer.appendChild(artworkDiv);
                });
            }

            displayArtworks(artworks); // Display all artworks initially

            // Create checkboxes for artists
            const artists = artworks.map(artwork => artwork.artist_title).filter(Boolean);
            const uniqueArtists = [...new Set(artists)];

            uniqueArtists.forEach(artist => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = artist;
                checkbox.value = artist;
                checkbox.checked = true; // Initially check all checkboxes
                checkbox.addEventListener('change', function() {
                    filterArtworksByArtists(artworks);
                });

                const label = document.createElement('label');
                label.textContent = artist;
                label.setAttribute('for', artist);

                artistCheckboxes.appendChild(checkbox);
                artistCheckboxes.appendChild(label);
                artistCheckboxes.appendChild(document.createElement('br'));
            });

            function filterArtworksByArtists(artworks) {
                const selectedArtists = Array.from(document.querySelectorAll('#artist-checkboxes input:checked'))
                                             .map(checkbox => checkbox.value);

                const filteredArtworks = artworks.filter(artwork => 
                    selectedArtists.length === 0 || selectedArtists.includes(artwork.artist_title)
                );

                displayArtworks(filteredArtworks); // Display filtered artworks
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('go-home').addEventListener('click', function() {
    window.location.href = "index.html";
});
