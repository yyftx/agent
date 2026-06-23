# E盘重复文件清理方案

## 背景
用户希望清理 E 盘中的重复文件，按文件名相同判定重复，将重复项移到回收站（可恢复），扫描整个 E 盘。

## 方案概述
编写一个 Python 脚本，遍历 E 盘所有文件，按文件名分组找出重复文件，保留每组中的第一个文件，将其余重复文件通过 `send2trash` 库移到回收站。

## 实现步骤

### 1. 安装依赖
```bash
pip install send2trash
```
`send2trash` 是跨平台的回收站操作库，Windows 下会将文件移到回收站而非永久删除。

### 2. 创建清理脚本 `cleanup_e_drive.py`
脚本逻辑：
- 递归遍历 E 盘 (`E:\`) 所有文件和文件夹
- 用字典按**文件名**（不包含路径）分组，记录每个文件名的所有完整路径
- 跳过无法访问的文件夹（权限不足等），打印警告继续
- 对于每个文件名有 ≥2 个路径的组：
  - 保留**路径最短**的那个（通常是层级较浅、较"原始"的位置）
  - 其余文件调用 `send2trash` 移到回收站
- 输出详细报告：哪些文件被移除了，保留的是哪个

### 3. 安全措施
- 先用 `--dry-run` 模式预览，列出所有重复文件而不实际操作
- 确认无误后再用 `--execute` 执行实际移动
- 每次操作都记录日志到 `e_drive_cleanup_log.txt`

### 4. 脚本结构
```python
import os
import argparse
from send2trash import send2trash
from collections import defaultdict

def scan_drive(root_path):
    """遍历磁盘，按文件名分组"""
    ...

def find_duplicates(file_dict):
    """找出有重复的文件组"""
    ...

def remove_duplicates(duplicates, dry_run=True):
    """将重复文件移到回收站"""
    ...

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', default=True)
    parser.add_argument('--execute', action='store_true')
    ...
```

## 涉及文件
- `cleanup_e_drive.py` — 新建的清理脚本（放在项目根目录）

## 验证方法
1. 先运行 `python cleanup_e_drive.py --dry-run` 查看预览结果
2. 确认重复文件列表合理后，运行 `python cleanup_e_drive.py --execute` 执行清理
3. 检查回收站确认文件已被移入
4. 查看生成的日志文件确认操作记录
