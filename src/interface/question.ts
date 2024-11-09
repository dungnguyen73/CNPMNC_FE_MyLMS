export interface Question {
  id?: number;
  questionText: string;
  questionType: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  score: number;
}
