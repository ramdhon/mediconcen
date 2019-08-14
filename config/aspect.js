const resolveAssetSource = require('resolveAssetSource');

export default function (source) {
  const { width, height } = resolveAssetSource(source);

  return width / height;
}