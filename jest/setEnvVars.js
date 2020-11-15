// From version 10.0.2 this may not be necessary if the values are the default ones like below,
// however it will be if the values are custom. See: https://github.com/vercel/next.js/pull/19107
process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: [],
    path: "/_next/image",
    loader: "default",
  },
};
