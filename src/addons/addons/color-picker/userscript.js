/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

/* inserted by pull.js */
import _twScript0 from "!file-loader!../../libraries/tinycolor-min.js";
const _twGetAsset = (path) => {
  if (path === "/tinycolor-min.js") return _twScript0;
  throw new Error(`Unknown asset: ${path}`);
};

import codeEditorHandler from "./code-editor.js";
import paintEditorHandler from "./paint-editor.js";

// Load tinycolor here, and execute code after that
// Note that we don't await other scripts (they block!)
export default async (api) => {
  const { addon } = api;
  await addon.tab.loadScript(/* changed by pull.js */ _twGetAsset("/tinycolor-min.js"));
  codeEditorHandler(api);
  paintEditorHandler(api);
};
