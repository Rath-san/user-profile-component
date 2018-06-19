// const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    const files = [
        './dist/userprofile/runtime.js',
        './dist/userprofile/polyfills.js',
        './dist/userprofile/main.js'
    ]

    // await fs.ensureDir('userprofile');
    await concat(files, 'demo/user-profile.js');

})();