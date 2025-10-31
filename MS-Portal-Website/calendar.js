 document.addEventListener('DOMContentLoaded', function() {
    // Ensure page is fully loaded to prevent flicker
    document.body.style.opacity = '1';
    
    // Ensure black background
    document.body.style.cssText = 'background-color: #0f0f0f !important; opacity: 1 !important;';
    document.querySelector('.black-screen').style.backgroundColor = '#0f0f0f';
    
    // Get elements
    const selectedNav = document.getElementById('selectedNav');
    const homeBtn = document.getElementById('homeBtn');
    const chatContainer = document.getElementById('chatContainer');
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarTitle = document.getElementById('calendarTitle');
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Event popup elements
    const eventPopup = document.getElementById('eventPopup');
    const eventPopupTitle = document.getElementById('eventPopupTitle');
    const eventDescription = document.getElementById('eventDescription');
    const eventStartTime = document.getElementById('eventStartTime');
    const eventEndTime = document.getElementById('eventEndTime');
    const eventAlertTime = document.getElementById('eventAlertTime');
    const eventRepeat = document.getElementById('eventRepeat');
    const eventRepeatEnd = document.getElementById('eventRepeatEnd');
    const eventCancel = document.getElementById('eventCancel');
    const eventSave = document.getElementById('eventSave');
    const eventTypeOptions = document.querySelectorAll('.event-type-option');
    const predefinedDescriptions = document.getElementById('predefinedDescriptions');
    const predefinedSearch = document.getElementById('predefinedSearch');
    const customDaysGroup = document.getElementById('customDaysGroup');
    const repeatEndGroup = document.getElementById('repeatEndGroup');
    const customDayOptions = document.querySelectorAll('.custom-day-option');
    
    // Day events viewer elements
    const dayEventsPopup = document.getElementById('dayEventsPopup');
    const dayEventsTitle = document.getElementById('dayEventsTitle');
    const dayEventsList = document.getElementById('dayEventsList');
    const dayEventsClose = document.getElementById('dayEventsClose');
    const dayEventsAdd = document.getElementById('dayEventsAdd');
    
    // Set smaller agent panel width and adjust body margin
    if (chatContainer) {
        chatContainer.style.setProperty('width', '280px', 'important');
        document.body.style.setProperty('margin-right', '280px', 'important');
    }
    
    // Calendar state
    let currentDate = new Date();
    let events = {};  // Store events by date key (YYYY-MM-DD)
    
    // Store original predefined events for search functionality
    let originalPredefinedOptions = [];
    
    // Initialize predefined events search functionality
    function initPredefinedSearch() {
        if (!predefinedDescriptions || !predefinedSearch) return;
        
        // Store original HTML content
        const originalHTML = predefinedDescriptions.innerHTML;
        
        // Add search functionality
        predefinedSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, restore all options
                predefinedDescriptions.innerHTML = originalHTML;
            } else {
                // Clear current options
                predefinedDescriptions.innerHTML = '';
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '-- Select a predefined event --';
                predefinedDescriptions.appendChild(defaultOption);
                
                // Create temporary container to parse original HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalHTML;
                
                // Process each optgroup
                const optgroups = tempDiv.querySelectorAll('optgroup');
                optgroups.forEach(originalOptgroup => {
                    const options = originalOptgroup.querySelectorAll('option');
                    const matchingOptions = Array.from(options).filter(option => {
                        return option.textContent.toLowerCase().includes(searchTerm) ||
                               option.value.toLowerCase().includes(searchTerm);
                    });
                    
                    // If this optgroup has matching options, add it
                    if (matchingOptions.length > 0) {
                        const newOptgroup = document.createElement('optgroup');
                        newOptgroup.label = originalOptgroup.label;
                        
                        matchingOptions.forEach(option => {
                            newOptgroup.appendChild(option.cloneNode(true));
                        });
                        
                        predefinedDescriptions.appendChild(newOptgroup);
                    }
                });
            }
        });
        
        // Handle selection
        predefinedDescriptions.addEventListener('change', function() {
            if (this.value && eventDescription) {
                eventDescription.value = this.value;
            }
        });
    }
    
    // Month names
    const monthNames = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    
    // Day names
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    
    // Country color mapping
    const countryColors = {
        'US': '#ef4444',      // Red - United States
        'UK': '#3b82f6',      // Blue - United Kingdom  
        'AU': '#22c55e',      // Green - Australia
        'CN': '#eab308',      // Yellow - China
        'IN': '#f97316',      // Orange - India
        'CA': '#a3763d',      // Brown - Canada
        'EU': '#a855f7',      // Purple - Europe
        'DE': '#a3763d',      // Brown - Germany
        'TR': '#eab308',      // Yellow - Turkey
        'BR': '#f97316',      // Orange - Brazil
        'MX': '#22c55e',      // Green - Mexico
        'AR': '#ef4444',      // Red - Argentina
        'JP': '#3b82f6',      // Blue - Japan
        'ID': '#eab308',      // Yellow - Indonesia
        'SG': '#22c55e',      // Green - Singapore
        'SA': '#a3763d',      // Brown - Saudi Arabia
        'AE': '#a855f7',      // Purple - UAE
        'RU': '#ef4444',      // Red - Russia
        'NZ': '#6366f1'       // Indigo - New Zealand
    };

    // Function to extract country code from event description
    function getCountryFromDescription(description) {
        const countryMappings = {
            'FED': 'US', 'Core PCE': 'US', 'Manufacturing PMI (ISM)': 'US', 
            'Services PMI (ISM)': 'US', 'Durable goods orders': 'US', 
            'Consumer confidence index': 'US', 'Initial jobless claims': 'US',
            'EIA crude oil inventories': 'US', '10Y & 30Y Treasury auctions': 'US',
            'Retail sales': 'US', 'FED interest rate': 'US', 'FED minutes': 'US',
            'CPI': 'US', 'PPI': 'US', 'PMI': 'US', 'Jobless claims': 'US',
            'Treasury': 'US', 'GDP (US)': 'US', 'Inflation (US)': 'US',
            'BOE': 'UK', '(UK)': 'UK', 'GfK consumer confidence': 'UK', 
            'Halifax house price index': 'UK', 'UK CPI': 'UK', 'UK GDP': 'UK',
            'RBA': 'AU', '(AU)': 'AU', 'NAB business confidence': 'AU', 
            'Westpac consumer confidence': 'AU', 'Building approvals': 'AU', 
            'CoreLogic home prices': 'AU', 'AU CPI': 'AU', 'AU GDP': 'AU',
            'PBOC': 'CN', '(CN)': 'CN', 'CPI & PPI': 'CN', 
            'NBS manufacturing PMI': 'CN', 'Caixin': 'CN', 'CN CPI': 'CN',
            'RBI': 'IN', '(IN)': 'IN', 'IN CPI': 'IN',
            'BOC': 'CA', '(CA)': 'CA', 'Housing starts': 'CA', 'CA CPI': 'CA',
            'ECB': 'EU', '(EU)': 'EU', 'ZEW economic sentiment': 'EU', 
            'Monetary policy statement': 'EU', 'EU CPI': 'EU',
            '(DE)': 'DE', 'Ifo business climate': 'DE', 'ZEW sentiment': 'DE', 
            'Industrial production': 'DE', 'DE CPI': 'DE',
            'CBRT': 'TR', '(TR)': 'TR', 'TR CPI': 'TR',
            'BCB': 'BR', '(BR)': 'BR', 'Copom minutes': 'BR', 'BR CPI': 'BR',
            'Banxico': 'MX', '(MX)': 'MX', 'MX CPI': 'MX',
            'BCRA': 'AR', '(AR)': 'AR', 'AR CPI': 'AR',
            'BOJ': 'JP', '(JP)': 'JP', 'Tankan survey': 'JP', 
            'Machinery orders': 'JP', 'JP CPI': 'JP',
            'BI interest rate decision': 'ID', '(ID)': 'ID', 'ID CPI': 'ID',
            'MAS': 'SG', '(SG)': 'SG', 'Non-oil exports': 'SG', 'SG CPI': 'SG',
            'SAMA': 'SA', '(SA)': 'SA', 'Crude oil production': 'SA', 
            'Fiscal balance': 'SA', 'Budget announcements': 'SA', 'SA CPI': 'SA',
            'CBUAE': 'AE', '(AE)': 'AE', 'Sovereign fund activity': 'AE', 'AE CPI': 'AE',
            'CBR': 'RU', '(RU)': 'RU', 'Crude oil/natural gas output': 'RU', 'RU CPI': 'RU',
            'RBNZ': 'NZ', '(NZ)': 'NZ', 'ANZ business confidence': 'NZ', 
            'Dairy auction results': 'NZ', 'Consumer confidence (NZ)': 'NZ', 'NZ CPI': 'NZ'
        };
        
        for (const [key, country] of Object.entries(countryMappings)) {
            if (description.includes(key)) {
                return country;
            }
        }
        return null; // No country identified
    }

    // Initialize calendar
    async function initCalendar() {
        // Set up selected nav item
        if (selectedNav) {
            selectedNav.textContent = 'CALENDAR';
            selectedNav.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                right: 30px !important;
                opacity: 0.7 !important;
                z-index: 1000 !important;
                display: block !important;
                font-size: 1.2rem !important;
                color: #4a5568 !important;
                font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                font-weight: 400 !important;
                letter-spacing: 0.1em !important;
                text-transform: uppercase !important;
            `;
        }

        // Load events and ensure they have country codes
        await loadEvents();
        
        // Update existing events with country codes if missing
        let eventsUpdated = false;
        for (const dateKey in events) {
            events[dateKey].forEach(event => {
                if (!event.country) {
                    const detectedCountry = getCountryFromDescription(event.description);
                    if (detectedCountry) {
                        event.country = detectedCountry;
                        eventsUpdated = true;
                        console.log(`Updated existing event with country ${detectedCountry}: ${event.description}`);
                    }
                }
            });
        }
        
        // Save updated events if any were modified
        if (eventsUpdated) {
            await saveEvents();
            console.log('Updated existing events with country codes');
        }

        // Set current date
        const now = new Date();
        currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Populate year selector
        populateYearSelector();
        
        // Initialize dropdowns
        yearSelect.value = currentDate.getFullYear();
        monthSelect.value = currentDate.getMonth();
        
        // Generate initial calendar
        generateCalendar();
        
        // Add event listeners
        addEventListeners();
        
        // Initialize event popup
        initEventPopup();
        
        // Initialize predefined events search
        initPredefinedSearch();
        
        // Trigger calendar animations
        setTimeout(() => {
            startCalendarAnimations();
        }, 100);
        
        // Initialize day events popup
        initDayEventsPopup();
        
        // Request notification permission
        requestNotificationPermission();
    }
    
    // Start calendar animations with staggered timing
    function startCalendarAnimations() {
        const calendarContainer = document.querySelector('.calendar-container');
        const calendarHeader = document.getElementById('calendarHeader');
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarTitle = document.getElementById('calendarTitle');
        const navButtons = document.querySelectorAll('.calendar-nav-btn');
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        
        // Start container slide-in
        if (calendarContainer) {
            calendarContainer.classList.add('loaded');
        }
        
        // Animate header container
        setTimeout(() => {
            if (calendarHeader) {
                calendarHeader.classList.add('loaded');
            }
        }, 100);
        
        // Animate title after header
        setTimeout(() => {
            if (calendarTitle) {
                calendarTitle.classList.add('loaded');
            }
        }, 200);
        
        // Animate nav buttons
        setTimeout(() => {
            navButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('loaded');
                }, index * 100);
            });
        }, 300);
        
        // Animate year and month selectors
        setTimeout(() => {
            if (yearSelect) {
                yearSelect.classList.add('loaded');
            }
        }, 450);
        
        setTimeout(() => {
            if (monthSelect) {
                monthSelect.classList.add('loaded');
            }
        }, 500);
        
        // Animate calendar grid last
        setTimeout(() => {
            if (calendarGrid) {
                calendarGrid.classList.add('loaded');
            }
        }, 600);
        
        // Show separator lines after animations
        setTimeout(() => {
            showSeparatorLine('default');
        }, 900);
    }
    
    // Populate year selector with reasonable range
    function populateYearSelector() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 10;
        const endYear = currentYear + 10;
        
        yearSelect.innerHTML = '';
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }
    
    // Generate calendar grid
    function generateCalendar() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        
        // Update title
        calendarTitle.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Generate 6 weeks of days
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const currentDay = new Date(startDate);
                currentDay.setDate(startDate.getDate() + (week * 7) + day);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = currentDay.getDate();
                
                // Add classes based on conditions
                if (currentDay.getMonth() !== month) {
                    dayElement.classList.add('other-month');
                }
                
                if (isToday(currentDay)) {
                    dayElement.classList.add('today');
                }
                
                // Add events with descriptions (limit to 2 visible)
                const dateKey = formatDateKey(currentDay);
                if (events[dateKey] && events[dateKey].length > 0) {
                    dayElement.classList.add('has-events');
                    dayElement.title = `${events[dateKey].length} event${events[dateKey].length > 1 ? 's' : ''} - Click to view all`;
                    console.log('Rendering events for', dateKey, ':', events[dateKey]);
                    const eventsContainer = document.createElement('div');
                    eventsContainer.className = 'calendar-day-events';
                    
                    const maxVisible = 1;
                    const visibleEvents = events[dateKey].slice(0, maxVisible);
                    const hiddenCount = events[dateKey].length - maxVisible;
                    
                    visibleEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.className = 'calendar-event-item';
                        
                        const eventDot = document.createElement('div');
                        eventDot.className = `calendar-event-dot ${event.type}`;
                        
                        const eventContent = document.createElement('div');
                        eventContent.className = 'calendar-event-content';
                        
                        const eventText = document.createElement('div');
                        eventText.className = 'calendar-event-text';
                        
                        // Add country initials prefix and color if available
                        let displayText = event.description;
                        if (event.country) {
                            displayText = `${event.country}: ${event.description}`;
                            // Apply country color to text
                            if (countryColors[event.country]) {
                                eventText.style.color = countryColors[event.country];
                                console.log(`Applied color ${countryColors[event.country]} to event: ${event.description}`);
                            }
                        } else {
                            // Try to detect country if not set (for older events)
                            const detectedCountry = getCountryFromDescription(event.description);
                            if (detectedCountry) {
                                event.country = detectedCountry;
                                displayText = `${detectedCountry}: ${event.description}`;
                                if (countryColors[detectedCountry]) {
                                    eventText.style.color = countryColors[detectedCountry];
                                    console.log(`Detected and applied color ${countryColors[detectedCountry]} to event: ${event.description}`);
                                }
                            } else {
                                console.log(`No country detected for event: ${event.description}`);
                            }
                        }
                        
                        eventText.textContent = displayText;
                        
                        const eventTime = document.createElement('div');
                        eventTime.className = 'calendar-event-time';
                        if (event.startTime && event.endTime) {
                            const startTime12 = convertTo12Hour(event.startTime);
                            const endTime12 = convertTo12Hour(event.endTime);
                            eventTime.textContent = `${startTime12} - ${endTime12}`;
                        } else {
                            eventTime.textContent = 'All Day';
                        }
                        
                        eventContent.appendChild(eventText);
                        eventContent.appendChild(eventTime);
                        
                        eventItem.appendChild(eventDot);
                        eventItem.appendChild(eventContent);
                        eventsContainer.appendChild(eventItem);
                        
                        // Animate event item after a delay
                        setTimeout(() => {
                            eventItem.classList.add('animate-in');
                        }, 600 + (week * 50) + (day * 20));
                    });
                    
                    dayElement.appendChild(eventsContainer);
                    
                    // Add count badge if there are hidden events
                    if (hiddenCount > 0) {
                        const countBadge = document.createElement('div');
                        countBadge.className = 'calendar-event-count';
                        countBadge.textContent = `+${hiddenCount}`;
                        countBadge.title = `Click to see all ${events[dateKey].length} events`;
                        dayElement.appendChild(countBadge);
                        
                        // Animate count badge
                        setTimeout(() => {
                            countBadge.classList.add('animate-in');
                        }, 800 + (week * 50) + (day * 20));
                    }
                }
                
                // Add click event
                dayElement.addEventListener('click', () => selectDate(currentDay));
                
                calendarGrid.appendChild(dayElement);
            }
        }
    }
    
    // Select a date
    function selectDate(date) {
        showDayEventsPopup(date);
    }
    
    // Check if date is today
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }
    

    
    // Add event listeners
    function addEventListeners() {
        // Year selector
        yearSelect.addEventListener('change', () => {
            currentDate.setFullYear(parseInt(yearSelect.value));
            generateCalendar();
        });
        
        // Month selector
        monthSelect.addEventListener('change', () => {
            currentDate.setMonth(parseInt(monthSelect.value));
            generateCalendar();
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            yearSelect.value = currentDate.getFullYear();
            monthSelect.value = currentDate.getMonth();
            generateCalendar();
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            yearSelect.value = currentDate.getFullYear();
            monthSelect.value = currentDate.getMonth();
            generateCalendar();
        });
        
        // Selected nav click handler
        if (selectedNav) {
            selectedNav.addEventListener('click', () => {
                window.location.reload();
            });
        }
    }
    
    // Start exit animations - slide everything out to the left
    function startExitAnimations() {
        const calendarContainer = document.querySelector('.calendar-container');
        const calendarHeader = document.getElementById('calendarHeader');
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarTitle = document.getElementById('calendarTitle');
        const navButtons = document.querySelectorAll('.calendar-nav-btn');
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        const eventItems = document.querySelectorAll('.calendar-event-item');
        const countBadges = document.querySelectorAll('.calendar-event-count');
        
        // Animate main container out first
        if (calendarContainer) {
            calendarContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
            calendarContainer.style.transform = 'translateX(-100vw)';
            calendarContainer.style.opacity = '0';
        }
        
        // Animate header elements out with staggered timing
        setTimeout(() => {
            if (calendarHeader) {
                calendarHeader.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out';
                calendarHeader.style.transform = 'translateX(-50%) translateX(-200px)';
                calendarHeader.style.opacity = '0';
            }
            
            // Animate individual nav elements
            navButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    btn.style.transform = 'translateX(-150px) scale(0.8)';
                    btn.style.opacity = '0';
                }, index * 50);
            });
            
            if (calendarTitle) {
                setTimeout(() => {
                    calendarTitle.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    calendarTitle.style.transform = 'translateX(-200px)';
                    calendarTitle.style.opacity = '0';
                }, 100);
            }
            
            if (yearSelect) {
                setTimeout(() => {
                    yearSelect.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    yearSelect.style.transform = 'translateX(-150px) scale(0.8)';
                    yearSelect.style.opacity = '0';
                }, 150);
            }
            
            if (monthSelect) {
                setTimeout(() => {
                    monthSelect.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    monthSelect.style.transform = 'translateX(-150px) scale(0.8)';
                    monthSelect.style.opacity = '0';
                }, 200);
            }
        }, 100);
        
        // Animate calendar grid with events
        setTimeout(() => {
            if (calendarGrid) {
                calendarGrid.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out';
                calendarGrid.style.transform = 'translateX(-100px) translateY(20px)';
                calendarGrid.style.opacity = '0';
            }
            
            // Animate event items out
            eventItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    item.style.transform = 'translateX(-50px) scale(0.9)';
                    item.style.opacity = '0';
                }, index * 10);
            });
            
            // Animate count badges out
            countBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out';
                    badge.style.transform = 'translateX(-30px) scale(0.7) rotate(-45deg)';
                    badge.style.opacity = '0';
                }, index * 15);
            });
        }, 200);
        
        // Slide Home button and selected nav out
        setTimeout(() => {
            homeBtn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out';
            homeBtn.style.transform = 'translateX(-150px)';
            homeBtn.style.opacity = '0';
            
            if (selectedNav) {
                selectedNav.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-out';
                selectedNav.style.transform = 'translateX(-200px)';
                selectedNav.style.opacity = '0';
            }
        }, 300);
    }

    // Home button functionality
    if (homeBtn) {
        homeBtn.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            left: 20px !important;
            opacity: 0.7 !important;
            z-index: 1000 !important;
            display: block !important;
        `;
        
        homeBtn.addEventListener('click', function() {
            // Prevent multiple clicks during animation
            document.body.style.pointerEvents = 'none';
            
            // Hide separator lines
            hideSeparatorLine();
            
            // Start coordinated slide-out animation
            startExitAnimations();
            
            // Navigate to dashboard after slide animations complete
            setTimeout(() => {
                sessionStorage.setItem('returnFromMenu', 'true');
                window.location.href = 'dashboard.html';
            }, 800);
        });
    }
    
    // Initialize chat functionality
    initializeChat();
    
    // Initialize calendar
    initCalendar();
    
    // Event handling functions
    function formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function showEventPopup(date) {
        const dateKey = formatDateKey(date);
        const dateStr = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        eventPopupTitle.textContent = `Add Event - ${dateStr}`;
        eventDescription.value = '';
        
        // Reset predefined descriptions dropdown
        predefinedDescriptions.value = '';
        
        // Set default times (rounded to next 30-minute interval)
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Round up to next 30-minute interval
        let startHour = currentHour;
        let startMinutes = 0;
        
        if (currentMinutes <= 30) {
            startMinutes = 30;
        } else {
            startHour = (currentHour + 1) % 24;
            startMinutes = 0;
        }
        
        // If it's very late (after 11 PM), default to 9 AM next day
        if (currentHour >= 23) {
            startHour = 9;
            startMinutes = 0;
        }
        
        const defaultStartTime = `${startHour.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
        
        // End time is 1 hour after start time
        let endHour = startHour + 1;
        let endMinutes = startMinutes;
        
        if (endHour >= 24) {
            endHour = 0;
        }
        
        const defaultEndTime = `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
        
        eventStartTime.value = defaultStartTime;
        eventEndTime.value = defaultEndTime;
        eventAlertTime.value = '15';
        eventRepeat.value = 'none';
        eventRepeatEnd.value = '';
        
        // Reset event type selection
        eventTypeOptions.forEach(option => option.classList.remove('selected'));
        eventTypeOptions[1].classList.add('selected'); // Default to meeting
        
        // Reset custom days selection
        customDayOptions.forEach(option => option.classList.remove('selected'));
        
        // Hide repeat-related groups
        customDaysGroup.style.display = 'none';
        repeatEndGroup.style.display = 'none';
        
        // Set default repeat end date (1 month from selected date)
        const defaultEndDate = new Date(date);
        defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);
        eventRepeatEnd.value = defaultEndDate.toISOString().split('T')[0];
        
        // Store selected date for saving
        eventPopup.dataset.selectedDate = dateKey;
        
        // Show popup with animation
        eventPopup.style.display = 'flex';
        setTimeout(() => {
            eventPopup.classList.add('show');
        }, 10);
        eventDescription.focus();
    }
    
    function hideEventPopup() {
        eventPopup.classList.remove('show');
        setTimeout(() => {
            eventPopup.style.display = 'none';
        }, 400);
    }
    
    function initEventPopup() {
        // Event type selection
        eventTypeOptions.forEach(option => {
            option.addEventListener('click', () => {
                eventTypeOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Predefined descriptions selection
        predefinedDescriptions.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (selectedValue) {
                eventDescription.value = selectedValue;
                eventDescription.focus();
            }
        });
        
        // Repeat dropdown change
        eventRepeat.addEventListener('change', (e) => {
            const repeatType = e.target.value;
            
            if (repeatType === 'custom') {
                customDaysGroup.style.display = 'block';
                repeatEndGroup.style.display = 'block';
            } else if (repeatType === 'none') {
                customDaysGroup.style.display = 'none';
                repeatEndGroup.style.display = 'none';
            } else {
                customDaysGroup.style.display = 'none';
                repeatEndGroup.style.display = 'block';
            }
        });
        
        // Custom days selection
        customDayOptions.forEach(option => {
            option.addEventListener('click', () => {
                option.classList.toggle('selected');
            });
        });
        
        // Time validation for end time
        eventEndTime.addEventListener('change', () => {
            validateTimeInputs();
        });
        
        // Time validation for start time
        eventStartTime.addEventListener('change', () => {
            validateTimeInputs();
        });
        
        // Cancel button
        eventCancel.addEventListener('click', hideEventPopup);
        
        // Save button
        eventSave.addEventListener('click', saveEvent);
        
        // Close on backdrop click
        eventPopup.addEventListener('click', (e) => {
            if (e.target === eventPopup) {
                hideEventPopup();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && eventPopup.style.display === 'flex') {
                hideEventPopup();
            }
        });
        
        // Save on enter key
        eventDescription.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveEvent();
            }
        });
    }
    
    function saveEvent() {
        const description = eventDescription.value.trim();
        if (!description) {
            alert('Please enter an event description');
            return;
        }
        
        const selectedType = document.querySelector('.event-type-option.selected');
        const eventType = selectedType.dataset.type;
        const dateKey = eventPopup.dataset.selectedDate;
        const startTime = eventStartTime.value;
        const endTime = eventEndTime.value;
        const alertTime = parseInt(eventAlertTime.value);
        const repeatType = eventRepeat.value;
        const repeatEnd = eventRepeatEnd.value;
        
        // Get selected custom days if repeat type is custom
        let customDays = [];
        if (repeatType === 'custom') {
            customDays = Array.from(customDayOptions)
                .filter(option => option.classList.contains('selected'))
                .map(option => parseInt(option.dataset.day));
            
            if (customDays.length === 0) {
                alert('Please select at least one day for custom repeat');
                return;
            }
        }
        
        // Detect country from description
        const countryCode = getCountryFromDescription(description);
        
        // Create base event object
        const baseEvent = {
            description: description,
            type: eventType,
            startTime: startTime,
            endTime: endTime,
            alertTime: alertTime,
            repeatType: repeatType,
            customDays: customDays,
            country: countryCode,
            id: Date.now() // Simple ID generation
        };
        
        // Generate event dates based on repeat pattern
        const eventDates = generateEventDates(new Date(dateKey), repeatType, repeatEnd, customDays);
        
        // Add events to all generated dates
        eventDates.forEach(date => {
            const eventDateKey = formatDateKey(date);
            
            // Initialize events array for this date if it doesn't exist
            if (!events[eventDateKey]) {
                events[eventDateKey] = [];
            }
            
            // Add the event (with unique ID for each occurrence)
            events[eventDateKey].push({
                ...baseEvent,
                id: Date.now() + Math.random() // Unique ID for each occurrence
            });
        });
        
        console.log('Event(s) added:', description, 'for dates:', eventDates.map(d => formatDateKey(d)));
        console.log('Current events:', events);
        
        // Schedule alerts for events
        scheduleEventAlerts(eventDates, baseEvent);
        
        // Save to localStorage
        saveEvents();
        
        // Hide popup
        hideEventPopup();
        
        // Regenerate calendar to show new event
        generateCalendar();
        
        // If day events popup is open, refresh it
        if (dayEventsPopup.style.display === 'flex') {
            renderDayEvents(dateKey);
        }
    }
    
    // Generate event dates based on repeat pattern
    function generateEventDates(startDate, repeatType, repeatEnd, customDays) {
        const dates = [new Date(startDate)]; // Always include the original date
        
        if (repeatType === 'none') {
            return dates;
        }
        
        const endDate = repeatEnd ? new Date(repeatEnd) : null;
        if (!endDate) {
            return dates;
        }
        
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + 1); // Start from next day
        
        while (currentDate <= endDate) {
            let shouldInclude = false;
            
            if (repeatType === 'daily') {
                shouldInclude = true;
            } else if (repeatType === 'weekly') {
                shouldInclude = currentDate.getDay() === startDate.getDay();
            } else if (repeatType === 'monthly') {
                shouldInclude = currentDate.getDate() === startDate.getDate();
            } else if (repeatType === 'custom') {
                shouldInclude = customDays.includes(currentDate.getDay());
            }
            
            if (shouldInclude) {
                dates.push(new Date(currentDate));
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates;
    }
    
    // Schedule alerts for events
    function scheduleEventAlerts(eventDates, eventData) {
        if (eventData.alertTime === 0) {
            return; // No alerts
        }
        
        eventDates.forEach(date => {
            const eventDateTime = new Date(date);
            const [hours, minutes] = eventData.startTime.split(':');
            eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            const alertDateTime = new Date(eventDateTime);
            alertDateTime.setMinutes(alertDateTime.getMinutes() - eventData.alertTime);
            
            const now = new Date();
            const timeUntilAlert = alertDateTime.getTime() - now.getTime();
            
            if (timeUntilAlert > 0) {
                setTimeout(() => {
                    showEventAlert(eventData, date);
                }, timeUntilAlert);
            }
        });
    }
    
    // Show event alert
    function showEventAlert(eventData, date) {
        const dateStr = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const startTime12 = convertTo12Hour(eventData.startTime);
        const endTime12 = convertTo12Hour(eventData.endTime);
        const alertMessage = `Reminder: ${eventData.description}\nDate: ${dateStr}\nTime: ${startTime12} - ${endTime12}`;
        
        // Try to use browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Calendar Event Reminder', {
                body: alertMessage,
                icon: '/favicon.ico' // Add icon if available
            });
        } else {
            // Fallback to alert
            alert(alertMessage);
        }
    }
    
    // Request notification permission on page load
    function requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
    
    // Convert 24-hour time to 12-hour format with AM/PM
    function convertTo12Hour(time24) {
        if (!time24) return 'All Day';
        
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        return `${hour12}:${minutes} ${ampm}`;
    }
    
    // Validate time inputs
    function validateTimeInputs() {
        if (!eventStartTime.value || !eventEndTime.value) {
            return;
        }
        
        const startTime = eventStartTime.value;
        const endTime = eventEndTime.value;
        
        console.log('Validating times:', startTime, 'to', endTime);
        
        // Convert to minutes for comparison
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        
        if (endMinutes <= startMinutes) {
            // Set end time to next 30-minute slot after start time
            const newEndMinutes = startMinutes + 30;
            const newEndTime = minutesToTime(newEndMinutes);
            eventEndTime.value = newEndTime;
            
            console.log('Time adjusted: end time set to', newEndTime);
            
            // Show brief visual feedback
            eventEndTime.style.borderColor = '#22c55e';
            setTimeout(() => {
                eventEndTime.style.borderColor = '#2d3748';
            }, 1000);
        }
    }
    
    // Convert time string to minutes
    function timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }
    
    // Convert minutes to time string
    function minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60) % 24; // Handle overflow beyond 24 hours
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    
    async function saveEvents() {
        try {
            const response = await fetch('/api/calendar-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(events)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Calendar events saved successfully:', result.message);
            } else {
                console.error('❌ Failed to save calendar events:', response.status);
            }
        } catch (error) {
            console.error('❌ Error saving calendar events:', error);
        }
    }
    
    async function loadEvents() {
        try {
            const response = await fetch('/api/calendar-events');
            
            if (response.ok) {
                const savedEvents = await response.json();
                events = savedEvents;
                console.log('📅 Calendar events loaded:', events);
                
                // Reschedule alerts for existing events
                Object.keys(events).forEach(dateKey => {
                    const date = new Date(dateKey);
                    events[dateKey].forEach(event => {
                        if (event.alertTime && event.alertTime > 0) {
                            scheduleEventAlerts([date], event);
                        }
                    });
                });
            } else {
                console.log('📅 No saved calendar events found');
                events = {};
            }
        } catch (error) {
            console.error('❌ Error loading calendar events:', error);
            events = {};
        }
    }
    
    // Day Events Viewer Functions
    function showDayEventsPopup(date) {
        const dateKey = formatDateKey(date);
        const dateStr = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const eventCount = events[dateKey] ? events[dateKey].length : 0;
        dayEventsTitle.textContent = `Events - ${dateStr} (${eventCount})`;
        
        // Store selected date for adding new events
        dayEventsPopup.dataset.selectedDate = dateKey;
        
        // Render existing events
        renderDayEvents(dateKey);
        
        // Show popup with animation
        dayEventsPopup.style.display = 'flex';
        setTimeout(() => {
            dayEventsPopup.classList.add('show');
        }, 10);
    }
    
    function hideDayEventsPopup() {
        dayEventsPopup.classList.remove('show');
        setTimeout(() => {
            dayEventsPopup.style.display = 'none';
        }, 300);
    }
    
    function renderDayEvents(dateKey) {
        dayEventsList.innerHTML = '';
        
        if (!events[dateKey] || events[dateKey].length === 0) {
            const noEvents = document.createElement('div');
            noEvents.style.cssText = `
                color: #a0a0a0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.8rem;
                text-align: center;
                padding: 20px;
                font-style: italic;
            `;
            noEvents.textContent = 'No events for this day';
            dayEventsList.appendChild(noEvents);
            return;
        }
        
        events[dateKey].forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.className = `day-event-item ${event.type}`;
            
            const eventContent = document.createElement('div');
            eventContent.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; flex: 1;';
            
            const eventDot = document.createElement('div');
            eventDot.className = `day-event-dot-large ${event.type}`;
            
            const eventInfo = document.createElement('div');
            eventInfo.style.cssText = 'flex: 1;';
            
            const eventText = document.createElement('div');
            eventText.className = 'day-event-text-large';
            
            // Add country initials prefix and color if available
            let displayText = event.description;
            if (event.country) {
                displayText = `${event.country}: ${event.description}`;
                // Apply country color to text
                if (countryColors[event.country]) {
                    eventText.style.color = countryColors[event.country];
                }
            } else {
                // Try to detect country if not set (for older events)
                const detectedCountry = getCountryFromDescription(event.description);
                if (detectedCountry) {
                    event.country = detectedCountry;
                    displayText = `${detectedCountry}: ${event.description}`;
                    if (countryColors[detectedCountry]) {
                        eventText.style.color = countryColors[detectedCountry];
                    }
                }
            }
            
            eventText.textContent = displayText;
            
            const eventTime = document.createElement('div');
            eventTime.className = 'day-event-time';
            if (event.startTime && event.endTime) {
                const startTime12 = convertTo12Hour(event.startTime);
                const endTime12 = convertTo12Hour(event.endTime);
                eventTime.textContent = `${startTime12} - ${endTime12}`;
            } else {
                eventTime.textContent = 'All Day';
            }
            
            const eventTypeLabel = document.createElement('div');
            eventTypeLabel.className = 'day-event-type';
            let typeText = event.type;
            if (event.repeatType && event.repeatType !== 'none') {
                typeText += ` • ${event.repeatType}`;
            }
            if (event.alertTime && event.alertTime > 0) {
                const alertText = event.alertTime >= 1440 ? `${event.alertTime/1440}d` : 
                                 event.alertTime >= 60 ? `${event.alertTime/60}h` : `${event.alertTime}m`;
                typeText += ` • alert ${alertText}`;
            }
            eventTypeLabel.textContent = typeText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.style.cssText = `
                background: none;
                border: 1px solid #ef4444;
                color: #ef4444;
                font-size: 0.5rem;
                padding: 2px 4px;
                border-radius: 2px;
                cursor: pointer;
                font-family: 'JetBrains Mono', monospace;
                text-transform: uppercase;
                transition: all 0.2s ease;
            `;
            deleteBtn.textContent = '×';
            deleteBtn.title = 'Delete event';
            deleteBtn.addEventListener('click', () => deleteEvent(dateKey, event.id));
            deleteBtn.addEventListener('mouseenter', () => {
                deleteBtn.style.background = 'rgba(239, 68, 68, 0.2)';
            });
            deleteBtn.addEventListener('mouseleave', () => {
                deleteBtn.style.background = 'none';
            });
            
            eventInfo.appendChild(eventText);
            eventInfo.appendChild(eventTime);
            eventInfo.appendChild(eventTypeLabel);
            
            eventContent.appendChild(eventDot);
            eventContent.appendChild(eventInfo);
            
            eventItem.appendChild(eventContent);
            eventItem.appendChild(deleteBtn);
            
            dayEventsList.appendChild(eventItem);
        });
    }
    
    async function deleteEvent(dateKey, eventId) {
        try {
            const response = await fetch(`/api/calendar-events?dateKey=${encodeURIComponent(dateKey)}&eventId=${encodeURIComponent(eventId)}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Calendar event deleted successfully:', result.message);
                
                // Update local events object
                if (events[dateKey]) {
                    events[dateKey] = events[dateKey].filter(event => event.id != eventId);
                    
                    // Remove the date key if no events left
                    if (events[dateKey].length === 0) {
                        delete events[dateKey];
                    }
                }
                
                // Refresh the day events view
                renderDayEvents(dateKey);
                
                // Regenerate calendar to update display
                generateCalendar();
            } else {
                const error = await response.json();
                console.error('❌ Failed to delete calendar event:', error.message);
                alert('Failed to delete event: ' + error.message);
            }
        } catch (error) {
            console.error('❌ Error deleting calendar event:', error);
            alert('Error deleting event. Please try again.');
        }
    }
    
    function initDayEventsPopup() {
        // Close button
        dayEventsClose.addEventListener('click', hideDayEventsPopup);
        
        // Add event button
        dayEventsAdd.addEventListener('click', () => {
            const dateKey = dayEventsPopup.dataset.selectedDate;
            const date = new Date(dateKey);
            hideDayEventsPopup();
            showEventPopup(date);
        });
        
        // Close on backdrop click
        dayEventsPopup.addEventListener('click', (e) => {
            if (e.target === dayEventsPopup) {
                hideDayEventsPopup();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dayEventsPopup.style.display === 'flex') {
                hideDayEventsPopup();
            }
        });
    }
});

function showSeparatorLine(menuType = 'default') {
    // Remove existing separator lines if any
    const existingSeparators = document.querySelectorAll('.separator-line');
    existingSeparators.forEach(separator => separator.remove());
    
    // Determine line color based on menu type
    let lineColor = '#4a5568'; // Default M&S logo gray for all final submenus
    if (menuType === 'blue') {
        lineColor = '#4a5568'; // M&S logo gray for final submenus
    } else if (menuType === 'trading') {
        lineColor = '#7f1d1d'; // Red for Trading Terminal pages
    } else if (menuType === 'praxis') {
        lineColor = '#14532d'; // Green for Praxis 1.0 pages
    } else if (menuType === 'accounting') {
        lineColor = '#0f4c5c'; // Blue for Accounting pages
    } else if (menuType === 'email') {
        lineColor = '#6b21a8'; // Purple for Email pages
    }
    
    // Create top separator line
    const topSeparatorLine = document.createElement('div');
    topSeparatorLine.className = 'separator-line separator-line-top';
    
    // Style the top separator line
    topSeparatorLine.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 100vw;
        height: 1px;
        background-color: ${lineColor};
        opacity: 0;
        z-index: 999;
        transition: opacity 0.5s ease-out;
    `;
    
    // Create bottom separator line
    const bottomSeparatorLine = document.createElement('div');
    bottomSeparatorLine.className = 'separator-line separator-line-bottom';
    
    // Style the bottom separator line
    bottomSeparatorLine.style.cssText = `
        position: fixed;
        bottom: 70px;
        left: 0;
        width: 100vw;
        height: 1px;
        background-color: ${lineColor};
        opacity: 0;
        z-index: 999;
        transition: opacity 0.5s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(topSeparatorLine);
    document.body.appendChild(bottomSeparatorLine);
    
    // Add inner glowing borders for PRAXIS
    if (menuType === 'praxis') {
        // Create inner top border
        const innerTopBorder = document.createElement('div');
        innerTopBorder.className = 'separator-line separator-line-inner-top';
        innerTopBorder.style.cssText = `
            position: fixed;
            top: 90px;
            left: 0;
            width: 100vw;
            height: 1px;
            background-color: #22c55e;
            opacity: 0;
            z-index: 999;
            transition: opacity 0.5s ease-out;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
        `;
        
        // Create inner bottom border
        const innerBottomBorder = document.createElement('div');
        innerBottomBorder.className = 'separator-line separator-line-inner-bottom';
        innerBottomBorder.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 0;
            width: 100vw;
            height: 1px;
            background-color: #22c55e;
            opacity: 0;
            z-index: 999;
            transition: opacity 0.5s ease-out;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.6);
        `;
        
        // Add inner borders to page
        document.body.appendChild(innerTopBorder);
        document.body.appendChild(innerBottomBorder);
        
        // Fade in all borders
        setTimeout(() => {
            topSeparatorLine.style.opacity = '0.3';
            bottomSeparatorLine.style.opacity = '0.3';
            innerTopBorder.style.opacity = '0.5';
            innerBottomBorder.style.opacity = '0.5';
        }, 200);
    } else {
        // Fade in the separator lines for other menu types
        setTimeout(() => {
            topSeparatorLine.style.opacity = '0.3';
            bottomSeparatorLine.style.opacity = '0.3';
        }, 200);
    }
}

function hideSeparatorLine() {
    const separatorLines = document.querySelectorAll('.separator-line');
    separatorLines.forEach(separatorLine => {
        separatorLine.style.opacity = '0';
        setTimeout(() => {
            if (separatorLine.parentNode) {
                separatorLine.parentNode.removeChild(separatorLine);
            }
        }, 500);
    });
}

// Chat functionality (similar to menu-page.js)
function initializeChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const newChatBtn = document.getElementById('newChatBtn');
    const agentToggle = document.getElementById('agentToggle');
    const agentDropdown = document.getElementById('agentDropdown');
    const agentName = document.getElementById('agentName');
    const agentArrow = document.getElementById('agentArrow');
    
    let currentAgent = 'openai';
    
    // Set agent panel width
    if (chatContainer) {
        chatContainer.style.setProperty('width', '280px', 'important');
        document.body.style.setProperty('margin-right', '280px', 'important');
    }
    
    // Auto-resize textarea
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Send message
    async function sendMessage() {
        if (!chatInput || !chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Add user message
        addMessage(message, 'user');
        
        // Add typing indicator
        addTypingIndicator();
        
        try {
            const response = await callAPI(message, currentAgent);
            removeTypingIndicator();
            addMessage(response, 'ai');
        } catch (error) {
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add typing indicator
    function addTypingIndicator() {
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">
                    <span class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        if (!chatMessages) return;
        
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Call API
    async function callAPI(message, agent) {
        // Simple echo response for now
        return `I received your message: "${message}"`;
    }
    
    // Agent toggle functionality
    if (agentToggle) {
        agentToggle.addEventListener('click', function() {
            const isVisible = agentDropdown.style.display === 'block';
            agentDropdown.style.display = isVisible ? 'none' : 'block';
            agentArrow.textContent = isVisible ? '^' : 'v';
        });
    }
    
    // Agent selection
    if (agentDropdown) {
        agentDropdown.addEventListener('click', function(e) {
            if (e.target.classList.contains('agent-option')) {
                currentAgent = e.target.dataset.agent;
                agentName.textContent = e.target.textContent;
                agentDropdown.style.display = 'none';
                agentArrow.textContent = '^';
            }
        });
    }
    
    // Send button click
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    // New chat button
    if (newChatBtn) {
        newChatBtn.addEventListener('click', function() {
            if (chatMessages) {
                chatMessages.innerHTML = '';
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!agentToggle.contains(e.target) && !agentDropdown.contains(e.target)) {
            agentDropdown.style.display = 'none';
            agentArrow.textContent = '^';
        }
    });
} 