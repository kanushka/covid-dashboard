window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    getSummary();
});


// fetch covid-19 data summary
function getSummary() {
    console.log('getting covid-19 summary');
    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setGlobalData(data.Global);
            setSriLankaData(data.Countries);
        });
}

function setGlobalData(global) {
    console.log('updating global data');
    document.getElementById("resultsDate").innerText = moment(global.Date).format('MMMM Do YYYY, h:mm:ss a');;
    document.getElementById("newConfirmed").innerText = numberWithCommas(global.NewConfirmed);
    document.getElementById("newDeaths").innerText = numberWithCommas(global.NewDeaths);
    document.getElementById("newRecovered").innerText = numberWithCommas(global.NewRecovered);
    document.getElementById("totalConfirmed").innerText = numberWithCommas(global.TotalConfirmed);
    document.getElementById("totalDeaths").innerText = numberWithCommas(global.TotalDeaths);
    // document.getElementById("totalRecovered").innerText = numberWithCommas(global.TotalRecovered);
    animateValue(document.getElementById("totalRecovered"), 0, global.TotalRecovered, 2000);

    // this can be done using foreach loop
}

function setSriLankaData(countries) {

    lkData = countries.find(country => country.Slug === "sri-lanka");

    console.log('updating sri lanka data');
    document.getElementById("resultsDateLk").innerText = moment(lkData.Date).format('MMMM Do YYYY, h:mm:ss a');;
    document.getElementById("newConfirmedLk").innerText = numberWithCommas(lkData.NewConfirmed);
    document.getElementById("newDeathsLk").innerText = numberWithCommas(lkData.NewDeaths);
    document.getElementById("newRecoveredLk").innerText = numberWithCommas(lkData.NewRecovered);
    document.getElementById("totalConfirmedLk").innerText = numberWithCommas(lkData.TotalConfirmed);
    document.getElementById("totalDeathsLk").innerText = numberWithCommas(lkData.TotalDeaths);
    document.getElementById("totalRecoveredLk").innerText = numberWithCommas(lkData.TotalRecovered);

    // showChart(lkData.TotalConfirmed, lkData.TotalDeaths, lkData.TotalRecovered);
}

function showChart(confirmed, death, recovered) {
    const data = {
        labels: [
            'TotalConfirmed',
            'TotalDeaths',
            'TotalRecovered'
        ],
        datasets: [ {
            label: 'Sri Lanka COVID-19 Summary',
            data: [ confirmed, death, recovered ],
            backgroundColor: [
                'yellow',
                'red',
                'green'
            ],
            hoverOffset: 4
        } ]
    };
    const config = {
        type: 'doughnut',
        data: data,
    };
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, config);
}

function numberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = numberWithCommas(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}