import { getAllUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        getUserByEmailAndPassword } from "../services/userServices.js";
import { createJWT } from "../helpers/jsonwebtoken.js";



// Controller to get all users
export const ctrlGetAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers()
  
      if (!users) {
         res.status(404)
      }
  
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error.message)
    }
};


// Controller to get a single user by ID
export const ctrlGetUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const oneUser = await getUserById(userId)
  
      if (!oneUser) {
         res.status(404)
      }
  
      res.status(200).json(oneUser)
    } catch (error) {
      res.status(500).json(error.message)
    }
};


// Controller to create a new user
export const ctrlCreateUser = async (req, res) => {
    try {
        const user = await createUser(req.body)
    
        const token = await createJWT({ user: user.id })
    
        res.status(200).json({ message: "User created", token })
      } catch (error) {
        res.status(500).json(error.message)
      }
};


// Controller to delete a user by ID
export const ctrlDeleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        
        if (!deletedUser) {
             res.status(404);
        }
        
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


// Controller to update a user's information by ID
export const ctrlUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await updateUser(userId, req.body);

    if (!updatedUser) {
       res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};


// Controller for user login
export const ctrlLoginUser = async (req, res) => {
    try {
      const user = await getUserByEmailAndPassword(req.body)
  
      if (!user) {
         res.status(404).json({ error: 'User not found' });
      };

      const token = await createJWT({ user: user.id })
  
      res.status(200).json(token)
    } catch (error) {
      res.status(500).json(error.message)
    }
};