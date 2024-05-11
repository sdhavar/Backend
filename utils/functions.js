

function throwCustomError(code, msg) {
    throw new Error(JSON.stringify({ code, msg }));
}



function respondWithError(res, e) {
    let err;
    try {
        err = JSON.parse(e.message);
    } catch (parseError) {
        console.error('Error parsing e.message:', parseError);
        err = { code: 500, msg: e.message };
    }
    res.status(err.code).json({
        mensaje: "Fallido. ✌",
        err: err.msg,
    })
}


module.exports = {
    throwCustomError,
    respondWithError
}