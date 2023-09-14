import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import { hashPassword } from '../helpers/hash.js';
import bcrypt from 'bcrypt';


// Database modeling for the User entity
export const UserModel = sequelize.define('User', {
        // Model attributes are defined here
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                messge: 'Email already exists'
            },
        },
        date_birth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        // Other model options go here
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: 'User'
});


// Retrieves all users from the database
export async function getAllUsers() {
    try {
      const users = await UserModel.findAll();
  
      if (!users || users.length === 0) {
        throw new Error ('No users were found in the database.');
      };
  
      return users;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Creates a new user in the database
export async function createUser(userToCreate) {
    try {
      const existingUser = await UserModel.findOne({ where: { email: userToCreate.email } });
      if (existingUser) {
        throw new Error ('User already exists');
      };
  
      const hashedPassword = await hashPassword(userToCreate.password);

      const newUser = await UserModel.create({ ...userToCreate, password: hashedPassword });
      return newUser;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Retrieves a single user by ID from the database
export async function getUserById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error ('User not found');
      }
      return user;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Deletes a user from the database
export async function deleteUser(id) {
    try {
        const updatedCount = await UserModel.update({ estado: false }, { where: { id } });
        if (updatedCount[0] === 0) {
          throw new Error ('User not found for soft deletion');
        };

        return 'User soft deleted successfully';
      } catch (error) {
        throw new Error (error.message);
      };
};


// Updates user information in the database
export async function updateUser(userId, updatedUserData) {
    try {
      if (updatedUserData.password) {
        const hashedPassword = await hashPassword(updatedUserData.password);
        updatedUserData.password = hashedPassword;
      };
  
      const [updatedCount] = await UserModel.update(updatedUserData, {
        where: { id: userId },
      });
  
      if (updatedCount === 0) {
        throw new Error ('undefined');
      };
  
      const updatedUser = await getUserById(userId);
  
      return updatedUser;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Checks if a user with the given email and password exists in the database
export async function getUserByEmailAndPassword({ email, password }) {
    try {
      const user = await UserModel.findOne({ where: { email } });
  
      if (!user) {
        throw new Error ('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new Error ('Incorrect password');
      }
  
      return user;
    } catch (error) {
      throw new Error (error.message);
    }
};