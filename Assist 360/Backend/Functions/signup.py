import mysql.connector


def signup(a):
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="assist")
    mycursor = mydb.cursor()
    try:
        e = "insert into user_( Email,PASSWORD ,Name)values('%s','%s','%s')" % (
            a["Email"],  a["Password"], a["Name"])

        mycursor.execute(e)
        mydb.commit()
    except:
        return ("This Email ID is Already Exist ")

    return ("Account created successfully")
