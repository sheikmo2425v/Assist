import mysql.connector
import json
import os


def product_delete(a):
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()

    e = "delete   from product where pid ='%s'" % (
        a['id'])

    mycursor.execute(e)
    mydb.commit()
    path = './public/images/%s.jpg' % (a['id'])
    if os.path.exists(path):
        os.remove(path)

    return "deleted"
