# Weather Report Web Application

A full-stack weather report application with a C# backend API and React frontend.

## Project Structure

```
WeatherApp/
├── backend/         # C# Web API project
└── frontend/        # React frontend application
```

## Requirements

### Backend (C# Web API)
- ASP.NET Core Web API
- Weather data integration (e.g., OpenWeatherMap API)
- RESTful endpoints for weather data
- CORS configuration for frontend access
- Error handling and logging
- API documentation (Swagger/OpenAPI)
- Caching mechanism for weather data to minimize API calls
- Rate limiting to handle multiple city requests efficiently
- Comprehensive unit testing requirements:
  - 100% code coverage for business logic
  - Unit tests for all controllers, services, and models
  - Mocking of external weather API calls
  - Test cases for error scenarios and edge cases
  - Integration tests for API endpoints
  - Performance tests for multiple city requests
  - Caching mechanism tests
  - Rate limiting tests

### Frontend (React)
- Modern React with TypeScript
- Responsive design
- Weather data visualization
- Location-based weather search
- Current weather and forecast display
- Error handling and loading states
- Local storage for saving user's selected cities
- Auto-refresh functionality every 5 minutes
- Multiple city weather display (up to 5 cities)
- Comprehensive testing requirements:
  - Unit tests for all components and hooks
  - Integration tests for component interactions
  - End-to-end tests for critical user flows
  - UI/UX testing requirements:
    - Visual regression tests for all components
    - Responsive design tests across different screen sizes
    - Accessibility testing (WCAG compliance)
    - Cross-browser compatibility tests
    - Layout consistency tests
    - Component alignment and spacing verification
    - Color contrast and readability tests
    - Loading state and error state visual tests
    - Animation and transition tests
    - Auto-refresh indicator visibility tests

## Features to Implement
- Current weather conditions
- 5-day weather forecast
- Location search
- Temperature unit conversion (Celsius/Fahrenheit)
- Weather icons and descriptions
- Responsive layout for mobile and desktop
- Support for tracking up to 5 cities simultaneously
- Automatic page refresh every 5 minutes
- City management (add/remove cities)
- Persistent storage of selected cities across sessions
- Visual indicators for auto-refresh status
- Error handling for failed city additions (beyond 5 cities)

## Technical Requirements
- .NET 7.0 or later for backend
- Node.js and npm for frontend
- Weather API key (e.g., OpenWeatherMap)
- Git for version control
- Browser's local storage for city preferences
- Efficient state management for multiple cities
- Background refresh mechanism
- Error handling for API rate limits
- Testing frameworks and tools:
  - Backend: xUnit, Moq, FluentAssertions
  - Frontend: Jest, React Testing Library, Cypress, Percy
  - CI/CD pipeline integration for automated testing
  - Automated test reporting and coverage tracking

## Getting Started
(Instructions will be added once the project is set up)

## Development Setup
(Instructions will be added once the project is set up)

## API Documentation
(Will be available after backend implementation)

## Contributing
(Contributing guidelines will be added)

## License
(To be determined) 