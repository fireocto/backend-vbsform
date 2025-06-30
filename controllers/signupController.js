import Form from '../models/Form.js';

// @desc    Create a new VBS form submission for the current year
// @route   POST /api/forms
// @access  Public
export const createForm = async (req, res) => {
  try {
    const {
      childName,
      childAge,
      childAddress,
      childInfo,
      childEmergencyContactName,
      childEmergencyContactNumber,
      childDismissal,
      guardianName,
      guardianNumber,
      guardianEmail,
      guardianAddress,
      guardianChurch,
      guardianGuest,
      photoPermission,
    } = req.body;

    // Manual required field check (optional but good for API clarity)
    if (
      !childName || !childAge || !childAddress || !childInfo ||
      !childEmergencyContactName || !childEmergencyContactNumber || !childDismissal ||
      !guardianName || !guardianNumber || !guardianEmail ||
      photoPermission === undefined
    ) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const currentYear = new Date().getFullYear();

    const newForm = new Form({
      childName,
      childAge,
      childAddress,
      childInfo,
      childEmergencyContactName,
      childEmergencyContactNumber,
      childDismissal,
      guardianName,
      guardianNumber,
      guardianEmail,
      guardianAddress,
      guardianChurch,
      guardianGuest,
      photoPermission,
      year: currentYear,
    });

    const savedForm = await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully.', form: savedForm });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Server error submitting form.' });
  }
};

// @desc    Get all forms for a given year
// @route   GET /api/forms/:year
// @access  Public

// Controller method to get forms by year
export const getFormsByYear = async (req, res) => {
    const year = parseInt(req.params.year, 10);
  
    try {
      const forms = await Form.find({ year });
      res.json(forms);
    } catch (error) {
      console.error('Error fetching forms by year:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };