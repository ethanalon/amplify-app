from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)


# Your existing code for creating the database and table

@app.route('/')
def index():
    return render_template('invite.html')

@app.route('/invite', methods=['GET', 'POST'])
def invite():
    if request.method == 'POST':
        invite_code = request.form.get('invite_code')

        # Check if the invite code is valid in the database
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute("SELECT invite_code FROM rsvp WHERE invite_code=?", (invite_code,))
        result = cur.fetchone()
        cur.close()
        conn.close()

        if result:
            return redirect(f'/rsvp/{invite_code}')  # Redirect to the RSVP page with the invite code
        else:
            return render_template('invite.html', error=True)

    return render_template('invite.html', error=False)


@app.route('/rsvp/<invite_code>', methods=['GET', 'POST'])
def rsvp(invite_code):
    # Fetch the list of guests from the database based on the invite code
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    cur.execute("SELECT guests FROM users WHERE invite_code=?", (invite_code,))
    result = cur.fetchone()
    guests = result[0].split(',') if result else []
    cur.close()
    conn.close()

    if request.method == 'POST':
        name = request.form.get('name')
        attending_guests = request.form.getlist('attending_guests[]')
        guest_policy = request.form.get('guest_policy')
        diet = request.form.get('diet')
        phone_number = request.form.get('phone_number')
        email = request.form.get('email')

        # Save the data to the database or perform any other necessary actions

        return redirect('/thanks')  # Redirect to the thank you page

    return render_template('rsvp.html', guests=guests)


@app.route('/thanks')
def thanks():
    return "Thank you for your RSVP!"


if __name__ == '__main__':
    app.run(debug=True)
