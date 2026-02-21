/**
 * Suppress noisy WebSocket warnings from Next.js HMR in development.
 * Root cause: Next.js dev server emits WebSocket reconnection warnings
 * that cannot be disabled via framework configuration.
 * This script is loaded via <Script> to comply with CSP strict mode.
 */
(function () {
  var originalWarn = console.warn;
  console.warn = function () {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('WebSocket') !== -1) return;
    originalWarn.apply(console, arguments);
  };
})();
