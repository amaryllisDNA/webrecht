  function showQuestion(event) {
    const answer = event.currentTarget.nextElementSibling;
    answer.classList.remove('hide');
  }

  function hideQuestion(event) {
    const answer = event.currentTarget.nextElementSibling;
    answer.classList.add('hide');
  }

  const questionAnswers = document.querySelectorAll('.question-answer');

  questionAnswers.forEach((questionAnswer) => {
    const question = questionAnswer.querySelector('.question-show');
    question.addEventListener('mouseover', showQuestion);
    question.addEventListener('mouseout', hideQuestion);
  });
