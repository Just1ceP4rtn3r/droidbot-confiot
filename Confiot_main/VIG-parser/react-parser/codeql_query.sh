#!/bin/bash

# 指定要检查的目录和要创建文件夹的目标目录
SOURCE_DIRECTORY="./javascript/MihomePlugins/"
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

        # 输出创建的文件夹路径
        echo "Analyzing: $TARGET_DIRECTORY/$NAME/database........................."

        codeql database analyze $TARGET_DIRECTORY/$NAME/database  /root/documents/droidbot-confiot/Confiot_main/VIG-parser/react-parser/javascript/codeql_queries/shared.ql --sarif-category=javascript-typescript --format=csv --output=$TARGET_DIRECTORY/$NAME/js-results.csv
    fi
  done
done



