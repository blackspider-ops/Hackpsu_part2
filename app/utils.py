from datetime import datetime

def format_datetime_local(dt):
    """Formats a datetime object for HTML datetime-local input."""
    if dt is None:
        return ""
    # Format: YYYY-MM-DDTHH:MM
    return dt.strftime('%Y-%m-%dT%H:%M')

# Add other utility functions here