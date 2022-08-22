module.exports = {
    routes: [
      {
        method: "POST",
        path: "/post-tables/csv",
        handler: "post-table.createMany",
      }
    ],
  };