import math
from typing import List, Tuple

# A simple representation of a 2D coordinate
class Coordinate:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Coordinate({self.x}, {self.y})"

# A rectangle defined by its top-left and bottom-right coordinates
class Rectangle:
    def __init__(self, left: int, top: int, right: int, bottom: int):
        self.left = left
        self.top = top
        self.right = right
        self.bottom = bottom

    def get_top_left(self):
        return Coordinate(self.left, self.top)

    def get_top_right(self):
        return Coordinate(self.right, self.top)

    def get_bottom_left(self):
        return Coordinate(self.left, self.bottom)

    def get_bottom_right(self):
        return Coordinate(self.right, self.bottom)

    def __repr__(self):
        return f"Rectangle({self.left}, {self.top}, {self.right}, {self.bottom})"

# A vector that holds two coordinates and the angle between them
class Vector:
    def __init__(self, start: Coordinate, end: Coordinate, angle: float):
        self.start = start
        self.end = end
        self.angle = angle

    def get_magnitude(self):
        return math.sqrt((self.end.x - self.start.x) ** 2 + (self.end.y - self.start.y) ** 2)

    def __repr__(self):
        return f"Vector(Start: {self.start}, End: {self.end}, Angle: {self.angle}, Magnitude: {self.get_magnitude()})"

# Collision predictor functions
USE_THIRD_VECTOR = True
DISTANCE_THRESHOLD = 0  # 10 pixels
MAX_DIST = 80.00

def get_collision_vector(rect1: Rectangle, rect2_list: List[Rectangle]):
    results = []
    for rect2 in rect2_list:
        v = calc_collision_vector(rect1, rect2)
        if(v.get_magnitude() < MAX_DIST):
            results.append(rect2)
    return results

def calc_collision_vector(rect1: Rectangle, rect2: Rectangle):
    v = None
    if contained_in_top(rect1, rect2) or contained_in_bottom(rect1, rect2):
        v= calc_collision_vector_w(rect1, rect2, contained_in_top(rect1, rect2))[0]
    v = calc_collision_vector_h(rect1, rect2, contained_in_left(rect1, rect2))[0]
    if(v and v.get_magnitude() < MAX_DIST):
        return v
    return None

def contained_in_top(r1: Rectangle, r2: Rectangle) -> bool:
    return r2.bottom <= r1.top

def contained_in_bottom(r1: Rectangle, r2: Rectangle) -> bool:
    return r2.top >= r1.bottom

def contained_in_left(r1: Rectangle, r2: Rectangle) -> bool:
    return r2.right <= r1.left

def calc_collision_vector_w(r1: Rectangle, r2: Rectangle, is_above: bool) -> List[Vector]:
    v1 = Vector(
        r1.get_top_left() if is_above else r1.get_bottom_left(),
        r2.get_bottom_left() if is_above else r2.get_top_left(),
        90.0 if is_above else 270.0
    )
    v2 = Vector(
        r1.get_top_right() if is_above else r1.get_bottom_right(),
        r2.get_bottom_right() if is_above else r2.get_top_right(),
        90.0 if is_above else 270.0
    )

    if is_entirely_above_or_below(r1, r2):
        v3_coors = get_common_coordinates_w(r1, r2, is_above)
        v3 = Vector(v3_coors[0], v3_coors[1], 90.0 if is_above else 270.0)
        if USE_THIRD_VECTOR:
            return sort_by_magnitude([v1, v2, v3])

    return [v1, v2] if v1.get_magnitude() <= v2.get_magnitude() else [v2, v1]

def is_entirely_above_or_below(r1: Rectangle, r2: Rectangle) -> bool:
    return (r1.left >= r2.left - DISTANCE_THRESHOLD and r1.right <= r2.right + DISTANCE_THRESHOLD) or (r2.left >= r1.left - DISTANCE_THRESHOLD and r2.right <= r1.right + DISTANCE_THRESHOLD)

def get_common_coordinates_w(r1: Rectangle, r2: Rectangle, is_above: bool) -> Tuple[Coordinate, Coordinate]:
    i = r1.left
    while i < r1.right:
        if r2.left <= i <= r2.right:
            break
        i += 1
    return (
        Coordinate(i, r1.top if is_above else r1.bottom),
        Coordinate(i, r2.bottom if is_above else r2.top)
    )

def calc_collision_vector_h(r1: Rectangle, r2: Rectangle, is_left: bool) -> List[Vector]:
    v1 = Vector(
        r1.get_top_left() if is_left else r1.get_top_right(),
        r2.get_top_right() if is_left else r2.get_top_left(),
        180.0 if is_left else 0.0
    )
    v2 = Vector(
        r1.get_bottom_left() if is_left else r1.get_bottom_right(),
        r2.get_bottom_right() if is_left else r2.get_bottom_left(),
        180.0 if is_left else 0.0
    )

    if is_entirely_left_or_right(r1, r2):
        v3_coors = get_common_coordinates_h(r1, r2, is_left)
        v3 = Vector(v3_coors[0], v3_coors[1], 180.0 if is_left else 0.0)
        if USE_THIRD_VECTOR:
            return sort_by_magnitude([v1, v2, v3])

    return [v1, v2] if v1.get_magnitude() <= v2.get_magnitude() else [v2, v1]

def is_entirely_left_or_right(r1: Rectangle, r2: Rectangle) -> bool:
    return (r1.top >= r2.top - DISTANCE_THRESHOLD and r1.bottom <= r2.bottom + DISTANCE_THRESHOLD) or (r2.top >= r1.top - DISTANCE_THRESHOLD and r2.bottom <= r1.bottom + DISTANCE_THRESHOLD)

def get_common_coordinates_h(r1: Rectangle, r2: Rectangle, is_left: bool) -> Tuple[Coordinate, Coordinate]:
    i = r1.top
    while i < r1.bottom:
        if r2.top <= i <= r2.bottom:
            break
        i += 1
    return (
        Coordinate(r1.left if is_left else r1.right, i),
        Coordinate(r2.right if is_left else r2.left, i)
    )

def sort_by_magnitude(vectors: List[Vector]) -> List[Vector]:
    return sorted(vectors, key=lambda v: v.get_magnitude())
