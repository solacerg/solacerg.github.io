/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var ReactCompositeComponent = require('./ReactCompositeComponent');
  var ReactEmptyComponent = require('./ReactEmptyComponent');
  var ReactNativeComponent = require('./ReactNativeComponent');
  var ReactInstrumentation = require('./ReactInstrumentation');
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactCompositeComponentWrapper = function(element) {
    this.construct(element);
  };
  _assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {_instantiateReactComponent: instantiateReactComponent});
  function getDeclarationErrorAddendum(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  }
  function getDisplayName(instance) {
    var element = instance._currentElement;
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (instance.getName) {
      return instance.getName() || 'Unknown';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  }
  function isInternalComponentType(type) {
    return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
  }
  var nextDebugID = 1;
  function instantiateReactComponent(node) {
    var instance;
    var isEmpty = node === null || node === false;
    if (isEmpty) {
      instance = ReactEmptyComponent.create(instantiateReactComponent);
    } else if (typeof node === 'object') {
      var element = node;
      !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : invariant(false) : void 0;
      if (typeof element.type === 'string') {
        instance = ReactNativeComponent.createInternalComponent(element);
      } else if (isInternalComponentType(element.type)) {
        instance = new element.type(element);
      } else {
        instance = new ReactCompositeComponentWrapper(element);
      }
    } else if (typeof node === 'string' || typeof node === 'number') {
      instance = ReactNativeComponent.createInstanceForText(node);
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false) : void 0;
    }
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getNativeNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
    }
    instance._mountIndex = 0;
    instance._mountImage = null;
    if (process.env.NODE_ENV !== 'production') {
      instance._isOwnerNecessary = false;
      instance._warnedAboutRefsInRender = false;
    }
    if (process.env.NODE_ENV !== 'production') {
      var debugID = isEmpty ? 0 : nextDebugID++;
      instance._debugID = debugID;
      if (debugID !== 0) {
        var displayName = getDisplayName(instance);
        ReactInstrumentation.debugTool.onSetDisplayName(debugID, displayName);
        var owner = node && node._owner;
        if (owner) {
          ReactInstrumentation.debugTool.onSetOwner(debugID, owner._debugID);
        }
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.preventExtensions) {
        Object.preventExtensions(instance);
      }
    }
    return instance;
  }
  module.exports = instantiateReactComponent;
})(require('process'));
