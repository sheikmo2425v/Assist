import mysql.connector
import json
import os
from PIL import Image


def store_product(a, file):

    path = "./public/images/"
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    e = "SELECT pid FROM product ORDER BY pid DESC LIMIT 1"
    mycursor.execute(e)
    id = mycursor.fetchall()

    if id == None or id == []:
        id = 0
    else:
        id = id[0][0]+1

    if not os.path.exists(path):
        os.makedirs(path)
    file.save('./public/images/%s.jpg' % (id))

    e = "insert into product(pid,name,Price,quantity,size,cloth,gender,brand)values('%s','%s','%s','%s','%s','%s','%s','%s')" % (id,
                                                                                                                                 a["name"],  a["price"],  a["tproduct"], a['size'], a['cloth'], a['gender'], a['brand'])

    mycursor.execute(e)
    mydb.commit()
    try:
        e = "insert into brand (name)values('%s')" % (a['brand'])
        mycursor.execute(e)
        mydb.commit()
    except:
        pass
    return "Added successfully"
