const buttons = document.querySelectorAll('#sidebar button');

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const toolUrl = "/tools/" + button.id + "/initialize.js";
        console.log(`Loading tool: ${button.id} from ${toolUrl}`);
        
        try {
            document.querySelector('main').innerHTML = '';
            const tool = await import(toolUrl)

            tool.initialize();
        }
        catch (error) {
            console.error(`Failed to load tool: ${toolUrl}`, error);
        }
    })
})