(call_expression
    function: [
        ((identifier) @function (#match? @function ".*createElement"))
        (member_expression property: ((property_identifier) @function (#match? @function ".*createElement")))
        ]
    .
    arguments: (arguments . (_) @element_type . (_) @element_options . (_)*)
)
