/**
 * Created by Ganchao on 2018/4/24.
 */

let id = 0;

module.exports.sleep = function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

module.exports.id = function (moduleName) {
  if(id >= Number.MAX_SAFE_INTEGER) {
    id = 0;
  }
  return moduleName + (id++);
};
