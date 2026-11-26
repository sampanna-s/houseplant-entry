import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reply =
  "OOO: pot-bound and photosynthesizing. Urgent? Water me, then wait 3-5 business days for me to ignore it.";

// Mirror the gate: UTF-8 text, 1-120 characters, not only white space.
function assertValidReply(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 120 || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidReply(reply);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const tmp = join(outputDir, ".entry.txt.tmp");
writeFileSync(tmp, reply, "utf8");
renameSync(tmp, join(outputDir, "entry.txt"));
