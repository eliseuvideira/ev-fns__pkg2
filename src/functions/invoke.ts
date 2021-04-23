import { exec } from "child_process";
import { chdir } from "./chdir";

export const invoke = async (dir: string, cmd: string) =>
  chdir(dir, async () => {
    const event = exec(cmd);

    await new Promise((resolve, reject) => {
      event.on("exit", resolve);
      event.on("error", reject);
      event.stdout?.pipe(process.stdout);
    });
  });
