import { Platform, CameraRoll, Alert } from 'react-native';
import RNFS from 'react-native-fs';

export default async function getAbsolutePath(uri) {
  let regex = /:\/\/(.{36})\//i;
  let path = uri.match(regex);
  let result = "assets-library://asset/asset.JPG?id="+path[1]+"&ext=JPG";
  const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.jpg`;
  try {
    const absolutePath = await RNFS.copyAssetsFileIOS(result, dest, 0, 0);
    return absolutePath;
  } catch (err) {
    return err;
  }
}
