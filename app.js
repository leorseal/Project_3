const url = 'https://raw.githubusercontent.com/leorseal/Project_3/main/Healthcare-Diabetes.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    // Call a function to populate the dropdown after data is loaded
    populateDropdown(data);
});

function populateDropdown(data) {
    var dropdownbox = d3.select("#selDataset");
    data.forEach(function(item) {
        dropdownbox.append("option").text(item.id).property("value", item.id);
    });
}

// Call the initialization function
init();

function init() 