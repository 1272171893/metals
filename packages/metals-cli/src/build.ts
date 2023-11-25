import esbuild from "esbuild";
import { join } from "path";
import { globSync } from "glob";
import chalk from "chalk";
import { existsSync, emptyDirSync } from "fs-extra";

const libPath = join(process.cwd(), "lib");
/** 假如lib文件夹已存在，则清空 */
if (existsSync(libPath)) {
  emptyDirSync(libPath);
}

/** 匹配src文件夹下所有ts文件 */
const matchFiles = async () => {
  return new Promise<string[]>(async (resolve, reject) => {
    const res = await globSync("src/**/*.ts", {
      root: process.cwd(),
      ignore: "node_modules/**",
    });
    resolve(res);
  });
};
/** esbuild 配置 */
const build = async function () {
  const entryPoints = await matchFiles();
  await esbuild.build({
    entryPoints: entryPoints,
    bundle: false,
    splitting: false,
    outdir: join(process.cwd(), "lib"),
    format: "cjs",
    platform: "node",
    minify: false,
    color: true,
  });
  console.log(chalk.green("success build \r\n"));
};

build();
