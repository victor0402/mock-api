const express = require("express");
const app = express();

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));

const buildProperty = (index) => ({
  id: index,
  primaryAddress: "street " + index,
  zip: "00" + index,
  latitude: index,
  longitude: -index,
});

app.get('/properties', properties);

function properties(request, response) {
  let pageSize = +(request.query.offset || 25);
  let currentPage = +(request.query.page || 1);
  const count = 1000000;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const properties = [];
  for (let i = startIndex; i < endIndex; i++) {
    properties.push(buildProperty(i));
  }

  const responseData = {
    page: currentPage,
    limit: pageSize,
    total: count,
    total_pages: Math.ceil(count / pageSize),
    data: properties,
  }

  response.send(responseData);
}
