-- Initialize database schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Biography table
CREATE TABLE IF NOT EXISTS biography (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample biography data
INSERT INTO biography (title, content) VALUES (
    'About Her',
    E'She is a remarkable soul with a story worth telling. Born with curiosity in her heart and dreams that reach the stars, she has journeyed through life with grace and determination.\n\nHer passions span from the artistic to the analytical - a true renaissance spirit. Whether she is creating beauty through her art or solving complex problems with her sharp mind, she approaches everything with dedication and love.\n\nTravel has shaped her worldview, exposing her to diverse cultures and perspectives. These experiences have made her empathetic, open-minded, and endlessly fascinating to know.\n\nIn her quiet moments, she finds peace in nature, literature, and the company of those she holds dear. Her laughter is infectious, her wisdom profound, and her presence a gift to everyone around her.\n\nThis site is a glimpse into her world - a world that continues to expand with each passing day, filled with learning, growth, and boundless potential.'
) ON CONFLICT DO NOTHING;
