function ordenarJsonArray(jsonArray, prop, asc) {
  var result = jsonArray.sort(function(a, b) {
    var aProp = a[prop] != "-" ? a[prop] : null;
    var bProp = b[prop] != "-" ? b[prop] : null;
    if (asc) {
      return aProp > bProp ? 1 : aProp < bProp ? -1 : 0;
    }
    return bProp > aProp ? 1 : bProp < aProp ? -1 : 0;
  });
  return result;
}
