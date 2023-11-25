import { promptAsync } from "../utils/process";
export default async function (cmd: any, name: string) {
  const result = await promptAsync([
    {
      type: () => (!name ? "text" : null),
      name: "filename",
      message: "create a new project?",
      validate: () => true,
    },
  ]);
  console.log("cmd", cmd, name, result);
}
