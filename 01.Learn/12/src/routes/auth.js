app.post('/register', async (req, res) => 
{
    try 
    {
        const {email, password} = req.body;
        
        const isUserExist = await User.finOne({email});

        if(isUserExist)
        {
            return res.status(404).send({message: "The User Already Exists"});
        } 
    
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({email, hashPassword});
        await user.save();

        res.status(201).send({message: "User Create Succesfully"});
    }
        
    catch (error) 
    {
        res.status(500).sed({message: "Internal Server Error"});     
    }
});