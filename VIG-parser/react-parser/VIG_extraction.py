import re



# {
#     id: {
#         "raw": "",
#         "dependencies": [id1, id2, id3, ...],
#         "elements": {
#             eid: {
#                 "type": "",
#                 "text": "",
#             }
#         },
#         "navigations": {
#             nid: {
#                 "type": "",
#                 "text": "",
#             }
#         },
#     }
# }
resources = {}


#  __d(...); to be a resource
# __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
#     var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
#     var _miot = _$$_REQUIRE(_dependencyMap[1]);
#     var _src = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
#     _miot.Package.entry(_src.default, function () {
#         console.disableYellowBox = function () { };
#     });
# }, 10001, [14305, 10074, 10004]);
# Note: 部分resource_id 不存在，如_reactNative, 可能是import的库
def get_resources(s):
    match = re.findall(r'__d\((.*?,[ ]?(\d+),[ ]?\[(.*?)\].*?)\);', s,re.DOTALL)
    if match:
        for r in match:
            raw = r[0]
            id = int(r[1])
            dependencies = list(map(int, [i for i in r[1].split(',') if i.strip() != '']))
            resources[id]["raw"] = raw
            resources[id]["dependencies"] = dependencies
        return resources
    return None

# 获取每个resource对应的elements（递归查询），以及相应的type、text
def get_elements(resouce_id):
    raw = resources[resouce_id]["raw"]
    elements = {}
    eid = 0

    match = re.findall(r'createElement\(.*?,[ ]?()', raw,re.DOTALL)





def get_navigations(resouce_id):
    raw = resources[resouce_id]["raw"]

    pass


# 获取每个resource内的interactions
def get_interactions(s):
    pass


if __name__ == '__main__':
    with open('main.bundle', 'r', encoding='utf-8') as file:
        data = file.read()
        print(get_resources(data))

