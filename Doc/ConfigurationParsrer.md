### Initilaize Configuration Parser

`Class ConfigurationParser`, 使用Agent (`Confiot`) 作为参数，在[settings.py](..\Confiot_main\settings.py)中配置测试的device serial、App apk等。


```python
def test_Configuration_parser():
    from Confiot_main.settings import settings
    from Confiot_main.ConfigurationParser.ConfigurationParser import ConfigurationParser
    from Confiot_main.utils.util import query_config_resource_mapping, parse_config_resource_mapping, get_ConfigResourceMapper_from_file

    Agent = Confiot()

    CP = ConfigurationParser(Agent)
```


**以下操作会在`ConfigurationParser`初始化时自动完成：**
### App Pages Exploration

Input: droidbot output (utg.js等)

Output: Layout-unique Pages, 以及相应的navigations，保存在"Confiot/Pages"目录下

```
        self.PE = PageExplorer(self.Agent)
        self.app_pages_exploration()
        self.pages = self.PE.pages
        self.page_navigation_graph = self.PE.page_navigation_graph
```


过程为：

[app_pages_exploration](..\Confiot_main\ConfigurationParser\ConfigurationParser.py)
```python
    def app_pages_exploration(self):
        self.PE.parse_struture_unique_pages()
        self.PE.extract_navigations()

        if (not os.path.exists(settings.UIHierarchy_comparation_output + "/000/")):
            self.device_state_replay(settings.UIHierarchy_comparation_output + "/000/")
```

1. 解析UTG，获得所有pages
2. 提取pages之间的navigation
3. 第一次执行时，会进行device state replay，记录所有pages xml，保存到UIHierarchy_comparation_output/000



### Operation Extraction


Input: page xml

Output: operations
```
        operations =
        {
            "page-1":
          (
            {
                "1234abdf(viewhash)": [(text, distance), (text, distance)],
            },
            {
                "123abdf": operation_view, // operation_view["bounds"]
            }
          )
        }
```

在ConfigurationParser.py初始化时执行
[operations_extraction](..\Confiot_main\ConfigurationParser\ConfigurationParser.py)

```python
        self.operations = {}
        self.operations_extraction()
```


```python
    def operations_extraction(self):
        page_xmls = {}
        for page in self.pages:
            xml_path = settings.UIHierarchy_comparation_output + "/000/" + f"{page}.xml"
            if (os.path.exists(xml_path)):
                page_xmls[page] = xml_path

        for page in page_xmls:
            operations, hashable_views = OperationExtractor(page_xml_file=page_xmls[page]).extract_operations()
            self.operations[page] = (operations, hashable_views)
```



### Page Context Extraction

提取每个page的context，即上一个page中的某一个、或多个oeprations导致navigate到此page

Input: Pages

Output: Page Contexts

```python
        # Page Contexts
        # {"page-1": [(view, text),]}
        self.page_context = {}
        self.pagecontext_extraction()
```



### LLM

Prompt: [`Confiot_main\prompt\OperationConfigurationMapping.txt`](..\Confiot_main\prompt\OperationConfigurationMapping.txt)

Output: `.../Confiot/ConfigResourceMappingResponse.txt`


```python
self.query_LLM_for_configuration_mapping(settings.Confiot_output)
```



