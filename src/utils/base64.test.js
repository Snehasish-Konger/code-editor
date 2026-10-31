import { encodeBase64, decodeBase64 } from "./base64";

describe("base64 helpers", () => {
  it("round-trips non-ASCII text", () => {
    const src = 'printf("héllo 🚀 “quotes”");';
    expect(decodeBase64(encodeBase64(src))).toBe(src);
  });

  it("encodes as standard UTF-8 base64", () => {
    expect(encodeBase64("é")).toBe("w6k=");
  });

  it("treats empty input as an empty string", () => {
    expect(encodeBase64("")).toBe("");
    expect(encodeBase64(undefined)).toBe("");
    expect(decodeBase64(null)).toBe("");
  });
});
