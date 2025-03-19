# Weather Monitor

A full-stack weather monitoring application with a C# backend API and React frontend, featuring a beautiful sky blue theme.

## Project Status

### Completed Features
- Backend API structure with clean architecture
- Weather service implementation with OpenWeatherMap integration
- Unit tests for services and controllers
- Git repository setup with initial commit
- Test project structure and configuration

### In Progress
- Frontend application setup with React and TypeScript
- Implementation of sky blue theme and UI components
- Integration of weather API with frontend

### Pending Features
- Frontend component implementation
- State management setup
- End-to-end testing
- Performance optimization
- Documentation completion

## Project Structure

```
WeatherApp/
├── backend/         # C# Web API project
│   ├── WeatherApp.API/           # Main API project
│   ├── WeatherApp.API.Tests/     # API tests
└── frontend/        # React frontend application
    ├── src/
    │   ├── assets/           # Static assets
    │   ├── components/       # UI components
    │   ├── hooks/           # Custom hooks
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── store/           # State management
    │   ├── types/           # TypeScript types
    │   ├── utils/           # Utility functions
    │   └── config/          # Configuration
    └── tests/               # Test files
```

## Backend Implementation Details

### Architecture
- Clean Architecture pattern implementation
- Separation of concerns with Services and Controllers
- Dependency injection for better testability
- Repository pattern for data access

### Services
- WeatherService: Handles weather data retrieval and processing
- Caching mechanism for API responses
- Error handling and logging
- Rate limiting implementation

### Controllers
- WeatherController: RESTful endpoints for weather data
- Endpoints for current weather and forecasts
- Input validation and error responses
- CORS configuration for frontend access

### Testing
- Unit tests for all services and controllers
- Mock implementations for external API calls
- Test coverage tracking
- Integration tests for API endpoints

## Frontend Implementation Details

### Theme and Design
- Sky blue color scheme:
  - Primary: #4A90E2 (Sky Blue)
  - Secondary: #357ABD (Darker Sky Blue)
  - Accent: #7EB6FF (Light Sky Blue)
  - Background: #F0F8FF (Alice Blue)
- Modern UI with responsive design
- Cloud-themed icons and elements
- Smooth transitions and animations

### Component Structure
- Layout Components:
  - Header with navigation
  - Footer with links
  - Main content container
- Weather Components:
  - WeatherSearch
  - WeatherDisplay
  - WeatherCard
  - LoadingSpinner
  - ErrorDisplay
- Common Components:
  - Button
  - Input
  - Card
  - Icon

### State Management
- React Query for server state
- Context API for global UI state
- Local storage for user preferences
- Background refresh mechanism

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
- Responsive design with sky blue theme
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
- Node.js 18.x or later for frontend
- npm 9.x or later for frontend
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

## Development Setup

### Prerequisites
- .NET 7.0 SDK
- Node.js 18.x or later
- npm 9.x or later
- Git

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
3. Restore NuGet packages:
   ```bash
   dotnet restore
   ```
4. Set up environment variables:
   - Create `appsettings.Development.json`
   - Add OpenWeatherMap API key
5. Run the application:
   ```bash
   dotnet run
   ```
6. Run tests:
   ```bash
   dotnet test
   ```

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create `.env` file
   - Add API endpoint configuration
4. Start development server:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm test
   ```

### Common Issues and Solutions
- API Key Issues:
  - Verify API key in configuration
  - Check environment variables
- CORS Issues:
  - Ensure backend CORS is configured
  - Check frontend API endpoint
- Build Errors:
  - Clear node_modules and reinstall
  - Update .NET SDK if needed

## API Documentation

### Endpoints

#### GET /api/weather/current
Retrieves current weather for a specified city.

**Parameters:**
- city (string): Name of the city

**Response:**
```json
{
  "temperature": number,
  "description": string,
  "humidity": number,
  "windSpeed": number,
  "icon": string
}
```

#### GET /api/weather/forecast
Retrieves 5-day forecast for a specified city.

**Parameters:**
- city (string): Name of the city

**Response:**
```json
{
  "forecast": [
    {
      "date": string,
      "temperature": number,
      "description": string,
      "icon": string
    }
  ]
}
```

### Error Responses
- 400: Bad Request
- 404: City Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Contributing

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

### Code Style
- Follow C# coding conventions
- Use TypeScript for frontend
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

### Testing Requirements
- All new code must include tests
- Maintain or improve test coverage
- Run all tests before submitting PR

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Third-Party Licenses
- OpenWeatherMap API
- React and related libraries
- Testing frameworks 