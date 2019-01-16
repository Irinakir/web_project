console.clear();

// Component TodoList Constructor
/*class TodoList {
  constructor( currentDay ) {
    const todoEl = document.createElement('div'),
          todoBannerEl = document.createElement('h3'),
          todoListEl = document.createElement('ol'),
          todoFormEl = document.createElement('form'),
          todoFormInputEl = document.createElement('input'),
          todoFormAddBtnEl = document.createElement('button');
    
    todoEl.classList.add('todo');
    
    todoBannerEl.classList.add('todo__banner');
    
    todoListEl.classList.add('todo__list');
    
    todoFormEl.classList.add('todo__form');
    
    todoFormInputEl.classList.add('todo__form-input');
    todoFormInputEl.setAttribute('type', 'text');
    
    todoFormAddBtnEl.classList.add('todo__form-add');
    todoFormAddBtnEl.setAttribute('type', 'submit');
    todoFormAddBtnEl.innerText = 'Add';
    
    todoFormEl.append(todoFormInputEl, todoFormAddBtnEl);
    todoEl.append(todoBannerEl, todoListEl, todoFormEl);
    
    todoFormEl.addEventListener('submit', this.addTask.bind(this));
    
    const [currentDayKey] = currentDay.toJSON().split('T'),
          currentStorageKey = `TODO_LIST_${currentDayKey}`;
    let data = [];

    try {
      data = JSON.parse( window.localStorage[currentStorageKey] || '[]');
    } catch(ex) {
      console.error(`can't parse data for ${currentStorageKey}`);
    }

    this.state = {
      currentDayKey,
      currentStorageKey,
      data
    }
    
    this.elements = {
      todoEl,
      todoListEl,
      todoFormInputEl,
      todoBannerEl
    };
  }
  
  addTask(e) {
    e.preventDefault();
    const {todoFormInputEl} = this.elements,
          taskText = todoFormInputEl.value,
          {data, currentStorageKey} = this.state;
    
    todoFormInputEl.value = '';
    
    data.push({
      text: taskText
    });

    this.setState({data});
  }
  
  // please use only this method for changing state
  setState(newState = {}) {
    this.state = {
      ...this.state,
      ...newState
    };

    window.localStorage[this.state.currentStorageKey] = JSON.stringify(this.state.data);

    this.render();
  }
  
  renderListElement( data = {}) {
    const liEl = document.createElement('li'),
          {text = ''} = data;
    
    liEl.classList.add('todo__item');
    liEl.innerText = text;

    return liEl;
  }
  
  render() {
    const {data = [], currentDayKey} = this.state,
          {todoEl, todoListEl, todoBannerEl} = this.elements,
          listElCol = data.map(elData => this.renderListElement(elData));

          // listElCol = data.map(this.renderListElement.bind(this));
    
    todoBannerEl.innerText = `TODO List ${currentDayKey}`;
    
    todoListEl.innerText = '';
    todoListEl.append.apply(
      todoListEl,
      listElCol
    );
    
    return todoEl;
  }
}
*/
// Global variables
const currentDay = new Date(),
      currentMonth = currentDay.getMonth(),
      currentYear = currentDay.getFullYear(),
      calendarComponent = new Calendar(currentMonth, currentYear),
    /*  todoComponent = new TodoList( currentDay ),*/
      contentEl = document.getElementById('content');

