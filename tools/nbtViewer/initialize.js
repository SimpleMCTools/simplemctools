export async function initialize() {
    // setting up html stuff
    console.log("Initializing tool");

    const main = document.querySelector('main');
    main.innerHTML = `
        <div>
            <h1>NBT Viewer</h1>
            <input type="file" id="inputFile">
            <br><br>
            <div id="logger"><h2>logger</h2></div>
            <br><br>
            <andypf-json-viewer id="jsonViewer"></andypf-json-viewer>
        </div>
    `;

    console.log("HTML setup complete");

    // setting up the json viewer
    const jsonViewer = document.getElementById("jsonViewer");
    jsonViewer.id = "jsonViewer"
    jsonViewer.expanded = 2
    jsonViewer.indent = 2
    jsonViewer.showDataTypes = true
    jsonViewer.theme = "monokai"
    jsonViewer.showToolbar = true
    jsonViewer.showSize = true
    jsonViewer.showCopy = true
    jsonViewer.expandIconType = "square"
    jsonViewer.expandEmpty = false
    jsonViewer.data="You will see the NBT data here after selecting a file.";

    // sett


    // execute the script

    import("./tool.js")
}