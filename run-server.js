import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('node:crypto');

console.log('Patching node:crypto...');

if (!crypto.getRandomValues && crypto.webcrypto) {
    try {
        crypto.getRandomValues = crypto.webcrypto.getRandomValues.bind(crypto.webcrypto);
        console.log('Successfully patched crypto.getRandomValues');
    } catch (err) {
        console.error('Failed to patch crypto:', err);
    }
}

if (!globalThis.crypto) {
    // @ts-ignore
    globalThis.crypto = crypto.webcrypto;
    console.log('Patched globalThis.crypto');
}

// Execute Vite CLI
import './node_modules/vite/bin/vite.js';
