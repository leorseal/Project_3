let Ids=[]
let PregnanciesNumbers=[]
let Glucoses=[]
let BloodPressures=[]
let SkinThicknesses=[]
let Insulins=[]
let BMIs=[]
let DiabetesPedigreeFunctions=[]
let Ages=[]
let Outcomes=[]
const myArray=[1,2,3,4,5];
for (let i=0;i<Results.length;i++) {
  row=Results[i];
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
};


let trace1={x:Glucoses, y: Outcomes, text:"Glucose Levels", name:"Glucose",type:"bar"};
let layout1={title:"Glucose Levels Vs. Outcome",barmode:"group",margin:{l:50,r:50,b:200,t:50,pad:4}};
let trace2={x:BloodPressures, y: Outcomes, text:"BloodPressure Levels", name:"BloodPressure", type:"bar"};
let layout2={title:"BloodPressure Levels Vs. Outcome",barmode:"group",margin:{l:50,r:50,b:200,t:50,pad:4}};
let trace3={x:Ages, y: Outcomes, text:"Ages", name:"Age",type:"bar"};
let layout3={title:"Ages Vs. Outcome",barmode:"group",margin:{l:50,r:50,b:200,t:50,pad:4}};
let trace4={x:BMIs, y: Outcomes, text:"BMIs", name:"BMI",type:"bar"};
let layout4={title:"BMIs Vs. Outcome",barmode:"group",margin:{l:50,r:50,b:200,t:50,pad:4}};
let data=[trace1,trace2,trace3,trace4]

Plotly.newPlot("plot",data,layout1)
// Plotly.newplot("plot",data1,layout1);  
// Plotly.newplot("plot",data2,layout2);  
// Plotly.newplot("plot",data3,layout3); 
// Plotly.newplot("plot",data4,layout4);
