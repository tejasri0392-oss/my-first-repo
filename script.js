function debugLog(message) {
            console.log([SmartFarm Debug] ${message});
            const debugContent = document.getElementById('debug-content');
            if (debugContent) {
                const timestamp = new Date().toLocaleTimeString();
                debugContent.innerHTML += <div>[${timestamp}] ${message}</div>;
            }
        }
        
        // Initialize progress rings
        document.addEventListener('DOMContentLoaded', function() {
            debugLog("DOM loaded, initializing dashboard");
            
            // Set initial progress ring values
            updateProgressRing('moisture-value', 0, 100);
            updateProgressRing('temperature-value', -10, 40);
            updateProgressRing('humidity-value', 0, 100);
            updateProgressRing('sunlight-value', 0, 1000);
            updateProgressRing('air-quality-value', 0, 150);
            updateProgressRing('pressure-value', 950, 1050);
            
            // Start simulating sensor updates
            startSensorSimulation();
            
            // Fetch weather data
            fetchWeatherData();
            
            // Add retry button event listener
            document.getElementById('retry-weather').addEventListener('click', fetchWeatherData);
        });
        
        // Function to update progress rings
        function updateProgressRing(valueId, min, max) {
            const valueElement = document.getElementById(valueId);
            const value = parseFloat(valueElement.textContent);
            const parent = valueElement.closest('.sensor-card');
            const circle = parent.querySelector('.progress-ring-circle');
            
            // Calculate percentage based on min/max range
            const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
            
            // Calculate stroke-dashoffset based on percentage
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (percentage / 100) * circumference;
            
            // Set the stroke-dashoffset
            circle.style.strokeDashoffset = offset;
        }
        
        // Function to generate random sensor values
        function generateRandomSensorValues() {
            return {
                moisture: Math.floor(Math.random() * 70) + 20, // 20-90%
                temperature: (Math.random() * 25 + 10).toFixed(1), // 10-35°C
                humidity: Math.floor(Math.random() * 60) + 20, // 20-80%
                sunlight: Math.floor(Math.random() * 900) + 100, // 100-1000 lux
                airQuality: Math.floor(Math.random() * 100) + 30, // 30-130 AQI
                pressure: Math.floor(Math.random() * 80) + 970 // 970-1050 hPa
            };
        }
        
        // Function to update sensor values with animation
        function updateSensorValues() {
            const values = generateRandomSensorValues();
            
            // Update soil moisture
            const moistureElement = document.getElementById('moisture-value');
            moistureElement.classList.add('updating');
            setTimeout(() => {
                moistureElement.textContent = values.moisture;
                moistureElement.classList.remove('updating');
                updateProgressRing('moisture-value', 0, 100);
            }, 300);
            
            // Update temperature
            const temperatureElement = document.getElementById('temperature-value');
            temperatureElement.classList.add('updating');
            setTimeout(() => {
                temperatureElement.textContent = values.temperature;
                temperatureElement.classList.remove('updating');
                updateProgressRing('temperature-value', -10, 40);
            }, 400);
            
            // Update humidity
            const humidityElement = document.getElementById('humidity-value');
            humidityElement.classList.add('updating');
            setTimeout(() => {
                humidityElement.textContent = values.humidity;
                humidityElement.classList.remove('updating');
                updateProgressRing('humidity-value', 0, 100);
            }, 500);
            
            // Update sunlight
            const sunlightElement = document.getElementById('sunlight-value');
            sunlightElement.classList.add('updating');
            setTimeout(() => {
                sunlightElement.textContent = values.sunlight;
                sunlightElement.classList.remove('updating');
                updateProgressRing('sunlight-value', 0, 1000);
            }, 600);
            
            // Update air quality
            const airQualityElement = document.getElementById('air-quality-value');
            airQualityElement.classList.add('updating');
            setTimeout(() => {
                airQualityElement.textContent = values.airQuality;
                airQualityElement.classList.remove('updating');
                updateProgressRing('air-quality-value', 0, 150);
            }, 700);
            
            // Update pressure
            const pressureElement = document.getElementById('pressure-value');
            pressureElement.classList.add('updating');
            setTimeout(() => {
                pressureElement.textContent = values.pressure;
                pressureElement.classList.remove('updating');
                updateProgressRing('pressure-value', 950, 1050);
            }, 800);
        }
        
        // Function to start sensor simulation
        function startSensorSimulation() {
            debugLog("Starting sensor simulation");
            
            // Update sensor values immediately
            updateSensorValues();
            
            // Update sensor values every 5 seconds
            setInterval(updateSensorValues, 5000);
        }
        
        // Function to fetch weather data
        function fetchWeatherData() {
            debugLog("Fetching weather data");
            
            // Reset UI
            document.getElementById('weather-content').style.display = 'flex';
            document.getElementById('weather-error').style.display = 'none';
            document.getElementById('weather-content').innerHTML = `
                <div class="weather-loading">
                    <i class="fas fa-spinner"></i>
                    <div>Loading weather data...</div>
                </div>
            `;
            
            // Show debug info
            document.getElementById('debug-info').style.display = 'block';
            
            // OpenWeatherMap API key
            const apiKey = '473c9d7a57c454f6914e3607d290feb7';
            debugLog(Using API key: ${apiKey.substring(0, 8)}...);
            
            // Default location (can be changed to any city name)
            const defaultLocation = 'London';
            debugLog(Default location: ${defaultLocation});
            
            // Function to get weather by city name
            function getWeatherByCity(city) {
                debugLog(Fetching weather for city: ${city});
                const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;
                debugLog(API URL: ${url});
                
                fetch(url)
                    .then(response => {
                        debugLog(Response status: ${response.status});
                        if (!response.ok) {
                            throw new Error(HTTP error! status: ${response.status});
                        }
                        return response.json();
                    })
                    .then(data => {
                        debugLog(Weather data received: ${JSON.stringify(data)});
                        displayWeatherData(data);
                    })
                    .catch(error => {
                        debugLog(Error fetching weather data: ${error.message});
                        console.error('Error fetching weather data:', error);
                        showWeatherError(error.message);
                    });
            }
            
            // Function to get weather by coordinates
            function getWeatherByCoordinates(lat, lon) {
                debugLog(Fetching weather for coordinates: ${lat}, ${lon});
                const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;
                debugLog(API URL: ${url});
                
                fetch(url)
                    .then(response => {
                        debugLog(Response status: ${response.status});
                        if (!response.ok) {
                            throw new Error(HTTP error! status: ${response.status});
                        }
                        return response.json();
                    })
                    .then(data => {
                        debugLog(Weather data received: ${JSON.stringify(data)});
                        displayWeatherData(data);
                    })
                    .catch(error => {
                        debugLog(Error fetching weather data: ${error.message});
                        console.error('Error fetching weather data:', error);
                        // Fallback to default location if coordinates fail
                        debugLog("Falling back to default location");
                        getWeatherByCity(defaultLocation);
                    });
            }
            
            // Function to display weather data
            function displayWeatherData(data) {
                debugLog("Displaying weather data");
                const weatherContent = document.getElementById('weather-content');
                
                // Map OpenWeatherMap conditions to Font Awesome icons
                const weatherIconMap = {
                    'Clear': 'fa-sun',
                    'Clouds': 'fa-cloud',
                    'Rain': 'fa-cloud-rain',
                    'Drizzle': 'fa-cloud-drizzle',
                    'Thunderstorm': 'fa-bolt',
                    'Snow': 'fa-snowflake',
                    'Mist': 'fa-smog',
                    'Smoke': 'fa-smog',
                    'Haze': 'fa-smog',
                    'Dust': 'fa-smog',
                    'Fog': 'fa-smog',
                    'Sand': 'fa-smog',
                    'Ash': 'fa-smog',
                    'Squall': 'fa-wind',
                    'Tornado': 'fa-tornado'
                };
                
                const condition = data.weather[0].main;
                const iconClass = weatherIconMap[condition] || 'fa-question';
                
                debugLog(Weather condition: ${condition}, Icon: ${iconClass});
                
                weatherContent.innerHTML = `
                    <div class="weather-icon-container">
                        <i class="fas ${iconClass}"></i>
                    </div>
                    <div class="weather-info">
                        <div class="weather-location">${data.name}, ${data.sys.country}</div>
                        <div class="weather-condition">${data.weather[0].description}</div>
                        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                        <div class="weather-humidity">Humidity: ${data.main.humidity}%</div>
                    </div>
                `;
                
                // Update weather every 30 minutes (1800000 ms)
                setTimeout(() => {
                    debugLog("Scheduling next weather update");
                    fetchWeatherData();
                }, 1800000);
            }
            
            // Function to show weather error
            function showWeatherError(errorMessage) {
                debugLog(Showing weather error: ${errorMessage});
                const weatherContent = document.getElementById('weather-content');
                const weatherError = document.getElementById('weather-error');
                const errorMessageElement = document.getElementById('error-message');
                
                weatherContent.style.display = 'none';
                weatherError.style.display = 'block';
                
                // Set error message based on error type
                if (errorMessage.includes('401')) {
                    errorMessageElement.innerHTML = `
                        <p>Invalid API key. The OpenWeatherMap API key is not authorized.</p>
                        <p>Please get a valid API key from <a href="https://home.openweathermap.org/users/sign_up" target="_blank" style="color: var(--soft-blue);">OpenWeatherMap</a> and update it in the code.</p>
                    `;
                } else {
                    errorMessageElement.textContent = Unable to load weather data. Error: ${errorMessage};
                }
                
                // Show API notice if no valid API key
                const apiKey = '473c9d7a57c454f6914e3607d290feb7';
                if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
                    document.getElementById('api-notice').style.display = 'block';
                }
            }
            
            // Try to get user's location
            if (navigator.geolocation) {
                debugLog("Geolocation is supported, requesting position");
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        debugLog(Location obtained: ${lat}, ${lon});
                        getWeatherByCoordinates(lat, lon);
                    },
                    error => {
                        debugLog(Geolocation error: ${error.message});
                        console.error('Error getting location:', error);
                        // Fallback to default location
                        debugLog("Falling back to default location");
                        getWeatherByCity(defaultLocation);
                    }
                );
            } else {
                debugLog("Geolocation is not supported");
                // Fallback to default location if geolocation is not supported
                getWeatherByCity(defaultLocation);
            }
        }
        
        // Function to analyze optimal crops
        document.getElementById('analyze-btn').addEventListener('click', function() {
            debugLog("Analyze button clicked");
            const button = this;
            const resultBox = document.getElementById('result-box');
            
            // Add loading state to button
            button.classList.add('loading');
            button.innerHTML = '<span>🌱</span><span>Analyzing...</span>';
            
            // Simulate analysis delay
            setTimeout(() => {
                // Get sensor values
                const moisture = parseFloat(document.getElementById('moisture-value').textContent);
                const temperature = parseFloat(document.getElementById('temperature-value').textContent);
                const humidity = parseFloat(document.getElementById('humidity-value').textContent);
                const sunlight = parseFloat(document.getElementById('sunlight-value').textContent);
                const airQuality = parseFloat(document.getElementById('air-quality-value').textContent);
                const pressure = parseFloat(document.getElementById('pressure-value').textContent);
                
                // Get weather values
                const weatherTempElement = document.querySelector('.weather-temp');
                const weatherHumidityElement = document.querySelector('.weather-humidity');
                
                let weatherTemp = 24; // Default value
                let weatherHumidity = 60; // Default value
                
                // Extract values from weather widget if available
                if (weatherTempElement) {
                    weatherTemp = parseFloat(weatherTempElement.textContent.replace('°C', ''));
                    debugLog(Extracted weather temp: ${weatherTemp}°C);
                }
                
                if (weatherHumidityElement) {
                    weatherHumidity = parseFloat(weatherHumidityElement.textContent.replace('Humidity: ', '').replace('%', ''));
                    debugLog(Extracted weather humidity: ${weatherHumidity}%);
                }
                
                // Analyze conditions and determine optimal crops
                const analysisResult = analyzeConditions(moisture, temperature, humidity, sunlight, airQuality, pressure, weatherTemp, weatherHumidity);
                
                // Display result
                displayAnalysisResult(analysisResult);
                
                // Reset button
                button.classList.remove('loading');
                button.innerHTML = '<span>🌱</span><span>Analyze Optimal Crop</span>';
            }, 1500);
        });
        
        // Function to analyze conditions and recommend crops
        function analyzeConditions(moisture, temperature, humidity, sunlight, airQuality, pressure, weatherTemp, weatherHumidity) {
            debugLog("Analyzing conditions for crop recommendations");
            
            // Average the sensor temperature with weather temperature
            const avgTemp = (temperature + weatherTemp) / 2;
            
            // Average the sensor humidity with weather humidity
            const avgHumidity = (humidity + weatherHumidity) / 2;
            
            debugLog(Average temperature: ${avgTemp}°C, Average humidity: ${avgHumidity}%);
            
            // Determine optimal crops based on conditions
            let recommendedCrops = [];
            let warnings = [];
            let conditionStatus = 'good'; // good, warning, danger
            
            // Temperature-based recommendations
            if (avgTemp >= 20 && avgTemp <= 30) {
                recommendedCrops.push("Tomatoes", "Peppers", "Cucumbers", "Eggplants");
            } else if (avgTemp >= 15 && avgTemp < 20) {
                recommendedCrops.push("Lettuce", "Spinach", "Kale", "Broccoli");
            } else if (avgTemp < 15) {
                recommendedCrops.push("Carrots", "Radishes", "Peas");
                warnings.push("Temperature is quite low. Consider using a greenhouse or cold frames.");
                conditionStatus = 'warning';
            } else if (avgTemp > 30) {
                recommendedCrops.push("Sweet Potatoes", "Okra", "Eggplants");
                warnings.push("Temperature is high. Ensure adequate watering and shade.");
                conditionStatus = 'warning';
            }
            
            // Moisture-based adjustments
            if (moisture < 30) {
                warnings.push("Soil moisture is low. Increase irrigation or consider drought-resistant crops.");
                recommendedCrops = recommendedCrops.filter(crop => 
                    ["Sweet Potatoes", "Okra", "Eggplants"].includes(crop)
                );
                if (recommendedCrops.length === 0) {
                    recommendedCrops.push("Sweet Potatoes", "Okra");
                }
                conditionStatus = 'warning';
            } else if (moisture > 80) {
                warnings.push("Soil moisture is high. Ensure proper drainage to prevent root rot.");
                recommendedCrops = recommendedCrops.filter(crop => 
                    ["Rice", "Cranberries", "Watercress"].includes(crop)
                );
                if (recommendedCrops.length === 0) {
                    recommendedCrops.push("Rice", "Watercress");
                }
                conditionStatus = 'warning';
            }
            
            // Sunlight-based adjustments
            if (sunlight < 300) {
                warnings.push("Sunlight levels are low. Consider shade-tolerant crops or supplemental lighting.");
                recommendedCrops = recommendedCrops.filter(crop => 
                    ["Lettuce", "Spinach", "Kale", "Swiss Chard"].includes(crop)
                );
                if (recommendedCrops.length === 0) {
                    recommendedCrops.push("Lettuce", "Spinach");
                }
                conditionStatus = 'warning';
            }
            
            // Air quality considerations
            if (airQuality > 100) {
                warnings.push("Air quality is poor. Consider air filtration or pollution-tolerant crops.");
                conditionStatus = 'warning';
            }
            
            // If multiple warnings, set status to danger
            if (warnings.length > 2) {
                conditionStatus = 'danger';
            }
            
            debugLog(Analysis result: Status=${conditionStatus}, Crops=${recommendedCrops.join(', ')}, Warnings=${warnings.length});
            
            return {
                recommendedCrops,
                warnings,
                conditionStatus
            };
        }
        
        // Function to display analysis result
        function displayAnalysisResult(analysisResult) {
            debugLog("Displaying analysis result");
            const resultBox = document.getElementById('result-box');
            const resultContent = resultBox.querySelector('.result-content');
            
            // Clear previous content
            resultContent.innerHTML = '';
            
            // Create crop recommendations section
            const cropRecommendations = document.createElement('div');
            cropRecommendations.className = 'crop-recommendations';
            
            if (analysisResult.recommendedCrops.length > 0) {
                cropRecommendations.innerHTML = '<strong>Recommended crops:</strong>';
                
                const cropList = document.createElement('div');
                cropList.className = 'crop-list';
                
                analysisResult.recommendedCrops.forEach(crop => {
                    const cropTag = document.createElement('div');
                    cropTag.className = 'crop-tag';
                    cropTag.innerHTML = <i class="fas fa-check-circle"></i> ${crop};
                    cropList.appendChild(cropTag);
                });
                
                cropRecommendations.appendChild(cropList);
            } else {
                cropRecommendations.innerHTML = '<strong>No specific crop recommendations available.</strong>';
            }
            
            resultContent.appendChild(cropRecommendations);
            
            // Create warnings section if needed
            if (analysisResult.warnings.length > 0) {
                const warningsSection = document.createElement('div');
                warningsSection.className = 'warnings';
                warningsSection.innerHTML = '<strong>Considerations:</strong>';
                
                analysisResult.warnings.forEach(warning => {
                    const warningItem = document.createElement('div');
                    warningItem.className = 'warning-item';
                    warningItem.innerHTML = `
                        <i class="fas fa-exclamation-triangle warning-icon"></i>
                        <span>${warning}</span>
                    `;
                    warningsSection.appendChild(warningItem);
                });
                
                resultContent.appendChild(warningsSection);
            }
            
            // Update result icon based on condition status
            const resultIcon = resultBox.querySelector('.result-icon');
            if (analysisResult.conditionStatus === 'good') {
                resultIcon.className = 'fas fa-check-circle result-icon';
                resultIcon.style.color = 'var(--success-color)';
            } else if (analysisResult.conditionStatus === 'warning') {
                resultIcon.className = 'fas fa-exclamation-triangle result-icon';
                resultIcon.style.color = 'var(--warning-color)';
            } else {
                resultIcon.className = 'fas fa-times-circle result-icon';
                resultIcon.style.color = 'var(--danger-color)';
            }
            
            // Show result box with animation
            resultBox.classList.add('show');
        }