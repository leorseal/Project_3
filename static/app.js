document.addEventListener("DOMContentLoaded", function() {
    initializePage();
});

function initializePage() {
    const idDropdown = d3.select('#selDataset');
    const columnDropdown = d3.select('#anotherDropdown');

    const initialData = diabetesData.find(data => data.Id == idDropdown.property('value'));

    displayDemographicInfo(initialData);
    updateBarChart(idDropdown.property('value'), columnDropdown.property('value'));
}

function optionChanged(id) {
    const column = d3.select('#anotherDropdown').property('value');
    updateBarChart(id, column);

    const selectedData = diabetesData.find(data => data.Id == id);
    displayDemographicInfo(selectedData);
}

function anotherOptionChanged(column) {
    const id = d3.select('#selDataset').property('value');
    updateBarChart(id, column);
}

function updateBarChart(id, column) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('column', column);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const trace = {
            x: ['Id', 'Mean Diabetes Positive', 'Mean Diabetes Negative'],
            y: [data.individual, data.mean_positive, data.mean_negative],
            type: 'bar',
            marker: {
                color: ['SteelBlue', 'DarkSalmon', 'MediumSeaGreen'],
                line: {
                    color: 'black',
                    width: 1.5
                }
            },
            width: [0.3, 0.3, 0.3] // Making bars slightly narrower
        };

        const layout = {
            title: {
                text: `Comparison of ID ${id} vs Mean of Sample Group`,
                font: {
                    size: 24,
                    family: "Arial Bold, sans-serif",
                    color: 'black'
                }
            },
            xaxis: createAxis('Category', 20, 14),
            yaxis: createAxis(column, 20, 14),
            barmode: 'group',
            bargap: 0.15,
            bargroupgap: 0.1,
            width: 780,   // Reduced width
            height: 500,  // Reduced height
            paper_bgcolor: 'rgba(245, 246, 249, 1)',
            plot_bgcolor: 'rgba(245, 246, 249, 1)',
            margin: {
                l: 70,  // Increased left margin
                r: 50,
                b: 60,  // Increased bottom margin
                t: 70,  // Increased top margin
                pad: 4
            },
            gridcolor: 'rgba(128, 128, 128, 0.1)'
        };

        Plotly.newPlot('bar', [trace], layout);
    });
}

function createAxis(titleText, titleSize, tickSize) {
    return {
        title: {
            text: titleText,
            font: {
                size: titleSize,
                color: 'black'
            },
            standoff: 20 // Increasing space between axis and title
        },
        tickfont: {
            size: tickSize,
            color: 'black'
        },
        tickangle: 0
    };
}


function displayDemographicInfo(data) {
    const demographicInfoBox = d3.select("#sample-metadata");
    demographicInfoBox.html("");  // Clear existing data

    Object.entries(data).forEach(([key, value]) => {
        demographicInfoBox.append("h6").text(`${key}: ${value}`);
    });

    updateOutcomeBox(data.Outcome);
}

function updateOutcomeBox(outcomeValue) {
    const outcomeBox = d3.select("#outcome-content");
    outcomeBox.html("");  // Clear previous content

    let textColor = 'black';  // Default color
    let outcomeText = "Unknown Outcome";

    switch (outcomeValue) {
        case 1:
            outcomeText = "Positive";
            textColor = 'DarkSalmon';  // Matching the color of the 'Mean Diabetes Positive' bar
            break;
        case 0:
            outcomeText = "Negative";
            textColor = 'MediumSeaGreen';  // Matching the color of the 'Mean Diabetes Negative' bar
            break;
    }

    outcomeBox.style('color', textColor).text(outcomeText);
}