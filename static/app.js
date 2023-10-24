document.addEventListener("DOMContentLoaded", function() {
  const idDropdown = d3.select('#selDataset');
  const columnDropdown = d3.select('#anotherDropdown');

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
          x: ['Id', 'Mean Diabetes Positive', 'Mean Diabetes Negative'],
          y: [data.individual, data.mean_positive, data.mean_negative],
          type: 'bar',
          marker: {
              color: ['SteelBlue', 'DarkSalmon', 'MediumSeaGreen']
          },
          width: [0.4, 0.4, 0.4]
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
              },
              tickangle: -10
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
          bargroupgap: 0.1,
          width: 785,  // Set the width of the graph
          height: 600  // Set the height of the graph
      };

      Plotly.newPlot('bar', [trace], layout);
  });
}

function displayDemographicInfo(data) {
  let demographicInfoBox = d3.select("#sample-metadata");

  // First, clear out any existing data
  demographicInfoBox.html("");

  // Now append key-value pairs to the panel
  Object.entries(data).forEach(([key, value]) => {
      demographicInfoBox.append("h6").text(`${key}: ${value}`);
  });
}



