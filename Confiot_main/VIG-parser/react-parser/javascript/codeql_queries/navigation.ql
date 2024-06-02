/**
 * @name test
 * @kind problem
 * @problem.severity warning
 * @id testtest
 */

import javascript

predicate shared_condition(Expr exp) {
  exp.(DotExpr).getPropertyName() = "ID" and
  exp.(DotExpr).getAChild().(DotExpr).getPropertyName() = "owner"
  or
  exp.(DotExpr).getPropertyName() = "isOwner" and
  exp.(DotExpr).getAChild().(DotExpr).getPropertyName() = "Device"
  or
  exp.(DotExpr).getPropertyName() = "isFamily" and
  exp.(DotExpr).getAChild().(DotExpr).getPropertyName() = "Device"
  or
  exp.(DotExpr).getPropertyName() = "isShared" and
  exp.(DotExpr).getAChild().(DotExpr).getPropertyName() = "Device"
}

predicate get_root_ifstmt(IfStmt stmt, IfStmt target) {
  not stmt.getParentStmt() instanceof IfStmt and target = stmt
  or
  stmt.getParentStmt() instanceof IfStmt and get_root_ifstmt(stmt.getParentStmt(), target)
}

predicate shared_block(Expr exp, ExprOrStmt target) {
  exists(IfStmt stmt | exp = stmt.getCondition().getAChild*() and get_root_ifstmt(stmt, target))
  or
  exists(ConditionalExpr stmt | exp = stmt.getCondition().getAChild*() and stmt = target)
}

// data-flow analysis
class NavigationConfig extends DataFlow::Configuration {
  NavigationConfig() { this = "NavigationConfig" }

  override predicate isSource(DataFlow::Node nd) { exists(DataFlow::CallNode c | c = nd) }

  override predicate isSink(DataFlow::Node nd) {
    exists(DataFlow::InvokeNode c | c = nd and c.getACallee().getName() = "navigate")
  }

  override predicate isAdditionalFlowStep(DataFlow::Node pred, DataFlow::Node succ) {
    succ.(DataFlow::PropRead).getBase() = pred
    or
    // 例如：var isShared = !_miot.Device.isOwner;
    // isOwner可以传播到 !_miot.Device.isOwner
    succ.asExpr() instanceof BinaryExpr and succ.asExpr().getAChild*() = pred.asExpr()
    or
    succ.asExpr() instanceof UnaryExpr and succ.asExpr().getAChild*() = pred.asExpr()
  }
}

predicate recursive_caller(Function caller, Function callee) {
  exists(DataFlow::InvokeNode call |
    caller = call.getEnclosingExpr().getEnclosingFunction() and
    callee = call.getACallee()
  )
  or
  exists(DataFlow::InvokeNode call |
    caller = call.getEnclosingExpr().getEnclosingFunction() and
    recursive_caller(call.getACallee(), callee)
  )
  or
  caller = callee
}

from Function caller, Function callee, InvokeExpr invoke
where
  invoke.getCalleeName() = "navigate" and
  callee = invoke.getEnclosingFunction() and
  recursive_caller(caller, callee)
select caller, callee
n
