# scratch-gui
#### Scratch GUI 是一套 React 组件，包括用以创建和运行 Scratch3.0 项目的交互界面。

[![Build Status](https://travis-ci.com/LLK/scratch-gui.svg?token=Yfq2ryN1BwaxDME69Lnc&branch=master)](https://travis-ci.com/LLK/scratch-gui)
[![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-gui.svg)](https://greenkeeper.io/)

[TOC]

## 安装

首先要确保已经安装了 Git 和 Nodejs。

在 node 环境中：

```bash
npm install https://github.com/LLK/scratch-gui.git
```

如果你想编辑或运行：

```bash
git clone https://github.com/LLK/scratch-gui.git
cd scratch-gui
npm install
```

## 开始

运行该项目首先要确保已经安装了 nodejs。

## 运行

在仓库目录里打开命令提示符或终端并运行：

```bash
npm start
```

接下来打开 [http://localhost:8601](http://localhost:8601) - 页面会显示默认的 GUI 组件。



## 和其它 Scratch 库一起开发

### 将其它的库指向当前代码

如果你想和依赖 scratch 的其它库一起开发 `scratch-gui`，你可能希望其它的库使用你本地的 `scratch-gui` 构建，而不是拉取当前使用默认的 `npm install` 构建的 scratch-gui 生产版本。

#### 配置

1. 在你本地 `scratch-gui` 库的根目录：

   i. 确认你已经运行过 `npm install`

   ii. 使用 `BUILD_MODE=dist npm run build` 创建了 `dist` 目录

   iii. 运行 `npm link` 创建一个与此仓库的链接

2. 从依赖 `scratch-gui` 的每个仓库（例如 `scratch-www`）的根目录开始：

   i. 确认你已经运行过 `npm install`

   ii. 运行 `npm link scratch-gui`

   iii. 构建或运行这个库

#### 使用 `npm run watch`

你可以使用 `BUILD_MODE=dist npm run watch  ` 代替  `BUILD_MODE=dist npm run build`。它将监听 `scratch-gui` 中代码的变动，并且会自动地重新构建。有时候它是不可靠的。如果你遇到了一些问题，尝试着回到 `BUILD_MODE=dist npm run build` 直到问题得到了解决。

#### ooooops，它没有正常工作

如果不能正常运行，请尝试：

- 按照上边的步骤一步一步走下去，不要改变顺序。在运行 `npm link` 之前运行 `npm install` 是非常重要的，因为在链接之后安装会重置链接。
- 确认各代码库在你的机器上是同一级目录，就像 `.../.../MY_SCRATCH_DEV_DIRECTORY/scratch-gui/` 和 `.../.../MY_SCRATCH_DEV_DIRECTORY/scratch-www/` 。
- 一致的 nodejs 版本：如果你有多个终端 tabs 或者窗口打开了不同的 Scratch 库，请确保都是使用了同一版本的 node。
- 如果没有其它的办法了，在所有的库中运行 `npm unlink` 解除链接，之后重新开始。

## 测试

### 文档

在编写测试时，你可能需要回顾一下 [Jest](https://facebook.github.io/jest/docs/en/api.html) 和 [Enzyme](http://airbnb.io/enzyme/docs/api/) 的相关文档。

查看 [jest cli docs](https://facebook.github.io/jest/docs/en/cli.html#content) 的更多选项。

### 运行测试

*注意：如果你使用的是 window 系统，请使用系统自带的 `cmd.exe` 运行这些命令而不是使用 Git Bash/MINGW64*。

在运行任何测试之前，确保你已经在 scratch-gui 的根目录中运行了 `npm install` 。

#### 主要的测试命令

一次性运行 linter、单元测试、构建和集成测试：

```bash
npm test
```

#### 运行单元测试

独立运行单元测试：

```bash
npm run test:unit
```

在 watch 模式下执行单元测试（监视代码改变并持续执行测试）：

```bash
npm run test:unit -- --watch
```

你可以运行一个集成测试文件（在这个例子中是一个关于按钮的测试）：

```bash
$(npm bin)/jest --runInBand test/unit/components/button.test.jsx
```

#### 运行集成测试

集成测试使用 headless browser 来处理库中生成的静态 html 和 javascript。你不会看到这个过程（虽然当声音播放时，你可以听到）。

注意集成测试需要你首先构建一个可以被浏览器加载的版本：

```bash
npm run build
```

接下来，你可以执行所有的集成测试：

```bash
npm run test:integration
```

或者你可以执行单个文件的集成测试（比如这个 `backpack`  测试）：

```bash
$(npm bin)/jest --runInBand test/integration/backpack.test.js
```

如果你想要在浏览器执行测试时随时监听它，而不是 headless 执行，请使用：

```bash
$(npm bin)/jest --runInBand test/integration/backpack.test.js
```



## 故障排除

### 忽略可选的依赖

当你运行 `npm install` 时，你会看到一些关于可选依赖的警告：

```bash
npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.2.7
```

你可以使用 `no-optional` 关闭它们：

```bash
npm install --no-optional
```

进一步阅读：[Stack Overflow](https://stackoverflow.com/questions/36725181/not-compatible-with-your-operating-system-or-architecture-fsevents1-0-11)

### 解决依赖

当第一次安装依赖时，你需要解决一些警告：

```bash
npm WARN eslint-config-scratch@5.0.0 requires a peer of babel-eslint@^8.0.1 but none was installed.
npm WARN eslint-config-scratch@5.0.0 requires a peer of eslint@^4.0 but none was installed.
npm WARN scratch-paint@0.2.0-prerelease.20190318170811 requires a peer of react-intl-redux@^0.7 but none was installed.
npm WARN scratch-paint@0.2.0-prerelease.20190318170811 requires a peer of react-responsive@^4 but none was installed.
```

你可以检查哪些版本可用：

```bash
npm view react-intl-redux@0.* version
```

你必须要安装的版本：

```bash
npm install  --no-optional --save-dev react-intl-redux@^0.7
```

依赖项本身可能需要更多的依赖项，它将会显示比如说这样：

```bash
user@machine:~/sources/scratch/scratch-gui (491-translatable-library-objects)$ npm install  --no-optional --save-dev react-intl-redux@^0.7
scratch-gui@0.1.0 /media/cuideigin/Linux/sources/scratch/scratch-gui
├── react-intl-redux@0.7.0
└── UNMET PEER DEPENDENCY react-responsive@5.0.0
```

你还需要安装这些：

```bash
npm install  --no-optional --save-dev react-responsive@^5.0.0
```

进一步阅读：[Stack Overflow](https://stackoverflow.com/questions/46602286/npm-requires-a-peer-of-but-all-peers-are-in-package-json-and-node-modules)



## 发布到 GitHub Pages

你可以将 GUI 发布到 github.io 以便其他人可以查看。[Read the wiki for a step-by-step guide.](https://github.com/LLK/scratch-gui/wiki/Publishing-to-GitHub-Pages)

## 赞助

Scratch 是完全免费的，并且将会一直免费！请考虑[赞助](https://secure.donationpay.org/scratchfoundation/)我们，支持我们能够持续地投入到开发、设计、社区建设和资源开发工作。感谢任何金额的赞助，谢谢！

