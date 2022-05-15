export default function shortenText(text, maxSize = 20) {
  if (text.length < maxSize) {
    return text;
  }
  return `${text.slice(0, maxSize - 3)}...`;
}
