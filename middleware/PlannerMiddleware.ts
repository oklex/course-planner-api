export const PlannerMiddleware = {
    validateCreation: async (req, res, next) => {
        // input needs to have a degree and major
        let degree = req.body.degree
        let major = req.body.major
        if (!degree) {
            return res.status(400).send('no degree defined; degree is required')
        } else if (!major) {
            return res.status(400).send('no major defined; major is required')
        } else {
            next()
        }
    }

    

}

export default PlannerMiddleware