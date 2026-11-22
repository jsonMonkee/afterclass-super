import sqlite3
import json
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).resolve().parents[2] / "afterclass.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    with conn:
        # Notices Table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS notices (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                badge TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                excerpt TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Socials Table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS socials (
                platform TEXT PRIMARY KEY,
                handle TEXT NOT NULL,
                followers TEXT NOT NULL,
                engagement TEXT,
                status TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # API Keys / Notes Table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS api_keys (
                id TEXT PRIMARY KEY,
                label TEXT NOT NULL,
                key_value TEXT NOT NULL,
                category TEXT DEFAULT 'General',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Instagram Posts Table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS instagram_posts (
                id TEXT PRIMARY KEY,
                caption TEXT,
                media_url TEXT,
                permalink TEXT,
                date_posted TEXT,
                views INTEGER DEFAULT 0,
                likes INTEGER DEFAULT 0,
                comments INTEGER DEFAULT 0,
                shares INTEGER DEFAULT 0,
                synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Seed socials with unconfigured/blank practical state if empty
        cur = conn.execute("SELECT COUNT(*) FROM socials")
        if cur.fetchone()[0] == 0:
            conn.executemany("""
                INSERT INTO socials (platform, handle, followers, engagement, status)
                VALUES (?, ?, ?, ?, ?)
            """, [
                ("instagram", "Not configured", "0", "0.0%", "unconnected"),
                ("threads", "Not configured", "0", "0.0%", "unconnected"),
                ("twitter", "Not configured", "0", "0.0%", "unconnected"),
                ("linkedin", "Not configured", "0", "0.0%", "unconnected")
            ])
            
        # Seed notices table if empty with 1 real live test announcement
        cur_n = conn.execute("SELECT COUNT(*) FROM notices")
        if cur_n.fetchone()[0] == 0:
            conn.execute("""
                INSERT INTO notices (id, title, category, badge, date, time, excerpt)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                "notice-1",
                "Afterclass SuperAdmin Portal Live Across Amity Campuses",
                "Urgent Alert",
                "LIVE",
                datetime.now().strftime("%b %d, %Y"),
                "10:00 AM",
                "Official student administrative and notice broadcast system is operational. Broadcasts posted from the SuperAdmin dashboard reflect instantly on the public website."
            ))
    conn.close()

init_db()
