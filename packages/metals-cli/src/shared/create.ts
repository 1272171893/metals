import { promptAsync } from "../utils/process";
import { pathExistsSync, emptyDirSync } from "fs-extra";
import { onCancel, getTargetPath } from "../utils/process";
import { createType } from "../utils/constant";
export default async function (cmd: any, name: string) {
  const result = await promptAsync([
    {
      type: () => (!name ? "text" : null),
      name: "name",
      message: "create a new project?",
      validate: () => true,
    },
    {
      type: (prev) =>
        pathExistsSync(getTargetPath(name || prev)) ? "toggle" : null,
      name: "exists",
      message: "filename exist, is overwrite directory?",
      initial: true,
      active: "yes",
      inactive: "no",
      onState: ({ value }) =>
        !value ? onCancel() : emptyDirSync(getTargetPath(name)),
    },
    {
      type: "text",
      name: "describe",
      message: "please enter a project description ...",
      validate: () => true,
    },
    {
      type: "select",
      name: "type",
      message: "please enter a project description ...",
      choices: createType,
      validate: () => true,
    },
  ]);
  result.name = !name ? result.name : name;
  console.log("cmd", cmd, result);
}
