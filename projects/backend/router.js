const leadsRouter = require('./routes/leadRoutes')



module.exports = function(app) {
    app.use('/leads', leadsRouter);
}