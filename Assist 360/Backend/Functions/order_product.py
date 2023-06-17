import mysql.connector
import json


def order_product(a):
    b = a['order_info']
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="", database="assist")
    mycursor = mydb.cursor()
    e = "SELECT oid FROM order_ ORDER BY oid DESC LIMIT 1"
    mycursor.execute(e)
    id = mycursor.fetchall()
    print(id)

    if id == None or id == []:
        id = 0
    else:
        id = id[0][0]+1

    for i in a['orderdata']:
        print(i)
        e = "insert into order_(oid,pid,qty, price)values('%s','%s','%s','%s')" % (
            id, i[0],  i[1],  i[3])

        mycursor.execute(e)
        mydb.commit()
        e = "update  product set quantity=quantity-'%s' where pid='%s' AND quantity > 0" % (
            i[1], i[0])
        mycursor.execute(e)
        mydb.commit()
        e = "DELETE FROM product WHERE pid = '%s' AND quantity = 0;" % (
            i[0])
        mycursor.execute(e)
        mydb.commit()
    e = "insert into order_info(oid,userid,gst_price,price,total_price)values('%s','%s','%s','%s','%s')" % (
        id, b[0],  b[1], b[2], b[3])

    mycursor.execute(e)
    mydb.commit()

    return "Added successfully"
