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
        (pair
            key: (_) @key
            .
            value: (string) @val
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
    dump_tree()
