// Ensure Vitest's `expect` is available before registering jest-dom matchers
// Import dynamically so we can set the global before jest-dom extends it
(async () => {
	const mod = await import('vitest');
	(globalThis as any).expect = mod.expect;
	await import('@testing-library/jest-dom');
})();
