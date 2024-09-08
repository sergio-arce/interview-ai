import mongoose from 'mongoose';

const { Schema } = mongoose;

const technologySchema = new Schema({
  position: {
    type: String,
    enum: ['Front End Developer', 'Back End Developer', 'DevOps', "Full Stack Developer", "Software Architect", "Android Developer", "iOS Developer", "Data Scientist"],
    required: true
  },
  technologies: {
    type: [String],
    required: true
  }
});

export const TechnologyModel = mongoose.models.Technology || mongoose.model('Technology', technologySchema);

