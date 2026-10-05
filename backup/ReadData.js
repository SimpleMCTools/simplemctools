import * as NBT from "https://cdn.jsdelivr.net/npm/nbtify@2.1.0/+esm";
import { WebLogger } from "./WebLogger.js";

const logger = new WebLogger('logger');
const inputFile = document.getElementById('inputFile');
const jsonViewer = document.getElementById('view-json');

inputFile.addEventListener('change', async function(event) {
    jsonViewer.data = null; // Clear previous data

    logger.info("Clearing logs...");
    logger.clear();

    logger.info("Running SimpleMCTools")
    const file = event.target.files[0];
    
    if (!file) {
        return;
    };
    logger.info("File selected: " + file.name);
    
    try {
        const rawData = await file.arrayBuffer();
        const nbtData = await NBT.read(rawData);

        globalThis.nbtData = nbtData; // Store the NBT data in a global variable

        console.log(JSON.stringify(nbtData, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value, 2
        ));

        logger.info("Successfully retrieved nbt data")
        if (nbtData.data.LevelName) {
            logger.info("World Name: " + nbtData.data.LevelName)
        } else { logger.warn("World Name not found in NBT data") }
        
    }
    catch (error) {
        logger.error("Error reading NBT data");
        return;
    }

    // Detecting IsHardcore property
    if ("IsHardcore" in nbtData.data) {
    } else { logger.warn("IsHardcore property not found in NBT data") }
    
    // Toggling Hardcore Mode
    if (nbtData.data.IsHardcore === 1) {
        logger.info("World is in Hardcore mode, Switching it to regular survival mode...");
        nbtData.data.IsHardcore = 0;
    } else { 
        logger.info("World is not in Hardcore mode, Switching it to Hardcore mode...") 
        nbtData.data.IsHardcore = 1;
    };
    
    jsonViewer.id = "json"
    jsonViewer.expanded = 2
    jsonViewer.indent = 2
    jsonViewer.showDataTypes = true
    jsonViewer.theme = "monokai"
    jsonViewer.showToolbar = true
    jsonViewer.showSize = true
    jsonViewer.showCopy = true
    jsonViewer.expandIconType = "square"
    jsonViewer.expandEmpty = false
    jsonViewer.data = JSON.stringify(nbtData, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value, 2
    );

});
