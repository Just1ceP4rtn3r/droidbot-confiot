import sys, os
import tree_sitter_javascript as tsjavascript
from tree_sitter import Language, Parser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

sys.path.append(BASE_DIR + "/")

PY_LANGUAGE = Language(tsjavascript.language())
parser = Parser(PY_LANGUAGE)

code = None
with open(BASE_DIR + "/javascript/test/test.js", "r", encoding="utf-8") as f:
    code = f.read().encode('utf-8')


def dump_tree():
    if (code):
        tree = parser.parse(code)
        print(tree.root_node)


def query():
    if (code):
        tree = parser.parse(code)

        # querying the tree
        query = PY_LANGUAGE.query("""
        (call_expression
            function: [
                ((identifier) @function (#match? @function ".*createStackNavigator"))
                (member_expression property: ((property_identifier) @function_1 (#match? @function_1 ".*createStackNavigator")))
                (parenthesized_expression (sequence_expression (member_expression property: ((property_identifier) @function_2 (#match? @function_2 ".*(createStackNavigator|LHInitPage)")))))
                ]
            .
            arguments: (arguments . (_) @screens . (object . (pair key: (_) value: (_) @initialRouteName))? . (_)*)
        )
        """)

        # print(tree.root_node)

        # ...with captures
        matches = query.matches(tree.root_node)
        # for m in matches:
        #     if (m[1]):
        #         function = m[1]["function"]
        #         element_type = m[1]["element_type"]
        #         element_options = m[1]["element_options"]
        input()


if __name__ == "__main__":
    query()
