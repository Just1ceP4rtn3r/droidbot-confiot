import javascript

predicate is_shared_block(DotExpr de) {
  de.getPropertyName() = "ID" and de.getAChild().(DotExpr).getPropertyName() = "owner"
}

from Expr exp
where is_shared_block(exp)
select exp, exp.(DotExpr).getBase().(DotExpr).getProperty(), "Dead store of local variable."
