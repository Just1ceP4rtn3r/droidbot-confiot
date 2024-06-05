#!/bin/bash

# 指定要检查的目录和要创建文件夹的目标目录
SOURCE_DIRECTORY="./javascript/MihomePlugins/"
# SOURCE_DIRECTORY="/tmp/plugins/"
TARGET_DIRECTORY="/root/documents/Output/PLUGINS/"

# 确保目标目录存在
mkdir -p "$TARGET_DIRECTORY"

# 遍历源目录中的所有文件
for DIR in "$SOURCE_DIRECTORY"/*; do
  for FILE in "$DIR"/*; do
    if [ -f "$FILE" ]; then
        # 提取文件名（去除路径）
        FILENAME=$(basename "$FILE")

        # 提取文件名前缀（去除扩展名）
        NAME="${FILENAME%.*}"

        # 创建目标目录中的相应文件夹
        mkdir -p "$TARGET_DIRECTORY/$NAME"

        # 输出创建的文件夹路径
        echo "Created directory: $TARGET_DIRECTORY/$NAME"

        echo "Created database: $TARGET_DIRECTORY/$NAME/database"

        codeql database create "$TARGET_DIRECTORY/$NAME/database" --language=javascript-typescript --source-root "$DIR"
    fi
  done
done



