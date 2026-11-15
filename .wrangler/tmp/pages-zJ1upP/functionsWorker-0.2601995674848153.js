var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start2;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start2 = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start2 = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start2,
      detail: {
        start: start2,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// ../PokeBattle_2D_v28/lib/equipment.json
var equipment_default = [{ name: "Speed", icon: "\u2197", price: 100, rarity: "Comune", category: "utility", description: "Potenzia la velocit\xE0 del Pok\xE9mon durante la battaglia.", asset: "speed" }, { name: "Difesa", icon: "\u2B21", price: 100, rarity: "Comune", category: "utility", description: "Potenzia la difesa del Pok\xE9mon durante la battaglia.", asset: "defense" }, { name: "Attacco", icon: "\u2726", price: 100, rarity: "Comune", category: "utility", description: "Potenzia l'attacco del Pok\xE9mon durante la battaglia.", asset: "attack" }, { name: "Carbonella", icon: "\u{1F525}", price: 180, rarity: "Comune", category: "held", description: "Mosse Fuoco +20%.", typeBoost: "Fuoco", factor: 1.2, asset: "charcoal" }, { name: "Acqua Magica", icon: "\u{1F4A7}", price: 180, rarity: "Comune", category: "held", description: "Mosse Acqua +20%.", typeBoost: "Acqua", factor: 1.2, asset: "mystic-water" }, { name: "Miracolseme", icon: "\u{1F331}", price: 180, rarity: "Comune", category: "held", description: "Mosse Erba +20%.", typeBoost: "Erba", factor: 1.2, asset: "miracle-seed" }, { name: "Calamita", icon: "\u{1F9F2}", price: 180, rarity: "Comune", category: "held", description: "Mosse Elettro +20%.", typeBoost: "Elettro", factor: 1.2, asset: "magnet" }, { name: "Gelomai", icon: "\u2744\uFE0F", price: 180, rarity: "Comune", category: "held", description: "Mosse Ghiaccio +20%.", typeBoost: "Ghiaccio", factor: 1.2, asset: "never-melt-ice" }, { name: "Cinturanera", icon: "\u{1F94B}", price: 180, rarity: "Comune", category: "held", description: "Mosse Lotta +20%.", typeBoost: "Lotta", factor: 1.2, asset: "black-belt" }, { name: "Velenaculeo", icon: "\u{1F982}", price: 180, rarity: "Comune", category: "held", description: "Mosse Veleno +20%.", typeBoost: "Veleno", factor: 1.2, asset: "poison-barb" }, { name: "Sabbia Soffice", icon: "\u{1F3DC}\uFE0F", price: 180, rarity: "Comune", category: "held", description: "Mosse Terra +20%.", typeBoost: "Terra", factor: 1.2, asset: "soft-sand" }, { name: "Beccaffilato", icon: "\u{1FAB6}", price: 180, rarity: "Comune", category: "held", description: "Mosse Volante +20%.", typeBoost: "Volante", factor: 1.2, asset: "sharp-beak" }, { name: "Cucchiaio Torto", icon: "\u{1F944}", price: 180, rarity: "Comune", category: "held", description: "Mosse Psico +20%.", typeBoost: "Psico", factor: 1.2, asset: "twisted-spoon" }, { name: "Argenpolvere", icon: "\u{1F98B}", price: 180, rarity: "Comune", category: "held", description: "Mosse Coleottero +20%.", typeBoost: "Coleottero", factor: 1.2, asset: "silver-powder" }, { name: "Pietradura", icon: "\u{1FAA8}", price: 180, rarity: "Comune", category: "held", description: "Mosse Roccia +20%.", typeBoost: "Roccia", factor: 1.2, asset: "hard-stone" }, { name: "Spettrotarga", icon: "\u{1F47B}", price: 180, rarity: "Comune", category: "held", description: "Mosse Spettro +20%.", typeBoost: "Spettro", factor: 1.2, asset: "spell-tag" }, { name: "Dentedidrago", icon: "\u{1F409}", price: 180, rarity: "Comune", category: "held", description: "Mosse Drago +20%.", typeBoost: "Drago", factor: 1.2, asset: "dragon-fang" }, { name: "Occhialineri", icon: "\u{1F576}\uFE0F", price: 180, rarity: "Comune", category: "held", description: "Mosse Buio +20%.", typeBoost: "Buio", factor: 1.2, asset: "black-glasses" }, { name: "Metalcoperta", icon: "\u{1F6E1}\uFE0F", price: 400, rarity: "Raro", category: "held", description: "Mosse Acciaio +20%.", typeBoost: "Acciaio", factor: 1.2, asset: "metal-coat", evolution: true, compatibility: "Onix \u2192 Steelix e Scyther \u2192 Scizor" }, { name: "Sciarpa Seta", icon: "\u{1F9E3}", price: 180, rarity: "Comune", category: "held", description: "Mosse Normale +20%.", typeBoost: "Normale", factor: 1.2, asset: "silk-scarf" }, { name: "Muscolbanda", icon: "\u{1F4AA}", price: 260, rarity: "Non comune", category: "held", description: "Attacchi fisici +10%.", attack: 1.1, asset: "muscle-band" }, { name: "Lentisaggia", icon: "\u{1F453}", price: 260, rarity: "Non comune", category: "held", description: "Attacchi speciali +10%.", spAttack: 1.1, asset: "wise-glasses" }, { name: "Bendascelta", icon: "\u{1F380}", price: 540, rarity: "Raro", category: "held", description: "Attacco +50%; usa una sola mossa fino al cambio.", attack: 1.5, choice: true, asset: "choice-band" }, { name: "Lentiscelta", icon: "\u{1F97D}", price: 540, rarity: "Raro", category: "held", description: "Attacco speciale +50%; usa una sola mossa fino al cambio.", spAttack: 1.5, choice: true, asset: "choice-specs" }, { name: "Stolascelta", icon: "\u{1F9E3}", price: 580, rarity: "Raro", category: "held", description: "Velocit\xE0 +50%; usa una sola mossa fino al cambio.", speed: 1.5, choice: true, asset: "choice-scarf" }, { name: "Avanzi", icon: "\u{1F34E}", price: 460, rarity: "Raro", category: "held", description: "Recupera 3% dei PS massimi ogni 5 secondi in campo.", regen: 0.03, asset: "leftovers" }, { name: "Conchinella", icon: "\u{1F41A}", price: 380, rarity: "Non comune", category: "held", description: "Recupera 1/8 dei danni effettivamente inflitti.", drain: 0.125, asset: "shell-bell" }, { name: "Assorbisfera", icon: "\u{1F52E}", price: 650, rarity: "Molto raro", category: "held", description: "Danni +30%; perde 3% PS quando colpisce (massimo una volta ogni secondo).", damage: 1.3, recoil: 0.03, asset: "life-orb" }, { name: "Focalnastro", icon: "\u{1F397}\uFE0F", price: 620, rarity: "Molto raro", category: "held", description: "Una volta per battaglia evita un KO da PS pieni, restando a 1 PS.", sash: true, asset: "focus-sash" }, { name: "Evolcondensa", icon: "\u{1F48E}", price: 480, rarity: "Raro", category: "held", description: "Difese +50% se pu\xF2 ancora evolversi.", eviolite: true, asset: "eviolite" }, { name: "Corpetto Assalto", icon: "\u{1F9BA}", price: 500, rarity: "Raro", category: "held", description: "Difesa speciale +50%; consente solo mosse che infliggono danni.", spDefense: 1.5, assault: true, asset: "assault-vest" }, { name: "Elettropalla", icon: "\u26A1", price: 680, rarity: "Molto raro", category: "held", description: "Solo Pikachu: Attacco e Attacco speciale raddoppiati.", attack: 2, spAttack: 2, only: [25], asset: "light-ball" }, { name: "Ossospesso", icon: "\u{1F9B4}", price: 560, rarity: "Raro", category: "held", description: "Solo Cubone e Marowak: Attacco raddoppiato.", attack: 2, only: [104, 105], asset: "thick-club" }, { name: "Fortunuovo", icon: "\u{1F95A}", price: 720, rarity: "Molto raro", category: "held", description: "Esperienza guadagnata +50% nelle lotte con progressi.", xp: 1.5, asset: "lucky-egg" }, { name: "Pietrafocaia", icon: "\u{1F525}", price: 220, rarity: "Non comune", category: "evolution", description: "Consumata per evolvere un Pok\xE9mon compatibile.", asset: "fire-stone" }, { name: "Pietraidrica", icon: "\u{1F4A7}", price: 220, rarity: "Non comune", category: "evolution", description: "Consumata per evolvere un Pok\xE9mon compatibile.", asset: "water-stone" }, { name: "Pietratuono", icon: "\u26A1", price: 240, rarity: "Non comune", category: "evolution", description: "Consumata per evolvere un Pok\xE9mon compatibile.", asset: "thunder-stone" }, { name: "Pietrafoglia", icon: "\u{1F343}", price: 220, rarity: "Non comune", category: "evolution", description: "Consumata per evolvere un Pok\xE9mon compatibile.", asset: "leaf-stone" }, { name: "Pietralunare", icon: "\u{1F319}", price: 320, rarity: "Raro", category: "evolution", description: "Consumata per evolvere un Pok\xE9mon compatibile.", asset: "moon-stone" }, { name: "Pietralbore", asset: "dawn-stone", price: 400, rarity: "Raro", category: "evolution", description: "Oggetto evolutivo: Kirlia maschio e Snorunt femmina. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Kirlia maschio e Snorunt femmina", futureEvolution: true }, { name: "Squamabissi", asset: "deep-sea-scale", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Clamperl \u2192 Gorebyss. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Clamperl \u2192 Gorebyss", futureEvolution: true }, { name: "Dente Abissi", asset: "deep-sea-tooth", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Clamperl \u2192 Huntail. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Clamperl \u2192 Huntail", futureEvolution: true }, { name: "Squama Drago", asset: "dragon-scale", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Seadra \u2192 Kingdra. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Seadra \u2192 Kingdra", futureEvolution: true }, { name: "Dubbiodisco", asset: "dubious-disc", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Porygon2 \u2192 Porygon-Z. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Porygon2 \u2192 Porygon-Z", futureEvolution: true }, { name: "Neropietra", asset: "dusk-stone", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Murkrow, Misdreavus, Lampent e Doublade. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Murkrow, Misdreavus, Lampent e Doublade", futureEvolution: true }, { name: "Elettritore", asset: "electirizer", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Electabuzz \u2192 Electivire. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Electabuzz \u2192 Electivire", futureEvolution: true }, { name: "Pietragelo", asset: "ice-stone", price: 400, rarity: "Raro", category: "evolution", description: "Oggetto evolutivo: Vulpix e Sandshrew di Alola, Eevee \u2192 Glaceon. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Vulpix e Sandshrew di Alola, Eevee \u2192 Glaceon", futureEvolution: true }, { name: "Roccia di Re", asset: "kings-rock", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Poliwhirl \u2192 Politoed e Slowpoke \u2192 Slowking. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Poliwhirl \u2192 Politoed e Slowpoke \u2192 Slowking", futureEvolution: true }, { name: "Magmatore", asset: "magmarizer", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Magmar \u2192 Magmortar. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Magmar \u2192 Magmortar", futureEvolution: true }, { name: "Pietraovale", asset: "oval-stone", price: 400, rarity: "Raro", category: "evolution", description: "Oggetto evolutivo: Happiny \u2192 Chansey. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Happiny \u2192 Chansey", futureEvolution: true }, { name: "Squama Bella", asset: "prism-scale", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Feebas \u2192 Milotic. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Feebas \u2192 Milotic", futureEvolution: true }, { name: "Copertura", asset: "protector", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Rhydon \u2192 Rhyperior. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Rhydon \u2192 Rhyperior", futureEvolution: true }, { name: "Affilartigli", asset: "razor-claw", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Sneasel \u2192 Weavile. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Sneasel \u2192 Weavile", futureEvolution: true }, { name: "Affilodente", asset: "razor-fang", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Gligar \u2192 Gliscor. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Gligar \u2192 Gliscor", futureEvolution: true }, { name: "Terrorpanno", asset: "reaper-cloth", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Dusclops \u2192 Dusknoir. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Dusclops \u2192 Dusknoir", futureEvolution: true }, { name: "Bustina Aromi", asset: "sachet", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Spritzee \u2192 Aromatisse. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Spritzee \u2192 Aromatisse", futureEvolution: true }, { name: "Pietrabrillo", asset: "shiny-stone", price: 400, rarity: "Raro", category: "evolution", description: "Oggetto evolutivo: Togetic, Roselia, Minccino e Floette. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Togetic, Roselia, Minccino e Floette", futureEvolution: true }, { name: "Pietrasolare", asset: "sun-stone", price: 400, rarity: "Raro", category: "evolution", description: "Oggetto evolutivo: Gloom \u2192 Bellossom, Sunkern, Cottonee, Petilil e Helioptile. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Gloom \u2192 Bellossom, Sunkern, Cottonee, Petilil e Helioptile", futureEvolution: true }, { name: "Upgrade", asset: "up-grade", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Porygon \u2192 Porygon2. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Porygon \u2192 Porygon2", futureEvolution: true }, { name: "Dolcespuma", asset: "whipped-dream", price: 520, rarity: "Molto raro", category: "evolution", description: "Oggetto evolutivo: Swirlix \u2192 Slurpuff. Evoluzione non ancora disponibile nel Pok\xE9dex dei 151.", compatibility: "Swirlix \u2192 Slurpuff", futureEvolution: true }, { name: "Biglietto scambio", icon: "\u{1F39F}\uFE0F", price: 150, rarity: "Comune", category: "utility", description: "Consente uno scambio sicuro di Pok\xE9mon con un altro allenatore.", asset: "trade-ticket" }];

// ../PokeBattle_2D_v28/lib/equipment.ts
var EQUIPMENT = equipment_default;
function heldInfo(m) {
  let i = EQUIPMENT.find((i2) => i2.name === m.heldItem && i2.category === "held");
  return i && (!i.only || i.only.includes(m.num)) ? i : null;
}
__name(heldInfo, "heldInfo");
function heldStats(m, values, canEvolve = false) {
  let i = heldInfo(m);
  if (!i) return [...values];
  let v = [...values];
  for (let [k, n] of [["attack", 1], ["defense", 2], ["spAttack", 3], ["spDefense", 4], ["speed", 5]]) v[n] = Math.floor(v[n] * (i[k] || 1));
  if (i.eviolite && canEvolve) {
    v[2] = Math.floor(v[2] * 1.5);
    v[4] = Math.floor(v[4] * 1.5);
  }
  return v;
}
__name(heldStats, "heldStats");
function heldDamage(m, move) {
  let i = heldInfo(m);
  return i ? (i.damage || 1) * (i.typeBoost === move.t ? i.factor : 1) : 1;
}
__name(heldDamage, "heldDamage");
function heldAfterHit(attacker, target, actual, t) {
  let i = heldInfo(attacker);
  if (i?.drain) attacker.hp = Math.min(attacker.max, attacker.hp + Math.floor(actual * i.drain));
  if (i?.recoil && actual > 0 && t - (attacker.lastRecoil ?? -9) >= 1) {
    attacker.lastRecoil = t;
    attacker.hp = Math.max(1, attacker.hp - Math.max(1, Math.floor(attacker.max * i.recoil)));
  }
}
__name(heldAfterHit, "heldAfterHit");
function heldSurvive(m, damage) {
  if (heldInfo(m)?.sash && !m.sashUsed && m.hp === m.max && damage >= m.hp) {
    m.sashUsed = true;
    return Math.max(0, m.hp - 1);
  }
  return damage;
}
__name(heldSurvive, "heldSurvive");
function heldTick(st, dt) {
  for (let side of [0, 1]) {
    let m = st.teams[side]?.[st.active[side]];
    if (!m || m.hp <= 0) continue;
    let i = heldInfo(m);
    if (i?.regen) {
      m.regenClock = (m.regenClock || 0) + dt;
      if (m.regenClock >= 5) {
        m.regenClock -= 5;
        m.hp = Math.min(m.max, m.hp + Math.max(1, Math.floor(m.max * i.regen)));
      }
    }
  }
}
__name(heldTick, "heldTick");

// ../PokeBattle_2D_v28/lib/kanto.json
var kanto_default = { pokemon: [{ num: 1, id: "bulbasaur", name: "Bulbasaur", types: ["Erba", "Veleno"], ability: "Erbaiuto", stats: [45, 49, 49, 65, 65, 45], basic: true, legendary: false, pre: 0, evolutions: [{ id: 2, level: 16, trigger: "level", item: null }], learn: [[1, 33], [10, 22], [15, 77], [18, 79], [20, 75], [39, 235], [46, 76]], tm: [15, 70, 76, 188, 202, 216, 218, 237, 249, 263, 290, 331], cardCost: 4, cardTier: "Raro" }, { num: 2, id: "ivysaur", name: "Ivysaur", types: ["Erba", "Veleno"], ability: "Erbaiuto", stats: [60, 62, 63, 80, 80, 60], basic: false, legendary: false, pre: 1, evolutions: [{ id: 3, level: 32, trigger: "level", item: null }], learn: [[1, 33], [10, 22], [15, 77], [18, 79], [22, 75], [47, 235], [56, 76]], tm: [15, 70, 76, 188, 202, 216, 218, 237, 249, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 3, id: "venusaur", name: "Venusaur", types: ["Erba", "Veleno"], ability: "Erbaiuto", stats: [80, 82, 83, 100, 100, 80], basic: false, legendary: false, pre: 2, evolutions: [], learn: [[1, 22], [1, 33], [10, 22], [15, 77], [18, 79], [22, 75], [53, 235], [65, 76]], tm: [15, 63, 70, 76, 89, 188, 202, 216, 218, 237, 249, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 4, id: "charmander", name: "Charmander", types: ["Fuoco"], ability: "Aiutofuoco", stats: [39, 52, 43, 60, 50, 65], basic: true, legendary: false, pre: 0, evolutions: [{ id: 5, level: 16, trigger: "level", item: null }], learn: [[1, 10], [7, 52], [13, 232], [31, 53], [37, 163], [43, 82], [49, 83]], tm: [15, 53, 70, 91, 126, 216, 218, 231, 237, 249, 263, 264, 280, 290, 315, 332, 337], cardCost: 4, cardTier: "Raro" }, { num: 5, id: "charmeleon", name: "Charmeleon", types: ["Fuoco"], ability: "Aiutofuoco", stats: [58, 64, 58, 80, 65, 80], basic: false, legendary: false, pre: 4, evolutions: [{ id: 6, level: 36, trigger: "level", item: null }], learn: [[1, 10], [1, 52], [7, 52], [13, 232], [34, 53], [41, 163], [48, 82], [55, 83]], tm: [15, 53, 70, 91, 126, 216, 218, 231, 237, 249, 263, 264, 280, 290, 315, 332, 337], cardCost: 3, cardTier: "Intermedio" }, { num: 6, id: "charizard", name: "Charizard", types: ["Fuoco", "Volante"], ability: "Aiutofuoco", stats: [78, 84, 78, 109, 85, 100], basic: false, legendary: false, pre: 5, evolutions: [], learn: [[1, 10], [1, 52], [1, 232], [1, 257], [7, 52], [13, 232], [34, 53], [36, 17], [44, 163], [54, 82], [64, 83]], tm: [15, 19, 53, 63, 70, 89, 91, 126, 211, 216, 218, 231, 237, 249, 263, 264, 280, 290, 315, 332, 337], cardCost: 3, cardTier: "Intermedio" }, { num: 7, id: "squirtle", name: "Squirtle", types: ["Acqua"], ability: "Acquaiuto", stats: [44, 48, 65, 50, 64, 43], basic: true, legendary: false, pre: 0, evolutions: [{ id: 8, level: 16, trigger: "level", item: null }], learn: [[1, 33], [7, 145], [13, 55], [18, 44], [23, 229], [40, 130], [47, 56]], tm: [57, 58, 59, 70, 91, 127, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 352], cardCost: 4, cardTier: "Raro" }, { num: 8, id: "wartortle", name: "Wartortle", types: ["Acqua"], ability: "Acquaiuto", stats: [59, 63, 80, 65, 80, 58], basic: false, legendary: false, pre: 7, evolutions: [{ id: 9, level: 36, trigger: "level", item: null }], learn: [[1, 33], [1, 145], [7, 145], [13, 55], [19, 44], [25, 229], [45, 130], [53, 56]], tm: [57, 58, 59, 70, 91, 127, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 9, id: "blastoise", name: "Blastoise", types: ["Acqua"], ability: "Acquaiuto", stats: [79, 83, 100, 85, 105, 78], basic: false, legendary: false, pre: 8, evolutions: [], learn: [[1, 33], [1, 145], [7, 145], [13, 55], [19, 44], [25, 229], [55, 130], [68, 56]], tm: [57, 58, 59, 63, 70, 89, 91, 127, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 10, id: "caterpie", name: "Caterpie", types: ["Coleottero"], ability: "Polvoscudo", stats: [45, 30, 35, 20, 20, 45], basic: true, legendary: false, pre: 0, evolutions: [{ id: 11, level: 7, trigger: "level", item: null }], learn: [[1, 33]], tm: [], cardCost: 2, cardTier: "Comune" }, { num: 11, id: "metapod", name: "Metapod", types: ["Coleottero"], ability: "Muta", stats: [50, 20, 55, 25, 25, 30], basic: false, legendary: false, pre: 10, evolutions: [{ id: 12, level: 10, trigger: "level", item: null }], learn: [], tm: [], cardCost: 3, cardTier: "Intermedio" }, { num: 12, id: "butterfree", name: "Butterfree", types: ["Coleottero", "Volante"], ability: "Insettocchi", stats: [60, 45, 50, 90, 80, 70], basic: false, legendary: false, pre: 11, evolutions: [], learn: [[1, 93], [10, 93], [28, 16], [34, 60], [47, 318]], tm: [63, 76, 94, 168, 202, 216, 218, 237, 247, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 13, id: "weedle", name: "Weedle", types: ["Coleottero", "Veleno"], ability: "Polvoscudo", stats: [40, 35, 30, 20, 20, 50], basic: true, legendary: false, pre: 0, evolutions: [{ id: 14, level: 7, trigger: "level", item: null }], learn: [[1, 40]], tm: [], cardCost: 2, cardTier: "Comune" }, { num: 14, id: "kakuna", name: "Kakuna", types: ["Coleottero", "Veleno"], ability: "Muta", stats: [45, 25, 50, 25, 25, 35], basic: false, legendary: false, pre: 13, evolutions: [{ id: 15, level: 10, trigger: "level", item: null }], learn: [], tm: [], cardCost: 3, cardTier: "Intermedio" }, { num: 15, id: "beedrill", name: "Beedrill", types: ["Coleottero", "Veleno"], ability: "Aiutinsetto", stats: [65, 90, 40, 45, 80, 75], basic: false, legendary: false, pre: 14, evolutions: [], learn: [[1, 31], [10, 31], [20, 41], [25, 99], [30, 228], [35, 42], [45, 283]], tm: [15, 63, 76, 168, 188, 202, 216, 218, 237, 249, 263, 280, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 16, id: "pidgey", name: "Pidgey", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [40, 45, 40, 35, 35, 56], basic: true, legendary: false, pre: 0, evolutions: [{ id: 17, level: 18, trigger: "level", item: null }], learn: [[1, 33], [9, 16], [13, 98], [25, 17]], tm: [19, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 2, cardTier: "Comune" }, { num: 17, id: "pidgeotto", name: "Pidgeotto", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [63, 60, 55, 50, 50, 71], basic: false, legendary: false, pre: 16, evolutions: [{ id: 18, level: 36, trigger: "level", item: null }], learn: [[1, 16], [1, 33], [9, 16], [13, 98], [27, 17]], tm: [19, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 18, id: "pidgeot", name: "Pidgeot", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [83, 80, 75, 70, 70, 101], basic: false, legendary: false, pre: 17, evolutions: [], learn: [[1, 16], [1, 33], [1, 98], [9, 16], [13, 98], [27, 17]], tm: [19, 63, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 19, id: "rattata", name: "Rattata", types: ["Normale"], ability: "Fugafacile", stats: [30, 56, 35, 25, 35, 72], basic: true, legendary: false, pre: 0, evolutions: [{ id: 20, level: 20, trigger: "level", item: null }], learn: [[1, 33], [7, 98], [13, 158], [27, 228], [34, 162], [41, 283]], tm: [15, 58, 59, 85, 87, 91, 168, 216, 218, 231, 237, 247, 249, 263, 290, 351], cardCost: 2, cardTier: "Comune" }, { num: 20, id: "raticate", name: "Raticate", types: ["Normale"], ability: "Fugafacile", stats: [55, 81, 60, 50, 70, 97], basic: false, legendary: false, pre: 19, evolutions: [], learn: [[1, 33], [1, 98], [7, 98], [13, 158], [30, 228], [40, 162], [50, 283]], tm: [15, 58, 59, 63, 70, 85, 87, 91, 168, 216, 218, 231, 237, 247, 249, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 21, id: "spearow", name: "Spearow", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [40, 60, 30, 31, 31, 70], basic: true, legendary: false, pre: 0, evolutions: [{ id: 22, level: 20, trigger: "level", item: null }], learn: [[1, 64], [13, 31], [19, 228], [25, 332], [37, 65]], tm: [19, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 2, cardTier: "Comune" }, { num: 22, id: "fearow", name: "Fearow", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [65, 90, 65, 61, 61, 100], basic: false, legendary: false, pre: 21, evolutions: [], learn: [[1, 31], [1, 64], [13, 31], [26, 228], [40, 65]], tm: [19, 63, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 23, id: "ekans", name: "Ekans", types: ["Veleno"], ability: "Prepotenza", stats: [35, 60, 44, 40, 54, 55], basic: true, legendary: false, pre: 0, evolutions: [{ id: 24, level: 22, trigger: "level", item: null }], learn: [[1, 35], [8, 40], [13, 44], [32, 51], [37, 255]], tm: [70, 89, 91, 168, 188, 202, 216, 218, 231, 237, 263, 290], cardCost: 2, cardTier: "Comune" }, { num: 24, id: "arbok", name: "Arbok", types: ["Veleno"], ability: "Prepotenza", stats: [60, 95, 69, 65, 79, 80], basic: false, legendary: false, pre: 23, evolutions: [], learn: [[1, 35], [1, 40], [1, 44], [8, 40], [13, 44], [38, 51], [46, 255]], tm: [63, 70, 89, 91, 168, 188, 202, 216, 218, 231, 237, 263, 290], cardCost: 3, cardTier: "Intermedio" }, { num: 25, id: "pikachu", name: "Pikachu", types: ["Elettro"], ability: "Statico", stats: [35, 55, 40, 50, 50, 90], basic: true, legendary: false, pre: null, evolutions: [{ id: 26, level: 0, trigger: "stone", item: "Pietratuono" }], learn: [[1, 84], [11, 98], [15, 86], [20, 21], [26, 85], [41, 87]], tm: [70, 85, 87, 91, 216, 218, 231, 237, 249, 263, 264, 280, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 26, id: "raichu", name: "Raichu", types: ["Elettro"], ability: "Statico", stats: [60, 90, 55, 90, 80, 110], basic: false, legendary: false, pre: 25, evolutions: [], learn: [[1, 84], [1, 85], [1, 98], [15, 86]], tm: [63, 70, 85, 87, 91, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 27, id: "sandshrew", name: "Sandshrew", types: ["Terra"], ability: "Sabbiavelo", stats: [50, 75, 85, 20, 30, 40], basic: true, legendary: false, pre: 0, evolutions: [{ id: 28, trigger: "level", level: 22, item: null }], learn: [[1, 10], [17, 40], [23, 163], [30, 129], [37, 154], [45, 328]], tm: [15, 70, 89, 91, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 317, 332], cardCost: 2, cardTier: "Comune" }, { num: 28, id: "sandslash", name: "Sandslash", types: ["Terra"], ability: "Sabbiavelo", stats: [75, 100, 110, 45, 55, 65], basic: false, legendary: false, pre: 27, evolutions: [], learn: [[1, 10], [17, 40], [24, 163], [33, 129], [42, 154], [52, 328]], tm: [15, 63, 70, 89, 91, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 29, id: "nidoran-f", name: "Nidoran\u2640", types: ["Veleno"], ability: "Velenopunto", stats: [55, 47, 52, 40, 40, 41], basic: true, legendary: false, pre: 0, evolutions: [{ id: 30, level: 16, trigger: "level", item: null }], learn: [[1, 10], [12, 24], [17, 40], [20, 44], [30, 154], [47, 242]], tm: [15, 58, 59, 70, 85, 87, 91, 168, 188, 216, 218, 231, 237, 249, 263, 290, 332, 351, 352], cardCost: 2, cardTier: "Comune" }, { num: 30, id: "nidorina", name: "Nidorina", types: ["Veleno"], ability: "Velenopunto", stats: [70, 62, 67, 55, 55, 56], basic: false, legendary: false, pre: 29, evolutions: [{ id: 31, level: 0, trigger: "stone", item: "Pietralunare" }], learn: [[1, 10], [12, 24], [18, 40], [22, 44], [34, 154], [53, 242]], tm: [15, 58, 59, 70, 85, 87, 91, 168, 188, 216, 218, 231, 237, 249, 263, 290, 332, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 31, id: "nidoqueen", name: "Nidoqueen", types: ["Veleno", "Terra"], ability: "Velenopunto", stats: [90, 92, 87, 75, 85, 76], basic: false, legendary: false, pre: 30, evolutions: [], learn: [[1, 10], [1, 24], [1, 40], [22, 34], [43, 276]], tm: [15, 53, 57, 58, 59, 63, 70, 85, 87, 89, 91, 126, 168, 188, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 332, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 32, id: "nidoran-m", name: "Nidoran\u2642", types: ["Veleno"], ability: "Velenopunto", stats: [46, 57, 40, 40, 40, 50], basic: true, legendary: false, pre: 0, evolutions: [{ id: 33, level: 16, trigger: "level", item: null }], learn: [[1, 64], [12, 24], [17, 40], [20, 30], [30, 31], [47, 32]], tm: [15, 58, 59, 70, 85, 87, 91, 168, 188, 216, 218, 231, 237, 249, 263, 290, 351, 352], cardCost: 2, cardTier: "Comune" }, { num: 33, id: "nidorino", name: "Nidorino", types: ["Veleno"], ability: "Velenopunto", stats: [61, 72, 57, 55, 55, 65], basic: false, legendary: false, pre: 32, evolutions: [{ id: 34, level: 0, trigger: "stone", item: "Pietralunare" }], learn: [[1, 64], [12, 24], [18, 40], [22, 30], [34, 31], [53, 32]], tm: [15, 58, 59, 70, 85, 87, 91, 168, 188, 216, 218, 231, 237, 249, 263, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 34, id: "nidoking", name: "Nidoking", types: ["Veleno", "Terra"], ability: "Velenopunto", stats: [81, 102, 77, 85, 75, 85], basic: false, legendary: false, pre: 33, evolutions: [], learn: [[1, 24], [1, 40], [1, 64], [22, 37], [43, 224]], tm: [15, 53, 57, 58, 59, 63, 70, 85, 87, 89, 91, 126, 168, 188, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 35, id: "clefairy", name: "Clefairy", types: ["Normale"], ability: "Incantevole", stats: [70, 45, 48, 60, 65, 35], basic: true, legendary: false, pre: null, evolutions: [{ id: 36, level: 0, trigger: "stone", item: "Pietralunare" }], learn: [[1, 1], [13, 3], [37, 236], [45, 309]], tm: [53, 58, 59, 70, 76, 85, 87, 91, 94, 126, 216, 218, 231, 237, 247, 263, 264, 280, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 36, id: "clefable", name: "Clefable", types: ["Normale"], ability: "Incantevole", stats: [95, 70, 73, 95, 90, 60], basic: false, legendary: false, pre: 35, evolutions: [], learn: [[1, 3]], tm: [53, 58, 59, 63, 70, 76, 85, 87, 91, 94, 126, 216, 218, 231, 237, 247, 263, 264, 280, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 37, id: "vulpix", name: "Vulpix", types: ["Fuoco"], ability: "Fuocardore", stats: [38, 41, 40, 50, 65, 65], basic: true, legendary: false, pre: 0, evolutions: [{ id: 38, level: 0, trigger: "stone", item: "Pietrafocaia" }], learn: [[1, 52], [13, 98], [22, 261], [29, 53], [41, 83]], tm: [53, 91, 126, 216, 218, 231, 237, 263, 290, 315], cardCost: 3, cardTier: "Intermedio" }, { num: 38, id: "ninetales", name: "Ninetales", types: ["Fuoco"], ability: "Fuocardore", stats: [73, 76, 75, 81, 100, 100], basic: false, legendary: false, pre: 37, evolutions: [], learn: [[1, 52], [1, 98], [22, 261], [45, 83]], tm: [53, 63, 91, 126, 216, 218, 231, 237, 263, 290, 315], cardCost: 3, cardTier: "Intermedio" }, { num: 39, id: "jigglypuff", name: "Jigglypuff", types: ["Normale"], ability: "Incantevole", stats: [115, 45, 20, 45, 25, 20], basic: true, legendary: false, pre: null, evolutions: [{ id: 40, level: 0, trigger: "stone", item: "Pietralunare" }], learn: [[9, 1], [19, 205], [24, 3], [34, 34], [44, 304], [49, 38]], tm: [53, 58, 59, 70, 76, 85, 87, 91, 94, 126, 216, 218, 237, 247, 263, 264, 280, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 40, id: "wigglytuff", name: "Wigglytuff", types: ["Normale"], ability: "Incantevole", stats: [140, 70, 45, 85, 50, 45], basic: false, legendary: false, pre: 39, evolutions: [], learn: [[1, 3]], tm: [53, 58, 59, 63, 70, 76, 85, 87, 91, 94, 126, 216, 218, 237, 247, 263, 264, 280, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 41, id: "zubat", name: "Zubat", types: ["Veleno", "Volante"], ability: "Forza Interiore", stats: [40, 45, 35, 30, 40, 55], basic: true, legendary: false, pre: 0, evolutions: [{ id: 42, level: 22, trigger: "level", item: null }], learn: [[1, 141], [6, 310], [16, 44], [21, 17], [31, 314], [41, 305]], tm: [168, 188, 202, 211, 216, 218, 237, 247, 263, 290, 332], cardCost: 2, cardTier: "Comune" }, { num: 42, id: "golbat", name: "Golbat", types: ["Veleno", "Volante"], ability: "Forza Interiore", stats: [75, 80, 70, 65, 75, 90], basic: false, legendary: false, pre: 41, evolutions: [], learn: [[1, 141], [1, 310], [6, 310], [16, 44], [21, 17], [35, 314], [49, 305]], tm: [63, 168, 188, 202, 211, 216, 218, 237, 247, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 43, id: "oddish", name: "Oddish", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [45, 50, 55, 75, 65, 30], basic: true, legendary: false, pre: 0, evolutions: [{ id: 44, level: 21, trigger: "level", item: null }], learn: [[1, 71], [15, 77], [18, 79], [23, 51], [32, 236], [39, 80]], tm: [15, 76, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 2, cardTier: "Comune" }, { num: 44, id: "gloom", name: "Gloom", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [60, 65, 70, 85, 75, 40], basic: false, legendary: false, pre: 43, evolutions: [{ id: 45, level: 0, trigger: "stone", item: "Pietrafoglia" }], learn: [[1, 71], [15, 77], [18, 79], [24, 51], [35, 236], [44, 80]], tm: [15, 76, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 45, id: "vileplume", name: "Vileplume", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [75, 80, 85, 110, 90, 50], basic: false, legendary: false, pre: 44, evolutions: [], learn: [[1, 71], [1, 72], [15, 77], [18, 79], [44, 80]], tm: [15, 63, 76, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 46, id: "paras", name: "Paras", types: ["Coleottero", "Erba"], ability: "Spargispora", stats: [35, 70, 55, 45, 55, 25], basic: true, legendary: false, pre: 0, evolutions: [{ id: 47, level: 24, trigger: "level", item: null }], learn: [[1, 10], [19, 141], [31, 163], [43, 202]], tm: [15, 76, 91, 168, 188, 202, 216, 218, 237, 249, 263, 290, 331, 332], cardCost: 2, cardTier: "Comune" }, { num: 47, id: "parasect", name: "Parasect", types: ["Coleottero", "Erba"], ability: "Spargispora", stats: [60, 95, 80, 60, 80, 30], basic: false, legendary: false, pre: 46, evolutions: [], learn: [[1, 10], [19, 141], [35, 163], [51, 202]], tm: [15, 63, 76, 91, 168, 188, 202, 216, 218, 237, 249, 263, 290, 331, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 48, id: "venonat", name: "Venonat", types: ["Coleottero", "Veleno"], ability: "Insettocchi", stats: [60, 55, 50, 40, 55, 45], basic: true, legendary: false, pre: 0, evolutions: [{ id: 49, level: 31, trigger: "level", item: null }], learn: [[1, 33], [15, 77], [17, 93], [18, 79], [25, 141], [33, 60], [41, 94]], tm: [76, 94, 168, 188, 202, 216, 218, 237, 263, 290], cardCost: 2, cardTier: "Comune" }, { num: 49, id: "venomoth", name: "Venomoth", types: ["Coleottero", "Veleno"], ability: "Polvoscudo", stats: [70, 65, 60, 90, 75, 90], basic: false, legendary: false, pre: 48, evolutions: [], learn: [[1, 33], [1, 318], [15, 77], [17, 93], [18, 79], [25, 141], [31, 16], [36, 60], [52, 94]], tm: [63, 76, 94, 168, 188, 202, 216, 218, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 50, id: "diglett", name: "Diglett", types: ["Terra"], ability: "Sabbiavelo", stats: [10, 55, 25, 35, 45, 95], basic: true, legendary: false, pre: 0, evolutions: [{ id: 51, level: 26, trigger: "level", item: null }], learn: [[1, 10], [9, 222], [17, 91], [21, 154], [25, 189], [33, 163], [41, 89], [49, 90]], tm: [15, 89, 91, 168, 188, 216, 218, 237, 249, 263, 290, 317, 332], cardCost: 2, cardTier: "Comune" }, { num: 51, id: "dugtrio", name: "Dugtrio", types: ["Terra"], ability: "Sabbiavelo", stats: [35, 100, 50, 50, 70, 120], basic: false, legendary: false, pre: 50, evolutions: [], learn: [[1, 10], [1, 161], [9, 222], [17, 91], [21, 154], [25, 189], [26, 328], [38, 163], [51, 89], [64, 90]], tm: [15, 63, 89, 91, 168, 188, 216, 218, 237, 249, 263, 290, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 52, id: "meowth", name: "Meowth", types: ["Normale"], ability: "Raccolta", stats: [40, 45, 35, 40, 40, 90], basic: true, legendary: false, pre: 0, evolutions: [{ id: 53, level: 28, trigger: "level", item: null }], learn: [[1, 10], [10, 44], [18, 6], [25, 185], [36, 154], [40, 163], [43, 252]], tm: [15, 85, 87, 91, 168, 216, 218, 231, 237, 247, 263, 290, 332, 351, 352], cardCost: 2, cardTier: "Comune" }, { num: 53, id: "persian", name: "Persian", types: ["Normale"], ability: "Scioltezza", stats: [65, 70, 60, 65, 65, 115], basic: false, legendary: false, pre: 52, evolutions: [], learn: [[1, 10], [1, 44], [10, 44], [18, 6], [25, 185], [42, 154], [49, 163], [55, 252]], tm: [15, 63, 85, 87, 91, 168, 216, 218, 231, 237, 247, 263, 290, 332, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 54, id: "psyduck", name: "Psyduck", types: ["Acqua"], ability: "Umidit\xE0", stats: [50, 52, 48, 65, 50, 55], basic: true, legendary: false, pre: 0, evolutions: [{ id: 55, level: 33, trigger: "level", item: null }], learn: [[1, 10], [16, 93], [40, 154], [50, 56]], tm: [57, 58, 59, 70, 91, 127, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 332, 352], cardCost: 2, cardTier: "Comune" }, { num: 55, id: "golduck", name: "Golduck", types: ["Acqua"], ability: "Umidit\xE0", stats: [80, 82, 78, 95, 80, 85], basic: false, legendary: false, pre: 54, evolutions: [], learn: [[1, 10], [16, 93], [44, 154], [58, 56]], tm: [57, 58, 59, 63, 70, 91, 127, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 332, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 56, id: "mankey", name: "Mankey", types: ["Lotta"], ability: "Spiritovivo", stats: [40, 80, 35, 35, 45, 70], basic: true, legendary: false, pre: 0, evolutions: [{ id: 57, level: 28, trigger: "level", item: null }], learn: [[1, 10], [6, 67], [11, 2], [16, 154], [26, 69], [31, 238], [46, 37]], tm: [70, 85, 87, 89, 91, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 315, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 57, id: "primeape", name: "Primeape", types: ["Lotta"], ability: "Spiritovivo", stats: [65, 105, 60, 60, 70, 95], basic: false, legendary: false, pre: 56, evolutions: [], learn: [[1, 10], [1, 67], [1, 99], [6, 67], [11, 2], [16, 154], [26, 69], [28, 99], [35, 238], [62, 37]], tm: [63, 70, 85, 87, 89, 91, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 315, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 58, id: "growlithe", name: "Growlithe", types: ["Fuoco"], ability: "Prepotenza", stats: [55, 70, 45, 70, 50, 60], basic: true, legendary: false, pre: 0, evolutions: [{ id: 59, level: 0, trigger: "stone", item: "Pietrafocaia" }], learn: [[1, 44], [7, 52], [25, 36], [31, 172], [49, 53]], tm: [53, 70, 91, 126, 168, 216, 218, 231, 237, 249, 263, 290, 315, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 59, id: "arcanine", name: "Arcanine", types: ["Fuoco"], ability: "Prepotenza", stats: [90, 110, 80, 100, 80, 95], basic: false, legendary: false, pre: 58, evolutions: [], learn: [[1, 44], [1, 52], [49, 245]], tm: [53, 63, 70, 91, 126, 168, 216, 218, 231, 237, 249, 263, 290, 315, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 60, id: "poliwag", name: "Poliwag", types: ["Acqua"], ability: "Assorbacqua", stats: [40, 50, 40, 40, 40, 90], basic: true, legendary: false, pre: 0, evolutions: [{ id: 61, level: 25, trigger: "level", item: null }], learn: [[1, 145], [13, 55], [15, 95], [19, 3], [31, 34], [43, 56]], tm: [57, 58, 59, 91, 94, 127, 168, 216, 218, 237, 263, 290, 291, 352], cardCost: 2, cardTier: "Comune" }, { num: 61, id: "poliwhirl", name: "Poliwhirl", types: ["Acqua"], ability: "Assorbacqua", stats: [65, 65, 65, 50, 50, 90], basic: false, legendary: false, pre: 60, evolutions: [{ id: 62, level: 0, trigger: "stone", item: "Pietraidrica" }], learn: [[1, 55], [1, 145], [13, 55], [15, 95], [19, 3], [35, 34], [51, 56]], tm: [57, 58, 59, 70, 89, 91, 94, 127, 168, 216, 218, 237, 249, 263, 264, 280, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 62, id: "poliwrath", name: "Poliwrath", types: ["Acqua", "Lotta"], ability: "Assorbacqua", stats: [90, 95, 95, 70, 90, 70], basic: false, legendary: false, pre: 61, evolutions: [], learn: [[1, 3], [1, 55], [1, 66], [15, 95], [35, 66]], tm: [57, 58, 59, 63, 70, 89, 91, 94, 127, 168, 216, 218, 237, 249, 263, 264, 280, 290, 291, 317, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 63, id: "abra", name: "Abra", types: ["Psico"], ability: "Sincronismo", stats: [25, 20, 15, 105, 55, 90], basic: true, legendary: false, pre: 0, evolutions: [{ id: 64, level: 16, trigger: "level", item: null }], learn: [], tm: [94, 168, 216, 218, 231, 237, 247, 263, 264, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 64, id: "kadabra", name: "Kadabra", types: ["Psico"], ability: "Sincronismo", stats: [40, 35, 30, 120, 70, 105], basic: false, legendary: false, pre: 63, evolutions: [{ id: 65, level: 0, trigger: "trade", item: null }], learn: [[1, 93], [16, 93], [21, 60], [25, 105], [30, 248], [36, 94]], tm: [94, 168, 216, 218, 231, 237, 247, 263, 264, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 65, id: "alakazam", name: "Alakazam", types: ["Psico"], ability: "Sincronismo", stats: [55, 50, 45, 135, 95, 120], basic: false, legendary: false, pre: 64, evolutions: [], learn: [[1, 93], [16, 93], [21, 60], [25, 105], [30, 248], [36, 94]], tm: [63, 94, 168, 216, 218, 231, 237, 247, 263, 264, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 66, id: "machop", name: "Machop", types: ["Lotta"], ability: "Dentistretti", stats: [70, 80, 50, 35, 35, 35], basic: true, legendary: false, pre: 0, evolutions: [{ id: 67, level: 28, trigger: "level", item: null }], learn: [[1, 67], [13, 2], [19, 69], [25, 279], [31, 233], [37, 66], [40, 238], [49, 223]], tm: [53, 70, 89, 91, 126, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 67, id: "machoke", name: "Machoke", types: ["Lotta"], ability: "Dentistretti", stats: [80, 100, 70, 50, 60, 45], basic: false, legendary: false, pre: 66, evolutions: [{ id: 68, level: 0, trigger: "trade", item: null }], learn: [[1, 67], [13, 2], [19, 69], [25, 279], [33, 233], [41, 66], [46, 238], [59, 223]], tm: [53, 70, 89, 91, 126, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 68, id: "machamp", name: "Machamp", types: ["Lotta"], ability: "Dentistretti", stats: [90, 130, 80, 65, 85, 55], basic: false, legendary: false, pre: 67, evolutions: [], learn: [[1, 67], [13, 2], [19, 69], [25, 279], [33, 233], [41, 66], [46, 238], [59, 223]], tm: [53, 63, 70, 89, 91, 126, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 69, id: "bellsprout", name: "Bellsprout", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [50, 75, 35, 70, 30, 40], basic: true, legendary: false, pre: 0, evolutions: [{ id: 70, level: 21, trigger: "level", item: null }], learn: [[1, 22], [11, 35], [15, 77], [18, 79], [23, 51], [37, 75], [45, 21]], tm: [15, 76, 168, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 2, cardTier: "Comune" }, { num: 70, id: "weepinbell", name: "Weepinbell", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [65, 90, 50, 85, 45, 55], basic: false, legendary: false, pre: 69, evolutions: [{ id: 71, level: 0, trigger: "stone", item: "Pietrafoglia" }], learn: [[1, 22], [1, 35], [11, 35], [15, 77], [18, 79], [24, 51], [42, 75], [54, 21]], tm: [15, 76, 168, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 71, id: "victreebel", name: "Victreebel", types: ["Erba", "Veleno"], ability: "Clorofilla", stats: [80, 105, 65, 100, 70, 70], basic: false, legendary: false, pre: 70, evolutions: [], learn: [[1, 22], [1, 75], [1, 255], [15, 77], [18, 79]], tm: [15, 63, 76, 168, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 72, id: "tentacool", name: "Tentacool", types: ["Acqua", "Veleno"], ability: "Corpochiaro", stats: [40, 40, 35, 50, 100, 70], basic: true, legendary: false, pre: 0, evolutions: [{ id: 73, level: 30, trigger: "level", item: null }], learn: [[1, 40], [12, 132], [19, 51], [25, 61], [30, 35], [49, 56]], tm: [15, 57, 58, 59, 127, 168, 188, 202, 216, 218, 237, 263, 290, 291, 352], cardCost: 2, cardTier: "Comune" }, { num: 73, id: "tentacruel", name: "Tentacruel", types: ["Acqua", "Veleno"], ability: "Corpochiaro", stats: [80, 70, 65, 80, 120, 100], basic: false, legendary: false, pre: 72, evolutions: [], learn: [[1, 40], [1, 132], [12, 132], [19, 51], [25, 61], [30, 35], [55, 56]], tm: [15, 57, 58, 59, 63, 127, 168, 188, 202, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 74, id: "geodude", name: "Geodude", types: ["Roccia", "Terra"], ability: "Testadura", stats: [40, 80, 100, 30, 30, 20], basic: true, legendary: false, pre: 0, evolutions: [{ id: 75, level: 25, trigger: "level", item: null }], learn: [[1, 33], [11, 88], [16, 222], [21, 120], [26, 205], [31, 350], [36, 89], [41, 153], [46, 38]], tm: [53, 70, 89, 91, 126, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 2, cardTier: "Comune" }, { num: 75, id: "graveler", name: "Graveler", types: ["Roccia", "Terra"], ability: "Testadura", stats: [55, 95, 115, 45, 45, 35], basic: false, legendary: false, pre: 74, evolutions: [{ id: 76, level: 0, trigger: "trade", item: null }], learn: [[1, 33], [1, 88], [11, 88], [16, 222], [21, 120], [29, 205], [37, 350], [45, 89], [53, 153], [62, 38]], tm: [53, 70, 89, 91, 126, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 76, id: "golem", name: "Golem", types: ["Roccia", "Terra"], ability: "Testadura", stats: [80, 120, 130, 55, 65, 45], basic: false, legendary: false, pre: 75, evolutions: [], learn: [[1, 33], [1, 88], [11, 88], [16, 222], [21, 120], [29, 205], [37, 350], [45, 89], [53, 153], [62, 38]], tm: [53, 63, 70, 89, 91, 126, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 77, id: "ponyta", name: "Ponyta", types: ["Fuoco"], ability: "Fugafacile", stats: [50, 85, 55, 65, 65, 90], basic: true, legendary: false, pre: 0, evolutions: [{ id: 78, level: 40, trigger: "level", item: null }], learn: [[1, 98], [14, 52], [19, 23], [25, 83], [31, 36], [45, 340], [53, 126]], tm: [53, 70, 76, 126, 216, 218, 231, 237, 263, 290, 315], cardCost: 3, cardTier: "Intermedio" }, { num: 78, id: "rapidash", name: "Rapidash", types: ["Fuoco"], ability: "Fugafacile", stats: [65, 100, 70, 80, 80, 105], basic: false, legendary: false, pre: 77, evolutions: [], learn: [[1, 52], [1, 98], [14, 52], [19, 23], [25, 83], [31, 36], [40, 31], [50, 340], [63, 126]], tm: [53, 63, 70, 76, 126, 216, 218, 231, 237, 263, 290, 315], cardCost: 3, cardTier: "Intermedio" }, { num: 79, id: "slowpoke", name: "Slowpoke", types: ["Acqua", "Psico"], ability: "Indifferenza", stats: [90, 65, 65, 40, 40, 15], basic: true, legendary: false, pre: 0, evolutions: [{ id: 80, trigger: "level", level: 37, item: null }], learn: [[1, 33], [13, 55], [17, 93], [29, 29], [40, 94]], tm: [53, 57, 58, 59, 70, 89, 91, 94, 126, 216, 218, 231, 237, 247, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 80, id: "slowbro", name: "Slowbro", types: ["Acqua", "Psico"], ability: "Indifferenza", stats: [95, 75, 110, 100, 80, 30], basic: false, legendary: false, pre: 79, evolutions: [], learn: [[1, 33], [13, 55], [17, 93], [29, 29], [44, 94]], tm: [53, 57, 58, 59, 63, 70, 89, 91, 94, 126, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 81, id: "magnemite", name: "Magnemite", types: ["Elettro", "Acciaio"], ability: "Magnetismo", stats: [25, 35, 70, 95, 55, 45], basic: true, legendary: false, pre: 0, evolutions: [{ id: 82, level: 30, trigger: "level", item: null }], learn: [[1, 33], [6, 84], [15, 86], [16, 49], [26, 209], [38, 129], [50, 192]], tm: [85, 87, 216, 218, 237, 263, 290, 351], cardCost: 2, cardTier: "Comune" }, { num: 82, id: "magneton", name: "Magneton", types: ["Elettro", "Acciaio"], ability: "Magnetismo", stats: [50, 60, 95, 120, 70, 70], basic: false, legendary: false, pre: 81, evolutions: [], learn: [[1, 33], [1, 84], [6, 84], [15, 86], [16, 49], [26, 209], [44, 161], [62, 192]], tm: [63, 85, 87, 216, 218, 237, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 83, id: "farfetchd", name: "Farfetch\u2019d", types: ["Normale", "Volante"], ability: "Sguardofermo", stats: [52, 90, 55, 58, 62, 60], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 64], [16, 31], [21, 282], [26, 210], [41, 163], [46, 206]], tm: [15, 19, 168, 211, 216, 218, 231, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 84, id: "doduo", name: "Doduo", types: ["Normale", "Volante"], ability: "Fugafacile", stats: [35, 85, 45, 35, 35, 75], basic: true, legendary: false, pre: 0, evolutions: [{ id: 85, level: 31, trigger: "level", item: null }], learn: [[1, 64], [9, 228], [13, 31], [21, 161], [25, 99], [33, 253], [37, 65]], tm: [19, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 2, cardTier: "Comune" }, { num: 85, id: "dodrio", name: "Dodrio", types: ["Normale", "Volante"], ability: "Fugafacile", stats: [60, 110, 70, 60, 60, 110], basic: false, legendary: false, pre: 84, evolutions: [], learn: [[1, 31], [1, 64], [1, 228], [9, 228], [13, 31], [21, 161], [25, 99], [38, 253], [47, 65]], tm: [19, 63, 168, 211, 216, 218, 237, 263, 290, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 86, id: "seel", name: "Seel", types: ["Acqua"], ability: "Grassospesso", stats: [65, 45, 55, 45, 70, 45], basic: true, legendary: false, pre: 0, evolutions: [{ id: 87, level: 34, trigger: "level", item: null }], learn: [[1, 29], [17, 196], [21, 62], [37, 36], [41, 58]], tm: [57, 58, 59, 127, 168, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 87, id: "dewgong", name: "Dewgong", types: ["Acqua", "Ghiaccio"], ability: "Grassospesso", stats: [90, 70, 80, 70, 95, 70], basic: false, legendary: false, pre: 86, evolutions: [], learn: [[1, 29], [1, 62], [1, 196], [1, 324], [17, 196], [21, 62], [34, 329], [42, 36], [51, 58]], tm: [57, 58, 59, 63, 127, 168, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 88, id: "grimer", name: "Grimer", types: ["Veleno"], ability: "Tanfo", stats: [80, 80, 50, 40, 50, 25], basic: true, legendary: false, pre: 0, evolutions: [{ id: 89, level: 38, trigger: "level", item: null }], learn: [[1, 1], [13, 124], [43, 188]], tm: [53, 85, 87, 91, 126, 168, 188, 202, 216, 218, 237, 263, 290, 317, 351], cardCost: 2, cardTier: "Comune" }, { num: 89, id: "muk", name: "Muk", types: ["Veleno"], ability: "Tanfo", stats: [105, 105, 75, 65, 100, 50], basic: false, legendary: false, pre: 88, evolutions: [], learn: [[1, 1], [13, 124], [47, 188]], tm: [53, 63, 70, 85, 87, 91, 126, 168, 188, 202, 216, 218, 237, 249, 263, 264, 280, 290, 317, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 90, id: "shellder", name: "Shellder", types: ["Acqua"], ability: "Guscioscudo", stats: [30, 65, 100, 45, 25, 40], basic: true, legendary: false, pre: 0, evolutions: [{ id: 91, level: 0, trigger: "stone", item: "Pietraidrica" }], learn: [[1, 33], [8, 333], [22, 62], [43, 128], [50, 58]], tm: [57, 58, 59, 216, 218, 237, 263, 290, 291, 352], cardCost: 2, cardTier: "Comune" }, { num: 91, id: "cloyster", name: "Cloyster", types: ["Acqua", "Ghiaccio"], ability: "Guscioscudo", stats: [50, 95, 180, 85, 45, 70], basic: false, legendary: false, pre: 90, evolutions: [], learn: [[1, 62], [43, 131]], tm: [57, 58, 59, 63, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 92, id: "gastly", name: "Gastly", types: ["Spettro", "Veleno"], ability: "Levitazione", stats: [30, 35, 30, 100, 35, 80], basic: true, legendary: false, pre: 0, evolutions: [{ id: 93, level: 25, trigger: "level", item: null }], learn: [[1, 122], [15, 95], [16, 101], [22, 261], [28, 138], [36, 247]], tm: [85, 94, 168, 188, 202, 216, 218, 237, 247, 263, 290], cardCost: 3, cardTier: "Intermedio" }, { num: 93, id: "haunter", name: "Haunter", types: ["Spettro", "Veleno"], ability: "Levitazione", stats: [45, 50, 45, 115, 55, 95], basic: false, legendary: false, pre: 92, evolutions: [{ id: 94, level: 0, trigger: "trade", item: null }], learn: [[1, 122], [15, 95], [16, 101], [22, 261], [25, 325], [31, 138], [45, 247]], tm: [85, 94, 168, 188, 202, 216, 218, 237, 247, 263, 290], cardCost: 3, cardTier: "Intermedio" }, { num: 94, id: "gengar", name: "Gengar", types: ["Spettro", "Veleno"], ability: "Levitazione", stats: [60, 65, 60, 130, 75, 110], basic: false, legendary: false, pre: 93, evolutions: [], learn: [[1, 122], [15, 95], [16, 101], [22, 261], [25, 325], [31, 138], [45, 247]], tm: [63, 70, 85, 87, 94, 168, 188, 202, 216, 218, 237, 247, 249, 263, 264, 280, 290], cardCost: 3, cardTier: "Intermedio" }, { num: 95, id: "onix", name: "Onix", types: ["Roccia", "Terra"], ability: "Testadura", stats: [35, 45, 160, 30, 45, 70], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 33], [8, 20], [12, 88], [23, 99], [30, 225], [41, 21], [45, 231], [52, 328], [56, 38]], tm: [70, 89, 91, 216, 218, 231, 237, 249, 263, 290, 317], cardCost: 3, cardTier: "Intermedio" }, { num: 96, id: "drowzee", name: "Drowzee", types: ["Psico"], ability: "Insonnia", stats: [60, 48, 45, 43, 90, 42], basic: true, legendary: false, pre: 0, evolutions: [{ id: 97, level: 26, trigger: "level", item: null }], learn: [[1, 1], [11, 93], [15, 95], [17, 29], [31, 94], [47, 248]], tm: [94, 168, 216, 218, 237, 247, 263, 264, 280, 290], cardCost: 2, cardTier: "Comune" }, { num: 97, id: "hypno", name: "Hypno", types: ["Psico"], ability: "Insonnia", stats: [85, 73, 70, 73, 115, 67], basic: false, legendary: false, pre: 96, evolutions: [], learn: [[1, 1], [1, 93], [11, 93], [15, 95], [17, 29], [35, 94], [57, 248]], tm: [63, 94, 168, 216, 218, 237, 247, 263, 264, 280, 290], cardCost: 3, cardTier: "Intermedio" }, { num: 98, id: "krabby", name: "Krabby", types: ["Acqua"], ability: "Ipertaglio", stats: [30, 105, 90, 25, 25, 50], basic: true, legendary: false, pre: 0, evolutions: [{ id: 99, level: 28, trigger: "level", item: null }], learn: [[1, 145], [12, 11], [23, 341], [27, 23], [34, 12], [45, 152], [49, 175]], tm: [15, 57, 58, 59, 70, 91, 168, 216, 218, 237, 249, 263, 290, 291, 317, 352], cardCost: 2, cardTier: "Comune" }, { num: 99, id: "kingler", name: "Kingler", types: ["Acqua"], ability: "Ipertaglio", stats: [55, 130, 115, 50, 50, 75], basic: false, legendary: false, pre: 98, evolutions: [], learn: [[1, 11], [1, 145], [1, 232], [12, 11], [23, 341], [27, 23], [38, 12], [57, 152], [65, 175]], tm: [15, 57, 58, 59, 63, 70, 91, 168, 216, 218, 237, 249, 263, 290, 291, 317, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 100, id: "voltorb", name: "Voltorb", types: ["Elettro"], ability: "Antisuono", stats: [40, 30, 50, 55, 55, 100], basic: true, legendary: false, pre: 0, evolutions: [{ id: 101, trigger: "level", level: 30, item: null }], learn: [[1, 33], [15, 49], [15, 86], [21, 209], [27, 120], [32, 205], [42, 129], [46, 153], [49, 243]], tm: [85, 87, 168, 216, 218, 237, 263, 290, 351], cardCost: 2, cardTier: "Comune" }, { num: 101, id: "electrode", name: "Electrode", types: ["Elettro"], ability: "Antisuono", stats: [60, 50, 70, 80, 80, 150], basic: false, legendary: false, pre: 100, evolutions: [], learn: [[1, 33], [1, 49], [15, 49], [15, 86], [21, 209], [27, 120], [34, 205], [48, 129], [54, 153], [59, 243]], tm: [63, 85, 87, 168, 216, 218, 237, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 102, id: "exeggcute", name: "Exeggcute", types: ["Erba", "Psico"], ability: "Clorofilla", stats: [60, 40, 80, 60, 45, 40], basic: true, legendary: false, pre: 0, evolutions: [{ id: 103, level: 0, trigger: "stone", item: "Pietrafoglia" }], learn: [[1, 140], [1, 253], [15, 95], [19, 93], [43, 76]], tm: [70, 76, 94, 168, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 103, id: "exeggutor", name: "Exeggutor", types: ["Erba", "Psico"], ability: "Clorofilla", stats: [95, 95, 85, 125, 75, 55], basic: false, legendary: false, pre: 102, evolutions: [], learn: [[1, 93], [1, 140], [15, 95], [19, 23], [31, 121]], tm: [63, 70, 76, 94, 168, 188, 202, 216, 218, 237, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 104, id: "cubone", name: "Cubone", types: ["Terra"], ability: "Testadura", stats: [50, 50, 95, 40, 50, 35], basic: true, legendary: false, pre: 0, evolutions: [{ id: 105, level: 28, trigger: "level", item: null }], learn: [[9, 125], [13, 29], [25, 155], [29, 99], [33, 206], [37, 37], [41, 198], [45, 38]], tm: [53, 58, 59, 70, 89, 91, 126, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 105, id: "marowak", name: "Marowak", types: ["Terra"], ability: "Testadura", stats: [60, 80, 110, 50, 80, 45], basic: false, legendary: false, pre: 104, evolutions: [], learn: [[1, 29], [1, 125], [9, 125], [13, 29], [25, 155], [32, 99], [39, 206], [46, 37], [53, 198], [61, 38]], tm: [53, 58, 59, 63, 70, 89, 91, 126, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 317, 332], cardCost: 3, cardTier: "Intermedio" }, { num: 106, id: "hitmonlee", name: "Hitmonlee", types: ["Lotta"], ability: "Scioltezza", stats: [50, 120, 53, 35, 110, 87], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 24], [1, 279], [11, 27], [16, 26], [20, 280], [26, 136], [46, 25], [51, 179]], tm: [70, 89, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 4, cardTier: "Raro" }, { num: 107, id: "hitmonchan", name: "Hitmonchan", types: ["Lotta"], ability: "Sguardofermo", stats: [50, 105, 79, 35, 110, 76], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 4], [1, 279], [13, 228], [20, 183], [26, 7], [26, 8], [26, 9], [32, 327], [38, 5], [50, 68]], tm: [70, 89, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 4, cardTier: "Raro" }, { num: 108, id: "lickitung", name: "Lickitung", types: ["Normale"], ability: "Mente Locale", stats: [90, 55, 75, 60, 75, 30], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 122], [18, 282], [23, 23], [29, 35], [40, 21]], tm: [15, 53, 57, 58, 59, 63, 70, 76, 85, 87, 89, 91, 126, 168, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 109, id: "koffing", name: "Koffing", types: ["Veleno"], ability: "Levitazione", stats: [40, 65, 95, 60, 45, 35], basic: true, legendary: false, pre: 0, evolutions: [{ id: 110, level: 35, trigger: "level", item: null }], learn: [[1, 33], [9, 123], [17, 120], [21, 124], [41, 153]], tm: [53, 85, 87, 126, 168, 188, 216, 218, 237, 247, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 110, id: "weezing", name: "Weezing", types: ["Veleno"], ability: "Levitazione", stats: [65, 90, 120, 85, 70, 60], basic: false, legendary: false, pre: 109, evolutions: [], learn: [[1, 33], [1, 120], [1, 123], [9, 123], [17, 120], [21, 124], [44, 153]], tm: [53, 63, 85, 87, 126, 168, 188, 216, 218, 237, 247, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 111, id: "rhyhorn", name: "Rhyhorn", types: ["Terra", "Roccia"], ability: "Parafulmine", stats: [80, 85, 95, 30, 30, 25], basic: true, legendary: false, pre: 0, evolutions: [{ id: 112, level: 42, trigger: "level", item: null }], learn: [[1, 30], [10, 23], [15, 31], [29, 350], [38, 32], [43, 36], [52, 89], [57, 224]], tm: [53, 58, 59, 70, 85, 87, 89, 91, 126, 168, 216, 218, 231, 237, 249, 263, 290, 317, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 112, id: "rhydon", name: "Rhydon", types: ["Terra", "Roccia"], ability: "Parafulmine", stats: [105, 130, 120, 45, 45, 40], basic: false, legendary: false, pre: 111, evolutions: [], learn: [[1, 23], [1, 30], [1, 31], [10, 23], [15, 31], [29, 350], [38, 32], [46, 36], [58, 89], [66, 224]], tm: [15, 53, 57, 58, 59, 63, 70, 85, 87, 89, 91, 126, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 317, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 113, id: "chansey", name: "Chansey", types: ["Normale"], ability: "Alternacura", stats: [250, 5, 5, 35, 105, 50], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 1], [13, 135], [17, 3], [35, 121], [57, 38]], tm: [53, 58, 59, 63, 70, 76, 85, 87, 89, 94, 126, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 114, id: "tangela", name: "Tangela", types: ["Erba"], ability: "Clorofilla", stats: [65, 55, 115, 100, 40, 60], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 132], [10, 71], [22, 22], [28, 20], [31, 72], [40, 21]], tm: [15, 63, 76, 168, 188, 202, 216, 218, 237, 249, 263, 290, 331], cardCost: 3, cardTier: "Intermedio" }, { num: 115, id: "kangaskhan", name: "Kangaskhan", types: ["Normale"], ability: "Sveglialampo", stats: [105, 95, 80, 40, 80, 90], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 4], [7, 44], [19, 252], [25, 5], [31, 99], [43, 146], [49, 179]], tm: [15, 53, 57, 58, 59, 63, 70, 76, 85, 87, 89, 91, 126, 168, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 332, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 116, id: "horsea", name: "Horsea", types: ["Acqua"], ability: "Nuotovelox", stats: [30, 40, 70, 70, 25, 60], basic: true, legendary: false, pre: 0, evolutions: [{ id: 117, level: 32, trigger: "level", item: null }], learn: [[1, 145], [22, 55], [29, 239], [43, 56]], tm: [57, 58, 59, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 117, id: "seadra", name: "Seadra", types: ["Acqua"], ability: "Velenopunto", stats: [55, 65, 95, 95, 45, 85], basic: false, legendary: false, pre: 116, evolutions: [], learn: [[1, 55], [1, 145], [22, 55], [29, 239], [51, 56]], tm: [57, 58, 59, 63, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 118, id: "goldeen", name: "Goldeen", types: ["Acqua"], ability: "Nuotovelox", stats: [45, 67, 60, 35, 50, 63], basic: true, legendary: false, pre: 0, evolutions: [{ id: 119, level: 33, trigger: "level", item: null }], learn: [[1, 64], [15, 30], [24, 175], [29, 31], [38, 127], [43, 32], [57, 224]], tm: [57, 58, 59, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 2, cardTier: "Comune" }, { num: 119, id: "seaking", name: "Seaking", types: ["Acqua"], ability: "Nuotovelox", stats: [80, 92, 65, 65, 80, 68], basic: false, legendary: false, pre: 118, evolutions: [], learn: [[1, 64], [15, 30], [24, 175], [29, 31], [41, 127], [49, 32], [69, 224]], tm: [57, 58, 59, 63, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 120, id: "staryu", name: "Staryu", types: ["Acqua"], ability: "Risplendi", stats: [30, 45, 55, 70, 55, 85], basic: true, legendary: false, pre: 0, evolutions: [{ id: 121, level: 0, trigger: "stone", item: "Pietraidrica" }], learn: [[1, 33], [6, 55], [10, 229], [15, 105], [24, 129], [28, 61], [46, 56]], tm: [57, 58, 59, 85, 87, 94, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 121, id: "starmie", name: "Starmie", types: ["Acqua", "Psico"], ability: "Risplendi", stats: [60, 75, 85, 100, 85, 115], basic: false, legendary: false, pre: 120, evolutions: [], learn: [[1, 55], [1, 105], [1, 129], [1, 229]], tm: [57, 58, 59, 63, 85, 87, 94, 127, 216, 218, 237, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 122, id: "mr-mime", name: "Mr. Mime", types: ["Psico"], ability: "Antisuono", stats: [40, 45, 65, 100, 120, 90], basic: true, legendary: false, pre: null, evolutions: [], learn: [[5, 93], [15, 3], [22, 345], [29, 60], [43, 94]], tm: [63, 76, 85, 87, 94, 168, 216, 218, 237, 247, 263, 264, 280, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 123, id: "scyther", name: "Scyther", types: ["Coleottero", "Volante"], ability: "Aiutinsetto", stats: [70, 110, 80, 55, 80, 105], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 98], [11, 228], [16, 206], [26, 17], [31, 163], [46, 210]], tm: [15, 63, 168, 211, 216, 218, 237, 249, 263, 290, 332], cardCost: 4, cardTier: "Raro" }, { num: 124, id: "jynx", name: "Jynx", types: ["Ghiaccio", "Psico"], ability: "Indifferenza", stats: [65, 50, 35, 115, 95, 95], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 1], [1, 122], [1, 181], [13, 181], [21, 3], [25, 8], [51, 34], [67, 59]], tm: [58, 59, 63, 94, 168, 216, 218, 237, 247, 263, 264, 280, 290, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 125, id: "electabuzz", name: "Electabuzz", types: ["Elettro"], ability: "Statico", stats: [65, 83, 57, 95, 85, 105], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 9], [1, 98], [9, 9], [15, 86], [25, 129], [47, 85], [58, 87]], tm: [63, 70, 85, 87, 94, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290, 351], cardCost: 4, cardTier: "Raro" }, { num: 126, id: "magmar", name: "Magmar", types: ["Fuoco"], ability: "Corpodifuoco", stats: [65, 95, 57, 100, 85, 93], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 7], [1, 52], [1, 123], [13, 123], [19, 7], [41, 53], [57, 126]], tm: [53, 63, 70, 94, 126, 168, 216, 218, 231, 237, 249, 263, 264, 280, 290], cardCost: 4, cardTier: "Raro" }, { num: 127, id: "pinsir", name: "Pinsir", types: ["Coleottero"], ability: "Ipertaglio", stats: [65, 125, 100, 55, 70, 85], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 11], [7, 20], [13, 69], [25, 279], [31, 280], [37, 12], [43, 66]], tm: [15, 63, 70, 89, 91, 168, 216, 218, 237, 249, 263, 264, 280, 290, 317], cardCost: 4, cardTier: "Raro" }, { num: 128, id: "tauros", name: "Tauros", types: ["Normale"], ability: "Prepotenza", stats: [75, 100, 95, 40, 70, 110], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 33], [4, 99], [8, 30], [19, 228], [43, 37], [53, 36]], tm: [53, 57, 58, 59, 63, 70, 76, 85, 87, 89, 126, 216, 218, 231, 237, 249, 263, 290, 317, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 129, id: "magikarp", name: "Magikarp", types: ["Acqua"], ability: "Nuotovelox", stats: [20, 10, 55, 15, 20, 80], basic: true, legendary: false, pre: 0, evolutions: [{ id: 130, level: 20, trigger: "level", item: null }], learn: [[15, 33], [30, 175]], tm: [], cardCost: 2, cardTier: "Comune" }, { num: 130, id: "gyarados", name: "Gyarados", types: ["Acqua", "Volante"], ability: "Prepotenza", stats: [95, 125, 79, 60, 100, 81], basic: false, legendary: false, pre: 129, evolutions: [], learn: [[1, 37], [20, 44], [25, 82], [35, 239], [40, 56], [55, 63]], tm: [53, 57, 58, 59, 63, 70, 85, 87, 89, 126, 127, 216, 218, 237, 249, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 131, id: "lapras", name: "Lapras", types: ["Acqua", "Ghiaccio"], ability: "Assorbacqua", stats: [130, 85, 80, 85, 95, 60], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 55], [13, 34], [31, 58], [49, 56], [55, 329]], tm: [57, 58, 59, 63, 70, 85, 87, 94, 127, 216, 218, 231, 237, 249, 263, 290, 291, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 132, id: "ditto", name: "Ditto", types: ["Normale"], ability: "Scioltezza", stats: [48, 48, 48, 48, 48, 48], basic: true, legendary: false, pre: 0, evolutions: [], learn: [], tm: [], cardCost: 4, cardTier: "Raro" }, { num: 133, id: "eevee", name: "Eevee", types: ["Normale"], ability: "Fugafacile", stats: [55, 55, 50, 45, 65, 55], basic: true, legendary: false, pre: 0, evolutions: [{ id: 134, level: 0, trigger: "stone", item: "Pietraidrica" }, { id: 135, level: 0, trigger: "stone", item: "Pietratuono" }, { id: 136, level: 0, trigger: "stone", item: "Pietrafocaia" }], learn: [[1, 33], [23, 98], [30, 44], [42, 36]], tm: [91, 216, 218, 231, 237, 247, 263, 290], cardCost: 4, cardTier: "Raro" }, { num: 134, id: "vaporeon", name: "Vaporeon", types: ["Acqua"], ability: "Assorbacqua", stats: [130, 65, 60, 110, 95, 65], basic: false, legendary: false, pre: 133, evolutions: [], learn: [[1, 33], [16, 55], [23, 98], [30, 44], [36, 62], [52, 56]], tm: [57, 58, 59, 63, 91, 127, 216, 218, 231, 237, 247, 263, 290, 291, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 135, id: "jolteon", name: "Jolteon", types: ["Elettro"], ability: "Assorbivolt", stats: [65, 65, 60, 110, 95, 130], basic: false, legendary: false, pre: 133, evolutions: [], learn: [[1, 33], [16, 84], [23, 98], [30, 24], [36, 42], [52, 87]], tm: [63, 85, 87, 91, 216, 218, 231, 237, 247, 263, 290, 351], cardCost: 3, cardTier: "Intermedio" }, { num: 136, id: "flareon", name: "Flareon", types: ["Fuoco"], ability: "Fuocardore", stats: [65, 130, 60, 95, 110, 65], basic: false, legendary: false, pre: 133, evolutions: [], learn: [[1, 33], [16, 52], [23, 98], [30, 44], [36, 83], [42, 123], [52, 53]], tm: [53, 63, 91, 126, 216, 218, 231, 237, 247, 263, 290, 315], cardCost: 3, cardTier: "Intermedio" }, { num: 137, id: "porygon", name: "Porygon", types: ["Normale"], ability: "Traccia", stats: [65, 60, 70, 85, 75, 40], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 33], [12, 60], [20, 105], [36, 161], [48, 192]], tm: [58, 59, 63, 76, 85, 87, 94, 168, 216, 218, 231, 237, 247, 263, 290, 332, 351], cardCost: 4, cardTier: "Raro" }, { num: 138, id: "omanyte", name: "Omanyte", types: ["Roccia", "Acqua"], ability: "Nuotovelox", stats: [35, 40, 100, 90, 55, 35], basic: true, legendary: false, pre: 0, evolutions: [{ id: 139, level: 40, trigger: "level", item: null }], learn: [[1, 132], [13, 44], [19, 55], [25, 341], [49, 246], [55, 56]], tm: [57, 58, 59, 127, 168, 216, 218, 237, 249, 263, 290, 291, 317, 352], cardCost: 4, cardTier: "Raro" }, { num: 139, id: "omastar", name: "Omastar", types: ["Roccia", "Acqua"], ability: "Nuotovelox", stats: [70, 60, 125, 115, 70, 55], basic: false, legendary: false, pre: 138, evolutions: [], learn: [[1, 44], [1, 55], [1, 132], [13, 44], [19, 55], [25, 341], [40, 131], [55, 246], [65, 56]], tm: [57, 58, 59, 63, 127, 168, 216, 218, 237, 249, 263, 290, 291, 317, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 140, id: "kabuto", name: "Kabuto", types: ["Roccia", "Acqua"], ability: "Nuotovelox", stats: [30, 80, 90, 55, 45, 55], basic: true, legendary: false, pre: 0, evolutions: [{ id: 141, level: 40, trigger: "level", item: null }], learn: [[1, 10], [13, 71], [25, 341], [49, 72], [55, 246]], tm: [57, 58, 59, 91, 127, 168, 202, 216, 218, 237, 249, 263, 290, 317, 332, 352], cardCost: 4, cardTier: "Raro" }, { num: 141, id: "kabutops", name: "Kabutops", types: ["Roccia", "Acqua"], ability: "Nuotovelox", stats: [60, 115, 105, 65, 70, 80], basic: false, legendary: false, pre: 140, evolutions: [], learn: [[1, 10], [1, 71], [1, 210], [13, 71], [25, 341], [40, 163], [55, 72], [65, 246]], tm: [15, 57, 58, 59, 63, 91, 127, 168, 202, 216, 218, 237, 249, 263, 280, 290, 291, 317, 332, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 142, id: "aerodactyl", name: "Aerodactyl", types: ["Roccia", "Volante"], ability: "Testadura", stats: [80, 105, 65, 60, 75, 130], basic: true, legendary: false, pre: 0, evolutions: [], learn: [[1, 17], [15, 44], [29, 246], [43, 36], [50, 63]], tm: [19, 53, 63, 70, 89, 126, 168, 211, 216, 218, 231, 237, 249, 263, 290, 317, 332, 337], cardCost: 4, cardTier: "Raro" }, { num: 143, id: "snorlax", name: "Snorlax", types: ["Normale"], ability: "Immunit\xE0", stats: [160, 110, 65, 65, 110, 30], basic: true, legendary: false, pre: null, evolutions: [], learn: [[1, 33], [17, 29], [29, 173], [33, 34], [45, 343], [49, 205], [53, 63]], tm: [53, 57, 58, 59, 63, 70, 76, 85, 87, 89, 94, 126, 216, 218, 237, 247, 263, 264, 280, 290, 317, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 144, id: "articuno", name: "Articuno", types: ["Ghiaccio", "Volante"], ability: "Pressione", stats: [90, 85, 100, 95, 125, 85], basic: true, legendary: true, pre: 0, evolutions: [], learn: [[1, 16], [1, 181], [49, 58], [73, 59], [85, 329]], tm: [19, 58, 59, 63, 211, 216, 218, 237, 249, 263, 290, 332, 352], cardCost: 4, cardTier: "Raro" }, { num: 145, id: "zapdos", name: "Zapdos", types: ["Elettro", "Volante"], ability: "Pressione", stats: [90, 90, 85, 125, 90, 100], basic: true, legendary: true, pre: 0, evolutions: [], learn: [[1, 64], [1, 84], [49, 65], [85, 87]], tm: [19, 63, 85, 87, 211, 216, 218, 237, 249, 263, 290, 332, 351], cardCost: 4, cardTier: "Raro" }, { num: 146, id: "moltres", name: "Moltres", types: ["Fuoco", "Volante"], ability: "Pressione", stats: [90, 100, 90, 125, 85, 90], basic: true, legendary: true, pre: 0, evolutions: [], learn: [[1, 17], [1, 52], [13, 83], [49, 53], [73, 257], [85, 143]], tm: [19, 53, 63, 126, 211, 216, 218, 237, 249, 263, 290, 315, 332], cardCost: 4, cardTier: "Raro" }, { num: 147, id: "dratini", name: "Dratini", types: ["Drago"], ability: "Muta", stats: [41, 64, 45, 50, 50, 50], basic: true, legendary: false, pre: 0, evolutions: [{ id: 148, level: 30, trigger: "level", item: null }], learn: [[1, 35], [15, 239], [22, 82], [29, 21], [50, 200], [57, 63]], tm: [53, 57, 58, 59, 63, 85, 87, 126, 127, 216, 218, 231, 237, 263, 290, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 148, id: "dragonair", name: "Dragonair", types: ["Drago"], ability: "Muta", stats: [61, 84, 65, 70, 70, 70], basic: false, legendary: false, pre: 147, evolutions: [{ id: 149, level: 55, trigger: "level", item: null }], learn: [[1, 35], [1, 239], [15, 239], [22, 82], [29, 21], [56, 200], [65, 63]], tm: [53, 57, 58, 59, 63, 85, 87, 126, 127, 216, 218, 231, 237, 263, 290, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 149, id: "dragonite", name: "Dragonite", types: ["Drago", "Volante"], ability: "Forza Interiore", stats: [91, 134, 95, 100, 100, 80], basic: false, legendary: false, pre: 148, evolutions: [], learn: [[1, 35], [1, 239], [15, 239], [22, 82], [29, 21], [55, 17], [61, 200], [75, 63]], tm: [15, 19, 53, 57, 58, 59, 63, 70, 85, 87, 89, 126, 127, 211, 216, 218, 231, 237, 249, 263, 264, 280, 290, 291, 317, 332, 337, 351, 352], cardCost: 3, cardTier: "Intermedio" }, { num: 150, id: "mewtwo", name: "Mewtwo", types: ["Psico"], ability: "Pressione", stats: [106, 110, 90, 154, 90, 130], basic: true, legendary: true, pre: 0, evolutions: [], learn: [[1, 93], [33, 129], [44, 105], [66, 94], [88, 248]], tm: [53, 58, 59, 63, 70, 76, 85, 87, 89, 94, 126, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 317, 332, 351, 352], cardCost: 4, cardTier: "Raro" }, { num: 151, id: "mew", name: "Mew", types: ["Psico"], ability: "Sincronismo", stats: [100, 100, 100, 100, 100, 100], basic: true, legendary: true, pre: 0, evolutions: [], learn: [[1, 1], [20, 5], [40, 94], [50, 246]], tm: [15, 19, 53, 57, 58, 59, 63, 70, 76, 85, 87, 89, 91, 94, 126, 127, 168, 188, 202, 211, 216, 218, 231, 237, 247, 249, 263, 264, 280, 290, 291, 315, 317, 331, 332, 337, 351, 352], cardCost: 4, cardTier: "Raro" }], moves: { "1": { key: 1, n: "Botta", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Porta un arto o la coda all'indietro e assesta un colpo secco al bersaglio.", contact: true, animation: { family: "energy", text: "Porta un arto o la coda all'indietro e assesta un colpo secco al bersaglio.", hits: 1 } }, "2": { key: 2, n: "Colpokarate", t: "Lotta", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Solleva la mano di taglio e la cala con un colpo netto, accompagnato da una scia bianca.", contact: true, animation: { family: "punch", text: "Solleva la mano di taglio e la cala con un colpo netto, accompagnato da una scia bianca.", hits: 1 } }, "3": { key: 3, n: "Doppiasberla", t: "Normale", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Alterna rapidi schiaffi da destra e sinistra; mostra un piccolo lampo a ogni impatto.", contact: true, animation: { family: "energy", text: "Alterna rapidi schiaffi da destra e sinistra; mostra un piccolo lampo a ogni impatto.", hits: 2 } }, "4": { key: 4, n: "Cometapugno", t: "Normale", power: 18, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Avanza con una raffica di pugni, alternando le braccia e lasciando brevi scie.", contact: true, animation: { family: "punch", text: "Avanza con una raffica di pugni, alternando le braccia e lasciando brevi scie.", hits: 4 } }, "5": { key: 5, n: "Megapugno", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Carica il pugno, poi sferra un unico colpo pesante con un ampio lampo d'impatto.", contact: true, animation: { family: "punch", text: "Carica il pugno, poi sferra un unico colpo pesante con un ampio lampo d'impatto.", hits: 1 } }, "6": { key: 6, n: "Giornopaga", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scaglia piccole monete contro il bersaglio; alcune rimbalzano sul terreno.", contact: false, animation: { family: "coins", text: "Scaglia piccole monete contro il bersaglio; alcune rimbalzano sul terreno.", hits: 1 } }, "7": { key: 7, n: "Fuocopugno", t: "Fuoco", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "flame", category: 2, desc: "Avvolge il pugno nelle fiamme e colpisce, liberando scintille e una fiammata breve.", contact: true, animation: { family: "punch", text: "Avvolge il pugno nelle fiamme e colpisce, liberando scintille e una fiammata breve.", hits: 1 } }, "8": { key: 8, n: "Gelopugno", t: "Ghiaccio", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Ricopre il pugno di ghiaccio e colpisce, facendo esplodere piccoli cristalli.", contact: true, animation: { family: "punch", text: "Ricopre il pugno di ghiaccio e colpisce, facendo esplodere piccoli cristalli.", hits: 1 } }, "9": { key: 9, n: "Tuonopugno", t: "Elettro", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Carica il pugno di elettricit\xE0 e colpisce, diffondendo archi elettrici all'impatto.", contact: true, animation: { family: "punch", text: "Carica il pugno di elettricit\xE0 e colpisce, diffondendo archi elettrici all'impatto.", hits: 1 } }, "10": { key: 10, n: "Graffio", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Allunga gli artigli e graffia il bersaglio con una breve strisciata luminosa.", contact: true, animation: { family: "slash", text: "Allunga gli artigli e graffia il bersaglio con una breve strisciata luminosa.", hits: 1 } }, "11": { key: 11, n: "Presa", t: "Normale", power: 55, d: 13, c: 1.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Chiude pinze o chele sul bersaglio, con una stretta visibile e un colpo secco.", contact: true, animation: { family: "energy", text: "Chiude pinze o chele sul bersaglio, con una stretta visibile e un colpo secco.", hits: 1 } }, "12": { key: 12, n: "Ghigliottina", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Apre le pinze e le richiude bruscamente sul bersaglio, come lame a ghigliottina.", contact: true, animation: { family: "slash", text: "Apre le pinze e le richiude bruscamente sul bersaglio, come lame a ghigliottina.", hits: 1 } }, "13": { key: 13, n: "Ventagliente", t: "Normale", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Raccoglie vento intorno al corpo, poi libera una lama d'aria verso il bersaglio.", contact: false, animation: { family: "energy", text: "Raccoglie vento intorno al corpo, poi libera una lama d'aria verso il bersaglio.", hits: 1 } }, "15": { key: 15, n: "Taglio", t: "Normale", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra un taglio diagonale con artiglio, lama o appendice, lasciando una scia sottile.", contact: true, animation: { family: "slash", text: "Sferra un taglio diagonale con artiglio, lama o appendice, lasciando una scia sottile.", hits: 1 } }, "16": { key: 16, n: "Raffica", t: "Volante", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Batte le ali o agita l'aria e manda una raffica di vento contro il bersaglio.", contact: false, animation: { family: "wind", text: "Batte le ali o agita l'aria e manda una raffica di vento contro il bersaglio.", hits: 1 } }, "17": { key: 17, n: "Attacco d\u2019Ala", t: "Volante", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Allarga un'ala e colpisce lateralmente il bersaglio durante un breve slancio.", contact: true, animation: { family: "wing", text: "Allarga un'ala e colpisce lateralmente il bersaglio durante un breve slancio.", hits: 1 } }, "19": { key: 19, n: "Volo", t: "Volante", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Decolla e sale fuori dalla portata; poi si tuffa dall'alto sul bersaglio.", contact: true, animation: { family: "fly", text: "Decolla e sale fuori dalla portata; poi si tuffa dall'alto sul bersaglio.", hits: 1 } }, "20": { key: 20, n: "Legatutto", t: "Normale", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Avvolge o stringe il bersaglio con il corpo o un'appendice, mantenendo la presa.", contact: true, animation: { family: "bind", text: "Avvolge o stringe il bersaglio con il corpo o un'appendice, mantenendo la presa.", hits: 1 } }, "21": { key: 21, n: "Schianto", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferza il bersaglio con una lunga appendice o con la coda, con forte oscillazione.", contact: true, animation: { family: "slam", text: "Sferza il bersaglio con una lunga appendice o con la coda, con forte oscillazione.", hits: 1 } }, "22": { key: 22, n: "Frustata", t: "Erba", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "leaf", category: 2, desc: "Estende due liane e le fa schioccare sul bersaglio come fruste.", contact: true, animation: { family: "vine", text: "Estende due liane e le fa schioccare sul bersaglio come fruste.", hits: 1 } }, "23": { key: 23, n: "Pestone", t: "Normale", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Solleva una zampa e pesta il bersaglio dall'alto, sollevando polvere.", contact: true, animation: { family: "kick", text: "Solleva una zampa e pesta il bersaglio dall'alto, sollevando polvere.", hits: 1 } }, "24": { key: 24, n: "Doppiocalcio", t: "Lotta", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra due calci consecutivi, con due impatti distinti.", contact: true, animation: { family: "kick", text: "Sferra due calci consecutivi, con due impatti distinti.", hits: 2 } }, "25": { key: 25, n: "Megacalcio", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Carica una gamba e sferra un calcio potente, con una larga scia ad arco.", contact: true, animation: { family: "kick", text: "Carica una gamba e sferra un calcio potente, con una larga scia ad arco.", hits: 1 } }, "26": { key: 26, n: "Calciosalto", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Salta in avanti e colpisce con il piede; se manca il bersaglio, ricade male.", contact: true, animation: { family: "kick", text: "Salta in avanti e colpisce con il piede; se manca il bersaglio, ricade male.", hits: 1 } }, "27": { key: 27, n: "Calciorullo", t: "Lotta", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota il corpo e sferra un calcio circolare, con una scia che segue il piede.", contact: true, animation: { family: "kick", text: "Ruota il corpo e sferra un calcio circolare, con una scia che segue il piede.", hits: 1 } }, "29": { key: 29, n: "Bottintesta", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Abbassa la testa e avanza con una testata breve e decisa.", contact: true, animation: { family: "slam", text: "Abbassa la testa e avanza con una testata breve e decisa.", hits: 1 } }, "30": { key: 30, n: "Incornata", t: "Normale", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Punta il corno in avanti e affonda contro il bersaglio.", contact: true, animation: { family: "pierce", text: "Punta il corno in avanti e affonda contro il bersaglio.", hits: 1 } }, "31": { key: 31, n: "Furia", t: "Normale", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce ripetutamente con becco o corno, mostrando una sequenza di piccoli impatti.", contact: true, animation: { family: "energy", text: "Colpisce ripetutamente con becco o corno, mostrando una sequenza di piccoli impatti.", hits: 3 } }, "32": { key: 32, n: "Perforcorno", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa ruotare il corno come un trapano e avanza con un affondo perforante.", contact: true, animation: { family: "pierce", text: "Fa ruotare il corno come un trapano e avanza con un affondo perforante.", hits: 1 } }, "33": { key: 33, n: "Azione", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si slancia in avanti e urta il bersaglio con il corpo.", contact: true, animation: { family: "slam", text: "Si slancia in avanti e urta il bersaglio con il corpo.", hits: 1 } }, "34": { key: 34, n: "Corposcontro", t: "Normale", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Salta e si lascia cadere con tutto il corpo sul bersaglio.", contact: true, animation: { family: "slam", text: "Salta e si lascia cadere con tutto il corpo sul bersaglio.", hits: 1 } }, "35": { key: 35, n: "Avvolgibotta", t: "Normale", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Avvolge il bersaglio nelle spire o nelle appendici e lo comprime a intervalli.", contact: true, animation: { family: "bind", text: "Avvolge il bersaglio nelle spire o nelle appendici e lo comprime a intervalli.", hits: 1 } }, "36": { key: 36, n: "Riduttore", t: "Normale", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Prende la rincorsa e carica con forza; dopo l'impatto arretra per il contraccolpo.", contact: true, animation: { family: "slam", text: "Prende la rincorsa e carica con forza; dopo l'impatto arretra per il contraccolpo.", hits: 1 } }, "37": { key: 37, n: "Colpo", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si agita furiosamente e travolge il bersaglio con colpi scomposti e ripetuti.", contact: true, animation: { family: "energy", text: "Si agita furiosamente e travolge il bersaglio con colpi scomposti e ripetuti.", hits: 1 } }, "38": { key: 38, n: "Sdoppiatore", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si lancia in una carica violentissima; l'urto produce un grande lampo e un contraccolpo.", contact: true, animation: { family: "slam", text: "Si lancia in una carica violentissima; l'urto produce un grande lampo e un contraccolpo.", hits: 1 } }, "40": { key: 40, n: "Velenospina", t: "Veleno", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Scaglia o affonda un piccolo aculeo velenoso, con una scintilla viola all'impatto.", contact: false, animation: { family: "needle", text: "Scaglia o affonda un piccolo aculeo velenoso, con una scintilla viola all'impatto.", hits: 1 } }, "41": { key: 41, n: "Doppio Ago", t: "Coleottero", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Affonda due pungiglioni in rapida successione, lasciando due tracce velenose.", contact: false, animation: { family: "needle", text: "Affonda due pungiglioni in rapida successione, lasciando due tracce velenose.", hits: 2 } }, "42": { key: 42, n: "Missilspillo", t: "Coleottero", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Lancia una raffica di aculei sottili che attraversano l'aria come piccoli missili.", contact: false, animation: { family: "needle", text: "Lancia una raffica di aculei sottili che attraversano l'aria come piccoli missili.", hits: 4 } }, "44": { key: 44, n: "Morso", t: "Buio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Apre la bocca e morde il bersaglio, con una sagoma di mascelle all'impatto.", contact: true, animation: { family: "bite", text: "Apre la bocca e morde il bersaglio, con una sagoma di mascelle all'impatto.", hits: 1 } }, "49": { key: 49, n: "Sonicboom", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Produce un'onda d'urto sonora sottile che attraversa rapidamente il campo.", contact: false, animation: { family: "sound", text: "Produce un'onda d'urto sonora sottile che attraversa rapidamente il campo.", hits: 1 } }, "51": { key: 51, n: "Acido", t: "Veleno", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Sputa un getto di liquido acido che schizza sul bersaglio.", contact: false, animation: { family: "poison", text: "Sputa un getto di liquido acido che schizza sul bersaglio.", hits: 1 } }, "52": { key: 52, n: "Braciere", t: "Fuoco", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "flame", category: 3, desc: "Sputa piccole lingue di fuoco o braci che colpiscono il bersaglio.", contact: false, animation: { family: "embers", text: "Sputa piccole lingue di fuoco o braci che colpiscono il bersaglio.", hits: 1 } }, "53": { key: 53, n: "Lanciafiamme", t: "Fuoco", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "flame", category: 3, desc: "Apre la bocca e spara un getto continuo di fiamme verso il bersaglio.", contact: false, animation: { family: "flamethrower", text: "Apre la bocca e spara un getto continuo di fiamme verso il bersaglio.", hits: 1 } }, "55": { key: 55, n: "Pistolacqua", t: "Acqua", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "wave", category: 3, desc: "Spara un getto d'acqua breve e diretto dalla bocca o da un organo adatto.", contact: false, animation: { family: "waterjet", text: "Spara un getto d'acqua breve e diretto dalla bocca o da un organo adatto.", hits: 1 } }, "56": { key: 56, n: "Idropompa", t: "Acqua", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "wave", category: 3, desc: "Spara un getto d'acqua molto potente; Blastoise pu\xF2 usare i cannoni sul guscio.", contact: false, animation: { family: "waterjet", text: "Spara un getto d'acqua molto potente; Blastoise pu\xF2 usare i cannoni sul guscio.", hits: 1 } }, "57": { key: 57, n: "Surf", t: "Acqua", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "radial", category: 3, desc: "Solleva una grande onda che avanza e travolge la zona davanti a lui.", contact: false, areaRadius: 155, animation: { family: "surf", text: "Solleva una grande onda che avanza e travolge la zona davanti a lui.", hits: 1 } }, "58": { key: 58, n: "Geloraggio", t: "Ghiaccio", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "beam", category: 3, desc: "Emette un raggio azzurro gelido che lascia cristalli di ghiaccio sul bersaglio.", contact: false, animation: { family: "icebeam", text: "Emette un raggio azzurro gelido che lascia cristalli di ghiaccio sul bersaglio.", hits: 1 } }, "59": { key: 59, n: "Bora", t: "Ghiaccio", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "radial", category: 3, desc: "Scatena una bufera di neve e ghiaccio che investe l'area avversaria.", contact: false, areaRadius: 145, animation: { family: "ice", text: "Scatena una bufera di neve e ghiaccio che investe l'area avversaria.", hits: 1 } }, "60": { key: 60, n: "Psicoraggio", t: "Psico", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Lancia un raggio psichico multicolore, con pulsazioni luminose lungo la traiettoria.", contact: false, animation: { family: "beam", text: "Lancia un raggio psichico multicolore, con pulsazioni luminose lungo la traiettoria.", hits: 1 } }, "61": { key: 61, n: "Bollaraggio", t: "Acqua", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "bubble", category: 3, desc: "Soffia una raffica direzionata di bolle, che esplodono sul bersaglio.", contact: false, animation: { family: "bubbles", text: "Soffia una raffica direzionata di bolle, che esplodono sul bersaglio.", hits: 1 } }, "62": { key: 62, n: "Raggiaurora", t: "Ghiaccio", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "beam", category: 3, desc: "Emette un raggio dai colori dell'aurora, con riflessi verdi, rosa e azzurri.", contact: false, animation: { family: "ice", text: "Emette un raggio dai colori dell'aurora, con riflessi verdi, rosa e azzurri.", hits: 1 } }, "63": { key: 63, n: "Iper Raggio", t: "Normale", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "beam", category: 3, desc: "Raccoglie energia davanti alla bocca e spara un grosso raggio giallo, poi resta affaticato.", contact: false, animation: { family: "hyperbeam", text: "Raccoglie energia davanti alla bocca e spara un grosso raggio giallo, poi resta affaticato.", hits: 1 } }, "64": { key: 64, n: "Beccata", t: "Volante", power: 35, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Avanza e colpisce il bersaglio con una rapida beccata.", contact: true, animation: { family: "pierce", text: "Avanza e colpisce il bersaglio con una rapida beccata.", hits: 1 } }, "65": { key: 65, n: "Perforbecco", t: "Volante", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota su se stesso e affonda il becco come un trapano.", contact: true, animation: { family: "pierce", text: "Ruota su se stesso e affonda il becco come un trapano.", hits: 1 } }, "66": { key: 66, n: "Sottomissione", t: "Lotta", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio e lo trascina in una presa rotolante, subendo parte dell'urto.", contact: true, animation: { family: "punch", text: "Afferra il bersaglio e lo trascina in una presa rotolante, subendo parte dell'urto.", hits: 1 } }, "67": { key: 67, n: "Colpo Basso", t: "Lotta", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si abbassa e colpisce le gambe o la base d'appoggio del bersaglio.", contact: true, animation: { family: "punch", text: "Si abbassa e colpisce le gambe o la base d'appoggio del bersaglio.", hits: 1 } }, "68": { key: 68, n: "Contrattacco", t: "Lotta", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Incassa un colpo fisico, poi risponde con un contrattacco deciso e un lampo rosso.", contact: true, animation: { family: "punch", text: "Incassa un colpo fisico, poi risponde con un contrattacco deciso e un lampo rosso.", hits: 1 } }, "69": { key: 69, n: "Movim. Sismico", t: "Lotta", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio, lo solleva e lo scaglia a terra con un impatto circolare.", contact: true, animation: { family: "punch", text: "Afferra il bersaglio, lo solleva e lo scaglia a terra con un impatto circolare.", hits: 1 } }, "70": { key: 70, n: "Forza", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Contrae il corpo e sferra una spinta o un colpo fisico di grande forza.", contact: true, animation: { family: "slam", text: "Contrae il corpo e sferra una spinta o un colpo fisico di grande forza.", hits: 1 } }, "71": { key: 71, n: "Assorbimento", t: "Erba", power: 20, d: 10, c: 1.1, s: 330, r: 15, mode: "heal", category: 3, desc: "Richiama piccole particelle verdi dal bersaglio verso il proprio corpo.", contact: false, animation: { family: "drain", text: "Richiama piccole particelle verdi dal bersaglio verso il proprio corpo.", hits: 1 } }, "72": { key: 72, n: "Megassorbimento", t: "Erba", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "heal", category: 3, desc: "Sottrae energia al bersaglio con un flusso verde pi\xF9 ampio di Assorbimento.", contact: false, animation: { family: "drain", text: "Sottrae energia al bersaglio con un flusso verde pi\xF9 ampio di Assorbimento.", hits: 1 } }, "75": { key: 75, n: "Foglielama", t: "Erba", power: 55, d: 13, c: 1.7, s: 420, r: 15, mode: "leaf", category: 2, desc: "Scaglia foglie affilate che ruotano e tagliano il bersaglio.", contact: false, animation: { family: "leaves", text: "Scaglia foglie affilate che ruotano e tagliano il bersaglio.", hits: 1 } }, "76": { key: 76, n: "Solarraggio", t: "Erba", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "beam", category: 3, desc: "Assorbe luce, accumulandola in un punto luminoso, poi spara un raggio solare.", contact: false, animation: { family: "solar", text: "Assorbe luce, accumulandola in un punto luminoso, poi spara un raggio solare.", hits: 1 } }, "80": { key: 80, n: "Petalodanza", t: "Erba", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "radial", category: 3, desc: "Ruota danzando e scatena petali che colpiscono il bersaglio in successione.", contact: false, areaRadius: 130, animation: { family: "petals", text: "Ruota danzando e scatena petali che colpiscono il bersaglio in successione.", hits: 1 } }, "82": { key: 82, n: "Ira di Drago", t: "Drago", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "beam", category: 3, desc: "Libera una fiammata d'energia draconica contro il bersaglio.", contact: false, animation: { family: "dragon", text: "Libera una fiammata d'energia draconica contro il bersaglio.", hits: 1 } }, "83": { key: 83, n: "Turbofuoco", t: "Fuoco", power: 35, d: 10, c: 1.1, s: 330, r: 15, mode: "flame", category: 3, desc: "Crea un vortice di fuoco che avvolge il bersaglio e continua a girargli intorno.", contact: false, animation: { family: "vortex", text: "Crea un vortice di fuoco che avvolge il bersaglio e continua a girargli intorno.", hits: 1 } }, "84": { key: 84, n: "Tuonoshock", t: "Elettro", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "bolt", category: 3, desc: "Emette una piccola scarica elettrica diretta contro il bersaglio.", contact: false, animation: { family: "electric", text: "Emette una piccola scarica elettrica diretta contro il bersaglio.", hits: 1 } }, "85": { key: 85, n: "Fulmine", t: "Elettro", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "bolt", category: 3, desc: "Raccoglie elettricit\xE0 e scarica una forte saetta sul bersaglio.", contact: false, animation: { family: "electric", text: "Raccoglie elettricit\xE0 e scarica una forte saetta sul bersaglio.", hits: 1 } }, "87": { key: 87, n: "Tuono", t: "Elettro", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "bolt", category: 3, desc: "Richiama dall'alto un grande fulmine che cade sul bersaglio.", contact: false, animation: { family: "thunder", text: "Richiama dall'alto un grande fulmine che cade sul bersaglio.", hits: 1 } }, "88": { key: 88, n: "Sassata", t: "Roccia", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Solleva o afferra una pietra e la scaglia contro il bersaglio.", contact: false, animation: { family: "rock", text: "Solleva o afferra una pietra e la scaglia contro il bersaglio.", hits: 1 } }, "89": { key: 89, n: "Terremoto", t: "Terra", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "radial", category: 2, desc: "Colpisce il terreno e provoca scosse, crepe e vibrazioni nell'area circostante.", contact: false, areaRadius: 175, animation: { family: "quake", text: "Colpisce il terreno e provoca scosse, crepe e vibrazioni nell'area circostante.", hits: 1 } }, "90": { key: 90, n: "Abisso", t: "Terra", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Apre una profonda spaccatura sotto il bersaglio, che rischia di precipitarvi.", contact: false, animation: { family: "quake", text: "Apre una profonda spaccatura sotto il bersaglio, che rischia di precipitarvi.", hits: 1 } }, "91": { key: 91, n: "Fossa", t: "Terra", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Scava e scompare sottoterra lasciando terra smossa; poi riemerge sotto il bersaglio.", contact: true, animation: { family: "burrow", text: "Scava e scompare sottoterra lasciando terra smossa; poi riemerge sotto il bersaglio.", hits: 1 } }, "93": { key: 93, n: "Confusione", t: "Psico", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Fissa il bersaglio e lo investe con un impulso psichico che distorce l'aria.", contact: false, animation: { family: "psychic", text: "Fissa il bersaglio e lo investe con un impulso psichico che distorce l'aria.", hits: 1 } }, "94": { key: 94, n: "Psichico", t: "Psico", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Avvolge il bersaglio in energia psichica, sollevandolo o comprimendolo prima dell'urto.", contact: false, animation: { family: "psychic", text: "Avvolge il bersaglio in energia psichica, sollevandolo o comprimendolo prima dell'urto.", hits: 1 } }, "98": { key: 98, n: "Attacco Rapido", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta in linea retta e colpisce prima che il bersaglio possa reagire.", contact: true, animation: { family: "dash", text: "Scatta in linea retta e colpisce prima che il bersaglio possa reagire.", hits: 1 } }, "99": { key: 99, n: "Ira", t: "Normale", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Si accende di un'aura rossa e colpisce con rabbia, mostrando crescente agitazione.", contact: true, animation: { family: "energy", text: "Si accende di un'aura rossa e colpisce con rabbia, mostrando crescente agitazione.", hits: 1 } }, "101": { key: 101, n: "Ombra Notturna", t: "Spettro", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Proietta una presenza oscura o un'ombra minacciosa che investe il bersaglio.", contact: false, animation: { family: "heal", text: "Proietta una presenza oscura o un'ombra minacciosa che investe il bersaglio.", hits: 1 } }, "105": { key: 105, n: "Ripresa", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Raccoglie energia luminosa nel corpo; scintille curative risalgono lungo la sagoma.", contact: false, animation: { family: "heal", text: "Raccoglie energia luminosa nel corpo; scintille curative risalgono lungo la sagoma.", hits: 1 } }, "117": { key: 117, n: "Pazienza", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Resta fermo a incassare, accumulando bagliori; poi libera l'energia contro il bersaglio.", contact: true, animation: { family: "energy", text: "Resta fermo a incassare, accumulando bagliori; poi libera l'energia contro il bersaglio.", hits: 1 } }, "120": { key: 120, n: "Autodistruzione", t: "Normale", power: 200, d: 48, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Si gonfia o si illumina, poi esplode in un'onda d'urto che lo mette fuori combattimento.", contact: false, animation: { family: "explosion", text: "Si gonfia o si illumina, poi esplode in un'onda d'urto che lo mette fuori combattimento.", hits: 1 } }, "121": { key: 121, n: "Uovobomba", t: "Normale", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Lancia un uovo che esplode sul bersaglio in un lampo e frammenti luminosi.", contact: false, animation: { family: "egg", text: "Lancia un uovo che esplode sul bersaglio in un lampo e frammenti luminosi.", hits: 1 } }, "122": { key: 122, n: "Leccata", t: "Spettro", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Allunga la lingua e lecca il bersaglio, con una breve scia umida.", contact: true, animation: { family: "tongue", text: "Allunga la lingua e lecca il bersaglio, con una breve scia umida.", hits: 1 } }, "123": { key: 123, n: "Smog", t: "Veleno", power: 30, d: 10, c: 1.1, s: 330, r: 15, mode: "shot", category: 3, desc: "Soffia una nube di smog violaceo che investe il bersaglio.", contact: false, animation: { family: "powder", text: "Soffia una nube di smog violaceo che investe il bersaglio.", hits: 1 } }, "124": { key: 124, n: "Fango", t: "Veleno", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Sputa una massa di fango tossico che si spiaccica sul bersaglio.", contact: false, animation: { family: "poison", text: "Sputa una massa di fango tossico che si spiaccica sul bersaglio.", hits: 1 } }, "125": { key: 125, n: "Ossoclava", t: "Terra", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Brandisce un osso e assesta una bastonata secca.", contact: false, animation: { family: "bone", text: "Brandisce un osso e assesta una bastonata secca.", hits: 1 } }, "126": { key: 126, n: "Fuocobomba", t: "Fuoco", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "flame", category: 3, desc: "Scaglia una grande fiammata che si apre in una figura di fuoco ramificata sul bersaglio.", contact: false, animation: { family: "fireburst", text: "Scaglia una grande fiammata che si apre in una figura di fuoco ramificata sul bersaglio.", hits: 1 } }, "127": { key: 127, n: "Cascata", t: "Acqua", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "wave", category: 2, desc: "Si avvolge d'acqua e risale con uno slancio violento contro il bersaglio.", contact: true, animation: { family: "water", text: "Si avvolge d'acqua e risale con uno slancio violento contro il bersaglio.", hits: 1 } }, "128": { key: 128, n: "Tenaglia", t: "Acqua", power: 35, d: 10, c: 1.1, s: 420, r: 15, mode: "wave", category: 2, desc: "Richiude la conchiglia o le chele sul bersaglio e mantiene la stretta.", contact: true, animation: { family: "water", text: "Richiude la conchiglia o le chele sul bersaglio e mantiene la stretta.", hits: 1 } }, "129": { key: 129, n: "Comete", t: "Normale", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Lancia stelle luminose che curvano verso il bersaglio.", contact: false, animation: { family: "energy", text: "Lancia stelle luminose che curvano verso il bersaglio.", hits: 1 } }, "130": { key: 130, n: "Capocciata", t: "Normale", power: 130, d: 31, c: 4.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Abbassa e protegge la testa, poi parte con una potente testata in avanti.", contact: true, animation: { family: "energy", text: "Abbassa e protegge la testa, poi parte con una potente testata in avanti.", hits: 1 } }, "131": { key: 131, n: "Sparalance", t: "Normale", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Spara pi\xF9 punte o aculei rigidi in rapida successione.", contact: false, animation: { family: "needle", text: "Spara pi\xF9 punte o aculei rigidi in rapida successione.", hits: 4 } }, "132": { key: 132, n: "Limitazione", t: "Normale", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Stringe il bersaglio con tentacoli o appendici sottili, comprimendolo brevemente.", contact: true, animation: { family: "bind", text: "Stringe il bersaglio con tentacoli o appendici sottili, comprimendolo brevemente.", hits: 1 } }, "135": { key: 135, n: "Covauova", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Fa apparire un uovo curativo, che si apre in scintille assorbite dal corpo.", contact: false, animation: { family: "heal", text: "Fa apparire un uovo curativo, che si apre in scintille assorbite dal corpo.", hits: 1 } }, "136": { key: 136, n: "Calcinvolo", t: "Lotta", power: 130, d: 31, c: 4.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Salta molto in alto e scende con una ginocchiata o un calcio; l'errore provoca una brutta caduta.", contact: true, animation: { family: "kick", text: "Salta molto in alto e scende con una ginocchiata o un calcio; l'errore provoca una brutta caduta.", hits: 1 } }, "138": { key: 138, n: "Mangiasogni", t: "Psico", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "heal", category: 3, desc: "Richiama dal bersaglio addormentato un flusso d'energia onirica e lo assorbe.", contact: false, animation: { family: "drain", text: "Richiama dal bersaglio addormentato un flusso d'energia onirica e lo assorbe.", hits: 1 } }, "140": { key: 140, n: "Attacco Pioggia", t: "Normale", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Scaglia ripetutamente oggetti rotondi o semi esplosivi contro il bersaglio.", contact: false, animation: { family: "seed", text: "Scaglia ripetutamente oggetti rotondi o semi esplosivi contro il bersaglio.", hits: 4 } }, "141": { key: 141, n: "Sanguisuga", t: "Coleottero", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Si attacca al bersaglio e gli sottrae energia con un flusso rosso o verde.", contact: true, animation: { family: "drain", text: "Si attacca al bersaglio e gli sottrae energia con un flusso rosso o verde.", hits: 1 } }, "143": { key: 143, n: "Aeroattacco", t: "Volante", power: 140, d: 34, c: 4.4, s: 420, r: 22, mode: "slash", category: 2, desc: "Si concentra in un'aura luminosa, poi si lancia in un potentissimo assalto dall'alto.", contact: false, animation: { family: "fly", text: "Si concentra in un'aura luminosa, poi si lancia in un potentissimo assalto dall'alto.", hits: 1 } }, "145": { key: 145, n: "Bolla", t: "Acqua", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "bubble", category: 3, desc: "Emette piccole bolle che avanzano lentamente e scoppiano sul bersaglio.", contact: false, animation: { family: "bubbles", text: "Emette piccole bolle che avanzano lentamente e scoppiano sul bersaglio.", hits: 1 } }, "146": { key: 146, n: "Stordipugno", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra un pugno oscillante e imprevedibile; simboli confusi compaiono all'impatto.", contact: true, animation: { family: "punch", text: "Sferra un pugno oscillante e imprevedibile; simboli confusi compaiono all'impatto.", hits: 1 } }, "149": { key: 149, n: "Psiconda", t: "Psico", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Emette onde psichiche concentriche che pulsano contro il bersaglio.", contact: false, animation: { family: "psychic", text: "Emette onde psichiche concentriche che pulsano contro il bersaglio.", hits: 1 } }, "152": { key: 152, n: "Martellata", t: "Acqua", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "wave", category: 2, desc: "Solleva una grossa chela e la abbatte sul bersaglio come un martello.", contact: true, animation: { family: "water", text: "Solleva una grossa chela e la abbatte sul bersaglio come un martello.", hits: 1 } }, "153": { key: 153, n: "Esplosione", t: "Normale", power: 250, d: 60, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Accumula energia e scatena una grande esplosione, restando fuori combattimento.", contact: false, animation: { family: "explosion", text: "Accumula energia e scatena una grande esplosione, restando fuori combattimento.", hits: 1 } }, "154": { key: 154, n: "Sfuriate", t: "Normale", power: 18, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Graffia ripetutamente con gli artigli, alternando pi\xF9 strisciate veloci.", contact: true, animation: { family: "energy", text: "Graffia ripetutamente con gli artigli, alternando pi\xF9 strisciate veloci.", hits: 4 } }, "155": { key: 155, n: "Ossomerang", t: "Terra", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Lancia l'osso come un boomerang: colpisce all'andata e durante il ritorno.", contact: false, animation: { family: "bone", text: "Lancia l'osso come un boomerang: colpisce all'andata e durante il ritorno.", hits: 1 } }, "157": { key: 157, n: "Frana", t: "Roccia", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa cadere una pioggia di grosse rocce sulla zona avversaria.", contact: false, animation: { family: "rock", text: "Fa cadere una pioggia di grosse rocce sulla zona avversaria.", hits: 1 } }, "158": { key: 158, n: "Iperzanna", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Apre molto le fauci e assesta un morso energico, con grandi denti luminosi.", contact: true, animation: { family: "bite", text: "Apre molto le fauci e assesta un morso energico, con grandi denti luminosi.", hits: 1 } }, "161": { key: 161, n: "Tripletta", t: "Normale", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Lancia tre fasci o sfere d'energia, associati a fuoco, ghiaccio ed elettricit\xE0.", contact: false, animation: { family: "energy", text: "Lancia tre fasci o sfere d'energia, associati a fuoco, ghiaccio ed elettricit\xE0.", hits: 1 } }, "162": { key: 162, n: "Superzanna", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Morde con gli incisivi in un colpo preciso, evidenziato da una grande sagoma di denti.", contact: true, animation: { family: "bite", text: "Morde con gli incisivi in un colpo preciso, evidenziato da una grande sagoma di denti.", hits: 1 } }, "163": { key: 163, n: "Lacerazione", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra una lunga artigliata diagonale con un lampo netto.", contact: true, animation: { family: "slash", text: "Sferra una lunga artigliata diagonale con un lampo netto.", hits: 1 } }, "165": { key: 165, n: "Scontro", t: "Normale", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 50, adattata alla battaglia arcade.", contact: true }, "167": { key: 167, n: "Triplocalcio", t: "Lotta", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 10, adattata alla battaglia arcade.", contact: true }, "168": { key: 168, n: "Furto", t: "Buio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta sul bersaglio, lo colpisce e trascina verso di s\xE9 l'eventuale strumento rubato.", contact: true, animation: { family: "dark", text: "Scatta sul bersaglio, lo colpisce e trascina verso di s\xE9 l'eventuale strumento rubato.", hits: 1 } }, "172": { key: 172, n: "Ruotafuoco", t: "Fuoco", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "flame", category: 2, desc: "Si avvolge nelle fiamme e rotola o ruota in avanti contro il bersaglio.", contact: true, animation: { family: "roll", text: "Si avvolge nelle fiamme e rotola o ruota in avanti contro il bersaglio.", hits: 1 } }, "173": { key: 173, n: "Russare", t: "Normale", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Continua a dormire ed emette un forte russare, reso con onde sonore.", contact: false, animation: { family: "sound", text: "Continua a dormire ed emette un forte russare, reso con onde sonore.", hits: 1 } }, "175": { key: 175, n: "Flagello", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si dimena disperatamente e colpisce con arti e corpo, con movimenti scomposti.", contact: true, animation: { family: "energy", text: "Si dimena disperatamente e colpisce con arti e corpo, con movimenti scomposti.", hits: 1 } }, "177": { key: 177, n: "Aerocolpo", t: "Volante", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Volante. Potenza 100, adattata alla battaglia arcade.", contact: false }, "179": { key: 179, n: "Contropiede", t: "Lotta", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Barcolla, raccoglie le forze rimaste e sferra un colpo di reazione.", contact: true, animation: { family: "punch", text: "Barcolla, raccoglie le forze rimaste e sferra un colpo di reazione.", hits: 1 } }, "181": { key: 181, n: "Polneve", t: "Ghiaccio", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "beam", category: 3, desc: "Soffia una nube leggera di neve farinosa contro i nemici.", contact: false, animation: { family: "ice", text: "Soffia una nube leggera di neve farinosa contro i nemici.", hits: 1 } }, "183": { key: 183, n: "Pugnorapido", t: "Lotta", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta con il braccio e sferra un pugno rapidissimo, con una scia corta.", contact: true, animation: { family: "punch", text: "Scatta con il braccio e sferra un pugno rapidissimo, con una scia corta.", hits: 1 } }, "185": { key: 185, n: "Finta", t: "Buio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Finge di arretrare, poi cambia direzione e colpisce a sorpresa.", contact: true, animation: { family: "dash", text: "Finge di arretrare, poi cambia direzione e colpisce a sorpresa.", hits: 1 } }, "188": { key: 188, n: "Fangobomba", t: "Veleno", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Lancia una sfera di fango velenoso che esplode in schizzi viola.", contact: false, animation: { family: "poison", text: "Lancia una sfera di fango velenoso che esplode in schizzi viola.", hits: 1 } }, "189": { key: 189, n: "Fangosberla", t: "Terra", power: 20, d: 10, c: 1.1, s: 330, r: 15, mode: "shot", category: 3, desc: "Scaglia una manciata di fango verso il viso del bersaglio.", contact: false, animation: { family: "earth", text: "Scaglia una manciata di fango verso il viso del bersaglio.", hits: 1 } }, "190": { key: 190, n: "Octazooka", t: "Acqua", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "wave", category: 3, desc: "Spara una sfera d'inchiostro scuro che esplode e sporca il bersaglio.", contact: false, animation: { family: "water", text: "Spara una sfera d'inchiostro scuro che esplode e sporca il bersaglio.", hits: 1 } }, "192": { key: 192, n: "Falcecannone", t: "Elettro", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "bolt", category: 3, desc: "Accumula una grossa sfera elettrica e la spara come un colpo di cannone.", contact: false, animation: { family: "beam", text: "Accumula una grossa sfera elettrica e la spara come un colpo di cannone.", hits: 1 } }, "196": { key: 196, n: "Ventogelato", t: "Ghiaccio", power: 55, d: 13, c: 1.7, s: 330, r: 15, mode: "beam", category: 3, desc: "Soffia un vento freddo, con piccoli cristalli che attraversano il campo.", contact: false, animation: { family: "ice", text: "Soffia un vento freddo, con piccoli cristalli che attraversano il campo.", hits: 1 } }, "198": { key: 198, n: "Ossoraffica", t: "Terra", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa roteare un osso e colpisce pi\xF9 volte con rapidi affondi.", contact: false, animation: { family: "bone", text: "Fa roteare un osso e colpisce pi\xF9 volte con rapidi affondi.", hits: 3 } }, "200": { key: 200, n: "Oltraggio", t: "Drago", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si avvolge di energia draconica e attacca furiosamente con colpi ripetuti.", contact: true, animation: { family: "beam", text: "Si avvolge di energia draconica e attacca furiosamente con colpi ripetuti.", hits: 1 } }, "202": { key: 202, n: "Gigassorbimento", t: "Erba", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "heal", category: 3, desc: "Estrae un ampio flusso di energia verde dal bersaglio e lo assorbe.", contact: false, animation: { family: "drain", text: "Estrae un ampio flusso di energia verde dal bersaglio e lo assorbe.", hits: 1 } }, "205": { key: 205, n: "Rotolamento", t: "Roccia", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Si rannicchia e rotola contro il bersaglio; le cariche successive acquistano slancio.", contact: true, animation: { family: "roll", text: "Si rannicchia e rotola contro il bersaglio; le cariche successive acquistano slancio.", hits: 1 } }, "206": { key: 206, n: "Falsofinale", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra un taglio controllato, arrestando la lama o l'artiglio prima di un colpo decisivo.", contact: true, animation: { family: "energy", text: "Sferra un taglio controllato, arrestando la lama o l'artiglio prima di un colpo decisivo.", hits: 1 } }, "208": { key: 208, n: "Buonlatte", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Recupera salute.", contact: false }, "209": { key: 209, n: "Scintilla", t: "Elettro", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si riveste di scintille e colpisce il bersaglio con una breve carica elettrica.", contact: true, animation: { family: "electric", text: "Si riveste di scintille e colpisce il bersaglio con una breve carica elettrica.", hits: 1 } }, "210": { key: 210, n: "Tagliofuria", t: "Coleottero", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra tagli consecutivi e sempre pi\xF9 energici, con scie verdi.", contact: true, animation: { family: "slash", text: "Sferra tagli consecutivi e sempre pi\xF9 energici, con scie verdi.", hits: 1 } }, "211": { key: 211, n: "Alacciaio", t: "Acciaio", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Irrigidisce le ali, che diventano metalliche, e colpisce il bersaglio di lato.", contact: true, animation: { family: "wing", text: "Irrigidisce le ali, che diventano metalliche, e colpisce il bersaglio di lato.", hits: 1 } }, "216": { key: 216, n: "Ritorno", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si illumina di un'aura affettuosa e si lancia con decisione contro il bersaglio.", contact: true, animation: { family: "energy", text: "Si illumina di un'aura affettuosa e si lancia con decisione contro il bersaglio.", hits: 1 } }, "217": { key: 217, n: "Regalino", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Offre o lancia un pacchetto regalo, che pu\xF2 esplodere oppure liberare energia curativa.", contact: false, animation: { family: "heal", text: "Offre o lancia un pacchetto regalo, che pu\xF2 esplodere oppure liberare energia curativa.", hits: 1 } }, "218": { key: 218, n: "Frustrazione", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si agita con rabbia e colpisce il bersaglio con una carica brusca.", contact: true, animation: { family: "slam", text: "Si agita con rabbia e colpisce il bersaglio con una carica brusca.", hits: 1 } }, "221": { key: 221, n: "Magifuoco", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 100, adattata alla battaglia arcade.", contact: false }, "222": { key: 222, n: "Magnitudo", t: "Terra", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Pesta il terreno, provocando una scossa di intensit\xE0 variabile e piccoli sobbalzi.", contact: false, animation: { family: "quake", text: "Pesta il terreno, provocando una scossa di intensit\xE0 variabile e piccoli sobbalzi.", hits: 1 } }, "223": { key: 223, n: "Dinamipugno", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Carica un pugno e colpisce con un'esplosione d'urto che stordisce il bersaglio.", contact: true, animation: { family: "punch", text: "Carica un pugno e colpisce con un'esplosione d'urto che stordisce il bersaglio.", hits: 1 } }, "224": { key: 224, n: "Megacorno", t: "Coleottero", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Abbassa il grosso corno e trafigge il bersaglio con una carica potente.", contact: true, animation: { family: "pierce", text: "Abbassa il grosso corno e trafigge il bersaglio con una carica potente.", hits: 1 } }, "225": { key: 225, n: "Dragospiro", t: "Drago", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "beam", category: 3, desc: "Soffia un getto concentrato di energia draconica, con piccole scintille colorate.", contact: false, animation: { family: "dragon", text: "Soffia un getto concentrato di energia draconica, con piccole scintille colorate.", hits: 1 } }, "228": { key: 228, n: "Inseguimento", t: "Buio", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta dietro al bersaglio in ritirata e lo colpisce durante l'allontanamento.", contact: true, animation: { family: "dash", text: "Scatta dietro al bersaglio in ritirata e lo colpisce durante l'allontanamento.", hits: 1 } }, "229": { key: 229, n: "Rapigiro", t: "Normale", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "radial", category: 2, desc: "Ruota velocemente su se stesso, colpendo e spazzando via gli ostacoli vicini.", contact: false, areaRadius: 140, animation: { family: "spin", text: "Ruota velocemente su se stesso, colpendo e spazzando via gli ostacoli vicini.", hits: 1 } }, "231": { key: 231, n: "Codacciaio", t: "Acciaio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Rende la coda metallica e la sferra con un ampio colpo laterale.", contact: true, animation: { family: "tail", text: "Rende la coda metallica e la sferra con un ampio colpo laterale.", hits: 1 } }, "232": { key: 232, n: "Ferrartigli", t: "Acciaio", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa brillare gli artigli come acciaio e graffia il bersaglio.", contact: true, animation: { family: "slash", text: "Fa brillare gli artigli come acciaio e graffia il bersaglio.", hits: 1 } }, "233": { key: 233, n: "Vitaltiro", t: "Lotta", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Aspetta il contatto, afferra il bersaglio e lo proietta con una presa decisa.", contact: true, animation: { family: "punch", text: "Aspetta il contatto, afferra il bersaglio e lo proietta con una presa decisa.", hits: 1 } }, "234": { key: 234, n: "Mattindoro", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Alza il corpo verso una luce calda dell'alba e assorbe scintille curative.", contact: false, animation: { family: "heal", text: "Alza il corpo verso una luce calda dell'alba e assorbe scintille curative.", hits: 1 } }, "235": { key: 235, n: "Sintesi", t: "Erba", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Assorbe luce attraverso foglie o corpo; bagliori verdi indicano il recupero.", contact: false, animation: { family: "heal", text: "Assorbe luce attraverso foglie o corpo; bagliori verdi indicano il recupero.", hits: 1 } }, "236": { key: 236, n: "Lucelunare", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "heal", category: 1, desc: "Si raccoglie sotto un fascio di luce lunare, con scintille argentate curative.", contact: false, animation: { family: "heal", text: "Si raccoglie sotto un fascio di luce lunare, con scintille argentate curative.", hits: 1 } }, "237": { key: 237, n: "Introforza", t: "Normale", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Raccoglie energia attorno a s\xE9 e la lancia; il colore pu\xF2 rappresentare il tipo previsto dalle regole scelte.", contact: false, animation: { family: "slam", text: "Raccoglie energia attorno a s\xE9 e la lancia; il colore pu\xF2 rappresentare il tipo previsto dalle regole scelte.", hits: 1 } }, "238": { key: 238, n: "Incrocolpo", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Incrocia le braccia e cala un doppio colpo di taglio, formando una X.", contact: true, animation: { family: "punch", text: "Incrocia le braccia e cala un doppio colpo di taglio, formando una X.", hits: 1 } }, "239": { key: 239, n: "Tornado", t: "Drago", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "beam", category: 3, desc: "Genera un piccolo vortice d'energia draconica che investe il bersaglio.", contact: false, animation: { family: "vortex", text: "Genera un piccolo vortice d'energia draconica che investe il bersaglio.", hits: 1 } }, "242": { key: 242, n: "Sgranocchio", t: "Buio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio con le fauci e stringe con forza, con un impatto scuro.", contact: true, animation: { family: "bite", text: "Afferra il bersaglio con le fauci e stringe con forza, con un impatto scuro.", hits: 1 } }, "243": { key: 243, n: "Specchiovelo", t: "Psico", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Si avvolge in un velo riflettente che rimanda un colpo speciale verso il mittente.", contact: false, animation: { family: "psychic", text: "Si avvolge in un velo riflettente che rimanda un colpo speciale verso il mittente.", hits: 1 } }, "245": { key: 245, n: "Extrarapido", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Scompare in una scia rapidissima e ricompare dopo aver urtato il bersaglio.", contact: true, animation: { family: "dash", text: "Scompare in una scia rapidissima e ricompare dopo aver urtato il bersaglio.", hits: 1 } }, "246": { key: 246, n: "Forzantica", t: "Roccia", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Richiama pietre intrise di energia antica e le scaglia contro il bersaglio.", contact: false, animation: { family: "rock", text: "Richiama pietre intrise di energia antica e le scaglia contro il bersaglio.", hits: 1 } }, "247": { key: 247, n: "Palla Ombra", t: "Spettro", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Raccoglie una sfera d'ombra e la lancia; la sfera esplode in energia scura.", contact: false, animation: { family: "heal", text: "Raccoglie una sfera d'ombra e la lancia; la sfera esplode in energia scura.", hits: 1 } }, "248": { key: 248, n: "Divinazione", t: "Psico", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Emette un bagliore psichico; un segno resta sul bersaglio e il colpo arriva in seguito.", contact: false, animation: { family: "psychic", text: "Emette un bagliore psichico; un segno resta sul bersaglio e il colpo arriva in seguito.", hits: 1 } }, "249": { key: 249, n: "Spaccaroccia", t: "Lotta", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Assesta un colpo corto e forte, con frammenti di roccia che saltano all'impatto.", contact: true, animation: { family: "punch", text: "Assesta un colpo corto e forte, con frammenti di roccia che saltano all'impatto.", hits: 1 } }, "250": { key: 250, n: "Mulinello", t: "Acqua", power: 35, d: 10, c: 1.1, s: 330, r: 15, mode: "wave", category: 3, desc: "Crea un vortice d'acqua sotto il bersaglio, trattenendolo nella corrente.", contact: false, animation: { family: "water", text: "Crea un vortice d'acqua sotto il bersaglio, trattenendolo nella corrente.", hits: 1 } }, "251": { key: 251, n: "Picchiaduro", t: "Buio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Richiama visivamente il contributo dei compagni in una successione di piccoli assalti.", contact: false, animation: { family: "dark", text: "Richiama visivamente il contributo dei compagni in una successione di piccoli assalti.", hits: 1 } }, "252": { key: 252, n: "Bruciapelo", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta vicinissimo e batte le mani o colpisce di sorpresa, creando un lampo improvviso.", contact: true, animation: { family: "punch", text: "Scatta vicinissimo e batte le mani o colpisce di sorpresa, creando un lampo improvviso.", hits: 1 } }, "253": { key: 253, n: "Baraonda", t: "Normale", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Si agita e produce un frastuono continuo, con onde sonore che riempiono l'area.", contact: false, animation: { family: "sound", text: "Si agita e produce un frastuono continuo, con onde sonore che riempiono l'area.", hits: 1 } }, "255": { key: 255, n: "Sfoghenergia", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Espelle con forza l'energia accumulata in un grande getto contro il bersaglio.", contact: false, animation: { family: "energy", text: "Espelle con forza l'energia accumulata in un grande getto contro il bersaglio.", hits: 1 } }, "257": { key: 257, n: "Ondacalda", t: "Fuoco", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "flame", category: 3, desc: "Spinge in avanti un'ondata d'aria rovente, con distorsioni di calore e scintille.", contact: false, animation: { family: "fire", text: "Spinge in avanti un'ondata d'aria rovente, con distorsioni di calore e scintille.", hits: 1 } }, "263": { key: 263, n: "Facciata", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si lancia in un colpo fisico deciso; un'aura pi\xF9 accesa pu\xF2 indicare uno stato alterato attivo.", contact: true, animation: { family: "energy", text: "Si lancia in un colpo fisico deciso; un'aura pi\xF9 accesa pu\xF2 indicare uno stato alterato attivo.", hits: 1 } }, "264": { key: 264, n: "Centripugno", t: "Lotta", power: 150, d: 36, c: 4.7, s: 420, r: 22, mode: "slash", category: 2, desc: "Resta immobile a concentrare energia nel pugno, poi sferra un colpo devastante se non interrotto.", contact: true, animation: { family: "punch", text: "Resta immobile a concentrare energia nel pugno, poi sferra un colpo devastante se non interrotto.", hits: 1 } }, "265": { key: 265, n: "Maniereforti", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra o scuote bruscamente il bersaglio e lo colpisce con un gesto energico.", contact: true, animation: { family: "energy", text: "Afferra o scuote bruscamente il bersaglio e lo colpisce con un gesto energico.", hits: 1 } }, "276": { key: 276, n: "Troppoforte", t: "Lotta", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Contrae tutti i muscoli e sferra un colpo di enorme forza, poi mostra affaticamento.", contact: true, animation: { family: "punch", text: "Contrae tutti i muscoli e sferra un colpo di enorme forza, poi mostra affaticamento.", hits: 1 } }, "279": { key: 279, n: "Vendetta", t: "Lotta", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Incassa l'offesa e risponde con una carica o un colpo carico di rabbia.", contact: true, animation: { family: "punch", text: "Incassa l'offesa e risponde con una carica o un colpo carico di rabbia.", hits: 1 } }, "280": { key: 280, n: "Breccia", t: "Lotta", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Cala la mano o un arto come una lama, frantumando eventuali schermi davanti al bersaglio.", contact: true, animation: { family: "punch", text: "Cala la mano o un arto come una lama, frantumando eventuali schermi davanti al bersaglio.", hits: 1 } }, "282": { key: 282, n: "Privazione", t: "Buio", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce il bersaglio facendo saltare via il suo strumento, se presente.", contact: true, animation: { family: "slam", text: "Colpisce il bersaglio facendo saltare via il suo strumento, se presente.", hits: 1 } }, "283": { key: 283, n: "Rimonta", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si sforza in un assalto disperato; un breve collegamento visivo sottolinea il confronto delle energie rimaste.", contact: true, animation: { family: "energy", text: "Si sforza in un assalto disperato; un breve collegamento visivo sottolinea il confronto delle energie rimaste.", hits: 1 } }, "284": { key: 284, n: "Eruzione", t: "Fuoco", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 150, adattata alla battaglia arcade.", contact: false }, "290": { key: 290, n: "Forzasegreta", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Libera un colpo d'energia il cui aspetto pu\xF2 riprendere l'ambiente della battaglia.", contact: false, animation: { family: "slam", text: "Libera un colpo d'energia il cui aspetto pu\xF2 riprendere l'ambiente della battaglia.", hits: 1 } }, "291": { key: 291, n: "Sub", t: "Acqua", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "wave", category: 2, desc: "Si immerge nell'acqua e scompare; poi riemerge sotto il bersaglio con un forte spruzzo.", contact: true, animation: { family: "dive", text: "Si immerge nell'acqua e scompare; poi riemerge sotto il bersaglio con un forte spruzzo.", hits: 1 } }, "292": { key: 292, n: "Sberletese", t: "Lotta", power: 15, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 15, adattata alla battaglia arcade.", contact: true }, "295": { key: 295, n: "Abbagliante", t: "Psico", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 95, adattata alla battaglia arcade.", contact: false }, "296": { key: 296, n: "Foschisfera", t: "Psico", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 95, adattata alla battaglia arcade.", contact: false }, "299": { key: 299, n: "Calciardente", t: "Fuoco", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "flame", category: 2, desc: "Avvolge una gamba nelle fiamme e sferra un calcio, lasciando un arco di fuoco.", contact: true, animation: { family: "fire", text: "Avvolge una gamba nelle fiamme e sferra un calcio, lasciando un arco di fuoco.", hits: 1 } }, "301": { key: 301, n: "Palla Gelo", t: "Ghiaccio", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Si riveste di ghiaccio e rotola contro il bersaglio, aumentando lo slancio nei colpi successivi.", contact: true, animation: { family: "ice", text: "Si riveste di ghiaccio e rotola contro il bersaglio, aumentando lo slancio nei colpi successivi.", hits: 1 } }, "302": { key: 302, n: "Pugnospine", t: "Erba", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 60, adattata alla battaglia arcade.", contact: true }, "304": { key: 304, n: "Granvoce", t: "Normale", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Prende fiato e libera un grido molto forte, con grandi onde sonore.", contact: false, animation: { family: "sound", text: "Prende fiato e libera un grido molto forte, con grandi onde sonore.", hits: 1 } }, "305": { key: 305, n: "Velenodenti", t: "Veleno", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Ricopre i denti di veleno e morde, lasciando una traccia violacea.", contact: true, animation: { family: "bite", text: "Ricopre i denti di veleno e morde, lasciando una traccia violacea.", hits: 1 } }, "306": { key: 306, n: "Tritartigli", t: "Normale", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Allarga gli artigli e cala una zampata pesante che lascia segni profondi.", contact: true, animation: { family: "slash", text: "Allarga gli artigli e cala una zampata pesante che lascia segni profondi.", hits: 1 } }, "307": { key: 307, n: "Incendio", t: "Fuoco", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "flame", category: 3, desc: "Accumula calore e scatena una violenta esplosione di fuoco nell'area del bersaglio.", contact: false, animation: { family: "fire", text: "Accumula calore e scatena una violenta esplosione di fuoco nell'area del bersaglio.", hits: 1 } }, "308": { key: 308, n: "Idrocannone", t: "Acqua", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "wave", category: 3, desc: "Concentra acqua e la spara in un enorme colpo di cannone, seguito da affaticamento.", contact: false, animation: { family: "beam", text: "Concentra acqua e la spara in un enorme colpo di cannone, seguito da affaticamento.", hits: 1 } }, "309": { key: 309, n: "Meteorpugno", t: "Acciaio", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Sferra un pugno luminoso simile a una meteora, con scia e scintille metalliche.", contact: true, animation: { family: "punch", text: "Sferra un pugno luminoso simile a una meteora, con scia e scintille metalliche.", hits: 1 } }, "310": { key: 310, n: "Sgomento", t: "Spettro", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Compare o si avvicina di scatto con un verso improvviso, spaventando e colpendo il bersaglio.", contact: true, animation: { family: "ghost", text: "Compare o si avvicina di scatto con un verso improvviso, spaventando e colpendo il bersaglio.", hits: 1 } }, "311": { key: 311, n: "Palla Clima", t: "Normale", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Crea una sfera atmosferica; colore e particelle cambiano con il meteo.", contact: false, animation: { family: "energy", text: "Crea una sfera atmosferica; colore e particelle cambiano con il meteo.", hits: 1 } }, "314": { key: 314, n: "Aerasoio", t: "Volante", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Batte ali o appendici e invia sottili lame d'aria a ventaglio.", contact: false, animation: { family: "wind", text: "Batte ali o appendici e invia sottili lame d'aria a ventaglio.", hits: 1 } }, "315": { key: 315, n: "Vampata", t: "Fuoco", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Si arroventa e libera una fiammata enorme; l'aura si attenua dopo lo sforzo.", contact: false, animation: { family: "fire", text: "Si arroventa e libera una fiammata enorme; l'aura si attenua dopo lo sforzo.", hits: 1 } }, "317": { key: 317, n: "Rocciotomba", t: "Roccia", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa cadere rocce intorno al bersaglio, chiudendolo brevemente in una piccola prigione.", contact: false, animation: { family: "rock", text: "Fa cadere rocce intorno al bersaglio, chiudendolo brevemente in una piccola prigione.", hits: 1 } }, "318": { key: 318, n: "Ventargenteo", t: "Coleottero", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Genera una folata piena di scaglie o polvere argentata che investe il bersaglio.", contact: false, animation: { family: "swarm", text: "Genera una folata piena di scaglie o polvere argentata che investe il bersaglio.", hits: 1 } }, "323": { key: 323, n: "Zampillo", t: "Acqua", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "wave", category: 3, desc: "Spara in alto una grande quantit\xE0 d'acqua, che ricade sui nemici come una fontana.", contact: false, animation: { family: "water", text: "Spara in alto una grande quantit\xE0 d'acqua, che ricade sui nemici come una fontana.", hits: 1 } }, "324": { key: 324, n: "Segnoraggio", t: "Coleottero", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Emette un raggio lampeggiante e multicolore, con impulsi regolari lungo la traiettoria.", contact: false, animation: { family: "beam", text: "Emette un raggio lampeggiante e multicolore, con impulsi regolari lungo la traiettoria.", hits: 1 } }, "325": { key: 325, n: "Pugnodombra", t: "Spettro", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Il pugno si oscura o svanisce e colpisce il bersaglio con energia spettrale.", contact: true, animation: { family: "punch", text: "Il pugno si oscura o svanisce e colpisce il bersaglio con energia spettrale.", hits: 1 } }, "326": { key: 326, n: "Extrasenso", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Fissa il bersaglio e lo piega o scuote con una forza psichica invisibile.", contact: false, animation: { family: "psychic", text: "Fissa il bersaglio e lo piega o scuote con una forza psichica invisibile.", hits: 1 } }, "327": { key: 327, n: "Stramontante", t: "Lotta", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Parte dal basso e sferra un montante verso l'alto, sollevandosi durante il colpo.", contact: true, animation: { family: "punch", text: "Parte dal basso e sferra un montante verso l'alto, sollevandosi durante il colpo.", hits: 1 } }, "328": { key: 328, n: "Sabbiotomba", t: "Terra", power: 35, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Solleva un vortice di sabbia attorno ai piedi del bersaglio, intrappolandolo.", contact: false, animation: { family: "vortex", text: "Solleva un vortice di sabbia attorno ai piedi del bersaglio, intrappolandolo.", hits: 1 } }, "329": { key: 329, n: "Purogelo", t: "Ghiaccio", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "beam", category: 3, desc: "Libera un'ondata di gelo estremo che tenta di congelare completamente il bersaglio.", contact: false, animation: { family: "ice", text: "Libera un'ondata di gelo estremo che tenta di congelare completamente il bersaglio.", hits: 1 } }, "330": { key: 330, n: "Fanghiglia", t: "Acqua", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "wave", category: 3, desc: "Fa avanzare una grande ondata d'acqua torbida che schizza sui nemici.", contact: false, animation: { family: "water", text: "Fa avanzare una grande ondata d'acqua torbida che schizza sui nemici.", hits: 1 } }, "331": { key: 331, n: "Semitraglia", t: "Erba", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "leaf", category: 2, desc: "Spara una raffica di piccoli semi come proiettili, con impatti separati.", contact: false, animation: { family: "seed", text: "Spara una raffica di piccoli semi come proiettili, con impatti separati.", hits: 5 } }, "332": { key: 332, n: "Aeroassalto", t: "Volante", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta oltre il bersaglio con una traiettoria rapida e un taglio luminoso.", contact: true, animation: { family: "dash", text: "Scatta oltre il bersaglio con una traiettoria rapida e un taglio luminoso.", hits: 1 } }, "333": { key: 333, n: "Gelolancia", t: "Ghiaccio", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Lancia pi\xF9 lance di ghiaccio appuntite in rapida successione.", contact: false, animation: { family: "icicle", text: "Lancia pi\xF9 lance di ghiaccio appuntite in rapida successione.", hits: 4 } }, "337": { key: 337, n: "Dragartigli", t: "Drago", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Riveste gli artigli d'energia draconica e sferra una doppia artigliata.", contact: true, animation: { family: "slash", text: "Riveste gli artigli d'energia draconica e sferra una doppia artigliata.", hits: 1 } }, "338": { key: 338, n: "Radicalbero", t: "Erba", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "leaf", category: 3, desc: "Colpisce il terreno e fa emergere grosse radici che travolgono il bersaglio.", contact: false, animation: { family: "leaves", text: "Colpisce il terreno e fa emergere grosse radici che travolgono il bersaglio.", hits: 1 } }, "340": { key: 340, n: "Rimbalzo", t: "Volante", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Salta molto in alto e ricade sul bersaglio con tutto il corpo.", contact: true, animation: { family: "fly", text: "Salta molto in alto e ricade sul bersaglio con tutto il corpo.", hits: 1 } }, "341": { key: 341, n: "Colpodifango", t: "Terra", power: 55, d: 13, c: 1.7, s: 330, r: 15, mode: "shot", category: 3, desc: "Spara un getto o una sfera di fango che esplode ai piedi del bersaglio.", contact: false, animation: { family: "earth", text: "Spara un getto o una sfera di fango che esplode ai piedi del bersaglio.", hits: 1 } }, "342": { key: 342, n: "Velenocoda", t: "Veleno", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa brillare la coda di veleno e la sferra contro il bersaglio.", contact: true, animation: { family: "tail", text: "Fa brillare la coda di veleno e la sferra contro il bersaglio.", hits: 1 } }, "343": { key: 343, n: "Supplica", t: "Normale", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Si mostra affettuoso, poi colpisce e attira a s\xE9 l'eventuale strumento avversario.", contact: true, animation: { family: "energy", text: "Si mostra affettuoso, poi colpisce e attira a s\xE9 l'eventuale strumento avversario.", hits: 1 } }, "344": { key: 344, n: "Locomovolt", t: "Elettro", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si avvolge in una potente scarica elettrica e carica il bersaglio, subendo contraccolpo.", contact: true, animation: { family: "electric", text: "Si avvolge in una potente scarica elettrica e carica il bersaglio, subendo contraccolpo.", hits: 1 } }, "345": { key: 345, n: "Fogliamagica", t: "Erba", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "leaf", category: 3, desc: "Lancia foglie luminose che inseguono il bersaglio con traiettorie curve.", contact: false, animation: { family: "leaves", text: "Lancia foglie luminose che inseguono il bersaglio con traiettorie curve.", hits: 1 } }, "348": { key: 348, n: "Fendifoglia", t: "Erba", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "leaf", category: 2, desc: "Irrigidisce una foglia come una spada e sferra un taglio netto.", contact: true, animation: { family: "leaves", text: "Irrigidisce una foglia come una spada e sferra un taglio netto.", hits: 1 } }, "350": { key: 350, n: "Cadutamassi", t: "Roccia", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Scaglia diverse rocce una dopo l'altra, con impatti ben separati.", contact: false, animation: { family: "rock", text: "Scaglia diverse rocce una dopo l'altra, con impatti ben separati.", hits: 4 } }, "351": { key: 351, n: "Ondashock", t: "Elettro", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "bolt", category: 3, desc: "Libera un'onda elettrica rapida che si propaga direttamente fino al bersaglio.", contact: false, animation: { family: "electric", text: "Libera un'onda elettrica rapida che si propaga direttamente fino al bersaglio.", hits: 1 } }, "352": { key: 352, n: "Idropulsar", t: "Acqua", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "wave", category: 3, desc: "Crea una sfera d'acqua pulsante e la scaglia; all'impatto si apre in anelli liquidi.", contact: false, animation: { family: "water", text: "Crea una sfera d'acqua pulsante e la scaglia; all'impatto si apre in anelli liquidi.", hits: 1 } }, "353": { key: 353, n: "Obbliderio", t: "Acciaio", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Acciaio. Potenza 140, adattata alla battaglia arcade.", contact: false }, "354": { key: 354, n: "Psicoslancio", t: "Psico", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 140, adattata alla battaglia arcade.", contact: false }, "358": { key: 358, n: "Svegliopacca", t: "Lotta", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si avvicina e assesta una forte sberla che scuote il bersaglio addormentato.", contact: true, animation: { family: "punch", text: "Si avvicina e assesta una forte sberla che scuote il bersaglio addormentato.", hits: 1 } }, "359": { key: 359, n: "Martelpugno", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Solleva un braccio e lo abbatte come un martello, mostrando poi un breve appesantimento.", contact: true, animation: { family: "punch", text: "Solleva un braccio e lo abbatte come un martello, mostrando poi un breve appesantimento.", hits: 1 } }, "360": { key: 360, n: "Vortexpalla", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota rapidamente su se stesso come una palla metallica e urta il bersaglio.", contact: true, animation: { family: "metal", text: "Ruota rapidamente su se stesso come una palla metallica e urta il bersaglio.", hits: 1 } }, "362": { key: 362, n: "Acquadisale", t: "Acqua", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "wave", category: 3, desc: "Lancia acqua salmastra in un getto, con spruzzi e bagliori cristallini.", contact: false, animation: { family: "water", text: "Lancia acqua salmastra in un getto, con spruzzi e bagliori cristallini.", hits: 1 } }, "363": { key: 363, n: "Dononaturale", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Consuma una bacca e ne trasforma l'energia in un colpo colorato verso il bersaglio.", contact: false, animation: { family: "energy", text: "Consuma una bacca e ne trasforma l'energia in un colpo colorato verso il bersaglio.", hits: 1 } }, "364": { key: 364, n: "Fintoattacco", t: "Normale", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Finge un primo attacco e colpisce dall'apertura, incrinando la protezione avversaria.", contact: false, animation: { family: "energy", text: "Finge un primo attacco e colpisce dall'apertura, incrinando la protezione avversaria.", hits: 1 } }, "365": { key: 365, n: "Spennata", t: "Volante", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Becca il bersaglio e afferra con il becco l'eventuale bacca tenuta.", contact: true, animation: { family: "wind", text: "Becca il bersaglio e afferra con il becco l'eventuale bacca tenuta.", hits: 1 } }, "368": { key: 368, n: "Metalscoppio", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Incassa il colpo in un lampo metallico e rimanda una forte esplosione d'energia.", contact: false, animation: { family: "metal", text: "Incassa il colpo in un lampo metallico e rimanda una forte esplosione d'energia.", hits: 1 } }, "369": { key: 369, n: "Retromarcia", t: "Coleottero", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce con uno scatto e rientra immediatamente verso la propria squadra per il cambio.", contact: true, animation: { family: "swarm", text: "Colpisce con uno scatto e rientra immediatamente verso la propria squadra per il cambio.", hits: 1 } }, "370": { key: 370, n: "Zuffa", t: "Lotta", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si getta a distanza ravvicinata e sferra una raffica di pugni, calci o colpi del corpo.", contact: true, animation: { family: "punch", text: "Si getta a distanza ravvicinata e sferra una raffica di pugni, calci o colpi del corpo.", hits: 1 } }, "371": { key: 371, n: "Rivincita", t: "Buio", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Aspetta il movimento del bersaglio, poi risponde con un colpo avvolto da energia scura.", contact: true, animation: { family: "heal", text: "Aspetta il movimento del bersaglio, poi risponde con un colpo avvolto da energia scura.", hits: 1 } }, "372": { key: 372, n: "Garanzia", t: "Buio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Assesta un colpo deciso che pu\xF2 essere enfatizzato se il bersaglio ha gi\xE0 subito danni.", contact: true, animation: { family: "dark", text: "Assesta un colpo deciso che pu\xF2 essere enfatizzato se il bersaglio ha gi\xE0 subito danni.", hits: 1 } }, "374": { key: 374, n: "Lancio", t: "Buio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra lo strumento tenuto e lo lancia contro il bersaglio.", contact: false, animation: { family: "dark", text: "Afferra lo strumento tenuto e lo lancia contro il bersaglio.", hits: 1 } }, "376": { key: 376, n: "Asso", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Fa comparire carte luminose e ne scaglia una potente contro il bersaglio.", contact: true, animation: { family: "energy", text: "Fa comparire carte luminose e ne scaglia una potente contro il bersaglio.", hits: 1 } }, "378": { key: 378, n: "Strizzata", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Avvolge o afferra il bersaglio e lo strizza con una forte pressione progressiva.", contact: true, animation: { family: "energy", text: "Avvolge o afferra il bersaglio e lo strizza con una forte pressione progressiva.", hits: 1 } }, "386": { key: 386, n: "Punizione", t: "Buio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Si avvolge di energia oscura e punisce il bersaglio con un colpo deciso.", contact: true, animation: { family: "heal", text: "Si avvolge di energia oscura e punisce il bersaglio con un colpo deciso.", hits: 1 } }, "387": { key: 387, n: "Ultimascelta", t: "Normale", power: 140, d: 34, c: 4.4, s: 420, r: 22, mode: "slash", category: 2, desc: "Raccoglie le ultime energie in un grande bagliore e si lancia in un assalto totale.", contact: true, animation: { family: "energy", text: "Raccoglie le ultime energie in un grande bagliore e si lancia in un assalto totale.", hits: 1 } }, "389": { key: 389, n: "Sbigoattacco", t: "Buio", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si tiene pronto e colpisce all'improvviso non appena il bersaglio prepara un attacco.", contact: true, animation: { family: "dark", text: "Si tiene pronto e colpisce all'improvviso non appena il bersaglio prepara un attacco.", hits: 1 } }, "394": { key: 394, n: "Fuococarica", t: "Fuoco", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "flame", category: 2, desc: "Si avvolge completamente nelle fiamme e travolge il bersaglio con una carica violenta.", contact: true, animation: { family: "fire", text: "Si avvolge completamente nelle fiamme e travolge il bersaglio con una carica violenta.", hits: 1 } }, "395": { key: 395, n: "Palmoforza", t: "Lotta", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 60, adattata alla battaglia arcade.", contact: true }, "396": { key: 396, n: "Forzasfera", t: "Lotta", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Concentra la propria aura in una sfera luminosa e la lancia verso il bersaglio.", contact: false, animation: { family: "slam", text: "Concentra la propria aura in una sfera luminosa e la lancia verso il bersaglio.", hits: 1 } }, "398": { key: 398, n: "Velenpuntura", t: "Veleno", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Riveste un arto o una punta di veleno e sferra un affondo rapido.", contact: true, animation: { family: "poison", text: "Riveste un arto o una punta di veleno e sferra un affondo rapido.", hits: 1 } }, "399": { key: 399, n: "Neropulsar", t: "Buio", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Libera un'onda pulsante di energia oscura che investe il bersaglio.", contact: false, animation: { family: "heal", text: "Libera un'onda pulsante di energia oscura che investe il bersaglio.", hits: 1 } }, "400": { key: 400, n: "Nottesferza", t: "Buio", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta e sferra un taglio oscuro con artiglio o lama, lasciando una scia viola.", contact: true, animation: { family: "dark", text: "Scatta e sferra un taglio oscuro con artiglio o lama, lasciando una scia viola.", hits: 1 } }, "401": { key: 401, n: "Idrondata", t: "Acqua", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "wave", category: 2, desc: "Avvolge la coda in un flusso d'acqua e colpisce con una larga sferzata.", contact: true, animation: { family: "water", text: "Avvolge la coda in un flusso d'acqua e colpisce con una larga sferzata.", hits: 1 } }, "402": { key: 402, n: "Semebomba", t: "Erba", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "leaf", category: 2, desc: "Scaglia un grosso seme duro che esplode all'impatto.", contact: false, animation: { family: "leaves", text: "Scaglia un grosso seme duro che esplode all'impatto.", hits: 1 } }, "403": { key: 403, n: "Eterelama", t: "Volante", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Genera una grande lama d'aria e la invia contro il bersaglio.", contact: false, animation: { family: "wind", text: "Genera una grande lama d'aria e la invia contro il bersaglio.", hits: 1 } }, "404": { key: 404, n: "Forbice X", t: "Coleottero", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Incrocia due lame, chele o arti sul bersaglio, tracciando una X luminosa.", contact: true, animation: { family: "swarm", text: "Incrocia due lame, chele o arti sul bersaglio, tracciando una X luminosa.", hits: 1 } }, "405": { key: 405, n: "Ronzio", t: "Coleottero", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Fa vibrare ali o corpo e produce onde sonore intense, dall'aspetto insettoide.", contact: false, animation: { family: "swarm", text: "Fa vibrare ali o corpo e produce onde sonore intense, dall'aspetto insettoide.", hits: 1 } }, "406": { key: 406, n: "Dragopulsar", t: "Drago", power: 85, d: 20, c: 2.7, s: 330, r: 15, mode: "beam", category: 3, desc: "Emette un'onda concentrata d'energia draconica, con pulsazioni lungo il getto.", contact: false, animation: { family: "dragon", text: "Emette un'onda concentrata d'energia draconica, con pulsazioni lungo il getto.", hits: 1 } }, "407": { key: 407, n: "Dragofuria", t: "Drago", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Si riveste di energia draconica e travolge il bersaglio con una carica pesante.", contact: true, animation: { family: "dragon", text: "Si riveste di energia draconica e travolge il bersaglio con una carica pesante.", hits: 1 } }, "408": { key: 408, n: "Gemmoforza", t: "Roccia", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Accende gemme o punti luminosi sul corpo e ne spara raggi scintillanti.", contact: false, animation: { family: "slam", text: "Accende gemme o punti luminosi sul corpo e ne spara raggi scintillanti.", hits: 1 } }, "409": { key: 409, n: "Assorbipugno", t: "Lotta", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce con un pugno e assorbe dal punto d'impatto un flusso d'energia curativa.", contact: true, animation: { family: "punch", text: "Colpisce con un pugno e assorbe dal punto d'impatto un flusso d'energia curativa.", hits: 1 } }, "410": { key: 410, n: "Vuotonda", t: "Lotta", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Ruota un arto o il corpo e genera una rapida onda di pressione che colpisce a distanza.", contact: false, animation: { family: "punch", text: "Ruota un arto o il corpo e genera una rapida onda di pressione che colpisce a distanza.", hits: 1 } }, "411": { key: 411, n: "Focalcolpo", t: "Lotta", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Raccoglie energia da combattimento in una grossa sfera e la scaglia con forza.", contact: false, animation: { family: "punch", text: "Raccoglie energia da combattimento in una grossa sfera e la scaglia con forza.", hits: 1 } }, "412": { key: 412, n: "Energipalla", t: "Erba", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "leaf", category: 3, desc: "Condensa energia naturale in una sfera verde e la lancia contro il bersaglio.", contact: false, animation: { family: "leaves", text: "Condensa energia naturale in una sfera verde e la lancia contro il bersaglio.", hits: 1 } }, "413": { key: 413, n: "Baldeali", t: "Volante", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Sale in volo e si tuffa in una carica avvolta d'energia, subendo contraccolpo.", contact: true, animation: { family: "wind", text: "Sale in volo e si tuffa in una carica avvolta d'energia, subendo contraccolpo.", hits: 1 } }, "414": { key: 414, n: "Geoforza", t: "Terra", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Fa erompere dal terreno sotto il bersaglio una colonna di energia e detriti.", contact: false, animation: { family: "slam", text: "Fa erompere dal terreno sotto il bersaglio una colonna di energia e detriti.", hits: 1 } }, "416": { key: 416, n: "Gigaimpatto", t: "Normale", power: 150, d: 36, c: 4.7, s: 420, r: 22, mode: "slash", category: 2, desc: "Si avvolge in un'aura intensa e parte con una carica totale, poi resta affaticato.", contact: true, animation: { family: "energy", text: "Si avvolge in un'aura intensa e parte con una carica totale, poi resta affaticato.", hits: 1 } }, "418": { key: 418, n: "Pugnoscarica", t: "Acciaio", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa brillare il pugno come acciaio e colpisce con uno scatto rapidissimo.", contact: true, animation: { family: "punch", text: "Fa brillare il pugno come acciaio e colpisce con uno scatto rapidissimo.", hits: 1 } }, "419": { key: 419, n: "Slavina", t: "Ghiaccio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Dopo aver atteso il bersaglio, provoca una caduta di neve e ghiaccio su di lui.", contact: true, animation: { family: "ice", text: "Dopo aver atteso il bersaglio, provoca una caduta di neve e ghiaccio su di lui.", hits: 1 } }, "420": { key: 420, n: "Geloscheggia", t: "Ghiaccio", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Crea una piccola scheggia di ghiaccio e la scaglia con grande rapidit\xE0.", contact: false, animation: { family: "ice", text: "Crea una piccola scheggia di ghiaccio e la scaglia con grande rapidit\xE0.", hits: 1 } }, "421": { key: 421, n: "Ombrartigli", t: "Spettro", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Allunga artigli d'ombra e lacera il bersaglio con scie scure.", contact: true, animation: { family: "slash", text: "Allunga artigli d'ombra e lacera il bersaglio con scie scure.", hits: 1 } }, "422": { key: 422, n: "Fulmindenti", t: "Elettro", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Carica i denti di elettricit\xE0 e morde, liberando scintille dalle fauci.", contact: true, animation: { family: "bite", text: "Carica i denti di elettricit\xE0 e morde, liberando scintille dalle fauci.", hits: 1 } }, "423": { key: 423, n: "Gelodenti", t: "Ghiaccio", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Ricopre i denti di gelo e morde, lasciando cristalli sul bersaglio.", contact: true, animation: { family: "bite", text: "Ricopre i denti di gelo e morde, lasciando cristalli sul bersaglio.", hits: 1 } }, "424": { key: 424, n: "Rogodenti", t: "Fuoco", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "flame", category: 2, desc: "Accende piccole fiamme tra i denti e morde il bersaglio.", contact: true, animation: { family: "bite", text: "Accende piccole fiamme tra i denti e morde il bersaglio.", hits: 1 } }, "425": { key: 425, n: "Furtivombra", t: "Spettro", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Allunga la propria ombra fino al bersaglio e lo colpisce da terra all'improvviso.", contact: true, animation: { family: "ghost", text: "Allunga la propria ombra fino al bersaglio e lo colpisce da terra all'improvviso.", hits: 1 } }, "426": { key: 426, n: "Pantanobomba", t: "Terra", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Lancia una palla di fango denso che esplode in schizzi sul bersaglio.", contact: false, animation: { family: "earth", text: "Lancia una palla di fango denso che esplode in schizzi sul bersaglio.", hits: 1 } }, "427": { key: 427, n: "Psicotaglio", t: "Psico", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Crea una lama d'energia psichica e la lancia con un gesto di taglio.", contact: false, animation: { family: "slash", text: "Crea una lama d'energia psichica e la lancia con un gesto di taglio.", hits: 1 } }, "428": { key: 428, n: "Cozzata Zen", t: "Psico", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Concentra energia sulla fronte e sferra una testata avvolta da un'aura psichica.", contact: true, animation: { family: "psychic", text: "Concentra energia sulla fronte e sferra una testata avvolta da un'aura psichica.", hits: 1 } }, "429": { key: 429, n: "Cristalcolpo", t: "Acciaio", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Proietta un colpo di luce riflessa, simile a frammenti lucidi, verso il bersaglio.", contact: false, animation: { family: "metal", text: "Proietta un colpo di luce riflessa, simile a frammenti lucidi, verso il bersaglio.", hits: 1 } }, "430": { key: 430, n: "Cannonflash", t: "Acciaio", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Concentra luce metallica in un punto e spara un raggio d'acciaio brillante.", contact: false, animation: { family: "metal", text: "Concentra luce metallica in un punto e spara un raggio d'acciaio brillante.", hits: 1 } }, "431": { key: 431, n: "Scalaroccia", t: "Normale", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Avanza aggrappandosi e urtando come durante una scalata, colpendo il bersaglio con slancio.", contact: true, animation: { family: "wing", text: "Avanza aggrappandosi e urtando come durante una scalata, colpendo il bersaglio con slancio.", hits: 1 } }, "434": { key: 434, n: "Dragobolide", t: "Drago", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "beam", category: 3, desc: "Richiama dall'alto uno sciame di meteore luminose d'energia draconica.", contact: false, animation: { family: "dragon", text: "Richiama dall'alto uno sciame di meteore luminose d'energia draconica.", hits: 1 } }, "435": { key: 435, n: "Scarica", t: "Elettro", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "bolt", category: 3, desc: "Libera elettricit\xE0 da tutto il corpo, con scariche che si allargano intorno a lui.", contact: false, animation: { family: "electric", text: "Libera elettricit\xE0 da tutto il corpo, con scariche che si allargano intorno a lui.", hits: 1 } }, "436": { key: 436, n: "Lavasbuffo", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "flame", category: 3, desc: "Fa eruttare fiamme e calore dal proprio corpo verso l'area circostante.", contact: false, animation: { family: "fire", text: "Fa eruttare fiamme e calore dal proprio corpo verso l'area circostante.", hits: 1 } }, "437": { key: 437, n: "Verdebufera", t: "Erba", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "leaf", category: 3, desc: "Scatena un turbine molto fitto di foglie che travolge il bersaglio.", contact: false, animation: { family: "leaves", text: "Scatena un turbine molto fitto di foglie che travolge il bersaglio.", hits: 1 } }, "438": { key: 438, n: "Vigorcolpo", t: "Erba", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "leaf", category: 2, desc: "Sferra una pesante frustata con liane o appendici vegetali.", contact: true, animation: { family: "leaves", text: "Sferra una pesante frustata con liane o appendici vegetali.", hits: 1 } }, "439": { key: 439, n: "Devastomasso", t: "Roccia", power: 150, d: 36, c: 4.7, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 150, adattata alla battaglia arcade.", contact: false }, "440": { key: 440, n: "Velenocroce", t: "Veleno", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Incrocia due attacchi velenosi, disegnando una X viola sul bersaglio.", contact: true, animation: { family: "poison", text: "Incrocia due attacchi velenosi, disegnando una X viola sul bersaglio.", hits: 1 } }, "441": { key: 441, n: "Sporcolancio", t: "Veleno", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Scaglia una grossa massa di rifiuti o sostanza tossica che si rompe all'impatto.", contact: false, animation: { family: "poison", text: "Scaglia una grossa massa di rifiuti o sostanza tossica che si rompe all'impatto.", hits: 1 } }, "442": { key: 442, n: "Metaltestata", t: "Acciaio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Rende la testa metallica e la usa per una testata energica.", contact: true, animation: { family: "slam", text: "Rende la testa metallica e la usa per una testata energica.", hits: 1 } }, "443": { key: 443, n: "Bombagnete", t: "Acciaio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Lancia piccoli ordigni metallici che vengono attratti verso il bersaglio.", contact: false, animation: { family: "metal", text: "Lancia piccoli ordigni metallici che vengono attratti verso il bersaglio.", hits: 1 } }, "444": { key: 444, n: "Pietrataglio", t: "Roccia", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Fa emergere o scaglia schegge di roccia appuntite che colpiscono il bersaglio.", contact: false, animation: { family: "slash", text: "Fa emergere o scaglia schegge di roccia appuntite che colpiscono il bersaglio.", hits: 1 } }, "447": { key: 447, n: "Laccioerboso", t: "Erba", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "leaf", category: 3, desc: "Fa crescere fili d'erba ai piedi del bersaglio, intrecciandoli per farlo inciampare.", contact: true, animation: { family: "leaves", text: "Fa crescere fili d'erba ai piedi del bersaglio, intrecciandoli per farlo inciampare.", hits: 1 } }, "448": { key: 448, n: "Schiamazzo", t: "Volante", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Volante. Potenza 65, adattata alla battaglia arcade.", contact: false }, "449": { key: 449, n: "Giudizio", t: "Normale", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 100, adattata alla battaglia arcade.", contact: false }, "450": { key: 450, n: "Coleomorso", t: "Coleottero", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Morde con piccole mandibole e sottrae l'eventuale bacca al bersaglio.", contact: true, animation: { family: "bite", text: "Morde con piccole mandibole e sottrae l'eventuale bacca al bersaglio.", hits: 1 } }, "451": { key: 451, n: "Raggioscossa", t: "Elettro", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "bolt", category: 3, desc: "Spara un raggio elettrico sottile; parte dell'energia pu\xF2 rimanere a caricare il corpo.", contact: false, animation: { family: "beam", text: "Spara un raggio elettrico sottile; parte dell'energia pu\xF2 rimanere a caricare il corpo.", hits: 1 } }, "452": { key: 452, n: "Mazzuolegno", t: "Erba", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "leaf", category: 2, desc: "Irrigidisce il corpo o un arto come legno e si abbatte sul bersaglio con forte contraccolpo.", contact: true, animation: { family: "leaves", text: "Irrigidisce il corpo o un arto come legno e si abbatte sul bersaglio con forte contraccolpo.", hits: 1 } }, "453": { key: 453, n: "Acquagetto", t: "Acqua", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "wave", category: 2, desc: "Si avvolge in un getto d'acqua e scatta rapidamente contro il bersaglio.", contact: true, animation: { family: "water", text: "Si avvolge in un getto d'acqua e scatta rapidamente contro il bersaglio.", hits: 1 } }, "454": { key: 454, n: "Comandourto", t: "Coleottero", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Coleottero. Potenza 90, adattata alla battaglia arcade.", contact: false }, "457": { key: 457, n: "Zuccata", t: "Roccia", power: 150, d: 36, c: 4.7, s: 420, r: 22, mode: "slash", category: 2, desc: "Carica violentemente a testa bassa, producendo un grande urto e un forte contraccolpo.", contact: true, animation: { family: "rock", text: "Carica violentemente a testa bassa, producendo un grande urto e un forte contraccolpo.", hits: 1 } }, "458": { key: 458, n: "Doppiosmash", t: "Normale", power: 35, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce due volte con coda, arti o appendici, scandendo due impatti distinti.", contact: true, animation: { family: "energy", text: "Colpisce due volte con coda, arti o appendici, scandendo due impatti distinti.", hits: 1 } }, "459": { key: 459, n: "Fragortempo", t: "Drago", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 150, adattata alla battaglia arcade.", contact: false }, "460": { key: 460, n: "Fendispazio", t: "Drago", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 100, adattata alla battaglia arcade.", contact: false }, "462": { key: 462, n: "Sbriciolmano", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: true }, "463": { key: 463, n: "Magmaclisma", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 100, adattata alla battaglia arcade.", contact: false }, "465": { key: 465, n: "Infuriaseme", t: "Erba", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "leaf", category: 3, desc: "Mossa di tipo Erba. Potenza 120, adattata alla battaglia arcade.", contact: false }, "466": { key: 466, n: "Funestovento", t: "Spettro", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Solleva un vento inquietante pieno di ombre e particelle spettrali.", contact: false, animation: { family: "ghost", text: "Solleva un vento inquietante pieno di ombre e particelle spettrali.", hits: 1 } }, "467": { key: 467, n: "Oscurotuffo", t: "Spettro", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 120, adattata alla battaglia arcade.", contact: true }, "473": { key: 473, n: "Psicoshock", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Materializza energia psichica in urti o proiettili solidi che investono il bersaglio.", contact: false, animation: { family: "psychic", text: "Materializza energia psichica in urti o proiettili solidi che investono il bersaglio.", hits: 1 } }, "474": { key: 474, n: "Velenoshock", t: "Veleno", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Spruzza un veleno reattivo che pulsa pi\xF9 intensamente su un bersaglio gi\xE0 avvelenato.", contact: false, animation: { family: "poison", text: "Spruzza un veleno reattivo che pulsa pi\xF9 intensamente su un bersaglio gi\xE0 avvelenato.", hits: 1 } }, "479": { key: 479, n: "Abbattimento", t: "Roccia", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Scaglia una pietra o un proiettile che colpisce il bersaglio e lo abbatte verso terra.", contact: false, animation: { family: "rock", text: "Scaglia una pietra o un proiettile che colpisce il bersaglio e lo abbatte verso terra.", hits: 1 } }, "480": { key: 480, n: "Tempestretta", t: "Lotta", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio e lo proietta bruscamente al suolo con una presa vigorosa.", contact: true, animation: { family: "punch", text: "Afferra il bersaglio e lo proietta bruscamente al suolo con una presa vigorosa.", hits: 1 } }, "481": { key: 481, n: "Pirolancio", t: "Fuoco", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "flame", category: 3, desc: "Lancia una fiammata compatta che esplode sul bersaglio, spargendo braci intorno.", contact: false, animation: { family: "fire", text: "Lancia una fiammata compatta che esplode sul bersaglio, spargendo braci intorno.", hits: 1 } }, "482": { key: 482, n: "Fangonda", t: "Veleno", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "shot", category: 3, desc: "Solleva un'ondata di fango velenoso che si espande nell'area circostante.", contact: false, animation: { family: "poison", text: "Solleva un'ondata di fango velenoso che si espande nell'area circostante.", hits: 1 } }, "484": { key: 484, n: "Pesobomba", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Solleva o slancia il proprio corpo pesante e schiaccia il bersaglio dall'alto.", contact: true, animation: { family: "metal", text: "Solleva o slancia il proprio corpo pesante e schiaccia il bersaglio dall'alto.", hits: 1 } }, "485": { key: 485, n: "Sincrumore", t: "Psico", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Produce una risonanza psichica sonora, rappresentata da onde concentriche che selezionano i tipi compatibili.", contact: false, animation: { family: "psychic", text: "Produce una risonanza psichica sonora, rappresentata da onde concentriche che selezionano i tipi compatibili.", hits: 1 } }, "486": { key: 486, n: "Energisfera", t: "Elettro", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "bolt", category: 3, desc: "Forma una sfera elettrica e la lancia rapidamente verso il bersaglio.", contact: false, animation: { family: "electric", text: "Forma una sfera elettrica e la lancia rapidamente verso il bersaglio.", hits: 1 } }, "488": { key: 488, n: "Nitrocarica", t: "Fuoco", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "flame", category: 2, desc: "Si avvolge in fiamme compatte e carica, uscendo dal colpo con maggiore slancio.", contact: true, animation: { family: "fire", text: "Si avvolge in fiamme compatte e carica, uscendo dal colpo con maggiore slancio.", hits: 1 } }, "490": { key: 490, n: "Calciobasso", t: "Lotta", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra un calcio rasoterra o una spazzata contro le gambe del bersaglio.", contact: true, animation: { family: "kick", text: "Sferra un calcio rasoterra o una spazzata contro le gambe del bersaglio.", hits: 1 } }, "491": { key: 491, n: "Acidobomba", t: "Veleno", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Sputa una sfera di acido corrosivo che esplode e cola sul bersaglio.", contact: false, animation: { family: "poison", text: "Sputa una sfera di acido corrosivo che esplode e cola sul bersaglio.", hits: 1 } }, "492": { key: 492, n: "Ripicca", t: "Buio", power: 95, d: 23, c: 3, s: 420, r: 22, mode: "slash", category: 2, desc: "Sfrutta lo slancio del bersaglio e gli ritorce contro un colpo avvolto d'energia scura.", contact: true, animation: { family: "heal", text: "Sfrutta lo slancio del bersaglio e gli ritorce contro un colpo avvolto d'energia scura.", hits: 1 } }, "496": { key: 496, n: "Coro", t: "Normale", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Emette una frase musicale; altre voci possono unirsi creando onde sonore sovrapposte.", contact: false, animation: { family: "energy", text: "Emette una frase musicale; altre voci possono unirsi creando onde sonore sovrapposte.", hits: 1 } }, "497": { key: 497, n: "Echeggiavoce", t: "Normale", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Ripete un richiamo sonoro che genera onde progressivamente pi\xF9 grandi.", contact: false, animation: { family: "energy", text: "Ripete un richiamo sonoro che genera onde progressivamente pi\xF9 grandi.", hits: 1 } }, "498": { key: 498, n: "Insidia", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Avanza con un affondo preciso, insinuandosi attraverso la guardia del bersaglio.", contact: true, animation: { family: "energy", text: "Avanza con un affondo preciso, insinuandosi attraverso la guardia del bersaglio.", hits: 1 } }, "499": { key: 499, n: "Pulifumo", t: "Veleno", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Soffia una nube chiara e tossica che colpisce il bersaglio e disperde le sue aure di potenziamento.", contact: false, animation: { family: "poison", text: "Soffia una nube chiara e tossica che colpisce il bersaglio e disperde le sue aure di potenziamento.", hits: 1 } }, "500": { key: 500, n: "Veicolaforza", t: "Psico", power: 20, d: 10, c: 1.1, s: 330, r: 15, mode: "shot", category: 3, desc: "Raccoglie i propri bagliori di potenziamento in una sfera psichica e la libera sul bersaglio.", contact: false, animation: { family: "slam", text: "Raccoglie i propri bagliori di potenziamento in una sfera psichica e la libera sul bersaglio.", hits: 1 } }, "503": { key: 503, n: "Idrovampata", t: "Acqua", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "wave", category: 3, desc: "Spara un getto d'acqua bollente, accompagnato da vapore.", contact: false, animation: { family: "water", text: "Spara un getto d'acqua bollente, accompagnato da vapore.", hits: 1 } }, "506": { key: 506, n: "Sciagura", t: "Spettro", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "shot", category: 3, desc: "Evoca una maledizione visiva fatta di occhi, fiamme o ombre attorno al bersaglio.", contact: false, animation: { family: "ghost", text: "Evoca una maledizione visiva fatta di occhi, fiamme o ombre attorno al bersaglio.", hits: 1 } }, "507": { key: 507, n: "Cadutalibera", t: "Volante", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio, lo porta in alto e poi lo lascia precipitare al suolo.", contact: true, animation: { family: "wind", text: "Afferra il bersaglio, lo porta in alto e poi lo lascia precipitare al suolo.", hits: 1 } }, "509": { key: 509, n: "Ribaltiro", t: "Lotta", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Afferra il bersaglio, ruota e lo scaglia lontano, favorendone l'uscita dal campo.", contact: true, animation: { family: "punch", text: "Afferra il bersaglio, ruota e lo scaglia lontano, favorendone l'uscita dal campo.", hits: 1 } }, "510": { key: 510, n: "Bruciatutto", t: "Fuoco", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "flame", category: 3, desc: "Emette una fiammata che investe il bersaglio e pu\xF2 consumare alcuni strumenti vulnerabili.", contact: false, animation: { family: "fire", text: "Emette una fiammata che investe il bersaglio e pu\xF2 consumare alcuni strumenti vulnerabili.", hits: 1 } }, "512": { key: 512, n: "Acrobazia", t: "Volante", power: 55, d: 13, c: 1.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Esegue un salto acrobatico o una capriola e colpisce il bersaglio in movimento.", contact: true, animation: { family: "wind", text: "Esegue un salto acrobatico o una capriola e colpisce il bersaglio in movimento.", hits: 1 } }, "514": { key: 514, n: "Nemesi", t: "Normale", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Si accende di rabbia per il compagno sconfitto e parte con una carica decisa.", contact: true, animation: { family: "energy", text: "Si accende di rabbia per il compagno sconfitto e parte con una carica decisa.", hits: 1 } }, "515": { key: 515, n: "Azzardo", t: "Lotta", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Concentra tutta l'energia rimasta e si lancia sul bersaglio, poi va KO.", contact: false, animation: { family: "punch", text: "Concentra tutta l'energia rimasta e si lancia sul bersaglio, poi va KO.", hits: 1 } }, "517": { key: 517, n: "Marchiatura", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Avvolge il bersaglio in una vampata intensa e persistente.", contact: false, animation: { family: "fire", text: "Avvolge il bersaglio in una vampata intensa e persistente.", hits: 1 } }, "518": { key: 518, n: "Acquapatto", t: "Acqua", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "wave", category: 3, desc: "Richiama una colonna d'acqua dal terreno e la dirige verso il bersaglio.", contact: false, animation: { family: "water", text: "Richiama una colonna d'acqua dal terreno e la dirige verso il bersaglio.", hits: 1 } }, "519": { key: 519, n: "Fiammapatto", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "flame", category: 3, desc: "Fa sorgere una colonna di fuoco che investe il bersaglio.", contact: false, animation: { family: "fire", text: "Fa sorgere una colonna di fuoco che investe il bersaglio.", hits: 1 } }, "520": { key: 520, n: "Erbapatto", t: "Erba", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "leaf", category: 3, desc: "Fa emergere energia e germogli dal terreno sotto il bersaglio.", contact: false, animation: { family: "leaves", text: "Fa emergere energia e germogli dal terreno sotto il bersaglio.", hits: 1 } }, "521": { key: 521, n: "Invertivolt", t: "Elettro", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "bolt", category: 3, desc: "Colpisce con una scarica elettrica e rientra immediatamente per lasciare posto a un compagno.", contact: false, animation: { family: "electric", text: "Colpisce con una scarica elettrica e rientra immediatamente per lasciare posto a un compagno.", hits: 1 } }, "522": { key: 522, n: "Entomoblocco", t: "Coleottero", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Fa vibrare il corpo e investe i nemici con una debole onda d'energia insettoide.", contact: false, animation: { family: "swarm", text: "Fa vibrare il corpo e investe i nemici con una debole onda d'energia insettoide.", hits: 1 } }, "523": { key: 523, n: "Battiterra", t: "Terra", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Pesta ripetutamente il terreno, generando scosse basse e sollevando zolle.", contact: false, animation: { family: "earth", text: "Pesta ripetutamente il terreno, generando scosse basse e sollevando zolle.", hits: 1 } }, "524": { key: 524, n: "Alitogelido", t: "Ghiaccio", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "beam", category: 3, desc: "Soffia un alito gelido concentrato che ricopre il bersaglio di brina.", contact: false, animation: { family: "ice", text: "Soffia un alito gelido concentrato che ricopre il bersaglio di brina.", hits: 1 } }, "525": { key: 525, n: "Codadrago", t: "Drago", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Riveste la coda d'energia draconica e colpisce con una sferzata che scaraventa via il bersaglio.", contact: true, animation: { family: "tail", text: "Riveste la coda d'energia draconica e colpisce con una sferzata che scaraventa via il bersaglio.", hits: 1 } }, "527": { key: 527, n: "Elettrotela", t: "Elettro", power: 55, d: 13, c: 1.7, s: 330, r: 15, mode: "bolt", category: 3, desc: "Lancia una rete attraversata da elettricit\xE0 che si stende sui bersagli.", contact: false, animation: { family: "electric", text: "Lancia una rete attraversata da elettricit\xE0 che si stende sui bersagli.", hits: 1 } }, "528": { key: 528, n: "Sprizzalampo", t: "Elettro", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si ricopre di elettricit\xE0 e si schianta contro il bersaglio, subendo contraccolpo.", contact: true, animation: { family: "wing", text: "Si ricopre di elettricit\xE0 e si schianta contro il bersaglio, subendo contraccolpo.", hits: 1 } }, "529": { key: 529, n: "Giravvita", t: "Terra", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota il corpo o una punta come una trivella e si avvita contro il bersaglio.", contact: true, animation: { family: "earth", text: "Ruota il corpo o una punta come una trivella e si avvita contro il bersaglio.", hits: 1 } }, "530": { key: 530, n: "Doppiocolpo", t: "Drago", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra due colpi di taglio rivestiti d'energia draconica.", contact: true, animation: { family: "dragon", text: "Sferra due colpi di taglio rivestiti d'energia draconica.", hits: 1 } }, "531": { key: 531, n: "Cuorestampo", t: "Psico", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Colpisce con un gesto affettuoso ma deciso, accompagnato da un cuore luminoso d'impatto.", contact: true, animation: { family: "psychic", text: "Colpisce con un gesto affettuoso ma deciso, accompagnato da un cuore luminoso d'impatto.", hits: 1 } }, "532": { key: 532, n: "Legnicorno", t: "Erba", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 75, adattata alla battaglia arcade.", contact: true }, "533": { key: 533, n: "Spadasolenne", t: "Lotta", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 90, adattata alla battaglia arcade.", contact: true }, "534": { key: 534, n: "Conchilama", t: "Acqua", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "wave", category: 2, desc: "Usa una conchiglia come lama e taglia il bersaglio con una scia d'acqua.", contact: true, animation: { family: "water", text: "Usa una conchiglia come lama e taglia il bersaglio con una scia d'acqua.", hits: 1 } }, "535": { key: 535, n: "Marchiafuoco", t: "Fuoco", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "flame", category: 2, desc: "Si avvolge nel calore e si abbatte sul bersaglio con tutto il peso.", contact: true, animation: { family: "fire", text: "Si avvolge nel calore e si abbatte sul bersaglio con tutto il peso.", hits: 1 } }, "536": { key: 536, n: "Vorticerba", t: "Erba", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "leaf", category: 3, desc: "Crea un vortice di foglie che avanza ruotando verso il bersaglio.", contact: false, animation: { family: "leaves", text: "Crea un vortice di foglie che avanza ruotando verso il bersaglio.", hits: 1 } }, "537": { key: 537, n: "Rulloduro", t: "Coleottero", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Rotola sopra il bersaglio come un rullo, appiattendosi o raccogliendosi secondo l'anatomia.", contact: true, animation: { family: "swarm", text: "Rotola sopra il bersaglio come un rullo, appiattendosi o raccogliendosi secondo l'anatomia.", hits: 1 } }, "539": { key: 539, n: "Urtoscuro", t: "Buio", power: 85, d: 20, c: 2.7, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Buio. Potenza 85, adattata alla battaglia arcade.", contact: false }, "540": { key: 540, n: "Psicobotta", t: "Psico", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Materializza sfere o urti di energia psichica densa attorno al bersaglio e li fa convergere.", contact: false, animation: { family: "psychic", text: "Materializza sfere o urti di energia psichica densa attorno al bersaglio e li fa convergere.", hits: 1 } }, "541": { key: 541, n: "Spazzasberla", t: "Normale", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferza il bersaglio pi\xF9 volte con la coda, alternando colpi laterali.", contact: true, animation: { family: "energy", text: "Sferza il bersaglio pi\xF9 volte con la coda, alternando colpi laterali.", hits: 1 } }, "542": { key: 542, n: "Tifone", t: "Volante", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Scatena un vortice di vento violento che avvolge e solleva il bersaglio.", contact: false, animation: { family: "wind", text: "Scatena un vortice di vento violento che avvolge e solleva il bersaglio.", hits: 1 } }, "543": { key: 543, n: "Ricciolata", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 120, adattata alla battaglia arcade.", contact: true }, "544": { key: 544, n: "Ingracolpo", t: "Acciaio", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 50, adattata alla battaglia arcade.", contact: true }, "545": { key: 545, n: "Sparafuoco", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 100, adattata alla battaglia arcade.", contact: false }, "546": { key: 546, n: "Tecnobotto", t: "Normale", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 120, adattata alla battaglia arcade.", contact: false }, "547": { key: 547, n: "Cantoantico", t: "Normale", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: false }, "548": { key: 548, n: "Spadamistica", t: "Lotta", power: 85, d: 20, c: 2.7, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Lotta. Potenza 85, adattata alla battaglia arcade.", contact: false }, "549": { key: 549, n: "Gelamondo", t: "Ghiaccio", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "beam", category: 3, desc: "Mossa di tipo Ghiaccio. Potenza 65, adattata alla battaglia arcade.", contact: false }, "550": { key: 550, n: "Lucesiluro", t: "Elettro", power: 130, d: 31, c: 4.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 130, adattata alla battaglia arcade.", contact: true }, "551": { key: 551, n: "Fuocoblu", t: "Fuoco", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 130, adattata alla battaglia arcade.", contact: false }, "552": { key: 552, n: "Voldifuoco", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 80, adattata alla battaglia arcade.", contact: false }, "553": { key: 553, n: "Elettrogelo", t: "Ghiaccio", power: 140, d: 34, c: 4.4, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 140, adattata alla battaglia arcade.", contact: false }, "554": { key: 554, n: "Vampagelida", t: "Ghiaccio", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Ghiaccio. Potenza 140, adattata alla battaglia arcade.", contact: false }, "555": { key: 555, n: "Urlorabbia", t: "Buio", power: 55, d: 13, c: 1.7, s: 330, r: 15, mode: "shot", category: 3, desc: "Ringhia con rabbia ed emette onde sonore scure verso i nemici.", contact: false, animation: { family: "dark", text: "Ringhia con rabbia ed emette onde sonore scure verso i nemici.", hits: 1 } }, "556": { key: 556, n: "Scagliagelo", t: "Ghiaccio", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Fa precipitare grandi ghiaccioli dall'alto sulla zona del bersaglio.", contact: false, animation: { family: "ice", text: "Fa precipitare grandi ghiaccioli dall'alto sulla zona del bersaglio.", hits: 1 } }, "557": { key: 557, n: "Generatore V", t: "Fuoco", power: 180, d: 43, c: 5, s: 420, r: 22, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 180, adattata alla battaglia arcade.", contact: true }, "558": { key: 558, n: "Incrofiamma", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 100, adattata alla battaglia arcade.", contact: false }, "559": { key: 559, n: "Incrotuono", t: "Elettro", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 100, adattata alla battaglia arcade.", contact: false }, "560": { key: 560, n: "Schiacciatuffo", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Salta, apre il corpo in volo e si tuffa sul bersaglio con una presa da lotta.", contact: true, animation: { family: "punch", text: "Salta, apre il corpo in volo e si tuffa sul bersaglio con una presa da lotta.", hits: 1 } }, "562": { key: 562, n: "Rutto", t: "Veleno", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Si gonfia e libera un rutto violento, visibile come una nube di gas.", contact: false, animation: { family: "poison", text: "Si gonfia e libera un rutto violento, visibile come una nube di gas.", hits: 1 } }, "565": { key: 565, n: "Pungiglione", t: "Coleottero", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta con il pungiglione e sferra un affondo breve e preciso.", contact: true, animation: { family: "swarm", text: "Scatta con il pungiglione e sferra un affondo breve e preciso.", hits: 1 } }, "566": { key: 566, n: "Spettrotuffo", t: "Spettro", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Scompare in una dimensione d'ombra e riappare accanto al bersaglio per colpirlo.", contact: true, animation: { family: "ghost", text: "Scompare in una dimensione d'ombra e riappare accanto al bersaglio per colpirlo.", hits: 1 } }, "570": { key: 570, n: "Caricaparabola", t: "Elettro", power: 65, d: 16, c: 2, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 65, adattata alla battaglia arcade.", contact: false }, "572": { key: 572, n: "Fiortempesta", t: "Erba", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "leaf", category: 2, desc: "Solleva una tempesta di petali che vorticano in tutta l'area vicina.", contact: false, animation: { family: "leaves", text: "Solleva una tempesta di petali che vorticano in tutta l'area vicina.", hits: 1 } }, "573": { key: 573, n: "Liofilizzazione", t: "Ghiaccio", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "beam", category: 3, desc: "Emette un freddo secco che congela l'umidit\xE0 sul bersaglio in cristalli sottili.", contact: false, animation: { family: "slam", text: "Emette un freddo secco che congela l'umidit\xE0 sul bersaglio in cristalli sottili.", hits: 1 } }, "574": { key: 574, n: "Incantavoce", t: "Normale", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Canta con voce dolce, inviando onde rosa e note luminose verso i nemici.", contact: false, animation: { family: "fairy", text: "Canta con voce dolce, inviando onde rosa e note luminose verso i nemici.", hits: 1 } }, "577": { key: 577, n: "Assorbibacio", t: "Normale", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Invia o d\xE0 un bacio luminoso; cuori tornano dal bersaglio e vengono assorbiti come energia.", contact: true, animation: { family: "fairy", text: "Invia o d\xE0 un bacio luminoso; cuori tornano dal bersaglio e vengono assorbiti come energia.", hits: 1 } }, "583": { key: 583, n: "Carineria", t: "Normale", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Si avventa sul bersaglio e lo travolge in una zuffa, con polvere e piccole stelle.", contact: true, animation: { family: "fairy", text: "Si avventa sul bersaglio e lo travolge in una zuffa, con polvere e piccole stelle.", hits: 1 } }, "584": { key: 584, n: "Vento di Fata", t: "Normale", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Genera una brezza luminosa rosa che investe il bersaglio.", contact: false, animation: { family: "fairy", text: "Genera una brezza luminosa rosa che investe il bersaglio.", hits: 1 } }, "585": { key: 585, n: "Forza Lunare", t: "Normale", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "shot", category: 3, desc: "Richiama luce lunare e la concentra in un potente globo diretto al bersaglio.", contact: false, animation: { family: "slam", text: "Richiama luce lunare e la concentra in un potente globo diretto al bersaglio.", hits: 1 } }, "586": { key: 586, n: "Ondaboato", t: "Normale", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 140, adattata alla battaglia arcade.", contact: false }, "591": { key: 591, n: "Diamantempesta", t: "Roccia", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 100, adattata alla battaglia arcade.", contact: false }, "592": { key: 592, n: "Vaporscoppio", t: "Acqua", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 110, adattata alla battaglia arcade.", contact: false }, "593": { key: 593, n: "Forodimensionale", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 80, adattata alla battaglia arcade.", contact: false }, "594": { key: 594, n: "Acqualame", t: "Acqua", power: 15, d: 10, c: 1.1, s: 330, r: 15, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 15, adattata alla battaglia arcade.", contact: false }, "595": { key: 595, n: "Magifiamma", t: "Fuoco", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "flame", category: 3, desc: "Disegna un arco con il corpo o un arto e libera fiamme dal bagliore magico.", contact: false, animation: { family: "fire", text: "Disegna un arco con il corpo o un arto e libera fiamme dal bagliore magico.", hits: 1 } }, "605": { key: 605, n: "Magibrillio", t: "Normale", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Libera dal corpo un lampo magico molto luminoso che investe i nemici.", contact: false, animation: { family: "fairy", text: "Libera dal corpo un lampo magico molto luminoso che investe i nemici.", hits: 1 } }, "609": { key: 609, n: "Elettrococcola", t: "Elettro", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Strofina le guance elettriche contro il bersaglio e libera piccole scintille.", contact: true, animation: { family: "electric", text: "Strofina le guance elettriche contro il bersaglio e libera piccole scintille.", hits: 1 } }, "610": { key: 610, n: "Riguardo", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 40, adattata alla battaglia arcade.", contact: true }, "611": { key: 611, n: "Assillo", t: "Coleottero", power: 20, d: 10, c: 1.1, s: 330, r: 15, mode: "shot", category: 3, desc: "Avvolge il bersaglio in uno sciame di piccole presenze insettoidi persistenti.", contact: true, animation: { family: "swarm", text: "Avvolge il bersaglio in uno sciame di piccole presenze insettoidi persistenti.", hits: 1 } }, "612": { key: 612, n: "Crescipugno", t: "Lotta", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Carica energia nel pugno e colpisce; il braccio resta avvolto da un'aura crescente.", contact: true, animation: { family: "punch", text: "Carica energia nel pugno e colpisce; il braccio resta avvolto da un'aura crescente.", hits: 1 } }, "613": { key: 613, n: "Ali del Fato", t: "Volante", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Volante. Potenza 80, adattata alla battaglia arcade.", contact: false }, "614": { key: 614, n: "Mille Frecce", t: "Terra", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 90, adattata alla battaglia arcade.", contact: false }, "615": { key: 615, n: "Mille Onde", t: "Terra", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 90, adattata alla battaglia arcade.", contact: false }, "616": { key: 616, n: "Forza Tellurica", t: "Terra", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 90, adattata alla battaglia arcade.", contact: false }, "617": { key: 617, n: "Luce Nefasta", t: "Normale", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 140, adattata alla battaglia arcade.", contact: false }, "618": { key: 618, n: "Primopulsar", t: "Acqua", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 110, adattata alla battaglia arcade.", contact: false }, "619": { key: 619, n: "Spade Telluriche", t: "Terra", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 120, adattata alla battaglia arcade.", contact: false }, "620": { key: 620, n: "Ascesa del Drago", t: "Volante", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Volante. Potenza 120, adattata alla battaglia arcade.", contact: true }, "621": { key: 621, n: "Urtodimensionale", t: "Buio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 100, adattata alla battaglia arcade.", contact: false }, "622": { key: 622, n: "Carica Travolgente", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "623": { key: 623, n: "Carica Travolgente", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "624": { key: 624, n: "Iperscarica Furiosa", t: "Lotta", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 45, adattata alla battaglia arcade.", contact: false }, "625": { key: 625, n: "Iperscarica Furiosa", t: "Lotta", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Lotta. Potenza 45, adattata alla battaglia arcade.", contact: false }, "626": { key: 626, n: "Picchiata Devastante", t: "Volante", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Volante. Potenza 45, adattata alla battaglia arcade.", contact: false }, "627": { key: 627, n: "Picchiata Devastante", t: "Volante", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Volante. Potenza 45, adattata alla battaglia arcade.", contact: false }, "628": { key: 628, n: "Acidiluvio Corrosivo", t: "Veleno", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 45, adattata alla battaglia arcade.", contact: false }, "629": { key: 629, n: "Acidiluvio Corrosivo", t: "Veleno", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Veleno. Potenza 45, adattata alla battaglia arcade.", contact: false }, "630": { key: 630, n: "Furore della Terra", t: "Terra", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 45, adattata alla battaglia arcade.", contact: false }, "631": { key: 631, n: "Furore della Terra", t: "Terra", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Terra. Potenza 45, adattata alla battaglia arcade.", contact: false }, "632": { key: 632, n: "Gigamacigno Polverizzante", t: "Roccia", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 45, adattata alla battaglia arcade.", contact: false }, "633": { key: 633, n: "Gigamacigno Polverizzante", t: "Roccia", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Roccia. Potenza 45, adattata alla battaglia arcade.", contact: false }, "634": { key: 634, n: "Bozzolo Fatale", t: "Coleottero", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Coleottero. Potenza 45, adattata alla battaglia arcade.", contact: false }, "635": { key: 635, n: "Bozzolo Fatale", t: "Coleottero", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Coleottero. Potenza 45, adattata alla battaglia arcade.", contact: false }, "636": { key: 636, n: "Abbraccio Spettrale", t: "Spettro", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 45, adattata alla battaglia arcade.", contact: false }, "637": { key: 637, n: "Abbraccio Spettrale", t: "Spettro", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 45, adattata alla battaglia arcade.", contact: false }, "638": { key: 638, n: "Spirale Perforante", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "639": { key: 639, n: "Spirale Perforante", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Acciaio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "640": { key: 640, n: "Fiammobomba Detonante", t: "Fuoco", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 45, adattata alla battaglia arcade.", contact: false }, "641": { key: 641, n: "Fiammobomba Detonante", t: "Fuoco", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 45, adattata alla battaglia arcade.", contact: false }, "642": { key: 642, n: "Idrovortice Abissale", t: "Acqua", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 45, adattata alla battaglia arcade.", contact: false }, "643": { key: 643, n: "Idrovortice Abissale", t: "Acqua", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 45, adattata alla battaglia arcade.", contact: false }, "644": { key: 644, n: "Floriscoppio Sfolgorante", t: "Erba", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 45, adattata alla battaglia arcade.", contact: false }, "645": { key: 645, n: "Floriscoppio Sfolgorante", t: "Erba", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "leaf", category: 3, desc: "Mossa di tipo Erba. Potenza 45, adattata alla battaglia arcade.", contact: false }, "646": { key: 646, n: "Gigascarica Folgorante", t: "Elettro", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 45, adattata alla battaglia arcade.", contact: false }, "647": { key: 647, n: "Gigascarica Folgorante", t: "Elettro", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 45, adattata alla battaglia arcade.", contact: false }, "648": { key: 648, n: "Impatto Psicocinetico", t: "Psico", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Psico. Potenza 45, adattata alla battaglia arcade.", contact: false }, "649": { key: 649, n: "Impatto Psicocinetico", t: "Psico", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 45, adattata alla battaglia arcade.", contact: false }, "650": { key: 650, n: "Criodistruzione Polare", t: "Ghiaccio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "651": { key: 651, n: "Criodistruzione Polare", t: "Ghiaccio", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "beam", category: 3, desc: "Mossa di tipo Ghiaccio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "652": { key: 652, n: "Dragoschianto Finale", t: "Drago", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Drago. Potenza 45, adattata alla battaglia arcade.", contact: false }, "653": { key: 653, n: "Dragoschianto Finale", t: "Drago", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 45, adattata alla battaglia arcade.", contact: false }, "654": { key: 654, n: "Buco Nero del Non Ritorno", t: "Buio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "655": { key: 655, n: "Buco Nero del Non Ritorno", t: "Buio", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Buio. Potenza 45, adattata alla battaglia arcade.", contact: false }, "656": { key: 656, n: "Astroimpatto Fatato", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "657": { key: 657, n: "Astroimpatto Fatato", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "658": { key: 658, n: "Super Pikaboom", t: "Elettro", power: 210, d: 50, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 210, adattata alla battaglia arcade.", contact: true }, "660": { key: 660, n: "Schermaglia", t: "Coleottero", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "All'ingresso in campo scatta subito contro il bersaglio con un assalto improvviso.", contact: true, animation: { family: "swarm", text: "All'ingresso in campo scatta subito contro il bersaglio con un assalto improvviso.", hits: 1 } }, "662": { key: 662, n: "Cucitura d\u2019Ombra", t: "Spettro", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 80, adattata alla battaglia arcade.", contact: false }, "663": { key: 663, n: "Braccioteso", t: "Buio", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Allarga le braccia e ruota, travolgendo il bersaglio con un colpo di braccio teso.", contact: true, animation: { family: "dark", text: "Allarga le braccia e ruota, travolgendo il bersaglio con un colpo di braccio teso.", hits: 1 } }, "664": { key: 664, n: "Canto Effimero", t: "Acqua", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "wave", category: 3, desc: "Canta e produce bolle sonore luminose che avanzano e scoppiano sui bersagli.", contact: false, animation: { family: "water", text: "Canta e produce bolle sonore luminose che avanzano e scoppiano sui bersagli.", hits: 1 } }, "665": { key: 665, n: "Martelgelo", t: "Ghiaccio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 100, adattata alla battaglia arcade.", contact: true }, "667": { key: 667, n: "Forza Equina", t: "Terra", power: 95, d: 23, c: 3, s: 420, r: 22, mode: "slash", category: 2, desc: "Spinge con grande forza su zampe o corpo e assesta un urto terrestre potente.", contact: true, animation: { family: "slam", text: "Spinge con grande forza su zampe o corpo e assesta un urto terrestre potente.", hits: 1 } }, "669": { key: 669, n: "Lama Solare", t: "Erba", power: 125, d: 30, c: 3.9, s: 420, r: 22, mode: "leaf", category: 2, desc: "Accumula luce in una lunga lama solare, poi la cala sul bersaglio.", contact: true, animation: { family: "leaves", text: "Accumula luce in una lunga lama solare, poi la cala sul bersaglio.", hits: 1 } }, "670": { key: 670, n: "Fogliame", t: "Erba", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 40, adattata alla battaglia arcade.", contact: false }, "675": { key: 675, n: "Colpo Infernale", t: "Buio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Scatta e colpisce il bersaglio alla gola o nella zona da cui emette la voce.", contact: true, animation: { family: "dark", text: "Scatta e colpisce il bersaglio alla gola o nella zona da cui emette la voce.", hits: 1 } }, "676": { key: 676, n: "Sferapolline", t: "Coleottero", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Lancia una sfera di polline: sui nemici esplode, sugli alleati si apre in luce curativa.", contact: false, animation: { family: "heal", text: "Lancia una sfera di polline: sui nemici esplode, sugli alleati si apre in luce curativa.", hits: 1 } }, "677": { key: 677, n: "Colpo d\u2019Ancora", t: "Acciaio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 80, adattata alla battaglia arcade.", contact: true }, "679": { key: 679, n: "Assalto", t: "Coleottero", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Balza in avanti e affonda contro il bersaglio con arti o appendici.", contact: true, animation: { family: "dash", text: "Balza in avanti e affonda contro il bersaglio con arti o appendici.", hits: 1 } }, "680": { key: 680, n: "Frusta di Fuoco", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 80, adattata alla battaglia arcade.", contact: true }, "681": { key: 681, n: "Tracotanza", t: "Buio", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Raccoglie le aure dei propri potenziamenti e si lancia in un attacco oscuro e arrogante.", contact: true, animation: { family: "dark", text: "Raccoglie le aure dei propri potenziamenti e si lancia in un attacco oscuro e arrogante.", hits: 1 } }, "682": { key: 682, n: "Ultima Fiamma", t: "Fuoco", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "flame", category: 3, desc: "Libera in un'unica fiammata tutto il proprio calore; le fiamme sul corpo poi si attenuano.", contact: false, animation: { family: "fire", text: "Libera in un'unica fiammata tutto il proprio calore; le fiamme sul corpo poi si attenuano.", hits: 1 } }, "684": { key: 684, n: "Sottilcorno", t: "Acciaio", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Punta un corno metallico e colpisce con un affondo preciso.", contact: true, animation: { family: "pierce", text: "Punta un corno metallico e colpisce con un affondo preciso.", hits: 1 } }, "686": { key: 686, n: "Mutadanza", t: "Normale", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 90, adattata alla battaglia arcade.", contact: false }, "687": { key: 687, n: "Nucleocastigo", t: "Drago", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 100, adattata alla battaglia arcade.", contact: false }, "688": { key: 688, n: "Tropicalcio", t: "Erba", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 70, adattata alla battaglia arcade.", contact: true }, "690": { key: 690, n: "Cannonbecco", t: "Volante", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Volante. Potenza 100, adattata alla battaglia arcade.", contact: false }, "691": { key: 691, n: "Clamorsquame", t: "Drago", power: 110, d: 26, c: 3.4, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 110, adattata alla battaglia arcade.", contact: false }, "692": { key: 692, n: "Marteldrago", t: "Drago", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Solleva il lungo collo o una parte robusta del corpo e la abbatte come un martello.", contact: true, animation: { family: "dragon", text: "Solleva il lungo collo o una parte robusta del corpo e la abbatte come un martello.", hits: 1 } }, "693": { key: 693, n: "Vorticolpo", t: "Buio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota il corpo o un'appendice e colpisce tutti quelli vicini con una larga spazzata.", contact: true, animation: { family: "dark", text: "Ruota il corpo o un'appendice e colpisce tutti quelli vicini con una larga spazzata.", hits: 1 } }, "695": { key: 695, n: "Dardoassalto Spettrale", t: "Spettro", power: 180, d: 43, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 180, adattata alla battaglia arcade.", contact: false }, "696": { key: 696, n: "Iperschianto delle Tenebre", t: "Buio", power: 180, d: 43, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 180, adattata alla battaglia arcade.", contact: true }, "697": { key: 697, n: "Sinfonia del Mare", t: "Acqua", power: 195, d: 47, c: 5, s: 330, r: 22, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 195, adattata alla battaglia arcade.", contact: false }, "698": { key: 698, n: "Collera del Guardiano", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "699": { key: 699, n: "Colpo Eptastellare Rubanima", t: "Spettro", power: 195, d: 47, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 195, adattata alla battaglia arcade.", contact: true }, "700": { key: 700, n: "Elettrosurf Folgorante", t: "Elettro", power: 175, d: 42, c: 5, s: 330, r: 22, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 175, adattata alla battaglia arcade.", contact: false }, "701": { key: 701, n: "Adesso Faccio sul Serio", t: "Normale", power: 210, d: 50, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 210, adattata alla battaglia arcade.", contact: true }, "703": { key: 703, n: "Supernova delle Origini", t: "Psico", power: 185, d: 44, c: 5, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 185, adattata alla battaglia arcade.", contact: false }, "704": { key: 704, n: "Gusciotrappola", t: "Fuoco", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 150, adattata alla battaglia arcade.", contact: false }, "705": { key: 705, n: "Cannonfiore", t: "Normale", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 130, adattata alla battaglia arcade.", contact: false }, "706": { key: 706, n: "Psicozanna", t: "Psico", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Materializza energia psichica sui denti e morde, spezzando eventuali schermi rimovibili.", contact: true, animation: { family: "bite", text: "Materializza energia psichica sui denti e morde, spezzando eventuali schermi rimovibili.", hits: 1 } }, "707": { key: 707, n: "Battipiedi", t: "Terra", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Pesta furiosamente il terreno con zampe o piedi, facendo sobbalzare il bersaglio.", contact: true, animation: { family: "kick", text: "Pesta furiosamente il terreno con zampe o piedi, facendo sobbalzare il bersaglio.", hits: 1 } }, "708": { key: 708, n: "Ossotetro", t: "Spettro", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Brandisce un osso intriso d'energia spettrale e colpisce lasciando una scia scura.", contact: false, animation: { family: "heal", text: "Brandisce un osso intriso d'energia spettrale e colpisce lasciando una scia scura.", hits: 1 } }, "709": { key: 709, n: "Rocciarapida", t: "Roccia", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 40, adattata alla battaglia arcade.", contact: true }, "710": { key: 710, n: "Idrobreccia", t: "Acqua", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "wave", category: 2, desc: "Riveste un arto o il corpo d'acqua e assesta un colpo compatto e penetrante.", contact: true, animation: { family: "punch", text: "Riveste un arto o il corpo d'acqua e assesta un colpo compatto e penetrante.", hits: 1 } }, "711": { key: 711, n: "Prismalaser", t: "Psico", power: 160, d: 38, c: 5, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 160, adattata alla battaglia arcade.", contact: false }, "712": { key: 712, n: "Ombrafurto", t: "Spettro", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 90, adattata alla battaglia arcade.", contact: true }, "713": { key: 713, n: "Astrocarica", t: "Acciaio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 100, adattata alla battaglia arcade.", contact: true }, "714": { key: 714, n: "Raggio d\u2019Ombra", t: "Spettro", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 100, adattata alla battaglia arcade.", contact: false }, "716": { key: 716, n: "Elettropizzico", t: "Elettro", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 80, adattata alla battaglia arcade.", contact: true }, "717": { key: 717, n: "Ira della Natura", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "718": { key: 718, n: "Multiattacco", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 120, adattata alla battaglia arcade.", contact: true }, "719": { key: 719, n: "Iperfulmine", t: "Elettro", power: 195, d: 47, c: 5, s: 330, r: 22, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 195, adattata alla battaglia arcade.", contact: false }, "720": { key: 720, n: "Sbalorditesta", t: "Fuoco", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 150, adattata alla battaglia arcade.", contact: false }, "721": { key: 721, n: "Pugni Plasma", t: "Elettro", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 100, adattata alla battaglia arcade.", contact: true }, "722": { key: 722, n: "Geyser Fotonico", t: "Psico", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 100, adattata alla battaglia arcade.", contact: false }, "723": { key: 723, n: "Fotodistruzione Apocalittica", t: "Psico", power: 200, d: 48, c: 5, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 200, adattata alla battaglia arcade.", contact: false }, "724": { key: 724, n: "Supercollisione Solare", t: "Acciaio", power: 200, d: 48, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 200, adattata alla battaglia arcade.", contact: true }, "725": { key: 725, n: "Deflagrazione Lunare", t: "Spettro", power: 200, d: 48, c: 5, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 200, adattata alla battaglia arcade.", contact: false }, "726": { key: 726, n: "Dolcesacco di Botte", t: "Normale", power: 190, d: 46, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 190, adattata alla battaglia arcade.", contact: true }, "727": { key: 727, n: "Litotempesta Radiale", t: "Roccia", power: 190, d: 46, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 190, adattata alla battaglia arcade.", contact: false }, "728": { key: 728, n: "Dracofonia Divampante", t: "Drago", power: 185, d: 44, c: 5, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 185, adattata alla battaglia arcade.", contact: false }, "729": { key: 729, n: "Sprintaboom", t: "Elettro", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Pikachu si avvolge di elettricit\xE0 e scatta sul bersaglio in un lampo molto rapido.", contact: true, animation: { family: "electric", text: "Pikachu si avvolge di elettricit\xE0 e scatta sul bersaglio in un lampo molto rapido.", hits: 1 } }, "730": { key: 730, n: "Surfasplash", t: "Acqua", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "wave", category: 3, desc: "Pikachu richiama una grande onda e la cavalca, travolgendo i nemici con acqua e scintille.", contact: false, animation: { family: "water", text: "Pikachu richiama una grande onda e la cavalca, travolgendo i nemici con acqua e scintille.", hits: 1 } }, "731": { key: 731, n: "Piombaflap", t: "Volante", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Pikachu si solleva con palloncini e si lascia poi cadere sul bersaglio con uno schianto.", contact: true, animation: { family: "wind", text: "Pikachu si solleva con palloncini e si lascia poi cadere sul bersaglio con uno schianto.", hits: 1 } }, "732": { key: 732, n: "Pikasaetta", t: "Elettro", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 45, adattata alla battaglia arcade.", contact: false }, "733": { key: 733, n: "Bollaslurp", t: "Acqua", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "wave", category: 3, desc: "Eevee lancia bolle d'acqua che colpiscono il bersaglio; un flusso curativo ritorna verso di lui.", contact: false, animation: { family: "heal", text: "Eevee lancia bolle d'acqua che colpiscono il bersaglio; un flusso curativo ritorna verso di lui.", hits: 1 } }, "734": { key: 734, n: "Elettrozap", t: "Elettro", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "bolt", category: 3, desc: "Eevee scarica elettricit\xE0 contro il bersaglio, lasciandolo circondato da scintille.", contact: false, animation: { family: "electric", text: "Eevee scarica elettricit\xE0 contro il bersaglio, lasciandolo circondato da scintille.", hits: 1 } }, "735": { key: 735, n: "Fiammabam", t: "Fuoco", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "flame", category: 2, desc: "Eevee si riveste di fiamme e si lancia in una carica che lascia una scia ardente.", contact: true, animation: { family: "fire", text: "Eevee si riveste di fiamme e si lancia in una carica che lascia una scia ardente.", hits: 1 } }, "736": { key: 736, n: "Auraswoosh", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Eevee colpisce con energia psichica e fa comparire uno schermo luminoso dalla propria parte.", contact: false, animation: { family: "psychic", text: "Eevee colpisce con energia psichica e fa comparire uno schermo luminoso dalla propria parte.", hits: 1 } }, "737": { key: 737, n: "Zona Buiabuia", t: "Buio", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Eevee libera un attacco oscuro e genera una barriera protettiva sul proprio lato.", contact: false, animation: { family: "dark", text: "Eevee libera un attacco oscuro e genera una barriera protettiva sul proprio lato.", hits: 1 } }, "738": { key: 738, n: "Bombafrush", t: "Erba", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "leaf", category: 2, desc: "Eevee lancia un grosso seme che esplode sul bersaglio e lascia germogli che sottraggono energia.", contact: false, animation: { family: "leaves", text: "Eevee lancia un grosso seme che esplode sul bersaglio e lascia germogli che sottraggono energia.", hits: 1 } }, "739": { key: 739, n: "Scricchiagelo", t: "Ghiaccio", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "beam", category: 3, desc: "Eevee evoca cristalli di ghiaccio e una scarica gelida; le aure di potenziamento sul campo svaniscono.", contact: false, animation: { family: "ice", text: "Eevee evoca cristalli di ghiaccio e una scarica gelida; le aure di potenziamento sul campo svaniscono.", hits: 1 } }, "740": { key: 740, n: "Sbrilluccibufera", t: "Normale", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Eevee scatena un turbine di luce fatata; scintille benefiche ripuliscono gli alleati dagli stati curabili.", contact: false, animation: { family: "heal", text: "Eevee scatena un turbine di luce fatata; scintille benefiche ripuliscono gli alleati dagli stati curabili.", hits: 1 } }, "741": { key: 741, n: "Eeveempatto", t: "Normale", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: true }, "742": { key: 742, n: "Pugni Corazzati", t: "Acciaio", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 60, adattata alla battaglia arcade.", contact: true }, "744": { key: 744, n: "Cannone Dynamax", t: "Drago", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 100, adattata alla battaglia arcade.", contact: false }, "745": { key: 745, n: "Tiromirato", t: "Acqua", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 80, adattata alla battaglia arcade.", contact: false }, "746": { key: 746, n: "Morsostretto", t: "Buio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 80, adattata alla battaglia arcade.", contact: true }, "751": { key: 751, n: "Dragofrecce", t: "Drago", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Drago. Potenza 50, adattata alla battaglia arcade.", contact: false }, "754": { key: 754, n: "Beccoshock", t: "Elettro", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 85, adattata alla battaglia arcade.", contact: true }, "755": { key: 755, n: "Branchiomorso", t: "Acqua", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 85, adattata alla battaglia arcade.", contact: true }, "757": { key: 757, n: "Dynafiammata", t: "Fuoco", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 100, adattata alla battaglia arcade.", contact: false }, "758": { key: 758, n: "Dynainsetto", t: "Coleottero", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Coleottero. Potenza 10, adattata alla battaglia arcade.", contact: false }, "759": { key: 759, n: "Dynasaetta", t: "Elettro", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 10, adattata alla battaglia arcade.", contact: false }, "760": { key: 760, n: "Dynattacco", t: "Normale", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 10, adattata alla battaglia arcade.", contact: false }, "761": { key: 761, n: "Dynapugno", t: "Lotta", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 10, adattata alla battaglia arcade.", contact: false }, "762": { key: 762, n: "Dynavuoto", t: "Spettro", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 10, adattata alla battaglia arcade.", contact: false }, "763": { key: 763, n: "Dynagelo", t: "Ghiaccio", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 10, adattata alla battaglia arcade.", contact: false }, "764": { key: 764, n: "Dynacorrosione", t: "Veleno", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 10, adattata alla battaglia arcade.", contact: false }, "765": { key: 765, n: "Dynaflusso", t: "Acqua", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 10, adattata alla battaglia arcade.", contact: false }, "766": { key: 766, n: "Dynajet", t: "Volante", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Volante. Potenza 10, adattata alla battaglia arcade.", contact: false }, "767": { key: 767, n: "Dynafata", t: "Normale", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 10, adattata alla battaglia arcade.", contact: false }, "768": { key: 768, n: "Dynadragone", t: "Drago", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Drago. Potenza 10, adattata alla battaglia arcade.", contact: false }, "769": { key: 769, n: "Dynapsiche", t: "Psico", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Psico. Potenza 10, adattata alla battaglia arcade.", contact: false }, "770": { key: 770, n: "Dynamacigno", t: "Roccia", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 10, adattata alla battaglia arcade.", contact: false }, "771": { key: 771, n: "Dynasisma", t: "Terra", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 10, adattata alla battaglia arcade.", contact: false }, "772": { key: 772, n: "Dynatenebre", t: "Buio", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 10, adattata alla battaglia arcade.", contact: false }, "773": { key: 773, n: "Dynaflora", t: "Erba", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 10, adattata alla battaglia arcade.", contact: false }, "774": { key: 774, n: "Dynametallo", t: "Acciaio", power: 10, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 10, adattata alla battaglia arcade.", contact: false }, "776": { key: 776, n: "Schiacciacorpo", t: "Lotta", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Compatta la propria guardia e usa il corpo robusto per schiacciare il bersaglio.", contact: true, animation: { family: "punch", text: "Compatta la propria guardia e usa il corpo robusto per schiacciare il bersaglio.", hits: 1 } }, "778": { key: 778, n: "Tamburattacco", t: "Erba", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 80, adattata alla battaglia arcade.", contact: false }, "779": { key: 779, n: "Tagliola", t: "Erba", power: 35, d: 10, c: 1.1, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 35, adattata alla battaglia arcade.", contact: true }, "780": { key: 780, n: "Palla Infuocata", t: "Fuoco", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 120, adattata alla battaglia arcade.", contact: false }, "781": { key: 781, n: "Taglio Maestoso", t: "Acciaio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 100, adattata alla battaglia arcade.", contact: true }, "782": { key: 782, n: "Colpo Maestoso", t: "Acciaio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 100, adattata alla battaglia arcade.", contact: true }, "783": { key: 783, n: "Ruota d\u2019Aura", t: "Elettro", power: 110, d: 26, c: 3.4, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 110, adattata alla battaglia arcade.", contact: false }, "784": { key: 784, n: "Vastoimpatto", t: "Drago", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Ruota la coda o un'appendice con una larga spazzata d'energia draconica sui nemici.", contact: true, animation: { family: "dragon", text: "Ruota la coda o un'appendice con una larga spazzata d'energia draconica sui nemici.", hits: 1 } }, "785": { key: 785, n: "Ramostoccata", t: "Erba", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 40, adattata alla battaglia arcade.", contact: true }, "786": { key: 786, n: "Overdrive", t: "Elettro", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 80, adattata alla battaglia arcade.", contact: false }, "787": { key: 787, n: "Acido Malico", t: "Erba", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "leaf", category: 3, desc: "Mossa di tipo Erba. Potenza 80, adattata alla battaglia arcade.", contact: false }, "788": { key: 788, n: "Forza G", t: "Erba", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 80, adattata alla battaglia arcade.", contact: false }, "789": { key: 789, n: "Frantumanima", t: "Normale", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: true }, "790": { key: 790, n: "Vapore Incantato", t: "Normale", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Soffia un getto di vapore dall'aspetto magico che avvolge e disorienta il bersaglio.", contact: false, animation: { family: "fairy", text: "Soffia un getto di vapore dall'aspetto magico che avvolge e disorienta il bersaglio.", hits: 1 } }, "793": { key: 793, n: "Supplicolpo", t: "Buio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 80, adattata alla battaglia arcade.", contact: true }, "794": { key: 794, n: "Sfolgorassalto", t: "Lotta", power: 150, d: 36, c: 4.7, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 150, adattata alla battaglia arcade.", contact: false }, "795": { key: 795, n: "Raggio Infinito", t: "Drago", power: 160, d: 38, c: 5, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 160, adattata alla battaglia arcade.", contact: false }, "796": { key: 796, n: "Raggio d\u2019Acciaio", t: "Acciaio", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Concentra energia metallica e spara un raggio enorme, mostrando forte affaticamento dopo il colpo.", contact: false, animation: { family: "beam", text: "Concentra energia metallica e spara un raggio enorme, mostrando forte affaticamento dopo il colpo.", hits: 1 } }, "797": { key: 797, n: "Vastenergia", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Espande un'onda psichica dal corpo; sul Campo Psichico l'onda si allarga sull'area nemica.", contact: false, animation: { family: "psychic", text: "Espande un'onda psichica dal corpo; sul Campo Psichico l'onda si allarga sull'area nemica.", hits: 1 } }, "798": { key: 798, n: "Ferrorullo", t: "Acciaio", power: 130, d: 31, c: 4.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Ruota e avanza come un rullo metallico, travolgendo il bersaglio e spazzando il terreno attivo.", contact: true, animation: { family: "metal", text: "Ruota e avanza come un rullo metallico, travolgendo il bersaglio e spazzando il terreno attivo.", hits: 1 } }, "799": { key: 799, n: "Squamacolpo", t: "Drago", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Lancia pi\xF9 squame dure come proiettili, poi assume una posa pi\xF9 veloce ma meno protetta.", contact: false, animation: { family: "dragon", text: "Lancia pi\xF9 squame dure come proiettili, poi assume una posa pi\xF9 veloce ma meno protetta.", hits: 1 } }, "800": { key: 800, n: "Raggiometeora", t: "Roccia", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Assorbe energia cosmica in un bagliore crescente e spara un potente raggio scintillante.", contact: false, animation: { family: "beam", text: "Assorbe energia cosmica in un bagliore crescente e spara un potente raggio scintillante.", hits: 1 } }, "801": { key: 801, n: "Armaguscio", t: "Veleno", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Slowbro di Galar punta la conchiglia sul braccio e spara veleno, oppure la usa per un colpo ravvicinato.", contact: false, animation: { family: "poison", text: "Slowbro di Galar punta la conchiglia sul braccio e spara veleno, oppure la usa per un colpo ravvicinato.", hits: 1 } }, "802": { key: 802, n: "Nebbioscoppio", t: "Normale", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Si avvolge in nebbia fatata e si fa esplodere in una nube luminosa, andando KO.", contact: false, animation: { family: "fairy", text: "Si avvolge in nebbia fatata e si fa esplodere in una nube luminosa, andando KO.", hits: 1 } }, "803": { key: 803, n: "Erboscivolata", t: "Erba", power: 55, d: 13, c: 1.7, s: 420, r: 15, mode: "leaf", category: 2, desc: "Scivola rasoterra su una scia d'erba e colpisce rapidamente il bersaglio.", contact: true, animation: { family: "leaves", text: "Scivola rasoterra su una scia d'erba e colpisce rapidamente il bersaglio.", hits: 1 } }, "804": { key: 804, n: "Elettroimpennata", t: "Elettro", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "bolt", category: 3, desc: "Invia una scarica che risale dal terreno sotto il bersaglio, pi\xF9 vistosa sul Campo Elettrico.", contact: false, animation: { family: "electric", text: "Invia una scarica che risale dal terreno sotto il bersaglio, pi\xF9 vistosa sul Campo Elettrico.", hits: 1 } }, "805": { key: 805, n: "Campopulsar", t: "Normale", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Lancia un impulso d'energia; colore e particelle riflettono l'eventuale terreno attivo.", contact: false, animation: { family: "energy", text: "Lancia un impulso d'energia; colore e particelle riflettono l'eventuale terreno attivo.", hits: 1 } }, "806": { key: 806, n: "Strisciacolpo", t: "Coleottero", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Scivola o striscia verso il bersaglio e lo colpisce con un movimento rapido e ravvicinato.", contact: true, animation: { family: "swarm", text: "Scivola o striscia verso il bersaglio e lo colpisce con un movimento rapido e ravvicinato.", hits: 1 } }, "807": { key: 807, n: "Fiamminvidia", t: "Fuoco", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "flame", category: 3, desc: "Libera fiamme cariche di rabbia contro i nemici; un bagliore aggiuntivo pu\xF2 segnalare le condizioni dell'effetto secondario.", contact: false, animation: { family: "fire", text: "Libera fiamme cariche di rabbia contro i nemici; un bagliore aggiuntivo pu\xF2 segnalare le condizioni dell'effetto secondario.", hits: 1 } }, "808": { key: 808, n: "Sfogarabbia", t: "Buio", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Si sfoga con una sferzata o un colpo oscuro, enfatizzato quando ha appena subito un calo di statistiche.", contact: true, animation: { family: "dark", text: "Si sfoga con una sferzata o un colpo oscuro, enfatizzato quando ha appena subito un calo di statistiche.", hits: 1 } }, "809": { key: 809, n: "Poltergeist", t: "Spettro", power: 110, d: 26, c: 3.4, s: 420, r: 22, mode: "slash", category: 2, desc: "Fa vibrare e muovere lo strumento del bersaglio, che viene attaccato da una forza spettrale.", contact: false, animation: { family: "ghost", text: "Fa vibrare e muovere lo strumento del bersaglio, che viene attaccato da una forza spettrale.", hits: 1 } }, "812": { key: 812, n: "Virata", t: "Acqua", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "wave", category: 2, desc: "Colpisce avvolto dall'acqua, poi esegue una virata e torna verso la squadra per il cambio.", contact: true, animation: { family: "water", text: "Colpisce avvolto dall'acqua, poi esegue una virata e torna verso la squadra per il cambio.", hits: 1 } }, "813": { key: 813, n: "Triplo Axel", t: "Ghiaccio", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Esegue tre rotazioni acrobatiche con calci gelidi, con un impatto distinto per ciascuna riuscita.", contact: true, animation: { family: "ice", text: "Esegue tre rotazioni acrobatiche con calci gelidi, con un impatto distinto per ciascuna riuscita.", hits: 1 } }, "814": { key: 814, n: "Doppia Ala", t: "Volante", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Sferra due colpi d'ala consecutivi, scanditi da due scie e due impatti.", contact: true, animation: { family: "wing", text: "Sferra due colpi d'ala consecutivi, scanditi da due scie e due impatti.", hits: 1 } }, "815": { key: 815, n: "Sabbiardente", t: "Terra", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Scaglia un getto di sabbia arroventata, accompagnato da distorsioni di calore.", contact: false, animation: { family: "earth", text: "Scaglia un getto di sabbia arroventata, accompagnato da distorsioni di calore.", hits: 1 } }, "817": { key: 817, n: "Pugnotenebra", t: "Buio", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 75, adattata alla battaglia arcade.", contact: true }, "818": { key: 818, n: "Idroraffica", t: "Acqua", power: 25, d: 10, c: 1.1, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 25, adattata alla battaglia arcade.", contact: true }, "819": { key: 819, n: "Elettrogabbia", t: "Elettro", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 80, adattata alla battaglia arcade.", contact: false }, "820": { key: 820, n: "Dragoenergia", t: "Drago", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 150, adattata alla battaglia arcade.", contact: false }, "821": { key: 821, n: "Sguardo Gelido", t: "Psico", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Articuno di Galar emette energia psichica dagli occhi, immobilizzando il bersaglio in un bagliore gelido.", contact: false, animation: { family: "psychic", text: "Articuno di Galar emette energia psichica dagli occhi, immobilizzando il bersaglio in un bagliore gelido.", hits: 1 } }, "822": { key: 822, n: "Furia Ardente", t: "Buio", power: 90, d: 22, c: 2.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Moltres di Galar spalanca le ali e diffonde un'aura oscura simile a fiamme che investe i nemici.", contact: false, animation: { family: "heal", text: "Moltres di Galar spalanca le ali e diffonde un'aura oscura simile a fiamme che investe i nemici.", hits: 1 } }, "823": { key: 823, n: "Calcio Tonante", t: "Lotta", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Zapdos di Galar scatta con un poderoso calcio, con un impatto luminoso e una posa aggressiva.", contact: true, animation: { family: "kick", text: "Zapdos di Galar scatta con un poderoso calcio, con un impatto luminoso e una posa aggressiva.", hits: 1 } }, "824": { key: 824, n: "Lancia Glaciale", t: "Ghiaccio", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 120, adattata alla battaglia arcade.", contact: false }, "825": { key: 825, n: "Schegge Astrali", t: "Spettro", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 120, adattata alla battaglia arcade.", contact: false }, "826": { key: 826, n: "Inquietantesimo", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 80, adattata alla battaglia arcade.", contact: false }, "827": { key: 827, n: "Artigli Fatali", t: "Veleno", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 80, adattata alla battaglia arcade.", contact: false }, "828": { key: 828, n: "Barrierassalto", t: "Psico", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Psico. Potenza 70, adattata alla battaglia arcade.", contact: false }, "830": { key: 830, n: "Rocciascure", t: "Roccia", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 65, adattata alla battaglia arcade.", contact: false }, "831": { key: 831, n: "Tempesta Zefirea", t: "Normale", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 100, adattata alla battaglia arcade.", contact: false }, "832": { key: 832, n: "Forza Mistica", t: "Psico", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 70, adattata alla battaglia arcade.", contact: false }, "833": { key: 833, n: "Ira Furente", t: "Fuoco", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "flame", category: 2, desc: "Si infuria e travolge il bersaglio con fiamme e colpi ripetuti, senza fermarsi subito.", contact: false, animation: { family: "fire", text: "Si infuria e travolge il bersaglio con fiamme e colpi ripetuti, senza fermarsi subito.", hits: 1 } }, "834": { key: 834, n: "Ondaschianto", t: "Acqua", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "wave", category: 2, desc: "Si avvolge in un'enorme onda e si schianta sul bersaglio, subendo contraccolpo.", contact: false, animation: { family: "slam", text: "Si avvolge in un'enorme onda e si schianta sul bersaglio, subendo contraccolpo.", hits: 1 } }, "835": { key: 835, n: "Clorofillaser", t: "Erba", power: 150, d: 36, c: 4.7, s: 330, r: 22, mode: "leaf", category: 3, desc: "Accumula energia vegetale nel corpo e la spara in un grosso fascio verde, consumando la propria energia.", contact: false, animation: { family: "beam", text: "Accumula energia vegetale nel corpo e la spara in un grosso fascio verde, consumando la propria energia.", hits: 1 } }, "836": { key: 836, n: "Soffio d\u2019Iceberg", t: "Ghiaccio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Ghiaccio. Potenza 100, adattata alla battaglia arcade.", contact: false }, "838": { key: 838, n: "Scontro Frontale", t: "Terra", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Terra. Potenza 120, adattata alla battaglia arcade.", contact: false }, "839": { key: 839, n: "Mille Fielespine", t: "Veleno", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 60, adattata alla battaglia arcade.", contact: false }, "840": { key: 840, n: "Ali d\u2019Aura", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 80, adattata alla battaglia arcade.", contact: false }, "841": { key: 841, n: "Livore", t: "Spettro", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 75, adattata alla battaglia arcade.", contact: false }, "843": { key: 843, n: "Triplodardo", t: "Lotta", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 90, adattata alla battaglia arcade.", contact: false }, "844": { key: 844, n: "Corteo Spettrale", t: "Spettro", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Spettro. Potenza 60, adattata alla battaglia arcade.", contact: false }, "845": { key: 845, n: "Lama Milleflutti", t: "Buio", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 65, adattata alla battaglia arcade.", contact: false }, "846": { key: 846, n: "Tempesta Boreale", t: "Volante", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Volante. Potenza 100, adattata alla battaglia arcade.", contact: false }, "847": { key: 847, n: "Tempesta Tonante", t: "Elettro", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 100, adattata alla battaglia arcade.", contact: false }, "848": { key: 848, n: "Tempesta Ardente", t: "Terra", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Terra. Potenza 100, adattata alla battaglia arcade.", contact: false }, "851": { key: 851, n: "Terascoppio", t: "Normale", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Spara un colpo d'energia; con la Teracristal cambia colore secondo il teratipo previsto.", contact: false, animation: { family: "energy", text: "Spara un colpo d'energia; con la Teracristal cambia colore secondo il teratipo previsto.", hits: 1 } }, "853": { key: 853, n: "Calcio ad Ascia", t: "Lotta", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Solleva la gamba sopra la testa e la cala come un'ascia; un errore pu\xF2 provocare una brutta caduta.", contact: false, animation: { family: "kick", text: "Solleva la gamba sopra la testa e la cala come un'ascia; un errore pu\xF2 provocare una brutta caduta.", hits: 1 } }, "854": { key: 854, n: "Omaggio ai KO", t: "Spettro", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Spettro. Potenza 50, adattata alla battaglia arcade.", contact: false }, "855": { key: 855, n: "Fotocollisione", t: "Psico", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 80, adattata alla battaglia arcade.", contact: false }, "856": { key: 856, n: "Alta Cucina", t: "Drago", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Drago. Potenza 80, adattata alla battaglia arcade.", contact: false }, "857": { key: 857, n: "Pugnojet", t: "Acqua", power: 60, d: 14, c: 1.9, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 60, adattata alla battaglia arcade.", contact: false }, "859": { key: 859, n: "Slittaruote", t: "Acciaio", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 100, adattata alla battaglia arcade.", contact: false }, "860": { key: 860, n: "Infestazione", t: "Normale", power: 20, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 20, adattata alla battaglia arcade.", contact: false }, "861": { key: 861, n: "Vortighiaccio", t: "Ghiaccio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Si ricopre di gelo e ruota contro il bersaglio, frantumando anche l'effetto del terreno attivo.", contact: false, animation: { family: "ice", text: "Si ricopre di gelo e ruota contro il bersaglio, frantumando anche l'effetto del terreno attivo.", hits: 1 } }, "862": { key: 862, n: "Spadoncarica", t: "Drago", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Drago. Potenza 120, adattata alla battaglia arcade.", contact: false }, "864": { key: 864, n: "Sotto Sale", t: "Roccia", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 40, adattata alla battaglia arcade.", contact: false }, "865": { key: 865, n: "Triplo Tuffo", t: "Acqua", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 30, adattata alla battaglia arcade.", contact: false }, "866": { key: 866, n: "Glitturbine", t: "Veleno", power: 30, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 30, adattata alla battaglia arcade.", contact: false }, "869": { key: 869, n: "Genufendente", t: "Buio", power: 85, d: 20, c: 2.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 85, adattata alla battaglia arcade.", contact: false }, "870": { key: 870, n: "Prestigiafiore", t: "Erba", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 70, adattata alla battaglia arcade.", contact: false }, "871": { key: 871, n: "Canzone Ardente", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 80, adattata alla battaglia arcade.", contact: false }, "872": { key: 872, n: "Idroballetto", t: "Acqua", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 80, adattata alla battaglia arcade.", contact: false }, "873": { key: 873, n: "Scatenatoro", t: "Normale", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Tauros carica a testa bassa; scia e particelle seguono il tipo previsto dalla sua forma.", contact: false, animation: { family: "energy", text: "Tauros carica a testa bassa; scia e particelle seguono il tipo previsto dalla sua forma.", hits: 1 } }, "874": { key: 874, n: "Corsa all\u2019Oro", t: "Acciaio", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Acciaio. Potenza 120, adattata alla battaglia arcade.", contact: false }, "875": { key: 875, n: "Psicolama", t: "Psico", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Psico. Potenza 80, adattata alla battaglia arcade.", contact: false }, "876": { key: 876, n: "Idrovapore", t: "Acqua", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "wave", category: 3, desc: "Mossa di tipo Acqua. Potenza 80, adattata alla battaglia arcade.", contact: false }, "877": { key: 877, n: "Catastrofe", t: "Buio", power: 1, d: 10, c: 1.1, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Buio. Potenza 1, adattata alla battaglia arcade.", contact: false }, "878": { key: 878, n: "Turboschianto", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 100, adattata alla battaglia arcade.", contact: false }, "879": { key: 879, n: "Fulmiscatto", t: "Elettro", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 100, adattata alla battaglia arcade.", contact: false }, "884": { key: 884, n: "Balzo", t: "Coleottero", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Balza sul bersaglio e lo colpisce dall'alto con arti o corpo.", contact: false, animation: { family: "swarm", text: "Balza sul bersaglio e lo colpisce dall'alto con arti o corpo.", hits: 1 } }, "885": { key: 885, n: "Apripista", t: "Erba", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "leaf", category: 2, desc: "Scatta attraverso una scia di foglie e colpisce, mantenendo slancio dopo l'impatto.", contact: false, animation: { family: "leaves", text: "Scatta attraverso una scia di foglie e colpisce, mantenendo slancio dopo l'impatto.", hits: 1 } }, "886": { key: 886, n: "Doccia Fredda", t: "Acqua", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "wave", category: 3, desc: "Sversa acqua fredda sul bersaglio, lasciandolo inzuppato e scosso.", contact: false, animation: { family: "water", text: "Sversa acqua fredda sul bersaglio, lasciandolo inzuppato e scosso.", hits: 1 } }, "887": { key: 887, n: "Ipertrapano", t: "Normale", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 100, adattata alla battaglia arcade.", contact: false }, "888": { key: 888, n: "Doppioraggio", t: "Psico", power: 40, d: 10, c: 1.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Psico. Potenza 40, adattata alla battaglia arcade.", contact: false }, "889": { key: 889, n: "Pugno Furibondo", t: "Spettro", power: 50, d: 12, c: 1.6, s: 420, r: 15, mode: "slash", category: 2, desc: "Raccoglie la rabbia nel pugno e colpisce; l'aura cresce in base ai colpi subiti secondo le regole della mossa.", contact: false, animation: { family: "punch", text: "Raccoglie la rabbia nel pugno e colpisce; l'aura cresce in base ai colpi subiti secondo le regole della mossa.", hits: 1 } }, "890": { key: 890, n: "Corazza Cannone", t: "Fuoco", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "flame", category: 3, desc: "Mossa di tipo Fuoco. Potenza 120, adattata alla battaglia arcade.", contact: false }, "891": { key: 891, n: "Lama del Rimorso", t: "Fuoco", power: 90, d: 22, c: 2.8, s: 420, r: 22, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 90, adattata alla battaglia arcade.", contact: false }, "892": { key: 892, n: "Doppiolampo", t: "Elettro", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Elettro. Potenza 120, adattata alla battaglia arcade.", contact: false }, "893": { key: 893, n: "Granmartello", t: "Acciaio", power: 160, d: 38, c: 5, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Acciaio. Potenza 160, adattata alla battaglia arcade.", contact: false }, "894": { key: 894, n: "Ritorsione", t: "Buio", power: 1, d: 10, c: 1.1, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 1, adattata alla battaglia arcade.", contact: false }, "895": { key: 895, n: "Idrotaglio", t: "Acqua", power: 70, d: 17, c: 2.2, s: 420, r: 15, mode: "wave", category: 2, desc: "Mossa di tipo Acqua. Potenza 70, adattata alla battaglia arcade.", contact: false }, "896": { key: 896, n: "Turboustione", t: "Fuoco", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "flame", category: 2, desc: "Mossa di tipo Fuoco. Potenza 80, adattata alla battaglia arcade.", contact: false }, "897": { key: 897, n: "Turbotenebra", t: "Buio", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Buio. Potenza 80, adattata alla battaglia arcade.", contact: false }, "898": { key: 898, n: "Turbotossina", t: "Veleno", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Veleno. Potenza 100, adattata alla battaglia arcade.", contact: false }, "899": { key: 899, n: "Turborissa", t: "Lotta", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Lotta. Potenza 100, adattata alla battaglia arcade.", contact: false }, "900": { key: 900, n: "Turboincanto", t: "Normale", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 100, adattata alla battaglia arcade.", contact: false }, "901": { key: 901, n: "Luna Rossa", t: "Normale", power: 140, d: 34, c: 4.4, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 140, adattata alla battaglia arcade.", contact: false }, "902": { key: 902, n: "Spruzzat\xE8", t: "Erba", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "leaf", category: 3, desc: "Mossa di tipo Erba. Potenza 80, adattata alla battaglia arcade.", contact: false }, "903": { key: 903, n: "Bomba Sciroppata", t: "Erba", power: 60, d: 14, c: 1.9, s: 330, r: 15, mode: "leaf", category: 3, desc: "Mossa di tipo Erba. Potenza 60, adattata alla battaglia arcade.", contact: false }, "904": { key: 904, n: "Clava di Liane", t: "Erba", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "leaf", category: 2, desc: "Mossa di tipo Erba. Potenza 100, adattata alla battaglia arcade.", contact: false }, "905": { key: 905, n: "Elettroraggio", t: "Elettro", power: 130, d: 31, c: 4.1, s: 330, r: 22, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 130, adattata alla battaglia arcade.", contact: false }, "906": { key: 906, n: "Teracluster", t: "Normale", power: 120, d: 29, c: 3.8, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 120, adattata alla battaglia arcade.", contact: false }, "907": { key: 907, n: "Irregolaser", t: "Drago", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "beam", category: 3, desc: "Mossa di tipo Drago. Potenza 80, adattata alla battaglia arcade.", contact: false }, "909": { key: 909, n: "Saetta", t: "Elettro", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "bolt", category: 3, desc: "Mossa di tipo Elettro. Potenza 70, adattata alla battaglia arcade.", contact: false }, "910": { key: 910, n: "Taglio Poderoso", t: "Roccia", power: 95, d: 23, c: 3, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Roccia. Potenza 95, adattata alla battaglia arcade.", contact: false }, "911": { key: 911, n: "Tachiontaglio", t: "Acciaio", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Acciaio. Potenza 50, adattata alla battaglia arcade.", contact: false }, "912": { key: 912, n: "Pressa d\u2019Acciaio", t: "Acciaio", power: 45, d: 11, c: 1.4, s: 420, r: 15, mode: "slash", category: 2, desc: "Comprime il bersaglio con una forte pressione metallica, come tra due superfici d'acciaio.", contact: false, animation: { family: "metal", text: "Comprime il bersaglio con una forte pressione metallica, come tra due superfici d'acciaio.", hits: 1 } }, "914": { key: 914, n: "Ammaliavoce", t: "Normale", power: 80, d: 19, c: 2.5, s: 330, r: 15, mode: "shot", category: 3, desc: "Canta con voce ammaliante, inviando note fatate; l'eventuale confusione dipende dalle condizioni della mossa.", contact: false, animation: { family: "fairy", text: "Canta con voce ammaliante, inviando note fatate; l'eventuale confusione dipende dalle condizioni della mossa.", hits: 1 } }, "915": { key: 915, n: "Rabbia Bruciante", t: "Fuoco", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "flame", category: 2, desc: "Si infuria e attacca con fiamme concentrate, pi\xF9 intense se la mossa precedente \xE8 fallita.", contact: false, animation: { family: "fire", text: "Si infuria e attacca con fiamme concentrate, pi\xF9 intense se la mossa precedente \xE8 fallita.", hits: 1 } }, "916": { key: 916, n: "Elettrotuffo", t: "Elettro", power: 100, d: 24, c: 3.1, s: 420, r: 22, mode: "slash", category: 2, desc: "Si avvolge in elettricit\xE0 e si tuffa sul bersaglio; se manca, si schianta a terra.", contact: false, animation: { family: "electric", text: "Si avvolge in elettricit\xE0 e si tuffa sul bersaglio; se manca, si schianta a terra.", hits: 1 } }, "917": { key: 917, n: "Psicorumore", t: "Psico", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Emette un rumore psichico penetrante; onde viola colpiscono il bersaglio e un sigillo indica il blocco delle cure.", contact: false, animation: { family: "psychic", text: "Emette un rumore psichico penetrante; onde viola colpiscono il bersaglio e un sigillo indica il blocco delle cure.", hits: 1 } }, "918": { key: 918, n: "Colpo di Mano", t: "Lotta", power: 65, d: 16, c: 2, s: 420, r: 15, mode: "slash", category: 2, desc: "Anticipa un attacco prioritario compatibile con un colpo secco che interrompe il bersaglio.", contact: false, animation: { family: "punch", text: "Anticipa un attacco prioritario compatibile con un colpo secco che interrompe il bersaglio.", hits: 1 } }, "919": { key: 919, n: "Intossicatena", t: "Veleno", power: 100, d: 24, c: 3.1, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Veleno. Potenza 100, adattata alla battaglia arcade.", contact: false }, "10001": { key: 10001, n: "Ombroraffica", t: "Normale", power: 55, d: 13, c: 1.7, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 55, adattata alla battaglia arcade.", contact: true }, "10002": { key: 10002, n: "Ombrolame", t: "Normale", power: 80, d: 19, c: 2.5, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 80, adattata alla battaglia arcade.", contact: false }, "10003": { key: 10003, n: "Ombrattacco", t: "Normale", power: 40, d: 10, c: 1.2, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 40, adattata alla battaglia arcade.", contact: true }, "10004": { key: 10004, n: "Fulminombra", t: "Normale", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: false }, "10005": { key: 10005, n: "Ombrospinta", t: "Normale", power: 75, d: 18, c: 2.3, s: 420, r: 15, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: true }, "10006": { key: 10006, n: "Gelodombra", t: "Normale", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: false }, "10007": { key: 10007, n: "Fineoscuro", t: "Normale", power: 120, d: 29, c: 3.8, s: 420, r: 22, mode: "slash", category: 2, desc: "Mossa di tipo Normale. Potenza 120, adattata alla battaglia arcade.", contact: true }, "10008": { key: 10008, n: "Fuocoscuro", t: "Normale", power: 75, d: 18, c: 2.3, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 75, adattata alla battaglia arcade.", contact: false }, "10009": { key: 10009, n: "Ombrolancia", t: "Normale", power: 70, d: 17, c: 2.2, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 70, adattata alla battaglia arcade.", contact: false }, "10010": { key: 10010, n: "Turbinombra", t: "Normale", power: 95, d: 23, c: 3, s: 330, r: 22, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 95, adattata alla battaglia arcade.", contact: false }, "10011": { key: 10011, n: "Ondascura", t: "Normale", power: 50, d: 12, c: 1.6, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 50, adattata alla battaglia arcade.", contact: false }, "10013": { key: 10013, n: "Iraoscura", t: "Normale", power: 45, d: 11, c: 1.4, s: 330, r: 15, mode: "shot", category: 3, desc: "Mossa di tipo Normale. Potenza 45, adattata alla battaglia arcade.", contact: false }, "95": { key: 95, n: "Ipnosi", t: "Psico", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "sleep", desc: "Fissa il bersaglio e proietta onde o cerchi ipnotici che lo fanno assopire.", animation: { family: "hypnosis", text: "Fissa il bersaglio e proietta onde o cerchi ipnotici che lo fanno assopire.", hits: 1 } }, "79": { key: 79, n: "Sonnifero", t: "Erba", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "sleep", desc: "Sparge una polvere soporifera; il bersaglio rallenta e chiude gli occhi.", animation: { family: "powder", text: "Sparge una polvere soporifera; il bersaglio rallenta e chiude gli occhi.", hits: 1 } }, "86": { key: 86, n: "Tuononda", t: "Elettro", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "paralysis", desc: "Invia una debole onda elettrica che avvolge il bersaglio in scintille paralizzanti.", animation: { family: "rings", text: "Invia una debole onda elettrica che avvolge il bersaglio in scintille paralizzanti.", hits: 1 } }, "78": { key: 78, n: "Paralizzante", t: "Erba", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "paralysis", desc: "Libera una nube di spore gialle che ricopre il bersaglio di piccole scintille.", animation: { family: "leaves", text: "Libera una nube di spore gialle che ricopre il bersaglio di piccole scintille.", hits: 1 } }, "77": { key: 77, n: "Velenpolvere", t: "Veleno", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "poison", desc: "Disperde una polvere viola che si deposita sul bersaglio.", animation: { family: "powder", text: "Disperde una polvere viola che si deposita sul bersaglio.", hits: 1 } }, "92": { key: 92, n: "Tossina", t: "Veleno", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "poison", desc: "Lancia un fluido o una nube tossica densa che impregna il bersaglio di veleno.", animation: { family: "poison", text: "Lancia un fluido o una nube tossica densa che impregna il bersaglio di veleno.", hits: 1 } }, "261": { key: 261, n: "Fuocofatuo", t: "Fuoco", power: 0, d: 0, c: 8, s: 270, r: 19, mode: "status", category: 1, contact: false, status: "burn", desc: "Evoca piccole fiamme spettrali che raggiungono e avvolgono il bersaglio.", animation: { family: "wisps", text: "Evoca piccole fiamme spettrali che raggiungono e avvolgono il bersaglio.", hits: 1 } } } };

// ../PokeBattle_2D_v28/lib/rules.ts
var catalog = kanto_default;
var species = catalog.pokemon;
var moves = catalog.moves;
var byNum = /* @__PURE__ */ __name((n) => species.find((p) => p.num === n), "byNum");
var basePool = species.filter((p) => p.basic).map((p) => p.num);
var items = [...EQUIPMENT.filter((i) => i.category === "evolution" && i.futureEvolution).map((i) => i.name), ...EQUIPMENT.filter((i) => i.category === "held").flatMap((i) => Array(i.rarity === "Comune" ? 4 : i.rarity === "Non comune" ? 3 : i.rarity === "Raro" ? 2 : 1).fill(i.name)), "Pietrafocaia", "Pietraidrica", "Pietratuono", "Pietrafoglia", "Pietralunare", "Biglietto scambio", "Speed", "Difesa", "Attacco", "Uovo Pok\xE9mon"];
function mon(num) {
  return { uid: crypto.randomUUID(), num, level: 6, xp: 0, tms: [] };
}
__name(mon, "mon");
function newState(name, starter) {
  return { name, coins: 500, monsters: [mon(starter)], party: [], cards: {}, items: {}, preferences: { language: "it", musicVolume: 0.12, soundEffects: true, vibration: true, reducedMotion: false }, story: { cleared: 0 }, pokedex: { seen: [starter], owned: [starter] }, training: [], incubator: null, lastHatch: null, lastPack: 0, lastBag: 0, lastEggPurchase: 0, wins: 0, battles: 0, avatar: { photo: null } };
}
__name(newState, "newState");
function stats(n, l) {
  let b = byNum(n).stats;
  return b.map((v, i) => i === 0 ? Math.floor((2 * v + 15) * l / 100) + l + 10 : Math.floor((2 * v + 15) * l / 100) + 5);
}
__name(stats, "stats");
function availableMoveIds(num, l, tms = []) {
  let chain = [], p = byNum(num);
  while (p) {
    chain.unshift(p);
    p = p.pre ? byNum(p.pre) : null;
  }
  let set = [];
  for (let s of chain) for (let [lv, id] of s.learn) if (lv <= l && !set.includes(id)) set.push(id);
  for (let id of tms) if (!set.includes(id) && byNum(num).tm.includes(id)) set.push(id);
  if (!set.length) set = [33];
  return set;
}
__name(availableMoveIds, "availableMoveIds");
function learned(num, l, tms = [], loadout = []) {
  let ids = availableMoveIds(num, l, tms), chosen = loadout.length === 4 ? loadout.map((id) => ids.includes(id) ? id : null) : ids.slice(-4);
  return chosen.map((id) => id ? moves[id] : { n: "Non appresa", t: "Normale", c: 1, power: 0, d: 0, locked: true }).filter(Boolean);
}
__name(learned, "learned");
function xpNeeded(l) {
  return 30 + l * 18;
}
__name(xpNeeded, "xpNeeded");
function evolveAuto(m) {
  let p = byNum(m.num), e = p.evolutions.find((e2) => e2.trigger === "level" && m.level >= e2.level);
  if (e) {
    m.num = e.id;
    return true;
  }
  return false;
}
__name(evolveAuto, "evolveAuto");
function levelUp(m) {
  if (m.level >= 100) return;
  m.level++;
  evolveAuto(m);
}
__name(levelUp, "levelUp");
function trainingList(s) {
  if (!Array.isArray(s.training)) s.training = s.training ? [s.training] : [];
  return s.training;
}
__name(trainingList, "trainingList");
function recordEvolution(s, uid, from, to) {
  if (from === to) return;
  s.evolutionEvents = [...s.evolutionEvents || [], { id: crypto.randomUUID(), uid, from, to, at: Date.now() }].slice(-30);
}
__name(recordEvolution, "recordEvolution");
function settle(s, now = Date.now()) {
  let changed = !Array.isArray(s.training), pending = [];
  for (let t of trainingList(s)) {
    if (t.ends <= now) {
      let m = s.monsters.find((m2) => m2.uid === t.uid);
      if (m) {
        let from = m.num;
        levelUp(m);
        recordEvolution(s, m.uid, from, m.num);
      }
      changed = true;
    } else pending.push(t);
  }
  s.training = pending;
  if (s.incubator && s.incubator.ends <= now) {
    let random = new Uint32Array(1);
    crypto.getRandomValues(random);
    let m = mon(basePool[random[0] % basePool.length]);
    s.monsters.push(m);
    s.lastHatch = { uid: m.uid, num: m.num, at: now };
    s.incubator = null;
    changed = true;
  }
  return syncPokedex(s) || changed;
}
__name(settle, "settle");
function trainTime(l) {
  return Math.round((5 + Math.pow((l - 6) / 94, 1.65) * 475) * 6e4);
}
__name(trainTime, "trainTime");
function snapshot(m) {
  let p = byNum(m.num), v = heldStats(m, stats(m.num, m.level), p.evolutions.length > 0);
  return { ...p, uid: m.uid, heldItem: m.heldItem || null, level: m.level, max: v[0] * 3, hp: v[0] * 3, stat: v, moves: learned(m.num, m.level, m.tms, m.loadout), cd: [0, 0, 0, 0], damageDealt: 0, x: 300, y: 600 };
}
__name(snapshot, "snapshot");
var stadiumTypes = { classic: [], meadow: ["Normale", "Coleottero"], forest: ["Erba"], coast: ["Acqua"], volcano: ["Fuoco"], ice: ["Ghiaccio"], ruins: ["Roccia", "Terra"], powerplant: ["Elettro"] };
function terrainBonus(type, id = "classic") {
  return (stadiumTypes[id] || []).includes(type) ? 1.1 : 1;
}
__name(terrainBonus, "terrainBonus");
function demoLoadout(p, ids, table3) {
  let ranked = ids.filter((id) => table3[id]?.power > 0).sort((a, b) => {
    let score = /* @__PURE__ */ __name((id) => table3[id].power + (p.types.includes(table3[id].t) ? 18 : 0) + (["flame", "beam", "wave", "bolt"].includes(table3[id].mode) ? 12 : 0), "score");
    return score(b) - score(a);
  }), out = [], types = /* @__PURE__ */ new Set();
  let stab = ranked.find((id) => p.types.includes(table3[id].t));
  if (stab) {
    out.push(stab);
    types.add(table3[stab].t);
  }
  for (let id of ranked) if (!types.has(table3[id].t) && out.length < 4) {
    out.push(id);
    types.add(table3[id].t);
  }
  for (let id of ranked) if (out.length < 4 && !out.includes(id)) out.push(id);
  let signature = [7, 8, 9].includes(p.num) ? [229, 145].filter((id) => ids.includes(id)) : ids.includes(61) ? [61] : ids.includes(95) ? [95] : [];
  if (signature.length) out = [...out.filter((id) => id && !signature.includes(id)).slice(0, 4 - signature.length), ...signature];
  while (out.length < 4) out.push(null);
  return out;
}
__name(demoLoadout, "demoLoadout");
function syncPokedex(s) {
  let old = JSON.stringify(s.pokedex || null), valid = /* @__PURE__ */ __name((n) => Number.isInteger(n) && n >= 1 && n <= 151, "valid");
  let owned = new Set((s.pokedex?.owned || []).filter(valid)), seen = new Set((s.pokedex?.seen || []).filter(valid));
  for (let m of s.monsters || []) if (valid(m.num)) owned.add(m.num);
  for (let e of s.evolutionEvents || []) for (let n of [e.from, e.to]) if (valid(n)) owned.add(n);
  for (let n of owned) seen.add(n);
  s.pokedex = { seen: [...seen].sort((a, b) => a - b), owned: [...owned].sort((a, b) => a - b) };
  return old !== JSON.stringify(s.pokedex);
}
__name(syncPokedex, "syncPokedex");
function markPokedexSeen(s, nums) {
  syncPokedex(s);
  let old = s.pokedex.seen.length;
  s.pokedex.seen = [.../* @__PURE__ */ new Set([...s.pokedex.seen, ...nums.filter((n) => Number.isInteger(n) && n >= 1 && n <= 151)])].sort((a, b) => a - b);
  return old !== s.pokedex.seen.length;
}
__name(markPokedexSeen, "markPokedexSeen");

// ../PokeBattle_2D_v28/lib/machines.json
var machines_default = [{ number: 1, id: 264, name: "Centripugno", available: true }, { number: 2, id: 337, name: "Dragartigli", available: true }, { number: 3, id: 352, name: "Idropulsar", available: true }, { number: 4, id: 347, name: "Calmamente", available: false }, { number: 5, id: 46, name: "Boato", available: false }, { number: 6, id: 92, name: "Tossina", available: false }, { number: 7, id: 258, name: "Grandine", available: false }, { number: 8, id: 339, name: "Granfisico", available: false }, { number: 9, id: 331, name: "Semitraglia", available: true }, { number: 10, id: 237, name: "Introforza", available: true }, { number: 11, id: 241, name: "Giornodisole", available: false }, { number: 12, id: 269, name: "Provocazione", available: false }, { number: 13, id: 58, name: "Geloraggio", available: true }, { number: 14, id: 59, name: "Bora", available: true }, { number: 15, id: 63, name: "Iper Raggio", available: true }, { number: 16, id: 113, name: "Schermoluce", available: false }, { number: 17, id: 182, name: "Protezione", available: false }, { number: 18, id: 240, name: "Pioggiadanza", available: false }, { number: 19, id: 202, name: "Gigassorbimento", available: true }, { number: 20, id: 219, name: "Salvaguardia", available: false }, { number: 21, id: 218, name: "Frustrazione", available: true }, { number: 22, id: 76, name: "Solarraggio", available: true }, { number: 23, id: 231, name: "Codacciaio", available: true }, { number: 24, id: 85, name: "Fulmine", available: true }, { number: 25, id: 87, name: "Tuono", available: true }, { number: 26, id: 89, name: "Terremoto", available: true }, { number: 27, id: 216, name: "Ritorno", available: true }, { number: 28, id: 91, name: "Fossa", available: true }, { number: 29, id: 94, name: "Psichico", available: true }, { number: 30, id: 247, name: "Palla Ombra", available: true }, { number: 31, id: 280, name: "Breccia", available: true }, { number: 32, id: 104, name: "Doppioteam", available: false }, { number: 33, id: 115, name: "Riflesso", available: false }, { number: 34, id: 351, name: "Ondashock", available: true }, { number: 35, id: 53, name: "Lanciafiamme", available: true }, { number: 36, id: 188, name: "Fangobomba", available: true }, { number: 37, id: 201, name: "Terrempesta", available: false }, { number: 38, id: 126, name: "Fuocobomba", available: true }, { number: 39, id: 317, name: "Rocciotomba", available: true }, { number: 40, id: 332, name: "Aeroassalto", available: true }, { number: 41, id: 259, name: "Attaccalite", available: false }, { number: 42, id: 263, name: "Facciata", available: true }, { number: 43, id: 290, name: "Forzasegreta", available: true }, { number: 44, id: 156, name: "Riposo", available: false }, { number: 45, id: 213, name: "Attrazione", available: false }, { number: 46, id: 168, name: "Furto", available: true }, { number: 47, id: 211, name: "Alacciaio", available: true }, { number: 48, id: 285, name: "Baratto", available: false }, { number: 49, id: 289, name: "Scippo", available: false }, { number: 50, id: 315, name: "Vampata", available: true }];

// ../PokeBattle_2D_v28/lib/live-progress.ts
function xpAwards(s, team, duration) {
  return team.map((sm) => {
    const m = s.monsters.find((m2) => m2.uid === sm.uid), beforeLevel = m?.level || sm.level;
    const xp = m && m.level < 100 ? Math.round(Math.min(120, 35 + duration * 0.3) * (sm.used ? 1 : 0.25) * (heldInfo(sm)?.xp || 1)) : 0;
    if (m) {
      m.xp += xp;
      while (m.level < 100 && m.xp >= xpNeeded(m.level)) {
        m.xp -= xpNeeded(m.level);
        levelUp(m);
      }
    }
    return { uid: sm.uid, num: sm.num, name: byNum(sm.num).name, xp, beforeLevel, level: m?.level || beforeLevel };
  });
}
__name(xpAwards, "xpAwards");
function addPassXP(s, seasons, won, now = Date.now()) {
  s.passes = s.passes || {};
  for (const season of seasons) {
    if (now < season.starts || now >= season.ends) continue;
    const p = s.passes[season.id] || { xp: 0, unlocked: false, claimed: [] };
    p.xp = Math.min(1e4, p.xp + (won ? 50 : 25));
    s.passes[season.id] = p;
  }
}
__name(addPassXP, "addPassXP");
function validReward(r) {
  if (r === null) return null;
  const integer = /* @__PURE__ */ __name((v, min, max) => Number.isInteger(v) && v >= min && v <= max, "integer");
  if (!r || typeof r !== "object") throw new Error("Ricompensa non valida.");
  if (r.kind === "coins" && integer(r.amount, 1, 1e5)) return { kind: r.kind, amount: r.amount };
  if (r.kind === "cards" && basePool.includes(r.num) && integer(r.amount, 1, 100)) return { kind: r.kind, num: r.num, amount: r.amount };
  if (r.kind === "pokemon" && byNum(r.num) && integer(r.level, 1, 100)) return { kind: r.kind, num: r.num, level: r.level };
  const names = [...items, ...EQUIPMENT.map((i) => i.name), "Speed", "Difesa", "Attacco", ...machines_default.filter((m) => m.available).map((m) => "MT " + m.id)];
  if (r.kind === "item" && names.includes(r.item) && integer(r.amount, 1, 100)) return { kind: r.kind, item: r.item, amount: r.amount };
  throw new Error("Scegli una ricompensa valida e una quantit\xE0 o livello consentiti.");
}
__name(validReward, "validReward");
function grantReward(s, r) {
  if (!r) return;
  if (r.kind === "coins") s.coins += r.amount;
  if (r.kind === "cards") s.cards[r.num] = (s.cards[r.num] || 0) + r.amount;
  if (r.kind === "item") s.items[r.item] = (s.items[r.item] || 0) + r.amount;
  if (r.kind === "pokemon") {
    const m = mon(r.num);
    m.level = r.level;
    m.xp = 0;
    s.monsters.push(m);
  }
}
__name(grantReward, "grantReward");

// ../PokeBattle_2D_v28/lib/arena.ts
var WORLD = { w: 960, h: 600, left: 70, right: 890, top: 90, bottom: 540 };
function bound(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
__name(bound, "bound");
function arenaChannelMove(m) {
  return !!m && !m.contact && m.power >= 60 && ["flame", "beam", "wave", "bolt"].includes(m.mode);
}
__name(arenaChannelMove, "arenaChannelMove");
function arenaCanFly(m) {
  return !!m && (m.types?.includes("Volante") || ["butterfree", "beedrill", "venomoth", "magnemite", "magneton", "gastly", "haunter", "gengar", "koffing", "weezing", "mew", "mewtwo"].includes(m.id) || [12, 15, 49, 81, 82, 92, 93, 94, 109, 110, 150, 151].includes(m.num));
}
__name(arenaCanFly, "arenaCanFly");
function arenaProps(kind) {
  let theme = { classic: "rock", meadow: "rock", forest: "stump", volcano: "basalt", ice: "crystal", ruins: "pillar", powerplant: "coil", coast: "rock" }[kind];
  if (!theme) return [];
  return [[330, 205, 28], [630, 430, 30], [420, 440, 24], [590, 190, 25]].map(([x, y, r], id) => ({ id, x, y, r, kind: theme, hp: 3, max: 3, lastHit: -1 }));
}
__name(arenaProps, "arenaProps");
function arenaEnsure(st) {
  if (!st.arena) st.arena = { drops: [], serial: 0, nextDrop: 10, charges: [{ speed: 0, attack: 0, defense: 0 }, { speed: 0, attack: 0, defense: 0 }], ice: [], burns: [] };
  let a = st.arena;
  if (st.stadium === "coast") {
    a.ice = [];
    a.platforms = [];
  }
  if (!a.platforms) a.platforms = [0, 1, 2].map((id) => ({ id, hp: 3, max: 3, lastHit: -1 }));
  if (!a.props) a.props = arenaProps(st.stadium);
  if (!a.missiles) a.missiles = [];
  if (!a.craters) a.craters = [];
  if (!a.terrain) a.terrain = [];
  if (!a.groundHits) a.groundHits = [];
  if (!a.rockSerial) a.rockSerial = 1e4;
  return a;
}
__name(arenaEnsure, "arenaEnsure");
function arenaLivePlatforms(st, t = st.time) {
  return [];
}
__name(arenaLivePlatforms, "arenaLivePlatforms");
function inPool(x, y) {
  return false;
}
__name(inPool, "inPool");
function arenaOnPlatform(p, x, y, margin = 6) {
  return ((x - p.x) / (p.w / 2 - margin)) ** 2 + ((y - p.y) / (p.h / 2 - margin)) ** 2 < 1;
}
__name(arenaOnPlatform, "arenaOnPlatform");
function arenaWalkable(st, side, x, y) {
  let m = st.teams[side][st.active[side]], a = arenaEnsure(st);
  if (arenaCanFly(m)) return true;
  if (a.props.some((o) => o.hp > 0 && !o.airborne && Math.hypot(o.x - x, o.y - y) < o.r + 12)) return false;
  if (st.stadium !== "coast" || !inPool(x, y)) return true;
  if (m.types.includes("Acqua")) return true;
  return arenaLivePlatforms(st).some((p) => arenaOnPlatform(p, x, y)) || a.ice.some((i) => i.hp > 0 && Math.hypot(x - i.x, y - i.y) < i.r - 6);
}
__name(arenaWalkable, "arenaWalkable");
function arenaSafe(st, side, x, y) {
  x = bound(x, WORLD.left, WORLD.right);
  y = bound(y, WORLD.top, WORLD.bottom);
  if (arenaWalkable(st, side, x, y)) return { x, y };
  let candidates = [{ x: 145, y }, { x: 815, y }, { x, y: 150 }, { x, y: 490 }, ...arenaLivePlatforms(st).map((p) => ({ x: p.x, y: p.y })), ...arenaEnsure(st).ice.filter((i) => i.hp > 0).map((i) => ({ x: i.x, y: i.y }))];
  return candidates.filter((c) => arenaWalkable(st, side, c.x, c.y)).sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))[0];
}
__name(arenaSafe, "arenaSafe");
function arenaMove(st, side, x, y) {
  let p = st.pos[side], ox = p.x, oy = p.y, ground = arenaGroundSpeed(st, side);
  x = ox + (x - ox) * ground;
  y = oy + (y - oy) * ground;
  x = bound(x, WORLD.left, WORLD.right);
  y = bound(y, WORLD.top, WORLD.bottom);
  let steps = Math.max(1, Math.ceil(Math.hypot(x - ox, y - oy) / 8));
  for (let i = 1; i <= steps; i++) {
    let nx = ox + (x - ox) * i / steps, ny = oy + (y - oy) * i / steps;
    if (arenaWalkable(st, side, nx, ny)) {
      p.x = nx;
      p.y = ny;
    } else {
      if (p.action?.phase === "dash" && !p.action.obstacleHit) {
        let o = arenaEnsure(st).props.find((o2) => o2.hp > 0 && !o2.airborne && Math.hypot(o2.x - nx, o2.y - ny) < o2.r + 16);
        if (o) {
          p.action.obstacleHit = true;
          arenaImpact(st, o.x, o.y, p.action.move);
        }
      }
      if (arenaWalkable(st, side, nx, p.y)) p.x = nx;
      else if (arenaWalkable(st, side, p.x, ny)) p.y = ny;
      break;
    }
  }
  return Math.hypot(p.x - ox, p.y - oy);
}
__name(arenaMove, "arenaMove");
function arenaBuff(m, kind, t) {
  return (m.buffs?.[kind] || 0) > t;
}
__name(arenaBuff, "arenaBuff");
function arenaSpeed(m, t) {
  return (m.status?.until > t && m.status.kind === "sleep" ? 0 : m.status?.until > t && m.status.kind === "paralysis" ? 0.55 : 1) * (arenaBuff(m, "speed", t) ? 1.65 : 1) * (m.heldItem === "Stolascelta" ? 1.5 : 1);
}
__name(arenaSpeed, "arenaSpeed");
function arenaDamage(st, owner) {
  return (arenaBuff(st.teams[owner][st.active[owner]], "attack", st.time) ? 2 : 1) / (arenaBuff(st.teams[1 - owner][st.active[1 - owner]], "defense", st.time) ? 2 : 1);
}
__name(arenaDamage, "arenaDamage");
function arenaThrow(st, side, kind) {
  let a = arenaEnsure(st);
  if (!["speed", "attack", "defense"].includes(kind) || !a.charges[side][kind] || st.pos[side].held) return false;
  let p = st.pos[side], t = st.pos[1 - side], angle = Math.atan2(t.y - p.y, t.x - p.x);
  a.charges[side][kind]--;
  a.drops.push({ id: ++a.serial, kind, ox: p.x, oy: p.y - 20, x: bound(p.x + Math.cos(angle) * 145, 80, 880), y: bound(p.y + Math.sin(angle) * 145, 100, 530), born: st.time, land: st.time + 0.55, expires: st.time + 20 });
  return true;
}
__name(arenaThrow, "arenaThrow");
function arenaRaiseRocks(st, x, y, move, count3 = 2) {
  let a = arenaEnsure(st);
  if (a.props.filter((o) => o.hp > 0).length >= 26) return [];
  let made = [];
  for (let i = 0; i < count3; i++) {
    if (a.props.filter((o) => o.hp > 0).length >= 26) break;
    let angle = a.rockSerial * 0.71 + i * 2.399, dist = 55 + i * 23, r = 15 + i % 3 * 4, nx = bound(x + Math.cos(angle) * dist, 95, 865), ny = bound(y + Math.sin(angle) * dist, 118, 515);
    if (st.pos.some((p) => Math.hypot(p.x - nx, p.y - ny) < r + 35) || a.props.some((o) => o.hp > 0 && Math.hypot(o.x - nx, o.y - ny) < o.r + r + 12)) continue;
    let rock = { id: ++a.rockSerial, x: nx, y: ny, r, kind: st.stadium === "volcano" ? "basalt" : "rock", hp: 2, max: 2, lastHit: st.time, born: st.time, generated: true };
    a.props.push(rock);
    made.push(rock);
    st.events.push({ kind: "rockrise", x: nx, y: ny, id: rock.id });
  }
  if (a.props.length > 90) a.props = a.props.filter((o) => o.hp > 0 || o.airborne);
  return made;
}
__name(arenaRaiseRocks, "arenaRaiseRocks");
function arenaGroundStrike(st, x, y, move) {
  if (move.dot || move.status || !(move.power >= 40)) return null;
  let a = arenaEnsure(st), cell = a.groundHits.find((c) => Math.hypot(c.x - x, c.y - y) < 55);
  if (!cell) {
    if (a.groundHits.length >= 100) return null;
    cell = { x, y, hits: 0, need: move.power >= 100 ? 3 : 4, last: -10, ids: [] };
    a.groundHits.push(cell);
  }
  if (move.castId && cell.ids.includes(move.castId) || st.time - cell.last < 0.6) return cell;
  cell.hits++;
  cell.last = st.time;
  if (move.castId) {
    cell.ids.push(move.castId);
    cell.ids = cell.ids.slice(-12);
  }
  return cell;
}
__name(arenaGroundStrike, "arenaGroundStrike");
function arenaExcavate(st, x, y, move, count3 = 2) {
  let a = arenaEnsure(st), cell = arenaGroundStrike(st, x, y, move);
  if (!cell || cell.hits < cell.need) return;
  let breaks = Math.floor(cell.hits / cell.need);
  let old = a.craters.find((c) => Math.hypot(c.x - x, c.y - y) < 48);
  if (old) {
    if ((old.breaks || 1) >= breaks) return;
    old.breaks = breaks;
    old.born = st.time;
    old.r = Math.min(58, old.r + 3);
    arenaRaiseRocks(st, x, y, move, count3);
    return;
  }
  a.craters.push({ x, y, r: 22 + Math.min(28, move.power * 0.16), born: st.time, seed: a.rockSerial, breaks });
  if (a.craters.length > 65) a.craters.shift();
  arenaRaiseRocks(st, x, y, move, count3);
  st.events.push({ kind: "excavate", x, y, type: move.t });
}
__name(arenaExcavate, "arenaExcavate");
function arenaImpact(st, x, y, move) {
  arenaTerrainImpact(st, x, y, move);
  let a = arenaEnsure(st), power = move.power || 40, amount = 1;
  for (let ice of a.ice) if (ice.hp > 0 && Math.hypot(x - ice.x, y - ice.y) < ice.r + 24 && (ice.lastHit === void 0 || st.time - ice.lastHit > 0.18)) {
    ice.lastHit = st.time;
    ice.hp = Math.max(0, ice.hp - amount);
    if (!ice.hp) st.events.push({ kind: "icebreak", x: ice.x, y: ice.y });
  }
  if (st.stadium === "coast" && power >= 70) for (let p of arenaLivePlatforms(st)) {
    let raft = a.platforms[p.id];
    if (arenaOnPlatform(p, x, y, -18) && st.time - raft.lastHit > 0.3) {
      raft.hp = Math.max(0, raft.hp - Math.max(1, Math.floor(power / 80)));
      raft.lastHit = st.time;
      st.events.push({ kind: raft.hp ? "rafthit" : "raftbreak", x: p.x, y: p.y, id: p.id });
    }
  }
  for (let o of a.props) if (o.hp > 0 && !o.airborne && Math.hypot(o.x - x, o.y - y) < o.r + 25 && st.time - o.lastHit > 0.18 && (!move.castId || o.lastCastId !== move.castId)) {
    o.lastHit = st.time;
    o.lastCastId = move.castId;
    o.hp = Math.max(0, o.hp - amount);
    st.events.push({ kind: o.hp ? "prophit" : "propbreak", x: o.x, y: o.y, material: o.kind, id: o.id });
  }
  arenaExcavate(st, x, y, move);
  if (move.t === "Fuoco" && !(st.stadium === "coast" && inPool(x, y))) {
    a.burns.push({ x, y, r: 20 + power * 0.2, born: st.time });
    if (a.burns.length > 35) a.burns.shift();
  }
}
__name(arenaImpact, "arenaImpact");
function arenaProjectile(st, shot) {
  let a = arenaEnsure(st), x = shot.x, y = shot.y + 25, solid = a.props.find((o) => o.hp > 0 && !o.airborne && Math.hypot(x - o.x, y - o.y) < o.r + (shot.r || 8));
  if (solid) {
    arenaImpact(st, solid.x, solid.y, shot.move || shot.m);
    return true;
  }
  let ice = a.ice.find((o) => o.hp > 0 && Math.hypot(x - o.x, y - o.y) < o.r * 0.7);
  if (ice) {
    arenaImpact(st, ice.x, ice.y, shot.move || shot.m);
    return true;
  }
  if (st.stadium === "coast" && (shot.move || shot.m).power >= 70) {
    let raft = arenaLivePlatforms(st).find((o) => arenaOnPlatform(o, x, y) && !(Number.isFinite(shot.ox) && arenaOnPlatform(o, shot.ox, shot.oy + 25, -8)));
    if (raft) {
      arenaImpact(st, x, y, shot.move || shot.m);
      return true;
    }
  }
  return false;
}
__name(arenaProjectile, "arenaProjectile");
function arenaPsychic(st, side, move) {
  let p = st.pos[side], target = st.pos[1 - side], a = arenaEnsure(st);
  let near = /* @__PURE__ */ __name(() => a.props.filter((o) => o.hp > 0 && !o.airborne && Math.hypot(o.x - p.x, o.y - p.y) < 340).sort((a2, b) => Math.hypot(a2.x - p.x, a2.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y)), "near");
  if (move.power >= 80) {
    arenaExcavate(st, p.x, p.y, { ...move, power: Math.max(90, move.power) }, 3);
  }
  let props = near().slice(0, move.power >= 90 ? 3 : 1);
  if (props.length && Math.hypot(target.x - p.x, target.y - p.y) <= 650) {
    for (let [i, prop] of props.entries()) {
      prop.airborne = true;
      a.missiles.push({ id: prop.id, owner: side, move: { ...move, hitScale: props.length > 1 ? 0.48 : 1 }, kind: prop.kind, r: prop.r, from: { x: prop.x, y: prop.y }, to: { x: target.x + (i - 1) * 15, y: target.y + i % 2 * 12 }, x: prop.x, y: prop.y, z: 0, elapsed: -i * 0.13 });
      st.events.push({ kind: "propthrow", x: prop.x, y: prop.y, side });
    }
    return true;
  }
  if (target.held || Math.hypot(target.x - p.x, target.y - p.y) > 480) return false;
  let angle = Math.atan2(target.y - p.y, target.x - p.x), landing = arenaSafe(st, 1 - side, target.x + Math.cos(angle) * 150, target.y + Math.sin(angle) * 150);
  target.action = null;
  target.held = { owner: side, move, elapsed: 0, start: { x: target.x, y: target.y }, landing };
  st.events.push({ kind: "psychic", x: target.x, y: target.y, side });
  return true;
}
__name(arenaPsychic, "arenaPsychic");
function arenaTick(st, dt, hit2) {
  let a = arenaEnsure(st), previousTime = Math.max(0, st.time - dt);
  for (let o of a.missiles) {
    o.elapsed += dt;
    let f = Math.min(1, Math.max(0, (o.elapsed - 0.5) / 0.55));
    o.x = o.from.x + (o.to.x - o.from.x) * f;
    o.y = o.from.y + (o.to.y - o.from.y) * f;
    o.z = o.elapsed < 0.5 ? o.elapsed * 110 : 55 + Math.sin(f * Math.PI) * 70 - f * 55;
    if (o.elapsed < 0) {
      o.z = 0;
      continue;
    }
    if (o.elapsed >= 1.05) {
      let target = st.pos[1 - o.owner], prop = a.props.find((p) => p.id === o.id);
      if (prop) {
        prop.hp = 0;
        prop.airborne = false;
      }
      st.events.push({ kind: "propbreak", x: o.x, y: o.y, material: o.kind });
      arenaImpact(st, o.x, o.y, o.move);
      arenaRaiseRocks(st, o.x, o.y, o.move, 1);
      if (Math.hypot(target.x - o.x, target.y - o.y) < o.r + 35 && !target.held) hit2(o.owner, o.move);
    }
  }
  a.missiles = a.missiles.filter((o) => o.elapsed < 1.05);
  for (let side of [0, 1]) {
    let p = st.pos[side], held = p.held;
    if (held) {
      held.elapsed += dt;
      if (held.elapsed < 0.6) {
        p.x = held.start.x;
        p.y = held.start.y;
        p.liftHeight = Math.sin(held.elapsed / 0.6 * Math.PI * 0.5) * 64;
      } else {
        let f = Math.min(1, (held.elapsed - 0.6) / 0.35);
        p.x = held.start.x + (held.landing.x - held.start.x) * f;
        p.y = held.start.y + (held.landing.y - held.start.y) * f;
        p.liftHeight = (1 - f) * 64;
        if (f >= 1) {
          p.held = null;
          p.liftHeight = 0;
          arenaImpact(st, p.x, p.y, held.move);
          hit2(held.owner, held.move);
        }
      }
    }
  }
  for (let d of a.drops) {
    if (st.time < d.land || d.expires <= st.time) continue;
    for (let side of [0, 1]) {
      let p = st.pos[side], m = st.teams[side][st.active[side]];
      if (m.hp > 0 && !p.held && Math.hypot(p.x - d.x, p.y - d.y) < 30) {
        m.buffs = m.buffs || {};
        m.buffs[d.kind] = st.time + (d.kind === "speed" ? 6 : 8);
        d.expires = 0;
        st.events.push({ kind: "pickup", side, item: d.kind, x: p.x, y: p.y });
        break;
      }
    }
  }
  a.drops = a.drops.filter((d) => d.expires > st.time);
}
__name(arenaTick, "arenaTick");
function arenaAsleep(m, t) {
  return m.status?.kind === "sleep" && m.status.until > t;
}
__name(arenaAsleep, "arenaAsleep");
function arenaStatusHit(st, owner, move, roll = Math.random()) {
  let m = st.teams[1 - owner][st.active[1 - owner]], kind = move.status;
  if (!kind && !move.dot && !move.statusOnly && roll < 0.18) kind = move.t === "Fuoco" ? "burn" : move.t === "Elettro" ? "paralysis" : move.t === "Veleno" ? "poison" : null;
  if (!kind || m.hp <= 0 || m.status?.until > st.time) return false;
  if (kind === "burn" && m.types.includes("Fuoco") || kind === "poison" && (m.types.includes("Veleno") || m.types.includes("Acciaio")) || kind === "paralysis" && m.types.includes("Elettro")) return false;
  m.status = { kind, owner, until: st.time + (kind === "sleep" ? 3 : kind === "paralysis" ? 6 : 3), next: st.time + 1 };
  let p = st.pos[1 - owner];
  if (kind === "sleep") {
    p.action = null;
    st.holds && (st.holds[1 - owner] = null);
  }
  st.events.push({ kind: "status", status: kind, side: 1 - owner, x: p.x, y: p.y });
  return true;
}
__name(arenaStatusHit, "arenaStatusHit");
function arenaEffectsTick(st, dt, hit2) {
  for (let side of [0, 1]) {
    let m = st.teams[side][st.active[side]], s = m.status, p = st.pos[side];
    if (s && ["burn", "poison"].includes(s.kind) && s.next <= s.until + 1e-3 && s.next <= st.time + 1e-3) {
      s.next += 1;
      hit2(s.owner, { n: s.kind, t: s.kind === "burn" ? "Fuoco" : "Veleno", power: 1, d: Math.max(1, Math.round(m.max * 0.012)), dot: true, category: 3 });
    }
    if (s && s.until <= st.time) {
      delete m.status;
      s = null;
    }
    arenaActorEffects(st, side, dt);
    let a = p.radial;
    if (!a) continue;
    if (a.until <= st.time || a.uid !== m.uid || m.hp <= 0 || arenaAsleep(m, st.time)) {
      p.radial = null;
      continue;
    }
    if (st.time >= a.next) {
      a.next = st.time + 0.35;
      let t = st.pos[1 - side];
      if (Math.hypot(t.x - p.x, t.y - p.y) < a.radius) hit2(side, { ...a.move, hitScale: 0.22 });
      for (let o of arenaEnsure(st).props) if (o.hp > 0 && Math.hypot(o.x - p.x, o.y - p.y) < a.radius) arenaImpact(st, o.x, o.y, a.move);
    }
  }
}
__name(arenaEffectsTick, "arenaEffectsTick");
function arenaRadial(st, side, move) {
  let m = st.teams[side][st.active[side]];
  st.pos[side].radial = { uid: m.uid, move, radius: move.areaRadius || 140, until: st.time + 2.1, next: st.time, born: st.time };
  st.events.push({ kind: "radial", side, x: st.pos[side].x, y: st.pos[side].y });
}
__name(arenaRadial, "arenaRadial");
function arenaTerrainImpact(st, x, y, move) {
  if (move.dot || move.status || !move.power) return;
  let a = arenaEnsure(st), kind, cell = arenaGroundStrike(st, x, y, move);
  if (!(["forest", "meadow"].includes(st.stadium) && ["Fuoco", "Acqua"].includes(move.t)) && (!cell || cell.hits < cell.need)) return;
  if (["forest", "meadow"].includes(st.stadium)) kind = move.t === "Fuoco" ? "fire" : move.t === "Acqua" ? "mud" : move.power >= 70 ? "ruined" : null;
  else if (move.power >= 70) kind = { volcano: "lava", coast: "wet", powerplant: "cable", ice: "steam", classic: "ruined", ruins: "ruined" }[st.stadium];
  if (!kind) return;
  let zone = a.terrain.find((z) => z.kind === kind && Math.hypot(z.x - x, z.y - y) < 65);
  if (zone) {
    if (st.time - zone.last < 0.35) return;
    zone.damage = Math.min(600, zone.damage + move.power);
    zone.r = Math.min(75, 28 + zone.damage * 0.08);
    zone.last = st.time;
    return;
  }
  if (a.terrain.length >= 28) return;
  a.terrain.push({ kind, x: bound(x, 85, 875), y: bound(y, 110, 520), r: 28 + Math.min(22, move.power * 0.12), damage: move.power, born: st.time, last: st.time, seed: a.terrain.length * 17 + 3 });
}
__name(arenaTerrainImpact, "arenaTerrainImpact");
function arenaGroundSpeed(st, side) {
  let p = st.pos[side], m = st.teams[side][st.active[side]];
  if (arenaCanFly(m) && m.num !== 6 && m.id !== "charizard") return 1;
  let zones = arenaEnsure(st).terrain.filter((z) => Math.hypot(z.x - p.x, z.y - p.y) < z.r);
  return zones.some((z) => z.kind === "mud") ? 0.55 : zones.some((z) => z.kind === "wet") ? 0.65 : zones.some((z) => z.kind === "steam") ? 0.8 : 1;
}
__name(arenaGroundSpeed, "arenaGroundSpeed");
function arenaActorEffects(st, side, dt) {
  let m = st.teams[side][st.active[side]], p = st.pos[side];
  if (p.chargeHeld && !arenaAsleep(m, st.time) && !p.action && !p.held && !p.radial && !m.charged) {
    m.energy = Math.min(1, (m.energy || 0) + dt / 1.8);
    if (m.energy >= 1) {
      m.charged = true;
      p.chargeHeld = false;
      st.events.push({ kind: "charged", side, x: p.x, y: p.y });
    }
  }
  if (arenaAsleep(m, st.time)) {
    p.chargeHeld = false;
    if (!m.charged) m.energy = 0;
  }
  if (arenaCanFly(m) && m.num !== 6 && m.id !== "charizard" || (m.hazardNext || 0) > st.time) return;
  let z = arenaEnsure(st).terrain.find((z2) => ["cable", "fire", "lava"].includes(z2.kind) && Math.hypot(z2.x - p.x, z2.y - p.y) < z2.r);
  if (z) {
    m.hazardNext = st.time + 1;
    arenaStatusHit(st, 1 - side, { status: z.kind === "cable" ? "paralysis" : "burn" });
  }
}
__name(arenaActorEffects, "arenaActorEffects");
function arenaConsumeCharge(m, move) {
  if (!m.charged || !(move.power > 0)) return move;
  m.charged = false;
  m.energy = 0;
  return { ...move, power: Math.round(move.power * 1.5), d: Math.round(move.d * 1.5), v: (move.v || 1) * 1.2, r: (move.r || 12) * 1.2, charged: true };
}
__name(arenaConsumeCharge, "arenaConsumeCharge");
var TYPE_CHART = { "Normale": { "Roccia": 0.5, "Acciaio": 0.5, "Spettro": 0 }, "Fuoco": { "Fuoco": 0.5, "Acqua": 0.5, "Erba": 2, "Ghiaccio": 2, "Coleottero": 2, "Roccia": 0.5, "Drago": 0.5, "Acciaio": 2 }, "Acqua": { "Fuoco": 2, "Acqua": 0.5, "Erba": 0.5, "Terra": 2, "Roccia": 2, "Drago": 0.5 }, "Elettro": { "Acqua": 2, "Elettro": 0.5, "Erba": 0.5, "Terra": 0, "Volante": 2, "Drago": 0.5 }, "Erba": { "Fuoco": 0.5, "Acqua": 2, "Erba": 0.5, "Veleno": 0.5, "Terra": 2, "Volante": 0.5, "Coleottero": 0.5, "Roccia": 2, "Drago": 0.5, "Acciaio": 0.5 }, "Ghiaccio": { "Acqua": 0.5, "Erba": 2, "Ghiaccio": 0.5, "Terra": 2, "Volante": 2, "Drago": 2, "Acciaio": 0.5, "Fuoco": 0.5 }, "Lotta": { "Normale": 2, "Ghiaccio": 2, "Veleno": 0.5, "Volante": 0.5, "Psico": 0.5, "Coleottero": 0.5, "Roccia": 2, "Buio": 2, "Acciaio": 2, "Spettro": 0 }, "Veleno": { "Erba": 2, "Veleno": 0.5, "Terra": 0.5, "Roccia": 0.5, "Spettro": 0.5, "Acciaio": 0 }, "Terra": { "Fuoco": 2, "Elettro": 2, "Erba": 0.5, "Veleno": 2, "Volante": 0, "Coleottero": 0.5, "Roccia": 2, "Acciaio": 2 }, "Volante": { "Elettro": 0.5, "Erba": 2, "Lotta": 2, "Coleottero": 2, "Roccia": 0.5, "Acciaio": 0.5 }, "Psico": { "Lotta": 2, "Veleno": 2, "Psico": 0.5, "Buio": 0, "Acciaio": 0.5 }, "Coleottero": { "Fuoco": 0.5, "Erba": 2, "Lotta": 0.5, "Veleno": 0.5, "Volante": 0.5, "Psico": 2, "Spettro": 0.5, "Buio": 2, "Acciaio": 0.5 }, "Roccia": { "Fuoco": 2, "Ghiaccio": 2, "Lotta": 0.5, "Terra": 0.5, "Volante": 2, "Coleottero": 2, "Acciaio": 0.5 }, "Spettro": { "Normale": 0, "Psico": 2, "Buio": 0.5, "Acciaio": 0.5, "Spettro": 2 }, "Drago": { "Drago": 2, "Acciaio": 0.5 }, "Buio": { "Lotta": 0.5, "Psico": 2, "Spettro": 2, "Buio": 0.5, "Acciaio": 0.5 }, "Acciaio": { "Fuoco": 0.5, "Acqua": 0.5, "Elettro": 0.5, "Ghiaccio": 2, "Roccia": 2, "Acciaio": 0.5 } };
var BATTLE_TYPES = Object.keys(TYPE_CHART);
function typeEffectiveness(attackType, defendingTypes) {
  return [...new Set(defendingTypes || [])].reduce((m, t) => m * (TYPE_CHART[attackType]?.[t] ?? 1), 1);
}
__name(typeEffectiveness, "typeEffectiveness");
function arenaCpuSettings(level) {
  return { easy: { damage: 0.4, speed: 0.75, interval: 3.4, windup: 0.55, grace: 4 }, medium: { damage: 0.6, speed: 1, interval: 2.5, windup: 0.35, grace: 3 }, hard: { damage: 0.85, speed: 1.1, interval: 1.6, windup: 0.15, grace: 2.5 } }[level] || { damage: 0.6, speed: 1, interval: 2.5, windup: 0.35, grace: 3 };
}
__name(arenaCpuSettings, "arenaCpuSettings");
function cpuMoveSlot(mon2, target, options, difficulty, distance, seed) {
  if (!options.length) return -1;
  if (difficulty !== "hard") return options[Math.floor(seed) % options.length];
  return [...options].sort((a, b) => {
    let score = /* @__PURE__ */ __name((i) => {
      let m = mon2.moves[i];
      if (m.mode === "heal" && mon2.hp < mon2.max * 0.35) return 1e3;
      let e = typeEffectiveness(m.t, target.types);
      return (m.power || 0) * e / (m.c || 1) * (m.contact && distance > 200 ? 0.4 : 1) + (m.status && e ? 20 : 0);
    }, "score");
    return score(b) - score(a);
  })[0];
}
__name(cpuMoveSlot, "cpuMoveSlot");
function arenaChoreoStart(st, side, move) {
  let kind = { 19: "fly", 143: "fly", 340: "fly", 91: "burrow", 291: "dive", 205: "roll", 172: "roll" }[move.key];
  if (!kind) return false;
  let p = st.pos[side], t = st.pos[1 - side], safe = arenaSafe(st, side, t.x, t.y);
  p.action = { kind: "choreo", choreo: kind, phase: "charge", elapsed: 0, born: st.time, move, from: { x: p.x, y: p.y }, target: { x: safe.x, y: safe.y }, hit: false };
  return true;
}
__name(arenaChoreoStart, "arenaChoreoStart");
function arenaChoreoPose(a, elapsed = a.elapsed) {
  let t = elapsed, kind = a.choreo;
  if (kind === "roll") return { duration: 1.3, phase: t < 0.25 ? "charge" : t < 1 ? "dash" : "recover", f: bound((t - 0.25) / 0.75, 0, 1), lift: 0, rotation: Math.max(0, t - 0.25) * 14 };
  if (kind === "fly") return { duration: 1.9, phase: t < 0.45 ? "charge" : t < 1.25 ? "air" : t < 1.65 ? "strike" : "recover", f: bound((t - 0.45) / 0.8, 0, 1), lift: t < 0.45 ? t / 0.45 * 95 : t < 1.25 ? 95 : t < 1.65 ? (1 - (t - 1.25) / 0.4) * 95 : 0, rotation: 0 };
  return { duration: 1.65, phase: t < 0.35 ? "charge" : t < 1.05 ? "hidden" : t < 1.4 ? "strike" : "recover", f: bound((t - 0.35) / 0.7, 0, 1), lift: t >= 1.05 && t < 1.4 ? Math.sin((t - 1.05) / 0.35 * Math.PI) * 25 : 0, rotation: 0 };
}
__name(arenaChoreoPose, "arenaChoreoPose");
function arenaChoreoAvoids(pos, move) {
  let a = pos?.action;
  if (a?.kind !== "choreo" || move.dot) return false;
  if (a.phase === "hidden") return !([89, 90, 222].includes(move.key) && a.choreo === "burrow");
  return a.choreo === "fly" && (pos.liftHeight || 0) > 35;
}
__name(arenaChoreoAvoids, "arenaChoreoAvoids");
function arenaChoreoTick(st, dt, hit2) {
  for (let side of [0, 1]) {
    let p = st.pos[side], a = p.action;
    if (a?.kind !== "choreo" || p.held || arenaAsleep(st.teams[side][st.active[side]], st.time)) continue;
    a.elapsed += dt;
    let pose = arenaChoreoPose(a), t = st.pos[1 - side];
    a.phase = pose.phase;
    p.liftHeight = pose.lift;
    let x = a.from.x + (a.target.x - a.from.x) * pose.f, y = a.from.y + (a.target.y - a.from.y) * pose.f, old = { x: p.x, y: p.y };
    if (a.choreo === "roll") {
      arenaMove(st, side, x, y);
      let dx = p.x - old.x, dy = p.y - old.y, q = bound(((t.x - old.x) * dx + (t.y - old.y) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      if (pose.phase === "dash" && !a.hit && Math.hypot(t.x - old.x - q * dx, t.y - old.y - q * dy) < 48) {
        a.hit = true;
        hit2(side, a.move);
      }
    } else {
      p.x = bound(x, WORLD.left, WORLD.right);
      p.y = bound(y, WORLD.top, WORLD.bottom);
      if (a.choreo === "fly" ? a.elapsed >= 1.58 : a.elapsed >= 1.1) {
        if (!a.hit) {
          a.hit = true;
          st.events = st.events || [];
          st.events.push({ kind: "choreoimpact", side, x: p.x, y: p.y, key: a.move.key });
          arenaImpact(st, p.x, p.y, a.move);
          if (Math.hypot(t.x - p.x, t.y - p.y) < 70) hit2(side, a.move);
        }
      }
    }
    if (p.action !== a) continue;
    if (a.elapsed >= pose.duration) {
      let safe = arenaSafe(st, side, p.x, p.y);
      p.x = safe.x;
      p.y = safe.y;
      p.liftHeight = 0;
      p.action = null;
    }
  }
}
__name(arenaChoreoTick, "arenaChoreoTick");

// ../PokeBattle_2D_v28/lib/raid.ts
var clamp = /* @__PURE__ */ __name((n, a, b) => Math.max(a, Math.min(b, n)), "clamp");
var point = /* @__PURE__ */ __name((i) => ({ x: 180 + i % 2 * 130, y: 190 + Math.floor(i / 2) * 190, dir: 6, moving: false, cast: 0 }), "point");
var living = /* @__PURE__ */ __name((seat2) => seat2.team[seat2.active]?.hp > 0, "living");
var active = /* @__PURE__ */ __name((seat2) => seat2.team[seat2.active], "active");
function botTeam(source, seed) {
  return source.map((m, i) => snapshot({ uid: "event-companion-" + seed + "-" + i, num: basePool[(seed * 17 + i * 11) % basePool.length], level: m.level, tms: [] }));
}
__name(botTeam, "botTeam");
function seat(u, s, now) {
  return { id: u.id, name: s.name, avatar: s.avatar, team: s.party.map((id) => s.monsters.find((m) => m.uid === id)).filter(Boolean).map(snapshot), active: 0, pos: point(0), input: { x: 0, y: 0 }, seen: now, nextAttack: 0, swapAt: 0, charge: false, energy: 0 };
}
__name(seat, "seat");
function start(st, now) {
  if (st.seats.length === 4 || now - st.queuedAt >= 8e3) {
    while (st.seats.length < 4) {
      const i = st.seats.length;
      st.seats.push({ id: "CPU-" + i, bot: true, name: ["Luca", "Maya", "Alex", "Sofia"][i], avatar: { photo: null }, team: botTeam(st.seats[0].team, i + 1), active: 0, pos: point(i), input: { x: 0, y: 0 }, seen: now, nextAttack: 0, swapAt: 0, energy: 0 });
    }
    st.seats.forEach((s, i) => s.pos = point(i));
    st.phase = "active";
    st.startsAt = now + 3200;
    st.last = now;
  }
}
__name(start, "start");
function hit(st, from, to, m, scale = 1) {
  const a = active(from), b = active(to);
  if (!a || !b || a.hp <= 0 || b.hp <= 0) return;
  const mult = typeEffectiveness(m.t, b.types);
  if (mult === 0) return;
  if (m.status) {
    b.status = { kind: m.status, until: st.time + 3 };
    return;
  }
  const ratio = m.category === 2 ? a.stat[1] / b.stat[2] : a.stat[3] / b.stat[4];
  const damage = Math.max(1, Math.round((a.level * 0.35 + 8 + (m.power || 30) * 0.18) * Math.sqrt(ratio) * mult * terrainBonus(m.t, st.stadium) * heldDamage(a, m) * scale));
  const d = Math.min(b.hp, heldSurvive(b, damage));
  b.hp -= d;
  a.damageDealt += d;
  st.effects.push({ id: ++st.seq, kind: "hit", x: to.pos.x, y: to.pos.y, d, t: m.t, at: st.time });
  if (b.hp <= 0) {
    to.koAt = st.time + 1;
    to.pos.cast = 0;
    st.effects.push({ id: ++st.seq, kind: "ko", x: to.pos.x, y: to.pos.y, at: st.time });
  }
}
__name(hit, "hit");
function cast(st, from, to, index, channel2 = false) {
  const m = active(from)?.moves[index];
  if (!living(from) || !living(to) || !m || m.locked || !channel2 && active(from).cd[index] > 0 || active(from).status?.kind === "sleep" && active(from).status.until > st.time) return;
  if (!channel2) active(from).cd[index] = Math.max(0.6, m.c || 3);
  active(from).used = true;
  from.pos.cast = 0.55;
  from.pos.castMove = m;
  const scale = from.energy >= 2 ? 1.5 : 1;
  from.energy = 0;
  st.effects.push({ id: ++st.seq, kind: "cast", x: from.pos.x, y: from.pos.y, tx: to.pos.x, ty: to.pos.y, t: m.t, mode: m.mode, name: m.n, m, at: st.time });
  if (m.mode === "heal" && m.category === 1) {
    const a2 = active(from);
    a2.hp = Math.min(a2.max, a2.hp + a2.max * 0.2);
    return;
  }
  if (m.contact) {
    from.pos.x = clamp(to.pos.x - 45, 65, 895);
    from.pos.y = clamp(to.pos.y + 20, 90, 530);
    hit(st, from, to, m, scale);
    return;
  }
  const dx = to.pos.x - from.pos.x, dy = to.pos.y - from.pos.y, a = Math.atan2(dy, dx), speed = m.s || 350;
  st.shots.push({ ox: from.pos.x, oy: from.pos.y, x: from.pos.x, y: from.pos.y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, from: from.id, to: to.id, m, life: 3, scale });
}
__name(cast, "cast");
function advanceRaid(st, elapsed) {
  if (st.phase !== "active") return;
  const actors = [...st.seats, st.boss];
  for (let remaining = clamp(elapsed, 0, 0.6); remaining > 1e-5; ) {
    const dt = Math.min(0.04, remaining);
    remaining -= dt;
    st.time += dt;
    for (const a of actors) {
      const m = active(a);
      if (!m) continue;
      if (m.hp <= 0) {
        if (a.koAt && st.time >= a.koAt) {
          const next = a.team.findIndex((p) => p.hp > 0);
          if (next >= 0) {
            a.active = next;
            a.koAt = null;
            active(a).used = true;
            st.effects.push({ id: ++st.seq, kind: "send", name: active(a).name, x: a.pos.x, y: a.pos.y, at: st.time });
          }
        }
        continue;
      }
      m.cd = m.cd.map((n) => Math.max(0, n - dt));
      a.pos.cast = Math.max(0, a.pos.cast - dt);
      if (m.status?.until <= st.time) m.status = null;
      if (["burn", "poison"].includes(m.status?.kind)) {
        m.dot = (m.dot || 0) + dt;
        if (m.dot >= 1) {
          m.dot -= 1;
          m.hp = Math.max(0, m.hp - Math.max(1, Math.floor(m.max * 0.025)));
          if (!m.hp) a.koAt = st.time + 1;
        }
      }
      if (m.status?.kind === "sleep") {
        a.pos.moving = false;
        continue;
      }
      a.energy = a.charge ? Math.min(2, (a.energy || 0) + dt) : a.energy >= 2 ? 2 : 0;
      m.charged = a.energy >= 2;
      if (a.hold) {
        if (st.time >= a.hold.until || !living(st.boss)) a.hold = null;
        else if (st.time >= a.hold.next) {
          cast(st, a, st.boss, a.hold.i, true);
          a.hold.next = st.time + 0.5;
        }
      }
      let input = a.input;
      if (a.bot) {
        const target = a === st.boss ? st.seats.find(living) : st.boss;
        if (target) {
          const dx = target.pos.x - a.pos.x, dy = target.pos.y - a.pos.y, l = Math.hypot(dx, dy);
          input = l > 260 ? { x: dx / l, y: dy / l } : { x: 0, y: 0 };
          if (st.time >= a.nextAttack) {
            const slots = m.moves.map((v, i) => ({ v, i })).filter(({ v, i }) => !v.locked && m.cd[i] <= 0);
            if (slots.length) cast(st, a, target, slots[Math.floor(st.time * 7) % slots.length].i);
            a.nextAttack = st.time + (a === st.boss ? 1.5 : 2.2);
          }
        }
      }
      const len = Math.max(1, Math.hypot(input.x, input.y)), speed = (90 + Math.min(70, m.stat[5] * 0.35)) * (m.status?.kind === "paralysis" ? 0.5 : 1);
      a.pos.x = clamp(a.pos.x + input.x / len * speed * dt, 65, 895);
      a.pos.y = clamp(a.pos.y + input.y / len * speed * dt, 90, 530);
      a.pos.moving = !!(input.x || input.y);
      if (a.pos.moving) a.pos.dir = (Math.round(Math.atan2(input.y, input.x) / (Math.PI / 4)) + 2 + 8) % 8;
    }
    for (const sh of st.shots) {
      const from = actors.find((a) => a.id === sh.from), to = actors.find((a) => a.id === sh.to);
      const ox = sh.x, oy = sh.y;
      sh.x += sh.vx * dt;
      sh.y += sh.vy * dt;
      sh.life -= dt;
      if (to && living(to)) {
        const dx = sh.x - ox, dy = sh.y - oy, t = clamp(((to.pos.x - ox) * dx + (to.pos.y - oy) * dy) / (dx * dx + dy * dy || 1), 0, 1);
        if (Math.hypot(ox + t * dx - to.pos.x, oy + t * dy - to.pos.y) < 32 + (sh.m.r || 10)) {
          hit(st, from, to, sh.m, sh.scale);
          sh.life = 0;
        }
      }
    }
    st.shots = st.shots.filter((s) => s.life > 0 && s.x > 0 && s.x < 960 && s.y > 0 && s.y < 600);
    if (st.boss.team.every((m) => m.hp <= 0) && (!st.boss.koAt || st.time >= st.boss.koAt)) {
      st.phase = "finished";
      st.won = true;
      break;
    }
    if (st.seats.every((a) => a.team.every((m) => m.hp <= 0)) || st.time > 900) {
      st.phase = "finished";
      st.won = false;
      break;
    }
  }
  st.effects = st.effects.filter((e) => st.time - e.at < 1.5).slice(-60);
}
__name(advanceRaid, "advanceRaid");
async function raidRoute(c, h) {
  const { path, body, db, u, fail: fail2, json: json2, mutate: mutate2 } = c, now = Date.now();
  const respond = /* @__PURE__ */ __name((r, st) => {
    const side = st.seats.findIndex((s) => s.id === u.id);
    if (side < 0) fail2("Non fai parte di questa stanza.", 403);
    return json2({ id: r.id, side, state: st, serverTime: now });
  }, "respond");
  if (["event-create", "event-match", "event-join"].includes(path)) {
    const state = JSON.parse(u.state);
    settle(state);
    if (!state.party.length) fail2("Metti almeno un Pok\xE9mon in squadra.");
    let r;
    if (path === "event-join") {
      r = await db.prepare("SELECT * FROM club_event_rooms WHERE id=?").bind(String(body.code || "").trim().toUpperCase()).first();
      if (!r) fail2("Stanza non trovata.");
    } else {
      const event = await db.prepare("SELECT * FROM club_live_content WHERE id=? AND kind='event' AND starts<=? AND ends>?").bind(String(body.eventId || ""), now, now).first();
      if (!event) fail2("Evento non attivo.");
      const rows = await db.prepare("SELECT * FROM club_event_rooms WHERE event_id=? AND updated>? ORDER BY updated").bind(event.id, now - 45e3).all();
      r = rows.results.find((r2) => {
        const st = JSON.parse(r2.state);
        return ["waiting", "active"].includes(st.phase) && st.seats.some((s) => s.id === u.id);
      });
      if (!r && path === "event-match") r = rows.results.find((r2) => {
        const st = JSON.parse(r2.state);
        return !st.private && st.phase === "waiting" && st.seats.length < 4 && now - st.queuedAt < 8e3;
      });
      if (!r) {
        const config2 = JSON.parse(event.data), first = seat(u, state, now);
        const st = { mode: "event", phase: "waiting", title: config2.title, eventId: event.id, eventEnds: event.ends, reward: config2.reward, stadium: config2.stadium, private: path === "event-create", queuedAt: now, last: now, time: 0, seq: 0, seats: [first], boss: { id: "event-boss", name: config2.title, bot: true, team: config2.team.map((m, i) => snapshot({ ...m, uid: "boss-" + i, tms: [] })), active: 0, pos: { x: 760, y: 300, dir: 2, cast: 0 }, input: { x: 0, y: 0 }, nextAttack: 1, energy: 0 }, shots: [], effects: [] };
        first.team[0].used = true;
        const id = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
        if (path === "event-match") {
          const inserted = await db.prepare("INSERT INTO club_event_rooms(id,event_id,state,updated) SELECT ?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM club_event_rooms WHERE event_id=? AND updated>? AND json_extract(state,'$.private')=0 AND json_extract(state,'$.phase')='waiting' AND json_array_length(state,'$.seats')<4 AND json_extract(state,'$.queuedAt')>?)").bind(id, event.id, JSON.stringify(st), now, event.id, now - 45e3, now - 8e3).run();
          if (!inserted.meta.changes) return raidRoute(c, h);
        } else await db.prepare("INSERT INTO club_event_rooms(id,event_id,state,updated) VALUES(?,?,?,?)").bind(id, event.id, JSON.stringify(st), now).run();
        return respond({ id }, st);
      }
    }
    for (let retry = 0; retry < 5; retry++) {
      const st = JSON.parse(r.state);
      if (st.seats.some((s) => s.id === u.id)) return respond(r, st);
      if (st.phase !== "waiting" || st.seats.length >= 4 || now - st.queuedAt >= 8e3 || now >= st.eventEnds) fail2("La stanza \xE8 gi\xE0 iniziata o l\u2019evento \xE8 terminato.");
      const next = seat(u, state, now);
      next.pos = point(st.seats.length);
      next.team[0].used = true;
      st.seats.push(next);
      start(st, now);
      const result = await db.prepare("UPDATE club_event_rooms SET state=?,updated=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(st), now, r.id, r.version).run();
      if (result.meta.changes) return respond(r, st);
      r = await db.prepare("SELECT * FROM club_event_rooms WHERE id=?").bind(r.id).first();
    }
    fail2("La stanza \xE8 cambiata. Riprova.", 409);
  }
  if (path === "event-tick") {
    for (let retry = 0; retry < 5; retry++) {
      const r = await db.prepare("SELECT * FROM club_event_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
      if (!r) fail2("Stanza non trovata.");
      const st = JSON.parse(r.state), side = st.seats.findIndex((s) => s.id === u.id);
      if (side < 0) fail2("Non fai parte della stanza.", 403);
      const own = st.seats[side];
      own.seen = now;
      own.bot = false;
      if (st.phase === "waiting") {
        if (now >= st.eventEnds) {
          st.phase = "cancelled";
        } else start(st, now);
      }
      if (st.phase === "active" && now >= st.startsAt) {
        advanceRaid(st, Math.max(0, (now - Math.max(st.last, st.startsAt)) / 1e3));
        st.last = now;
        for (const s of st.seats) if (now - s.seen > 15e3) s.bot = true;
        if (living(own)) {
          if (body.x !== void 0 || body.y !== void 0) {
            if (!Number.isFinite(body.x) || !Number.isFinite(body.y)) fail2("Movimento non valido.");
            own.input = { x: clamp(body.x, -1, 1), y: clamp(body.y, -1, 1) };
          }
          if (typeof body.charge === "boolean") own.charge = body.charge;
          const slot = Number.isInteger(body.move) ? body.move : body.holdStart?.i ?? body.holdStart;
          if (Number.isInteger(slot) && slot >= 0 && slot < 4) {
            const m = active(own).moves[slot], ready = m && !m.locked && active(own).cd[slot] <= 0;
            cast(st, own, st.boss, slot);
            if (ready && body.holdStart && ["flame", "beam", "wave", "bolt"].includes(m.mode)) own.hold = { i: slot, token: String(body.holdStart.token || "").slice(0, 80), until: st.time + 3, next: st.time + 0.5 };
          }
          if (own.hold && [body.holdEnd, body.holdCancel].includes(own.hold.token)) own.hold = null;
          if (Number.isInteger(body.swap) && body.swap !== own.active && body.swap >= 0 && own.team[body.swap]?.hp > 0 && st.time >= own.swapAt) {
            own.active = body.swap;
            own.team[body.swap].used = true;
            own.swapAt = st.time + 20;
            own.energy = 0;
            own.hold = null;
            own.pos.cast = 0;
          }
        }
      }
      const result = await db.prepare("UPDATE club_event_rooms SET state=?,updated=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(st), now, r.id, r.version).run();
      if (result.meta.changes) return respond(r, st);
    }
    fail2("Aggiornamento in corso.", 409);
  }
  if (path === "event-reward") {
    const r = await db.prepare("SELECT * FROM club_event_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
    if (!r) fail2("Stanza non trovata.");
    const st = JSON.parse(r.state), own = st.seats.find((s) => s.id === u.id);
    if (!own) fail2("Non fai parte della stanza.", 403);
    if (st.phase !== "finished") fail2("Sconfiggi prima tutta la squadra avversaria.");
    const seasons = await h.activeSeasons(db);
    return json2(await mutate2(db, u.id, (s) => {
      s.rewards = s.rewards || [];
      const key = "event:" + r.id;
      if (s.rewards.includes(key)) return { already: true };
      s.rewards.push(key);
      const awards = h.xpAwards(s, own.team, st.time);
      markPokedexSeen(s, st.boss.team.filter((m) => m.used || m.hp < m.max).map((m) => m.num));
      s.battles++;
      let reward = null;
      if (st.won) {
        s.wins++;
        s.coins += 10;
        s.eventWins = s.eventWins || [];
        if (!s.eventWins.includes(st.eventId)) {
          h.grantReward(s, st.reward);
          s.eventWins.push(st.eventId);
          reward = st.reward;
        }
      }
      h.addPassXP(s, seasons, st.won);
      return { coins: st.won ? 10 : 0, xpAwards: awards, reward, won: st.won };
    }));
  }
  fail2("Operazione evento non disponibile.", 404);
}
__name(raidRoute, "raidRoute");

// ../PokeBattle_2D_v28/lib/live-operations.ts
function isAdmin(u, env2) {
  return !!u?.email_verified && String(env2.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean).includes(u.email.toLowerCase());
}
__name(isAdmin, "isAdmin");
async function activeSeasons(db) {
  const rows = await db.prepare("SELECT * FROM club_live_content WHERE kind='pass' AND starts<=? AND ends>?").bind(Date.now(), Date.now()).all();
  return rows.results.map((r) => ({ ...JSON.parse(r.data), id: r.id, starts: r.starts, ends: r.ends }));
}
__name(activeSeasons, "activeSeasons");
async function liveRoute(c) {
  const { path, body, db, u, env: env2, fail: fail2, json: json2, mutate: mutate2 } = c;
  const admin = isAdmin(u, env2);
  if (path === "live-access") return json2({ admin });
  if (path === "live-catalog") {
    const rows = await db.prepare("SELECT * FROM club_live_content WHERE ends>? ORDER BY starts").bind(Date.now()).all();
    return json2({ events: rows.results.filter((r) => r.kind === "event").map(view), seasons: rows.results.filter((r) => r.kind === "pass").map(view), serverTime: Date.now() });
  }
  if (path === "pass-unlock" || path === "pass-claim") {
    const row = await db.prepare("SELECT * FROM club_live_content WHERE id=? AND kind='pass'").bind(String(body.id || "")).first();
    if (!row || Date.now() < row.starts || Date.now() >= row.ends) fail2("Stagione non attiva.");
    const season = view(row);
    return json2(await mutate2(db, u.id, (s) => {
      s.passes = s.passes || {};
      const p = s.passes[row.id] || { xp: 0, unlocked: false, claimed: [] };
      s.passes[row.id] = p;
      if (path === "pass-unlock") {
        if (p.unlocked) return { already: true };
        if (s.coins < season.cost) fail2("Monete insufficienti.");
        s.coins -= season.cost;
        p.unlocked = true;
        return { unlocked: true };
      }
      const level = body.level;
      if (!Number.isInteger(level) || level < 1 || level > 100 || Math.floor(p.xp / 100) < level) fail2("Livello non ancora raggiunto.");
      if (season.cost > 0 && !p.unlocked) fail2("Sblocca prima il Battle Pass.");
      if (p.claimed.includes(level)) return { already: true };
      const reward = season.rewards[level - 1];
      if (!reward) fail2("Questo livello non contiene premi.");
      grantReward(s, reward);
      p.claimed.push(level);
      return { reward };
    }));
  }
  if (path.startsWith("event-")) return raidRoute(c, { xpAwards, addPassXP, activeSeasons, grantReward });
  if (!path.startsWith("admin-")) return null;
  if (!admin) fail2("Accesso riservato agli amministratori.", 403);
  await c.rate(db, "admin:" + u.id, 120);
  const audit = /* @__PURE__ */ __name(async (action, target, details) => db.prepare("INSERT INTO club_admin_audit(id,actor,action,target,details,created) VALUES(?,?,?,?,?,?)").bind(crypto.randomUUID(), u.id, action, target, JSON.stringify(details), Date.now()).run(), "audit");
  if (path === "admin-content") {
    const rows = await db.prepare("SELECT * FROM club_live_content ORDER BY starts DESC").all();
    return json2({ content: rows.results.map(view) });
  }
  if (path === "admin-save") {
    const kind = body.kind;
    if (!["event", "pass"].includes(kind)) fail2("Tipo di contenuto non valido.");
    const title2 = String(body.title || "").trim();
    if (title2.length < 3 || title2.length > 80) fail2("Il titolo deve avere da 3 a 80 caratteri.");
    const starts = Number(body.starts), ends = Number(body.ends);
    if (!Number.isSafeInteger(starts) || !Number.isSafeInteger(ends) || starts >= ends || ends < Date.now()) fail2("Intervallo di date non valido.");
    let cover = String(body.cover || ""), coverType = body.coverType === "video" ? "video" : "image";
    if (cover) {
      try {
        const url = new URL(cover);
        if (url.protocol !== "https:" || url.username || url.password || cover.length > 2e3) throw 0;
      } catch {
        fail2("La copertina deve essere un URL HTTPS di immagine o video.");
      }
    }
    let data = { title: title2, cover, coverType };
    if (kind === "event") {
      if (!Array.isArray(body.team) || !body.team.length || body.team.length > 6 || body.team.some((m) => !byNum(m.num) || !Number.isInteger(m.level) || m.level < 1 || m.level > 100)) fail2("Scegli da 1 a 6 Pok\xE9mon e livelli da 1 a 100.");
      if (!Object.hasOwn(stadiumTypes, body.stadium)) fail2("Campo non valido.");
      let reward;
      try {
        reward = validReward(body.reward);
      } catch (e) {
        fail2(e.message);
      }
      if (reward?.kind !== "pokemon") fail2("Scegli il Pok\xE9mon premio e il suo livello.");
      data = { ...data, team: body.team.map((m) => ({ num: m.num, level: m.level })), reward, stadium: body.stadium };
    } else {
      if (!Number.isInteger(body.cost) || body.cost < 0 || body.cost > 1e5) fail2("Costo non valido.");
      if (!Array.isArray(body.rewards) || body.rewards.length !== 100) fail2("Il Battle Pass deve contenere esattamente 100 livelli.");
      try {
        data = { ...data, cost: body.cost, rewards: body.rewards.map(validReward) };
      } catch (e) {
        fail2(e.message);
      }
    }
    let id = body.id || crypto.randomUUID();
    if (typeof id !== "string" || id.length > 80) fail2("Identificativo non valido.");
    if (body.id) {
      const old = await db.prepare("SELECT * FROM club_live_content WHERE id=?").bind(id).first();
      if (!old || old.kind !== kind) fail2("Contenuto non trovato.");
      if (Date.now() >= old.starts) fail2("Un contenuto gi\xE0 iniziato non pu\xF2 essere modificato: crea una nuova stagione o un nuovo evento.");
    }
    await db.prepare("INSERT INTO club_live_content(id,kind,data,starts,ends,updated) VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,starts=excluded.starts,ends=excluded.ends,updated=excluded.updated,version=version+1").bind(id, kind, JSON.stringify(data), starts, ends, Date.now()).run();
    await audit("save-" + kind, id, { title: title2, starts, ends });
    return json2({ ok: true, id });
  }
  if (path === "admin-users") {
    const q = String(body.query || "").trim().slice(0, 100);
    if (q.length < 2) fail2("Inserisci almeno due caratteri.");
    const escaped = q.replace(/[\\%_]/g, "\\$&");
    const rows = await db.prepare("SELECT u.id,u.email,u.state,u.created,b.reason FROM club_users u LEFT JOIN club_bans b ON b.user_id=u.id WHERE u.id=? OR u.email LIKE ? ESCAPE '\\' OR json_extract(u.state,'$.name') LIKE ? ESCAPE '\\' ORDER BY u.created DESC LIMIT 30").bind(q, "%" + escaped + "%", "%" + escaped + "%").all();
    return json2({ users: rows.results.map((r) => ({ id: r.id, email: r.email, name: JSON.parse(r.state).name, coins: JSON.parse(r.state).coins, created: r.created, banned: !!r.reason, reason: r.reason })) });
  }
  if (path === "admin-coins") {
    if (!Number.isInteger(body.amount) || body.amount < 1 || body.amount > 1e5) fail2("Inserisci da 1 a 100.000 monete.");
    if (!await db.prepare("SELECT id FROM club_users WHERE id=?").bind(String(body.userId)).first()) fail2("Allenatore non trovato.");
    if (typeof body.operationId !== "string" || !/^[-\w]{16,80}$/.test(body.operationId)) fail2("Identificativo operazione non valido.");
    const receipt = "admin:" + u.id + ":" + body.operationId;
    const updated = await mutate2(db, body.userId, (s) => {
      s.adminCredits = s.adminCredits || [];
      if (s.adminCredits.includes(receipt)) return { already: true };
      s.adminCredits.push(receipt);
      s.coins += body.amount;
      return { credited: body.amount };
    });
    await audit("coins", body.userId, { amount: body.amount, operationId: body.operationId, already: !!updated.result.already });
    return json2({ ok: true, coins: updated.coins });
  }
  if (path === "admin-ban") {
    if (body.userId === u.id) fail2("Non puoi bannare il tuo account.");
    const target = await db.prepare("SELECT * FROM club_users WHERE id=?").bind(String(body.userId)).first();
    if (!target) fail2("Allenatore non trovato.");
    if (isAdmin(target, env2)) fail2("Gestisci gli altri amministratori dalla configurazione del server.");
    if (typeof body.banned !== "boolean") fail2("Stato non valido.");
    const reason = String(body.reason || "Violazione delle regole").trim().slice(0, 200) || "Violazione delle regole";
    if (body.banned) await db.batch([db.prepare("INSERT INTO club_bans(user_id,reason,created) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET reason=excluded.reason,created=excluded.created").bind(target.id, reason, Date.now()), db.prepare("DELETE FROM club_sessions WHERE user_id=?").bind(target.id)]);
    else await db.prepare("DELETE FROM club_bans WHERE user_id=?").bind(target.id).run();
    await audit(body.banned ? "ban" : "unban", target.id, { reason });
    return json2({ ok: true });
  }
  fail2("Operazione admin non disponibile.", 404);
}
__name(liveRoute, "liveRoute");
function view(r) {
  return { ...JSON.parse(r.data), id: r.id, kind: r.kind, starts: r.starts, ends: r.ends, version: r.version };
}
__name(view, "view");

// ../PokeBattle_2D_v28/lib/story.json
var story_default = [{ id: "brock", name: "Brock", city: "Plumbeopoli", type: "Roccia", badge: "Medaglia Sasso", stadium: "ruins", team: [[74, 12], [95, 14]] }, { id: "misty", name: "Misty", city: "Celestopoli", type: "Acqua", badge: "Medaglia Cascata", stadium: "coast", team: [[120, 18], [121, 21]] }, { id: "ltsurge", name: "Lt. Surge", city: "Aranciopoli", type: "Elettro", badge: "Medaglia Tuono", stadium: "powerplant", team: [[100, 21], [25, 18], [26, 24]] }, { id: "erika", name: "Erika", city: "Azzurropoli", type: "Erba", badge: "Medaglia Arcobaleno", stadium: "forest", team: [[71, 29], [114, 24], [45, 29]] }, { id: "koga", name: "Koga", city: "Fucsiapoli", type: "Veleno", badge: "Medaglia Anima", stadium: "forest", team: [[109, 37], [89, 39], [109, 37], [110, 43]] }, { id: "sabrina", name: "Sabrina", city: "Zafferanopoli", type: "Psico", badge: "Medaglia Palude", stadium: "classic", team: [[64, 38], [122, 37], [49, 38], [65, 43]] }, { id: "blaine", name: "Blaine", city: "Isola Cannella", type: "Fuoco", badge: "Medaglia Vulcano", stadium: "volcano", team: [[58, 42], [77, 40], [78, 42], [59, 47]] }, { id: "giovanni", name: "Giovanni", city: "Smeraldopoli", type: "Terra", badge: "Medaglia Terra", stadium: "ruins", team: [[111, 45], [51, 42], [31, 44], [34, 45], [111, 50]] }, { id: "lorelei", name: "Lorelei", city: "Altopiano Blu", type: "Ghiaccio", badge: null, stadium: "ice", team: [[87, 52], [91, 51], [80, 52], [124, 54], [131, 54]] }, { id: "bruno", name: "Bruno", city: "Altopiano Blu", type: "Lotta", badge: null, stadium: "ruins", team: [[95, 51], [107, 53], [106, 53], [95, 54], [68, 56]] }, { id: "agatha", name: "Agatha", city: "Altopiano Blu", type: "Spettro", badge: null, stadium: "classic", team: [[94, 54], [42, 54], [93, 53], [24, 56], [94, 58]] }, { id: "lance", name: "Lance", city: "Altopiano Blu", type: "Drago", badge: null, stadium: "classic", team: [[130, 56], [148, 54], [148, 54], [142, 58], [149, 60]] }, { id: "red", name: "Red", city: "Sfida finale", type: "Misto", badge: null, stadium: "ice", team: [[25, 88], [131, 80], [143, 82], [3, 84], [6, 84], [9, 84]] }];

// ../PokeBattle_2D_v28/lib/server.ts
var enc = new TextEncoder();
var hex = /* @__PURE__ */ __name((b) => Array.from(new Uint8Array(b), (x) => x.toString(16).padStart(2, "0")).join(""), "hex");
var digest = /* @__PURE__ */ __name(async (s) => hex(await crypto.subtle.digest("SHA-256", enc.encode(s))), "digest");
async function hash(password, salt) {
  let key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 1e5, hash: "SHA-256" }, key, 256));
}
__name(hash, "hash");
function equal(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
__name(equal, "equal");
function fail(message, status = 400, code) {
  throw Object.assign(new Error(message), { status, code });
}
__name(fail, "fail");
var json = /* @__PURE__ */ __name((v, status = 200, headers = {}) => Response.json(v, { status, headers: { "Cache-Control": "no-store", ...headers } }), "json");
function cookie(token, secure, age = 2592e3) {
  return `club_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${age}${secure ? "; Secure" : ""}`;
}
__name(cookie, "cookie");
function authCode() {
  let a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return String(1e5 + a[0] % 9e5);
}
__name(authCode, "authCode");
function runtimeEnv(env2) {
  return env2?.env && typeof env2.env === "object" ? env2.env : env2;
}
__name(runtimeEnv, "runtimeEnv");
async function sendAuthEmail(env2, to, code, purpose) {
  let runtime = runtimeEnv(env2), key = typeof runtime?.BREVO_API_KEY === "string" ? runtime.BREVO_API_KEY.trim() : "", from = typeof runtime?.AUTH_FROM_EMAIL === "string" ? runtime.AUTH_FROM_EMAIL.trim() : "";
  if (!key || !from) fail("Il servizio email non \xE8 ancora configurato. Riprova pi\xF9 tardi.", 503, "email_service_unavailable");
  let subject = purpose === "verify" ? "Verifica il tuo account Pok\xE9Battle 2D" : "Recupero password Pok\xE9Battle 2D", intro = purpose === "verify" ? "Usa questo codice per verificare il tuo account:" : "Usa questo codice per impostare una nuova password:";
  let response = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { "api-key": key, "Content-Type": "application/json" }, body: JSON.stringify({ sender: { email: from, name: "Pok\xE9Battle 2D" }, to: [{ email: to }], subject, htmlContent: `<div style="font-family:Arial,sans-serif;color:#26354d"><h1>Pok\xE9Battle 2D</h1><p>${intro}</p><p style="font-size:32px;font-weight:800;letter-spacing:8px">${code}</p><p>Il codice scade tra 15 minuti. Se non hai richiesto questa operazione, ignora questa email.</p></div>` }) });
  if (!response.ok) fail("Non riesco a inviare l\u2019email. Riprova pi\xF9 tardi.", 502, "email_delivery_failed");
}
__name(sendAuthEmail, "sendAuthEmail");
async function issueAuthCode(db, env2, u, purpose) {
  let code = authCode(), id = crypto.randomUUID();
  await db.prepare("DELETE FROM club_auth_codes WHERE user_id=? AND purpose=?").bind(u.id, purpose).run();
  await db.prepare("INSERT INTO club_auth_codes(id,user_id,purpose,code_hash,expires,created) VALUES(?,?,?,?,?,?)").bind(id, u.id, purpose, await digest(`${purpose}:${u.id}:${code}:${env2.AUTH_CODE_PEPPER || ""}`), Date.now() + 9e5, Date.now()).run();
  await sendAuthEmail(env2, u.email, code, purpose);
}
__name(issueAuthCode, "issueAuthCode");
async function consumeAuthCode(db, env2, u, purpose, code) {
  let row = await db.prepare("SELECT * FROM club_auth_codes WHERE user_id=? AND purpose=?").bind(u.id, purpose).first();
  if (!row || row.expires < Date.now() || row.attempts >= 5) fail("Codice scaduto o non valido.", 400, "invalid_auth_code");
  await db.prepare("UPDATE club_auth_codes SET attempts=attempts+1 WHERE id=?").bind(row.id).run();
  if (!equal(row.code_hash, await digest(`${purpose}:${u.id}:${code}:${env2.AUTH_CODE_PEPPER || ""}`))) fail("Codice scaduto o non valido.", 400, "invalid_auth_code");
  await db.prepare("DELETE FROM club_auth_codes WHERE id=?").bind(row.id).run();
}
__name(consumeAuthCode, "consumeAuthCode");
async function rate(db, id, max = 12) {
  let now = Date.now();
  await db.prepare("INSERT INTO club_limits(id,count,until) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=CASE WHEN until<? THEN 1 ELSE count+1 END,until=CASE WHEN until<? THEN ? ELSE until END").bind(id, now + 9e5, now, now, now + 9e5).run();
  let row = await db.prepare("SELECT count FROM club_limits WHERE id=?").bind(id).first();
  if (row.count > max) fail("Troppi tentativi. Riprova tra qualche minuto.", 429);
}
__name(rate, "rate");
async function userFor(r, db) {
  let token = r.headers.get("cookie")?.match(/(?:^|;\s*)club_session=([^;]+)/)?.[1];
  if (!token) return null;
  return db.prepare("SELECT u.* FROM club_users u JOIN club_sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires>?").bind(await digest(token), Date.now()).first();
}
__name(userFor, "userFor");
async function session(db, id, secure) {
  let t = crypto.randomUUID() + crypto.randomUUID();
  await db.prepare("INSERT INTO club_sessions(token,user_id,expires) VALUES(?,?,?)").bind(await digest(t), id, Date.now() + 2592e6).run();
  return cookie(t, secure);
}
__name(session, "session");
function stateOf(u) {
  let s = JSON.parse(u.state);
  return s;
}
__name(stateOf, "stateOf");
function publicState(u, s) {
  syncPokedex(s);
  return { user: { id: u.id, email: u.email }, ...s, serverTime: Date.now() };
}
__name(publicState, "publicState");
async function mutate(db, id, fn) {
  for (let i = 0; i < 5; i++) {
    let u = await db.prepare("SELECT * FROM club_users WHERE id=?").bind(id).first();
    let s = stateOf(u);
    settle(s);
    syncPokedex(s);
    let before = s.monsters.map((m) => ({ uid: m.uid, num: m.num }));
    let extra = fn(s);
    for (let old of before) {
      let m = s.monsters.find((m2) => m2.uid === old.uid);
      if (m && m.num !== old.num) recordEvolution(s, m.uid, old.num, m.num);
    }
    syncPokedex(s);
    let result = await db.prepare("UPDATE club_users SET state=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(s), id, u.version).run();
    if (result.meta.changes) return { ...publicState(u, s), result: extra };
  }
  fail("Un altro aggiornamento \xE8 in corso. Riprova.", 409);
}
__name(mutate, "mutate");
function rnd(n) {
  let a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % n;
}
__name(rnd, "rnd");
function pack(s) {
  let cards = [];
  for (let i = 0; i < 5; i++) {
    let n = basePool[rnd(basePool.length)];
    s.cards[n] = (s.cards[n] || 0) + 1;
    cards.push(n);
  }
  return cards;
}
__name(pack, "pack");
function monster(s, uid) {
  let m = s.monsters.find((m2) => m2.uid === uid);
  if (!m) fail("Pok\xE9mon non trovato.");
  return m;
}
__name(monster, "monster");
function battleTeam(s, format, lineup) {
  if (format !== void 0 && ![1, 3, 6].includes(format)) fail("Scegli 1vs1, 3vs3 o 6vs6.");
  if (lineup !== void 0 && (!Array.isArray(lineup) || new Set(lineup).size !== lineup.length || lineup.some((id) => !s.party.includes(id)))) fail("Scegli Pok\xE9mon della tua squadra, senza duplicati.");
  let list = (lineup || s.party).map((id) => s.monsters.find((m) => m.uid === id)).filter(Boolean);
  if (!list.length) fail("Metti almeno un Pok\xE9mon in squadra.");
  if (format !== void 0) {
    if (list.length < format) fail("Servono " + format + " Pok\xE9mon in squadra per questa sfida.");
    list = list.slice(0, format);
  }
  let equipped = list.map((m) => m.heldItem).filter(Boolean);
  if (new Set(equipped).size !== equipped.length) fail("La squadra contiene strumenti duplicati.");
  return list.map(snapshot);
}
__name(battleTeam, "battleTeam");
var clamp2 = /* @__PURE__ */ __name((v, a, b) => Math.max(a, Math.min(b, v)), "clamp");
function visualMove(move, p) {
  if (move.v) return move;
  let stage = 0, species2 = byNum(p.num);
  while (species2?.pre && stage < 2) {
    stage++;
    species2 = byNum(species2.pre);
  }
  let power = move.power || 40, v = clamp2(0.42 + power / 100, 0.55, 1.95) * (1 + stage * 0.13), mode = move.mode;
  if (!move.contact && power <= 50 && ["flame", "wave", "bolt", "beam"].includes(mode)) mode = "pellet";
  if (move.key === 126) mode = "fireburst";
  return { ...move, v, mode, r: Math.round((move.mode === "zone" ? move.r : 12) * v) };
}
__name(visualMove, "visualMove");
function battleStock(s) {
  return { speed: Math.max(0, s.items.Speed || 0), defense: Math.max(0, s.items.Difesa || 0), attack: Math.max(0, s.items.Attacco || 0) };
}
__name(battleStock, "battleStock");
function newRoom(s, stadium = "classic", format, lineup) {
  let own = battleTeam(s, format, lineup);
  let st = { schema: 10, mode: "private", format: own.length, stadium, phase: "waiting", names: [s.name, ""], avatars: [s.avatar, null], teams: [own, []], active: [0, 0], pos: [{ x: 220, y: 320 }, { x: 740, y: 320 }], inputs: [{ x: 0, y: 0 }, { x: 0, y: 0 }], shots: [], events: [], time: 0, last: Date.now(), seen: [Date.now(), Date.now()], winner: null, rewarded: false };
  arenaEnsure(st).charges[0] = battleStock(s);
  return st;
}
__name(newRoom, "newRoom");
function serverHit(st, owner, move) {
  if (st.koPause || st.phase !== "active" || (st.pos[1 - owner].entryUntil || 0) > st.time || st.teams[1 - owner][st.active[1 - owner]].hp <= 0) return;
  let target = 1 - owner, t = st.pos[target], m = st.teams[target][st.active[target]], mult = move.dot || move.status || move.statusOnly ? 1 : typeEffectiveness(move.t, m.types);
  if (mult === 0) {
    st.events.push({ kind: "immune", side: target, x: t.x, y: t.y, type: move.t });
    return;
  }
  if (arenaChoreoAvoids(t, move)) return;
  let attacker = st.teams[owner][st.active[owner]], ratio = move.category === 2 ? attacker.stat[1] / m.stat[2] : attacker.stat[3] / m.stat[4], d = Math.max(2, Math.round((attacker.level * 0.35 + 8 + move.power * 0.18) * (st.stadium === "coast" ? attacker.types.includes("Acqua") ? 1.1 : 1 : terrainBonus(move.t, st.stadium)) * arenaDamage(st, owner) * Math.sqrt(ratio) * (st.bot && owner === 1 ? arenaCpuSettings(st.difficulty).damage : 1) * mult * (move.hitScale || 1) * heldDamage(attacker, move)));
  d = move.status || move.statusOnly ? 0 : move.dot ? move.d : d;
  if (!move.dot && attacker.status?.kind === "burn" && attacker.status.until > st.time && move.category === 2) d = Math.max(1, Math.round(d * 0.75));
  d = heldSurvive(m, d);
  let actual = Math.min(m.hp, d);
  attacker.damageDealt = (attacker.damageDealt || 0) + actual;
  m.hp = Math.max(0, m.hp - d);
  heldAfterHit(attacker, m, actual, st.time);
  if (!move.dot) arenaStatusHit(st, owner, move);
  if (move.status) return;
  if (move.mode === "heal" && move.category !== 1) attacker.hp = Math.min(attacker.max, attacker.hp + Math.round(d / 2));
  st.events.push({ kind: "hit", x: t.x, y: t.y, d: actual, v: move.v || 1, type: move.t, effectiveness: mult, contact: !!move.contact, power: move.power, dot: !!move.dot });
  let from = st.pos[owner], a = Math.atan2(t.y - from.y, t.x - from.x);
  t.x = clamp2(t.x + Math.cos(a) * 10, 70, 890);
  t.y = clamp2(t.y + Math.sin(a) * 10, 90, 540);
  if (!move.dot && !move.status) arenaImpact(st, t.x, t.y, move);
  let safe = arenaSafe(st, target, t.x, t.y);
  t.x = safe.x;
  t.y = safe.y;
  if (!m.hp) {
    st.koPause = { side: target, index: st.active[target], owner, until: st.time + 1 };
    st.events.push({ kind: "ko", side: target, index: st.active[target], name: m.name, x: t.x, y: t.y });
    for (let p of st.pos) {
      p.action = null;
      p.held = null;
      p.radial = null;
      p.chargeHeld = false;
      p.liftHeight = 0;
    }
    st.shots = [];
    st.streams = [];
    st.holds = [null, null];
    st.pendingMoves = [null, null];
    if (st.arena) st.arena.missiles = [];
  }
}
__name(serverHit, "serverHit");
function emitServer(st, idx, move) {
  if (move.channelDuration) {
    st.streams = st.streams || [];
    st.streams.push({ owner: idx, uid: st.teams[idx][st.active[idx]].uid, move: { ...move, channelDuration: null, hitScale: 0.28 }, left: Math.min(3, move.channelUntil ? Math.max(0, move.channelUntil - st.time) : move.channelDuration), tick: 0 });
    return;
  }
  if (move.mode === "radial") {
    arenaRadial(st, idx, move);
    return;
  }
  let p = st.pos[idx], t = st.pos[1 - idx], m = st.teams[idx][st.active[idx]], a = Math.atan2(t.y - p.y, t.x - p.x);
  if (move.mode === "heal" && move.category === 1) m.hp = Math.min(m.max, m.hp + move.d);
  else st.shots.push({ x: p.x, y: p.y - 34, ox: p.x, oy: p.y - 34, vx: Math.cos(a) * (st.bot && idx === 1 ? 235 : 350), vy: Math.sin(a) * (st.bot && idx === 1 ? 235 : 350), r: move.r, a, owner: idx, move, life: 2.5, age: 0 });
}
__name(emitServer, "emitServer");
function endServerHold(st, side, token, tap = false) {
  if (st.holds) st.holds[side] = null;
  if (tap) {
    let move = st.pos[side].action?.move;
    if (move?.holdToken === token) st.pos[side].action.move = { ...move, holdToken: null, channelUntil: st.time + 1.2, channelDuration: 0.7 };
    for (let stream of st.streams || []) if (stream.move.holdToken === token) {
      stream.move = { ...stream.move, holdToken: null };
      stream.left = Math.min(stream.left, 0.7);
    }
    return;
  }
  if (st.pos[side].action?.move?.holdToken === token) st.pos[side].action = null;
  st.streams = (st.streams || []).filter((c) => c.move.holdToken !== token);
  st.shots = st.shots.filter((c) => c.move.holdToken !== token);
}
__name(endServerHold, "endServerHold");
function queueMove(st, idx, i, channelDuration = 0, holdToken = null) {
  let m = st.teams[idx][st.active[idx]], p = st.pos[idx];
  if (st.koPause || !Number.isInteger(i) || !m.moves[i] || m.moves[i].locked || m.cd[i] > 0 || arenaAsleep(m, st.time) || p.action || p.held) return false;
  let item = heldInfo(m);
  if (item?.assault && !(m.moves[i].power > 0)) return false;
  if (item?.choice && m.choiceSlot !== void 0 && m.choiceSlot !== i) return false;
  if (item?.choice) m.choiceSlot = i;
  st.attackSerial = (st.attackSerial || 0) + 1;
  let move = { ...visualMove(m.moves[i], m), castId: "net-" + st.attackSerial };
  if (channelDuration && arenaChannelMove(move)) move = { ...move, channelDuration: clamp2(channelDuration, 0.1, 3), holdToken, channelUntil: holdToken ? st.time + 3 : null };
  move = arenaConsumeCharge(m, move);
  p.chargeHeld = false;
  m.cd[i] = move.c;
  let psychic = move.t === "Psico" && move.power > 0;
  if (arenaChoreoStart(st, idx, move)) {
  } else if ((move.mode !== "heal" || move.category !== 1) && (move.contact || move.power >= 80 || psychic)) {
    p.action = { kind: psychic ? "psychic" : move.contact ? "melee" : "ranged", phase: "charge", elapsed: 0, charge: psychic ? 0.65 : move.power >= 100 ? 0.8 : move.power >= 80 ? 0.6 : 0.13, move, target: { x: st.pos[1 - idx].x, y: st.pos[1 - idx].y }, from: { x: p.x, y: p.y } };
  } else emitServer(st, idx, move);
  if (st.bot && idx === 1 && p.action && p.action.kind !== "choreo") p.action.charge += arenaCpuSettings(st.difficulty).windup;
  st.events.push({ kind: "move", side: idx, name: move.n, type: move.t, key: move.key, animation: move.animation });
  return true;
}
__name(queueMove, "queueMove");
function stepRoom(st, dt) {
  if (st.mode === "story") st.difficulty = "hard";
  arenaEnsure(st);
  st.time += dt;
  recordBattleEncounters(st);
  if (st.koPause) {
    let k = st.koPause;
    if (st.time < k.until) return;
    let next = st.teams[k.side].findIndex((m) => m.hp > 0);
    if (next < 0) {
      st.phase = "finished";
      st.winner = k.owner;
    } else {
      st.active[k.side] = next;
      let p = st.pos[k.side];
      p.x = k.side ? 740 : 220;
      p.y = 320;
      p.entryUntil = st.time + 1.2;
      st.events.push({ kind: "sendout", side: k.side, name: st.teams[k.side][next].name, remaining: st.teams[k.side].filter((m) => m.hp > 0).length });
    }
    delete st.koPause;
    return;
  }
  arenaEffectsTick(st, dt, (side, move) => {
    if (st.phase === "active") serverHit(st, side, move);
  });
  if (st.phase !== "active") return;
  heldTick(st, dt);
  if (st.holds) for (let i = 0; i < 2; i++) {
    let h = st.holds[i];
    if (h && st.time - h.start >= 3) endServerHold(st, i, h.token);
  }
  if (st.bot) {
    st.seen[1] = Date.now();
    let p = st.pos[1], t = st.pos[0], m = st.teams[1][st.active[1]], dist = Math.hypot(t.x - p.x, t.y - p.y), a = Math.atan2(t.y - p.y, t.x - p.x);
    st.inputs[1] = { x: Math.cos(a) * (dist > 240 ? 1 : dist < 130 ? -0.5 : 0) + Math.cos(st.time * 1.4) * 0.4, y: Math.sin(a) * (dist > 240 ? 1 : dist < 130 ? -0.5 : 0) + Math.sin(st.time * 1.7) * 0.4 };
    if (st.stadium === "coast" && !m.types.includes("Acqua") && !arenaCanFly(m) && Math.abs(t.x - p.x) > 200) {
      if (p.y > 155) st.inputs[1] = { x: 0, y: -1 };
      else st.inputs[1] = { x: Math.sign(t.x - p.x), y: 0 };
    }
    st.botNext = (st.botNext || 0) - dt;
    if (st.botNext <= 0 && st.time >= arenaCpuSettings(st.difficulty).grace && !p.held && !p.action) {
      let options = m.moves.map((m2, i) => i).filter((i) => m.cd[i] <= 0 && (m.moves[i].power > 0 || m.hp < m.max * 0.5));
      if (options.length) queueMove(st, 1, cpuMoveSlot(m, st.teams[0][st.active[0]], options, st.difficulty, dist, Math.floor(st.time * 37)));
      st.botNext = arenaCpuSettings(st.difficulty).interval;
    }
  }
  for (let i = 0; i < 2; i++) {
    let p = st.pos[i], input = st.inputs[i], m = st.teams[i][st.active[i]], n = Math.max(1, Math.hypot(input.x, input.y));
    if ((!p.action || p.action.kind === "ranged" && p.action.phase === "charge") && !p.held) {
      let pace = (p.action ? 0.7 : 1) * (st.bot && i === 1 ? arenaCpuSettings(st.difficulty).speed : 1);
      arenaMove(st, i, p.x + input.x / n * 155 * arenaSpeed(m, st.time) * pace * dt, p.y + input.y / n * 155 * arenaSpeed(m, st.time) * pace * dt);
    }
    m.used = true;
    m.cd = m.cd.map((v) => Math.max(0, v - dt));
  }
  for (let side = 0; side < 2; side++) {
    let pending = st.pendingMoves?.[side];
    if (pending) {
      let m = st.teams[side][st.active[side]];
      if (pending.expires < st.time || pending.uid !== m.uid) st.pendingMoves[side] = null;
      else if (queueMove(st, side, pending.index)) st.pendingMoves[side] = null;
    }
  }
  arenaChoreoTick(st, dt, (side, move) => serverHit(st, side, move));
  for (let i = 0; i < 2; i++) {
    let p = st.pos[i], t = st.pos[1 - i], s = p.action;
    if (!s || s.kind === "choreo" || p.held || arenaAsleep(st.teams[i][st.active[i]], st.time)) continue;
    s.elapsed += dt;
    if (s.phase === "charge" && s.elapsed >= s.charge) {
      s.elapsed = 0;
      if (s.kind === "psychic") {
        p.action = null;
        if (Math.hypot(t.x - s.target.x, t.y - s.target.y) < 100) arenaPsychic(st, i, s.move);
        continue;
      }
      if (s.kind === "ranged") {
        p.action = null;
        emitServer(st, i, s.move);
        continue;
      }
      s.phase = "dash";
      let a = Math.atan2(t.y - p.y, t.x - p.x);
      s.from = { x: p.x, y: p.y };
      s.to = { x: clamp2(t.x - Math.cos(a) * 21, 70, 890), y: clamp2(t.y - Math.sin(a) * 21, 90, 540) };
      s.duration = clamp2(Math.hypot(t.x - p.x, t.y - p.y) / 1e3, 0.2, 0.65);
      s.hit = false;
    }
    if (s.phase === "dash") {
      let f = Math.min(1, s.elapsed / s.duration), prev = { x: p.x, y: p.y };
      arenaMove(st, i, s.from.x + (s.to.x - s.from.x) * f, s.from.y + (s.to.y - s.from.y) * f);
      let dx = p.x - prev.x, dy = p.y - prev.y, q = clamp2(((t.x - prev.x) * dx + (t.y - prev.y) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      if (!s.hit && Math.hypot(t.x - prev.x - q * dx, t.y - prev.y - q * dy) < 43) {
        s.hit = true;
        serverHit(st, i, s.move);
        if (st.phase === "finished") return;
        if (!p.action) continue;
      }
      if (f >= 1) {
        s.phase = "recover";
        s.elapsed = 0;
        s.contact = { x: p.x, y: p.y };
      }
    } else if (s.phase === "recover") {
      let f = Math.min(1, s.elapsed / 0.22);
      arenaMove(st, i, s.contact.x + (s.from.x - s.contact.x) * 0.36 * f, s.contact.y + (s.from.y - s.contact.y) * 0.36 * f);
      if (f >= 1) p.action = null;
    }
  }
  for (let stream of st.streams || []) {
    stream.left -= dt;
    stream.tick -= dt;
    if (stream.uid !== st.teams[stream.owner][st.active[stream.owner]].uid) {
      stream.left = 0;
      continue;
    }
    if (stream.tick <= 0 && stream.left > 0) {
      stream.tick = 0.2;
      emitServer(st, stream.owner, stream.move);
    }
  }
  st.streams = (st.streams || []).filter((s) => s.left > 0);
  for (let p of st.shots) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    let target = 1 - p.owner, t = st.pos[target], blocked = arenaProjectile(st, p);
    if (blocked) p.life = 0;
    if (p.life > 0 && Math.hypot(p.x - t.x, p.y - (t.y - 34)) < p.r + 17) {
      p.life = 0;
      serverHit(st, p.owner, p.move);
      if (st.phase === "finished") return;
    }
  }
  for (let i = 0; i < st.shots.length; i++) for (let j = i + 1; j < st.shots.length; j++) {
    let a = st.shots[i], b = st.shots[j];
    if (a.life > 0 && b.life > 0 && a.owner !== b.owner && Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) {
      a.life = b.life = 0;
      st.events.push({ kind: "clash", x: a.x, y: a.y, type: a.move.t });
      arenaImpact(st, a.x, a.y, a.move);
    }
  }
  st.shots = st.shots.filter((p) => p.life > 0 && p.x > 50 && p.x < 910 && p.y > 65 && p.y < 555);
  arenaTick(st, dt, (side, move) => {
    if (st.phase === "active") serverHit(st, side, move);
  });
}
__name(stepRoom, "stepRoom");
async function roomUpdate(db, room, uid, body) {
  for (let tries = 0; tries < 6; tries++) {
    if (tries) room = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(room.id).first();
    let idx = uid === room.host ? 0 : uid === room.guest ? 1 : -1;
    if (idx < 0) fail("Non partecipi a questa stanza.", 403);
    let st = JSON.parse(room.state), now = Date.now(), itemUser = null, itemState = null, itemConsumed = false;
    if (st.schema !== 10) fail("Questa stanza appartiene a una versione precedente. Crea una nuova sfida.", 409);
    if (st.phase === "active" && now >= (st.startsAt || 0)) {
      let elapsed = clamp2((now - Math.max(st.last, st.startsAt || 0)) / 1e3, 0, 0.6);
      while (elapsed > 0 && st.phase === "active") {
        let dt = Math.min(0.04, elapsed);
        stepRoom(st, dt);
        elapsed -= dt;
      }
      if (!st.bot && st.phase === "active" && now - st.seen[1 - idx] > 45e3) {
        st.phase = "finished";
        st.winner = idx;
        st.events.push({ kind: "disconnect" });
      }
    }
    st.last = now;
    st.seen[idx] = now;
    let x = Number(body.x) || 0, y = Number(body.y) || 0, len = Math.max(1, Math.hypot(x, y));
    st.inputs[idx] = { x: clamp2(x / len, -1, 1), y: clamp2(y / len, -1, 1) };
    if (st.phase === "active" && !st.koPause && now >= (st.startsAt || 0)) {
      if (typeof body.charge === "boolean") {
        st.pos[idx].chargeHeld = body.charge;
        if (!body.charge && !st.teams[idx][st.active[idx]].charged) st.teams[idx][st.active[idx]].energy = 0;
      }
      if ((st.swapUntil?.[idx] || 0) <= st.time && body.swap !== st.active[idx] && !st.pos[idx].action && !st.pos[idx].held && Number.isInteger(body.swap) && body.swap >= 0 && body.swap < st.teams[idx].length && st.teams[idx][body.swap].hp > 0) {
        delete st.teams[idx][st.active[idx]].choiceSlot;
        st.active[idx] = body.swap;
        st.swapUntil = st.swapUntil || [0, 0];
        st.swapUntil[idx] = st.time + 20;
        st.holds && (st.holds[idx] = null);
        st.pendingMoves && (st.pendingMoves[idx] = null);
        st.pos[idx].radial = null;
        st.pos[idx].chargeHeld = false;
        delete st.teams[idx][st.active[idx]].choiceSlot;
      }
      if (body.holdStart && Number.isInteger(body.holdStart.i) && typeof body.holdStart.token === "string" && body.holdStart.token.length < 70) {
        let i = body.holdStart.i, m = st.teams[idx][st.active[idx]];
        if (!arenaAsleep(m, st.time) && m.moves[i] && arenaChannelMove(m.moves[i]) && m.cd[i] <= 0 && !st.pos[idx].action && !st.pos[idx].held) {
          st.holds = st.holds || [null, null];
          if (!st.holds[idx] && queueMove(st, idx, i, 3, body.holdStart.token)) st.holds[idx] = { i, uid: m.uid, start: st.time, token: body.holdStart.token };
        }
      }
      let h = st.holds?.[idx];
      if (h && (body.holdCancel === h.token || body.holdEnd === h.token)) {
        endServerHold(st, idx, h.token, body.holdEnd === h.token && st.time - h.start < 0.18);
      }
      if (Number.isInteger(body.move)) {
        let m = st.teams[idx][st.active[idx]], i = body.move;
        if (m.moves[i] && !m.moves[i].locked && m.cd[i] <= 0.65) {
          st.pendingMoves = st.pendingMoves || [null, null];
          st.pendingMoves[idx] = { index: i, uid: m.uid, expires: st.time + 1.2 };
          if (queueMove(st, idx, i)) st.pendingMoves[idx] = null;
        }
      }
      if (body.item && ["speed", "attack", "defense"].includes(body.item) && typeof body.itemId === "string" && /^[a-f0-9-]{36}$/i.test(body.itemId) && !(st.usedItems || []).includes(body.itemId)) {
        itemUser = await db.prepare("SELECT * FROM club_users WHERE id=?").bind(uid).first();
        itemState = stateOf(itemUser);
        let stock = arenaEnsure(st);
        stock.charges[idx] = battleStock(itemState);
        if (arenaThrow(st, idx, body.item)) {
          let key = { speed: "Speed", attack: "Attacco", defense: "Difesa" };
          itemState.items[key[body.item]]--;
          st.usedItems = [...st.usedItems || [], body.itemId].slice(-120);
          itemConsumed = true;
        }
      }
    }
    if (st.mode !== "demo" && st.phase !== "waiting" && now >= (st.startsAt || 0)) {
      recordBattleEncounters(st);
      let discovered = st.encountered?.[idx] || [];
      st.dexSaved = st.dexSaved || [[], []];
      if (discovered.some((n) => !st.dexSaved[idx].includes(n))) {
        await mutate(db, uid, (s) => {
          markPokedexSeen(s, discovered);
          return null;
        });
        st.dexSaved[idx] = [...discovered];
      }
    }
    st.seq = st.seq || 0;
    for (let e of st.events) if (!e.seq) e.seq = ++st.seq;
    st.events = st.events.slice(-45);
    if (itemConsumed) {
      let guard = "item:" + room.id + ":" + body.itemId;
      try {
        await db.batch([db.prepare("INSERT OR IGNORE INTO club_limits(id,count,until) VALUES(?,0,?)").bind(guard, now + 864e5), db.prepare("INSERT INTO club_limits(id,count,until) SELECT ?,0,0 WHERE NOT (EXISTS(SELECT 1 FROM club_users WHERE id=? AND version=?) AND EXISTS(SELECT 1 FROM club_rooms WHERE id=? AND version=?))").bind(guard, uid, itemUser.version, room.id, room.version), db.prepare("UPDATE club_users SET state=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(itemState), uid, itemUser.version), db.prepare("UPDATE club_rooms SET state=?,version=version+1,updated=? WHERE id=? AND version=?").bind(JSON.stringify(st), now, room.id, room.version)]);
        return { id: room.id, side: idx, state: st, serverTime: now };
      } catch {
        continue;
      }
    }
    let result = await db.prepare("UPDATE club_rooms SET state=?,version=version+1,updated=? WHERE id=? AND version=?").bind(JSON.stringify(st), now, room.id, room.version).run();
    if (result.meta.changes) return { id: room.id, side: idx, state: st, serverTime: now };
  }
  fail("Stanza occupata, riprova.", 409);
}
__name(roomUpdate, "roomUpdate");
function recordBattleEncounters(st) {
  if (st.mode === "demo") return;
  st.encountered = st.encountered || [[], []];
  for (let side of [0, 1]) {
    let n = st.teams[1 - side]?.[st.active[1 - side]]?.num;
    if (n && !st.encountered[side].includes(n)) st.encountered[side].push(n);
  }
}
__name(recordBattleEncounters, "recordBattleEncounters");
function activateRoom(st, s, lineup) {
  st.names[1] = s.name;
  st.avatars[1] = s.avatar;
  st.teams[1] = battleTeam(s, [1, 3, 6].includes(st.format) ? st.format : void 0, lineup);
  arenaEnsure(st).charges[1] = battleStock(s);
  st.phase = "active";
  st.startsAt = Date.now() + 5200;
  st.last = Date.now();
  st.seen = [Date.now(), Date.now()];
  arenaEnsure(st);
  return st;
}
__name(activateRoom, "activateRoom");
function activateBot(st) {
  let source = st.teams[0], starterSlot = rnd(source.length), starter = [1, 4, 7][rnd(3)], used = /* @__PURE__ */ new Set();
  st.bot = true;
  st.botNext = 3;
  st.names[1] = ["Luca", "Maya", "Alex", "Nora", "Diego", "Leo", "Sofia", "Kai", "Elena", "Marco", "Aria", "Dylan"][rnd(12)] + " " + ["Nova", "Storm", "Sky", "Flare", "Wave", "Leaf"][rnd(6)];
  st.avatars[1] = { photo: null };
  st.teams[1] = source.map((m, i) => {
    let n;
    if (i === starterSlot) {
      n = starter;
      for (let j = 0; j < 2; j++) {
        let e = byNum(n).evolutions.find((e2) => e2.trigger === "level" && m.level >= e2.level);
        if (e) n = e.id;
      }
    } else {
      let pool = species.filter((p) => !p.legendary && p.num > 9 && !used.has(p.num) && (m.level >= 32 || p.basic));
      n = pool[rnd(pool.length)].num;
    }
    used.add(n);
    let b = snapshot({ num: n, uid: "bot-" + i, level: m.level, tms: [] });
    if (!b.moves.some((m2) => m2.power > 0)) b.moves[0] = catalog.moves[33];
    return b;
  });
  st.phase = "active";
  st.startsAt = Date.now() + 5200;
  st.last = Date.now();
  st.seen = [Date.now(), Date.now()];
  arenaEnsure(st);
  return st;
}
__name(activateBot, "activateBot");
function demoSnapshot(num) {
  let p = byNum(num);
  return snapshot({ num, uid: "demo-" + crypto.randomUUID(), level: 100, tms: p.tm, loadout: demoLoadout(p, availableMoveIds(num, 100, p.tm), catalog.moves) });
}
__name(demoSnapshot, "demoSnapshot");
async function demoSession(request, db, create = true) {
  let token = request.headers.get("cookie")?.match(/(?:^|;\s*)demo_session=([^;]+)/)?.[1], key = token && /^[a-f0-9-]{72}$/i.test(token) ? "demo-session:" + await digest(token) : null, row = key ? await db.prepare("SELECT * FROM club_limits WHERE id=?").bind(key).first() : null;
  if (row && row.until > Date.now()) return { id: key, header: null };
  if (!create) fail("Crea o raggiungi prima una stanza demo.", 401);
  token = crypto.randomUUID() + crypto.randomUUID();
  key = "demo-session:" + await digest(token);
  await db.prepare("INSERT INTO club_limits(id,count,until) VALUES(?,0,?)").bind(key, Date.now() + 864e5).run();
  return { id: key, header: `demo_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${new URL(request.url).protocol === "https:" ? "; Secure" : ""}` };
}
__name(demoSession, "demoSession");
async function handleDemo(request, db, path, body) {
  if (path !== "demo-tick") await rate(db, "demo-ip:" + (request.headers.get("cf-connecting-ip") || "local"), 100);
  let session2 = await demoSession(request, db, path !== "demo-tick"), headers = session2.header ? { "Set-Cookie": session2.header } : {};
  if (path === "demo-tick") {
    let row = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
    if (!row || JSON.parse(row.state).mode !== "demo" || Date.now() - row.updated > 72e5) fail("Stanza demo non disponibile.", 404);
    let allowed = { code: body.code, charge: body.charge, x: body.x, y: body.y, move: body.move, swap: body.swap, holdStart: body.holdStart, holdEnd: body.holdEnd, holdCancel: body.holdCancel };
    return json(await roomUpdate(db, row, session2.id, allowed), 200, headers);
  }
  await rate(db, "demo:" + session2.id, 30);
  let nums = body.team;
  if (!Array.isArray(nums) || ![1, 3, 6].includes(nums.length) || new Set(nums).size !== nums.length || nums.some((n) => !Number.isInteger(n) || !byNum(n))) fail("Scegli 1, 3 o 6 Pok\xE9mon diversi per la demo.");
  let own = nums.map(demoSnapshot), name = String(body.name || "Allenatore demo").trim().slice(0, 24) || "Allenatore demo";
  if (path === "demo-create") {
    let st = { schema: 10, mode: "demo", format: own.length, stadium: Object.hasOwn(stadiumTypes, body.stadium) ? body.stadium : "classic", phase: "waiting", names: [name, ""], avatars: [{ photo: null }, null], teams: [own, []], active: [0, 0], pos: [{ x: 220, y: 320 }, { x: 740, y: 320 }], inputs: [{ x: 0, y: 0 }, { x: 0, y: 0 }], shots: [], events: [], time: 0, last: Date.now(), seen: [Date.now(), Date.now()], winner: null, rewarded: false };
    arenaEnsure(st);
    let code = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
    await db.prepare("INSERT INTO club_rooms(id,host,state,updated) VALUES(?,?,?,?)").bind(code, session2.id, JSON.stringify(st), Date.now()).run();
    return json({ id: code, side: 0, state: st, serverTime: Date.now() }, 200, headers);
  }
  if (path === "demo-join") {
    let r = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
    if (!r || r.host === session2.id || r.guest || Date.now() - r.updated > 72e5) fail("Stanza demo non disponibile.");
    let st = JSON.parse(r.state);
    if (st.mode !== "demo" || st.phase !== "waiting" || st.format !== own.length) fail("Seleziona lo stesso numero di Pok\xE9mon del tuo amico.");
    st.teams[1] = own;
    st.names[1] = name;
    st.avatars[1] = { photo: null };
    st.phase = "active";
    st.startsAt = Date.now() + 5200;
    st.last = Date.now();
    st.seen = [Date.now(), Date.now()];
    let result = await db.prepare("UPDATE club_rooms SET guest=?,state=?,version=version+1,updated=? WHERE id=? AND guest IS NULL AND version=?").bind(session2.id, JSON.stringify(st), Date.now(), r.id, r.version).run();
    if (!result.meta.changes) fail("La stanza \xE8 gi\xE0 occupata.", 409);
    return json({ id: r.id, side: 1, state: st, serverTime: Date.now() }, 200, headers);
  }
  fail("Operazione demo non disponibile.", 404);
}
__name(handleDemo, "handleDemo");
async function findMatch(db, u, body) {
  let requested = battleTeam(stateOf(u), body.format, body.lineup).length, now = Date.now(), own = await db.prepare("SELECT * FROM club_rooms WHERE (host=? OR guest=?) AND json_extract(state,'$.mode')='random' AND json_extract(state,'$.schema')=10 AND json_extract(state,'$.phase') IN ('waiting','active') AND updated>? ORDER BY updated DESC LIMIT 1").bind(u.id, u.id, now - 45e3).first();
  if (own && JSON.parse(own.state).phase === "waiting" && (JSON.parse(own.state).format || JSON.parse(own.state).teams[0].length) !== requested) {
    await db.prepare("UPDATE club_rooms SET state=json_set(state,'$.phase','cancelled'),version=version+1 WHERE id=? AND guest IS NULL").bind(own.id).run();
    own = null;
  }
  if (own && JSON.parse(own.state).phase === "active") return { id: own.id, side: own.host === u.id ? 0 : 1, state: JSON.parse(own.state), serverTime: now };
  let candidate = await db.prepare("SELECT * FROM club_rooms WHERE host<>? AND guest IS NULL AND json_extract(state,'$.mode')='random' AND json_extract(state,'$.schema')=10 AND json_extract(state,'$.phase')='waiting' AND COALESCE(json_extract(state,'$.format'),json_array_length(state,'$.teams[0]'))=? AND updated>? ORDER BY updated ASC LIMIT 1").bind(u.id, requested, now - 4e3).first();
  if (candidate) {
    let s2 = stateOf(u);
    settle(s2);
    let st2 = activateRoom(JSON.parse(candidate.state), s2, body.lineup), claimed = await db.prepare("UPDATE club_rooms SET guest=?,state=?,version=version+1,updated=? WHERE id=? AND guest IS NULL AND version=?").bind(u.id, JSON.stringify(st2), now, candidate.id, candidate.version).run();
    if (claimed.meta.changes) {
      if (own) await db.prepare("UPDATE club_rooms SET state=json_set(state,'$.phase','cancelled'),version=version+1 WHERE id=? AND guest IS NULL").bind(own.id).run();
      return { id: candidate.id, side: 1, state: st2, serverTime: now };
    }
  }
  if (own) {
    let st2 = JSON.parse(own.state);
    if (now - (st2.queuedAt || now) >= 8e3) {
      activateBot(st2);
      let claimed = await db.prepare("UPDATE club_rooms SET guest=?,state=?,version=version+1,updated=? WHERE id=? AND guest IS NULL AND version=?").bind("BOT", JSON.stringify(st2), now, own.id, own.version).run();
      if (claimed.meta.changes) return { id: own.id, side: 0, state: st2, serverTime: now };
      return findMatch(db, u, body);
    }
    await db.prepare("UPDATE club_rooms SET updated=? WHERE id=? AND guest IS NULL").bind(now, own.id).run();
    return { id: own.id, side: 0, state: st2, serverTime: now };
  }
  let s = stateOf(u);
  settle(s);
  let st = newRoom(s, Object.keys(stadiumTypes)[rnd(Object.keys(stadiumTypes).length)], body.format, body.lineup);
  st.mode = "random";
  st.queuedAt = now;
  let code = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  let inserted = await db.prepare("INSERT INTO club_rooms(id,host,state,updated) SELECT ?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM club_rooms WHERE (host=? OR guest=?) AND json_extract(state,'$.mode')='random' AND json_extract(state,'$.schema')=10 AND json_extract(state,'$.phase') IN ('waiting','active') AND updated>?)").bind(code, u.id, JSON.stringify(st), now, u.id, u.id, now - 45e3).run();
  if (!inserted.meta.changes) return findMatch(db, u, body);
  return { id: code, side: 0, state: st, serverTime: now };
}
__name(findMatch, "findMatch");
function validProfilePhoto(photo) {
  if (typeof photo !== "string" || photo.length > 1e5 || !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(photo)) return false;
  try {
    let raw = atob(photo.split(",")[1]), b = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    if (b[0] !== 255 || b[1] !== 216) return false;
    let i = 2;
    while (i < b.length - 8) {
      if (b[i++] !== 255) return false;
      let tag = b[i++];
      if (tag === 255) {
        i--;
        continue;
      }
      if (tag === 217 || tag === 218) break;
      let len = b[i] << 8 | b[i + 1];
      if (len < 2 || i + len > b.length) return false;
      if ([192, 193, 194].includes(tag)) {
        let h = b[i + 3] << 8 | b[i + 4], w = b[i + 5] << 8 | b[i + 6];
        return w > 0 && h > 0 && w <= 512 && h <= 512;
      }
      i += len;
    }
    return false;
  } catch {
    return false;
  }
}
__name(validProfilePhoto, "validProfilePhoto");
function trainerPublic(u) {
  let s = stateOf(u);
  return { id: u.id, name: s.name, avatar: s.avatar, wins: s.wins || 0, battles: s.battles || 0, story: { cleared: Math.max(0, Math.min(13, s.story?.cleared || 0)) } };
}
__name(trainerPublic, "trainerPublic");
async function handle(request, env2) {
  try {
    env2 = runtimeEnv(env2);
    let db = env2?.DB;
    if (!db) return json({ error: "Il salvataggio non \xE8 disponibile." }, 503);
    let url = new URL(request.url), path = url.pathname.replace("/api/club/", ""), body = {};
    if (request.method === "POST") {
      let origin = request.headers.get("origin");
      if (origin && origin !== url.origin) fail("Origine non valida.", 403);
      let limit = path === "action" ? 12e4 : 2e4;
      if (Number(request.headers.get("content-length") || 0) > limit) fail("Richiesta troppo grande.");
      let raw = await request.text();
      if (enc.encode(raw).byteLength > limit) fail("Richiesta troppo grande.");
      body = JSON.parse(raw);
    }
    if (["demo-create", "demo-join", "demo-tick"].includes(path)) return await handleDemo(request, db, path, body);
    if (["verify-email", "resend-verification", "request-password-reset", "reset-password"].includes(path)) {
      if (request.method !== "POST") fail("Metodo non valido.", 405);
      let email = String(body.email || "").trim().toLowerCase(), u2 = await db.prepare("SELECT * FROM club_users WHERE email=?").bind(email).first();
      if (path === "request-password-reset") {
        if (u2) await issueAuthCode(db, env2, u2, "reset");
        return json({ ok: true, message: "Se l\u2019email \xE8 registrata, riceverai un codice di recupero." });
      }
      if (!u2) fail("Email o codice non validi.");
      if (path === "resend-verification") {
        if (u2.email_verified) return json({ ok: true, message: "Email gi\xE0 verificata." });
        await issueAuthCode(db, env2, u2, "verify");
        return json({ ok: true, message: "Codice inviato." });
      }
      if (path === "verify-email") {
        await consumeAuthCode(db, env2, u2, "verify", String(body.code || ""));
        await db.prepare("UPDATE club_users SET email_verified=1,version=version+1 WHERE id=?").bind(u2.id).run();
        return json(publicState(u2, stateOf(u2)), 200, { "Set-Cookie": await session(db, u2.id, url.protocol === "https:") });
      }
      if (path === "reset-password") {
        let password = String(body.password || "");
        if (password.length < 8 || password.length > 128) fail("La password deve contenere da 8 a 128 caratteri.");
        await consumeAuthCode(db, env2, u2, "reset", String(body.code || ""));
        let salt = crypto.randomUUID();
        await db.batch([db.prepare("UPDATE club_users SET hash=?,salt=?,email_verified=1,version=version+1 WHERE id=?").bind(await hash(password, salt), salt, u2.id), db.prepare("DELETE FROM club_sessions WHERE user_id=?").bind(u2.id)]);
        return json({ ok: true });
      }
    }
    if (path === "register" || path === "login") {
      if (request.method !== "POST") fail("Metodo non valido.", 405);
      let email = String(body.email || "").trim().toLowerCase(), password = String(body.password || "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160 || password.length < 8 || password.length > 128) fail("Inserisci una email valida e una password di almeno 8 caratteri.");
      await rate(db, "auth-ip:" + await digest(request.headers.get("cf-connecting-ip") || "local"), 60);
      await rate(db, "auth:" + await digest((request.headers.get("cf-connecting-ip") || "local") + email));
      let u2 = await db.prepare("SELECT * FROM club_users WHERE email=?").bind(email).first();
      if (path === "register") {
        if (u2) fail("Questa email \xE8 gi\xE0 registrata. Usa \u201CRecupera password\u201D se non ricordi la password.");
        if (![1, 4, 7].includes(+body.starter)) fail("Scegli uno starter.");
        let name = String(body.name || "Allenatore").trim().slice(0, 24);
        if (name.length < 2) fail("Scegli un nome di almeno due caratteri.");
        let salt = crypto.randomUUID(), id = crypto.randomUUID(), s = newState(name, +body.starter);
        s.party = [s.monsters[0].uid];
        if (["it", "en", "es", "fr", "de", "pt-BR"].includes(body.language)) s.preferences.language = body.language;
        u2 = { id, email, state: JSON.stringify(s), email_verified: 0 };
        await db.prepare("INSERT INTO club_users(id,email,hash,salt,state,email_verified,created) VALUES(?,?,?,?,?,?,?)").bind(id, email, await hash(password, salt), salt, JSON.stringify(s), 0, Date.now()).run();
        await issueAuthCode(db, env2, u2, "verify");
        return json({ verificationRequired: true, email });
      } else if (!u2 || !equal(u2.hash, await hash(password, u2.salt))) fail("Email o password non corrette.", 401);
      if (await db.prepare("SELECT reason FROM club_bans WHERE user_id=?").bind(u2.id).first()) fail("Account sospeso.", 403);
      if (!u2.email_verified) fail("Verifica prima la tua email. Puoi richiedere un nuovo codice.", 403, "email_not_verified");
      return json(publicState(u2, stateOf(u2)), 200, { "Set-Cookie": await session(db, u2.id, url.protocol === "https:") });
    }
    if (path === "logout") {
      let t = request.headers.get("cookie")?.match(/(?:^|;\s*)club_session=([^;]+)/)?.[1];
      if (t) await db.prepare("DELETE FROM club_sessions WHERE token=?").bind(await digest(t)).run();
      return json({ ok: true }, 200, { "Set-Cookie": cookie("", url.protocol === "https:", 0) });
    }
    let u = await userFor(request, db);
    if (!u) fail("Accedi per continuare.", 401);
    if (await db.prepare("SELECT reason FROM club_bans WHERE user_id=?").bind(u.id).first()) fail("Account sospeso. Contatta l\u2019amministratore.", 403);
    if (!u.email_verified) fail("Verifica prima la tua email.", 403);
    if (path.startsWith("admin-") || path.startsWith("live-") || path.startsWith("event-") || path.startsWith("pass-")) {
      if (request.method !== "POST") fail("Metodo non valido.", 405);
      return await liveRoute({ path, body, db, u, env: env2, fail, json, mutate, rate });
    }
    if (path === "state") {
      let s = stateOf(u);
      if (settle(s)) return json(await mutate(db, u.id, () => null));
      return json(publicState(u, s));
    }
    if (request.method !== "POST" && path !== "friends") fail("Metodo non valido.", 405);
    if (path === "action") {
      let result = await mutate(db, u.id, (s) => {
        let m;
        switch (body.action) {
          case "preferences": {
            let p = body.preferences || {}, languages = ["it", "en", "es", "fr", "de", "pt-BR"];
            if (!languages.includes(p.language) || typeof p.musicVolume !== "number" || !Number.isFinite(p.musicVolume) || p.musicVolume < 0 || p.musicVolume > 0.5 || typeof p.soundEffects !== "boolean" || typeof p.reducedMotion !== "boolean") fail("Preferenze non valide.");
            s.preferences = { language: p.language, musicVolume: p.musicVolume, musicEnabled: p.musicEnabled !== false, soundEffects: p.soundEffects, reducedMotion: p.reducedMotion, vibration: p.vibration !== false };
            break;
          }
          case "buy-item": {
            let item = ["Speed", "Difesa", "Attacco"].includes(body.item) ? { name: body.item, price: 100 } : EQUIPMENT.find((i) => i.name === body.item);
            if (!item) fail("Strumento non disponibile.");
            if (s.coins < item.price) fail("Monete insufficienti.");
            s.coins -= item.price;
            s.items[item.name] = (s.items[item.name] || 0) + 1;
            return { item: item.name };
          }
          case "equip": {
            m = monster(s, body.uid);
            let name = body.item || null, item = EQUIPMENT.find((i) => i.name === name && i.category === "held");
            if (name && (!item || !(s.items[name] > 0))) fail("Strumento non disponibile nella borsa.");
            if (item?.only && !item.only.includes(m.num)) fail("Questo strumento non \xE8 compatibile.");
            if (name && s.party.includes(m.uid) && s.monsters.some((o) => o.uid !== m.uid && s.party.includes(o.uid) && o.heldItem === name)) fail("Uno stesso strumento pu\xF2 essere tenuto da un solo Pok\xE9mon della squadra.");
            if (m.heldItem) s.items[m.heldItem] = (s.items[m.heldItem] || 0) + 1;
            m.heldItem = name;
            if (name) s.items[name]--;
            break;
          }
          case "party": {
            let ids = body.party;
            if (!Array.isArray(ids) || ids.length > 6 || new Set(ids).size !== ids.length || ids.some((id) => !s.monsters.some((m2) => m2.uid === id))) fail("Squadra non valida.");
            let held = ids.map((id) => s.monsters.find((m2) => m2.uid === id).heldItem).filter(Boolean);
            if (new Set(held).size !== held.length) fail("Rimuovi gli strumenti duplicati prima di formare la squadra.");
            s.party = ids;
            break;
          }
          case "train":
            m = monster(s, body.uid);
            if (trainingList(s).some((t) => t.uid === m.uid)) fail("Questo Pok\xE9mon \xE8 gi\xE0 in allenamento.");
            if (trainingList(s).length >= 3) fail("Puoi allenare al massimo tre Pok\xE9mon alla volta.");
            if (m.level >= 100) fail("Questo Pok\xE9mon \xE8 gi\xE0 al livello 100.");
            s.training.push({ uid: m.uid, started: Date.now(), ends: Date.now() + trainTime(m.level) });
            break;
          case "claim-pack":
            if (Date.now() - s.lastPack < 432e5) fail("La prossima bustina non \xE8 ancora pronta.");
            s.lastPack = Date.now();
            return { cards: pack(s) };
          case "buy-bag":
          case "claim-bag":
            if (body.action === "buy-bag") {
              if (s.coins < 100) fail("Servono 100 monete.");
              s.coins -= 100;
            } else {
              if (Date.now() - s.lastBag < 432e5) fail("La prossima borsa non \xE8 ancora pronta.");
              s.lastBag = Date.now();
            }
            {
              let found = [];
              for (let i = 0, count3 = 2 + rnd(2); i < count3; i++) {
                let pool = [...items, "MT"], item = pool[rnd(pool.length)];
                if (item === "MT") {
                  let ids = [...new Set(catalog.pokemon.flatMap((p) => p.tm))];
                  item = "MT " + ids[rnd(ids.length)];
                }
                s.items[item] = (s.items[item] || 0) + 1;
                found.push(item);
              }
              return { items: found };
            }
          case "incubate":
            if (s.incubator) fail("L\u2019incubatrice \xE8 gi\xE0 occupata.");
            if (!(s.items["Uovo Pok\xE9mon"] > 0)) fail("Non hai uova nella borsa.");
            s.items["Uovo Pok\xE9mon"]--;
            s.incubator = { started: Date.now(), ends: Date.now() + 432e5 };
            break;
          case "set-moves":
            m = monster(s, body.uid);
            {
              let chosen = body.moves, allowed = availableMoveIds(m.num, m.level, m.tms);
              if (!Array.isArray(chosen) || chosen.length !== 4 || chosen.some((id) => id !== null && (!Number.isInteger(id) || !allowed.includes(id))) || new Set(chosen.filter((id) => id !== null)).size !== chosen.filter((id) => id !== null).length) fail("Scegli fino a quattro mosse apprese, senza duplicati.");
              if (chosen.every((id) => id === null)) fail("Scegli almeno una mossa.");
              m.loadout = chosen;
            }
            break;
          case "buy-egg": {
            let now = Date.now();
            if (now - (s.lastEggPurchase || 0) < 2592e5) fail("Puoi acquistare un uovo ogni tre giorni.");
            if (s.coins < 500) fail("Servono 500 monete.");
            s.coins -= 500;
            s.items["Uovo Pok\xE9mon"] = (s.items["Uovo Pok\xE9mon"] || 0) + 1;
            s.lastEggPurchase = now;
            return { item: "Uovo Pok\xE9mon" };
          }
          case "buy-pack":
            if (s.coins < 100) fail("Monete insufficienti.");
            s.coins -= 100;
            return { cards: pack(s) };
          case "buy-tm": {
            let chosen = machines_default.find((t) => t.id === Number(body.move) && t.available);
            if (!chosen) fail("Scegli una MT disponibile nel catalogo.");
            if (s.coins < 80) fail("Monete insufficienti.");
            s.coins -= 80;
            let item = "MT " + chosen.id;
            s.items[item] = (s.items[item] || 0) + 1;
            return { item };
          }
          case "unlock": {
            let num = +body.num;
            let cost = byNum(num)?.cardCost || 4;
            if (!basePool.includes(num) || (s.cards[num] || 0) < cost) fail("Servono " + cost + " carte dello stesso Pok\xE9mon base.");
            s.cards[num] -= cost;
            s.monsters.push(mon(num));
            return { unlocked: num };
          }
          case "evolve":
            m = monster(s, body.uid);
            if (trainingList(s).some((t) => t.uid === m.uid)) fail("Attendi la fine dell\u2019allenamento.");
            {
              let e = byNum(m.num).evolutions.find((e2) => e2.id === +body.target && e2.trigger === "stone");
              if (!e || !s.items[e.item]) fail("Non hai la pietra necessaria.");
              s.items[e.item]--;
              m.num = e.id;
              return { evolved: e.id };
            }
          case "tm":
            m = monster(s, body.uid);
            {
              let id = +body.move, key = "MT " + id;
              if (!s.items[key] || !byNum(m.num).tm.includes(id)) fail("MT non disponibile o non compatibile.");
              if (m.tms.includes(id)) fail("Questa MT \xE8 gi\xE0 stata appresa.");
              s.items[key]--;
              m.tms = [...m.tms, id].slice(-4);
            }
            break;
          case "profile": {
            let photo = body.avatar?.photo ?? null;
            if (photo !== null && !validProfilePhoto(photo)) fail("Foto non valida. Carica un\u2019immagine dal profilo.");
            s.avatar = { photo };
            s.name = String(body.name || s.name).trim().slice(0, 24) || s.name;
            break;
          }
          default:
            fail("Azione non disponibile.");
        }
        return { ok: true };
      });
      return json(result);
    }
    if (path === "trainer-search") {
      let q = String(body.query || "").trim();
      if (q.length < 2 || q.length > 40) fail("Inserisci almeno due caratteri del nome o il codice allenatore.");
      let found = await db.prepare("SELECT id,state FROM club_users WHERE id<>? AND (id=? OR json_extract(state,'$.name') LIKE ? ESCAPE '\\') LIMIT 12").bind(u.id, q, "%" + q.replace(/[\\%_]/g, "\\$&") + "%").all();
      return json({ trainers: found.results.map((v) => trainerPublic(v)) });
    }
    if (path === "trainer-profile") {
      let target = await db.prepare("SELECT id,state FROM club_users WHERE id=?").bind(String(body.id || "")).first();
      if (!target) fail("Allenatore non trovato.");
      return json(trainerPublic(target));
    }
    if (path === "friends") {
      let rows = await db.prepare("SELECT f.*,u.id AS trainer_id,u.state AS trainer_state FROM club_friends f JOIN club_users u ON u.id=CASE WHEN f.sender=? THEN f.receiver ELSE f.sender END WHERE f.sender=? OR f.receiver=? ORDER BY f.updated DESC LIMIT 100").bind(u.id, u.id, u.id).all();
      return json({ code: u.id, entries: rows.results.map((f) => ({ id: f.id, status: f.status, incoming: f.receiver === u.id, trainer: trainerPublic({ id: f.trainer_id, state: f.trainer_state }) })) });
    }
    if (path === "friend-request") {
      let target = String(body.id || "");
      if (target === u.id) fail("Non puoi inviare una richiesta a te stesso.");
      if (!await db.prepare("SELECT id FROM club_users WHERE id=?").bind(target).first()) fail("Allenatore non trovato.");
      await rate(db, "friends:" + u.id, 30);
      let id = [u.id, target].sort().join(":");
      await db.prepare("INSERT OR IGNORE INTO club_friends(id,sender,receiver,status,created,updated) VALUES(?,?,?,'pending',?,?)").bind(id, u.id, target, Date.now(), Date.now()).run();
      let relation = await db.prepare("SELECT * FROM club_friends WHERE id=?").bind(id).first();
      return json({ ok: true, status: relation.status, incoming: relation.receiver === u.id });
    }
    if (path === "friend-respond") {
      let id = String(body.id || ""), accept = body.accept === true, relation = await db.prepare("SELECT * FROM club_friends WHERE id=?").bind(id).first();
      if (!relation || relation.receiver !== u.id || relation.status !== "pending") fail("Richiesta non disponibile.");
      if (accept) await db.prepare("UPDATE club_friends SET status='accepted',updated=? WHERE id=? AND receiver=? AND status='pending'").bind(Date.now(), id, u.id).run();
      else await db.prepare("DELETE FROM club_friends WHERE id=? AND receiver=? AND status='pending'").bind(id, u.id).run();
      return json({ ok: true });
    }
    if (path === "account-password" || path === "account-email" || path === "account-delete") {
      await rate(db, "security:" + u.id, 12);
      let current = String(body.currentPassword || "");
      if (!current || !equal(u.hash, await hash(current, u.salt))) fail("Password attuale non corretta.", 403);
      if (path === "account-password") {
        let password = String(body.newPassword || "");
        if (password.length < 8 || password.length > 128) fail("La nuova password deve contenere da 8 a 128 caratteri.");
        if (password === current) fail("Scegli una password diversa da quella attuale.");
        let salt = crypto.randomUUID(), nextHash = await hash(password, salt), token = crypto.randomUUID() + crypto.randomUUID(), guard = "password:" + crypto.randomUUID();
        try {
          await db.batch([db.prepare("INSERT INTO club_limits(id,count,until) VALUES(?,0,?)").bind(guard, Date.now() + 9e5), db.prepare("INSERT INTO club_limits(id,count,until) SELECT ?,0,0 WHERE NOT EXISTS(SELECT 1 FROM club_users WHERE id=? AND hash=?)").bind(guard, u.id, u.hash), db.prepare("UPDATE club_users SET hash=?,salt=?,version=version+1 WHERE id=?").bind(nextHash, salt, u.id), db.prepare("DELETE FROM club_sessions WHERE user_id=?").bind(u.id), db.prepare("INSERT INTO club_sessions(token,user_id,expires) VALUES(?,?,?)").bind(await digest(token), u.id, Date.now() + 2592e6)]);
        } catch {
          fail("Il profilo \xE8 cambiato. Accedi di nuovo e riprova.", 409);
        }
        return json({ ok: true }, 200, { "Set-Cookie": cookie(token, url.protocol === "https:") });
      }
      if (path === "account-email") {
        let email = String(body.email || "").trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) fail("Inserisci una email valida.");
        let duplicate = await db.prepare("SELECT id FROM club_users WHERE email=? AND id<>?").bind(email, u.id).first();
        if (duplicate) fail("Questa email \xE8 gi\xE0 utilizzata.");
        await issueAuthCode(db, env2, { ...u, email }, "verify");
        try {
          let updated = await db.prepare("UPDATE club_users SET email=?,email_verified=0,version=version+1 WHERE id=? AND hash=?").bind(email, u.id, u.hash).run();
          if (!updated.meta.changes) fail("Accedi di nuovo e riprova.", 409);
        } catch (e) {
          if (e.status) throw e;
          fail("Questa email \xE8 gi\xE0 utilizzata.");
        }
        await db.prepare("DELETE FROM club_sessions WHERE user_id=?").bind(u.id).run();
        return json({ ok: true, email, verificationRequired: true }, 200, { "Set-Cookie": cookie("", url.protocol === "https:", 0) });
      }
      if (body.confirmation !== "DELETE") fail("Scrivi DELETE per confermare.");
      await db.batch([db.prepare("DELETE FROM club_friends WHERE sender=? OR receiver=?").bind(u.id, u.id), db.prepare("DELETE FROM club_trades WHERE owner=? OR partner=?").bind(u.id, u.id), db.prepare("DELETE FROM club_rooms WHERE host=? OR guest=?").bind(u.id, u.id), db.prepare("DELETE FROM club_sessions WHERE user_id=?").bind(u.id), db.prepare("DELETE FROM club_users WHERE id=?").bind(u.id)]);
      return json({ ok: true }, 200, { "Set-Cookie": cookie("", url.protocol === "https:", 0) });
    }
    if (path === "account-sessions") {
      let keep = await digest(request.headers.get("cookie")?.match(/(?:^|;\s*)club_session=([^;]+)/)?.[1] || "");
      await db.prepare("DELETE FROM club_sessions WHERE user_id=? AND token<>?").bind(u.id, keep).run();
      return json({ ok: true });
    }
    if (path === "story-create") {
      let s = stateOf(u), index = Number(body.stage);
      settle(s);
      if (!Number.isInteger(index) || index < 0 || index >= story_default.length || index > (s.story?.cleared || 0)) fail("Batti prima l\u2019allenatore precedente.");
      let boss = story_default[index], st = newRoom(s, boss.stadium);
      st.mode = "story";
      st.difficulty = "hard";
      st.storyStage = index;
      st.bot = true;
      st.botNext = 3;
      st.names[1] = boss.name;
      st.avatars[1] = { photo: null, npc: boss.id };
      st.teams[1] = boss.team.map(([num, level], i) => snapshot({ num, level, uid: "story-" + index + "-" + i, tms: [] }));
      st.phase = "active";
      st.startsAt = Date.now() + 5200;
      st.last = Date.now();
      let code = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
      await db.prepare("INSERT INTO club_rooms(id,host,guest,state,updated) VALUES(?,?,?,?,?)").bind(code, u.id, "BOT", JSON.stringify(st), Date.now()).run();
      return json({ id: code, side: 0, state: st, serverTime: Date.now() });
    }
    if (path === "room-create") {
      let s = stateOf(u);
      settle(s);
      let code = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase(), st = newRoom(s, Object.hasOwn(stadiumTypes, body.stadium) ? body.stadium : "classic", body.format, body.lineup);
      await db.prepare("INSERT INTO club_rooms(id,host,state,updated) VALUES(?,?,?,?)").bind(code, u.id, JSON.stringify(st), Date.now()).run();
      return json({ id: code, side: 0, state: st });
    }
    if (path === "match-find") return json(await findMatch(db, u, body));
    if (path === "match-cancel") {
      await db.prepare("UPDATE club_rooms SET state=json_set(state,'$.phase','cancelled'),version=version+1 WHERE id=? AND host=? AND guest IS NULL AND json_extract(state,'$.phase')='waiting'").bind(String(body.code || ""), u.id).run();
      return json({ ok: true });
    }
    if (path === "bot-create") {
      if (body.difficulty !== void 0 && !["easy", "medium", "hard"].includes(body.difficulty)) fail("Difficolt\xE0 non valida.");
      let s = stateOf(u);
      settle(s);
      let st = activateBot(newRoom(s, Object.hasOwn(stadiumTypes, body.stadium) ? body.stadium : "classic", body.format, body.lineup)), code = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
      st.difficulty = body.difficulty || "medium";
      await db.prepare("INSERT INTO club_rooms(id,host,guest,state,updated) VALUES(?,?,?,?,?)").bind(code, u.id, "BOT", JSON.stringify(st), Date.now()).run();
      return json({ id: code, side: 0, state: st, serverTime: Date.now() });
    }
    if (path === "room-join") {
      let code = String(body.code || "").trim().toUpperCase(), r = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(code).first();
      if (!r || Date.now() - r.updated > 36e5) fail("Stanza non trovata o scaduta.");
      if (r.host === u.id) fail("Condividi il codice con un altro allenatore.");
      let st = JSON.parse(r.state);
      if (r.guest || st.phase !== "waiting" || st.mode === "random" || st.schema !== 10) fail("Stanza non disponibile.");
      let s = stateOf(u);
      settle(s);
      if (body.format !== void 0 && body.format !== st.format) fail("Questa stanza \xE8 " + st.format + "vs" + st.format + ". Seleziona lo stesso formato.");
      activateRoom(st, s, body.lineup);
      let res = await db.prepare("UPDATE club_rooms SET guest=?,state=?,version=version+1,updated=? WHERE id=? AND guest IS NULL").bind(u.id, JSON.stringify(st), Date.now(), code).run();
      if (!res.meta.changes) fail("La stanza \xE8 gi\xE0 occupata.");
      return json({ id: code, side: 1, state: st, serverTime: Date.now() });
    }
    if (path === "room-tick") {
      let r = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
      if (!r) fail("Stanza non trovata.");
      return json(await roomUpdate(db, r, u.id, body));
    }
    if (path === "room-reward") {
      let seasons = await activeSeasons(db);
      let r = await db.prepare("SELECT * FROM club_rooms WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
      if (!r || ![r.host, r.guest].includes(u.id)) fail("Stanza non valida.");
      let st = JSON.parse(r.state), side = u.id === r.host ? 0 : 1;
      if (st.phase !== "finished") fail("La battaglia non \xE8 finita.");
      if (st.mode === "story" && st.winner === side) {
        let boss = story_default[st.storyStage];
        if (!boss || st.teams[1].length !== boss.team.length || st.teams[1].some((m, i) => m.num !== boss.team[i][0] || m.level !== boss.team[i][1] || m.hp > 0)) fail("Devi sconfiggere tutti i Pok\xE9mon del capopalestra.", 409);
      }
      return json(await mutate(db, u.id, (s) => {
        s.rewards = s.rewards || [];
        if (s.rewards.includes(r.id)) return { already: true };
        s.rewards.push(r.id);
        markPokedexSeen(s, st.encountered?.[side] || st.teams[1 - side].filter((m) => m.used || m.hp < m.max).map((m) => m.num));
        s.battles++;
        if (st.winner === side) s.wins++;
        let coins = st.winner === side ? 10 : 0;
        let awards = xpAwards(s, st.teams[side], st.time);
        addPassXP(s, seasons, st.winner === side);
        let storyAdvance = null;
        if (st.mode === "story" && st.winner === side) {
          s.story = s.story || { cleared: 0 };
          if (st.storyStage === s.story.cleared) {
            coins = st.storyStage < 8 ? 500 : st.storyStage < 12 ? 1e3 : 1500;
            s.story.cleared++;
            storyAdvance = { cleared: s.story.cleared, badge: story_default[st.storyStage]?.badge || null, name: story_default[st.storyStage]?.name };
          }
        }
        s.coins += coins;
        return { coins, storyAdvance, xpAwards: awards };
      }));
    }
    if (path === "trade-create") {
      let s = stateOf(u), m = monster(s, body.uid);
      if (s.monsters.length < 2) fail("Devi conservare almeno un Pok\xE9mon.");
      if (trainingList(s).some((t) => t.uid === m.uid)) fail("Il Pok\xE9mon \xE8 in allenamento.");
      if (!s.items["Biglietto scambio"]) fail("Serve un biglietto scambio.");
      let id = crypto.randomUUID().slice(0, 8).toUpperCase();
      await db.prepare("INSERT INTO club_trades(id,owner,offered,status,updated) VALUES(?,?,?,'open',?)").bind(id, u.id, m.uid, Date.now()).run();
      return json({ id });
    }
    if (path === "trade-view") {
      let t = await db.prepare("SELECT * FROM club_trades WHERE id=?").bind(String(body.code || "").toUpperCase()).first();
      if (!t || Date.now() - t.updated > 864e5) fail("Scambio non trovato o scaduto.");
      let owner = await db.prepare("SELECT state FROM club_users WHERE id=?").bind(t.owner).first(), os = stateOf(owner);
      let partner = t.partner ? await db.prepare("SELECT state FROM club_users WHERE id=?").bind(t.partner).first() : null;
      return json({ id: t.id, status: t.status, isOwner: t.owner === u.id, ownerName: os.name, offered: os.monsters.find((m) => m.uid === t.offered), requested: partner ? stateOf(partner).monsters.find((m) => m.uid === t.requested) : null });
    }
    if (path === "trade-offer") {
      let code = String(body.code || "").toUpperCase(), t = await db.prepare("SELECT * FROM club_trades WHERE id=?").bind(code).first();
      if (!t || t.owner === u.id || t.status !== "open") fail("Scambio non disponibile.");
      let s = stateOf(u), m = monster(s, body.uid);
      if (s.monsters.length < 2 || trainingList(s).some((t2) => t2.uid === m.uid) || !s.items["Biglietto scambio"]) fail("Serve un biglietto, un Pok\xE9mon libero e almeno un altro Pok\xE9mon nel Box.");
      let res = await db.prepare("UPDATE club_trades SET partner=?,requested=?,status='proposed',updated=? WHERE id=? AND status='open'").bind(u.id, m.uid, Date.now(), code).run();
      if (!res.meta.changes) fail("Scambio gi\xE0 prenotato.");
      return json({ ok: true });
    }
    if (path === "trade-confirm") {
      let code = String(body.code || "").toUpperCase(), t = await db.prepare("SELECT * FROM club_trades WHERE id=?").bind(code).first();
      if (!t || t.owner !== u.id || t.status !== "proposed") fail("Scambio non confermabile.");
      let a = await db.prepare("SELECT * FROM club_users WHERE id=?").bind(t.owner).first(), b = await db.prepare("SELECT * FROM club_users WHERE id=?").bind(t.partner).first(), sa = stateOf(a), sb = stateOf(b), ma = monster(sa, t.offered), mb = monster(sb, t.requested);
      for (let [s, m] of [[sa, ma], [sb, mb]]) if (s.monsters.length < 2 || trainingList(s).some((t2) => t2.uid === m.uid) || !s.items["Biglietto scambio"]) fail("Le condizioni dello scambio sono cambiate.");
      syncPokedex(sa);
      syncPokedex(sb);
      sa.monsters = sa.monsters.filter((m) => m.uid !== ma.uid);
      sb.monsters = sb.monsters.filter((m) => m.uid !== mb.uid);
      for (let m of [ma, mb]) {
        let from = m.num;
        let e = byNum(m.num).evolutions.find((e2) => e2.trigger === "trade");
        if (e) {
          m.num = e.id;
          recordEvolution(m === ma ? sb : sa, m.uid, from, m.num);
        }
      }
      sa.monsters.push(mb);
      sb.monsters.push(ma);
      sa.party = sa.party.filter((x) => x !== ma.uid);
      sb.party = sb.party.filter((x) => x !== mb.uid);
      sa.items["Biglietto scambio"]--;
      sb.items["Biglietto scambio"]--;
      syncPokedex(sa);
      syncPokedex(sb);
      let guardId = "trade:" + code, valid = "EXISTS(SELECT 1 FROM club_users WHERE id=? AND version=?) AND EXISTS(SELECT 1 FROM club_users WHERE id=? AND version=?) AND EXISTS(SELECT 1 FROM club_trades WHERE id=? AND status='proposed')";
      try {
        await db.batch([db.prepare("INSERT OR IGNORE INTO club_limits(id,count,until) VALUES(?,0,?)").bind(guardId, Date.now() + 864e5), db.prepare(`INSERT INTO club_limits(id,count,until) SELECT ?,0,0 WHERE NOT (${valid})`).bind(guardId, a.id, a.version, b.id, b.version, code), db.prepare("UPDATE club_users SET state=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(sa), a.id, a.version), db.prepare("UPDATE club_users SET state=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(sb), b.id, b.version), db.prepare("UPDATE club_trades SET status='completed',updated=? WHERE id=? AND status='proposed'").bind(Date.now(), code)]);
      } catch {
        fail("Lo scambio o i profili sono cambiati. Aggiorna e riprova.", 409);
      }
      ;
      return json({ ok: true });
    }
    fail("Operazione non trovata.", 404);
  } catch (e) {
    return json({ error: e.status ? e.message : "Errore del servizio. Riprova tra poco.", code: e.code }, e.status || 500);
  }
}
__name(handle, "handle");

// api/club/[[path]].ts
async function onRequestGet({ request, env: env2 }) {
  return handle(request, env2);
}
__name(onRequestGet, "onRequestGet");
async function onRequestPost({ request, env: env2 }) {
  return handle(request, env2);
}
__name(onRequestPost, "onRequestPost");

// ../.wrangler/tmp/pages-zJ1upP/functionsRoutes-0.12321252773256808.mjs
var routes = [
  {
    routePath: "/api/club/:path*",
    mountPath: "/api/club",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/club/:path*",
    mountPath: "/api/club",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start2 = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start2 ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function getOriginalPathPrefix(requestPath, normalizedPrefix) {
  let end = 0;
  for (let index = 0; index < normalizedPrefix.length; index++) {
    end++;
    if (normalizedPrefix[index] === "/") {
      while (requestPath[end] === "/") {
        end++;
      }
    }
  }
  return requestPath.slice(0, end);
}
__name(getOriginalPathPrefix, "getOriginalPathPrefix");
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  const normalizedRequestPath = requestPath.replace(/\/+/g, "/");
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath) || routeMatcher(normalizedRequestPath);
    const originalMountMatch = mountMatcher(requestPath);
    const mountMatchResult = originalMountMatch || mountMatcher(normalizedRequestPath);
    if (matchResult && mountMatchResult) {
      const path = originalMountMatch ? originalMountMatch.path : getOriginalPathPrefix(requestPath, mountMatchResult.path);
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
