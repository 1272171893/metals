import { Command } from "commander";
import { version } from "../package.json";
import create from "./shared/create";
const program = new Command();

// 配置版本号信息
program.version(version).usage("<command> [option]");

// 创建文件命令
program
  .command("create <project-name>")
  .description("create a new project")
  //.option("-f --force", "if it exist, overwrite directory")
  .action((name: string, options: any) => create(options, name));

// 解析参数
program.parse(process.argv);
