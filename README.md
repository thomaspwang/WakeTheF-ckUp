# WakeTheF-ckUp

# Backend
first time setup:  
./setup.sh  
  
to run:  
python3 app.py  

## structure
models.py contains the schema  
users.py contains the routes  

## schema:
CREATE TABLE public.users (  
  name VARCHAR(255) NULL,  
  friends INT8[] NULL,  
  lat FLOAT8 NULL,  
  long FLOAT8 NULL,  
  phone VARCHAR(32) NULL,  
  username VARCHAR(255) NOT NULL,  
  password VARCHAR(255) NULL,  
  CONSTRAINT users_pkey PRIMARY KEY (username ASC)  
)    
