document.addEventListener('DOMContentLoaded', fetchData);
const term = 10;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function fetchData() {
    displayData(fetchVotingsData(id));
}

async function fetchVotingsData(seating) {
    const url = `https://api.sejm.gov.pl/sejm/term${term}/votings/${seating}`;
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
    const dataContainer = document.getElementById('dataVotingsContainer');
    dataContainer.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(v => {
            const votingElement = document.createElement('div');
            votingElement.className = 'container'
            votingElement.innerHTML = `
            <div>
                <h2>Voting number ${v.votingNumber}</h2>
                <p>${v.title}<p>
                <p>${v.topic}</p>
                <p>Total voted: ${v.totalVoted}</p>
                <div id='yes'>Yes:     ${v.yes}</div>
                <div id='no'>No:      ${v.no}</div>
                <div id='abstain'>Abstain: ${v.abstain}</div>
            </div>
            `;
            dataContainer.appendChild(votingElement);
        });
    } else {
        dataContainer.innerHTML = '<p>No data found for the specified term.</p>';
    }
}