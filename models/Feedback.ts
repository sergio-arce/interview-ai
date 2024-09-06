import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IFeedback {
  user: ObjectId; // Referencia al usuario
  date: string | Date; // Fecha de la entrevista
  position: string; // Posición del entrevistado
  experience: string; // Experiencia del entrevistado
  detailedFeedback: Array<{
    key: number;
    question: string;
    technology: string;
    answer: string;
    feedback: string;
    improvement?: string;
    puntuation: number;
  }>;
  overallAssessment: {
    overallScore: {
      description: string;
      puntuation: number;
    };
    roleRelatedKnowledge: number;
    problemSolving: number;
    communication: number;
    criticalThinking: number;
    adaptability: number;
    teamwork: number;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IFeedbackSchema extends Document {
  user: ObjectId;
  date: string | Date;
  position: string;
  experience: string;
  detailedFeedback: Array<{
    key: number;
    question: string;
    technology: string;
    answer: string;
    feedback: string;
    improvement?: string;
    puntuation: number;
  }>;
  overallAssessment: {
    overallScore: {
      description: string;
      puntuation: number;
    };
    roleRelatedKnowledge: number;
    problemSolving: number;
    communication: number;
    criticalThinking: number;
    adaptability: number;
    teamwork: number;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    detailedFeedback: [
      {
        key: { type: Number, required: true },
        question: { type: String, required: true },
        technology: { type: String, required: true },
        answer: { type: String, required: true },
        feedback: { type: String, required: true },
        improvement: { type: String },
        puntuation: { type: Number, required: true, min: 1, max: 10 }
      }
    ],
    overallAssessment: {
      overallScore: {
        description: { type: String, required: true },
        puntuation: { type: Number, required: true, min: 1, max: 10 }
      },
      roleRelatedKnowledge: { type: Number, required: true, min: 1, max: 10 },
      problemSolving: { type: Number, required: true, min: 1, max: 10 },
      communication: { type: Number, required: true, min: 1, max: 10 },
      criticalThinking: { type: Number, required: true, min: 1, max: 10 },
      adaptability: { type: Number, required: true, min: 1, max: 10 },
      teamwork: { type: Number, required: true, min: 1, max: 10 }
    }
  },
  {
    timestamps: true, // Incluye createdAt y updatedAt
    versionKey: false
  }
);

// Exporta el modelo de feedback
export const FeedbackModel = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);
