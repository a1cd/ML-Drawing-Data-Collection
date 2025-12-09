# ML-Drawing-Data-Collection

A web application for collecting gesture drawing data. Users draw 5-point stars on a canvas, and the drawing data is captured and uploaded to a server for machine learning purposes.

## Features

- **Interactive Canvas**: Square canvas for drawing with pointer events (mouse, touch, stylus)
- **Point Recording**: Captures [x, y, time] coordinates for each drawing stroke
- **Normalized Coordinates**: x and y values are normalized to [0, 1] range
- **Drawing Counter**: Tracks progress (up to 30 drawings)
- **Clear Button**: Reset the canvas without saving
- **Save Button**: Upload drawing data to server and start next drawing
- **iPad Compatible**: Works with touch and Apple Pencil

## Files

- `index.html` - Main web application (standalone, no dependencies)
- `server.js` - Simple Node.js test server for development

## Usage

### Option 1: With Test Server (Development)

1. Start the test server:
```bash
node server.js
```

2. Open http://localhost:3000/ in your browser

3. Enter your username and start drawing!

### Option 2: With Your Own Backend

1. Serve `index.html` from your web server

2. Implement a `POST /upload` endpoint that accepts JSON:
```json
{
  "user": "username",
  "points": [[x, y, time], [x, y, time], ...]
}
```

Where:
- `x` and `y` are normalized coordinates (0 to 1)
- `time` is from `performance.now()` in milliseconds

3. The endpoint should return a success response (200 OK) after saving the data

## Data Format

Each drawing submission contains:
- **user**: String identifier for the user
- **points**: Array of [x, y, time] coordinates
  - **x**: Normalized horizontal position (0 = left, 1 = right)
  - **y**: Normalized vertical position (0 = top, 1 = bottom)
  - **time**: Timestamp in milliseconds from `performance.now()`

Example:
```json
{
  "user": "user123",
  "points": [
    [0.5, 0.25, 1234.56],
    [0.6, 0.4, 1245.67],
    [0.4, 0.6, 1256.78]
  ]
}
```

## Technical Details

- Built with vanilla HTML/CSS/JavaScript (no frameworks)
- Uses Pointer Events API for cross-device compatibility
- Fetch API for data upload
- Works on desktop and mobile browsers
- Optimized for iPad with touch-action CSS properties

## Browser Compatibility

- Modern browsers with Pointer Events support
- Tested on: Chrome, Safari, Firefox, Edge
- Mobile: iOS Safari, Chrome Mobile