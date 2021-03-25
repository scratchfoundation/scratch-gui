import codeEditorHandler from "./code-editor.js";
import paintEditorHandler from "./paint-editor.js";

export default async (api) => {
  codeEditorHandler(api);
  paintEditorHandler(api);
};
