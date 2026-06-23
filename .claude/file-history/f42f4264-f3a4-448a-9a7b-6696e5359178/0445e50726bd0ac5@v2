# 将 Claude Code 数据迁移到 E:\agent\

## Context

当前 Claude Code 数据结构：
- 程序本体：`C:\Users\ASUS\AppData\Roaming\npm\` （C 盘，不动）
- 数据目录：`C:\Users\ASUS\.claude` → Junction → `E:\Claude\.claude` （~113 MB）
- 另有一份过期拷贝 `E:\.claude-data\` （578 个文件，6月3日）

用户要求：在 E 盘创建 `E:\agent\` 作为所有 Claude 相关内容的统一根目录，并在其下分类管理。

## 目标结构

```
E:\agent\
  ├── .claude\              ← Claude Code 运行时数据（原 E:\Claude\.claude）
  │   ├── sessions\         ← 对话记录
  │   ├── projects\         ← 项目记忆
  │   ├── plans\            ← 计划文件
  │   ├── tasks\            ← 任务跟踪
  │   ├── file-history\     ← 文件修改历史
  │   ├── backups\          ← 自动备份
  │   ├── plugins\          ← 已安装插件
  │   ├── skills\           ← 已安装技能
  │   └── ...
  └── outputs\              ← 用户要求产出的文件（代码、图表、文档等）
```

## 执行步骤

### Step 1: 创建新目录结构
- 创建 `E:\agent\`
- 创建 `E:\agent\outputs\`

### Step 2: 迁移 Claude Code 数据
- `robocopy E:\Claude\.claude E:\agent\.claude /E /COPYALL /R:3 /W:5`
- 验证文件数和大小一致

### Step 3: 更新 Junction
- 删除旧 Junction: `cmd /c rmdir C:\Users\ASUS\.claude`
- 创建新 Junction: `cmd /c mklink /J C:\Users\ASUS\.claude E:\agent\.claude`

### Step 4: 清理旧数据
- 删除 `E:\Claude\` （旧数据目录）
- 删除 `E:\.claude-data\` （过期拷贝）

### Step 5: 验证
- 确认 Junction 指向正确
- 确认 Claude Code 会话正常（读写 .claude 正常）
- 确认 outputs 目录可用

## 注意事项

- Junction 删除不会影响目标数据（只删除链接本身）
- 迁移期间当前会话可能短暂无法写入会话记录，但不影响运行
- 后续产出文件默认建议存到 `E:\agent\outputs\`
