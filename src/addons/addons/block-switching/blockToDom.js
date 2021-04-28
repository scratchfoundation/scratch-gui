/**
 * This file is imported from https://github.com/LLK/scratch-blocks/
 * It has been cleaned up and unnecessary functions have been removed.
 * Original license is below.
 *
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

const INPUT_VALUE = 1;
const NEXT_STATEMENT = 3;
const DUMMY_INPUT = 5;

// Partially implements goog.dom.createDom.
const createDom = function (tagName, /* unused */ _params, children) {
  const element = document.createElement(tagName);
  if (children !== undefined) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    for (const child of children) {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
  }
  return element;
};

// Partially implements goog.dom.removeNode
const removeNode = (node) => {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
};

const fieldToDomVariable_ = function (field) {
  // The field had not been initialized fully before being serialized.
  // This can happen if a block is created directly through a call to
  // workspace.newBlock instead of from XML.
  // The new block will be serialized for the first time when firing a block
  // creation event.
  if (field.getValue() == null) {
    field.initModel();
  }
  // Get the variable directly from the field, instead of doing a lookup.  This
  // will work even if the variable has already been deleted.  This can happen
  // because the flyout defers deleting blocks until the next time the flyout is
  // opened.
  var variable = field.getVariable();

  if (!variable) {
    throw Error("Tried to serialize a variable field with no variable.");
  }
  var container = createDom("field", null, variable.name);
  container.setAttribute("name", field.name);
  container.setAttribute("id", variable.getId());
  container.setAttribute("variabletype", variable.type);
  return container;
};

const fieldToDom_ = function (field) {
  if (field.name && field.SERIALIZABLE) {
    if (field.referencesVariables()) {
      return fieldToDomVariable_(field);
    } else {
      var container = createDom("field", null, field.getValue());
      container.setAttribute("name", field.name);
      return container;
    }
  }
  return null;
};

const allFieldsToDom_ = function (block, element) {
  for (var i = 0, input; (input = block.inputList[i]); i++) {
    for (var j = 0, field; (field = input.fieldRow[j]); j++) {
      var fieldDom = fieldToDom_(field);
      if (fieldDom) {
        element.appendChild(fieldDom);
      }
    }
  }
};

const blockToDom = function (block, opt_noId) {
  var element = createDom(block.isShadow() ? "shadow" : "block");
  element.setAttribute("type", block.type);
  if (!opt_noId) {
    element.setAttribute("id", block.id);
  }
  if (block.mutationToDom) {
    // Custom data for an advanced block.
    var mutation = block.mutationToDom();
    if (mutation && (mutation.hasChildNodes() || mutation.hasAttributes())) {
      element.appendChild(mutation);
    }
  }

  allFieldsToDom_(block, element);

  scratchCommentToDom_(block, element);

  if (block.data) {
    var dataElement = createDom("data", null, block.data);
    element.appendChild(dataElement);
  }

  for (var i = 0, input; (input = block.inputList[i]); i++) {
    var container;
    var empty = true;
    if (input.type == DUMMY_INPUT) {
      continue;
    } else {
      var childBlock = input.connection.targetBlock();
      if (input.type == INPUT_VALUE) {
        container = createDom("value");
      } else if (input.type == NEXT_STATEMENT) {
        container = createDom("statement");
      }
      var shadow = input.connection.getShadowDom();
      if (shadow && (!childBlock || !childBlock.isShadow())) {
        var shadowClone = cloneShadow_(shadow);
        // Remove the ID from the shadow dom clone if opt_noId
        // is specified to true.
        if (opt_noId && shadowClone.getAttribute("id")) {
          shadowClone.removeAttribute("id");
        }
        container.appendChild(shadowClone);
      }
      if (childBlock) {
        container.appendChild(blockToDom(childBlock, opt_noId));
        empty = false;
      }
    }
    container.setAttribute("name", input.name);
    if (!empty) {
      element.appendChild(container);
    }
  }
  if (block.inputsInlineDefault != block.inputsInline) {
    element.setAttribute("inline", block.inputsInline);
  }
  if (block.isCollapsed()) {
    element.setAttribute("collapsed", true);
  }
  if (block.disabled) {
    element.setAttribute("disabled", true);
  }
  if (!block.isDeletable() && !block.isShadow()) {
    element.setAttribute("deletable", false);
  }
  if (!block.isMovable() && !block.isShadow()) {
    element.setAttribute("movable", false);
  }
  if (!block.isEditable()) {
    element.setAttribute("editable", false);
  }

  var nextBlock = block.getNextBlock();
  if (nextBlock) {
    var container = createDom("next", null, blockToDom(nextBlock, opt_noId));
    element.appendChild(container);
  }
  var shadow = block.nextConnection && block.nextConnection.getShadowDom();
  if (shadow && (!nextBlock || !nextBlock.isShadow())) {
    container.appendChild(cloneShadow_(shadow));
  }

  return element;
};

const scratchCommentToDom_ = function (block, element) {
  var commentText = block.getCommentText();
  if (commentText) {
    var commentElement = createDom("comment", null, commentText);
    if (typeof block.comment == "object") {
      commentElement.setAttribute("id", block.comment.id);
      commentElement.setAttribute("pinned", block.comment.isVisible());
      var hw;
      // TODO: scratch-blocks uses `block.comment instanceof Blockly.ScratchBlockComment`
      if (block.comment.getHeightWidth) {
        hw = block.comment.getHeightWidth();
      } else {
        hw = block.comment.getBubbleSize();
      }
      commentElement.setAttribute("h", hw.height);
      commentElement.setAttribute("w", hw.width);
      var xy = block.comment.getXY();
      commentElement.setAttribute("x", xy.x);
      commentElement.setAttribute("y", xy.y);
      commentElement.setAttribute("minimized", block.comment.isMinimized());
    }
    element.appendChild(commentElement);
  }
};

const cloneShadow_ = function (shadow) {
  shadow = shadow.cloneNode(true);
  // Walk the tree looking for whitespace.  Don't prune whitespace in a tag.
  var node = shadow;
  var textNode;
  while (node) {
    if (node.firstChild) {
      node = node.firstChild;
    } else {
      while (node && !node.nextSibling) {
        textNode = node;
        node = node.parentNode;
        if (textNode.nodeType == 3 && textNode.data.trim() == "" && node.firstChild != textNode) {
          // Prune whitespace after a tag.
          removeNode(textNode);
        }
      }
      if (node) {
        textNode = node;
        node = node.nextSibling;
        if (textNode.nodeType == 3 && textNode.data.trim() == "") {
          // Prune whitespace before a tag.
          removeNode(textNode);
        }
      }
    }
  }
  return shadow;
};

const blockToDomWithXY = (block) => {
  const xml = blockToDom(block, false);
  const position = block.getRelativeToSurfaceXY();
  xml.setAttribute("x", Math.round(block.workspace.RTL ? -position.x : position.x));
  xml.setAttribute("y", Math.round(position.y));
  return xml;
};

export default blockToDomWithXY;
