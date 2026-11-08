import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const source = path.join(process.cwd(), "PokeBattle_2D_v28", "public", "game");
const target = path.join(process.cwd(), "public", "game");

if (fs.existsSync(source)) {
  fs.cpSync(source, target, { recursive: true });
}

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
