import fs from "fs";
import path from "path";

function walkAll(dir: string, depth = 0) {
  if (depth > 8) return;
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        continue;
      }
      if (stat.isDirectory()) {
        const d = file.toLowerCase();
        if (
          d !== "node_modules" &&
          d !== ".git" &&
          d !== "dist" &&
          d !== "proc" &&
          d !== "sys" &&
          d !== "dev" &&
          d !== "etc" &&
          d !== "usr" &&
          d !== "lib" &&
          d !== "lib64" &&
          d !== "boot" &&
          d !== "run" &&
          d !== "bin" &&
          d !== "sbin" &&
          d !== "var"
        ) {
          walkAll(fullPath, depth + 1);
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (ext === ".mp4" || ext === ".mov" || ext === ".webm" || stat.size > 100000) {
          console.log("FOUND ATTACHMENT:", fullPath, "SIZE:", stat.size, "MTIME:", stat.mtime);
        }
      }
    }
  } catch (e) {}
}

console.log("SEARCHING DISK...");
// Let's search the workspace and any sibling directories or root folders
walkAll("/");
console.log("FINISHED SEARCHING");
