import { getAllEnterprise,
        getEnterpriseById,
        getEnterpriseByEmailAndPassword,
        createEnterprise,
        deleteEnterprise,
        updateEnterprise } from "../services/enterpriseServices.js";
import { createJWT } from "../helpers/jsonwebtoken.js";


// Controller to get all enterprise's 
export const ctrlGetAllEnterprise = async (req, res) => {
    try {
      const enterprise = await getAllEnterprise()
  
      if (!enterprise) {
         res.status(404)
      }
  
      res.status(200).json(enterprise)
    } catch (error) {
      res.status(500).json(error.message)
    }
};


// Controller to get a single enterprise by ID
export const ctrlGetEnterprise = async (req, res) => {
    try {
      const enterpriseId = req.params.id;
      const enterprise = await getEnterpriseById(enterpriseId)
  
      if (!enterprise) {
         res.status(404)
      }
  
      res.status(200).json(enterprise)
    } catch (error) {
      res.status(500).json(error.message)
    }
};


// Controller to create a new enterprise
export const ctrlCreateEnterprise = async (req, res) => {
    try {
        const enterprise = await createEnterprise(req.body)
    
        const token = await createJWT({ enterprise: enterprise.id })
    
        res.status(200).json({ message: "Enterprise created", token })
      } catch (error) {
        res.status(500).json(error.message)
      }
};


// Controller to delete a enterprise by ID
export const ctrlDeleteEnterprise = async (req, res) => {
    try {
        const deletedEnterprise = await deleteEnterprise(req.params.id);
        
        if (!deletedEnterprise) {
            res.status(404);
        }
        
        res.status(200).json(deletedEnterprise);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


// Controller to update a enterprise's information by ID
export const ctrlUpdateEnterprise = async (req, res) => {
    try {
      const enterpriseId = req.params.id;
      const updatedEnterprise = await updateEnterprise(enterpriseId, req.body);
  
      if (!updatedEnterprise) {
         res.status(404).json({ error: 'Enterprise not found' });
      }
  
      res.status(200).json(updatedEnterprise);
    } catch (error) {
      res.status(500).json(error.message);
    }
};


// Controller for enterprise login
export const ctrlLoginEnterprise = async (req, res) => {
    try {
      const enterprise = await getEnterpriseByEmailAndPassword(req.body)
  
      if (!enterprise) {
         res.status(404).json({ error: 'Enterprise not found' });
      };

      const token = await createJWT({ enterprise: enterprise.id })
  
      res.status(200).json(token)
    } catch (error) {
      res.status(500).json(error.message)
    }
};