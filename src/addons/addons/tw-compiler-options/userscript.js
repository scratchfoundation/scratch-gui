/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE_GPL or https://www.gnu.org/licenses/ for more information)
 */

export default async function ({ addon, global, console }) {
  const vm = addon.tab.traps.vm;
  vm.setCompilerOptions({
    enabled: false,
  });
}
