import mysql.connector
import json


def login(a):
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    e = "select * from Admin_ where Email='%s' And password='%s'" % (
        a["Email"], a["password"])
    mycursor.execute(e)
    temp = mycursor.fetchall()
    data = ["admin", temp]
    if temp == []:
        e = "select userid, name from user_ where Email='%s' And Password='%s'" % (
            a["Email"], a["password"])

        mycursor.execute(e)
        temp = mycursor.fetchall()
        data = ["customer", temp]
    return json.dumps(data)
