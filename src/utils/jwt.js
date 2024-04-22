import jwt from "jsonwebtoken";
// Clave secreta para firmar y verificar los tokens JWT.
const private_key = "coderHouse";

// Genera un token JWT basado en la información del usuario y lo almacena en una cookie
const generationToken = (user, res) => {
    // Genera el token JWT
    const token = jwt.sign(user, private_key, { expiresIn: "1h" });

    // Configura la cookie para almacenar el token JWT
    res.cookie("coderHouseToken", token, { httpOnly: true, maxAge: 3600000 }); // MaxAge en milisegundos

    return token;
};

export default generationToken;