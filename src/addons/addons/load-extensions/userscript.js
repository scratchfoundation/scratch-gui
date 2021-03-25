export default async function ({ addon, global, console }) {
  // IDs are taken from https://github.com/LLK/scratch-vm/blob/ffa78b91b8645b6a8c80f698a3637bb73abf2931/src/extension-support/extension-manager.js#L11
  const Extensions = ["music", "pen", "text2speech", "translate"];
  for (let ext of Extensions) {
    // Check if setting enabled and it's not already loaded
    if (addon.settings.get(ext) && !addon.tab.traps.vm.extensionManager.isExtensionLoaded(ext)) {
      addon.tab.traps.vm.extensionManager.loadExtensionIdSync(ext);
    }
  }
}
