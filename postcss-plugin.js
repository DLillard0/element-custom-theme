const Color = require('color')

// 处理 CSS3 变量和 color-mix 兼容性问题
// 将
// .el-alert--success.is-light {
//   background-color: color-mix(in srgb, #FFFFFF 90%, var(--color-success, #67C23A));
//   color: var(--color-success, #67C23A);
// }
//
// 转换为
// .el-alert--success.is-light {
//   background-color: #F0F9EB;
//   background-color: color-mix(in srgb, #FFFFFF 90%, var(--color-success, #67C23A));
//   color: #67C23A;
//   color: var(--color-success, #67C23A);
// }
module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'POSTCSS-PLUGIN',
    Declaration (decl, { Declaration }) {
      let newVal = decl.value

      const varArr = getVar(decl.value)
      if (varArr) {
        varArr.forEach(i => {
          const _i = i.match(/,(.*)\)/)
          if (_i) newVal = newVal.replace(i, _i[1].trim())
        })
      }

      const mixArr = getColorMix(newVal)
      if (mixArr) {
        mixArr.forEach(i => {
          const _i = getColorMixDefault(i)
          if (_i) newVal = newVal.replace(i, _i)
        })
      }

      if (newVal !== decl.value) {
        decl.before(new Declaration({ prop: decl.prop, value: newVal }))
      }
    }
  }
}

function getVar (value) {
  return value.match(/var\([^(]+(\([^(]+\))?[^(]*\)/g)
}

function getColorMix (value) {
  return value.match(/color-mix\([^(]+(\([^(]+\))?([^(]+\([^(]+\))?[^(]*\)/g)
}

function getColorMixDefault (value) {
  const arr = value.match(/[^,]+,([^(]+|[^(]+\([^)]+\)[^,]*),(.*)\)/)
  if (arr) {
    const index = arr[1].lastIndexOf(' ')
    const p = arr[1].slice(index).trim().replace('%', '') / 100
    const color1 = Color(arr[1].slice(0, index).trim())
    const color2 = Color(arr[2].trim())
    // 使用 color.js 的 mix 方法提前混出默认值
    return color2.mix(color1, p).hex()
  } else {
    return null
  }
}

module.exports.postcss = true
