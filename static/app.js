document.addEventListener("DOMContentLoaded", function() {
  const idDropdown = document.getElementById('selDataset');
  const columnDropdown = document.getElementById('anotherDropdown');

  // Display the initial ID's data
  let initialData = diabetesData.find(data => data.Id == idDropdown.value);
  displayDemographicInfo(initialData);

  updateBarChart(idDropdown.value, columnDropdown.value);

  // Display pie chart on load
  updatePieChart();
});

function optionChanged(id) {
  const column = document.getElementById('anotherDropdown').value;
  updateBarChart(id, column);

  // Get the selected data based on the chosen ID
  let selectedData = diabetesData.find(data => data.Id == id);
  displayDemographicInfo(selectedData);
}

function anotherOptionChanged(column) {
  const id = document.getElementById('selDataset').value;
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

function updatePieChart() {
  const pieData = [{
    values: [outcomeCounts["0"], outcomeCounts["1"]],
    labels: ['0', '1'],
    type: 'pie'
  }];

  const pieLayout = {
    title: "Outcomes Distribution",
    height: 400,
    width: 500
  };

  Plotly.newPlot('pie', pieData, pieLayout);
}
