import fs from "node:fs";
import path from "node:path";

const source = path.join(process.cwd(), "PokeBattle_2D_v28", "public", "game");
const target = path.join(process.cwd(), "public", "game");

if (!fs.existsSync(source)) {
  throw new Error(`Game source directory not found: ${source}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
console.log(`Copied game assets to ${target}`);
