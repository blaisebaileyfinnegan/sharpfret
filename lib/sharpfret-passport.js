var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, userProvider) {
    passport.use(new LocalStrategy(
                function(username, password, done) {
                    process.nextTick(function () {
                        userProvider.findUserByName(username, function(err, user) {
                            if (err) {
                                return done(err);
                            }

                            if (!user) {
                                return done(null, false, { message: 'Unknown user ' + username });
                            }

                            if (user.password != password) {
                                return done(null, false, { message: 'Invalid password' });
                            }

                            return done(null, user);
                        });
                    });
                }
                ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userProvider.findUserById(id, function(err, user) {
            done(err, user);
        });
    });
}
