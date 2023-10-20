// Constants for data URLs
const DATA_URL = "/";  // Change this to your Flask data endpoint

// Initialization function
function init() {
    d3.json(DATA_URL).then(function (data) {
        const names = data.names;
        const dropdown = d3.select('#selDataset');
        names.forEach(name => dropdown.append('option').text(name));
        const initialId = names[0];
        updatePlotly(initialId);
    });
}

// Update the plot
function updatePlotly(id) {
    d3.json(DATA_URL).then(function (data) {
        const samples = data.samples.find(sample => sample.id === id);
        const { sample_values, otu_ids, otu_labels } = samples;

        const metadata = data.metadata.find(metadata => metadata.id === parseInt(id));
        displayDemographicInfo(metadata);

        createBarChart(sample_values, otu_ids, otu_labels);
        createBubbleChart(otu_ids, sample_values, otu_labels);
        plotGaugeChart(metadata.wfreq);
    });
}

// Display demographic information
function displayDemographicInfo(metadata) {
    const sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html('');
    Object.entries(metadata).forEach(([key, value]) => {
        sampleMetadata.append('p').text(`${key}: ${value}`);
    });
}

// Create the bar chart
function createBarChart(values, ids, labels) {
    const trace1 = {
        x: values.slice(0, 10).reverse(),
        y: ids.slice(0, 10).map(id => "OTU " + id).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'DeepSkyBlue',
            opacity: 0.6,
            line: {
                color: 'DarkBlue',
                width: 1.5
            }
        }
    };

    const layout1 = {
        title: '<b>Top 10 OTU</b>',
    };

    const data = [trace1];
    Plotly.newPlot('bar', data, layout1);
}

// Create the bubble chart
function createBubbleChart(otu_ids, sample_values, otu_labels) {
    const trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values
        }
    };

    const layout2 = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        showlegend: false,
        margin: {
            l: 150,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        }
    };

    const data2 = [trace2];
    Plotly.newPlot('bubble', data2, layout2);
}
// Call updatePlotly
function optionChanged(id) {
    updatePlotly(id);
}

init();
