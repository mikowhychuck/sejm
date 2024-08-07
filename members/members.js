document.addEventListener('DOMContentLoaded', fetchMPData);
const term = 10;

function fetchMPData() {
    const url = `https://api.sejm.gov.pl/sejm/term${term}/MP`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
            window.mpsData = data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayData(data) {
    const dataContainer = document.getElementById('dataMembersContainer');
    dataContainer.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(mp => {
            const mpElement = document.createElement('div');
            mpElement.className = 'mp-info';
            mpElement.innerHTML = `

                <div class="mp-info">
                    <div class="mp-details">
                        <img src="https://api.sejm.gov.pl/sejm/term${term}/MP/${mp.id}/photo-mini" alt="${mp.firstLastName}">
                        <h3><a href="mp.html?id=${mp.id}">${mp.firstLastName}</a></h3>
                        <p>Parliament group: ${mp.club}</p>
                        <img class='club-logo' src="https://api.sejm.gov.pl/sejm/term${term}/clubs/${mp.club}/logo" alt="${mp.club}">
                        <p>Constituency: ${mp.districtName}</p>
                    </div>
                </div>
            `;
            dataContainer.appendChild(mpElement);
        });
    } else {
        dataContainer.innerHTML = '<p>No data found for the specified term.</p>';
    }
}

function filterMPs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = window.mpsData.filter(mp => mp.firstLastName.toLowerCase().includes(searchInput));
    displayData(filteredData);
}