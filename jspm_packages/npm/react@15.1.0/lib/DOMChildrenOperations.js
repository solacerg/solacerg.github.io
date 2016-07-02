/* */ 
(function(process) {
  'use strict';
  var DOMLazyTree = require('./DOMLazyTree');
  var Danger = require('./Danger');
  var ReactMultiChildUpdateTypes = require('./ReactMultiChildUpdateTypes');
  var ReactDOMComponentTree = require('./ReactDOMComponentTree');
  var ReactInstrumentation = require('./ReactInstrumentation');
  var createMicrosoftUnsafeLocalFunction = require('./createMicrosoftUnsafeLocalFunction');
  var setInnerHTML = require('./setInnerHTML');
  var setTextContent = require('./setTextContent');
  function getNodeAfter(parentNode, node) {
    if (Array.isArray(node)) {
      node = node[1];
    }
    return node ? node.nextSibling : parentNode.firstChild;
  }
  var insertChildAt = createMicrosoftUnsafeLocalFunction(function(parentNode, childNode, referenceNode) {
    parentNode.insertBefore(childNode, referenceNode);
  });
  function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
    DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
  }
  function moveChild(parentNode, childNode, referenceNode) {
    if (Array.isArray(childNode)) {
      moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
    } else {
      insertChildAt(parentNode, childNode, referenceNode);
    }
  }
  function removeChild(parentNode, childNode) {
    if (Array.isArray(childNode)) {
      var closingComment = childNode[1];
      childNode = childNode[0];
      removeDelimitedText(parentNode, childNode, closingComment);
      parentNode.removeChild(closingComment);
    }
    parentNode.removeChild(childNode);
  }
  function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
    var node = openingComment;
    while (true) {
      var nextNode = node.nextSibling;
      insertChildAt(parentNode, node, referenceNode);
      if (node === closingComment) {
        break;
      }
      node = nextNode;
    }
  }
  function removeDelimitedText(parentNode, startNode, closingComment) {
    while (true) {
      var node = startNode.nextSibling;
      if (node === closingComment) {
        break;
      } else {
        parentNode.removeChild(node);
      }
    }
  }
  function replaceDelimitedText(openingComment, closingComment, stringText) {
    var parentNode = openingComment.parentNode;
    var nodeAfterComment = openingComment.nextSibling;
    if (nodeAfterComment === closingComment) {
      if (stringText) {
        insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
      }
    } else {
      if (stringText) {
        setTextContent(nodeAfterComment, stringText);
        removeDelimitedText(parentNode, nodeAfterComment, closingComment);
      } else {
        removeDelimitedText(parentNode, openingComment, closingComment);
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      ReactInstrumentation.debugTool.onNativeOperation(ReactDOMComponentTree.getInstanceFromNode(openingComment)._debugID, 'replace text', stringText);
    }
  }
  var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
  if (process.env.NODE_ENV !== 'production') {
    dangerouslyReplaceNodeWithMarkup = function(oldChild, markup, prevInstance) {
      Danger.dangerouslyReplaceNodeWithMarkup(oldChild, markup);
      if (prevInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onNativeOperation(prevInstance._debugID, 'replace with', markup.toString());
      } else {
        var nextInstance = ReactDOMComponentTree.getInstanceFromNode(markup.node);
        if (nextInstance._debugID !== 0) {
          ReactInstrumentation.debugTool.onNativeOperation(nextInstance._debugID, 'mount', markup.toString());
        }
      }
    };
  }
  var DOMChildrenOperations = {
    dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,
    replaceDelimitedText: replaceDelimitedText,
    processUpdates: function(parentNode, updates) {
      if (process.env.NODE_ENV !== 'production') {
        var parentNodeDebugID = ReactDOMComponentTree.getInstanceFromNode(parentNode)._debugID;
      }
      for (var k = 0; k < updates.length; k++) {
        var update = updates[k];
        switch (update.type) {
          case ReactMultiChildUpdateTypes.INSERT_MARKUP:
            insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
            if (process.env.NODE_ENV !== 'production') {
              ReactInstrumentation.debugTool.onNativeOperation(parentNodeDebugID, 'insert child', {
                toIndex: update.toIndex,
                content: update.content.toString()
              });
            }
            break;
          case ReactMultiChildUpdateTypes.MOVE_EXISTING:
            moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
            if (process.env.NODE_ENV !== 'production') {
              ReactInstrumentation.debugTool.onNativeOperation(parentNodeDebugID, 'move child', {
                fromIndex: update.fromIndex,
                toIndex: update.toIndex
              });
            }
            break;
          case ReactMultiChildUpdateTypes.SET_MARKUP:
            setInnerHTML(parentNode, update.content);
            if (process.env.NODE_ENV !== 'production') {
              ReactInstrumentation.debugTool.onNativeOperation(parentNodeDebugID, 'replace children', update.content.toString());
            }
            break;
          case ReactMultiChildUpdateTypes.TEXT_CONTENT:
            setTextContent(parentNode, update.content);
            if (process.env.NODE_ENV !== 'production') {
              ReactInstrumentation.debugTool.onNativeOperation(parentNodeDebugID, 'replace text', update.content.toString());
            }
            break;
          case ReactMultiChildUpdateTypes.REMOVE_NODE:
            removeChild(parentNode, update.fromNode);
            if (process.env.NODE_ENV !== 'production') {
              ReactInstrumentation.debugTool.onNativeOperation(parentNodeDebugID, 'remove child', {fromIndex: update.fromIndex});
            }
            break;
        }
      }
    }
  };
  module.exports = DOMChildrenOperations;
})(require('process'));
