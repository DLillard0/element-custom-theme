# 使用 CSS3 变量实现 ElementUI 主题切换

[预览地址](https://dlillard0.github.io/element-custom-theme/)

## 实现思路

### 1. 使用 css 变量定制 ElementUI sass 变量

```scss
// element-variables.scss
$--color-primary: var(--color-primary, #409EFF);
```

### 2. 覆盖 sass 内置的 mix 函数，使用 css 的 color-mix 函数代替

```scss
@function mix($color1, $color2, $p: 50%) {
  @return color-mix(in srgb, $color1 $p, $color2);
}
```

### 3. 在页面注入 css 变量，通过 js 动态修改 css 变量即可实现整个 ElementUI 的主题切换

## 兼容性处理

由于 css 的变量和 color-mix 函数存在一些兼容性问题，所以可以通过写一个 postcss 插件来提供兜底方案

```scss
// postcss.config.js
// 通过 postcss 插件将
.el-alert--success.is-light {
  background-color: color-mix(in srgb, #FFFFFF 90%, var(--color-success, #67C23A));
  color: var(--color-success, #67C23A);
}

// 转换为
.el-alert--success.is-light {
  background-color: #F0F9EB;
  background-color: color-mix(in srgb, #FFFFFF 90%, var(--color-success, #67C23A));
  color: #67C23A;
  color: var(--color-success, #67C23A);
}

// 这样在不支持 css 变量和 color-mix 函数的浏览器中，就会使用固定的色值
```