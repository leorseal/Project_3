document.addEventListener("DOMContentLoaded", function() {
    initializePage();
});

function initializePage() {
    const idDropdown = d3.select('#selDataset');
    const columnDropdown = d3.select('#anotherDropdown');

    const initialData = diabetesData.find(data => data.Id == idDropdown.property('value'));

    displayDemographicInfo(initialData);
    updateBarChart(idDropdown.property('value'), columnDropdown.property('value'));

    drawPieChart(outcomeCounts); 
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
            width: [0.3, 0.3, 0.3] 
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
            width: 780,   
            height: 500,  
            paper_bgcolor: 'rgba(245, 246, 249, 1)',
            plot_bgcolor: 'rgba(245, 246, 249, 1)',
            margin: {
                l: 70,  
                r: 50,
                b: 60,  
                t: 70,  
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
            standoff: 20 
        },
        tickfont: {
            size: tickSize,
            color: 'black'
        },
        tickangle: 0
    };
}

function drawPieChart(outcomeCounts) {
    const data = [{
        values: [outcomeCounts['0'], outcomeCounts['1']],
        labels: ['Negative', 'Positive'],
        type: 'pie',
        textinfo: 'label+percent',
        insidetextorientation: 'radial',
        marker: {
            colors: ['MediumSeaGreen', 'DarkSalmon'],
            line: {
                color: 'black',
                width: 2  
            }
        },
        pull: [0.1, 0.1]  
    }];

    const layout = {
        title: {
            text: 'Distribution of Outcomes',
            font: {
                size: 24,
                family: "Arial Bold, sans-serif",
                    olor: 'black'
            }
        },
        height: 500,
        width: 500
    };

    Plotly.newPlot('pie', data, layout);
}


function displayDemographicInfo(data) {
    const demographicInfoBox = d3.select("#sample-metadata");
    demographicInfoBox.html("");  

    Object.entries(data).forEach(([key, value]) => {
        demographicInfoBox.append("h6").html(`<b>${key}</b>: ${value}`);
    });

    updateOutcomeBox(data.Outcome);
}


function updateOutcomeBox(outcomeValue) {
    const outcomeBox = d3.select("#outcome-content");
    outcomeBox.html("");  

    let textColor = 'black';  
    let outcomeText = "Unknown Outcome";

    switch (outcomeValue) {
        case 1:
            outcomeText = "Positive";
            textColor = 'DarkSalmon';  
            break;
        case 0:
            outcomeText = "Negative";
            textColor = 'MediumSeaGreen';  
            break;
    }

    outcomeBox.style('color', textColor).text(outcomeText);
}