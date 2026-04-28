type ImportedAsset = string;

const assetModules = import.meta.glob('../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,mp4,MP4}', {
  eager: true,
  import: 'default',
}) as Record<string, ImportedAsset>;

export type AssetKind = 'image' | 'gif' | 'video';

export type AssetRecord = {
  path: string;
  name: string;
  folder: string;
  kind: AssetKind;
  src: string;
};

const getKind = (name: string): AssetKind => {
  if (name.toLowerCase().endsWith('.mp4')) {
    return 'video';
  }

  if (name.toLowerCase().endsWith('.gif')) {
    return 'gif';
  }

  return 'image';
};

export const assets: AssetRecord[] = Object.entries(assetModules)
  .map(([path, src]) => {
    const normalized = path.replace('../assets/', 'assets/');
    const parts = normalized.split('/');
    const name = parts[parts.length - 1] ?? normalized;
    const folder = parts[1] ?? 'assets';

    return {
      path: normalized,
      name,
      folder,
      kind: getKind(name),
      src,
    };
  })
  .sort((left, right) => left.path.localeCompare(right.path, 'zh-Hans-CN'));

export const assetByName = Object.fromEntries(assets.map((asset) => [asset.name, asset]));

export const pickAssets = (names: string[]) =>
  names.map((name) => assetByName[name]).filter((asset): asset is AssetRecord => Boolean(asset));

export const groupAssetsByFolder = () =>
  assets.reduce<Record<string, AssetRecord[]>>((acc, asset) => {
    acc[asset.folder] ??= [];
    acc[asset.folder].push(asset);
    return acc;
  }, {});
