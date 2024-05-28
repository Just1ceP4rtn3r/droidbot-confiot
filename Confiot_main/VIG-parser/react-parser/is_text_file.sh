#!/bin/bash

# 指定要检查的目录
BASE_DIRECTORY="./javascript/MihomePlugins"

# 遍历目录中的所有文件
find "$BASE_DIRECTORY" -type f | while read FILE; do
  # 使用file命令检查文件类型
  FILE_TYPE=$(file -b --mime-encoding "$FILE")
  if [ "$FILE_TYPE" == "utf-8" ]; then
    continue
  else
    echo "$FILE: 不是UTF-8文本文件"

    # 提取文件所在的目录
    FILE_DIR=$(dirname "$FILE")

    # 确保不删除顶级MihomePlugins目录
    if [ "$FILE_DIR" != "$BASE_DIRECTORY" ]; then
      echo "删除目录: $FILE_DIR"
      rm -rf "$FILE_DIR"
    else
      echo "跳过删除顶级目录: $BASE_DIRECTORY"
    fi
  fi
done
