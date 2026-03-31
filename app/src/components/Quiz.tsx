import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Props {
  questions: QuizQuestion[];
  moduleTitle: string;
  moduleSlug: string;
}

export default function Quiz({ questions, moduleTitle, moduleSlug }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const selectAnswer = (optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setCurrentIndex(0);
  };

  const retake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
  };

  // Calculate results
  const score = submitted
    ? questions.reduce((sum, q, i) => sum + (selectedAnswers[i] === q.answer ? 1 : 0), 0)
    : 0;
  const percentage = submitted ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 80;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Results banner */}
      {submitted && (
        <div className={`mb-8 p-6 rounded-xl border ${
          passed
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                {passed ? 'Passed!' : 'Not Quite'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {score}/{totalQuestions} correct ({percentage}%) — {passed ? '80%+ required to pass' : 'Need 80% to pass'}
              </p>
            </div>
            <div className={`text-5xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {percentage}%
            </div>
          </div>
          <button
            onClick={retake}
            className="mt-4 text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-slate-500">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg text-white font-medium mb-6">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedAnswers[currentIndex] === i;
            const isCorrect = i === currentQuestion.answer;
            let borderColor = 'border-slate-700 hover:border-slate-600';
            let bgColor = 'bg-slate-900/30';

            if (submitted) {
              if (isCorrect) {
                borderColor = 'border-green-500/50';
                bgColor = 'bg-green-500/10';
              } else if (isSelected && !isCorrect) {
                borderColor = 'border-red-500/50';
                bgColor = 'bg-red-500/10';
              }
            } else if (isSelected) {
              borderColor = 'border-blue-500/50';
              bgColor = 'bg-blue-500/10';
            }

            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-lg border transition-all ${borderColor} ${bgColor} ${
                  submitted ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium ${
                    isSelected && !submitted
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : submitted && isCorrect
                      ? 'border-green-500 bg-green-500 text-white'
                      : submitted && isSelected && !isCorrect
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-slate-600 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`text-sm ${
                    submitted && isCorrect ? 'text-green-300' : submitted && isSelected && !isCorrect ? 'text-red-300' : 'text-slate-300'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after submit) */}
        {submitted && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-300">Explanation: </span>
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          &larr; Previous
        </button>

        <div className="flex items-center gap-2">
          {/* Question dots */}
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : selectedAnswers[i] !== undefined
                  ? submitted
                    ? selectedAnswers[i] === questions[i].answer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-blue-500/50'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {!submitted && currentIndex === totalQuestions - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={answeredCount < totalQuestions}
            className="text-sm bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Submit ({answeredCount}/{totalQuestions})
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={currentIndex === totalQuestions - 1}
            className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
