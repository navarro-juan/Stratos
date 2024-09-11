document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsContainer = document.getElementById('results-container');

    async function fetchData() {
        const response = await fetch('Stratos_api.json');
        const data = await response.json();
        return data;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <img src="${result.imageUrl}" alt="${result.name}">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
            `;
            resultsContainer.appendChild(div);
        });
    }

    async function search() {
        const query = searchInput.value.toLowerCase();
        const data = await fetchData();

        // Flatten data to search across different categories
        let results = [];
        data.countries.forEach(country => {
            results = results.concat(country.cities);
        });
        data.temples.forEach(temple => {
            results.push(temple);
        });
        data.beaches.forEach(beach => {
            results.push(beach);
        });

        // Filter results based on the search query
        const filteredResults = results.filter(result => 
            result.name.toLowerCase().includes(query) ||
            result.description.toLowerCase().includes(query)
        );

        displayResults(filteredResults);
    }

    searchBtn.addEventListener('click', search);

    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    });
});
