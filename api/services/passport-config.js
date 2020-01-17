const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

async function getUserByEmail(email) {
    const user = await db.select('*')
        .from('users')
        .where({ email : email})
    return user[0];
}

async function getUserById(id) {
    const user = await db.select('*')
        .from('users')
        .where({ id : id})
    return user[0];
}

function initialize(passport) {
    const authUser = async (email, password, done) =>  {
        const user = await getUserByEmail(email);

        if (user == null) {
            return done(null, false, {message : 'User not found'});
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Wrong password'});
            }
        } catch (e){
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authUser));

    passport.serializeUser((user, done) => {
        return done(null,user.id);
    })

    passport.deserializeUser((id, done) => {
        const user = getUserById(id);
        return done(null, user);
    })
}

module.exports = initialize