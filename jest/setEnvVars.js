// Temporary due to a problem with Next's Image component. See: https://github.com/vercel/next.js/issues/18415
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
