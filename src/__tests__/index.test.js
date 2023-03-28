 let utils = require("../utils");
 const {formatDate} = require("@/utils");

describe("Headers", () => {
    test('Headers should be set', () => {
        expect(utils.getHeaders()["Access-Control-Allow-Origin"]).toBe('*');
        expect(utils.getHeaders()["Access-Control-Allow-Methods"]).toBe('GET,PUT,POST,DELETE,PATCH,OPTIONS');
    });

});

 describe("Date Formatting", () => {
     test(' should result in "28/3/2023"', () => {
         expect(utils.formatDate(new Date(1679955863329))).toBe("28/3/2023");
     });
     test ("Display an error, when user pass incorrect data",()  => {
         expect(utils.formatDate(new Date(123))).toBe("1/1/1970") });

 });
