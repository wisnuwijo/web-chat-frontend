const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  // distDir: 'build',
  reactStrictMode: true,
  env: {
    endPoint: "http://localhost:5000",
    appName: "SpeakUp",
  }
})
