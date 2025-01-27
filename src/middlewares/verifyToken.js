const verifyToken =  (req,res,next) => {
  const authorization_header = req.headers['authorization']
  if (authorization_header !== undefined) {
    console.log(authorization_header)
    const token = authorization_header.split(" ")[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } else {
    console.log('no se ingreso el token')
  }
  next()
}

exports.verifyToken = verifyToken