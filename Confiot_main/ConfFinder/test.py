from LabelResolution import *



view_1  = Rectangle(582,1147,667,1194)
view_2  = Rectangle(157,1156,555,1186)


print(calc_collision_vector(view_1, view_2)) # Expected: [Vector((582, 1147), (555, 1156), 180.0), Vector((667, 1194), (555, 1186), 180.0)]
