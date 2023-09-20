import { EnterpriseModel } from '../models/enterprise.js';
import { hashPassword } from '../helpers/hash.js';
import bcrypt from 'bcrypt';



// Retrieves all enterprise's from the database
export async function getAllEnterprise() {
    try {
      const enterprises = await EnterpriseModel.findAll();
  
      if (!enterprises || enterprises.length === 0) {
        throw new Error ('No enterprices were found in the database.');
      };
  
      return enterprises;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Creates a new enterprise in the database
export async function createEnterprise(enterpriseToCreate) {
    try {
      const existingEnterprise = await EnterpriseModel.findOne({ where: { email: enterpriseToCreate.email } });
      if (existingEnterprise) {
        throw new Error ('Enterprise already exists');
      };
  
      const hashedPassword = await hashPassword(enterpriseToCreate.password);

      const newEnterprise = await EnterpriseModel.create({ ...enterpriseToCreate, password: hashedPassword });
      return newEnterprise;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Retrieves a single enterprise by ID from the database
export async function getEnterpriseById(enterpriseId) {
    try {
      const enterprise = await EnterpriseModel.findByPk(enterpriseId);
      if (!enterprise) {
        throw new Error ('Enterprise not found');
      }
      return enterprise;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Deletes a enterprise from the database
export async function deleteEnterprise(id) {
    try {
        const updatedCount = await EnterpriseModel.update({ estado: false }, { where: { id } });
        if (updatedCount[0] === 0) {
          throw new Error ('Enterprise not found for soft deletion');
        };

        return 'Enterprise soft deleted successfully';
      } catch (error) {
        throw new Error (error.message);
      };
};


// Updates enterprise information in the database
export async function updateEnterprise(enterpriseId, updatedEnterpriseData) {
    try {
      if (updatedEnterpriseData.password) {
        const hashedPassword = await hashPassword(updatedEnterpriseData.password);
        updatedEnterpriseData.password = hashedPassword;
      };
  
      const [updatedCount] = await EnterpriseModel.update(updatedEnterpriseData, {
        where: { id: enterpriseId },
      });
  
      if (updatedCount === 0) {
        throw new Error ('undefined');
      };
  
      const updatedEnterprise = await getEnterpriseById(enterpriseId);
  
      return updatedEnterprise;
    } catch (error) {
      throw new Error (error.message);
    }
};


// Checks if a enterprise with the given email and password exists in the database
export async function getEnterpriseByEmailAndPassword({ email, password }) {
    try {
      const enterprise = await EnterpriseModel.findOne({ where: { email } });
  
      if (!enterprise) {
        throw new Error ('Enterprise not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, enterprise.password);
  
      if (!isPasswordValid) {
        throw new Error ('Incorrect password');
      }
  
      return enterprise;
    } catch (error) {
      throw new Error (error.message);
    }
};