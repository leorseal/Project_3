let Ids = [];
let PregnanciesNumbers = [];
let Glucoses = [];
let BloodPressures = [];
let SkinThicknesses = [];
let Insulins = [];
let BMIs = [];
let DiabetesPedigreeFunctions = [];
let Ages = [];
let Outcomes = [];
const myArray = [1, 2, 3, 4, 5];

for (let i = 0; i < Results.length; i++) {
    row = Results[i];
    Ids.push(row.Id);
    PregnanciesNumbers.push(row.Pregnancies);
    Glucoses.push(row.Glucose);
    BloodPressures.push(row.BloodPressure);
    SkinThicknesses.push(row.SkinThickness);
    Insulins.push(row.Insulin);
    BMIs.push(row.BMI);
    DiabetesPedigreeFunctions.push(row.DiabetesPedigreeFunction);
    Ages.push(row.Age);
    Outcomes.push(row.Outcome);
}

let colors = [];
for (let i = 0; i < Outcomes.length; i++) {
    if (Outcomes[i] === 0) {
        colors.push("blue"); // Color for outcome 0
    } else {
        colors.push("red"); // Color for outcome 1
    }
}

let trace1 = { x: Glucoses, y: Outcomes, text: "Glucose Levels", name: "Glucose", type: "bar", marker: {color: colors} };
let layout1 = { title: "Glucose Levels Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };
let trace2 = { x: DiabetesPedigreeFunctions, y: Outcomes, text: "Diabetes Pedigree Functions", name: "BloodPressure", type: "bar", marker: {color: colors} };
let layout2 = { title: "Diabetes Pedigree Functions Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };
let trace3 = { x: Ages, y: Outcomes, text: "Ages", name: "Age", type: "bar", marker: {color: colors} };
let layout3 = { title: "Ages Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };
let trace4 = { x: BMIs, y: Outcomes, text: "BMIs", name: "BMI", type: "bar", marker: {color: colors} };
let layout4 = { title: "BMIs Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };
let trace5 = { x: PregnanciesNumbers, y: Outcomes, text: "PregnanciesNumbers", name: "PregnanciesNumbers", type: "bar", marker: {color: colors} };
let layout5 = { title: "Pregnancies Number Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };
let trace6 = { x: DiabetesPedigreeFunctions, y: Outcomes, text: "DiabetesPedigreeFunctions", name: "DiabetesPedigreeFunctions", type: "bar", marker: {color: colors} };
let layout6 = { title: "DiabetesPedigreeFunctions Vs. Outcome", barmode: "group", margin: { l: 50, r: 50, b: 200, t: 50, pad: 4 } };

let data1 = [trace1];
let data2 = [trace2];
let data3 = [trace3];
let data4 = [trace4];
let data5 = [trace5];
let data6 = [trace6];

Plotly.newPlot("plot1", data1, layout1);
Plotly.newPlot("plot2", data2, layout2);
Plotly.newPlot("plot3", data3, layout3);
Plotly.newPlot("plot4", data4, layout4);
Plotly.newPlot("plot5", data5, layout5);
Plotly.newplot("plot6", data6, layout6);