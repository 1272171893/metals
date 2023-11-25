import { promptAsync } from "../utils/process";
import { pathExistsSync, emptyDirSync } from "fs-extra";
import { onCancel, getTargetPath } from "../utils/process";
import { createType } from "../utils/constant";
import createAction from "./createAction";
export default async function (cmd: any, name: string) {
  const result = await promptAsync([
    {
      type: () => (!name ? "text" : null),
      name: "name",
      message: "create a new project?",
      validate: (value) => !!value,
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
      validate: (value) => !!value,
    },
    {
      type: "select",
      name: "type",
      message: "please select the initialization type?",
      choices: createType,
      validate: (value) => !!value,
    },
  ]);
  result.name = !name ? result.name : name;
  if (!createAction[result.type]) {
    console.log(
      `unmatched ${result.type} initialization type, program exiting ...`
    );
    onCancel();
  }
  createAction[result.type](result);
}
