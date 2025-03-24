const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal_name: {
    type: String,
    required: true,
    trim: true
  },
  target_amount: {
    type: Number,
    required: true
  },
  current_amount: {
    type: Number,
    default: 0
  },
  due_date: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Goal', goalSchema);
