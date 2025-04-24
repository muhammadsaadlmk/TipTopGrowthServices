# TipTop Growth Service - Required Packages

This document lists all the dependencies needed for the TipTop Growth Service application:

```
flask==2.3.3
gunicorn==23.0.0
Flask-SQLAlchemy==3.0.5
email-validator==2.0.0
requests==2.31.0
psycopg2-binary==2.9.9
```

## Installation

Use the following command to install all dependencies:

```bash
pip install -r requirements.txt
```

## Python Version

The application is developed using Python 3.11

## Environment Variables

The following environment variables should be set:
- `WEB3FORMS_API_KEY`: API key for Web3Forms service
- `SESSION_SECRET`: Secret key for Flask session security