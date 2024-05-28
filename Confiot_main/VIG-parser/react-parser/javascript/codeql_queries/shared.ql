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
class SharedVariableConfig extends DataFlow::Configuration {
  SharedVariableConfig() { this = "SharedVariableConfig" }

  override predicate isSource(DataFlow::Node nd) { shared_condition(nd.asExpr()) }

  override predicate isSink(DataFlow::Node nd) { any() }

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

from SharedVariableConfig cfg, DataFlow::Node source, DataFlow::Node sink, ExprOrStmt target
where
  cfg.hasFlow(source, sink) and
  (shared_block(source.asExpr(), target) or shared_block(sink.asExpr(), target))
select target, "This is the target statements"
