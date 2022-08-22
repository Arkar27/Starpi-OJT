module.exports = {
    routes: [
      {
        method: "POST",
        path: "/change-password",
        handler: "hello.changePassword",
        config: {
            // policies: ['global::is-authenticated']
        }
      },
      
    ],
    
  };