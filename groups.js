document.addEventListener('DOMContentLoaded', fetchGroupsData);
const term = 10;

function fetchGroupsData() {
    const url = `https://api.sejm.gov.pl/sejm/term${term}/clubs`;

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
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    if (data && data.length > 0) {
        data.sort((a, b) => b.membersCount - a.membersCount);

        data.forEach(club => {
            const clubElement = document.createElement('div');
            clubElement.className = 'container';
            clubElement.innerHTML = `
                <div class='club-container'>
                    <img src="https://api.sejm.gov.pl/sejm/term${term}/clubs/${club.id}/logo" alt="${club.id}">
                    <div class="club-details">
                        <h3><a href="group.html?id=${club.id}">${club.name}</a></h3>
                        <p>members: ${club.membersCount} </br>
                        email: ${club.email} </br>
                        phone: ${club.fax}</p>
                    </div>
                </div>
            `;
            dataContainer.appendChild(clubElement);
        });
    } else {
        dataContainer.innerHTML = '<p>No data found for the specified term.</p>';
    }
}
