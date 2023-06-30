import sqlite3

def add_user(invite_code, family_name, guests):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Insert a new user into the users table
    cursor.execute('INSERT INTO users (invite_code, family_name, guests) VALUES (?, ?, ?)', (invite_code, family_name, guests))
    print(f"Added ({invite_code}, {family_name}, {guests}) to the database")
    conn.commit()
    conn.close()

# Example usage
add_user("000000", "Alon", "Ethan Alon, Sang Alon")