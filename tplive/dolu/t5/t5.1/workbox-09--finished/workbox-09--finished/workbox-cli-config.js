module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{html,ico,json,css}",
    "src/images/*.{jpg,png}",
    "src/js/*.min.js",
    "src/js/*app.js",
  ],
  "swSrc": "public/sw-base.js",
  "swDest": "public/Newservice-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js",
    "help/**",
    "404.html"
  ]
};
