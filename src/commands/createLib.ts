import path from "path";
import fse from "fs-extra";
import { invoke } from "../functions/invoke";

interface CreateLibProps {
  directory: string;
}

const template = {
  name: "",
  version: "0.1.0",
  main: "lib/index.js",
  types: "lib/index.d.ts",
  author: "",
  license: "MIT",
  engines: {
    node: ">=14",
  },
  files: ["lib/**/*"],
  devDependencies: {},
  dependencies: {},
  scripts: {
    build: "tsc",
    coverage: "jest --coverage",
    prepublishOnly: "yarn build",
    test: "jest",
    watch: "jest --watch",
  },
};

export const createLib = async ({ directory: relativeDir }: CreateLibProps) => {
  const dir = path.resolve(relativeDir);

  await fse.copy(
    path.join(__dirname, "..", "..", "templates", "createLib"),
    dir
  );

  await invoke(dir, "git init");

  await invoke(dir, "yarn init -y");

  const content = require(path.join(dir, "package.json"));

  template.name = content.name;
  template.author = content.author;

  await fse.writeFile(
    path.join(dir, "package.json"),
    JSON.stringify(template, null, 2)
  );

  await fse.writeFile(
    path.join(dir, ".gitignore"),
    ["coverage/", "lib/", "node_modules/", "*.log", "*.error"].join("\n") + "\n"
  );

  await invoke(dir, "yarn add -D jest @types/jest ts-jest typescript");
};
