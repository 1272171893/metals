import library from "./library";
import document from "./document";
import plugin from "./plugin";
export default { library, document, plugin } as {
  [key: string]: (cmd: any) => void;
};
