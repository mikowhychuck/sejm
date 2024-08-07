document.addEventListener('DOMContentLoaded', fetchMPDetail);
const term = 10;

function fetchMPDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const mpId = urlParams.get('id');

    if (mpId) {
        const url = `https://api.sejm.gov.pl/sejm/term${term}/MP/${mpId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayMPDetail(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    } else {
        document.getElementById('mpContainer').innerHTML = '<p>Invalid MP ID.</p>';
    }
}

function displayMPDetail(mp) {
    const mpContainer = document.getElementById('mpContainer');
    mpContainer.innerHTML = '';

    const mpElement = document.createElement('div');
    mpElement.className = 'mp-detail';
    mpElement.innerHTML = `
        <img src="https://api.sejm.gov.pl/sejm/term${term}/MP/${mp.id}/photo" alt="${mp.firstLastName}">
        <div>
            <h2>${mp.firstLastName}</h2>
            <img src="https://api.sejm.gov.pl/sejm/term${term}/clubs/${mp.club}/logo" alt="${mp.club}">
            <p>Constituency: ${mp.districtName}</p>
            <p>Profession: ${mp.profession}</p>
            <p>Number of votes: ${mp.numberOfVotes}</p>
            <p>Education level: ${mp.educationLevel}</p>
        </div>
    `;
    mpContainer.appendChild(mpElement);
}
