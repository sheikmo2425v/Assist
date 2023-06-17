import mysql.connector
import json
import os


def admin_order():
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    e = "select * from order_info order by date"

    mycursor.execute(e)
    temp1 = mycursor.fetchall()

    e = "select * from order_ order by date"
    mycursor.execute(e)
    temp2 = mycursor.fetchall()
    temp = {"data": temp1, 'data2': temp2}
    return json.dumps(temp)
