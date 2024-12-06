document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsContainer = document.getElementById('results-container');

    // Fetch JSON data
    async function fetchData() {
        const response = await fetch('Stratos_api.json');
        const data = await response.json();
        return data;
    }

    // Display results dynamically in the DOM
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <img src="${result.imageUrl || 'placeholder.jpg'}" alt="${result.name || 'No Name'}">
                <h3>${result.name || 'No Name Available'}</h3>
                <p>${result.description || 'No Description Available'}</p>
            `;
            resultsContainer.appendChild(div);
        });
    }

    // Helper: Search all string properties of an object
    function searchInObject(obj, query) {
        return Object.values(obj).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(query)
        );
    }

    // Perform search
    async function search() {
        const query = searchInput.value.toLowerCase(); // Get user query
        const data = await fetchData(); // Fetch data

        // Dynamically flatten data into a single array
        let results = [];
        for (const key in data) {
            if (Array.isArray(data[key])) {
                results = results.concat(data[key]);
            }
        }

        // Filter results based on query
        const filteredResults = results.filter(result => searchInObject(result, query));

        // Display the filtered results
        displayResults(filteredResults);
    }

    // Event Listeners
    searchBtn.addEventListener('click', search); // Search button click
    clearBtn.addEventListener('click', function () {
        searchInput.value = ''; // Clear input
        resultsContainer.innerHTML = ''; // Clear results
    });
});
