import os
import sys

import mysql.connector
from dotenv import load_dotenv

load_dotenv()

def delete_tables(cnx, cur):
  tables = ['likes', 'comments', 'posts', 'users']
  for table in tables:
    cur.execute('DELETE FROM %s;' % table)
    cur.execute('ALTER TABLE %s AUTO_INCREMENT = 1;' % table)
    cnx.commit()

  print('delete tables done.')
  return

def insert_users(cnx, cur):
  for x in range(1, 11):
    name = 'hanjaelee %s' % x
    email = 'jayhanjaelee%s@gmail.com' % x
    password = 1234
    profile_image = 'http://profile_image%s.jpg' % x

    query = (
        'INSERT INTO users'
        '(name, email, password, profile_image)'
        'VALUES'
        '(%s, %s, %s, %s);'
    )

    val = (name, email, password, profile_image)

    cur.execute(query, val)

  print('insert users done.')
  cnx.commit()
  return

def insert_posts(cnx, cur, user_id=0):
  for x in range(1, 11):
    title = 'test title %s' % x
    content = 'test content %s' % x
    if user_id == 0:
      user_id = x
    else:
      user_id = user_id

    image_url = 'http://image_url%s.jpg' % x

    query = (
      'INSERT INTO posts'
      '(title, content, user_id, image_url)'
      'VALUES'
      '(%s, %s, %s, %s)'
    )

    val = (title, content, user_id, image_url)

    cur.execute(query, val)
  print('Insert posts %s done.' % user_id)
  cnx.commit()
  return

def init_dbmate():
  os.system('dbmate drop')
  os.system('dbmate up')
  print('dbmate init done.')
  return

def init_mysql_database():
  print('Initialize mysql database.')
  username = os.environ.get('TYPEORM_USERNAME')
  password = os.environ.get('TYPEORM_PASSWORD')
  host = os.environ.get('TYPEORM_HOST')
  database = os.environ.get('TYPEORM_DATABASE')

  cnx = mysql.connector.connect(
    user=username,
    password=password,
    host=host,
    database=database,
    auth_plugin='mysql_native_password',
  )

  cur = cnx.cursor(buffered=True)

  delete_tables(cnx, cur)
  insert_users(cnx, cur)
  for user_id in range(1, 11):
    insert_posts(cnx, cur, user_id=user_id)

  cnx.close()
  print('init mysql database done.')
  return

def init(dbmate):
  if (dbmate):
    init_dbmate()
  init_mysql_database()

# dbmate 1 이면 dbmate 초기화
if __name__ == '__main__':
  dbmate = 0
  if len(sys.argv) > 1:
    dbmate = sys.argv[1]
  init(dbmate)
