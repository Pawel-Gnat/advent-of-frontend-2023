import { Gift, Wearable, parseGSL, GSL_DEMO_SNIPPET } from "./index";

describe('GSL Parser', () => {

  test('should parse a valid GSL snippet without any errors', () => {
    expect(() => parseGSL(GSL_DEMO_SNIPPET)).not.toThrow();
  });

  test('should properly count Gift items', () => {
    const gift: Gift = parseGSL(GSL_DEMO_SNIPPET);
    expect(gift.items.length).toBe(3);
  });

  test('should recognize gift item types', () => {
    const gift: Gift = parseGSL(GSL_DEMO_SNIPPET);
    expect(gift.items[0].type).toBe('socks');
    expect(gift.items[1].type).toBe('scarf');
    expect(gift.items[2].type).toBe('book');
  });

  test('should recognize gift item properties', () => {
    const gift: Gift = parseGSL(GSL_DEMO_SNIPPET);
    expect((gift.items[0] as Wearable).type).toBe('socks');
    expect((gift.items[0] as Wearable).color).toBe('red');
    expect((gift.items[0] as Wearable).size).toBe('small');
  });

});
