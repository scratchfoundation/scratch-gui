export default async function ({ addon }) {
  let vm = addon.tab.traps.vm;
  let oldAddSprite = vm.constructor.prototype.addSprite;
  vm.constructor.prototype.addSprite = function (input) {
    let spriteObj,
      stringify = true;
    if (typeof input === "object") [spriteObj, stringify] = [input, false];
    else spriteObj = JSON.parse(input);
    let isEmpty = spriteObj.costumes?.[0]?.baseLayerMD5 === "cd21514d0531fdffb22204e0ec5ed84a.svg";
    if (isEmpty || !spriteObj.tags || !addon.settings.get("library")) {
      if (spriteObj.scratchX) {
        spriteObj.scratchX = addon.settings.get("x");
        spriteObj.scratchY = addon.settings.get("y");
      }
      if (spriteObj.x) {
        spriteObj.x = addon.settings.get("x");
        spriteObj.y = addon.settings.get("y");
      }
    }
    return oldAddSprite.call(this, stringify ? JSON.stringify(spriteObj) : spriteObj);
  };
}
