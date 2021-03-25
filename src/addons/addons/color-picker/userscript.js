/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE or https://www.gnu.org/licenses/ for more information)
 */

import codeEditorHandler from "./code-editor.js";
import paintEditorHandler from "./paint-editor.js";

export default async (api) => {
  codeEditorHandler(api);
  paintEditorHandler(api);
};
