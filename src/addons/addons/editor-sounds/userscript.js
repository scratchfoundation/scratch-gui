export default async function ({ addon, global, console }) {
  const ScratchBlocks = await addon.tab.traps.getBlockly();
  const workspace = Blockly.getMainWorkspace();
  // Add sounds to the current workspace
  const pathToMedia = workspace.options.pathToMedia;
  ScratchBlocks.inject.loadSounds_(pathToMedia, workspace);
  // Add sounds to all future workspaces
  const originalInit = ScratchBlocks.init_;
  ScratchBlocks.init_ = function (...args) {
    const wksp = args[0];
    wksp.options.hasSounds = true;
    return originalInit.call(this, ...args);
  };
}
