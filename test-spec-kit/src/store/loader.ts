/*
 * @Date: 2023/1/26
 * @Desc:
 */

const files = (require as commonGlobal.commonAny).context('./models', false, /\.ts$/);
const models: Record<string, commonGlobal.commonAny> = {};

files.keys().forEach((key: commonGlobal.commonAny) => {
  const filename = key.replace(/(\.\/|\.ts)/g, '');
  models[filename] = files(key).default;
});
export default models;
