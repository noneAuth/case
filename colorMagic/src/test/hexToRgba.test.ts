const colorTools = require('../utils/hexToRgba.js');

/**
 * 输入值: #bdd2fd 期望值: rgba(189, 210, 253, 1)
 * 输入值: #ffffff 期望值: rbga(255, 255, 255, 1)
 *输入值: #00b96b 期望值: rgba(0, 185, 107, 1)
 *输入值: #303841 期望值: rgba(48, 56, 65, 1)
 *输入值: #febc2e 期望值: rgba(254, 188, 46, 1)
 *输入值: #ff5f57 期望值: rgba(255, 95, 87, 1)
 */

test('输入值: #bdd2fd 期望值: rgba(189, 210, 253, 1)', () => {
  expect(colorTools.hexToRgba('#bdd2fd', 1)).toBe('rgba(189,210,253,1)');
})
test('输入值: #ffffff 期望值: rbga(255, 255, 255, 1)', () => {
  expect(colorTools.hexToRgba('#ffffff', 1)).toBe('rgba(255,255,255,1)');
})
test('输入值: #00b96b 期望值: rgba(0, 185, 107, 1)', () => {
  expect(colorTools.hexToRgba('#00b96b', 1)).toBe('rgba(0,185,107,1)');
})
test('输入值: #303841 期望值: rgba(48, 56, 65, 1)', () => {
  expect(colorTools.hexToRgba('#303841', 1)).toBe('rgba(48,56,65,1)');
})
test('输入值: #febc2e 期望值: rgba(254, 188, 46, 1)', () => {
  expect(colorTools.hexToRgba('#febc2e', 1)).toBe('rgba(254,188,46,1)');
})
test('输入值: #ff5f57 期望值: rgba(255, 95, 87, 1)', () => {
  expect(colorTools.hexToRgba('#ff5f57', 1)).toBe('rgba(255,95,87,1)');
})
