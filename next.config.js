const nextTranslate = require("next-translate");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  ...nextTranslate({
    reactStrictMode: true,
    images: {
      domains: [],
    },
  }),
});
