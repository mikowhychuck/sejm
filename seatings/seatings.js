document.addEventListener('DOMContentLoaded', fetchSeatings);
const term = 10;

async function fetchSeatings() {
    let i = 1;
    while (await fetchVotingsData(i)) {
        i++;
    }
    displayData(i);
}

async function fetchVotingsData(seating) {
    const url = `https://api.sejm.gov.pl/sejm/term${term}/votings/${seating}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const dataLength = JSON.stringify(data).length;
        console.log(dataLength)
        if (!response.ok) {
            return false; 
        }
        if (dataLength < 5) {
            return false;
        }
        window.mpsData = window.mpsData || [];
        window.mpsData.push(data);
        return true; 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return false;
    }
}

function displayData(num) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    if (window.mpsData && window.mpsData.length > 0) {
        for (let i = 1; i < num; i++) {
            const seatingElement = document.createElement('div');
            seatingElement.className = 'seating-container';
            seatingElement.innerHTML = `<a href="votings.html?id=${i}">${i}</a>`;
            dataContainer.appendChild(seatingElement);
        }
    } else {
        dataContainer.innerHTML = '<p>No data found for the specified term.</p>';
    }
}
