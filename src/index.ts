import { program } from "commander";
import path from "path";
import figlet from "figlet";
import { createLib } from "./commands/createLib";

const { version } = require(path.join(__dirname, "..", "package.json"));

program
  .addHelpText(
    "beforeAll",
    figlet.textSync("ev-fns pkg2", {
      horizontalLayout: "universal smushing",
      font: "Standard",
    })
  )
  .name("pkg2")
  .version(version, "-v, --version");

program
  .command("create-lib")
  .description("creates a npm library project")
  .option("-d, --directory <directory>", "project directory", ".")
  .helpOption("-h, --help")
  .action(createLib);

program.parse(process.argv);
