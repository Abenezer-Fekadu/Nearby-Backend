exports.signupValidator = (req, res) => {
    req.check("firstName", "FirstName is Required").notEmpty();
    req.check("firstName", )
        .isLength({min:2})
        .withMessage("FirstName must contain at least 2 characters")
    
    req.check("lastName", "FirstName is Required").notEmpty();
    req.check("lastName", )
    .isLength({min:2})
    .withMessage("LastName must contain at least 6 characters")
    
    req.check("email", "Email must be between 6 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 6,
            max: 32
        });
    
        req.check("password", "Password is Required").notEmpty();
    req.check("password")
        .isLength({min:6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")

        const errors  = req.validationErrors()
        if (errors){
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({
                error: firstError
            })
        }

        next();
}