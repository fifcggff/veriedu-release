# VeriEdu · Verilog 3D 学习平台

> **代码即电路** —— 写下 Verilog，实时编译，并把网表重建成一块可交互的 3D 电路板，信号在导线上点亮流动。可以接入 Claude 作为助教，也可以在 VS Code / Cursor 里看同一块电路板。
>
> **定位：Verilog 入门可视化学习器。** 内置的是教学引擎，只覆盖 Verilog 的一个子集（组合逻辑 + 基础时序，不含模块例化、层次化、参数化和 generate）。用来建立直觉，不是完整的 Verilog/EDA 仿真器；结果可能与 iverilog / Verilator 等真实仿真器不同。

## 在线使用与下载

| | 地址 |
|---|---|
| 在线打开 | https://fifcggff.github.io/veriedu-release/ |
| 下载安装包 | https://github.com/fifcggff/veriedu-release/releases/latest |

- `veriedu-web-*.zip`：网页静态包。解压到网站根目录，或在该目录运行 `npx serve`。不要用 `file://` 直接双击 `index.html`，浏览器会拦截模块脚本。
- `veriedu-vscode-*.vsix`：在 VS Code / Cursor 里用「Extensions: Install from VSIX…」安装。打开 `.v` 文件后，运行「VeriEdu: 打开 3D 电路板」。

在线版可以上课、做练习、看 3D 电路板和波形，学习进度保存在本机浏览器。没有助教后端时，可在设置里填入自己的 Claude Key，由浏览器直连。评论、邮箱登录和进度云同步需要自行准备后端。

打开网页后：选一课，或在 Playground 里写模块 →「编译并重建电路板」→ 右侧可以切换 **3D 电路板**（拖动旋转、点击输入引脚、播放信号流）、**真值表**、**波形** 和 **AI 导师**。

## 能做什么

- **边学边练的课程。** 27 课，按从零开始、语法、组合、时序、中级 RTL、高级六条路径组织。每课有导览、概念、常见错误、用途，以及穿插其中的练习。组合题用门级结果判分，时序题按时钟逐周期对照，概念题用测验。
- **写下代码，看到电路。** 教学引擎把 Verilog 子集编译成网表，再铺成一块可交互的 3D 电路板：板材、走线、封装、引脚和 LED 会随信号点亮。
- **时序逻辑和波形。** 支持 `always @(posedge clk)`、`reg`、`if/else`、`case`、阻塞与非阻塞赋值。计数器、移位和状态机可以按时钟跑起来，并在波形里逐周期查看。
- **练习、诊断和复习。** 练习中心按单元和难度出题，也可以看电路图反推代码。入门诊断会建议从哪一课开始。错题进错题本，学习面板会指出下一步和该回看的课。
- **进度反馈。** 做对获得经验值；首次通关会得到一朵小花，收进「我的花园」。
- **自由实验。** Playground 不绑定某一课。电路库可以载入多数表决、奇偶校验、多路选择器、格雷码、一位 ALU 等例子再改。另有一块虚拟 OLED：把模块写成按坐标输出像素的显存，带时钟时可以逐帧刷屏。
- **带到真实编辑器和开发板。** VS Code / Cursor 扩展在侧边栏显示同一块 3D 电路板。网页里可以导出 `.v`，或生成把输入输出映射到开发板开关和 LED 的顶层模块。
- **助教。** 设置里填入自己的 Claude Key 后，浏览器直接向 Anthropic 提问；Key 只留在这台浏览器里。没填 Key 时，仍可以用课程、电路板和基于规则的本地反馈。
- **界面。** 可切换简体中文、English、日本語、Español、Français（中英文内容完整，其余界面本地化、正文回退英文），也可调亮度和深浅主题。手机上会改成更适合触控的编辑和布局。

## 教学引擎实际能编译的范围

**组合 / 门级**（驱动 3D 电路板和真值表）：`module`、ANSI 端口、`wire`、标量与向量、位选、`assign`、位运算与三目运算、`and` / `or` / `not` / `buf` / `xor` / `nand` / `nor` / `xnor`，以及常量。

**RTL**（驱动波形和时序练习）：`always @(*)`、`always @(posedge clk)`、`if/else`、`case`、阻塞 `=` 与非阻塞 `<=`、算术、比较、移位、拼接和段选。

两边都还不支持模块例化、层次化、`parameter`、`generate`、二维存储器、`casex` / `casez`，以及 `initial`、延时和 `$display`。测试平台请用 iverilog 或 EDA Playground。

## 使用自己的密钥时

- Claude Key 存在这台浏览器的本地存储里，并由浏览器直接发给 Anthropic。这是自带密钥的用法，不要把 Key 留在别人的电脑上。
- 连接 Notion 时，集成 Token 同样只存在这台浏览器里。它能访问你授权给该集成的内容，只建议在自己的设备上粘贴。

## 项目贡献者

| 贡献者 | GitHub |
| --- | --- |
| fifcggff | https://github.com/fifcggff |
| Claude | https://github.com/claude |
| Gemini | https://github.com/gemini-code-assist |
