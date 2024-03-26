document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const calendarGrid = document.getElementById('calendar-grid');
    const eventModal = document.getElementById('event-modal');
    const eventModalClose = document.querySelector('.close');
    const addEventBtn = document.getElementById('add-event-btn');
    const eventNameInput = document.getElementById('event-name');

    // Event listener for opening the event modal
    eventModalClose.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    // Event listener for closing the event modal
    window.addEventListener('click', (e) => {
        if (e.target == eventModal) {
            eventModal.style.display = 'none';
        }
    });

    // Function to generate the calendar grid
    function generateCalendar(month, year) {
        calendarGrid.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();

        document.getElementById('current-month').textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(firstDayOfMonth)} ${year}`;

        for (let i = 0; i < startingDay; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('empty-cell');
            calendarGrid.appendChild(dayCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.classList.add('calendar-cell');
            dayCell.addEventListener('click', () => openEventModal(day, month, year));
            calendarGrid.appendChild(dayCell);
        }
    }

    // Function to open the event modal
    function openEventModal(day, month, year) {
        eventModal.style.display = 'block';
        addEventBtn.onclick = function() {
            const eventName = eventNameInput.value;
            if (eventName.trim() !== '') {
                alert(`Event "${eventName}" added for ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month, day))}`);
                eventModal.style.display = 'none';
                eventNameInput.value = '';
            } else {
                alert('Please enter event name!');
            }
        };
    }

    // Generate initial calendar
    generateCalendar(currentMonth, currentYear);

    // Event listener for navigating to the previous month
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Event listener for navigating to the next month
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
});
