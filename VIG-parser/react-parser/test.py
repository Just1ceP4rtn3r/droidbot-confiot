import sys, os
import tree_sitter_javascript as tsjavascript
from tree_sitter import Language, Parser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

sys.path.append(BASE_DIR + "/")

PY_LANGUAGE = Language(tsjavascript.language())
parser = Parser(PY_LANGUAGE)

code = None
with open(BASE_DIR + "/main.bundle", "r", encoding="utf-8") as f:
    code = f.read().encode('utf-8')

if (code):
    tree = parser.parse(code)

    # querying the tree
    query = PY_LANGUAGE.query("""
    (function_definition
    name: (identifier) @function.def
    body: (block) @function.block)

    (call
    function: (identifier) @function.call
    arguments: (argument_list) @function.args)
    """)

    print(tree)

    # ...with captures
    captures = query.captures(tree.root_node)

    input()
