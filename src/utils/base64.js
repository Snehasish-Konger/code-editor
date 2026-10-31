// btoa/atob only handle Latin-1, so non-ASCII source code (emoji, accents,
// smart quotes) must go through UTF-8 bytes first.
export const encodeBase64 = (str) => {
  const bytes = new TextEncoder().encode(str || "");
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

export const decodeBase64 = (str) => {
  if (!str) return "";
  try {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return str;
  }
};
