import os


# 1. 分析所有的plugins中多少存在角色区分
def analyze_sharing_content(Plugin_Output):
    not_empty = []
    if not os.path.isdir(Plugin_Output):
        print("The provided path is not a valid directory.")
        return

    for dirpath, models, filenames in os.walk(Plugin_Output):
        for model in models:
            for _, _, filenames in os.walk(dirpath + "/" + model):
                for file in filenames:
                    if ("js-results" in file):
                        if os.path.getsize(dirpath + "/" + model + "/" + file) != 0:
                            not_empty.append(model)
                            print(model)
                # file_path = os.path.join(dirpath, filename)
                # if is_file_empty(file_path):
                #     empty_files.append(file_path)
                # else:
            #     non_empty_files.append(file_path)

    print(len(not_empty), 100, len(not_empty) / 100)


def is_file_empty(file_path):
    """Check if a file is empty."""
    return os.path.getsize(file_path) == 0


def 



if __name__ == "__main__":
    analyze_sharing_content("/root/documents/Output/PLUGINS/")
