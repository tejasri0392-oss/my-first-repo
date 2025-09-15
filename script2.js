const loadingScreen = document.getElementById('loadingScreen');
        const locationModal = document.getElementById('locationModal');
        const allowLocationBtn = document.getElementById('allowLocation');
        const denyLocationBtn = document.getElementById('denyLocation');
        const plantsModal = document.getElementById('plantsModal');
        const closePlantsModalBtn = document.getElementById('closePlantsModal');
        const plantsModalSubtitle = document.getElementById('plantsModalSubtitle');
        const plantsGrid = document.getElementById('plantsGrid');
        const weatherDashboard = document.getElementById('weatherDashboard');
        const plantIdentification = document.getElementById('plantIdentification');
        const toggleContainer = document.getElementById('toggleContainer');
        const toggleSwitch = document.getElementById('toggleSwitch');
        const backButton = document.getElementById('backButton');
        const scanButton = document.getElementById('scanButton');
        const plantImageContainer = document.getElementById('plantImageContainer');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');
        const micButton = document.getElementById('micButton');
        const cameraView = document.getElementById('cameraView');
        const cameraFeed = document.getElementById('cameraFeed');
        const cameraCanvas = document.getElementById('cameraCanvas');
        const closeCameraBtn = document.getElementById('closeCamera');
        const capturePhotoBtn = document.getElementById('capturePhoto');
        const particles = document.getElementById('particles');
        const plantParticles = document.getElementById('plantParticles');
        const weatherEffects = document.getElementById('weatherEffects');
        const stars = document.getElementById('stars');
        const chatContainer = document.getElementById('chatContainer');
        const resizeHandle = document.getElementById('resizeHandle');
        const minimizeChat = document.getElementById('minimizeChat');
        const aiModeButton = document.getElementById('aiModeButton');
        const aiModeIndicator = document.getElementById('aiModeIndicator');

        // Weather Elements
        const locationName = document.getElementById('locationName');
        const dateTime = document.getElementById('dateTime');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const condition = document.getElementById('condition');
        const tempRange = document.getElementById('tempRange');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const pressure = document.getElementById('pressure');
        const forecast = document.getElementById('forecast');

        // API Key
        const API_KEY = '473c9d7a57c454f6914e3607d290feb7';

        // AI Mode State
        let aiMode = false;

        // Plant database
        const plantsDatabase = [
            {
                name: "Tomatoes",
                image: "https://images.unsplash.com/photo-1592924379998-ab18129e1e22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Warm-season crop that loves sunlight and moderate humidity.",
                conditions: ["Sunny", "Warm", "Moderate Humidity"],
                minTemp: 15,
                maxTemp: 30,
                humidityRange: [40, 70]
            },
            {
                name: "Lettuce",
                image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Cool-season crop that prefers mild temperatures and consistent moisture.",
                conditions: ["Cool", "Partial Shade", "Moist"],
                minTemp: 5,
                maxTemp: 22,
                humidityRange: [60, 80]
            },
            {
                name: "Peppers",
                image: "https://images.unsplash.com/photo-1581375090982-0216d84b5182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Heat-loving plants that require full sun and warm temperatures.",
                conditions: ["Hot", "Sunny", "Well-drained"],
                minTemp: 18,
                maxTemp: 32,
                humidityRange: [50, 70]
            },
            {
                name: "Spinach",
                image: "https://images.unsplash.com/photo-1576045054992-a1c70e8a7724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Nutritious leafy green that thrives in cool weather.",
                conditions: ["Cool", "Partial Shade", "Moist Soil"],
                minTemp: 2,
                maxTemp: 24,
                humidityRange: [60, 80]
            },
            {
                name: "Carrots",
                image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Root vegetable that grows best in loose, well-drained soil.",
                conditions: ["Cool", "Full Sun", "Deep Soil"],
                minTemp: 4,
                maxTemp: 24,
                humidityRange: [50, 70]
            },
            {
                name: "Cucumbers",
                image: "https://images.unsplash.com/photo-1582726479190-7f3a8e6b7c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Warm-season vine that needs plenty of water and sunlight.",
                conditions: ["Warm", "Humid", "Full Sun"],
                minTemp: 18,
                maxTemp: 30,
                humidityRange: [60, 80]
            },
            {
                name: "Basil",
                image: "https://images.unsplash.com/photo-1620906573152-3f5b6a9e8e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Aromatic herb that loves heat and full sun.",
                conditions: ["Hot", "Sunny", "Well-drained"],
                minTemp: 15,
                maxTemp: 32,
                humidityRange: [40, 60]
            },
            {
                name: "Strawberries",
                image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Sweet berries that prefer cool temperatures and full sun.",
                conditions: ["Cool", "Full Sun", "Acidic Soil"],
                minTemp: 10,
                maxTemp: 26,
                humidityRange: [60, 80]
            }
        ];

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            updateDateTime();
            setInterval(updateDateTime, 1000);
            createParticles(particles, 30);
            createParticles(plantParticles, 20);
            createStars();
            showLocationModal();
            setupEventListeners();
        });

        // Create floating particles
        function createParticles(container, count) {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size
                const size = Math.random() * 5 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration
                const duration = Math.random() * 10 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Random delay
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                container.appendChild(particle);
            }
        }

        // Create stars for evening/night time
        function createStars() {
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Random size
                const size = Math.random() * 3 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Random position
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration
                const duration = Math.random() * 4 + 2;
                star.style.animationDuration = `${duration}s`;
                
                // Random delay
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                // Initially hide stars
                star.style.opacity = '0';
                
                stars.appendChild(star);
            }
        }

        // Get time of day (morning, afternoon, evening)
        function getTimeOfDay() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                return 'morning';
            } else if (hour >= 12 && hour < 18) {
                return 'afternoon';
            } else {
                return 'evening';
            }
        }

        // Create weather effects based on condition and time of day
        function createWeatherEffects(condition, timeOfDay) {
            weatherEffects.innerHTML = '';
            
            // Show/hide stars based on time of day
            const starElements = document.querySelectorAll('.star');
            if (timeOfDay === 'evening') {
                starElements.forEach(star => {
                    star.style.opacity = '1';
                });
            } else {
                starElements.forEach(star => {
                    star.style.opacity = '0';
                });
            }
            
            switch (condition.toLowerCase()) {
                case 'clear':
                    // Add sun based on time of day
                    if (timeOfDay === 'morning') {
                        const morningSun = document.createElement('div');
                        morningSun.className = 'morning-sun';
                        weatherEffects.appendChild(morningSun);
                    } else if (timeOfDay === 'afternoon') {
                        const afternoonSun = document.createElement('div');
                        afternoonSun.className = 'afternoon-sun';
                        weatherEffects.appendChild(afternoonSun);
                    } else if (timeOfDay === 'evening') {
                        const eveningSun = document.createElement('div');
                        eveningSun.className = 'evening-sun';
                        weatherEffects.appendChild(eveningSun);
                    }
                    break;
                    
                case 'clouds':
                case 'mist':
                case 'fog':
                case 'haze':
                    // Add cloud effects
                    const cloud1 = document.createElement('div');
                    cloud1.className = 'cloud cloud1';
                    weatherEffects.appendChild(cloud1);
                    
                    const cloud2 = document.createElement('div');
                    cloud2.className = 'cloud cloud2';
                    weatherEffects.appendChild(cloud2);
                    
                    // Add sun behind clouds for daytime
                    if (timeOfDay !== 'evening') {
                        const sunRays = document.createElement('div');
                        sunRays.className = 'sun-rays';
                        weatherEffects.appendChild(sunRays);
                    }
                    break;
                    
                case 'rain':
                case 'drizzle':
                case 'shower rain':
                    // Add rain effects
                    for (let i = 0; i < 50; i++) {
                        const rainDrop = document.createElement('div');
                        rainDrop.className = 'rain-drop';
                        
                        // Random position
                        rainDrop.style.left = `${Math.random() * 100}%`;
                        rainDrop.style.top = `${Math.random() * 100 - 100}%`;
                        
                        // Random animation duration
                        const duration = Math.random() * 1 + 0.5;
                        rainDrop.style.animationDuration = `${duration}s`;
                        
                        // Random delay
                        rainDrop.style.animationDelay = `${Math.random() * 2}s`;
                        
                        weatherEffects.appendChild(rainDrop);
                    }
                    
                    // Add clouds for rain
                    const rainCloud1 = document.createElement('div');
                    rainCloud1.className = 'cloud cloud1';
                    rainCloud1.style.top = '10%';
                    weatherEffects.appendChild(rainCloud1);
                    
                    const rainCloud2 = document.createElement('div');
                    rainCloud2.className = 'cloud cloud2';
                    rainCloud2.style.top = '5%';
                    weatherEffects.appendChild(rainCloud2);
                    break;
            }
        }

        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const date = now.toLocaleDateString(undefined, options);
            const time = now.toLocaleTimeString();
            dateTime.textContent = `${date} | ${time}`;
        }

        // Show location permission modal
        function showLocationModal() {
            setTimeout(() => {
                locationModal.classList.add('active');
            }, 1000);
        }

        // Get user location
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        getWeatherData(latitude, longitude);
                    },
                    error => {
                        console.error('Geolocation error:', error);
                        // Fallback to IP-based geolocation
                        getWeatherByIP();
                    }
                );
            } else {
                // Fallback to IP-based geolocation
                getWeatherByIP();
            }
        }

        // Get weather by IP (fallback)
        async function getWeatherByIP() {
            try {
                // First get location by IP
                const ipResponse = await fetch('https://ipapi.co/json/');
                if (!ipResponse.ok) throw new Error('IP location failed');
                
                const ipData = await ipResponse.json();
                const { latitude, longitude } = ipData;
                
                // Then get weather data
                getWeatherData(latitude, longitude);
            } catch (error) {
                console.error('IP geolocation error:', error);
                showError('Unable to determine your location. Using default location.');
                // Default to New York coordinates
                getWeatherData(40.7128, -74.0060);
            }
        }

        // Get weather data from API
        async function getWeatherData(lat, lon) {
            try {
                // Current weather
                const currentWeatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                
                if (!currentWeatherResponse.ok) {
                    throw new Error('Weather data not available');
                }
                
                const currentWeatherData = await currentWeatherResponse.json();
                
                // 5-day forecast
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                
                if (!forecastResponse.ok) {
                    throw new Error('Forecast data not available');
                }
                
                const forecastData = await forecastResponse.json();
                
                // Update UI with weather data
                updateWeatherUI(currentWeatherData, forecastData);
                
                // Show plants recommendation modal after a delay
                setTimeout(() => {
                    showPlantsRecommendation(currentWeatherData);
                }, 2000);
                
                // Hide loading screen
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
                
            } catch (error) {
                showError('Failed to fetch weather data. Please try again later.');
                console.error('Error fetching weather data:', error);
                
                // Hide loading screen even if there's an error
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        }

        // Update weather UI
        function updateWeatherUI(currentData, forecastData) {
            // Get time of day
            const timeOfDay = getTimeOfDay();
            
            // Update location
            locationName.textContent = `${currentData.name}, ${currentData.sys.country}`;
            
            // Update current weather
            const temp = Math.round(currentData.main.temp);
            const tempMin = Math.round(currentData.main.temp_min);
            const tempMax = Math.round(currentData.main.temp_max);
            const weatherCondition = currentData.weather[0].main;
            
            temperature.textContent = `${temp}°`;
            condition.textContent = currentData.weather[0].description;
            tempRange.textContent = `H: ${tempMax}° L: ${tempMin}°`;
            
            // Update weather details
            humidity.textContent = `${currentData.main.humidity}%`;
            windSpeed.textContent = `${currentData.wind.speed} m/s`;
            pressure.textContent = `${currentData.main.pressure} hPa`;
            
            // Update weather icon and background based on condition and time of day
            updateWeatherIcon(weatherCondition);
            updateWeatherBackground(weatherCondition, timeOfDay);
            createWeatherEffects(weatherCondition, timeOfDay);
            
            // Update forecast
            updateForecastUI(forecastData);
        }

        // Update weather icon based on condition
        function updateWeatherIcon(condition) {
            let iconHTML = '';
            
            switch (condition.toLowerCase()) {
                case 'clear':
                    iconHTML = '<i class="fas fa-sun"></i>';
                    break;
                case 'clouds':
                    iconHTML = '<i class="fas fa-cloud"></i>';
                    break;
                case 'rain':
                case 'drizzle':
                case 'shower rain':
                    iconHTML = '<i class="fas fa-cloud-rain"></i>';
                    break;
                case 'thunderstorm':
                    iconHTML = '<i class="fas fa-bolt"></i>';
                    break;
                case 'snow':
                    iconHTML = '<i class="fas fa-snowflake"></i>';
                    break;
                case 'mist':
                case 'fog':
                case 'haze':
                    iconHTML = '<i class="fas fa-smog"></i>';
                    break;
                default:
                    iconHTML = '<i class="fas fa-sun"></i>';
            }
            
            weatherIcon.innerHTML = iconHTML;
        }

        // Update weather background based on condition and time of day
        function updateWeatherBackground(condition, timeOfDay) {
            // Remove all existing classes
            weatherDashboard.className = 'weather-dashboard';
            
            // Add time-based class
            weatherDashboard.classList.add(timeOfDay);
            
            // Add condition-based class
            switch (condition.toLowerCase()) {
                case 'clear':
                    weatherDashboard.classList.add(`${timeOfDay}-sunny`);
                    break;
                case 'clouds':
                case 'mist':
                case 'fog':
                case 'haze':
                    weatherDashboard.classList.add(`${timeOfDay}-cloudy`);
                    break;
                case 'rain':
                case 'drizzle':
                case 'shower rain':
                case 'thunderstorm':
                    weatherDashboard.classList.add(`${timeOfDay}-rainy`);
                    break;
                default:
                    weatherDashboard.classList.add(`${timeOfDay}-sunny`);
                    break;
            }
        }

        // Update forecast UI
        function updateForecastUI(forecastData) {
            forecast.innerHTML = '';
            
            // Group forecast data by day
            const dailyData = {};
            
            forecastData.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                if (!dailyData[day]) {
                    dailyData[day] = {
                        minTemp: item.main.temp_min,
                        maxTemp: item.main.temp_max,
                        condition: item.weather[0].main,
                        icon: item.weather[0].icon
                    };
                } else {
                    dailyData[day].minTemp = Math.min(dailyData[day].minTemp, item.main.temp_min);
                    dailyData[day].maxTemp = Math.max(dailyData[day].maxTemp, item.main.temp_max);
                }
            });
            
            // Create forecast elements
            Object.keys(dailyData).slice(0, 5).forEach(day => {
                const dayData = dailyData[day];
                const minTemp = Math.round(dayData.minTemp);
                const maxTemp = Math.round(dayData.maxTemp);
                
                let iconHTML = '';
                switch (dayData.condition.toLowerCase()) {
                    case 'clear':
                        iconHTML = '<i class="fas fa-sun"></i>';
                        break;
                    case 'clouds':
                        iconHTML = '<i class="fas fa-cloud"></i>';
                        break;
                    case 'rain':
                    case 'drizzle':
                    case 'shower rain':
                        iconHTML = '<i class="fas fa-cloud-rain"></i>';
                        break;
                    case 'thunderstorm':
                        iconHTML = '<i class="fas fa-bolt"></i>';
                        break;
                    case 'snow':
                        iconHTML = '<i class="fas fa-snowflake"></i>';
                        break;
                    case 'mist':
                    case 'fog':
                    case 'haze':
                        iconHTML = '<i class="fas fa-smog"></i>';
                        break;
                    default:
                        iconHTML = '<i class="fas fa-sun"></i>';
                }
                
                const forecastDay = document.createElement('div');
                forecastDay.className = 'forecast-day';
                forecastDay.innerHTML = `
                    <div class="forecast-day-name">${day}</div>
                    <div class="forecast-icon">${iconHTML}</div>
                    <div class="forecast-temp">${maxTemp}° / ${minTemp}°</div>
                `;
                
                forecast.appendChild(forecastDay);
            });
        }

        // Show plants recommendation modal
        function showPlantsRecommendation(weatherData) {
            const currentTemp = Math.round(weatherData.main.temp);
            const currentHumidity = weatherData.main.humidity;
            const location = weatherData.name;
            
            // Update subtitle with location and conditions
            plantsModalSubtitle.textContent = `Based on the current weather in ${location} (${currentTemp}°C, ${currentHumidity}% humidity), these plants are perfect for your area:`;
            
            // Clear previous plants
            plantsGrid.innerHTML = '';
            
            // Filter plants based on current conditions
            const suitablePlants = plantsDatabase.filter(plant => {
                return currentTemp >= plant.minTemp && 
                       currentTemp <= plant.maxTemp &&
                       currentHumidity >= plant.humidityRange[0] && 
                       currentHumidity <= plant.humidityRange[1];
            });
            
            // If no plants match, show all plants
            const plantsToShow = suitablePlants.length > 0 ? suitablePlants : plantsDatabase;
            
            // Create plant cards
            plantsToShow.forEach(plant => {
                const plantCard = document.createElement('div');
                plantCard.className = 'plant-card';
                
                const conditionsHTML = plant.conditions.map(condition => 
                    `<span class="plant-card-condition">${condition}</span>`
                ).join('');
                
                plantCard.innerHTML = `
                    <img src="${plant.image}" alt="${plant.name}" class="plant-card-image">
                    <div class="plant-card-content">
                        <h3 class="plant-card-name">${plant.name}</h3>
                        <p class="plant-card-description">${plant.description}</p>
                        <div class="plant-card-conditions">
                            ${conditionsHTML}
                        </div>
                    </div>
                `;
                
                plantsGrid.appendChild(plantCard);
            });
            
            // Show the modal
            plantsModal.classList.add('active');
        }

        // Setup event listeners
        function setupEventListeners() {
            // Location modal buttons
            allowLocationBtn.addEventListener('click', () => {
                locationModal.classList.remove('active');
                getLocation();
            });
            
            denyLocationBtn.addEventListener('click', () => {
                locationModal.classList.remove('active');
                // Use default location
                getWeatherData(40.7128, -74.0060);
            });
            
            // Plants modal close button
            closePlantsModalBtn.addEventListener('click', () => {
                plantsModal.classList.remove('active');
            });
            
            // Toggle between sections
            toggleContainer.addEventListener('click', () => {
                toggleSwitch.classList.toggle('active');
                plantIdentification.classList.toggle('active');
            });
            
            // Back to weather dashboard
            backButton.addEventListener('click', () => {
                toggleSwitch.classList.remove('active');
                plantIdentification.classList.remove('active');
            });
            
            // Scan button - open camera
            scanButton.addEventListener('click', openCamera);
            
            // Camera controls
            closeCameraBtn.addEventListener('click', closeCamera);
            capturePhotoBtn.addEventListener('click', capturePhoto);
            
            // Send button
            sendButton.addEventListener('click', sendMessage);
            
            // Enter key to send message
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Microphone button for voice input
            micButton.addEventListener('click', startVoiceInput);
            
            // AI mode button
            aiModeButton.addEventListener('click', toggleAIMode);
            
            // Minimize chat
            minimizeChat.addEventListener('click', toggleMinimizeChat);
            
            // Chat container resize
            setupChatResize();
        }

        // Setup chat container resize functionality
        function setupChatResize() {
            let isResizing = false;
            let startY = 0;
            let startHeight = 0;
            
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startY = e.clientY;
                startHeight = parseInt(document.defaultView.getComputedStyle(chatContainer).height, 10);
                document.addEventListener('mousemove', handleResize);
                document.addEventListener('mouseup', stopResize);
                e.preventDefault();
            });
            
            function handleResize(e) {
                if (!isResizing) return;
                
                const height = startHeight + e.clientY - startY;
                chatContainer.style.height = `${Math.max(200, Math.min(window.innerHeight * 0.8, height))}px`;
            }
            
            function stopResize() {
                isResizing = false;
                document.removeEventListener('mousemove', handleResize);
                document.removeEventListener('mouseup', stopResize);
            }
        }

        // Toggle AI mode
        function toggleAIMode() {
            aiMode = !aiMode;
            
            if (aiMode) {
                aiModeIndicator.style.display = 'inline-block';
                sendButton.classList.add('ai-mode');
                addBotMessage("AI mode activated! I'm now using advanced algorithms to provide more detailed and personalized plant care advice. How can I assist you today?");
            } else {
                aiModeIndicator.style.display = 'none';
                sendButton.classList.remove('ai-mode');
                addBotMessage("AI mode deactivated. I'm now in standard mode. Feel free to ask any questions about plants!");
            }
        }

        // Toggle minimize chat
        function toggleMinimizeChat() {
            if (chatContainer.classList.contains('minimized')) {
                chatContainer.classList.remove('minimized');
                minimizeChat.innerHTML = '<i class="fas fa-minus"></i>';
                minimizeChat.title = 'Minimize';
            } else {
                chatContainer.classList.add('minimized');
                minimizeChat.innerHTML = '<i class="fas fa-expand"></i>';
                minimizeChat.title = 'Expand';
            }
        }

        // Camera functions
        let stream = null;

        async function openCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    } 
                });
                
                cameraFeed.srcObject = stream;
                cameraView.classList.add('active');
            } catch (error) {
                console.error('Camera access error:', error);
                showError('Unable to access camera. Please check your permissions.');
                
                // Fallback to file upload
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            displayPlantImage(event.target.result);
                            // Simulate plant identification
                            addBotMessage("I've identified this plant as a Monstera Deliciosa. It's a popular houseplant known for its large, glossy leaves with natural holes. It thrives in bright, indirect light and needs watering when the top inch of soil is dry.");
                        };
                        reader.readAsDataURL(file);
                    }
                };
                
                input.click();
            }
        }

        function closeCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            cameraView.classList.remove('active');
        }

        function capturePhoto() {
            const context = cameraCanvas.getContext('2d');
            cameraCanvas.width = cameraFeed.videoWidth;
            cameraCanvas.height = cameraFeed.videoHeight;
            context.drawImage(cameraFeed, 0, 0);
            
            const imageDataUrl = cameraCanvas.toDataURL('image/jpeg');
            displayPlantImage(imageDataUrl);
            closeCamera();
            
            // Simulate plant identification
            setTimeout(() => {
                addBotMessage("I've identified this plant as a Monstera Deliciosa. It's a popular houseplant known for its large, glossy leaves with natural holes. It thrives in bright, indirect light and needs watering when the top inch of soil is dry.");
            }, 1000);
        }

        function displayPlantImage(imageSrc) {
            plantImageContainer.innerHTML = `
                <img src="${imageSrc}" alt="Scanned plant" class="plant-image">
            `;
        }

        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Simulate bot response with delay
                setTimeout(() => {
                    removeTypingIndicator();
                    if (aiMode) {
                        generateAIResponse(message);
                    } else {
                        generateBotResponse(message);
                    }
                }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
            }
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.id = 'typingIndicator';
            typingIndicator.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Add user message to chat
        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message user';
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Add bot message to chat
        function addBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot';
            if (aiMode) {
                messageElement.classList.add('ai-mode');
            }
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Generate bot response based on user message
        function generateBotResponse(userMessage) {
            const message = userMessage.toLowerCase();
            let response = '';
            
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                response = 'Hello! How can I help you with your plants today?';
            } else if (message.includes('water')) {
                response = 'Most houseplants need watering when the top inch of soil feels dry. Overwatering is a common mistake, so it\'s better to underwater than overwater!';
            } else if (message.includes('light')) {
                response = 'Different plants have different light requirements. Succulents and cacti need bright, direct light, while ferns and peace lilies prefer low to medium indirect light.';
            } else if (message.includes('fertilizer')) {
                response = 'Most houseplants benefit from fertilization during the growing season (spring and summer). Use a balanced, water-soluble fertilizer every 2-4 weeks.';
            } else if (message.includes('repot')) {
                response = 'You should repot your plant when it becomes root-bound, usually every 1-2 years. Signs include roots growing out of drainage holes or the plant drying out very quickly after watering.';
            } else if (message.includes('pest')) {
                response = 'Common plant pests include spider mites, aphids, and mealybugs. You can often treat them with insecticidal soap or neem oil. Isolate infected plants to prevent spreading.';
            } else if (message.includes('propagate')) {
                response = 'Many plants can be propagated through stem cuttings, leaf cuttings, or division. Research the specific propagation method for your plant type for best results.';
            } else {
                const responses = [
                    'That\'s a great question about plants! Can you provide more details so I can give you a more specific answer?',
                    'I\'d be happy to help with your plant care questions. Could you tell me more about the specific plant you\'re asking about?',
                    'Plants are fascinating! For more detailed information about your specific plant, consider uploading a photo or providing more details about its appearance and care needs.'
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
            
            addBotMessage(response);
        }

        // Generate AI response based on user message
        function generateAIResponse(userMessage) {
            const message = userMessage.toLowerCase();
            let response = '';
            
            // More sophisticated AI-like responses
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                const greetings = [
                    'Hello! I\'m your AI plant assistant. I can provide detailed care instructions, identify plants, and help solve any plant-related issues you might have. How can I assist you today?',
                    'Greetings! As an AI plant specialist, I have access to extensive knowledge about plant care, propagation, and problem-solving. What would you like to know?',
                    'Hi there! I\'m your AI-powered plant expert. Whether you need help with watering schedules, pest control, or plant identification, I\'m here to help. What can I do for you today?'
                ];
                response = greetings[Math.floor(Math.random() * greetings.length)];
            } else if (message.includes('water') || message.includes('watering')) {
                if (message.includes('how often') || message.includes('frequency')) {
                    response = 'Watering frequency depends on several factors: plant type, season, humidity, light conditions, and pot size. As a general rule, check the top 1-2 inches of soil - if it\'s dry, it\'s time to water. Succulents prefer to dry out completely between waterings, while tropical plants like consistently moist soil. Would you like specific advice for a particular type of plant?';
                } else if (message.includes('too much') || message.includes('overwater')) {
                    response = 'Overwatering is one of the most common plant care mistakes. Signs include yellowing leaves, mushy stems, and root rot. To save an overwatered plant: 1) Stop watering immediately, 2) Check for root rot and trim affected roots, 3) Repot in fresh, well-draining soil, 4) Place in bright, indirect light, and 5) Water only when the top few inches of soil are dry. Prevention is key - always check soil moisture before watering!';
                } else {
                    response = 'Proper watering is crucial for plant health. Different plants have different needs: tropical plants like consistent moisture, succulents prefer to dry out completely, and most houseplants fall somewhere in between. The finger test is reliable - insert your finger into the soil up to the second knuckle. If it feels dry, water thoroughly until it runs out the drainage holes. Always use pots with drainage and well-draining soil mix. Would you like specific watering advice for a particular plant?';
                }
            } else if (message.includes('light') || message.includes('sunlight')) {
                if (message.includes('not enough') || message.includes('low light')) {
                    response = 'Low light conditions can be challenging but many plants thrive in them! Good low-light options include: Snake Plants, ZZ Plants, Pothos, Peace Lilies, and Philodendrons. Signs of insufficient light include leggy growth, small leaves, and loss of variegation. You can supplement with grow lights if needed. Remember that low light doesn\'t mean no light - even shade-loving plants need some indirect light to photosynthesize effectively.';
                } else if (message.includes('too much') || message.includes('direct sun')) {
                    response = 'Too much direct sunlight can cause leaf scorch, especially in plants adapted to indirect light. Signs include brown, crispy leaf edges and faded or bleached leaves. Move affected plants to bright, indirect light and trim severely damaged leaves. Acclimate plants gradually when moving them to brighter conditions. Some plants that enjoy direct sun include succulents, cacti, citrus trees, and herbs like rosemary and basil. Most tropical houseplants prefer bright, indirect light.';
                } else {
                    response = 'Light requirements vary significantly among plants. Understanding your plant\'s natural habitat helps provide appropriate light: 1) High light: Direct sun for 6+ hours (succulents, cacti), 2) Medium light: Bright, indirect light (most houseplants), 3) Low light: Minimal direct light (snake plants, ZZ plants). Observe how light changes throughout the day in your space and rotate plants periodically for even growth. East-facing windows provide gentle morning sun, south-facing offers the brightest light, west-facing has hot afternoon sun, and north-facing has the lowest light.';
                }
            } else if (message.includes('fertilizer') || message.includes('feed')) {
                response = 'Fertilizing provides essential nutrients that might be depleted from potting soil over time. Most houseplants benefit from fertilization during the growing season (spring and summer) every 2-4 weeks. Use a balanced, water-soluble fertilizer diluted to half strength. Reduce or stop fertilizing in fall and winter when growth slows. Signs of under-fertilization include slow growth, small leaves, and yellowing older leaves. Over-fertilization can cause leaf burn and root damage - always follow package directions. Organic options include compost tea, seaweed extract, and fish emulsion.';
            } else if (message.includes('repot') || message.includes('pot')) {
                response = 'Repotting is essential when plants become root-bound. Signs to look for: roots growing out of drainage holes, roots circling the soil surface, water running straight through the pot, or stunted growth. When repotting: 1) Choose a pot only 1-2 inches larger in diameter, 2) Use fresh, appropriate potting mix, 3) Gently loosen the root ball, 4) Plant at the same depth it was growing previously, 5) Water thoroughly. Most plants need repotting every 1-2 years, though slow-growers may go longer. Spring is the best time to repot when plants are entering active growth.';
            } else if (message.includes('pest') || message.includes('bug') || message.includes('insect')) {
                response = 'Common plant pests include spider mites (fine webbing, tiny specks), aphids (clustered on new growth), mealybugs (white cottony masses), scale (bumps on stems and leaves), and fungus gnats (tiny flying insects). For treatment: 1) Isolate affected plants, 2) Remove visible pests with a cotton swab dipped in rubbing alcohol, 3) Spray with insecticidal soap or neem oil, 4) Repeat treatment every 7-10 days for 3-4 weeks, 5) Improve air circulation and avoid overwatering. Prevention is easier than treatment - quarantine new plants and inspect regularly!';
                } else if (message.includes('disease') || message.includes('sick')) {
                response = 'Plant diseases are often caused by fungi, bacteria, or viruses and are frequently related to environmental conditions. Common issues include powdery mildew (white powder on leaves), root rot (mushy, dark roots), leaf spot (brown or black spots), and rust (orange pustules). Prevention is key: provide proper air circulation, avoid overhead watering, ensure good drainage, and maintain appropriate humidity. For treatment: 1) Remove affected plant parts, 2) Improve growing conditions, 3) Apply appropriate fungicide if necessary, 4) Avoid over-fertilizing stressed plants. Would you like help identifying a specific plant problem?';
            } else if (message.includes('propagate') || message.includes('propagation')) {
                response = 'Plant propagation is an exciting way to create new plants! Common methods include: 1) Stem cuttings: Take 4-6 inch sections of stem, remove lower leaves, and root in water or soil. Works well for pothos, philodendron, and many houseplants. 2) Leaf cuttings: For plants like African violets and snake plants. 3) Division: Separate clumps of plants like peace lilies and spider plants. 4) Layering: Bend a stem to the soil while still attached to the parent plant. Success depends on proper timing, sterile tools, appropriate rooting medium, and maintaining humidity. Would you like specific instructions for propagating a particular plant?';
            } else if (message.includes('identify') || message.includes('what plant')) {
                response = 'I can help identify plants! Please provide a clear photo showing the leaves, stems, flowers if present, and overall growth habit. Include information about where the plant is growing (indoors/outdoors, light conditions) and any special features. The more details you provide, the more accurate my identification will be. You can also describe leaf shape, color, texture, arrangement, size, and any unique characteristics like variegation, scent, or sap color.';
            } else if (message.includes('recommend') || message.includes('suggestion')) {
                response = 'I\'d be happy to recommend plants! To give you the best suggestions, please tell me about your growing conditions: light levels (bright direct, bright indirect, medium, low), humidity levels, temperature range, and your experience level. Also let me know if you\'re looking for specific benefits like air purification, pet safety, edible plants, or low maintenance. With this information, I can recommend plants that will thrive in your specific environment and meet your needs!';
            } else {
                const responses = [
                    'That\'s an interesting question about plants! Based on my extensive plant knowledge database, I\'d be happy to provide detailed information. Could you tell me more about the specific plant or situation you\'re asking about?',
                    'I appreciate your plant-related question! As an AI plant specialist, I can provide comprehensive information on plant care, identification, and problem-solving. To give you the most accurate and helpful response, could you provide a few more details about what you\'re looking for?',
                    'Thank you for your question! I have access to a wealth of botanical knowledge and would love to help you. To provide you with the most relevant information, could you share a bit more context about your specific plant or gardening situation?'
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
            
            addBotMessage(response);
        }

        // Start voice input
        function startVoiceInput() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                
                recognition.onstart = () => {
                    micButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                    micButton.style.backgroundColor = '#e74c3c';
                };
                
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    chatInput.value = transcript;
                    sendMessage();
                };
                
                recognition.onerror = (event) => {
                    console.error('Speech recognition error', event.error);
                    showError('Speech recognition error. Please try again.');
                };
                
                recognition.onend = () => {
                    micButton.innerHTML = '<i class="fas fa-microphone"></i>';
                    micButton.style.backgroundColor = '';
                };
                
                recognition.start();
            } else {
                showError('Speech recognition is not supported in your browser.');
            }
        }

        // Show error message
        function showError(message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            document.body.appendChild(errorElement);
            
            setTimeout(() => {
                errorElement.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(errorElement);
                }, 500);
            }, 3000);
        }