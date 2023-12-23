const User = require('../models/UserScheme');


const getAllUsers = async () => {
    return await User.find();
}

const getUserById = async (id) => {
    if (id) {
        try{
            const user = await User.findById(id).select("-password").populate({
                  path: 'songs',
                  model: 'song'
            });
            if(user){
                return user;
            }
            return null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

const getUserByName = async (name) => { //todo: check if needed
    if (name) {
        try{
            const user = await User.findOne({name});
            if(user){
                return user;
            }
            return null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Name is required');
}

const getUserByEmail = async (email) => {
    if (email) {
        try{
            const user = await User.findOne({email});
            if(user){
                return user;
            }
            return null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Email is required');
}

const createUser = async (user) => {
    if (user) {
        try{
            const {name, email, password} = user;
            if(!name || !email || !password){
                throw new Error('Name, email and password are required');
            }
            if(await getUserByEmail(email)){
                throw new Error('Email already exists');
            }
            //const id = (email+name).replace(/\s/g, '_');
            const newUser = new User({...user})
            await newUser.save();
            return newUser;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('User is required');
}

const createGoogleUser = async (user) => {
    if (user) {
        try{
            const {name, email, profile_image} = user;
            user['password'] = name+email;
            if(!name || !email){
                throw new Error('Name and email are required');
            }
            const newUser = new User({...user})
            await newUser.save();
            return newUser;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}



const deleteUser = async (id) => {
    if (id) {
        try{
            const user = await User.findByIdAndDelete(id);
            if(user){
                return user;
            }
            return null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

const updateUser = async (id, newUser) => {
    if(id && newUser){
        try{
            await User.findOneAndUpdate({_id: id}, newUser);
            return newUser;
        } catch(error){
            throw new Error(error.message)
        }
    }
    throw new Error('Id and new user are required');
   
}

const addOrderToUser = async (id, orderID) => {
    if (id) {
        try{
            const user = await User.findById(id);
            if(user){
                user.orders.push(orderID);
                updateUser(id, user);
                return orderID;
            }
            return null;
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}

const addSongsToUser = async (id, songs) => {
    if (id) {
        try{
            const user = await User.findById(id);
            if(user){
                for(let i = 0; i < songs.length; i++){
                    user.songs.push(songs[i]);
                }
                await updateUser(id, user);
                return user;
            }
            throw new Error('User not found');
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}



module.exports = {
    addOrderToUser,
    addSongsToUser,
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser,
    createGoogleUser
}

