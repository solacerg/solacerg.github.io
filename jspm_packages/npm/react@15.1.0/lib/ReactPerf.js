/* */ 
(function(process) {
  'use strict';
  var _assign = require('object-assign');
  var _extends = _assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var ReactDebugTool = require('./ReactDebugTool');
  var warning = require('fbjs/lib/warning');
  function roundFloat(val) {
    var base = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
    var n = Math.pow(10, base);
    return Math.floor(val * n) / n;
  }
  function getFlushHistory() {
    return ReactDebugTool.getFlushHistory();
  }
  function getExclusive() {
    var flushHistory = arguments.length <= 0 || arguments[0] === undefined ? getFlushHistory() : arguments[0];
    var aggregatedStats = {};
    var affectedIDs = {};
    function updateAggregatedStats(treeSnapshot, instanceID, timerType, applyUpdate) {
      var displayName = treeSnapshot[instanceID].displayName;
      var key = displayName;
      var stats = aggregatedStats[key];
      if (!stats) {
        affectedIDs[key] = {};
        stats = aggregatedStats[key] = {
          key: key,
          instanceCount: 0,
          counts: {},
          durations: {},
          totalDuration: 0
        };
      }
      if (!stats.durations[timerType]) {
        stats.durations[timerType] = 0;
      }
      if (!stats.counts[timerType]) {
        stats.counts[timerType] = 0;
      }
      affectedIDs[key][instanceID] = true;
      applyUpdate(stats);
    }
    flushHistory.forEach(function(flush) {
      var measurements = flush.measurements;
      var treeSnapshot = flush.treeSnapshot;
      measurements.forEach(function(measurement) {
        var duration = measurement.duration;
        var instanceID = measurement.instanceID;
        var timerType = measurement.timerType;
        updateAggregatedStats(treeSnapshot, instanceID, timerType, function(stats) {
          stats.totalDuration += duration;
          stats.durations[timerType] += duration;
          stats.counts[timerType]++;
        });
      });
    });
    return Object.keys(aggregatedStats).map(function(key) {
      return _extends({}, aggregatedStats[key], {instanceCount: Object.keys(affectedIDs[key]).length});
    }).sort(function(a, b) {
      return b.totalDuration - a.totalDuration;
    });
  }
  function getInclusive() {
    var flushHistory = arguments.length <= 0 || arguments[0] === undefined ? getFlushHistory() : arguments[0];
    var aggregatedStats = {};
    var affectedIDs = {};
    function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
      var _treeSnapshot$instanc = treeSnapshot[instanceID];
      var displayName = _treeSnapshot$instanc.displayName;
      var ownerID = _treeSnapshot$instanc.ownerID;
      var owner = treeSnapshot[ownerID];
      var key = (owner ? owner.displayName + ' > ' : '') + displayName;
      var stats = aggregatedStats[key];
      if (!stats) {
        affectedIDs[key] = {};
        stats = aggregatedStats[key] = {
          key: key,
          instanceCount: 0,
          inclusiveRenderDuration: 0,
          renderCount: 0
        };
      }
      affectedIDs[key][instanceID] = true;
      applyUpdate(stats);
    }
    var isCompositeByID = {};
    flushHistory.forEach(function(flush) {
      var measurements = flush.measurements;
      measurements.forEach(function(measurement) {
        var instanceID = measurement.instanceID;
        var timerType = measurement.timerType;
        if (timerType !== 'render') {
          return;
        }
        isCompositeByID[instanceID] = true;
      });
    });
    flushHistory.forEach(function(flush) {
      var measurements = flush.measurements;
      var treeSnapshot = flush.treeSnapshot;
      measurements.forEach(function(measurement) {
        var duration = measurement.duration;
        var instanceID = measurement.instanceID;
        var timerType = measurement.timerType;
        if (timerType !== 'render') {
          return;
        }
        updateAggregatedStats(treeSnapshot, instanceID, function(stats) {
          stats.renderCount++;
        });
        var nextParentID = instanceID;
        while (nextParentID) {
          if (isCompositeByID[nextParentID]) {
            updateAggregatedStats(treeSnapshot, nextParentID, function(stats) {
              stats.inclusiveRenderDuration += duration;
            });
          }
          nextParentID = treeSnapshot[nextParentID].parentID;
        }
      });
    });
    return Object.keys(aggregatedStats).map(function(key) {
      return _extends({}, aggregatedStats[key], {instanceCount: Object.keys(affectedIDs[key]).length});
    }).sort(function(a, b) {
      return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
    });
  }
  function getWasted() {
    var flushHistory = arguments.length <= 0 || arguments[0] === undefined ? getFlushHistory() : arguments[0];
    var aggregatedStats = {};
    var affectedIDs = {};
    function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
      var _treeSnapshot$instanc2 = treeSnapshot[instanceID];
      var displayName = _treeSnapshot$instanc2.displayName;
      var ownerID = _treeSnapshot$instanc2.ownerID;
      var owner = treeSnapshot[ownerID];
      var key = (owner ? owner.displayName + ' > ' : '') + displayName;
      var stats = aggregatedStats[key];
      if (!stats) {
        affectedIDs[key] = {};
        stats = aggregatedStats[key] = {
          key: key,
          instanceCount: 0,
          inclusiveRenderDuration: 0,
          renderCount: 0
        };
      }
      affectedIDs[key][instanceID] = true;
      applyUpdate(stats);
    }
    flushHistory.forEach(function(flush) {
      var measurements = flush.measurements;
      var treeSnapshot = flush.treeSnapshot;
      var operations = flush.operations;
      var isDefinitelyNotWastedByID = {};
      operations.forEach(function(operation) {
        var instanceID = operation.instanceID;
        var nextParentID = instanceID;
        while (nextParentID) {
          isDefinitelyNotWastedByID[nextParentID] = true;
          nextParentID = treeSnapshot[nextParentID].parentID;
        }
      });
      var renderedCompositeIDs = {};
      measurements.forEach(function(measurement) {
        var instanceID = measurement.instanceID;
        var timerType = measurement.timerType;
        if (timerType !== 'render') {
          return;
        }
        renderedCompositeIDs[instanceID] = true;
      });
      measurements.forEach(function(measurement) {
        var duration = measurement.duration;
        var instanceID = measurement.instanceID;
        var timerType = measurement.timerType;
        if (timerType !== 'render') {
          return;
        }
        var updateCount = treeSnapshot[instanceID].updateCount;
        if (isDefinitelyNotWastedByID[instanceID] || updateCount === 0) {
          return;
        }
        updateAggregatedStats(treeSnapshot, instanceID, function(stats) {
          stats.renderCount++;
        });
        var nextParentID = instanceID;
        while (nextParentID) {
          var isWasted = renderedCompositeIDs[nextParentID] && !isDefinitelyNotWastedByID[nextParentID];
          if (isWasted) {
            updateAggregatedStats(treeSnapshot, nextParentID, function(stats) {
              stats.inclusiveRenderDuration += duration;
            });
          }
          nextParentID = treeSnapshot[nextParentID].parentID;
        }
      });
    });
    return Object.keys(aggregatedStats).map(function(key) {
      return _extends({}, aggregatedStats[key], {instanceCount: Object.keys(affectedIDs[key]).length});
    }).sort(function(a, b) {
      return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
    });
  }
  function getOperations() {
    var flushHistory = arguments.length <= 0 || arguments[0] === undefined ? getFlushHistory() : arguments[0];
    var stats = [];
    flushHistory.forEach(function(flush, flushIndex) {
      var operations = flush.operations;
      var treeSnapshot = flush.treeSnapshot;
      operations.forEach(function(operation) {
        var instanceID = operation.instanceID;
        var type = operation.type;
        var payload = operation.payload;
        var _treeSnapshot$instanc3 = treeSnapshot[instanceID];
        var displayName = _treeSnapshot$instanc3.displayName;
        var ownerID = _treeSnapshot$instanc3.ownerID;
        var owner = treeSnapshot[ownerID];
        var key = (owner ? owner.displayName + ' > ' : '') + displayName;
        stats.push({
          flushIndex: flushIndex,
          instanceID: instanceID,
          key: key,
          type: type,
          ownerID: ownerID,
          payload: payload
        });
      });
    });
    return stats;
  }
  function printExclusive(flushHistory) {
    var stats = getExclusive(flushHistory);
    var table = stats.map(function(item) {
      var key = item.key;
      var instanceCount = item.instanceCount;
      var totalDuration = item.totalDuration;
      var renderCount = item.counts.render || 0;
      var renderDuration = item.durations.render || 0;
      return {
        'Component': key,
        'Total time (ms)': roundFloat(totalDuration),
        'Instance count': instanceCount,
        'Total render time (ms)': roundFloat(renderDuration),
        'Average render time (ms)': renderCount ? roundFloat(renderDuration / renderCount) : undefined,
        'Render count': renderCount,
        'Total lifecycle time (ms)': roundFloat(totalDuration - renderDuration)
      };
    });
    console.table(table);
  }
  function printInclusive(flushHistory) {
    var stats = getInclusive(flushHistory);
    var table = stats.map(function(item) {
      var key = item.key;
      var instanceCount = item.instanceCount;
      var inclusiveRenderDuration = item.inclusiveRenderDuration;
      var renderCount = item.renderCount;
      return {
        'Owner > Component': key,
        'Inclusive render time (ms)': roundFloat(inclusiveRenderDuration),
        'Instance count': instanceCount,
        'Render count': renderCount
      };
    });
    console.table(table);
  }
  function printWasted(flushHistory) {
    var stats = getWasted(flushHistory);
    var table = stats.map(function(item) {
      var key = item.key;
      var instanceCount = item.instanceCount;
      var inclusiveRenderDuration = item.inclusiveRenderDuration;
      var renderCount = item.renderCount;
      return {
        'Owner > Component': key,
        'Inclusive wasted time (ms)': roundFloat(inclusiveRenderDuration),
        'Instance count': instanceCount,
        'Render count': renderCount
      };
    });
    console.table(table);
  }
  function printOperations(flushHistory) {
    var stats = getOperations(flushHistory);
    var table = stats.map(function(stat) {
      return {
        'Owner > Node': stat.key,
        'Operation': stat.type,
        'Payload': typeof stat.payload === 'object' ? JSON.stringify(stat.payload) : stat.payload,
        'Flush index': stat.flushIndex,
        'Owner Component ID': stat.ownerID,
        'DOM Component ID': stat.instanceID
      };
    });
    console.table(table);
  }
  var warnedAboutPrintDOM = false;
  function printDOM(measurements) {
    process.env.NODE_ENV !== 'production' ? warning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.') : void 0;
    warnedAboutPrintDOM = true;
    return printOperations(measurements);
  }
  var warnedAboutGetMeasurementsSummaryMap = false;
  function getMeasurementsSummaryMap(measurements) {
    process.env.NODE_ENV !== 'production' ? warning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.') : void 0;
    warnedAboutGetMeasurementsSummaryMap = true;
    return getWasted(measurements);
  }
  function start() {
    ReactDebugTool.beginProfiling();
  }
  function stop() {
    ReactDebugTool.endProfiling();
  }
  var ReactPerfAnalysis = {
    getLastMeasurements: getFlushHistory,
    getExclusive: getExclusive,
    getInclusive: getInclusive,
    getWasted: getWasted,
    getOperations: getOperations,
    printExclusive: printExclusive,
    printInclusive: printInclusive,
    printWasted: printWasted,
    printOperations: printOperations,
    start: start,
    stop: stop,
    printDOM: printDOM,
    getMeasurementsSummaryMap: getMeasurementsSummaryMap
  };
  module.exports = ReactPerfAnalysis;
})(require('process'));
