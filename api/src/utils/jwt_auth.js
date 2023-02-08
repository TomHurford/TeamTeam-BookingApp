// This is the util that is used to Authenticate a user using a JWT token

const jwt = require('jsonwebtoken')

async function authenticate(req) {
    // Decode the JWT token
    // The JWT token is sent in the Authorization header, it is prefixed with 'Bearer '
    if (!req.headers.authorization) {
        return new Promise((resolve, reject) => {
            reject('Unauthorized')
        })
    }
    const token = req.headers.authorization.split(' ')[1]
    // try to decode the token if error return false
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (e) {
        console.log(e)
        decoded = false
    }
    return new Promise((resolve, reject) => {
        // If the token is valid, resolve the promise and return the decoded token
        if (decoded) {
            resolve(decoded)
        } else {
            reject('Unauthorized')
        }
    })
}

async function authenticateAdmin(req) {
    return new Promise((resolve, reject) => {
        // The JWT token is sent in the Authorization header, it is prefixed with 'Bearer '
        if (!req.headers.authorization) {
            reject('Unauthorized')
        }
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err)
            }
            if (decoded.admin) {
                resolve(decoded)
            } else {
                reject('Unauthorized')
            }
        }, (err) => {
            reject(err)
        })
    })
}

async function generateToken(user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject('User not found')
        }
        // If user type is 1, the user is an admin and the admin flag is set to true
        const admin = user.type === 1
        const token = jwt.sign({ id: user.id, admin: admin }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        })
        resolve(token)
    })
    // if (!user) {
    //     throw new Error('User not found')
    // }
    // // If user type is 1, the user is an admin and the admin flag is set to true
    // const admin = user.type === 1
    // const token = jwt.sign({ id: user.id, admin: admin }, process.env.TOKEN_SECRET, {
    //     expiresIn: 86400 // expires in 24 hours
    // })
    // return token
}

module.exports = {
    authenticate,
    authenticateAdmin,
    generateToken
}