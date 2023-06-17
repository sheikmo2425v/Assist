import mysql.connector
import json


def product():
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    e = "select * from product "

    mycursor.execute(e)
    temp = mycursor.fetchall()

    return json.dumps(temp)
