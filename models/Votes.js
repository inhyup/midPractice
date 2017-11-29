var mongoose = require('mongoose');
var VoteSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
});

VoteSchema.methods.upvote = function(cb) {
 this.votes += 1;
 this.save(cb);
};

mongoose.model('Vote', VoteSchema);
