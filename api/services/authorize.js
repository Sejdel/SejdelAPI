async function helper(req, res, next, level) {
    if(req.user) {
        const role = await req.session.role;
        if(role >= level) {
            next();
        } else {
            res.status(401).send({error: 'not authorized'});
        }
    } else {
        res.status(400).send({error: 'not authenticated'});
    }
}


async function isUser(req, res, next) {
    helper(req, res, next, 0);
}

async function isPatron(req, res, next) {
    helper(req, res, next, 1);
}

async function isMod(req, res, next) {
    helper(req, res, next, 2);
}

async function isAdmin(req, res, next) {
    helper(req, res, next, 3)
}


module.exports = {isUser, isPatron, isMod, isAdmin};