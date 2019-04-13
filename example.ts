import { linesBytes } from "./lines.ts";
import concatBytes from "./concatBytes.ts";

async function cat(filenames: string[]): Promise<void> {
  const newlinebuffer = new TextEncoder().encode("\n");
  for (let filename of filenames) {
    const file = await Deno.open(filename);
    try {
      const file_lines: Uint8Array[] = [];
      for await (const line of linesBytes(file)) {
        // you could transform the line buffers here
        file_lines.push(line);
        file_lines.push(newlinebuffer);
      }
      Deno.stdout.write(concatBytes(...file_lines));
    } finally {
      file.close();
    }
  }
}

cat(Deno.args.slice(1));
