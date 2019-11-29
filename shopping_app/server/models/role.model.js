const mongoose = require('mongoose');

const RoleSchema =  mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

RoleSchema.virtual('role_id').get(function () { return this._id; });

module.exports = mongoose.model('Role', RoleSchema)