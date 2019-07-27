export default function camelToHyphen(camelString: string) {
  return camelString
    .replace(/[A-Z]/g, (string) => `-${string.toLowerCase()}`)
    .toLowerCase();
}
