// Passport con estrategia de autenticación y autorización.
import passport from "passport";
import jwt from "passport-jwt";
import GitHubStrategy from "passport-github2";


const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
        //Misma palabra secreta que usaste en la app. guarda! ojo! 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))


    // passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    //     try {
    //         //Primero verifico si existe un usuario con ese email: 
    //         const user = await UserModel.findOne({ email });
    //         if (!user) {
    //             console.log("User not found");
    //             return done(null, false);
    //         }

    //         //Si existe verifico la contraseña:
    //         if (!isValidPassword(password, user.password)) return done(null, false);

    //         return done(null, user);
    //     } catch (error) {
    //         return done(error);
    //     }
    // }));

    // // Serializar User:
    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     let user = await UserModel.findById({ _id: id });
    //     done(null, user)
    // });

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.b1b1bb9978f789db",
        clientSecret: "258791470c6646f0eaa07554df5770541a57ac68",
        callbackURL: "http://localhost:8080/github",
        scope: ['user', 'users:email']
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        const user = await UserModel.findOne({ email });
        if (user) return done(null, user);
        const newUser = await UserModel.create({
            first_name: profile._json.name,
            email,
            password: " ",
            image: profile._json.avatar_url,
            isGithub: true,
        });
        return done(null, newUser);
    }));

};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderHouseToken"];
    }
    return token;
};

export default initializePassport;

