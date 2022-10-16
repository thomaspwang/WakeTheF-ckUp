import os
from sqlalchemy import create_engine, text

DATABASE_URL="cockroachdb://jeremy:MKixjPluseHEGPBYsPHCJA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dwolf-gnoll-5791"

engine = create_engine(DATABASE_URL)
conn = engine.connect()

res = conn.execute(text("SELECT now()")).fetchall()
print(res)

