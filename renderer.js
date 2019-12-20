let {PythonShell} = require('python-shell');
var {ipcRenderer} = require('electron');
const { dialog } = require('electron').remote;
console.log(dialog);
fs = require('fs');

// Add event listeners
var button1 = $("#text");
var button2 = $("#file-down");
var button3 = $("#inline")
var uploader = $("#file-up");
var result  = $("#result");
var form = $("#example-template-form");
var devToolsButton = $("#dev-tools");


devToolsButton.on('click', function(event){
  // create an event and send it to the main.js file to handle
  ipcRenderer.send("toggle-dev-tools");
  // alternatively use require('electron').remote to access the main.js file
});

button1.on('click', function(event) {
  // Run this script once and get the results
  // data is an array consisting of messages collected during execution  
  PythonShell.run('./get-text.py', null, function  (err, data)  {
    result.html("Text response: <br/>" + data.join("<br/>" ));
  });

});


form.on("submit",function(event){
  // Dont submit the form... just run inline code
  event.preventDefault();
  inlineCode = $("#inline").val();
  PythonShell.runString(inlineCode, null, function (err, data) {
    if (err) throw err;
    result.text("Result: " + String(data) );
  });
});

// Process a file with python
uploader.on('click', function(event){

  // Select the files
  var filePaths = dialog.showOpenDialog({
    title: "Select XML files",
    filters: [
      { name: 'Xml', extensions: ['xml'] }
    ],
    properties : ["multiSelections"]
  });

  // Send the python files as args to script
  let options = {
    mode: 'text',
    args: filePaths,
  };
   
  PythonShell.run('./handle-files.py', options, function (err, responses) {
    if (err) throw err;
    // clear response box
    result.text("");
    // write responses
    for ( var response of responses){
      result.append(response);
      result.append("<br/>")
    }
  });


  
});

// Get a file from disk
button2.on('click',function(event){
  // window.alert("Yep you done clicked it.");
  var shell = PythonShell.run('./get-file.py', null , function (err,data) {
  console.log(err,data);
  if (data && data.length > 0){
    window.open(data[0]);
  }

  });

  shell.on('data', function(datas){
    console.log(datas);
  });

  shell.on("end", function(data){
    console.log({ended: 1, data, stdout : shell.stdout });
  })

});