// Component Calendar Constructor
function Calendar(startMonth, startYear) {
    let startDay = new Date(startYear, startMonth, 1),
        currentMonth = startDay.getMonth(),
        currentYear = startDay.getFullYear();
    const calendarEl = document.createElement('div'),
          calendarControlsEl = document.createElement('div'),
          calendarWeekdaysEl = document.createElement('ul'),
          calendarDaysEl = document.createElement('ul'),
          calendarPrevLinkEl = document.createElement('a'),
          calendarNextLinkEl = document.createElement('a'),
          calendarTitleEl = document.createElement('div'),
          WEEKDAYS_NAMES = [
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб',
            'вс'
          ],
          MONTH_NAMES = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
          ],
          
          goPrevMonth = e => {
          e.preventDefault();
         shiftMonth(-1);
            },
  
         goNextMonth = e => {
          e.preventDefault();
         shiftMonth(1);
            };
       //   goPrevMonth = shiftMonth.bind(this, -1),
         // goNextMonth = shiftMonth.bind(this, 1);
        
        
    calendarEl.classList.add('calendar');
    calendarControlsEl.classList.add('calendar-controls');
    calendarWeekdaysEl.classList.add('calendar-weekdays');
    calendarDaysEl.classList.add('calendar-days');
    calendarPrevLinkEl.classList.add('calendar__prev-month');
    calendarPrevLinkEl.innerText = '<';
    calendarPrevLinkEl.setAttribute('href', "#");
    calendarPrevLinkEl.addEventListener('click', goPrevMonth);
  
    calendarNextLinkEl.classList.add('calendar__next-month');
    calendarNextLinkEl.innerText = '>';
    calendarNextLinkEl.setAttribute('href', "#");
    calendarNextLinkEl.addEventListener('click', goNextMonth);
  
    calendarTitleEl.classList.add('calendar__title');
  
    calendarWeekdaysEl.append.apply(
      calendarWeekdaysEl,
      WEEKDAYS_NAMES.map(dayName => {
        const liEl = document.createElement('li');

        liEl.innerText = dayName;

        return liEl;
      })
    );
    //.preventDefault();
    calendarControlsEl.append(calendarPrevLinkEl, calendarTitleEl, calendarNextLinkEl);
       calendarEl.append(calendarControlsEl, calendarWeekdaysEl, calendarDaysEl);
  
    function shiftMonth(shiftLength) {
        startDay = new Date(currentYear, currentMonth + shiftLength, 1);
        currentMonth = startDay.getMonth();
        currentYear = startDay.getFullYear();
             render();
    }
  
    function getMonthDays( year, month ) {
        const firstDayInMonth = new Date(year, month, 1),
           firstWeekDayInMonth = (6 + firstDayInMonth.getDay())%7,
           lastDayInMont = new Date(year, month + 1, 0),
           lastWeekDayInMont = lastDayInMont.getDay() === 0
              ? 6
              : lastDayInMont.getDay() - 1,
           startDay = new Date(year, month, 1 - firstWeekDayInMonth),
           endDay = new Date(year, month + 1, 6 - lastWeekDayInMont),
           result = [];

        for(
          var currentDay = new Date(startDay);
          currentDay <= endDay;
          currentDay.setDate(currentDay.getDate() + 1)
        ) {
          result.push( new Date(currentDay) );
        }

        return {
          firstDayInMonth,
          lastDayInMont,
          firstWeekDayInMonth,
          lastWeekDayInMont,
          startDay,
          endDay,
          daysList: result
        };
    }

    function createDayEl(renderDate) {
      const liEl = document.createElement('li');
      
      liEl.innerText = renderDate.getDate();
      
      if (renderDate.getMonth() !== currentMonth) {
        liEl.classList.add('not-in-month');
      }

      return liEl;
    }
  
    function render() {
      const title = `${MONTH_NAMES[currentMonth]} ${currentYear}`,
            {daysList} = getMonthDays(currentYear, currentMonth),
            daysListElCol = daysList.map(createDayEl);

      calendarTitleEl.innerText = title;
      calendarDaysEl.innerText = '';
      calendarDaysEl.append.apply(
        calendarDaysEl,
        daysListElCol
      );

      return calendarEl;
    }

    return {
      render,
      shiftMonth
    }
}

// todoComponent.setState({data: []}); // clean data

// render component Calendar in document
contentEl.append( calendarComponent.render());
//document.body.append( todoComponent.render() );

