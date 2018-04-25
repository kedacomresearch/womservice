/**
 * Created by Ganchao on 2018/2/27.
 */

let id = 1;

module.exports = function () {
  if(id >= Number.MAX_SAFE_INTEGER) {
    id = 1;
  }

  return id++;
};
