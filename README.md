# StreamFlex

StreamFlex is a Node.js application designed to facilitate seamless streaming to YouTube using RTMP and FFmpeg. This project enables users to broadcast video content directly to their YouTube channel with minimal configuration.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Easy Setup**: Quickly configure and start streaming to YouTube.
- **RTMP Streaming**: Utilizes RTMP for reliable video streaming.
- **FFmpeg Integration**: Leverages the power of FFmpeg for video processing.
- **Environment Configuration**: Simple .env file setup for stream keys and URLs.

## Installation
To get started with StreamFlex, follow these steps:

1. **Clone the repository:**
   ```bash
   https://github.com/RanaMuzamal/StreamFlex
   cd streamflex

Before starting the application, you need to configure your YouTube stream settings:

1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:
   ```plaintext
   STREAM_KEY=your_youtube_stream_key
   STREAM_URL=your_youtube_stream_url

The application will use the configured `STREAM_KEY` and `STREAM_URL` to begin streaming to your YouTube channel.

## Technologies Used
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **RTMP**: Real-Time Messaging Protocol for streaming audio, video, and data.
- **FFmpeg**: A complete, cross-platform solution to record, convert, and stream audio and video.

## Contributing
We welcome contributions to StreamFlex! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** (`git commit -am 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature-name`)
5. **Create a new Pull Request**

## License
This project is licensed under the MIT License. See the LICENSE file for details.
