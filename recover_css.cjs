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

  let foundLines = 0;
  let fullCss = [];
  
  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      if (entry.type === "TOOL_RESPONSE") {
         const content = entry.content || "";
         if (content.includes("File Path: `file:///Users/vishalr/Documents/VSCode/Portfolio/vishal-r-portfolio/src/index.css`")) {
             // Extract lines that look like "2250:       color: #000000 !important;"
             const lines = content.split('\n');
             for (const l of lines) {
                 if (/^\d+: /.test(l)) {
                     fullCss.push(l);
                     foundLines++;
                 }
             }
         }
      }
    } catch (e) {}
  }
  console.log("Found " + foundLines + " lines of index.css in transcript!");
  fs.writeFileSync('transcript_css_dump.txt', fullCss.join('\n'));
}

recover();
