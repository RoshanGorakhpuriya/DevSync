const adminAuth = (req , res , next)=>{
    console.log("Authorized checked")
    const token = "xyzabc"

    const isAdminAuth = token === "xyzabc";

    if(!isAdminAuth){
        console.log("Admin not Authorized");
        return res.status(403).send("Not Authorized");
    }

    else{
        next();
    }
}
const userAuth = (req , res , next)=>{
    console.log("Authorized checked")
    const token = "xyzabc"

    const isUserAuth = token === "xyzabc";

    if(!isUserAuth){
        console.log("Admin not Authorized");
        return res.status(403).send("Not Authorized");
    }

    else{
        next();
    }
}
const guestAuth = (req , res , next)=>{
    console.log("Guests Authorized Check");
    const token = "xyzabc";

    const isGuestAuth = token === "xyzabc";
    if(!isGuestAuth){
        console.log("Guests Not Authorized");
        return res.status(403).send("Not authorized");
    }

    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
    guestAuth,
}