import mysql.connector
import json


def admin_brand():
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    e = "select Name from brand "

    mycursor.execute(e)
    temp = mycursor.fetchall()
    t = {"brand": temp}
    return t
