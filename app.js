const { useState, useEffect } = React;

const data = [
  { category: 'Science', questions: [
    { value: 100, text: 'H2O is the chemical formula for what?' },
    { value: 200, text: 'What planet is known as the Red Planet?' },
    { value: 300, text: 'What gas do plants absorb from the atmosphere?' },
    { value: 400, text: 'What particle carries a negative charge?' },
    { value: 500, text: 'What is the speed of light in vacuum? (km/s)' }
  ]},
  { category: 'History', questions: [
    { value: 100, text: 'Who was the first President of the USA?' },
    { value: 200, text: 'In what year did WW2 end?' },
    { value: 300, text: 'Which ancient civilization built the pyramids?' },
    { value: 400, text: 'Who discovered America in 1492?' },
    { value: 500, text: 'What wall came down in 1989?' }
  ]},
  { category: 'Art', questions: [
    { value: 100, text: 'Who painted the Mona Lisa?' },
    { value: 200, text: 'What style is Salvador Dal\u00ed known for?' },
    { value: 300, text: 'Which artist cut off his own ear?' },
    { value: 400, text: 'Where is the Louvre Museum located?' },
    { value: 500, text: 'Who painted the Sistine Chapel ceiling?' }
  ]},
  { category: 'Sports', questions: [
    { value: 100, text: 'How many players in a soccer team on the field?' },
    { value: 200, text: 'What sport uses a puck?' },
    { value: 300, text: 'Where are the Olympics held every four years?' },
    { value: 400, text: 'What country hosts the Tour de France?' },
    { value: 500, text: 'In tennis, what is a score of zero called?' }
  ]},
  { category: 'Misc', questions: [
    { value: 100, text: 'How many colors in a rainbow?' },
    { value: 200, text: 'What is the freezing point of water (\u00b0C)?' },
    { value: 300, text: 'Which animal is known as mans best friend?' },
    { value: 400, text: 'What is the capital of Japan?' },
    { value: 500, text: 'What is the hardest natural substance?' }
  ]}
];

function Board() {
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let timer;
    if (selected) {
      setTime(10);
      timer = setInterval(() => setTime(t => {
        if (t <= 1) {
          document.getElementById('beep').play();
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      }), 1000);
    }
    return () => clearInterval(timer);
  }, [selected]);

  const markUsed = (catIndex, qIndex) => {
    data[catIndex].questions[qIndex].used = true;
  };

  const handleClick = (catIndex, qIndex) => {
    if (data[catIndex].questions[qIndex].used) return;
    setSelected({ ...data[catIndex].questions[qIndex], catIndex, qIndex });
  };

  const close = () => {
    if (selected) {
      markUsed(selected.catIndex, selected.qIndex);
    }
    setSelected(null);
  };

  return (
    React.createElement('div', null,
      React.createElement('div', { id: 'board' },
        data.map((col, catIndex) => [
          React.createElement('div', { key: col.category, className: 'category' }, col.category),
          col.questions.map((q, qIndex) => React.createElement('div', {
            key: q.value,
            className: 'cell' + (q.used ? ' used' : ''),
            onClick: () => handleClick(catIndex, qIndex)
          }, q.value))
        ])
      ),
      selected && React.createElement('div', { className: 'overlay' },
        React.createElement('div', null, selected.text),
        React.createElement('div', { className: 'timer' }, time),
        React.createElement('button', { onClick: close }, 'Close')
      )
    )
  );
}

ReactDOM.render(React.createElement(Board), document.getElementById('root'));
