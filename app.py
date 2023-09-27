from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3

app = Flask(__name__)


# Your existing code for creating the database and table

@app.route('/')
def index():
    return render_template('/invite.html')

@app.route('/invite', methods=['GET', 'POST'])
def invite():
    if request.method == 'POST':
        invite_code = request.form.get('invite_code')
        family_name = request.form.get('family_name')

        # Check if the invite code is valid in the database
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        # Use proper parameterization to prevent SQL injection
        cur.execute("SELECT invite_code, family_name FROM users WHERE invite_code=?", (invite_code,))
        result = cur.fetchone()
        cur.close()
        conn.close()

        if result:
            print(f"Found an invitation for invite code: {invite_code}", flush=True)
            # Return a JSON response indicating success
            return jsonify({'success': True, 'redirect_url': f'/rsvp/{family_name}/{invite_code}'})

        else:
            print(f"Did not find an invitation for invite code: {invite_code}", flush=True)
            # Return a JSON response indicating failure
            return jsonify({'success': False, 'error': 'Invalid invite code'})

    return render_template('invite.html')


@app.route('/rsvp', methods=['GET', 'POST'])
def no_code():
    return redirect('/invite')
    # return redirect(f'/invite.html/')

@app.route('/rsvp/<family_name>/<invite_code>', methods=['GET', 'POST'])
def rsvp(family_name, invite_code):
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

    return render_template('/rsvp.html', guests=guests)


@app.route('/thanks')
def thanks():
    return "Thank you for your RSVP!"


if __name__ == '__main__':
    app.run(debug=True)
