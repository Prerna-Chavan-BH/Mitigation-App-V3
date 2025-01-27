const { validationResult } = require('express-validator');
const Mitigation = require('../models/mitigationModel');

exports.createMitigations = async(req, res) => {
  const { description, pre_mitigation_score, post_mitigation_score } = req.body;
  if(!description || pre_mitigation_score == null || post_mitigation_score == null){
      return res.status(400).json({message: 'All fields are required'});
  }
  try{
      const mitigation = await Mitigation.create({
          description,
          pre_mitigation_score,
          post_mitigation_score,
      });
      res.status(201).json(mitigation);
  }catch(error){
      res.status(500).json({message: "Error creating the mitigations in main function",error});
  }
};
  // Get all mitigations
  exports.getMitigations = async (req, res) => {
    try {
      const mitigations = await Mitigation.findAll();
      console.log("get mitigation: ",mitigations);
      res.json(mitigations);
    } catch (error) {
      console.error('Error fetching mitigations:', error);
      res.status(500).json({ message: 'Error fetching mitigations', error: error.message });
    }
  };
  // Delete mitigation
  exports.deleteMitigation = async (req, res) => {
    const { id } = req.params;
  
    try {
      const mitigation = await Mitigation.destroy({ where: { id } });
      if (mitigation === 0) {
        res.status(404).json({ message: 'Mitigation not found' });
      } else {
        res.json({ message: 'Mitigation deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting mitigation:', error);
      res.status(500).json({ message: 'Error deleting mitigation', error: error.message });
    }
  };
  
  // Update mitigation
  exports.updateMitigation = async (req, res) => {
    const { id } = req.params;
    const { description, pre_mitigation_score, post_mitigation_score } = req.body;
  
    try {
      const mitigation = await Mitigation.update(
        { description, pre_mitigation_score, post_mitigation_score },
        { where: { id } }
      );
  
      if (mitigation[0] === 0) {
        res.status(404).json({ message: 'Mitigation not found' });
      } else {
        res.json({ message: 'Mitigation updated successfully' });
      }
    } catch (error) {
      console.error('Error updating mitigation:', error);
      res.status(500).json({ message: 'Error updating mitigation', error: error.message });
    }
  };