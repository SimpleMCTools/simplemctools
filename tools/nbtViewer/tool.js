import * as NBT from "https://cdn.jsdelivr.net/npm/nbtify@2.1.0/+esm";
import { WebLogger } from "./../../WebLogger.js";

const logger = new WebLogger('logger');
const inputFile = document.getElementById("inputFile");
const jsonViewer = document.getElementById("jsonViewer");
const downloadBtn = document.getElementById("downloadBtn")

inputFile.addEventListener("change", async (event) => {
    logger.clear();
    const file = event.target.files[0];
    globalThis.userInputedFile = file;
    if (!file) {
        logger.error("No file selected.");
        return;
    }
    logger.info("File selected: " + file.name);

    const arrayBuffer = await file.arrayBuffer();

    try {
        const nbtData = await NBT.read(arrayBuffer);
        globalThis.nbtData = nbtData;
    } catch (error) {
        logger.error("Failed to read NBT data");
        return;
    }
    
    logger.info("Stringifying NBT data for JSON viewer...");
    const jsonData = JSON.stringify(nbtData, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value, 2
    );

    logger.info("Writing data to JSON viewer...");
    console.log(jsonViewer)
    jsonViewer.data = JSON.parse(jsonData);
    logger.info("Successfully extracted NBT data from the file.");

    globalThis.jsonData = jsonData;
});

downloadBtn.addEventListener("click", () => {
    // for downloading the file
    try {
        const blob = new Blob([globalThis.jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const download = document.createElement("a")
        
        download.href = url
        download.download = `${userInputedFile.name}.simplemctools.json`
        download.click()
    } catch(error) {
        console.error(error)
    }
});

