const validate=(schema)=>{
    return async(req,res,next)=>{
        try {
            console.log('beforeParseBody')
            console.log('req.body:',req.body)
            const parseBody=await schema.parseAsync(req.body)
            req.body=parseBody
            console.log('after req.body:',req.body)
            next()
        } catch (error) {
            console.log(error)
            if (error.name === 'ZodError') {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({
                    message: errors
                });
            } else {
                res.status(400).json({
                    errors: [error.message]
                });
            }
        }
    }
}

module.exports=validate