/*
  Alphabetical sorting:
  1.z11
  2.z2

  Natural sorting:
  1. z2
  2. z11
*/

const alphaNumericalSort = (a, b) => {
  /*
    The localeCompare() method returns a number indicating whether a reference string comes before, or after, or is the same as the given string in sort order.

    The new locales and options arguments let applications specify the language whose sort order should be used and customize the behavior of the function.
    In older implementations, which ignore the locales and options arguments, the locale and sort order used are entirely implementation-dependent.
    Syntax:
    localeCompare(compareString, locales, options)
  */
  return a.localeCompare(b, undefined, { numeric: true })
}

export { alphaNumericalSort }
