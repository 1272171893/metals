import { outputFileSync, pathExistsSync, emptyDirSync } from "fs-extra";
import { getTargetPath } from "../../utils/process";

// 将组件库里的组件都搜集在index.ts里
function collectIndex(cmd: any) {
  const index = getTargetPath("index.ts");
  outputFileSync(index, `import vue from "vue"`);
  console.log("cmd", cmd, index);
}
// 创建组件的导出注册的信息
function packIndex(cmd: any) {
  const index = getTargetPath(`${cmd.name}/index.ts`);
  outputFileSync(index, `import vue from "vue"`);
  console.log("cmd", cmd, index);
}

export default function (cmd: any) {
  const target = getTargetPath(cmd.name);
  if (!pathExistsSync(target)) emptyDirSync(target);
  collectIndex(cmd);
  packIndex(cmd);
}
