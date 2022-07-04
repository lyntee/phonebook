import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="phonebook1",
    password="book-04-07!"
)

cursor = db.cursor()

cursor.execute("CREATE DATABASE users")
cursor.execute("SHOW DATABASES")

for x in cursor:
    print(x)
