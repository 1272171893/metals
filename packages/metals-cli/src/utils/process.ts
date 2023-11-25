import prompts from "prompts";
import { resolve } from "path";
import config from "../config";
// 退出程序
export const onCancel: () => never = () => process.exit();
// 项目目录
export const cwd: string = process.cwd();
// 根据配置的目标路径
export const targetCwd: string = resolve(cwd, config.root);
// 将prompt转换成同步
export const promptAsync = async (
  cmd: prompts.PromptObject<string> | prompts.PromptObject<string>[]
): Promise<prompts.Answers<string>> => {
  return await new Promise(async (reslove) => {
    reslove(await prompts(cmd, { onCancel }));
  });
};
