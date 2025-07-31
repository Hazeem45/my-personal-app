export const handlebarsHelpers = {
  includes: function (array: any[], value: any) {
    return Array.isArray(array) && array.includes(value);
  },
};
