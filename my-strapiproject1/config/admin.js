module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4372682946b90ed4379cd397a9bc8b91'),
  },
});
