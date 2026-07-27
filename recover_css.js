const fs = require('fs');
const readline = require('readline');

async function recover() {
  const logPath = '/Users/vishalr/.gemini/antigravity-ide/brain/067d54a1-1c2f-491d-b319-798a03a0d1c6/.system_generated/logs/transcript_full.jsonl';
  
  if (!fs.existsSync(logPath)) {
    console.log("Log not found.");
    return;
  }

  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lastIndexCssContent = null;
  
  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      // Look for tool outputs that contain index.css
      if (entry.type === "TOOL_RESPONSE" || entry.type === "PLANNER_RESPONSE") {
         const content = JSON.stringify(entry);
         if (content.includes("Total Lines: 2473") || content.includes("Showing lines 2250 to 2350")) {
            console.log("Found a potential backup in transcript at step: " + entry.step_index);
            // We can manually parse this or log it
         }
      }
    } catch (e) {}
  }
}

recover();
