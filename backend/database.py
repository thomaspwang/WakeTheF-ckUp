from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
DATABASE_URL="cockroachdb://jeremy:MKixjPluseHEGPBYsPHCJA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dwolf-gnoll-5791"


# create Session object
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
