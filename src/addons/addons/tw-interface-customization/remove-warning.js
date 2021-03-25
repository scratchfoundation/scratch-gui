/**!
 * Imported from SA
 * @license GPLv3.0 (see LICENSE or https://www.gnu.org/licenses/ for more information)
 */

export default async function ({ addon }) {
  addon.tab.redux.initialize();
  const close = () =>
    addon.tab.redux.dispatch({
      type: "scratch-gui/alerts/CLOSE_ALERTS_WITH_ID",
      alertId: "twWarning",
    });
  addon.tab.redux.addEventListener("statechanged", ({ detail }) => {
    if (detail.action.type === "scratch-gui/alerts/SHOW_ALERT" && detail.action.alertId === "twWarning") {
      (window.queueMicrotask || window.setTimeout)(close);
    }
  });
  close();
}
