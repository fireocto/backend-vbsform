import mongoose from "mongoose";

const vbsFormSchema = new mongoose.Schema({
    childName: {
        type: String,
        required: true,
        validate: /^[A-Za-z \,;:'.]*$/
    },
    childAge: {
        type: Number,
        required: true,
        validate: /^[0-9]*$/
    },
    childAddress: {
        type: String,
        required: true,
        validate: /^[A-Za-z0-9 ,;:'.]*$/
    },
    childInfo: {
        type: String,
        required: false,
        validate: /^[A-Za-z0-9 ,;:'.]*$/
    },
    childEmergencyContactName: {
        type: String,
        required: true,
        validate: /^[A-Za-z0-9 ,;:'.]*$/
    },
    childEmergencyContactNumber: {
        type: String,
        required: true,
        validate: /^[0-9 \-]*$/
    },
    childDismissal: {
        type: String,
        required: true,
        validate: /^[A-Za-z0-9 ,;:'.]*$/
    },
    guardianName: {
        type: String,
        required: true,
        validate: /^[A-Za-z0-9 ,;:'.]*$/
    },
    guardianNumber: {
        type: String,
        required: true,
        validate: /^[0-9 \-]*$/
    },
    guardianEmail: {
        type: String,
        required: false,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    guardianAddress: {
        type: String,
        required: false,
        validate: /^[A-Za-z0-9 ,]*$/
    },
    guardianChurch: {
        type: String,
        required: false,
        validate: /^[A-Za-z0-9 ]*$/
    },
    guardianGuest: {
        type: String,
        required: false,
        validate: /^[A-Za-z0-9 /]*$/
    },
    photoPermission: {
        type: Boolean,
        required: true
    },
    year: {
        type: Number,
        required: true,
        default: () => new Date().getFullYear()
    },
});

const Form = mongoose.model("Form", vbsFormSchema);

export default Form;