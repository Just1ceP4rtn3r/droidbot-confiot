(call_expression
    function: [
        ((identifier) @function (#match? @function ".*createStackNavigator"))
        (member_expression property: ((property_identifier) @function (#match? @function ".*createStackNavigator")))
        (parenthesized_expression (sequence_expression (member_expression property: ((property_identifier) @function (#match? @function ".*createStackNavigator")))))
        ]
    .
    arguments: (arguments (_)*)
)
