let diabetesData;

document.addEventListener("DOMContentLoaded", function() {
    const idDropdown = d3.select('#selDataset');
    const columnDropdown = d3.select('#anotherDropdown');

    // Fetch the initial data
    fetchData();

    // Assuming the data is fetched synchronously (this might not be the case, and adjustments would be needed)
    let initialData = diabetesData.find(data => data.Id == idDropdown.property('value'));
    displayDemographicInfo(initialData);
    updateBarChart(idDropdown.property('value'), columnDropdown.property('value'));
});

function optionChanged(id) {
    const column = d3.select('#anotherDropdown').property('value');
    updateBarChart(id, column);

    // Get the selected data based on the chosen ID
    let selectedData = diabetesData.find(data => data.Id == id);
    displayDemographicInfo(selectedData);
}

function anotherOptionChanged(column) {
    const id = d3.select('#selDataset').property('value');
    updateBarChart(id, column);
}

function fetchData() {
    // Fetching data from the "/" endpoint using GET
    fetch('/')
        .then(response => response.json())
        .then(data => {
            diabetesData = data.records;
            init();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function init() {
    const dropdown = d3.select("#selDataset");
    diabetesData.forEach(record => {
        dropdown.append("option").text(record.Id).property("value", record.Id);
    });
}

function updateBarChart(id, column) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('column', column);

    // Posting data to the same "/" endpoint for processing and getting back bar chart data
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const trace = {
            x: ['Individual', 'Mean'],
            y: [data.individual, data.mean],
            type: 'bar',
            marker: {
                color: ['SteelBlue', 'DarkSalmon']
            },
            width: [0.4, 0.4]
        };
        const layout = {
            title: {
                text:`Comparison of ID ${id} vs Mean of Sample Group`,
                font: {
                    size: 19,
                    color: 'black'
                }
            },
            xaxis: {
                title: {
                    text: 'Category',
                    font: {
                        size: 16,
                        color: 'black'
                    }
                },
                tickfont: {
                    size: 16,
                    color: 'black'
                }
            },
            yaxis: {
                title: {
                    text: column,
                    font: {
                        size: 16,
                        color: 'black'
                    }
                },
                tickfont: {
                    size: 16,
                    color: 'black'
                }
            },
            barmode: 'group',
            bargap: 0.15,
            bargroupgap: 0.1
        };
        Plotly.newPlot('bar', [trace], layout);
    });
}

function displayDemographicInfo(metadata) {
    const sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html('');
    Object.entries(metadata).forEach(([key, value]) => {
        sampleMetadata.append('p').text(`${key}: ${value}`);
    });
}
